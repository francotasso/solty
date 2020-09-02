<template>
  <div v-if="!loading">
    <div class="row field-box" :class="{ 'field-box--error': $v.user.firstName.$error }">
      <label for="name" class="label__form col-md-3">Nombre</label>
      <input id="name" type="text" v-model.trim="$v.user.firstName.$model" class="input__form col-md-7">
      <div class="errors-box">
        <div class="error" v-if="!$v.user.firstName.required">Campo requerido</div>
        <div class="error" v-if="!$v.user.firstName.minLength">El nombre debe contener al menos {{$v.user.firstName.$params.minLength.min}} letras</div>
      </div>
    </div>
    <div class="field-box row" :class="{ 'field-box--error': $v.user.lastName.$error }">
      <label for="lastName" class="label__form col-md-3">Apellido</label>
      <input id="lastName" type="text" v-model.trim="$v.user.lastName.$model" class="input__form col-md-7">
      <div class="errors-box">
        <div class="error" v-if="!$v.user.lastName.required">Campo requerido</div>
        <div class="error" v-if="!$v.user.lastName.minLength">El apellido debe contener al menos {{$v.user.lastName.$params.minLength.min}} letras</div>
      </div>
    </div>
    <div class="field-box row" :class="{ 'field-box--error': $v.user.email.$error }">
      <label for="email" class="label__form col-md-3">Email</label>
      <input id="email" type="email" v-model.trim="$v.user.email.$model" class="input__form col-md-7">
      <div class="errors-box">
        <div class="error" v-if="!$v.user.email.required">Campo requerido</div>
        <div class="error" v-if="!$v.user.email.email">Ingrese un correo válido</div>
      </div>
    </div>
    <div class="field-box row">
      <label for="gender" class="label__form col-md-3">Género</label>
      <select id="gender" v-model.trim="user.gender" class="input__form col-md-7">
        <option>Masculino</option>
        <option>Femenino</option>
        <option>Otros</option>
      </select>
    </div>
    <div class="field-box row" :class="{ 'field-box--error': $v.user.phone.$error }">
      <label for="phone" class="label__form col-md-3">Teléfono</label>
      <input id="phone" type="text" v-model.trim="$v.user.phone.$model" class="input__form col-md-7">
      <div class="errors-box">
        <div class="error" v-if="!$v.user.phone.required">Campo requerido</div>
        <div class="error" v-else-if="!$v.user.phone.numeric">El teléfono solo debe contener números</div>
        <div class="error" v-else-if="!$v.user.phone.between">Ingrese un teléfono válido</div>
      </div>
    </div>
    <div class="field-box row" :class="{ 'field-box--error': $v.user.birthday.$error }">
      <label for="birthday" class="label__form col-md-3">Fecha de nacimiento</label>
      <input id="birthday" type="date" v-model.trim="$v.user.birthday.$model" class="input__form col-md-7">
      <div class="errors-box">
        <div class="error" v-if="!$v.user.birthday.required">Campo requerido</div>
        <div class="error" v-if="!$v.user.birthday.maxValue">Seleccione una fecha válida</div>
      </div>
    </div>
    <div class="field-box row flex-column">
      <button class="btn-save col-md-3 offset-md-3" @click="handleUpdateProfile" :disabled="loading || !hasChanged">
        <span>Guardar cambios</span>
        <span v-if="loading" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </span>
      </button>
      <!-- <span v-show="updateSuccess || updateFailure" class="my-3 offset-md-3">
        <p v-if="updateSuccess" class="text-success">Se actualizó correctamente</p>
        <p v-else class="text-danger">{{ errorMessage }}</p>
      </span> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, minLength, between, email, numeric, maxValue } from 'vuelidate/lib/validators'
export default {
  name: "ProfileSection",
  validations: {
    user: {
      firstName: {
        required,
        minLength: minLength(4)
      },
      lastName: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        numeric,
        between: between(900000000,999999999)
      },
      birthday: {
        required,
        maxValue: value => new Date(value).toISOString() < new Date().toISOString()
      }
    }
  },
  data() {
    return {
      user: null,
      loading: false,
      updateSuccess: false,
      updateFailure: false,
      errorMessage: '',
      hasChanged: false,
      loading: true
    };
  },
  created() {
    this.loadProfile();
  },
  computed: {
    ...mapState("user", ["userAuth"])
  },
  methods: {
    ...mapActions("user", [
      "getProfile",
      "updateProfile"
    ]),
    async loadProfile() {
      await this.getProfile(this.userAuth._id);
      this.user = this._.cloneDeep(this.userAuth);
      this.loading = false;
    },
    async handleUpdateProfile() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        
      } else {
        try {
          this.loading = true;
          const user = this._.cloneDeep(this.user);
          user.birthday = new Date(user.birthday).toISOString();
          await this.updateProfile(user);
          this.loading = false;
          this.$bvToast.toast(`Perfil actualizado correctamente`, {
            title: 'Actualización',
            autoHideDelay: 3000,
            variant: 'success'
          })
        } catch (error) {
          this.updateFailure = true;
          this.errorMessage = error.message;
          this.loading = false;
          setTimeout(() => {
            this.updateFailure = false;
          }, 5000)
        }
      }
    }
  },
  watch: {
    user: {
      deep: true,
      handler(newVal) {
        const user = this._.cloneDeep(this.user);
        for (let field in user) {
          if (user[field] !== this.userAuth[field]) {
            this.hasChanged = true;
            return;
          } else this.hasChanged = false;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field-box {
  position: relative;
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
  .errors-box {
    font-size: 12px;
    position: absolute;
    display: block;
    top: 40px;
    left: 200px;
  }
  &--error {
    animation-name: shakeError;
    animation-fill-mode: forwards;
    animation-duration: .6s;
    animation-timing-function: ease-in-out;
    .error, .label__form {
      color: #f04124;
    }
    .input__form {
      border-color: #f79483;
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
}
.spinner-border {
  position: absolute;
  top: 7px;
  right: 12px;
  height: 20px;
  width: 20px;
  color: rgb(150, 150, 150);
  animation: spinner-border 1.5s linear infinite;
}
@keyframes shakeError {
  0% {
    transform: translateX(0); }
  15% {
    transform: translateX(0.375rem); }
  30% {
    transform: translateX(-0.375rem); }
  45% {
    transform: translateX(0.375rem); }
  60% {
    transform: translateX(-0.375rem); }
  75% {
    transform: translateX(0.375rem); }
  90% {
    transform: translateX(-0.375rem); }
  100% {
    transform: translateX(0); } 
}
</style>