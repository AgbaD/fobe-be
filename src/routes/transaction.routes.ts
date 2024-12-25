import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { TransactionController } from "../controllers/transaction.controller";

const router = Router();
const transactionController = new TransactionController()

router.get("/history", authMiddleware, transactionController.getTransactionHistory);

export default router;
