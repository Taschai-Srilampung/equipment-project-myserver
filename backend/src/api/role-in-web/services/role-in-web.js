'use strict';

/**
 * role-in-web service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::role-in-web.role-in-web');
