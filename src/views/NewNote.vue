<template>
    <div>
        <h1 class="text-center m-4">Crear nota</h1>
        <form @submit.prevent="newNote({titulo: titulo, contenido: contenido, favorito: favorito})">
            <h2>Vamos a llenar los datos de tu nueva nota:</h2>
            
            <div class="row mt-4">
                <h4>
                    Título
                </h4>
                <div class="col-sm-10">
                    <input v-model="titulo"
                    :class="{'is-invalid': !$v.titulo.required}"
                    type="text" class="form-control form-control-lg" 
                    id="colFormLabelLg">
                </div>
            </div>
            <label v-if="!$v.titulo.required" class="text-danger">
                Una nota debe tener un título
            </label>
            
            <div class="mt-4">
                <h4>Contenido</h4>
                <div class="form-floating">
                    <textarea v-model="contenido"
                    class="form-control" 
                    placeholder="Escribe tu nota aquí..." 
                    id="floatingTextarea" style="height: 150px">
                    </textarea>

                    <label for="floatingTextarea">Escribe tu nota aquí...</label>
                </div>
            </div>
            <div class="form-check mt-4">
                <input v-model="favorito"
                class="form-check-input" type="checkbox" value="" 
                id="defaultCheck1">
                <label class="form-check-label" for="defaultCheck1">
                    Favorito
                </label>
            </div>
            <button class="btn btn-success btn-block mt-2 w-100"
            type="submit" :disabled="$v.$invalid || isLoading"
            >
                Crear
            </button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'NewNote',
    data() {
        return{
            titulo: '',
            contenido: '',
            favorito: false
        }
    },
    methods: {
        ...mapActions(['newNote'])
    },
    computed: {
        ...mapState(['isLoading'])
    },
    validations: {
        titulo: { required }
    }
}
</script>