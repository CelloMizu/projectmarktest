import store from '../store'

function checkAllowed(route_name) {
    let access_level = store.getters['getAccessLevel']
    let allowed = false
    if (access_level.length > 0) {
        let obj_raw = access_level.find((obj) => { return obj.route_name == route_name })
        if (obj_raw) allowed = obj_raw.allow
    }

    return allowed
}

const routes = [
    {
        path: '/',
        name: 'base',
        component: () => import('pages/base/base.vue'),
        beforeEnter: (to, from, next) => {
            if (store.getters['getUserToken']) {
                next({ name: 'home' })
            }
            else {
                next()
            }
        }
    },
    // {
    //     path: '/',
    //     component: () => import('layouts/default.vue'),
    //     children: [
    //         {
    //             path: '/nnn', name: 'empty', component: () => import('pages/empty.vue'), params: true,
    //             beforeEnter: (to, from, next) => {
    //                 if (store.getters['getUserToken']) {
    //                     next()
    //                 }
    //                 else {
    //                     next({ name: 'login' })
    //                 }
    //             }
    //         },
    //     ]
    // },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/404.vue')
    })
}

export default routes
