<template>
  <div>
    <navbar />
    <div class="container">
      <div class="row">
       <div class="box col-md-6 d-flex justify-content-center">
         <img
           src="../assets/AboutImage2.png"
           alt="Coreana a la moda"
           class="img-fluid d-none d-md-block"
           style="width: 35%;"
         />
       </div>
       <div class="content-right col-md-6 my-auto">
         <h1>Solty tu tienda Online</h1>
         <p class="mt-3">Solty es una empresa de venta de ropa online con presencia en todo el Perú y gran parte de Latinoamérica</p>
         <p class="mt-3">Desde nuestros inicios hemos optado siempre por la calidad de la ropa que vendemos a nuestros clientes haciéndolos sentir seguros con su produtos y generando una buena imagen tanto para ellos mismos como para nosotros mismos.</p>
         <p class="mt-3">No esperes más y opta por nuestras más de 5000 prendas de vestir de la mejor calidad que te harán lucir mejor.</p>
       </div>
      </div>
    </div>
    <foot />
  </div>
</template>

<script>
import navbar from "./Navbar";
import foot from "./Footer";
export default {
  name: "aboutus",
  components: {
    navbar,
    foot
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap");
.box {
  margin-top: 5rem;
}
.content-right {
  font-family: "Lexend Deca", sans-serif;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>
