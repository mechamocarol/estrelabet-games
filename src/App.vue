<template>
  <v-app>
    <v-app-bar
      app
      color="#001D3D"
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="EstrelaBet Logo"
            class="shrink mb-2"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="150"
          />
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        text
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <span class="mr-2">Theme</span>
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-btn
        href="https://github.com/mechamocarol/estrelabet-games"
        target="_blank"
        text
      >
        <span class="mr-2">Github Repository</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>
