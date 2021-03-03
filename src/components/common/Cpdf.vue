<!--  -->
<template>
  <div>
    <div class="wrap">
      <iframe :src="pSrc" type="application/x-google-chrome-pdf" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>


<script>
export default {
  // props: [
  //   pdfurl: {
  //     type: String,
  //     required: true
  //   },
  // ],
  data () {
    return {
      pSrc: 'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    };
  },

  components: {},

  computed: {},

  methods: {

  }
}
</script>


<style lang="scss" scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
}
</style>