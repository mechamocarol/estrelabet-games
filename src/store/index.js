import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    games: [],
    caterogies: [
      'mmorpg', 'shooter', 'strategy', 'racing',
      'sports', 'social', 'sandbox', 'open-world',
      'survival', 'pvp', 'pve', 'pixel', 'voxel',
      'zombie', 'turn-based', 'first-person', 'third-Person',
      'top-down', 'tank', 'space', 'sailing', 'side-scroller',
      'superhero', 'permadeath', 'card', 'battle-royale', 'mmo',
      'mmofps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting',
      'action-rpg', 'action', 'military', 'martial-arts', 'flight',
      'low-spec', 'tower-defense', 'horror', 'mmorts'
    ],
    platforms: ['pc', 'browser', 'all']
  },
  mutations: {
    games(state, payload) {
      state.games = payload
    }
  },
  getters: {
    getGamesList: state => state.games,
    getCategories: state => state.caterogies,
    getPlatforms: state => state.platforms
  },
  plugins: [createPersistedState()]
})
