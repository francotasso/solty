<template>
  <div>
    <div class="d-none d-md-block">
      <nav class="navbar navbar-expand-md navbar-dark bg-black fixed-top vw-100" id="menu">
        <div class="container">
          <div>
            <router-link to="/products/1" class="navbar-brand">
              <img
                src="../assets/SoltyLogo7.png"
                width="178"
                height="40"
                alt="Solty Logo"
                title="Inicio"
              />
            </router-link>
          </div>
          <div class="d-flex justify-content-between" style="width: 100%;">
            <ul class="navbar-nav pointer">
              <div class="d-flex justify-contents-between">
                <div class="d-flex links">
                  <li class="nav-item">
                    <router-link to="/about" class="nav-link">Nosotros</router-link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#footer">Contáctanos</a>
                  </li>
                </div>
              </div>
            </ul>
            <ul class="navbar-nav pointer">
              <li class="nav-item shopping-cart" @mouseenter="showFastCart = true" @mouseleave="showFastCart = false">
                <a class="nav-link" href="/shoppingcart">
                  <i class="fas fa-shopping-cart"></i> 
                  <span class="badge badge-danger">{{shoppingCartQuantity}}</span>
                </a>
                <ShoppingCartFast v-if="showFastCart" class="fast-cart"/>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-333"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-user"></i>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right dropdown-default"
                  aria-labelledby="navbarDropdownMenuLink-333"
                >
                  <a class="dropdown-item" href="/profile">Mi perfil</a>
                  <a class="dropdown-item" @click="logout">Cerrar sesión</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="d-md-none border-box">
      <nav class="navbar navbar-light bg-black fixed-top d-flex flex-row justify-content-center vw-100">
        <span class="brand-new mb-0 h1 col-8">
          <router-link to="/products/1" class="navbar-brand" style="margin-left: 5rem;">
            <img
              src="../assets/SoltyLogo7.png"
              width="178"
              height="40"
              alt="Solty Logo"
              title="Inicio"
            />
          </router-link>
        </span>
        <a class="nav-link d-flex justify-content-end ml-4" href="/shoppingcart">
          <i class="fas fa-shopping-cart text-white"></i>
          <span class="ml-2 badge badge-danger">{{shoppingCartQuantity}}</span>
        </a>
      </nav>
      <div class="button_container" id="toggle">
        <span class="top"></span>
        <span class="middle"></span>
        <span class="bottom"></span>
      </div>

      <div class="overlay" id="overlay">
        <nav class="overlay-menu">
          <ul>
            <li>
              <a href="/products/1">Inicio</a>
            </li>
            <li>
              <a href="/about">Nosotros</a>
            </li>
            <li>
              <a href="/profile">Mi perfil</a>
            </li>
            <li class="nav-item" @click="logout">
              <a class="nav-link">Cerrar sesión</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingCartFast from "../Components/ShoppingCartFast"
