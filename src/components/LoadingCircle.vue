<template>
  <v-row class="loading-circle">
    <v-progress-circular
      :size="70"
      :width="7"
      :color="$vuetify.theme.dark ? 'yellow' : 'blue'"
      indeterminate
    ></v-progress-circular>
  </v-row>  
</template>

<script>
export default {
  name: 'LoadingCircle'
}
</script>

<style lang="scss" scoped>
.loading-circle {
  align-content: center;
  justify-content: center;
  width: 100%;
  margin-top: 18%;
}
</style>
