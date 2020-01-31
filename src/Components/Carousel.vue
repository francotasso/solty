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
              src="https://3er1viui9wo30pkxh1v2nh4w-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/41/2018/09/JanetAI_2000-1920x1080-1024x576.jpg"
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
              src="https://estaticos.qdq.com/swdata/photos/005/005463333/745b6ea7ccbb402ca1ffe69df10e20e9.jpg"
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
              src="https://www.telemundo.com/sites/nbcutelemundo/files/images/promo/article/2019/02/22/modelos-en-la-semana-de-la-moda-vestidas-de-mostaza.jpg"
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
    width: 400px;
  }
}
</style>