import { mapGetters, mapActions } from "vuex";
export default {
  name: "navbar",
  data() {
    return {
      fullNameLoggedUser: "",
      showFastCart: false
    };
  },
  components: {
    ShoppingCartFast
  },
  computed: {
    ...mapGetters("product", ["shoppingCartQuantity"])
  },
  methods: {
    ...mapActions("user", ["logout"])
  },
  beforeMount() {
    this.fullNameLoggedUser = localStorage.getItem("userFullName");
  },
  mounted() {
    $("#toggle").click(function() {
      $(this).toggleClass("active");
      $("#overlay").toggleClass("open");
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
    $(window).scroll(function() {
      if ($("#menu").offset().top > 56) {
        $("#menu").addClass("bg-light-black");
      } else {
        $("#menu").removeClass("bg-light-black");
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.vw-100 {
  width: 100vw;
}
.pointer {
  cursor: pointer;
}
.bg-black {
  background-color: #000;
  transition: all 1s ease;
}
.bg-light-black {
  background-color: rgba(0, 0, 0, 0.6);
}
@media screen and (max-width: 767px) {
  @import url(https://fonts.googleapis.com/css?family=Vollkorn|Roboto);

  $color-background: #f5f5f5;
  $color-main: #060303;
  $color-active: #cea11c;
  $color-link: #fff;
  $color-link-underline: #cea11c;

  $button-height: 27px;
  $button-width: 35px;

  body {
    background: $color-background;
  }

  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    top: 40%;
    left: 0;
    margin: 0 auto;
    font-family: "Roboto", sans-serif;

    p {
      font-size: 20px;
    }

    a {
      display: inline-block;
      position: relative;
      text-align: center;
      color: $color-main;
      text-decoration: none;
      font-size: 20px;
      overflow: hidden;
      top: 5px;

      &:after {
        content: "";
        position: absolute;
        background: $color-main;
        height: 2px;
        width: 0%;
        transform: translateX(-50%);
        left: 50%;
        bottom: 0;
        transition: 0.35s ease;
      }
      &:hover:after,
      &:focus:after,
      &:active:after {
        width: 100%;
      }
    }
  }

  h1 {
    position: relative;
    text-align: center;
    font-family: "Vollkorn", serif;
  }

  .button_container {
    position: fixed;
    top: 3%;
    left: 4%;
    height: $button-height;
    width: $button-width;
    cursor: pointer;
    z-index: 1050;
    transition: opacity 0.25s ease;

    &:hover {
      opacity: 0.7;
    }

    &.active {
      .top {
        transform: translateY(11px) translateX(0) rotate(45deg);
        background: $color-active;
      }
      .middle {
        opacity: 0;
        background: $color-active;
      }

      .bottom {
        transform: translateY(-11px) translateX(0) rotate(-45deg);
        background: $color-active;
      }
    }

    span {
      background: #cea11c;
      border: none;
      height: 5px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.35s ease;
      cursor: pointer;

      &:nth-of-type(2) {
        top: 11px;
      }

      &:nth-of-type(3) {
        top: 22px;
      }
    }
  }

  .overlay {
    position: fixed;
    background: $color-main;
    top: 0;
    left: 0;
    width: 100%;
    height: 0%;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.35s, visibility 0.35s, height 0.35s;
    overflow: hidden;

    &.open {
      opacity: 0.9;
      visibility: visible;
      height: 100%;
      z-index: 50;
      li {
        animation: fadeInRight 0.5s ease forwards;
        animation-delay: 0.35s;

        &:nth-of-type(2) {
          animation-delay: 0.4s;
        }
        &:nth-of-type(3) {
          animation-delay: 0.45s;
        }
        &:nth-of-type(4) {
          animation-delay: 0.5s;
        }
      }
    }
    nav {
      position: relative;
      height: 70%;
      top: 50%;
      transform: translateY(-50%);
      font-size: 40px;
      font-family: "Vollkorn", serif;
      font-weight: 400;
      text-align: center;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      display: inline-block;
      position: relative;
      height: 100%;

      li {
        display: block;
        height: 25%;
        height: calc(100% / 4);
        min-height: 50px;
        position: relative;
        opacity: 0;

        a {
          display: block;
          position: relative;
          color: $color-link;
          text-decoration: none;
          overflow: hidden;

          &:hover:after,
          &:focus:after,
          &:active:after {
            width: 100%;
          }

          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0%;
            transform: translateX(-50%);
            height: 3px;
            background: $color-link-underline;
            transition: 0.35s;
          }
        }
      }
    }
  }

  @keyframes fadeInRight {
    0% {
      opacity: 0;
      left: 20%;
    }
    100% {
      opacity: 1;
      left: 0;
    }
  }
}

.links .nav-item {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  &::before , &::after{
    content: "";
    position: absolute;
    bottom: 0;
    width: 0px;
    height: 2px;
    background-color: #234b96;
    transition: all .6s ease-out;
  }
  &::before{
    left: 50%;
  }
  &::after{
    right: 50%;
  }
  &:hover {
    &::before , &::after{
      width: 50%;
    }
  }
  .nav-link {
    &:hover {
      color: #fff !important;
    }
  }
}

.shopping-cart {
  position: relative;
  .fast-cart{
    position: absolute;
    bottom: -415px;
    left: -125px;
  }
}

.brand-new {
  font-size: 1.25rem;
  line-height: inherit;
}

@media screen and (max-width: 360px) {
  .brand-new {
    margin-left: 0px !important;
  }
  img {
    width: 150px;
    height: 33px;
  }
}
</style>


