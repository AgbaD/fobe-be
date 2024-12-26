import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../middleware/auth.middleware";
import { ProfileService } from "../services/profile.service";

const profileService = new ProfileService()

export class ProfileController{
    async getAllProfiles (
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
          const resp = await profileService.getAllProfiles()
          res.status(200).json({
              status: "success",
              message: 'fetch complete',
              data: resp,
          });
        } catch (error) {
          next(error)
        }
    };

    async getProfile (
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {

          const userId = (req as RequestWithUser)['user']['id']; 
          const resp = await profileService.getProfile(userId)
          res.status(200).json({
              status: "success",
              message: 'fetch complete',
              data: resp,
          });
        } catch (error) {
          next(error)
        }
    };
}

