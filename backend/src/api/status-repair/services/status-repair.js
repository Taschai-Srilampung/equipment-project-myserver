'use strict';

/**
 * status-repair service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::status-repair.status-repair');
