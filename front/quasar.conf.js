// Configuration for your app
const webpack = require('webpack')
const envparser = require('./config/envparser')
const path = require('path')

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    boot: [
      'axios',
      'vue-the-mask',
      'clone-deep',
      'vue-currency-filter',
      //'fontawesome-pro',
      'vuelidate',
      'downloadjs'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      'roboto-font',
      'material-icons',
      // 'ionicons-v4',
      // 'mdi-v4',
      'fontawesome-v5'
    ],
    framework: {
      // iconSet: 'ionicons-v4',
      lang: 'pt-br', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QLinearProgress',
        'QInput',
        'QSelect',
        'QLinearProgress',
        'QToggle',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QSeparator',
        'QDialog',
        'QImg',
        'QScrollArea',
        'QTree',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QTabPanels',
        'QTabPanel',
        'QAvatar',
        'QMenu',
        'QBtnGroup',
        'QBtnDropdown',
        'QField',
        'QForm',
        'QFile',
        'QExpansionItem',
        'QInfiniteScroll',
        'QDate',
        'QPopupProxy',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QPageScroller',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QUploader',
        'QChip',
        'QTooltip',
        'QCheckbox',
        'QRadio',
        'QOptionGroup',
        'QTooltip',
        'QVideo',
        'QBar',
        'QSpace',
        'QEditor',
        'QColor',
        'QBadge',
        'QCircularProgress',
        'QBtnToggle',
        'QSlider'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Cookies',
        'Dialog',
        'LocalStorage',
        'Loading',
        'Meta'
      ]
    },

    supportIE: true,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      //publicPath: '/epricing',
      env: envparser(),
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack(cfg) {
        cfg.resolve.alias.env = path.resolve(__dirname, 'config/helpers/env.js')

        cfg.plugins.push(
          new webpack.ProvidePlugin({
            'env': 'env'
          })
        )
      }
    },
    devServer: {
      // https: true,
      port: 3090,
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [
    ],
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Go Facility',
        // short_name: 'Go Facility',
        // description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/favicon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/favicon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/favicon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/favicon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/favicon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack(cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
      }
    },
  }
}
