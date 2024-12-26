import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService()

export class AuthController{
    async register (
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { email, password, firstname, lastname } = req.body; 
            const user = await authService.registerUser({email, password, firstname, lastname})
            res.status(201).json({
                status: "success",
                message: 'registration complete',
                data: user,
            });
        } catch (error) {
            next(error)
        }
    };

    async login (
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
          const { email, password } = req.body; 
          const resp = await authService.loginUser({email, password})
          res.status(200).json({
              status: "success",
              message: 'login complete',
              data: resp,
          });
        } catch (error) {
          next(error)
        }
    };
}

