module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/inventories/check-id-inv',
        handler: 'api::inventory.inventory.checkIdInv',
        config: {
          auth: false,
        },
      },
    ],
  };