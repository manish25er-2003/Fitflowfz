import { describe, expect, it } from "vitest";
import {
  parseServiceAccountConfig,
  normalizeRole,
  canManageUser,
} from "./adminUsers.js";

describe("admin user service", () => {
  it("parses a service account JSON block from .dev.vars", () => {
    const raw = `FIREBASE_SERVICE_ACCOUNT =  {
      "type": "service_account",
      "project_id": "fitflowfz",
      "private_key_id": "abc123",
      "private_key": "-----BEGIN PRIVATE KEY-----\\nkey\\n-----END PRIVATE KEY-----\\n",
      "client_email": "firebase-adminsdk-fbsvc@fitflowfz.iam.gserviceaccount.com"
    }`;

    const config = parseServiceAccountConfig(raw);

    expect(config.project_id).toBe("fitflowfz");
    expect(config.client_email).toContain("@fitflowfz");
  });

  it("keeps role access locked to allowed actions", () => {
    expect(normalizeRole("super_admin")).toBe("super_admin");
    expect(normalizeRole("trainer")).toBe("trainer");
    expect(normalizeRole("member")).toBe("member");
    expect(canManageUser("super_admin", "trainer")).toBe(true);
    expect(canManageUser("trainer", "super_admin")).toBe(false);
    expect(canManageUser("trainer", "member")).toBe(true);
  });
});
