import Vue from 'vue'
import Router from 'vue-router'
import App from '../Components/App.vue'
import Oauth from '../Components/Oauth.vue'
import Login from '../Components/Login.vue'
import Register from '../Components/Register.vue'
import Profile from '../Components/Profile.vue'
import AboutUs from '../Components/AboutUs.vue'
import Products from '../Components/Products.vue'
import Product from '../Components/Product.vue'
import ProductDescription from '../Components/ProductDescription.vue'
import Payment from '../Components/Payment.vue'
import ProductDetails from '../Components/ProductDetails.vue'
import ProductTips from '../Components/ProductTips.vue'
import ShoppingCart from '../Components/ShoppingCart.vue'
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