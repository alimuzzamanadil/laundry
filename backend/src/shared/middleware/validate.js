import { AppError } from '../utils/AppError.js';

export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const parsed = schema.safeParse(req[source]);
      if (!parsed.success) {
        const errorDetails = parsed.error.issues.map((i) => i.message).join(', ');
        return next(new AppError(`Validation failed: ${errorDetails}`, 400));
      }
      req[source] = parsed.data;
      next();
    } catch (err) {
      next(err);
    }
  };
};
