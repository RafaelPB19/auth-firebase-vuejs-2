<template>
  <div id="app">
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand">Mis Notas</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link to="/" v-if="user" class="nav-link" aria-current="page">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login" v-if="!user">Iniciar sesion</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signin" v-if="!user">Crear cuenta</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <form>
              <input v-if="user && this.$route.name === 'Home'"
                  type="text" placeholder="Buscar notas..."
                  class="form-control me-2"
                  v-model="text" 
                  v-on:keyup="setSearch(text)"
              >
          </form>
          <button class="btn btn-outline-success mx-4" @click="logOut" v-if="user">Cerrar sesion</button>
        </div>
      </div>
    </div>
  </nav>
    <router-view class="container mt-4" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  data(){
    return { text: '' }
  },
  methods: {
    ...mapActions(['logOut']),
    ...mapMutations(['setSearch']),
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
