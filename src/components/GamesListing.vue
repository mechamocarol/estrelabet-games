<template>
  <v-container>
    <h1 class="display-1 font-weight-bold mt-3">Game finder</h1>
    <loading-circle v-if="loading"/>
    <v-row v-else class="mb-10">
      <v-card
        v-for="(game, index) in games"
        :key="`${game.id}-${index}`"
        @click="openGameDetails(game.id)"
        class="mx-auto my-12"
        max-width="374"
      >
        <v-img
          height="200"
          :src="game.thumbnail"
        ></v-img>

        <v-card-title>{{ game.title }}</v-card-title>
        <v-card-subtitle>{{ game.publisher }}</v-card-subtitle>
        <v-card-text>
          <div class="text-subtitle-1 platform-info">
            <v-icon class="mr-2">mdi-devices</v-icon> <span>{{ game.platform }}</span>
          </div>
        </v-card-text>

        <v-card-text>
          <v-chip class="deep-purple accent-4 white--text genre">{{ game.genre }}</v-chip>
        </v-card-text>

        <v-divider class="mx-2"></v-divider>
      
        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="openGameURL(game.game_url)"
          >
            Game link <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { gamesService } from '@/services'
import LoadingCircle from '../components/LoadingCircle.vue'
export default {
  name: 'GamesListing',
  components: { LoadingCircle },
  data: () => ({
    loading: false
  }),
  async mounted () {
    this.loading = true
    const gamesList = await gamesService.getGamesList()
    if (gamesList.status === 200) {
      // Vuex stores request's payload, so we don't need multiple requests to update the view.
      this.$store.commit('games', gamesList.data)
    }
    this.loading = false
  },
  computed: {
    games () {
      return this.$store.getters['getGamesList']
    }
  },
  methods: {
    openGameURL (url) {
      window.open(url, '_blank')
    },
    openGameDetails (gameId) {
      this.$router.push({
        name: 'game',
        params: {
          id: gameId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.genre {
  cursor: default;
}
.platform-info {
  align-items: center;
  display: flex;
}
</style>
