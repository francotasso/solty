<template>
    <div>
        <div
            class="modal fade"
            :id="'modal'+product._id"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">{{ product.productName }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">{{ product.brand }}</li>
                    <li class="list-group-item">S/. {{ product.price }}</li>
                    <li class="list-group-item">Quedan {{ product.stock }} unidades</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button
                    type="button"
                    class="btn bg-darkblue"
                    data-dismiss="modal"
                    @click="previousPurchase(product._id)"
                    >Comprar</button>
                    <button type="button" class="btn bg-ocre" data-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: 'ProductItemModal',
    props: ['product'],
    data(){
        return {

        }
    },
    methods: {
        ...mapActions("product", ["previousPurchase"])
    }
}
</script>

<style scoped>
.bg-darkblue {
  background-color: #224994;
  color: #fff;
}
.bg-ocre {
  background-color: #debb07;
  color: #fff;
}
</style>