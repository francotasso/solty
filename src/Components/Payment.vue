<template>
  <div class="container">
    <navbar />
    <div class="content">
      <div
        v-if="errorMessagePurchase"
        class="alert alert-warning mt-3"
        role="alert"
      >{{errorMessagePurchase.text}}</div>
      <div class="row">
        <div class="col-md-6">
          <div
            :class="'text-white '+ (errorMessagePurchase ? 'mt-1' : 'mt-5')"
            id="card"
            style="max-width: 22.8rem;"
          >
            <div class="card-body" id="card-name">
              <p class="card-text">{{payment.ownerName}}</p>
            </div>
            <div class="card-body" id="card-number">
              <p class="card-text">{{payment.cardNumber}}</p>
            </div>
            <div class="card-body" id="card-expiration-month">
              <p class="card-text">{{payment.expirationMonth}}</p>
            </div>
            <div class="card-body" id="card-expiration-year">
              <p class="card-text">{{payment.expirationYear}}</p>
            </div>
            <div class="card-body" id="card-security-code">
              <p class="card-text">{{payment.securityCode}}</p>
            </div>
          </div>
          <div
            class="text-center display-3 mt-5"
            style="max-width: 22.8rem;"
          >S/. {{shoppingCartTotalPrice}}</div>
        </div>
        <div class="col-md-6">
          <form @submit.prevent="executePurchase(payment)" class="mt-5">
            <div class="form-group">
              <label for="formGroupExampleInput" class="bree-serif">Nombre del titular de la tarjeta</label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                v-model="payment.ownerName"
              />
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput" class="bree-serif">Número de la tarjeta</label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                v-model="payment.cardNumber"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputStateMonth" class="bree-serif">Mes de vencimiento</label>
                <select id="inputStateMonth" class="form-control" v-model="payment.expirationMonth">
                  <option selected>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="inputStateYear" class="bree-serif">Año de vencimiento</label>
                <select id="inputStateYear" class="form-control" v-model="payment.expirationYear">
                  <option selected>2019</option>
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2" class="bree-serif">Código de seguridad</label>
              <input
                type="number"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="Se encuentra al reverso de tu tarjeta"
                v-model="payment.securityCode"
              />
            </div>
            <button class="btn bg-darkblue btn-block">Confirmar compra</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./Navbar";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "productPayment",
  data() {
    return {
      payment: {
        ownerName: "",
        cardNumber: "",
        expirationMonth: null,
        expirationYear: null,
        securityCode: null,
        userId: null,
        products: [],
        totalPrice: 0
      }
    };
  },
  components: {
    navbar
  },
  computed: {
    ...mapState("product", ["shoppingCart"]),
    ...mapState("payment", ["errorMessagePurchase"]),
    ...mapGetters("product", ["shoppingCartTotalPrice"])
  },
  methods: {
    ...mapActions("user", ["getProfile"]),
    ...mapActions("payment", ["executePurchase", "removeErrorMessagePurchase"])
  },
  beforeMount() {
    this.getProfile(localStorage.getItem("userId"));
    this.payment.userId = localStorage.getItem("userId");
    for (let item of this.shoppingCart) {
      let product = {
        id: item.id,
        size: item.size,
        color: item.color,
        quantity: item.quantity
      };
      this.payment.products.push(product);
    }
    this.payment.totalPrice = this.shoppingCartTotalPrice;
  },
  beforeDestroy() {
    if (this.errorMessagePurchase) {
      this.removeErrorMessagePurchase();
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
.bg-darkblue {
  background-color: #224994;
  color: #fff;
}
.btn:focus {
  box-shadow: none;
}
.form-control {
  border: 1px solid #debb07;
}
.form-control:focus {
  box-shadow: none;
}
.bree-serif {
  font-family: "Bree Serif", serif;
  font-size: 18px;
}
@media screen and (max-width: 360px) {
  .content {
    margin-top: 7rem;
  }
  #card {
    height: 13.2rem;
    font-size: 15px;
  }
  #card-name {
    position: absolute;
    bottom: 0;
  }

  #card-number {
    position: absolute;
    top: 80px;
    left: 10px;
  }

  #card-expiration-month {
    position: absolute;
    top: 104px;
    left: 130px;
  }

  #card-expiration-year {
    position: absolute;
    top: 104px;
    left: 155px;
  }

  #card-security-code {
    position: absolute;
    top: 40px;
    right: 70px;
  }
}
@media screen and (min-width: 361px) and (max-width: 410px) {
  #card {
    height: 12.5rem;
  }
  #card-name {
    position: absolute;
    bottom: 0;
  }

  #card-number {
    position: absolute;
    top: 90px;
    left: 12px;
  }

  #card-expiration-month {
    position: absolute;
    top: 110px;
    left: 135px;
  }

  #card-expiration-year {
    position: absolute;
    top: 110px;
    left: 160px;
  }

  #card-security-code {
    position: absolute;
    top: 40px;
    right: 70px;
  }
}

#card {
  background-image: url("https://www.viabcp.com/wcm/connect/8e9f2e16-1235-47ff-8e14-bb3a760f90e6/BCP_tarjeta+Credima%CC%81s+De%CC%81bito+Visa+%28tira%29-XL.png?MOD=AJPERES&CONVERT_TO=url&CACHEID=ROOTWORKSPACE-8e9f2e16-1235-47ff-8e14-bb3a760f90e6-muFlKv7");
  background-size: cover;
  position: relative;
}
@media screen and (min-width: 411px) and (max-width: 767px) {
  #card {
    height: 14.5rem;
    font-size: 15px;
  }
  #card-name {
    position: absolute;
    bottom: 0;
  }

  #card-number {
    position: absolute;
    top: 100px;
    left: 12px;
  }

  #card-expiration-month {
    position: absolute;
    top: 128px;
    left: 150px;
  }

  #card-expiration-year {
    position: absolute;
    top: 128px;
    left: 175px;
  }

  #card-security-code {
    position: absolute;
    top: 50px;
    right: 80px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  #card {
    height: 12.5rem;
    font-size: 15px;
  }
  #card-name {
    position: absolute;
    bottom: 0;
  }

  #card-number {
    position: absolute;
    top: 90px;
    left: 12px;
  }

  #card-expiration-month {
    position: absolute;
    top: 110px;
    left: 130px;
  }

  #card-expiration-year {
    position: absolute;
    top: 110px;
    left: 155px;
  }

  #card-security-code {
    position: absolute;
    top: 40px;
    right: 70px;
  }
}
@media screen and (min-width: 1024px) {
  #card {
    height: 14.5rem;
    font-size: 15px;
  }
  #card-name {
    position: absolute;
    bottom: 0;
  }

  #card-number {
    position: absolute;
    top: 110px;
    left: 15px;
  }

  #card-expiration-month {
    position: absolute;
    top: 132px;
    left: 160px;
  }

  #card-expiration-year {
    position: absolute;
    top: 132px;
    left: 185px;
  }

  #card-security-code {
    position: absolute;
    top: 55px;
    right: 90px;
  }
}
</style>
