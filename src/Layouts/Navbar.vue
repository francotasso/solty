<template>
  <div class="header" :class="{ 'fixed-header': fixedHeader}">
    <!-- <div class="header__announcement d-md-block d-none">
      <span>Envíos desde el 12 de mayo. Cambios y Devoluciones GRATIS!</span>
    </div> -->
    <div class="header__main">
      <div class="container header__main-content">
        <div class="col-md-4 d-none d-md-block">
          <div class="row">
            <div class="col-md-6 search-box">
              <input type="text" placeholder="Buscar productos" class="search-input" v-model="searchQuery">
              <div class="btn-input">
                <button class="search-btn">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div class="col-md-6">
              <div style="font-size: 12px;">
                <div class="help-item">
                  <span class="text-uppercase">¿Necesitas ayuda?</span>
                  <div class="dropdown">
                    <ul>
                      <li class="dropdown-item">
                        <router-link to="/chat-talk">¡Hablemos por Chat!</router-link>
                      </li>
                      <li class="dropdown-item">
                        <router-link to="/contact">
                          Teléfono: +51 987 109 967
                        </router-link>
                      </li>
                      <li class="dropdown-item">
                        <router-link to="/faq">
                          Preguntas frecuentes:
                          <strong>Ver aquí</strong>
                        </router-link>
                      </li>
                      <li class="dropdown-item">
                        <router-link to="/email-talk">
                          ¡Hablemos por mail!
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-9 col-md-4">
          <router-link to="/" class="brand-title">
            <span class="text-uppercase">Solty</span>
          </router-link>
        </div>
        <div class="col-xs-3 col-md-4 text-right" style="font-size: 12px;">
          <div class="row justify-content-end">
            <router-link class="col-xs-6 col-md-4 header-right-item" to="/shoppingcart">
              <span class="mr-2">
                <i class="fas fa-shopping-bag"></i>
              </span>
              <span class="header-link d-none d-md-block">Carrito</span>
              <span class="items-count">({{shoppingCartQuantity}})</span>
            </router-link>
            <div class="col-xs-6 col-md-5 header-right-item">
              <span class="mr-2">
                <i class="fas fa-user"></i>
              </span>
              <span class="header-link d-none d-md-block">Mi cuenta</span>
              <div class="dropdown-account">
                <ul>
                  <li @click="$router.push({ name: 'AccountPage', params: { option: 'profile' } })">
                    <span class="mr-2">
                      <i class="fas fa-user-edit"></i>
                    </span>
                    <span>
                      Editar Perfil
                    </span>
                  </li>
                  <li @click="$router.push({ name: 'AccountPage', params: { option: 'password' } })">
                    <span class="mr-2">
                      <i class="fas fa-key"></i>
                    </span>
                    <span>
                      Contraseña
                    </span>
                  </li>
                  <li @click="$router.push({ name: 'AccountPage', params: { option: 'privacy' } })">
                    <span class="mr-2">
                      <i class="fas fa-lock"></i>
                    </span>
                    <span>
                      Privacidad
                    </span>
                  </li>
                  <li @click="logout">
                    <span class="mr-2">
                      <i class="fa fa-power-off"></i>
                    </span>
                    <span>
                      Cerrar Sesión
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="header__navbar navbar navbar-expand-lg navbar-light">
      <div class="search-box d-md-none d-flex col-8">
        <input type="text" placeholder="Buscar productos" class="search-input" autocomplete="on" v-model="searchQuery">
        <div class="btn-input">
          <button class="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div class="text-right d-md-none col-4">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"         aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav-list container text-center">
            <li class="nav-item flex-grow-1">
              <router-link to="/new-releases" class="nav-link">Nuevos lanzamientos</router-link>
            </li>   
            <li class="nav-item flex-grow-1">
              <router-link to="/man" class="nav-link">Hombres</router-link>
            </li>
            <li class="nav-item flex-grow-1">
              <router-link to="/woman" class="nav-link">Mujeres</router-link>
            </li>
            <li class="nav-item flex-grow-1">
              <router-link to="/kids" class="nav-link">Niños</router-link>
            </li>
            <li class="nav-item flex-grow-1">
              <router-link to="/liquidation" class="nav-link">Liquidación</router-link>
            </li>
            <li class="nav-item flex-grow-1">
              <router-link to="/about" class="nav-link">Nosotros</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import ShoppingCartFast from "../Components/ShoppingCartFast"
