const { Analytics } = require('analytics')
// or const Analytics = require('analytics').default
const googleAnalytics = require('@analytics/google-analytics')
// const customerIo = require('@analytics/customerio')

const analytics = Analytics({
  app: 'my-app-name',
  version: 100,
  plugins: [
    googleAnalytics({
      trackingId: 'UA-338314450',
    }),
    // customerIo({
    //   siteId: '123-xyz',
    // }),
  ],
})

/* Track a page view */
analytics.page()

/* Track a custom event */
analytics.track('userPurchase', {
  price: 20,
  item: 'pink socks',
})

/* Identify a visitor */
analytics.identify('{{user.id}}', {
  fullName: '{{user.fullname}}',
  email: '{{user-email}}',
})
