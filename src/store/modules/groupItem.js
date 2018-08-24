import { fetchOptions } from '../../assets/fetchOptions';
import { apiEndpoints } from '../../assets/apiEndpoints';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  position: "bottom-center",
  duration: 3000
});

const state = {}

const actions = {

  addItem({ commit }, payload) {
    fetch(apiEndpoints.item, Object.assign(fetchOptions, {
      method: "POST",
      body: JSON.stringify({group: payload.group, text: payload.text}),
    }))
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      else {
        Vue.toasted.show("Błąd przy dodawaniu zadania", { type: "error" });
        throw new Error(response.status + " " + response.statusText)
      }
    })
    .then(response => {
      commit('ADD_ITEM',  response, { root: true });
      Vue.toasted.show("Pomyślnie dodano zadanie", { type: "success" });
    });
  },

  deleteItem({ commit }, itemId) {
    fetch(`${apiEndpoints.item}${itemId}`, Object.assign(fetchOptions, {
      method: "DELETE",
    }))
    .then(response => {
      if(response.ok) {
        commit('DELETE_ITEM',  itemId, { root: true });
        Vue.toasted.show("Pomyślnie usunięto zadanie", { type: "success" });
      }
      else {
        Vue.toasted.show("Błąd przy usuwaniu zadania", { type: "error" });
        throw new Error(response.status + " " + response.statusText)
      }
    });
  },

  updateItem({ commit }, payload) {
    fetch(`${apiEndpoints.item}${payload.id}/`,  Object.assign(fetchOptions, {
      method: "PUT",
      body: JSON.stringify({group: payload.group, text: payload.text, status: payload.status, order: payload.order}),
    }))
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      else {
        Vue.toasted.show("Błąd przy aktualizacji zadania", { type: "error" });
        throw new Error(response.status + " " + response.statusText)
      }
    })
    .then(response => {
      commit('UPDATE_ITEM',  response, { root: true });
      Vue.toasted.show("Pomyślnie zaktualizowano zadanie", { type: "success" });
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
