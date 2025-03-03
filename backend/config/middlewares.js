module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://www2.math.sc.chula.ac.th',
        'http://www2.math.sc.chula.ac.th',
        'http://18.139.247.123:5173',
        'http://localhost:5173',
        'http://www2.math.sc.chula.ac.th/docker-project/api',
        'http://www2.math.sc.chula.ac.th/docker-project'
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