import { mapGetters, mapActions } from "vuex";
export default {
  name: "navbar",
  props: {
    fixedHeader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFastCart: false,
      searchQuery: null
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
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
$main-color: #222;
.header {
  z-index: 999;
  .navbar {
    border-radius: 0;
    padding: 5px 0px;
    margin-bottom: 0;
    min-height: 39px;
    a {
      color: white;
      &:hover {
        color: $main-color;
      }
    }
    .router-link-active {
      background-color: white;
      color: $main-color;
    }
    .nav-item {
      &:hover {
        background-color: white;
      }
    }
    ul {
      @media screen and (max-width: 768px){
        flex-direction: column;
      }
    }
    .navbar-toggler {
      border-color: #ddd;
      &:focus {
        outline: none;
      }
      .icon-bar {
        display: block;
        width: 22px;
        height: 2px;
        border-radius: 1px;
        background-color: #888;
        margin-top: .25rem;
        margin-bottom: .25rem;
      }
    }
  }
  .header-right-item {
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
    display: flex;
    text-decoration: none;
    color: $main-color;
    padding: {
      top: .5rem;
      bottom: .5rem;
    }
    &:hover {
      .header-link, .items-count {
        color: #fcb800;
      }
      .dropdown-account {
        display: block;
      }
    }
    .dropdown-account {
      position: absolute;
      top: 35px;
      left: 10px;
      display: none;
      background-color: #fbfbfb;
      border: 1px solid #eee;
      border-radius: 4px;
      padding: .5rem 0px;
      z-index: 100;
      ul {
        list-style: none;
        padding-inline-start: 0px;
        li {
          padding: .7rem 2rem .7rem 1rem;
          text-align: left;
          &:hover {
            background-color: #eee;
          }
          &:last-child {
            color: red;
          }
        }
      }
    }
  }
  .search-box {
    position: relative;
    .search-input {
      height: 40px;
      outline: none;
      background-color: white;
      width: 100%;
      box-sizing: border-box;
      padding-left: 7px;
      transition: all .5s ease;
      &:placeholder-shown {
        font-size: 16px;
      }
      @media screen and (min-width: 1200px){
        &:focus {
          width: 220px;
          & + .btn-input {
            right: -32px;
          }
        }
      }
    }
    .btn-input {
      position: absolute;
      right: 0;
      top: 0;
      transition: all .5s ease;
      .search-btn {
        background-color: $main-color;
        text-decoration: none;
        border-width: 0px;
        width: 40px;
        height: 40px;
        i {
          color: white;
        }
      }
    }
  }
  &__announcement{
    text-align: center;
    background-color: $main-color;
    color: white;
    padding: {
      top: .4rem;
      bottom: .4rem;
    }
  }
  &__main{
    background-color: white;
    color: $main-color;
    &-content {
      height: 100px;
      display: flex;
      align-items: center;
      text-align: center;
      .brand-title {
        font-family: 'Anton', sans-serif;
        color: $main-color;
        letter-spacing: 5px;
        font-size: 45px;
        text-decoration: none;
        text-shadow: 0 13.36px 8.896px #c4b59d,0 -2px 1px #fff;
      }
    }
    .help-item {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      .dropdown {
        display: none;
        position: absolute;
        top: 40px;
        left: 0px;
        &-item {
          display: flex;
          padding: 12px 16px;
          &:hover {
            background: #f1f1f1;
          }
          a {
            text-decoration: none;
            color: $main-color;
          }
        }
      }
      &:hover {
        .dropdown {
          display: block;
          background-color: #f9f9f9;
          min-width: 460px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }
      }
    }
  }
  &__navbar{
    font-family: 'Anton', sans-serif;
    background-color: $main-color;
    text-transform: uppercase;
    .navbar__list {
      display: flex;
      justify-content: space-between;
      padding: {
        top: .3rem;
        bottom: .3rem;
      }
    }
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;

  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>


