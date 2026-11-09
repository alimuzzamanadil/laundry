import { authService } from './auth.service.js';
import { authRepository } from './auth.repository.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';

export const authController = {
  register: asyncHandler(async (req, res) => {
    const data = await authService.register(req.body);
    res.status(201).json({ success: true, ...data });
  }),

  login: asyncHandler(async (req, res) => {
    const data = await authService.login(req.body);
    res.status(200).json({ success: true, ...data });
  }),

  getProfile: asyncHandler(async (req, res) => {
    const user = await authRepository.findById(req.user.id);
    res.status(200).json({ success: true, user });
  }),
};
