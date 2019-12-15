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
import ProductPayment from '../Components/ProductPayment.vue'
import ProductDetails from '../Components/ProductDetails.vue'
import ProductTips from '../Components/ProductTips.vue'
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
            path: '/products',
            name: 'Products',
            component: Products
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
        }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/', '/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('userFullName');
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    if ((to.path == '/login' || to.path == '/register') && loggedIn) {
        return next('/products');
    }
    if (from.path == '/product/' + from.params.id + '/description' && to.path == '/product/' + from.params.id) {
        return next('/products');
    }
    next();
})