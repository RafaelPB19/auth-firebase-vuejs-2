import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { db, auth } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    notes: [],
    noteEdit: {},
    isLoading: false,
    search: ''
  },
  mutations: {
    setUser(state, user) {
      console.log(user)
      state.user = user
    },
    setError(state, error) {
      state.error = error
    },
    setNotes(state, notes) {
      state.notes = notes
    },
    setNoteEdit(state, note) {
      state.noteEdit = note
    },
    deleteNote(state, noteID) {
      state.notes = state.notes.filter(item => item.id != noteID)
    },
    setLoading(state, value) {
      state.isLoading = value
    },
    setSearch(state, search) {
      state.search = search.toLowerCase()
    }
  },
  actions: {
    logIn({ commit }, registerUser) {
      commit('setLoading', true)
      auth.signInWithEmailAndPassword(registerUser.email, registerUser.password)
        .then(res => {
          console.log(res)
          commit('setUser', {email: res.user.email, uid: res.user.uid})
          commit('setLoading', false)

          router.push("/")
          commit('setError', null)
        })
        .catch(err => {
          commit('setError', err)
          console.log(err)
          commit('setLoading', false)
        })
    },
    signIn({ commit }, user) {
      auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          commit('setUser', {email: res.user.email, uid: res.user.uid})

          db.collection(res.user.uid).add({
            titulo: 'Nota de ejemplo',
            contenido: 'Esta es una una de ejemplo, ¡prueba a añadir las tuyas propias!',
            favorito: false
          })

          router.push("/")
          commit('setError', null)
        })
        .catch(err => {
          commit('setError', err)
          console.log(err)
        })
    },
    logOut({ commit }) {
      auth.signOut()
        .then(res => {
          console.log("Chao")
          router.push('/login')
        })
    },
    getNotes({ commit, state }) {
      commit('setLoading', true)
      let notes = []

      db.collection(state.user.uid).get()
        .then(res => {
          res.forEach(doc => {
            let note = doc.data()
            note.id = doc.id

            notes.push(note)
          })
          notes = notes.sort((a, b) => {
            if (a.favorito && !b.favorito) {
              return -1
            }
            if (b.favorito && !a.favotito) {
              return 1
            }

            return 0
          })
          commit('setNotes', notes)
          commit('setLoading', false)
        })
    },
    getNote({commit, state }, noteID) {
      commit('setLoading', true)
      db.collection(state.user.uid).doc(noteID).get()
        .then(doc => {
          let note = doc.data()
          note.id = doc.id
          commit('setNoteEdit', note)
          commit('setLoading', false)
        })
    },
    editNote({ commit, state }, note) {
      db.collection(state.user.uid).doc(note.id).update(note)
        .then(res => {
          //commit('setNoteEdit', null)
          router.push('/')
        })
    },
    deleteNote({ commit, state }, noteID) {
      db.collection(state.user.uid).doc(noteID).delete()
        .then(res => {
          commit('deleteNote', noteID)
        })
    },
    newNote({ commit, state }, note) {
      commit('setLoading', true)
      db.collection(state.user.uid).add(note)
        .then(res => {
          router.push('/')
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    filterNotes(state){
      let filter = []
      
      for(let note of state.notes){
        let title = note.titulo.toLowerCase()
        let content = note.contenido.toLowerCase()

        if(title.indexOf(state.search) >= 0 || content.indexOf(state.search) >= 0 ){
          filter.push(note)
        }
      }

      return filter
    }
  },
  modules: {
  }
})
