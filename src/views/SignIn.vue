<template>
    <div>
        <h1>Registro de usuarios</h1>

        <form class="form-control"
            @submit.prevent="signIn({email: userEmail, password: pass2})"
        >
            <div class="m-4">
                <div class="input-group">
                    <div class="input-group-text">Email</div>
                    <input 
                        type="email" 
                        class="form-control"
                        placeholder="Ingrese su email"
                        :class="{'is-invalid': !$v.userEmail.required || !$v.userEmail.email}"
                        v-model="$v.userEmail.$model"
                    >
                </div>
                <label v-if="!$v.userEmail.required" class="text-danger">
                    Debes escribir un correo.
                </label>
                <label v-if="!$v.userEmail.email" class="text-danger">
                    Este correo no es válido.
                </label>
            </div>
            <div class="m-4">
                <div class="input-group">
                    <div class="input-group-text">Contraseña</div>
                    <input 
                        type="password" 
                        class="form-control"
                        :class="{'is-invalid': !$v.pass1.required}"
                        placeholder="Ingrese su contraseña"
                        v-model="$v.pass1.$model"
                    >
                </div>
                
                <label v-if="!$v.pass1.required" class="text-danger">
                    Debes escribir tu contraseña.
                </label>
                <label v-if="!$v.pass1.minLength" class="text-danger">
                    La contraseña debe contener al menos {{$v.pass1.$params.minLength.min}} carácteres
                </label>
            </div>
            <div class="m-4">
                <div class="input-group">
                    <div class="input-group-text">Contraseña</div>
                    <input 
                        type="password" 
                        class="form-control"
                        :class="{'is-invalid': !$v.pass2.sameAsPassword}"
                        placeholder="Repita su contraseña"
                        v-model="$v.pass2.$model"
                    >
                </div>
                <label v-if="!$v.pass2.sameAsPassword" class="text-danger">
                    Las contraseñas no coinciden.
                </label>
            </div>
            <div v-if="error">
                <p v-if="error.code == 'auth/email-already-in-use'">
                    Error: Este usuario ya existe.
                </p>
            </div>
            <button class="btn btn-success btn-block mt-2 w-100"
                type="submit" :disabled="$v.$invalid">Registrar</button>
        </form>
    </div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'SignIn',
    data() {
        return {
            userEmail: '',
            pass1: '',
            pass2: ''
        }
    },
    methods: {
        ...mapActions(['signIn'])
    },
    computed: {
        ...mapState(['error'])
    },
    validations: {
        userEmail: { required, email },
        pass1: { required, minLength: minLength(6) },
        pass2: { sameAsPassword: sameAs('pass1') }
    }
}
</script>