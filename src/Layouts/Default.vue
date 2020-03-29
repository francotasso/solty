<template>
  <div>
    <w-navbar></w-navbar>
    <slot></slot>
    <w-footer></w-footer>
  </div>
</template>
<script>
import wNavbar from './Navbar';
import wFooter from './Footer';

export default {
  components: {
    wNavbar,
    wFooter,
  },
};
</script>