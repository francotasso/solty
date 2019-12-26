<template>
  <div>
    <navbar />
    <div class="container mt-5 mb-5">
      <div class="d-flex flex-column justify-content-center align-items-center" id="box">
        <h2 class="mb-4">Mi info</h2>
        <div
          v-if="errorMessageUpdateProfile"
          class="alert alert-warning"
          role="alert"
        >{{errorMessageUpdateProfile.text}}</div>
        <div class="form-w-300">
          <div class="form-group">
            <label for="firstName">Nombres</label>
            <input
              class="form-control"
              name="firstName"
              type="text"
              placeholder="Ingrese sus nombres"
              v-model="profileLoggedUser.firstName"
              :disabled="!edit"
            />
          </div>
          <div class="form-group">
            <label for="lastName">Apellidos</label>
            <input
              class="form-control"
              name="lastName"
              type="text"
              placeholder="Ingrese sus apellidos"
              v-model="profileLoggedUser.lastName"
              :disabled="!edit"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              class="form-control"
              name="email"
              type="text"
              placeholder="Ingrese su email"
              v-model="profileLoggedUser.email"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="gender">Género</label>
            <input
              class="form-control"
              name="gender"
              type="text"
              placeholder="Ingrese su género"
              v-model="profileLoggedUser.gender"
              :disabled="!profileLoggedUser.gender"
            />
          </div>
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input
              class="form-control"
              name="phone"
              type="text"
              placeholder="Ingrese su teléfono"
              v-model="profileLoggedUser.phone"
              maxlength="9"
              :disabled="!edit"
            />
          </div>
          <div class="form-group">
            <label for="birthday">Fecha de Nacimiento</label>
            <input
              class="form-control"
              name="birthday"
              type="date"
              placeholder="Ingrese su fecha de nacimiento"
              v-model="profileLoggedUser.birthday"
              :disabled="!edit"
            />
          </div>
          <div class="d-flex justify-content-center" v-if="!edit">
            <button class="btn bg-darkblue" @click="edit=true">Editar</button>
          </div>
          <div class="d-flex justify-content-center" v-else>
            <button class="btn bg-ocre" @click="handleUpdateProfile">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./Navbar";
import { mapState, mapActions } from "vuex";
export default {
  name: "Profile",
  components: {
    navbar
  },
  data() {
    return {
      edit: false
    };
  },
  computed: {
    ...mapState("user", ["profileLoggedUser", "errorMessageUpdateProfile"])
  },
  methods: {
    ...mapActions("user", [
      "checkLogin",
      "getProfile",
      "updateProfile",
      "removeErrorMessageUpdateProfile"
    ]),
    handleUpdateProfile() {
      this.updateProfile(this.profileLoggedUser);
    }
  },
  created(){
    this.checkLogin();
  },
  beforeMount() {
    this.getProfile(localStorage.getItem("userId"));
  },
  beforeDestroy() {
    if (this.errorMessageUpdateProfile) {
      this.removeErrorMessageUpdateProfile();
    }
  }
};
</script>

<style scopped>
.form-w-300 {
  width: 300px;
}

#box {
  margin-top: 7rem;
}

.bg-darkblue {
  background-color: #254b8f;
  color: #fff;
}

.bg-ocre {
  background-color: #debb07;
  color: #fff;
}

.btn:focus {
  box-shadow: none;
}
.form-control:focus {
  box-shadow: none;
}
</style>
