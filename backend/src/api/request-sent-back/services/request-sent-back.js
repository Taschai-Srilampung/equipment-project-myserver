'use strict';

/**
 * request-sent-back service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::request-sent-back.request-sent-back');
