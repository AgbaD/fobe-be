import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../middleware/auth.middleware";
import { TransactionService } from "../services/transaction.service";

const transactionService = new TransactionService()

export class TransactionController{

    async getTransactionHistory (
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userId = (req as RequestWithUser)['user']['id']; 
            const transactions = await transactionService.getTransactionHistory(userId)
            res.status(200).json({
                status: "success",
                message: 'fetching complete',
                data: transactions,
            });
        } catch (error) {
            next(error)
        }
    };

    async transactionWebhook (
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            await transactionService.transactionWebhook(req.body)
            res.status(200).json({
                status: "success",
                message: 'webhook complete',
            });
        } catch (error) {
            next(error)
        }
    };
}

