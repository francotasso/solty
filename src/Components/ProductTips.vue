<template>
    <div>
        <div class="container mt-4">
            <h5>Tenga en cuenta las siguientes consideraciones: </h5>
            <div class="row mt-4">
                <div class="col-md-6 row ml-2">
                    <i class="fas fa-genderless" style="font-size: 1.5rem;"></i>
                    <p class="ml-3">Tip 1</p>
                </div>
                <div class="col-md-6 row ml-2">
                    <i class="fas fa-genderless" style="font-size: 1.5rem;"></i>
                    <p class="ml-3">Tip 1</p>
                </div>
                <div class="col-md-6 row ml-2">
                    <i class="fas fa-genderless" style="font-size: 1.5rem;"></i>
                    <p class="ml-3">Tip 1</p>
                </div>
                <div class="col-md-6 row ml-2">
                    <i class="fas fa-genderless" style="font-size: 1.5rem;"></i>
                    <p class="ml-3">Tip 1</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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