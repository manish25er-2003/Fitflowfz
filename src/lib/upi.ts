export function buildUpiPaymentLink({
  upiId,
  amount,
  name,
  purpose,
}: {
  upiId: string;
  amount: number;
  name: string;
  purpose: string;
}) {
  const safeUpiId = String(upiId || "").trim();
  const safeAmount = Number(amount || 0);

  const params = new URLSearchParams({
    pa: safeUpiId,
    pn: String(name || "FZ Gym"),
    am: safeAmount.toFixed(2),
    cu: "INR",
    tn: String(purpose || "FZ Gym Membership Payment"),
  });

  return `upi://pay?${params.toString()}`;
}
