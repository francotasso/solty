<template>
  <div>
    <div class="box">
      <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active" data-interval="4000">
            <img
              src="https://images.pexels.com/photos/285171/pexels-photo-285171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Más de 1000 productos vendidos</h5>
              <p>Somos líderes en la venta de ropa de calidad en todo el Perú</p>
            </div>
          </div>
          <div class="carousel-item" data-interval="4000">
            <img
              src="https://images.pexels.com/photos/3978385/pexels-photo-3978385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Nuestros auspiciadores</h5>
              <p>Adidas, Blazer, Matez, Men, Soup y más</p>
            </div>
          </div>
          <div class="carousel-item" data-interval="4000">
            <img
              src="https://images.pexels.com/photos/720606/pexels-photo-720606.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>En la puerta de tu casa</h5>
              <p>Llevamos tu productos en menos de 2 horas</p>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.box {
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width: 1200px) {
  .box {
    width: 1000px;
  }
}

@media screen and (max-width: 1050px) {
  .box {
    width: 850px;
  }
}

@media screen and (max-width: 900px) {
  .box {
    width: 700px;
  }
}

@media screen and (max-width: 750px) {
  .box {
    width: 550px;
  }
}

@media screen and (max-width: 600px) {
  .box {
    width: 100%;
  }
}
</style>
