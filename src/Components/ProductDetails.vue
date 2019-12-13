<template>
    <div>
        <div class="container mt-4">
            <h5>Este producto cuenta con las siguientes características: </h5>
            <div class="row mt-4">
                <div class="col-md-6 row ml-2">
                    <i class="fas fa-check" style="font-size: 1.5rem;"></i>
                    <p class="ml-3">Tip 1</p>
                </div>
                <div class="col-md-6 row ml-2">
                    <i class="fas fa-check" style="font-size: 1.5rem;"></i>
                    <p class="ml-3">Tip 1</p>
                </div>
                <div class="col-md-6 row ml-2">
                    <i class="fas fa-check" style="font-size: 1.5rem;"></i>
                    <p class="ml-3">Tip 1</p>
                </div>
                <div class="col-md-6 row ml-2">
                    <i class="fas fa-check" style="font-size: 1.5rem;"></i>
                    <p class="ml-3">Tip 1</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: 'ProductDetails',
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