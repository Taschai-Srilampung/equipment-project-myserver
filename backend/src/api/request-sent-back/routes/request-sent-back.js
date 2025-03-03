'use strict';

/**
 * request-sent-back router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::request-sent-back.request-sent-back');
