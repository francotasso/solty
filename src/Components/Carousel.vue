<template>
  <div>
    <div class="box">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1024"
        img-height="480"
        :interval="4000"
        class="carousel"
      >
        <b-carousel-slide
          :img-src="require('../assets/slider/slider1.jpg')"
        ></b-carousel-slide>
        <b-carousel-slide
          :img-src="require('../assets/slider/slider2.jpg')"
        ></b-carousel-slide>
        <b-carousel-slide
          :img-src="require('../assets/slider/slider3.jpg')"
        ></b-carousel-slide>
      </b-carousel>
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

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.box {
  margin-left: auto;
  margin-right: auto;
  height: 507px;
  overflow: hidden;
  position: relative;
  .carousel {
    position: absolute;
    top: -23px;
  }
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
    height: 100%;
  }
}
</style>
