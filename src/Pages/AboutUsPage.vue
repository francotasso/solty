<template>
  <wrapper-section :no-footer="true">
    <div class="body">
      <div class="container-fluid m-auto">
        <div class="row px-0">
          <div class="box d-flex justify-content-center">
            <img
              :src="$getAsset('fashion-girl.png')"
              alt="Fashion girl"
              class="img-fluid mt-3 "
            />
          </div>
          <div class="content-right col-md-6 my-auto container">
            <h1 class="title text-dark">Solty tu tienda Online</h1>
            <p
              class="mt-3"
            >Solty es una empresa de venta de ropa online con presencia en todo el Perú y gran parte de Latinoamérica.</p>
            <p
              class="mt-3"
            >Desde nuestros inicios hemos optado siempre por la calidad de la ropa que vendemos a nuestros clientes haciéndolos sentir seguros con su produtos y generando una buena imagen tanto para ellos, como para nosotros mismos.</p>
            <p
              class="mt-3"
            >No esperes más y opta por nuestras más de 5000 prendas de vestir de la mejor calidad que te harán lucir mejor.</p>
          </div>
        </div>
      </div>
    </div>
  </wrapper-section>
</template>

<script>
export default {
  name: "AboutUsPage",
  data() {
    return {};
  },
  mounted(){
    window.scroll(0,0)
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@600&display=swap');
.body {
  display: flex;
  flex-direction: column;
}
.box {
  width: 50%;
}
.content-right {
  font-family: "Lexend Deca", sans-serif;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  color: rgb(135, 135, 135);
}
.title {
  font-family: 'Baloo Bhaina 2', cursive;
  color: #355b9c;
}
img {
  width: 50%;
}
</style>
