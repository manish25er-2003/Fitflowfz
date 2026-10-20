import dotenv from "dotenv";
import express from "express";
import { Resend } from "resend";
import twilio from "twilio";

dotenv.config();

const router = express.Router();
const processedRefs = new Set();

const normalizePhone = (value = "") => value.replace(/\s+/g, "");

async function withRetry(operation, retries = 2, delayMs = 500) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayMs * (attempt + 1)),
        );
      }
    }
  }

  throw lastError;
}

const emailProvider = () =>
  process.env.RESEND_API_KEY ? "resend" : "unconfigured";
const smsProvider = () =>
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? "twilio"
    : "unconfigured";

export function validateNotificationPayload(payload = {}) {
  const errors = [];

  if (!payload.memberName || !String(payload.memberName).trim()) {
    errors.push("memberName is required");
  }

  if (
    !payload.memberEmail ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.memberEmail)
  ) {
    errors.push("memberEmail must be a valid email address");
  }

  if (
    !payload.memberPhone ||
    !/^\+?[1-9]\d{7,14}$/.test(normalizePhone(payload.memberPhone))
  ) {
    errors.push("memberPhone must be a valid mobile number");
  }

  if (!payload.referenceId || !String(payload.referenceId).trim()) {
    errors.push("referenceId is required");
  }

  if (!payload.planName || !String(payload.planName).trim()) {
    errors.push("planName is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function isDuplicateNotification(referenceId, refs = processedRefs) {
  if (!referenceId) return false;
  return refs.has ? refs.has(referenceId) : refs.includes(referenceId);
}

export function generateMembershipConfirmationEmail(payload) {
  const amount = Number(payload.amountPaid || 0);
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: payload.currency || "INR",
    maximumFractionDigits: 0,
  }).format(amount);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FZ Gym Membership Confirmation</title>
  <style>
    body { margin: 0; background: #121826; color: #ffffff; font-family: Arial, sans-serif; }
    .wrap { max-width: 640px; margin: 0 auto; background: #1a2332; border-radius: 20px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #111827, #1f2937); padding: 28px 24px; text-align: center; }
    .brand { font-size: 30px; font-weight: 800; letter-spacing: 0.08em; }
    .badge { display: inline-block; background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 12px; font-weight: 700; padding: 8px 12px; border-radius: 999px; margin-top: 12px; }
    .content { padding: 28px 24px; }
    .title { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
    .muted { color: #cbd5e1; line-height: 1.7; }
    .card { background: rgba(248, 113, 113, 0.08); border: 1px solid rgba(248, 113, 113, 0.35); border-radius: 16px; padding: 22px; margin: 24px 0; }
    .plan { font-size: 28px; font-weight: 800; }
    .meta { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .meta td { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; }
    .meta td:last-child { text-align: right; }
    .cta { display: inline-block; background: #ef4444; color: #fff; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-weight: 700; margin-top: 18px; }
    .footer { background: #111827; padding: 24px; text-align: center; color: #cbd5e1; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="brand">FZ GYM</div>
      <div class="badge">MEMBERSHIP CONFIRMED</div>
    </div>
    <div class="content">
      <div class="title">Hi ${payload.memberName},</div>
      <p class="muted">Welcome aboard. Your subscription has been successfully confirmed and your membership is now active. We are excited to help you achieve your fitness goals.</p>
      <div class="card">
        <div style="font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #fca5a5; font-weight: 700;">${payload.isOffer ? payload.offerName || "Special Offer" : "Membership Plan"}</div>
        <div class="plan">${payload.planName}</div>
        <div style="font-size: 18px; font-weight: 700; margin-top: 12px;">${formattedAmount}</div>
        <table class="meta">
          <tr><td>Registration date</td><td>${payload.startDate}</td></tr>
          <tr><td>Membership end</td><td>${payload.expiryDate}</td></tr>
          <tr><td>Payment status</td><td>${payload.paymentStatus}</td></tr>
          <tr><td>Reference</td><td>${payload.referenceId}</td></tr>
        </table>
      </div>
      <p class="muted">Your membership includes access to the gym floor, trainer guidance, and all member support services. Please keep this email as your confirmation record.</p>
      <a class="cta" href="https://fitflowgym.local/member/dashboard">Open Member Dashboard</a>
    </div>
    <div class="footer">
      FZ Gym • Support: support@fitflowgym.com
    </div>
  </div>
</body>
</html>`;
}

export function generateMembershipConfirmationSms(payload) {
  return `FZ Gym: Welcome ${payload.memberName}! Your ${payload.planName} membership is confirmed. Effective from ${payload.startDate} to ${payload.expiryDate}. Reference: ${payload.referenceId}.`;
}

export async function sendEmailViaResend(payload, html) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(apiKey);
  const response = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Fitflow Gym <onboarding@resend.dev>",
    to: payload.memberEmail,
    subject: `FZ Gym Membership Confirmed - ${payload.planName}`,
    html,
  });

  if (response.error) {
    throw new Error(response.error.message || "Email send failed");
  }

  return {
    delivered: true,
    provider: "Resend",
    status: "sent",
    recipient: payload.memberEmail,
    subject: `FZ Gym Membership Confirmed - ${payload.planName}`,
    message: "Successfully delivered via Resend API.",
  };
}

export async function sendSmsViaTwilio(payload, message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    throw new Error("Twilio credentials are not configured");
  }

  const client = twilio(accountSid, authToken);
  const result = await client.messages.create({
    body: message,
    from: fromNumber,
    to: payload.memberPhone,
  });

  return {
    delivered: Boolean(result.sid),
    provider: "Twilio",
    status: result.sid ? "sent" : "failed",
    recipient: payload.memberPhone,
    message: result.sid
      ? "Successfully delivered via Twilio SMS."
      : "Twilio returned no message SID.",
  };
}

export async function dispatchMembershipNotification(payload) {
  const normalized = {
    ...payload,
    memberPhone: normalizePhone(payload.memberPhone || ""),
  };

  const validation = validateNotificationPayload(normalized);
  if (!validation.isValid) {
    return {
      success: false,
      duplicate: false,
      error: validation.errors.join("; "),
      email: {
        delivered: false,
        provider: emailProvider(),
        status: "failed",
        recipient: normalized.memberEmail,
        subject: `FZ Gym Membership Confirmed - ${normalized.planName}`,
        message: validation.errors.join("; "),
      },
      sms: {
        delivered: false,
        provider: smsProvider(),
        status: "failed",
        recipient: normalized.memberPhone,
        message: validation.errors.join("; "),
      },
    };
  }

  if (processedRefs.has(normalized.referenceId)) {
    return {
      success: true,
      duplicate: true,
      referenceId: normalized.referenceId,
      email: {
        delivered: true,
        provider: emailProvider(),
        status: "sent",
        recipient: normalized.memberEmail,
        subject: `FZ Gym Membership Confirmed - ${normalized.planName}`,
        message: "Duplicate prevented. Already delivered previously.",
      },
      sms: {
        delivered: true,
        provider: smsProvider(),
        status: "sent",
        recipient: normalized.memberPhone,
        message: "Duplicate prevented. Already delivered previously.",
      },
      inApp: {
        created: true,
        notificationId: `notif-${normalized.referenceId}`,
      },
    };
  }

  const html = generateMembershipConfirmationEmail(normalized);
  const smsText = generateMembershipConfirmationSms(normalized);

  const emailResult = {
    delivered: false,
    provider: emailProvider(),
    status: "unconfigured_provider",
    recipient: normalized.memberEmail,
    subject: `FZ Gym Membership Confirmed - ${normalized.planName}`,
    message: "Email not configured on server.",
  };
  const smsResult = {
    delivered: false,
    provider: smsProvider(),
    status: "unconfigured_provider",
    recipient: normalized.memberPhone,
    message: "SMS not configured on server.",
  };

  try {
    if (emailProvider() === "resend") {
      const emailDelivery = await withRetry(
        () => sendEmailViaResend(normalized, html),
        2,
        500,
      );
      Object.assign(emailResult, emailDelivery);
    }
  } catch (error) {
    emailResult.status = "failed";
    emailResult.message = error?.message || "Email failed";
  }

  try {
    if (smsProvider() === "twilio") {
      const smsDelivery = await withRetry(
        () => sendSmsViaTwilio(normalized, smsText),
        2,
        500,
      );
      Object.assign(smsResult, smsDelivery);
    }
  } catch (error) {
    smsResult.status = "failed";
    smsResult.message = error?.message || "SMS failed";
  }

  processedRefs.add(normalized.referenceId);

  return {
    success: true,
    duplicate: false,
    referenceId: normalized.referenceId,
    timestamp: new Date().toISOString(),
    email: emailResult,
    sms: smsResult,
    inApp: { created: true, notificationId: `notif-${normalized.referenceId}` },
  };
}

router.post("/confirm-subscription", async (req, res) => {
  try {
    const payload = req.body || {};
    const result = await dispatchMembershipNotification(payload);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Notification request failed:", error.message || error);
    return res
      .status(500)
      .json({ success: false, error: "Notification request failed" });
  }
});

export default router;
