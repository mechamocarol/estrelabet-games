<template>
  <v-container>
    <loading-circle v-if="loading"/>
    <div v-else>
      <h1 class="display-1 font-weight-bold mt-3">{{ currentGame.title }}</h1>
      <h3 class="ml-1">{{ currentGame.publisher }}</h3>
      <h5 class="ml-1 font-weight-light"> Developed by {{ currentGame.developer }}</h5>
      <v-row class="mb-10">
        <v-card class="mx-auto my-12" width="100%">
          <v-carousel
            cycle
            height="300"
            :continuous="true"
            hide-delimiter-background
            show-arrows-on-hover
            v-if="currentGame.screenshots.length > 0"
            >
            <v-carousel-item
              v-for="(item, i) in currentGame.screenshots"
              :key="i"
              :src="item.image"
            ></v-carousel-item>
          </v-carousel>
  
          <div class="ml-4 mt-4 mb-4 flex">
            <v-chip class="deep-purple accent-4 white--text genre">{{ currentGame.genre }}</v-chip>
            <v-icon class="ml-4 mr-2">mdi-devices</v-icon> <span>{{ currentGame.platform }}</span>
          </div>
          <v-divider class="mx-2"></v-divider>
  
          <v-card-title>Description</v-card-title>
          <v-card-text v-html="currentGame.description"/>
          <v-divider class="mx-2" v-if="currentGame.minimum_system_requirements"></v-divider>
  
          <v-card-title v-if="currentGame.minimum_system_requirements">Minimum System Requirements</v-card-title>
          <v-card-text v-if="currentGame.minimum_system_requirements">
            Graphics: {{ currentGame.minimum_system_requirements.graphics }}
            <br>
            Memory: {{ currentGame.minimum_system_requirements.memory }}
            <br>
            OS: {{ currentGame.minimum_system_requirements.os }}
            <br>
            Processor: {{ currentGame.minimum_system_requirements.processor }}
            <br>
            Storage: {{ currentGame.minimum_system_requirements.storage }}
          </v-card-text>
          <v-divider class="mx-2"></v-divider>
  
          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="openGameURL(currentGame.game_url)"
            >
              Game link <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </div>  
  </v-container>
</template>

<script>
import { gamesService } from '@/services'
import LoadingCircle from '../components/LoadingCircle.vue'
export default {
  name: 'GamesView',
  components: { LoadingCircle },
  data: () => ({
    loading: false,
    currentGame: {}
  }),
  async mounted () {
    this.loading = true
    const gameId = this.$route.params.id
    const gameInfos = await gamesService.getGameById(gameId)
    if (gameInfos.status === 200) {
      this.currentGame = gameInfos.data
    }
    this.loading = false
  },
  methods: {
    openGameURL (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
