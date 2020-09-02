<template>
  <div>
    <div class="row field-box">
      <label for="oldPassword" class="col-md-3 label__form">Contraseña anterior</label>
      <input id="oldPassword" type="text" class="col-md-7 input__form" v-model="password.old">
    </div>
    <div class="row field-box">
      <label for="newPassword" class="col-md-3 label__form">Contraseña nueva</label>
      <input id="newPassword" type="password" class="col-md-7 input__form" v-model="password.new">
    </div>
    <div class="row field-box">
      <label for="confirmPassword" class="col-md-3 label__form">Confirmar contraseña</label>
      <input id="confirmPassword" type="password" class="col-md-7 input__form" v-model="password.confirm">
    </div>
    <div class="row my-4 flex-column">
      <button @click="updateUserPassword" :disabled="loading" class="btn-save col-md-3 offset-md-3">
        <span>Cambiar contraseña</span>
        <span v-if="loading" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </span>
      </button>
      <span v-if="updateSuccess" class="my-3 offset-md-3 text-success">
        Se cambió la contraseña correctamente
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: "PasswordSection",
  data() {
    return {
      password: {
        old: '',
        new: '',
        confirm: ''
      },
      loading: false,
      updateSuccess: false
    }
  },
  computed: {
    ...mapState("user", ["userAuth"])
  },
  methods: {
    ...mapActions("user", ["updatePassword"]),
    async updateUserPassword() {
      if (this.password.new === this.password.confirm) {
        this.loading = true;
        const payload = {
          id: this.userAuth._id,
          oldPassword: this.password.old,
          newPassword: this.password.new
        }
        await this.updatePassword(payload);
        this.loading = false;
        this.updateSuccess = true;
        setTimeout(() => {
          this.updateSuccess = false;
        }, 5000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-border {
  position: absolute;
  top: 5px;
  right: 15px;
  height: 15px;
  width: 15px;
  color: rgb(200, 200, 200);
  animation: spinner-border 1.5s linear infinite;
}
.field-box {
  margin: {
    top: 2rem;
    bottom: 2rem;
  }
  .label__form {
    text-align: right;
    align-self: center;
    margin-bottom: 0;
  }
  .input__form {
    font-size: 0.875rem;
    font-weight: 300;
    color: #374853;
    line-height: 2.375rem;
    min-height: 2.375rem;
    position: relative;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 5px;
    background: #fff;
    padding: 0 0.8125rem;
    width: 100%;
    transition: border .1s ease;
    box-sizing: border-box;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
}
.btn-save {
  background-color: #222;
  color: #fff;
  padding: .375rem 1.2rem;
  text-decoration: none;
  border-radius: 4px;
  &:not(:disabled) {
    border: 1px solid #222;
  }
  &:disabled {
    background-color: rgb(200, 200, 200);
  }
}
</style>