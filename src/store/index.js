import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    games: []
  },
  mutations: {
    games (state, payload) {
      state.games = payload
    }
  },
  getters: {
    getGamesList: state => state.games
  },
  plugins: [createPersistedState()]
})
