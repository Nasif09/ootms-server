const express = require('express');


const userRoutes = require('../modules/User/user.route');
// const favouriteDriverRoutes = require('../modules/PrefferedDriver/prefferedDriver.route');
 const loadRoutes = require('../modules/Load/load.route');
// const loadRequestRoutes = require('../modules/LoadRequest/loadRequest.route');
// const mySubscriptionRoutes = require('../modules/MySubscription/mySubscription.route');
// const subscriptionRoutes = require('../modules/Subscription/subscription.route');
// const transportRoutes = require('../modules/Transport/transport.route');

const router = express.Router();


const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  // {
  //   path: '/favourite-driver',
  //   route: favouriteDriverRoutes,
  // },
  {
    path: '/load',
    route: loadRoutes,
  },
  // {
  //   path: '/load-request',
  //   route: loadRequestRoutes,
  // },
  // {
  //   path: '/my-subscription',
  //   route: mySubscriptionRoutes,
  // },
  // {
  //   path: '/subscription',
  //   route: subscriptionRoutes,
  // },
  // {
  //   path: '/transport',
  //   route: transportRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;