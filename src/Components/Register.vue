<template>
  <div class="body vh-100 d-flex align-items-center flex-column">
    <div id="register">
      <h2 class="mb-4 text-center">Registro</h2>
      <div
        v-if="errorMessageRegister"
        class="alert alert-warning"
        role="alert"
      >{{errorMessageRegister.text}}</div>
      <form @submit.prevent="handleSubmit" method="GET">
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
            <select class="form-control" v-model="user.gender">
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
              class="form-control"
            />
          </p>
          <p>
            <input type="submit" value="Registrarse" />
          </p>
        </fieldset>
      </form>
    </div>
    <!-- end register -->
    <footer class="text-white">
      <p>By Franco Tasso © - 2019 - Lima Perú</p>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "Masculino",
        phone: "",
        birthday: ""
      },
      submitted: false
    };
  },
  computed: {
    ...mapState("user", ["errorMessageRegister"])
  },
  methods: {
    ...mapActions("user", ["register", "removeErrorMessageRegister"]),
    handleSubmit() {
      this.submitted = true;
      const { user } = this;
      if (user) {
        this.register(this.user);
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

<style scoped>
.body {
  color: #5a5656;
  font: 100%/1.5em "Open Sans", sans-serif;
  margin: 0;
  background-image: url("https://cdn.pixabay.com/photo/2015/09/06/00/46/yellow-926728_960_720.jpg");
  background-size: contain;
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
/* ---------- LOGIN ---------- */
#register {
  margin: auto;
  width: 300px;
}
form fieldset input[type="text"],
input[type="password"] {
  background: #e5e5e5;
  border: none;
  border-radius: 3px;
  color: #5a5656;
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
  border-radius: 3px;
  color: #f4f4f4;
  cursor: pointer;
  font-family: inherit;
  height: 50px;
  text-transform: uppercase;
  width: 300px;
  -webkit-appearance: none;
}
form fieldset a {
  color: #5a5656;
  font-size: 10px;
}
form fieldset a:hover {
  text-decoration: underline;
}
@media (max-width: 425px) {
  .body {
    background: none;
  }
}
</style>
