import { fetchOptions } from '../../assets/fetchOptions';
import { apiEndpoints } from '../../assets/apiEndpoints';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  position: "bottom-center",
  duration: 3000
});

const state = {}

const actions = {

  addGroup({ commit, rootState }, newGroupName) {
    fetch(apiEndpoints.group, Object.assign(fetchOptions, {
      method: "POST",
      body: JSON.stringify({project: rootState.projectId, name: newGroupName}),
    }))
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      else {
        Vue.toasted.show("Błąd przy dodawaniu grupy", { type: "error" });
        throw new Error(response.status + " " + response.statusText)
      }
    })
    .then(response => {
      commit('ADD_GROUP',  response, { root: true });
      Vue.toasted.show("Pomyślnie dodano grupę", { type: "success" });
    });
  },

  deleteGroup({ commit }, groupId) {
    fetch(`${apiEndpoints.group}${groupId}`, Object.assign(fetchOptions, {
      method: "DELETE",
    }))
    .then(response => {
      if(response.ok) {
        commit('DELETE_GROUP', groupId, { root: true });
        Vue.toasted.show("Pomyślnie usunięto grupę", { type: "success" });
      }
      else {
        Vue.toasted.show("Błąd przy usuwaniu grupy", { type: "error" });
        throw new Error(response.status + " " + response.statusText)
      }
    });
  },

  updateGroup({ commit }, payload) {
    fetch(`${apiEndpoints.group}${payload.id}/`,  Object.assign(fetchOptions, {
      method: "PUT",
      body: JSON.stringify({name: payload.name}),
    }))
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      else {
        Vue.toasted.show("Błąd przy aktualizacji grupy", { type: "error" });
        throw new Error(response.status + " " + response.statusText)
      }
    })
    .then(response => {
      commit('UPDATE_GROUP',  response, { root: true });
      Vue.toasted.show("Pomyślnie zaktualizowano grupę", { type: "success" });
    });
  }
}

const mutations = {}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
