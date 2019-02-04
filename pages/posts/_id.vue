<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
    {{ post.sha }}
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  asyncData ({ params, error, payload }) {
    if (payload) {
      return {
        post: payload
      }
    }

    throw new Error('No payload')
  }
}
</script>
