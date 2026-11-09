import { catalogService } from './catalog.service.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';

export const catalogController = {
  getAll: asyncHandler(async (req, res) => {
    const activeOnly = req.query.all !== 'true';
    const services = await catalogService.listServices(activeOnly);
    res.status(200).json({ success: true, count: services.length, data: services });
  }),

  getById: asyncHandler(async (req, res) => {
    const service = await catalogService.getService(req.params.id);
    res.status(200).json({ success: true, data: service });
  }),

  create: asyncHandler(async (req, res) => {
    const service = await catalogService.createService(req.body);
    res.status(201).json({ success: true, data: service });
  }),

  update: asyncHandler(async (req, res) => {
    const service = await catalogService.updateService(req.params.id, req.body);
    res.status(200).json({ success: true, data: service });
  }),

  remove: asyncHandler(async (req, res) => {
    await catalogService.removeService(req.params.id);
    res.status(200).json({ success: true, message: 'Service deactivated successfully' });
  }),
};
