'use strict';

/**
 * responsible service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::responsible.responsible');
