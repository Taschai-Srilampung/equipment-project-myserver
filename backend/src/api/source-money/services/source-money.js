'use strict';

/**
 * source-money service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::source-money.source-money');
