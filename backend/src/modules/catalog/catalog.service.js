import { catalogRepository } from './catalog.repository.js';
import { AppError } from '../../shared/utils/AppError.js';

export const catalogService = {
  async listServices(activeOnly = true) {
    return catalogRepository.getAll(activeOnly);
  },

  async getService(id) {
    const item = await catalogRepository.getById(id);
    if (!item) throw new AppError('Service not found', 404);
    return item;
  },

  async createService(data) {
    return catalogRepository.create(data);
  },

  async updateService(id, data) {
    const item = await catalogRepository.update(id, data);
    if (!item) throw new AppError('Service not found', 404);
    return item;
  },

  async removeService(id) {
    const item = await catalogRepository.delete(id);
    if (!item) throw new AppError('Service not found', 404);
    return item;
  },
};
