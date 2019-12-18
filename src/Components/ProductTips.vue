<template>
    <div>
        <div class="container mt-4">
            <h5>Tenga en cuenta las siguientes consideraciones: </h5>
            <div class="row mt-4" v-for="(product, index) in currentProductToBuy.tips" :key="index">
                <div class="col-md-6 row ml-2">
                    <i class="fas fa-check" style="font-size: 1.5rem;"></i>
                    <p class="ml-3">{{product.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: 'ProductTips',
    computed: {
        ...mapState("product", ["currentProductToBuy", "shoppingCart"])
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
    
</style>