'use strict';

/**
 * repair-report service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::repair-report.repair-report');
