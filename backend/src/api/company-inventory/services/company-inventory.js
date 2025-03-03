'use strict';

/**
 * company-inventory service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::company-inventory.company-inventory');
