<template>
  <v-container>
    <h1 class="display-1 font-weight-bold mt-3">Game finder</h1>
    <loading-circle v-if="loading"/>
    <div v-else>
      <v-row class="mt-10">
        <v-col>
          <v-text-field
            solo
            v-model="search"
            label="Search a game by name"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select
            solo
            clearable
            label="Category or tag"
            :items="categories"
            @input="filterGames()"
            v-model="selectedCategory"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            solo
            clearable
            label="Plataform"
            :items="platforms"
            @input="filterGames()"
            v-model="selectedPlatform"
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="mb-10" v-if="filteredGames.length > 0">
        <v-card
          v-for="(game, index) in filteredGames"
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
      <v-row v-else class="no-results">
        <h2>There's no results for this search. Check the filters!</h2>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { gamesService } from '@/services'
import LoadingCircle from '../components/LoadingCircle.vue'
export default {
  name: 'GamesListing',
  components: { LoadingCircle },
  data: () => ({
    loading: false,
    search: '',
    selectedCategory: null,
    selectedPlatform: null
  }),
  async mounted () {
    this.getAllGames()
  },
  computed: {
    categories () {
      return this.$store.getters['getCategories']
    },
    platforms () {
      return this.$store.getters['getPlatforms']
    },
    games () {
      return this.$store.getters['getGamesList']
    },
    filteredGames () {
      const filtered = this.games.filter((game) => {
        return game.title.toLowerCase().includes(this.search.toLowerCase())
      })
      return filtered
    }
  },
  methods: {
    async getAllGames () {
      this.loading = true
      const gamesList = await gamesService.getGamesList()
      if (gamesList.status === 200) {
        // Vuex stores request's payload, so we don't need multiple requests in case we change any item and need to update the view.
        this.$store.commit('games', gamesList.data)
      }
      this.loading = false
    },
    async filterGames () {
      this.loading = true
      this.search = ''

      // We'll filter just when at least one of the filters are !== null
      if (this.selectedCategory || this.selectedPlatform) {
        const filter = await gamesService.getGamesByCategoryOrPlatform(this.selectedCategory, this.selectedPlatform)
        if (filter.status === 200) {
          this.loading = false
          return this.$store.commit('games', filter.data)
        }
      }
      this.getAllGames()
    },
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
.no-results {
  display: block;
  text-align: center;
  margin-top: 10%;
}
</style>
