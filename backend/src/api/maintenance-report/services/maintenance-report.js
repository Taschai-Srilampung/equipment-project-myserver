'use strict';

/**
 * maintenance-report service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::maintenance-report.maintenance-report');
