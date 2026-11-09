import { AppError } from '../utils/AppError.js';

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError('Forbidden: You do not have permission for this resource.', 403));
    }
    next();
  };
};
