import Vue from 'vue'
import Router from 'vue-router'
import store from '../Store'

import Oauth from '../Pages/Oauth.vue'
import LoginPage from '../Pages/LoginPage.vue'
import RegisterPage from '../Pages/RegisterPage.vue'
import AccountPage from '../Pages/AccountPage.vue'
import AboutUsPage from '../Pages/AboutUsPage.vue'
import HomePage from '../Pages/HomePage.vue'
import ProductPage from '../Pages/ProductPage.vue'
import ProductDescription from '../Components/ProductDescription.vue'
import ProductDetails from '../Components/ProductDetails.vue'
import ProductTips from '../Components/ProductTips.vue'
import PaymentPage from '../Pages/PaymentPage.vue'
import ShoppingCartPage from '../Pages/ShoppingCartPage.vue'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        /* {
            path: '/login',
            name: 'App',
            component: App,
            redirect: { name: 'Login' }
        }, */
        {
            path: '/oauth',
            name: 'Oauth',
            component: Oauth
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/register',
            name: 'RegisterPage',
            component: RegisterPage
        },
        {
            path: '/',
            name: 'HomePage',
            component: HomePage,
            props: true,
            meta: {
              auth: true
            }
        },
        {
            path: '/product/:category/:productName',
            name: 'ProductPage',
            component: ProductPage,
            props: true,
            meta: {
              auth: true
            },
            children: [
                {
                    path: 'description',
                    name: 'ProductDescription',
                    component: ProductDescription
                },
                {
                    path: 'details',
                    name: 'ProductDetails',
                    component: ProductDetails
                },
                {
                    path: 'tips',
                    name: 'ProductTips',
                    component: ProductTips
                }
            ]
        },
        {
            path: '/profile',
            name: 'AccountPage',
            component: AccountPage,
            meta: {
              auth: true
            }
        },
        {
            path: '/about',
            name: 'AboutUsPage',
            component: AboutUsPage,
            meta: {
              auth: true
            }
        },
        {
            path: '/shoppingcart',
            name: 'ShoppingCartPage',
            component: ShoppingCartPage,
            meta: {
              auth: true
            }
        },
        {
            path: '/checkout',
            name: 'PaymentPage',
            component: PaymentPage,
            meta: {
              auth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const loggedIn = store.state.user.userAuth;
    console.log('loggedIn: ', loggedIn);
    const publicPages = ['/', '/login', '/register', '/oauth'];
    if (to.matched.some(record => record.meta.auth)) {
        if (!loggedIn) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            if(from.query.redirect){
                next(`/${from.query.redirect}`)
            } else {
                next()
            }
        }
    } else {
        if(publicPages.includes(to.path) && loggedIn){
            next('/')
        } else {
            next()
        }
    }
})