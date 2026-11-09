import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authRepository } from './auth.repository.js';
import { AppError } from '../../shared/utils/AppError.js';
import { env } from '../../config/env.js';

export const authService = {
  async register({ name, email, password, phone }) {
    const existing = await authRepository.findByEmail(email);
    if (existing) {
      throw new AppError('Email is already registered.', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await authRepository.create({
      name,
      email,
      passwordHash,
      phone,
      role: 'CUSTOMER',
    });

    const token = this.generateToken(user);
    return { user, token };
  },

  async login({ email, password }) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new AppError('Invalid email or password.', 401);
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    const token = this.generateToken(safeUser);
    return { user: safeUser, token };
  },

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  },
};
