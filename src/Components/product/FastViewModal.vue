<template>
  <div>
    <b-modal
      v-model="showModal"
      :title="item.productName"
      header-bg-variant="dark"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      footer-bg-variant="dark"
      footer-text-variant="white"
      size="lg"
    >
      <b-container fluid>
        <b-row class="mb-1 text-center">
          <b-col cols="4">
            <b-img :src="item.image" fluid-grow rounded thumbnail :alt="item.productName"></b-img>
          </b-col>
          <b-col cols="8">
            <p class="text-left">{{ item.description }}</p>
          </b-col>
        </b-row>
      </b-container>

      <template v-slot:modal-footer>
        <div class="w-100">
          <!-- <p class="float-left">Modal Footer Content</p> -->
          <b-button
            variant="light"
            size="md"
            class="float-right font-weight-bold"
            @click="$emit('close')"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: {
      show: { type: Boolean, default: false },
      item: { type: Object, default: {} }
    },
    data() {
      return {
        showModal: this.show,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'warning',
        footerTextVariant: 'dark'
      }
    },
    watch: {
      show: {
        immediate: true,
        handler(newVal) {
          this.showModal = newVal;
        }
      },
      showModal(open) {
        if (!open) this.$emit('close');
      }
    }
  }
</script>