<template>
    <div>
        <div class="container mt-3">
            <h1>PRODUCTOS RELACIONADOS</h1>
            <div class="d-flex flex-column">
                <div class="row-md-3 d-flex justify-content-around flex-wrap mb-3">
                    <div v-for="(product, index) in products" :key="index" class="col-md-4">
                        <img :src="product.image" :alt="product.productName" class="my-2 img-fluid" @click="swapPurchase(product._id)"/>
                        <div>
                        <p style="font-size: 12px;">{{product.brand}}</p>
                        <p style="font-size: 14px;">{{product.productName}}</p>
                        <p style="font-size: 13px;">S/. {{product.price}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import API from "../API/API";
import { mapState, mapActions } from "vuex";
export default {
    name: 'ProductRelated',
    data(){
        return {
            products: []
        }
    },
    computed: {
        ...mapState("product", ["currentProductToBuy", "shoppingCart"])
        
    },
    methods: {
        ...mapActions("product", ["previousPurchase"]),
        async getRelatedProducts(){
            this.products = []
            let url = `${API.url}/products/related/${this.currentProductToBuy.category}`
            let relatedProducts = await axios.get(url, { withCredentials: true })
            for(let product of relatedProducts.data){
                if(product._id!==this.currentProductToBuy._id) this.products.push(product)
            }
        },
        async swapPurchase(id){
            await this.previousPurchase(id)
            this.getRelatedProducts()
            $(document).ready(function() {
                $('html, body').animate({scrollTop:0}, 'slow');
                return false;
            });
        }
    },
    beforeMount(){
        this.getRelatedProducts();
    }
}
</script>

<style scoped>
img{
    transition: all 2s cubic-bezier(0.175, 0.885, 0, 1);
}
img:hover{
box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.7);
  transform: scale(1.02, 1.02);
}
</style>