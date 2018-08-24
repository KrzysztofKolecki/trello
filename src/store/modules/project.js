import { fetchOptions } from '../../assets/fetchOptions';
import { apiEndpoints } from '../../assets/apiEndpoints';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  position: "bottom-center",
  duration: 3000
});

const state = {}

const actions = {

  addUser({ commit, rootState }, userName) {
    fetch(`${apiEndpoints.project}${rootState.projectId}/users/${userName}`, Object.assign(fetchOptions, {
      method: "POST",
    }))
    .then(response => {
      if(response.ok) {
        commit('ADD_USER',  userName, { root: true });
        Vue.toasted.show("Pomyślnie dodano użytkownika", { type: "success" });
      }
      else if(response.status === 404){
        Vue.toasted.show("Nie ma takiego użytkownika", { type: "error" });
      }
      else {
        Vue.toasted.show("Błąd przy dodawaniu użytkownika", { type: "error" });
        throw new Error(response.status + " " + response.statusText)
      }
    });
  },

  deleteUser({ commit, rootState }, userName) {
    fetch(`${apiEndpoints.project}${rootState.projectId}/users/${userName}`, Object.assign(fetchOptions, {
      method: "DELETE",
    }))
    .then(response => {
      if(response.ok) {
        commit('DELETE_USER',  userName, { root: true });
        Vue.toasted.show("Pomyślnie usunięto użytkownika", { type: "success" });
      }
      else {
        Vue.toasted.show("Błąd przy usuwaniu użytkownika", { type: "error" });
        throw new Error(response.status + " " + response.statusText)
      }
    });
  },

}

const mutations = {}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
