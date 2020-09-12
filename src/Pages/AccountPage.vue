<template>
  <wrapper-section :no-footer="true">
    <div class="container">
      <div class="row account-container">
        <div class="col-md-3 options-list">
          <ul>
            <li @click="activeSection('profile')" :class="{'selected' : sections.profile}">Editar Perfil</li>
            <li @click="activeSection('password')" :class="{'selected' : sections.password}">Cambiar contraseña</li>
            <li @click="activeSection('privacy')" :class="{'selected' : sections.privacy}">Privacidad y seguridad</li>
          </ul>
        </div>
        <div class="col-md-9 displayed-content">
          <transition name="fade" mode="out-in">
            <div v-if="sections.profile" class="container" key="sectionProfile">
              <profile-section></profile-section>
            </div>
            <div v-else-if="sections.password" class="container" key="editPassword">
              <password-section></password-section>
            </div>
            <div v-else-if="sections.privacy" class="container" key="editPrivacy">
              <div class="row my-4">
                <label for="name" class="col-md-3 text-right">Contraseña anterior</label>
                <input id="name" type="text" class="col-md-7">
              </div>
              <div class="row my-4">
                <label for="lastName" class="col-md-3 text-right">Contraseña nueva</label>
                <input id="lastName" type="password" class="col-md-7">
              </div>
              <div class="row my-4">
                <label for="lastName" class="col-md-3 text-right">Confirmar contraseña</label>
                <input id="lastName" type="password" class="col-md-7">
              </div>
              <div class="row my-4 flex-column">
                <button class="col-md-3 offset-md-3">
                  Cambiar contraseña
                </button>
                <span class="my-3 offset-md-3">
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </wrapper-section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProfileSection from '../components/account/ProfileSection';
import PasswordSection from '../components/account/PasswordSection';
export default {
  name: "AccountPage",
  components: {
    ProfileSection,
    PasswordSection
  },
  props: {
    option: {
      type: String,
      default: 'profile'
    }
  },
  data() {
    return {
      sections: {
        profile: false,
        password: false,
        privacy: false
      }
    };
  },
  created() {
    this.setFirstOption();
  },
  methods: {
    setFirstOption() {
      if (this.option === 'profile') this.sections.profile = true;
      else if (this.option === 'password') this.sections.password = true;
      else this.sections.privacy = true;
    },
    activeSection(option) {
      for (const prop in this.sections) {
        if (prop === option) this.sections[prop] = true;
        else this.sections[prop] = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');
.account-container {
  font-family: 'Ropa Sans', sans-serif;
  border-radius: 2px;
  border: 1px solid #ccc;
  margin: {
    top: 2rem;
    bottom: 2rem;
  }
  .options-list {
    border-right: 1px solid #ccc;
    padding: {
      left: 0;
      right: 0;
    }
    ul {
      list-style: none;
      padding-inline-start: 0px;
      li {   
        cursor: pointer;
        padding: {
          top: 1.5rem;
          bottom: 1.5rem;
          left: 1.5rem;
        }
        &:hover:not(.selected) {
          background-color: #efefff;
          border-left: 3px solid #ccc;
        }
      }
      .selected {
        border-left: 3px solid #222;
      }
    }
  }
  .displayed-content {
    margin: {
      top: 2rem;
      bottom: 2rem;
    }
    min-height: 350px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
