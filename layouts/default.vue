<template>
  <v-app light class="layout layout--default white black--text">
    <v-content>
      <v-container class="layout__container">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="stylus">
.container.layout__container
  max-width 800px
</style>
