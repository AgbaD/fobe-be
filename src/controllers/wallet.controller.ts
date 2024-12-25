import { NextFunction, Request, Response } from "express";
import { WalletService } from "../services/wallet.service";
import { RequestWithUser } from "../middleware/auth.middleware";

const walletService = new WalletService()

export class WalletController{
    async fundAccount (
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { amount } = req.body; 
            const userId = (req as RequestWithUser)['user']['id']; 
            const resp = await walletService.fundAccount(userId, amount)
            res.status(200).json({
                status: "success",
                message: 'funding complete',
                data: resp,
            });
        }  catch (error) {
            next(error)
        }
    }

    async transferFunds (
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { receiverId, amount } = req.body; 
            const userId = (req as RequestWithUser)['user']['id']; 
            const transaction = await walletService.transferFunds({senderId: userId, receiverId, amount})
            res.status(200).json({
                status: "success",
                message: 'transfer complete',
                data: transaction,
            });
        }  catch (error) {
            next(error)
        }
    };
}