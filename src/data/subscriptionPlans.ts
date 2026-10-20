import type { PlanRecord } from "../types";

export const subscriptionPlans: PlanRecord[] = [
  {
    id: "monthly",
    name: "Monthly",
    description: "Full gym access, month-to-month flexibility.",
    duration: "1 Month",
    price: 1500,
    currency: "INR",
    durationDays: 30,
    benefits: [
      "Unlimited gym floor access",
      "Locker room & shower access",
      "All equipment & weights included",
      "Personal posture & check-in session",
      "Cancel or renew anytime",
    ],
    sessionLimit: 30,
    status: "Active",
    pricing: {
      monthly: 1500,
      quarterly: 4500,
      semiAnnual: 9000,
      annual: 18000,
    },
  },
  {
    id: "quarterly",
    name: "Quarterly",
    description:
      "3 Months commitment — steady fitness routine & habit building.",
    duration: "3 Months",
    price: 4500,
    currency: "INR",
    durationDays: 90,
    benefits: [
      "Unlimited gym floor access",
      "Locker room & shower access",
      "Quarterly fitness assessment",
      "Personalized diet & workout guide",
      "Save ₹600 vs monthly renewal",
    ],
    sessionLimit: 90,
    status: "Active",
    pricing: {
      monthly: 1500,
      quarterly: 4500,
      semiAnnual: 9000,
      annual: 18000,
    },
  },
  {
    id: "half_yearly",
    name: "6 Months",
    description:
      "6 Months of transformation — major strength & body recomposition.",
    duration: "6 Months",
    price: 9000,
    currency: "INR",
    durationDays: 180,
    benefits: [
      "Unlimited gym floor access",
      "Locker room & dedicated locker slot",
      "Bi-monthly body composition scans",
      "Priority group class reservations",
      "Save ₹1,200 vs monthly renewal",
    ],
    sessionLimit: 180,
    status: "Active",
    pricing: {
      monthly: 1500,
      quarterly: 4500,
      semiAnnual: 9000,
      annual: 18000,
    },
  },
  {
    id: "annual",
    name: "Yearly",
    description: "Full access all year — best value, biggest savings.",
    duration: "12 Months",
    price: 18000,
    currency: "INR",
    durationDays: 365,
    benefits: [
      "Unlimited gym floor access (365 days)",
      "Locker room & shower access",
      "Full coaching & assessment pack",
      "Priority class booking & guest passes",
      "Save ₹3,000 vs monthly renewal",
    ],
    sessionLimit: 365,
    status: "Active",
    pricing: {
      monthly: 1500,
      quarterly: 4500,
      semiAnnual: 9000,
      annual: 18000,
    },
  },
];

export const defaultSubscriptionPlanId = "quarterly";

export function formatIndianCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
