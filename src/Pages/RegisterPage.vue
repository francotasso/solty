<template>
  <div class="body vh-100 d-flex align-items-center flex-column justify-content-center">
    <div class="register-card">
      <h2 class="mb-4 text-center register-title">Registro</h2>
      <div
        v-if="errorMessageRegister"
        class="alert alert-warning"
        role="alert"
      >{{errorMessageRegister.text}}</div>
      <!-- <form @submit.prevent="handleSubmit" method="GET">
        <fieldset>
          <p>
            <input type="text" placeholder="Ingrese su nombre" v-model="user.firstName" />
          </p>
          <p>
            <input type="text" placeholder="Ingrese su apellido" v-model="user.lastName" />
          </p>
          <p>
            <input type="text" placeholder="Ingrese su email" v-model="user.email" />
          </p>
          <p>
            <input type="password" placeholder="Ingrese su contraseña" v-model="user.password" />
          </p>
          <p>
            <select class="form-control input-picker" v-model="user.gender">
              <option selected>Masculino</option>
              <option>Femenino</option>
            </select>
          </p>
          <p>
            <input type="text" placeholder="Ingrese su teléfono" v-model="user.phone" />
          </p>
          <p>
            <input
              type="date"
              placeholder="Ingrese su fecha de nacimiento"
              v-model="user.birthday"
              class="form-control input-picker"
            />
          </p>
          <p>
            <input type="submit" value="Registrarse" />
          </p>
        </fieldset>
      </form> -->
      <form @submit.prevent="handleSubmit" method="GET" class="form-container">
        <fieldset>
          <p class="username-container">
            <input v-model="user.firstName" type="text" placeholder="Ingrese su nombre" autocomplete="off"/>
          </p>
          <p class="username-container">
            <input v-model="user.lastName" type="text" placeholder="Ingrese su apellido" autocomplete="off"/>
          </p>
          <hr>
          <p>
            <select class="form-control input-picker" v-model="user.gender">
              <option selected>Masculino</option>
              <option>Femenino</option>
            </select>
          </p>
          <p>
            <input type="text" placeholder="Ingrese su teléfono" v-model="user.phone" />
          </p>
          <p>
            <input
              type="date"
              placeholder="Ingrese su fecha de nacimiento"
              v-model="user.birthday"
              class="form-control input-picker"
            />
          </p>
          <hr>
          <p>
            <input type="text" placeholder="Ingrese su email" v-model="user.email" autocomplete="off"/>
          </p>
          <p>
            <input type="password" placeholder="Ingrese una contraseña" v-model="user.password" autocomplete="off"/>
          </p>

          <p class="mt-4">
            <button
              class="register-card__button"
              :class="isLoading"
              type="submit"
              :disabled="submitted"
            >
              <div v-if="!submitted">Empezar a comprar</div>
              <div v-else class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </p>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "RegisterPage",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        gender: "Masculino",
        phone: "",
        birthday: "",
        email: "",
        password: ""
      },
      submitted: false
    };
  },
  computed: {
    ...mapState("user", ["errorMessageRegister"]),
    isLoading() {
      return this.submitted ? "disabled" : "";
    }
  },
  methods: {
    ...mapActions("user", ["register", "removeErrorMessageRegister"]),
    async handleSubmit() {
      this.submitted = true;
      const { user } = this;
      if (user) {
        await this.register(this.user);
        this.submitted = false;
        if (this.errorMessageRegister) {
          setTimeout(() => {this.removeErrorMessageRegister()}, 3000)
        }
      }
    }
  },
  beforeDestroy() {
    if (this.errorMessageRegister) {
      this.removeErrorMessageRegister();
    }
  }
};
</script>

<style lang="scss" scoped>
$main-color: #202022;
.body {
  color: #5a5656;
  font: 100%/1.5em "Open Sans", sans-serif;
  margin: 0;
  background-image: url("https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=1920&w=1080");
  background-size: cover; 
}
a {
  text-decoration: none;
}
h1 {
  font-size: 1em;
}
h1,
p {
  margin-bottom: 10px;
}
strong {
  font-weight: bold;
}
.uppercase {
  text-transform: uppercase;
}
.disabled {
  background-color: #c3c2c2 !important;
}
/* ---------- REGISTER ---------- */
.form-container {
  width: 300px;
}
.register-card {
  width: 425px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(250, 250, 250);
  border-radius: .5rem;
}
.register-title{
  font-family: "Pacifico", cursive;
  color: $main-color;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
.input-picker{
  height: 3rem;
  border-radius: 10px;
  background: #F5F0EF;
}
.register-card__button {
  background-color: $main-color;
  border: none;
  border-radius: .5rem;
  color: #f4f4f4;
  cursor: pointer;
  font-family: inherit;
  height: 50px;
  text-transform: uppercase;
  width: 300px;
  -webkit-appearance: none;
  font-family: "Nanum Pen Script";
}
form fieldset input[type="text"],
input[type="password"] {
  background: #F5F0EF;
  border: none;
  border-radius: 10px;
  color: #423D3D;
  font-family: inherit;
  font-size: 14px;
  height: 50px;
  outline: none;
  padding: 0px 10px;
  width: 300px;
  -webkit-appearance: none;
}
form fieldset input[type="submit"] {
  background-color: #008dde;
  border: none;
  border-radius: 10px;
  color: #f4f4f4;
  cursor: pointer;
  font-family: inherit;
  height: 50px;
  text-transform: uppercase;
  width: 300px;
  -webkit-appearance: none;
  font-family: 'Nanum Pen Script';
}
form fieldset a {
  color: #5a5656;
  font-size: 10px;
}
form fieldset a:hover {
  text-decoration: underline;
}
@media (max-width: 425px) {
  .register-card {
    width: 350px;
  }
}
</style>
