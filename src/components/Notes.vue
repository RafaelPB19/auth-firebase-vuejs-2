<template>
    <div class="mt-4">


        <div v-if="isLoading" class="text-center mt-5">
            <h3 class="py-5">Cargando notas...</h3>
            <bounce-loader :loading="isLoading" color="#3C3736" align="center"></bounce-loader>
        </div>

        <div class="list-group" v-else>
            <button v-for="(item, index) of filterNotes" :key="index" 
            class="list-group-item list-group-item-action"
            :class="{'list-group-item-primary': clickedNote.id === item.id}"
            @click="clickNote(item)">
                <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{item.titulo}}</h5>
                <small class="text-muted">Favorito: <input type="checkbox" v-model="item.favorito"></small>
                </div>
                
                <p class="mb-1">{{item.contenido}}</p>
                <!-- <small class="text-muted">And some muted small print.</small> -->
                
                <div v-if="clickedNote.id === item.id" class="float-right">
                    <router-link class="btn btn-warning m-2"
                    :to="{name: 'EditNote', params: {id: item.id}}">
                        Editar
                    </router-link>
                    <button class="btn btn-dark"
                    @click="deleteNote(item.id)">Eliminar</button>
                </div>
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
    name: 'Notes',
    components: {
        BounceLoader
    },
    data() {
        return {
            clickedNote: {},
            text: ''
        }
    },
    created(){
        this.getNotes()
    },
    methods: {
        ...mapActions(['getNotes', 'deleteNote']),
        ...mapMutations(['setSearch']),
        clickNote(note){
            this.clickedNote = note
        }
    },
    computed: {
        ...mapState(['notes', 'isLoading']),
        ...mapGetters(['filterNotes'])
    }
}
</script>