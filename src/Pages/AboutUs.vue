<template>
  <wrapper-section>
    <div class="body">
      <div class="container-fluid m-auto">
        <div class="row">
          <div class="box d-flex justify-content-center">
            <img
              src="https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Coreana a la moda"
              class="img-fluid d-none d-md-block"
            />
          </div>
          <div class="content-right col-md-6 my-auto">
            <h1>Solty tu tienda Online</h1>
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
  name: "aboutus",
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
.body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.box {
  margin-top: -13em;
  width: 50%;
}
.content-right {
  font-family: "Lexend Deca", sans-serif;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>
