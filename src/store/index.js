import Vue from 'vue'
import Vuex from 'vuex'
import groupItem from './modules/groupItem'
import group from './modules/group'
import project from './modules/project'
import { apiEndpoints } from '../assets/apiEndpoints';

Vue.use(Vuex)

const state = {
  itemGroups: [],
  projectName: "",
  projectUsers: [],
  projectOwner: "",
  projectId: document.getElementById("project-info").getAttribute("project-id"),
  userName: document.getElementById("project-info").getAttribute("user")
}

const actions = {
  fetchProject({ commit }) {
    fetch(`${apiEndpoints.project}${state.projectId}`, {credentials: "include"})
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error(response.status + " " + response.statusText)
    })
    .then(response => {
      commit("FETCH_PROJECT", response);
    });
    setTimeout(function () {
      actions.fetchProject({ commit });
    }, 5000);
  }
}

const mutations = {

  FETCH_PROJECT(state, project) {
    state.itemGroups = project.item_groups;
    state.projectName = project.name;
    state.projectUsers = project.users;
    state.projectOwner = project.owner;
  },

  DELETE_GROUP(state, groupId) {
    state.itemGroups = state.itemGroups.filter(itemGroup => itemGroup.id !== groupId);
  },

  ADD_GROUP(state, group) {
    state.itemGroups.push(group);
  },

  ADD_ITEM(state, item) {
    let itemArrayIndex = state.itemGroups.findIndex(group => group.id === item.group);
    state.itemGroups[itemArrayIndex].items.push(item);
  },

  DELETE_ITEM(state, itemId) {
    let groupId = state.itemGroups.filter(group => group.items.find(item => item.id === itemId))[0].id;
    let groupArrayIndex = state.itemGroups.findIndex(group => group.id === groupId);
    state.itemGroups[groupArrayIndex].items = state.itemGroups[groupArrayIndex].items.filter(item => item.id !== itemId);
  },

  UPDATE_ITEM(state, item) {
    let groupArrayIndex = state.itemGroups.findIndex(group => group.id === item.group);
    let itemArrayIndex = state.itemGroups[groupArrayIndex].items.findIndex(groupItem => groupItem.id === item.id);
    state.itemGroups[groupArrayIndex].items.splice(itemArrayIndex, 1, item);
  },

  UPDATE_GROUP(state, group) {
    let groupArrayIndex = state.itemGroups.findIndex(itemGroup => itemGroup.id === group.id);
    state.itemGroups.splice(groupArrayIndex, 1, group);
  },

  ADD_USER(state, user) {
    state.projectUsers.push(user);
  },

  DELETE_USER(state, userName) {
    state.projectUsers = state.projectUsers.filter(user => user !== userName);
  },

}

const getters = {

  groups: state => {
    return state.itemGroups
  },

  name: state => {
    return state.projectName
  },

  users: state => {
    return state.projectUsers
  },

  owner: state => {
    return state.projectOwner
  },

  userName: state => {
    return state.userName
  }

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    group,
    groupItem,
    project
  }
})
