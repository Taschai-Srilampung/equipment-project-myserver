'use strict';

/**
 * inventory controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::inventory.inventory', ({ strapi }) => ({
  async checkIdInv(ctx) {
    const { id_inv } = ctx.query;
    if (typeof id_inv !== 'string') {
      return ctx.badRequest('id_inv must be a string');
    }
    
    const inventories = await strapi.db.query('api::inventory.inventory').findMany({
      where: { id_inv },
    });
    
    return { exists: inventories.length > 0 };
  },
}));