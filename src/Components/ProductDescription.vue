<template>
  <div>
    <div class="container mt-4">
      <h4>{{currentProductToBuy.productName}}</h4>
      <div>
        <p class="text-justify">{{currentProductToBuy.description}}</p>
      </div>
      <hr>
      <div class="mt-4">
        <div class="row">
          <div class="col-md-4 px-3">
            <p>{{currentProductToBuy.brand}} - {{currentProductToBuy.gender | translateGender}}</p>
            <p>S/.{{currentProductToBuy.price}}</p>
          </div>
          <div class="col-md-8 d-flex justify-content-between p-0">
            <div class="col-md-6">
              <label for="size" class="bree-serif">Talla</label>
              <select id="size" class="form-control" v-model="size">
                <option>XS</option>
                <option>S</option>
                <option selected>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="color" class="bree-serif">Color</label>
              <select id="color" class="form-control" v-model="color">
                <option selected>Negro</option>
                <option>Azul</option>
                <option>Verde</option>
                <option>Gris</option>
                <option>Amarillo</option>
              </select>
            </div>
          </div>
        </div>
        <hr>
        <div class="row mt-4">
          <div class="col-md-4 p-0">
            <p style="font-size: 10px;">* Incluye promoción por tiempo limitado</p>
            <button class="btn btn-block btn-elegant text-white" type="button" data-toggle="modal" data-target="#cartModal" @click="addProduct()"><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
            <!-- Modal -->
            <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">Carrito de compras</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="table-responsive-md">
                      <table id="dtBasicExample" class="table" cellspacing="0" width="100%">
                        <thead>
                          <tr class="text-center">
                            <th class="th-md">Nombre</th>
                            <th class="th-md">Talla</th>
                            <th class="th-lg">Color</th>
                            <th class="th-md">Cantidad</th>
                            <th class="th-md">Precio</th>      
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="justify-content-center align-items-center text-center" v-for="(item,index) in shoppingCart" :key="index">
                            <td class="th-sm">
                              <p class="mt-2">{{item.productName}}</p>
                            </td>
                            <td scope="row" class="th-sm">
                              <select id="size" class="form-control" v-model="item.size">
                                <option :selected="item.size === 'XS'">XS</option>
                                <option :selected="item.size === 'S'">S</option>
                                <option :selected="item.size === 'M'">M</option>
                                <option :selected="item.size === 'L'">L</option>
                                <option :selected="item.size === 'XL'">XL</option>
                              </select>
                            </td>
                            <td class="th-sm">
                              <select id="size" class="form-control" v-model="item.color">
                                <option :selected="item.color === 'Negro'">Negro</option>
                                <option :selected="item.color === 'Azul'">Azul</option>
                                <option :selected="item.color === 'Verde'">Verde</option>
                                <option :selected="item.color === 'Gris'">Gris</option>
                                <option :selected="item.color === 'Amarillo'">Amarillo</option>
                              </select>
                            </td>
                            <td class="th-sm" style="width: 5rem;" >
                              <input class="form-control"  v-model="item.quantity" @keyup="updatePrice(item)"/>
                            </td>
                            <td style="padding-top: 1.5rem;">S/.{{item.totalPrice}}</td>
                            <td style="padding-top: 0.7rem; font-size: 2rem;"><i class="fas fa-times" @click="removeProductFromShoppingCart(item)" title="Remover de la lista"></i></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-mdb-color text-white" data-dismiss="modal">Seguir comprando</button>
                    <router-link to="/shoppingcart" class="btn btn-indigo text-white" style="text-decoration: none;" data-dismiss="modal">Ir a pagar</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5 pl-5 pt-3 d-flex justify-content-center align-items-center stars" style="font-size: 2rem;">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <div class="col-md-3 d-flex flex-column align-content-between pt-3" style="font-size: 12px;">
            <p class="text-right">Envío gratis</p>
            <p class="text-right" >Devolución gratis</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "productDescription",
  computed: {
    ...mapState("product", ["currentProductToBuy", "shoppingCart"]),
    shoppingCartSort(){
      return this.shoppingCart.sort((a,b) => a.totalPrice > b.totalPrice ? 1 : a.totalPrice < b.totalPrice ? -1 : 0);
    }
  },
  filters: {
    translateGender(gender){
      return gender === 'Male' ? 'Hombre' : 'Mujer'
    }
  },
  data() {
    return {
      size: "M",
      color: "Negro"
    };
  },
  methods: {
    ...mapMutations("product", ["addProductToShoppingCart", "updatePrice","removeProductFromShoppingCart"]),
    addProduct(){
      let product = {
        id : this.currentProductToBuy._id,
        productName: this.currentProductToBuy.productName,
        size: this.size,
        color: this.color,
        price: this.currentProductToBuy.price
      }
      this.addProductToShoppingCart(product);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Anton&display=swap");
.product-title {
  font-family: "Anton", sans-serif;
}
.bg-darkblue {
  background-color: #224994;
}
textarea {
  resize: none;
  min-height: 5rem;
  width: 400px;
  padding: 1rem;
  border-radius: 5px;
}
.btn:focus {
  box-shadow: none;
}
.form-control:focus {
  box-shadow: none;
}
@media (max-width: 768px){
  .stars{
    justify-content: center;
    margin-top: 1.5rem;
    padding-left: 0 !important;
  }
} 
</style>