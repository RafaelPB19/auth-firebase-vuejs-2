<template>
    <div>
        <h1>¡Bienvenido!</h1>
        <p>{{user.email}}</p>

        <router-link to="/new" class="btn btn-success btn-block mt-2 w-100" >
            Crear nota
        </router-link>
        <Notes />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Notes from '../components/Notes.vue'

export default {
    name: 'Home',
    components: {
        Notes
    },
    computed: {
        ...mapState(['user'])
    }
}
</script>