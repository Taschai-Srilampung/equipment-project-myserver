'use strict';

/**
 * request-disposal service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::request-disposal.request-disposal');
