import crypto from "node:crypto";
import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

const isConfigReady =
  Boolean(process.env.RAZORPAY_KEY_ID) &&
  Boolean(process.env.RAZORPAY_KEY_SECRET);

const razorpay = isConfigReady
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

router.post("/create-order", async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(400).json({
        success: false,
        error: "Razorpay keys are not configured on the server.",
      });
    }

    const amount = Number(req.body?.amount || 0);
    const currency = String(req.body?.currency || "INR");
    const receipt = String(req.body?.receipt || `fz-${Date.now()}`);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Payment amount must be greater than zero.",
      });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt,
    });

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Unable to create Razorpay order.",
    });
  }
});

router.post("/verify-signature", async (req, res) => {
  try {
    const { order_id, payment_id, signature, amount, currency } =
      req.body || {};

    if (!order_id || !payment_id || !signature) {
      return res.status(400).json({
        success: false,
        error: "Missing payment verification fields.",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    const isValid = generatedSignature === signature;

    return res.status(200).json({
      success: isValid,
      valid: isValid,
      amount,
      currency,
      paymentId: payment_id,
      orderId: order_id,
    });
  } catch (error) {
    console.error("Razorpay signature verification failed:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Verification failed.",
    });
  }
});

export default router;
