import Vue from 'vue'
import Router from 'vue-router'

import App from  '../Pages/App.vue'
import Oauth from '../Pages/Oauth.vue'
import Login from '../Pages/Login.vue'
import Register from '../Pages/Register.vue'
import Profile from '../Pages/Profile.vue'
import AboutUs from '../Pages/AboutUs.vue'
import Products from '../Pages/Products.vue'
import Product from '../Pages/Product.vue'
import ProductDescription from '../Components/ProductDescription.vue'
import ProductDetails from '../Components/ProductDetails.vue'
import ProductTips from '../Components/ProductTips.vue'
import Payment from '../Pages/Payment.vue'
import ShoppingCart from '../Pages/ShoppingCart.vue'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'App',
            component: App,
            redirect: { name: 'Login' }
        },
        {
            path: '/oauth',
            name: 'Oauth',
            component: Oauth
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/products/:numPage',
            name: 'Products',
            component: Products,
            props: true,
            meta: {
              auth: true
            }
        },
        {
            path: '/product/:id',
            name: 'Product',
            component: Product,
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
            name: 'Profile',
            component: Profile,
            meta: {
              auth: true
            }
        },
        {
            path: '/about',
            name: 'AboutUs',
            component: AboutUs,
            meta: {
              auth: true
            }
        },
        {
            path: '/shoppingcart',
            name: 'ShoppingCart',
            component: ShoppingCart,
            meta: {
              auth: true
            }
        },
        {
            path: '/checkout',
            name: 'Payment',
            component: Payment,
            meta: {
              auth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('userFullName');
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
            next('/products/1')
        } else {
            next()
        }
    }
})