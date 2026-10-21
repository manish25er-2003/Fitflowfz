import { describe, expect, it } from "vitest";
import {
  isDuplicateNotification,
  validateNotificationPayload,
} from "./notificationService";
import { buildUpiPaymentLink } from "./upi";

describe("notification validation", () => {
  it("accepts a valid registration confirmation payload", () => {
    const result = validateNotificationPayload({
      memberName: "Aisha Khan",
      memberEmail: "aisha@example.com",
      memberPhone: "+919876543210",
      planId: "monthly",
      planName: "Monthly Unlimited",
      amountPaid: 1499,
      startDate: "2026-10-20",
      expiryDate: "2026-11-20",
      paymentStatus: "Paid",
      referenceId: "sub-123456",
      paymentMethod: "UPI",
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects invalid email and mobile values", () => {
    const result = validateNotificationPayload({
      memberName: "Aisha Khan",
      memberEmail: "invalid-email",
      memberPhone: "123",
      planId: "monthly",
      planName: "Monthly Unlimited",
      amountPaid: 1499,
      startDate: "2026-10-20",
      expiryDate: "2026-11-20",
      paymentStatus: "Paid",
      referenceId: "sub-123456",
      paymentMethod: "UPI",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "memberEmail must be a valid email address",
    );
    expect(result.errors).toContain(
      "memberPhone must be a valid mobile number",
    );
  });

  it("prevents duplicate notification references", () => {
    expect(
      isDuplicateNotification("sub-123456", ["sub-123456", "sub-999999"]),
    ).toBe(true);
    expect(isDuplicateNotification("sub-111111", ["sub-123456"])).toBe(false);
  });

  it("builds a valid UPI payment deeplink for the free checkout flow", () => {
    const link = buildUpiPaymentLink({
      upiId: "7087338600@ybl",
      amount: 18000,
      name: "FZ Gym",
      purpose: "FZ Gym Membership Payment",
    });

    expect(link).toContain("upi://pay");
    expect(link).toContain("pa=7087338600%40ybl");
    expect(link).toContain("am=18000.00");
    expect(link).toContain("cu=INR");
  });
});
