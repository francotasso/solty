import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import AccountPage from '../pages/AccountPage.vue'
import AboutUsPage from '../pages/AboutUsPage.vue'
import HomePage from '../pages/HomePage.vue'
import CategoryGender from '../pages/CategoryGender.vue'
import ProductPage from '../pages/ProductPage.vue'
import ProductDescription from '../components/product/ProductDescription.vue'
import ProductDetails from '../components/product/ProductDetails.vue'
import ProductTips from '../components/product/ProductTips.vue'
import PaymentPage from '../pages/PaymentPage.vue'
import ShoppingCartPage from '../pages/ShoppingCartPage.vue'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
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
            path: '/category/:gender',
            name: 'CategoryGender',
            component: CategoryGender,
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