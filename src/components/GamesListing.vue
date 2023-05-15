<template>
  <v-container>
    <v-row><p>Hey, fuckers!</p></v-row>
  </v-container>
</template>

<script>
  import { gamesService } from '@/services'
  export default {
    name: 'GamesListing',
    data: () => ({
      loading: false
    }),
    async mounted () {
      const gamesList = await gamesService.getGamesList()
      // Vuex stores request's payload, so we don't need multiple requests to update the view.
      this.$store.commit('games', gamesList.data)
    },
    computed: {
      games () {
        return this.$store.getters['getGamesList']
      }
    }
  }
</script>
