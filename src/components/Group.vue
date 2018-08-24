<template>

  <div class="col-12 col-md-6 col-xl-3">
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div v-if="!displayGroupEditForm" class="p-2 h5">{{ group.name }}</div>
          <div v-if="displayGroupEditForm">
            <input class="form-control rename-group" v-model="newGroupName" v-on:keyup.enter="updateGroupName()">
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button class="dropdown-item" type="button" @click="renameGroup()">Zmień nazwę</button>
              <button class="dropdown-item" type="button" @click="deleteGroup(group.id)">Usuń</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-block">
        <draggable class="dragArea" v-model="group.items" :options="{group:'items', draggable:'.draggable-item', ghostClass: 'draggable-ghost'}" @end="onEnd" :id="this.group.id">
          <GroupItem v-for="item in group.items" :item="item" :id="item.id"/>
        </draggable>
        <div class="card-footer">
          <textarea class="form-control" v-bind:id="group.id" placeholder="Dodaj zadanie..." v-model="newItem[group.id]"></textarea>
          <div class="d-flex justify-content-between add-item-panel">
            <button type="submit" class="btn btn-success" @click="addItem(group.id)">Dodaj</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import GroupItem from './GroupItem.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    GroupItem,
    draggable
  },
  props: {
    group: {
      type: Object,
    }
  },
  data () {
    return {
      newItem: [],
      displayGroupEditForm: false,
      newGroupName: this.group.name
    }
  },
  methods: {
    addItem: function(groupId) {
      let value = this.newItem[groupId] && this.newItem[groupId].trim();
      if (!value) {
        return
      }
      this.$store.dispatch("addItem", {
        group: groupId,
        text: value
      });
      this.newItem = [];
    },
    deleteGroup: function(groupId){
      let r = confirm("Czy na pewno chcesz usunąć grupę?");
      if (r === true) {
        this.$store.dispatch("deleteGroup", groupId);
      }
    },
    renameGroup: function() {
      this.displayGroupEditForm = true;
    },
    updateGroupName: function() {
      if(this.group.name !== this.newGroupName) {
        this.$store.dispatch("updateGroup", {
          id: this.group.id,
          name: this.newGroupName
        });
      }
      this.displayGroupEditForm = false;
    },
    onEnd: function(evt) {
      if(evt.oldIndex !== evt.newIndex || evt.from.id !== evt.to.id){
        this.$store.dispatch("updateItem", {
          id: evt.clone.id,
          group: evt.to.id,
          order: evt.newIndex
        })
      }
    }
  }
}

</script>

<style>

.add-item-panel {
  margin-top: 7px;
}

.card-header .h5 {
  margin-bottom: 0;
}

.card {
  margin-bottom: 50px;
}

.rename-group {
  width: 90%;
}

.card .dropdown-menu button:active:focus {
  color: #16181b;
  background-color: #f8f9fa;
}

.dragArea {
  min-height: 15px;
}

.draggable-ghost {
  opacity: .5;
  background: #e9ecef;
}

</style>
