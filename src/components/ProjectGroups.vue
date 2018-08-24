<template>

  <div>
    <div class="row project-name"> <h3>{{ projectName }}</h3> </div>
    <div class="row top-pane">
      <div class="col-6">
        <div v-if="newGroupAdd == false">
          <button id="groupadd_showform_button" type="submit" class="btn btn-success" @click="newGroupAdd = true">Dodaj grupę...</button>
        </div>
        <div v-else>
          <input id="groupadd_name_input" placeholder="Podaj nazwę..." v-model="newGroup">
          <button id="groupadd_submit" type="submit" class="btn btn-success" @click="addGroup()">Utwórz</button>
        </div>
      </div>
      <div class="col-6 users-dropdown">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="usersDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Użytkownicy
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="usersDropdown">
            <a class="dropdown-item" type="button">
              {{ this.projectOwner }} (właściciel)
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" type="button" v-for="user in this.projectUsers">
              <div v-bind:class="{activeUser: user === userName}"> {{ user }} <i v-if="userName === projectOwner" class="fa fa-times user-delete" @click="deleteUser(user)"></i> </div>
            </a>
            <div v-if="userName === projectOwner">
              <div class="dropdown-divider"></div>
              <input class="form-control add-user" placeholder="Dodaj użytkownika..." v-model="newUserName" v-on:keyup.enter="addUser()">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Group v-for="group in this.itemGroups" :key="group.id" :group="group" />
    </div>
  </div>

</template>

<script>
import Group from './Group.vue'

export default {
  components: {
    Group
  },
  data () {
    return {
      newGroupAdd: false,
      newGroup: "",
      newUserName: ""
    }
  },
  computed: {
    itemGroups () {
      return this.$store.getters.groups
    },
    projectUsers () {
      return this.$store.getters.users
    },
    projectOwner () {
      return this.$store.getters.owner
    },
    userName () {
      return this.$store.getters.userName
    },
    projectName () {
      return this.$store.getters.name
    }
  },
  mounted(){
    this.$store.dispatch("fetchProject");
  },
  methods: {
    addGroup: function() {
      let newGroupName = this.newGroup && this.newGroup.trim();
      if (!newGroupName) {
        return
      }
      this.$store.dispatch("addGroup", newGroupName);

      this.newGroup = "";
      this.newGroupAdd = false;
    },
    addUser: function () {
      this.$store.dispatch("addUser", this.newUserName);
      this.newUserName = "";
    },
    deleteUser: function (userName) {
      this.$store.dispatch("deleteUser", userName);
    }
  }
}

</script>

<style>

.top-pane {
  margin-bottom: 15px;
}

.users-dropdown .dropdown{
  float: right;
}

.dropdown-menu .activeUser{
  font-weight: bold;
}

.add-user {
  width: 90%;
  line-height: 1;
  margin: 5px auto 0;
}

.top-pane .dropdown-menu {
  min-width: 15rem;
}

.top-pane .dropdown-menu button:active:focus {
  color: #16181b;
  background-color: #f8f9fa;
}

.top-pane .dropdown-menu a:active {
  color: #16181b;
  background-color: #f8f9fa;
}

.user-delete{
  cursor: pointer;
}

.project-name h3 {
  margin: 0 0 15px 15px;
}

</style>
