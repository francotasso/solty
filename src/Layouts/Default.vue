<template>
  <div>
    <w-navbar :fixed-header="fixedHeader"></w-navbar>
    <slot></slot>
    <w-footer v-if="!noFooter"></w-footer>
  </div>
</template>
<script>
import wNavbar from './Navbar';
import wFooter from './Footer';

export default {
  name: 'WrapperSection',
  props: {
    fixedHeader: {
      type: Boolean,
      default: false
    },
    noFooter: {
      type: Boolean,
      default: false
    }
  },
  components: {
    wNavbar,
    wFooter,
  },
};
</script>