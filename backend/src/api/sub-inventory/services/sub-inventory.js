'use strict';

/**
 * sub-inventory service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sub-inventory.sub-inventory');
