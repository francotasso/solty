<template>
  <div class="footer border-top">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4">
          <h3>Servicio al cliente</h3>
          <div class="mt-4">
            <p class="my-3">
              <router-link to="/">
                Envíos y Devoluciones
              </router-link>
            </p>
            <p class="my-3">
              <router-link to="/">
                Libro de reclamaciones
              </router-link>
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <h3>Acerca de</h3>
          <div class="mt-4">
            <p class="my-3">
              <router-link to="/about">
                Nosotros
              </router-link>
            </p>
            <p class="my-3">
              <router-link to="/designers">
                Diseñadores
              </router-link>
            </p>
            <p class="my-3">
              <router-link to="/workingwithus">
                Vender en GamaApp
              </router-link>
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <h3>Términos y condiciones</h3>
          <div class="mt-4">
            <h4 class="mt-5 mb-3">Registra tu email</h4>
            <div>
              <input type="text" placeholder="email" class="email-contact">
            </div>
            <button class="btn btn-sm btn-primary mt-2">Suscríbete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid contact-us pt-3">
      <div class="text-center h4">
        <span>Síguenos en: </span>
      </div>
      <div class="text-center">
        <a href="#" class="mr-3">
          <i class="fab fa-facebook-f fa-3x"></i>
        </a>
        <a href="#" class="ml-3">
          <i class="fab fa-instagram fa-3x"></i>
        </a>
      </div>
      <div class="container"><hr class="my-3"></div>
      <div class="container">
        <p class="text-center text-uppercase font-weight-bold">2020 GamaApp. All rights reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "foot",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');
$main-color: #222;
.footer {
  font-family: 'Ropa Sans', sans-serif;
  color: $main-color;
  .contact-us {
    background-color: rgb(245, 245, 245);
  }
  .email-contact {
    box-sizing: border-box;
    outline: none;
    padding: 5px 10px;
  }
  .btn-primary {
    background-color: #888;
    border-color: #888;
    transition: all .2s;
    &:hover {
      background-color: #666;
      color: white;
    }
  }
  a {
    color: #444;
    text-decoration: none;
    &:hover {
      text-decoration: none;
      color: #888;
    }
  }
  i {
    color: $main-color;
  }
}
</style>