import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware.js';
import { UserService } from './user.service.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

export class UserController {
  static async listUsers(req: AuthenticatedRequest, res: Response) {
    try {
      const users = await UserService.listUsers(req.tenantId!);
      return sendSuccess(res, users);
    } catch (err: any) {
      return sendError(res, err.code || 'LIST_USERS_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async getUserById(req: AuthenticatedRequest, res: Response) {
    try {
      const { userId } = req.params;
      const user = await UserService.getUserById(req.tenantId!, userId);
      return sendSuccess(res, user);
    } catch (err: any) {
      return sendError(res, err.code || 'GET_USER_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async createUser(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await UserService.createUser(req.tenantId!, req.body, req.user.userId);
      return sendSuccess(res, user, {}, 201);
    } catch (err: any) {
      return sendError(res, err.code || 'CREATE_USER_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async updateUser(req: AuthenticatedRequest, res: Response) {
    try {
      const { userId } = req.params;
      const user = await UserService.updateUser(req.tenantId!, userId, req.body, req.user.userId);
      return sendSuccess(res, user);
    } catch (err: any) {
      return sendError(res, err.code || 'UPDATE_USER_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async setUserStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { userId } = req.params;
      const { status } = req.body;
      const user = await UserService.setUserStatus(req.tenantId!, userId, status, req.user.userId);
      return sendSuccess(res, user);
    } catch (err: any) {
      return sendError(res, err.code || 'UPDATE_STATUS_FAILED', err.message, err.statusCode || 500);
    }
  }
}
