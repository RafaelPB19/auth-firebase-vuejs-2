<template>
    <div>
        <h1 class="text-center m-4">Editar nota</h1>

        <div v-if="isLoading" class="text-center mt-5">
            <h3 class="py-5">Recibiendo información...</h3>
            <bounce-loader :loading="isLoading" color="#3C3736" align="center"></bounce-loader>
        </div>
        <div v-else>
            <b>{{noteEdit.titulo}} - </b>
            <em>
                id: <span class="badge rounded-pill bg-success">{{noteEdit.id}}</span>
            </em>
            <form @submit.prevent="verifyEditNote(noteEdit)">
                <div class="row">
                    <h2>
                        Título
                    </h2>
                    <div class="col-sm-10">
                        <input v-model="noteEdit.titulo"
                        :class="{'is-invalid': isInvalidNote}"
                        type="text" class="form-control form-control-lg" 
                        id="colFormLabelLg">
                    </div>
                    <label v-if="isInvalidNote">
                        Una nota debe tener un título
                    </label>
                </div>
                <div class="mt-4">
                    <h2>Contenido</h2>
                    <div class="form-floating">
                        <textarea v-model="noteEdit.contenido"
                        class="form-control" 
                        placeholder="Escribe el contenido de tu nota" 
                        id="floatingTextarea" style="height: 200px">
                        </textarea>

                        <label for="floatingTextarea">Escribe el contenido de tu nota</label>
                    </div>
                </div>
                <div class="form-check mt-4">
                    <input v-model="noteEdit.favorito"
                    class="form-check-input" type="checkbox" value="" 
                    id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                        Favorito
                    </label>
                </div>
                <button class="btn btn-success btn-block mt-2 w-100" 
                type="submit">Aplicar</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
    name: 'EditNote',
    components: {
        BounceLoader
    },
    data(){
        return {
            noteID: this.$route.params.id
        }
    },
    created(){
        this.getNote(this.noteID)
    },
    computed: {
        ...mapState(['noteEdit', 'isLoading']),
        isInvalidNote(){
            return this.noteEdit.titulo === ""
        }
    },
    methods: {
        ...mapActions(['getNote', 'editNote']),
        verifyEditNote(note){
            if (!this.isInvalidNote){
                this.editNote(note)
            }
        }
    }
}
</script>