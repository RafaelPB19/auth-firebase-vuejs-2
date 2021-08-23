<template>
    <div>
        <h1>Iniciar sesion</h1>
        <form class="form-control"
            @submit.prevent="logIn({email: $v.email.$model, password: $v.pass.$model})"
        >
            <div class="m-4">
                <div class="input-group">
                    <div class="input-group-text">Email</div>
                    <input 
                        type="email" 
                        class="form-control"
                        placeholder="Ingrese su email"
                        :class="{'is-invalid': !$v.email.required || !$v.email.email}"
                        v-model="$v.email.$model"
                    >
                </div>
                <label v-if="!$v.email.required" class="text-danger">
                    Debes escribir un correo.
                </label>
                <label v-if="!$v.email.email" class="text-danger">
                    Este correo no es válido.
                </label>
            </div>
            <div class="m-4">
                <div class="input-group">
                    <div class="input-group-text">Contraseña</div>
                    <input 
                        type="password" 
                        class="form-control"
                        :class="{'is-invalid': !$v.pass.required}"
                        placeholder="Ingrese su contraseña"
                        v-model="$v.pass.$model"
                    >
                </div>
                <label v-if="!$v.pass.required" class="text-danger">
                    Debes escribir tu contraseña.
                </label>
            </div>
            <button class="btn btn-success btn-block mt-2 w-100"
                type="submit" 
                :disabled="$v.$invalid || isLoading"
            >
                Acceder
            </button>
            <div v-if="error">
                <p v-if="error.code === 'auth/user-not-found'" class="mt-4">
                    Error: El usuario no existe.
                </p>
                <p v-if="error.code === 'auth/wrong-password'" class="mt-4">
                    Error: Contraseña incorrecta.
                </p>
            </div>
        </form>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            pass: ''
        }
    },
    methods: {
        ...mapActions(['logIn'])
    },
    computed: {
        ...mapState(['isLoading', 'error'])
    },
    validations: {
        email: { email, required },
        pass: { required }
    }
}
</script>