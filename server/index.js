import express from "express";
import dotenv from "dotenv";
import notificationsRouter from "./notifications.js";
import adminUsersRouter from "./adminUsers.js";
import razorpayRouter from "./razorpay.js";

dotenv.config();

dotenv.config({ path: process.cwd() + "/src/.dev.vars" });

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json({ limit: "2mb" }));
app.use("/api/notifications", notificationsRouter);
app.use("/api/admin", adminUsersRouter);
app.use("/api/payments", razorpayRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "fitflow-notifications" });
});

app.listen(port, () => {
  console.log(`Notification server running at http://localhost:${port}`);
});
