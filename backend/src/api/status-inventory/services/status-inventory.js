'use strict';

/**
 * status-inventory service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::status-inventory.status-inventory');
