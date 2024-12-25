import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { WalletController } from "../controllers/wallet.controller";

const router = Router();
const walletController = new WalletController()

router.post("/transfer", authMiddleware, walletController.transferFunds);
router.post("/fund", authMiddleware, walletController.fundAccount);

export default router;
