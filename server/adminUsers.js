import admin from "firebase-admin";
import fs from "node:fs";
import path from "node:path";
import express from "express";

const router = express.Router();
const roles = new Set(["super_admin", "trainer", "member"]);

export function normalizeRole(role) {
  if (typeof role !== "string") return "member";
  const normalized = role.trim().toLowerCase();
  return roles.has(normalized) ? normalized : "member";
}

export function parseServiceAccountConfig(rawValue = "") {
  if (!rawValue || typeof rawValue !== "string") {
    return null;
  }

  const source = rawValue.trim();
  if (!source) {
    return null;
  }

  const jsonStart = source.indexOf("{");
  const jsonEnd = source.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd <= jsonStart) {
    return null;
  }

  const jsonBlock = source.slice(jsonStart, jsonEnd + 1);

  try {
    const parsed = JSON.parse(jsonBlock);
    if (parsed.private_key) {
      parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
    }
    return parsed;
  } catch {
    try {
      const escaped = jsonBlock.replace(/\\n/g, "\n").replace(/\\r/g, "\r");
      const parsed = JSON.parse(escaped);
      if (parsed.private_key) {
        parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
      }
      return parsed;
    } catch {
      return null;
    }
  }
}

export function resolveRoleFromEmail(email = "") {
  const normalized = String(email).trim().toLowerCase();
  if (!normalized) return "member";
  if (normalized.includes("admin") || normalized.includes("super")) {
    return "super_admin";
  }
  if (normalized.includes("trainer")) {
    return "trainer";
  }
  return "member";
}

export function canManageUser(actorRole, targetRole) {
  const actor = normalizeRole(actorRole);
  const target = normalizeRole(targetRole);

  if (actor === "super_admin") return true;
  if (actor === "trainer") return target !== "super_admin";
  return false;
}

export function getServiceAccountConfig() {
  const rawValue =
    process.env.FIREBASE_SERVICE_ACCOUNT ||
    (() => {
      const possiblePaths = [
        path.resolve(process.cwd(), ".dev.vars"),
        path.resolve(process.cwd(), "src", ".dev.vars"),
      ];

      for (const envFile of possiblePaths) {
        if (!fs.existsSync(envFile)) continue;
        const content = fs.readFileSync(envFile, "utf8");
        const match = content.match(
          /FIREBASE_SERVICE_ACCOUNT\s*=\s*(\{[\s\S]*?\})\s*(?:\n|$)/,
        );
        if (match) {
          return match[1];
        }
      }

      return "";
    })();

  return parseServiceAccountConfig(rawValue);
}

let adminApp;

export function ensureFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const serviceAccount = getServiceAccountConfig();
  if (
    !serviceAccount ||
    !serviceAccount.project_id ||
    !serviceAccount.client_email
  ) {
    return null;
  }

  adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return adminApp;
}

export async function listManagedUsers(actorRole = "member") {
  const normalizedRole = normalizeRole(actorRole);
  const app = ensureFirebaseAdmin();

  if (!app) {
    return [
      {
        uid: "u1",
        name: "Alex Thompson",
        email: "superadmin@gymflow.local",
        role: "super_admin",
        gymId: "gym_1",
      },
      {
        uid: "u2",
        name: "Daniel Lee",
        email: "trainer@gymflow.local",
        role: "trainer",
        gymId: "gym_1",
      },
      {
        uid: "u3",
        name: "Sarah Adams",
        email: "member@gymflow.local",
        role: "member",
        gymId: "gym_1",
      },
    ].filter((entry) => {
      if (normalizedRole === "super_admin") return true;
      if (normalizedRole === "trainer") return entry.role !== "super_admin";
      return entry.role === "member";
    });
  }

  const auth = admin.auth();
  const { users } = await auth.listUsers();

  return users
    .map((user) => {
      const role = normalizeRole(
        user.customClaims?.role || resolveRoleFromEmail(user.email || ""),
      );

      return {
        uid: user.uid,
        name: user.displayName || user.email?.split("@")[0] || "Gym User",
        email: user.email || "",
        role,
        gymId: "gym_1",
      };
    })
    .filter((user) => {
      if (normalizedRole === "super_admin") return true;
      if (normalizedRole === "trainer") return user.role !== "super_admin";
      return user.role === "member";
    });
}

export async function updateUserRole(uid, nextRole, actorRole) {
  const targetRole = normalizeRole(nextRole);
  const actor = normalizeRole(actorRole);

  if (!canManageUser(actor, targetRole)) {
    const error = new Error("You are not allowed to change that role.");
    error.statusCode = 403;
    throw error;
  }

  const app = ensureFirebaseAdmin();
  if (!app) {
    return {
      uid,
      role: targetRole,
      fallback: true,
    };
  }

  await admin.auth().setCustomUserClaims(uid, { role: targetRole });

  return {
    uid,
    role: targetRole,
    success: true,
  };
}

router.get("/users", async (req, res) => {
  try {
    const actorRole = normalizeRole(String(req.query.role || "member"));
    const users = await listManagedUsers(actorRole);
    return res.json({ success: true, users });
  } catch (error) {
    console.error("Unable to load admin users:", error);
    return res
      .status(500)
      .json({ success: false, error: "Unable to load users" });
  }
});

router.post("/users/:uid/role", async (req, res) => {
  try {
    const actorRole = normalizeRole(
      String(req.body.actorRole || req.query.role || "member"),
    );
    const nextRole = normalizeRole(String(req.body.role || "member"));
    const result = await updateUserRole(req.params.uid, nextRole, actorRole);
    return res.json({ success: true, user: result });
  } catch (error) {
    console.error("Unable to update user role:", error);
    const status = error?.statusCode || 500;
    return res
      .status(status)
      .json({
        success: false,
        error: error.message || "Unable to update user role",
      });
  }
});

export default router;
