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
        },
        {
            path: '/product/:id',
            name: 'Product',
            component: Product,
            props: true,
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
            component: Profile
        },
        {
            path: '/about',
            name: 'AboutUs',
            component: AboutUs
        },
        {
            path: '/shoppingcart',
            name: 'ShoppingCart',
            component: ShoppingCart
        },
        {
            path: '/checkout',
            name: 'Payment',
            component: Payment
        }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/', '/login', '/register', '/oauth'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('userFullName');
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    if ((to.path == '/login' || to.path == '/register') && loggedIn) {
        return next('/products/1');
    }
    if (from.path == '/product/' + from.params.id + '/description' && to.path == '/product/' + from.params.id) {
        return next('/products/1');
    }
    next();
})