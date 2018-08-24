<template>

  <a class="list-group-item list-group-item-action align-items-start" v-bind:class="{ 'list-group-item-success': isChecked, 'draggable-item': !displayItemEditForm }">
    <div v-if="!displayItemEditForm">
      <div @click="editItem()">
        {{ item.text }}
      </div>
      <div class="d-flex align-self-start">
        <i class="fa fa-trash icon item-trash" @click="deleteItem()"></i>
        <i v-if="item.status === 'done'" class="fa fa-check-square-o icon item-check" @click="changeStatus()"></i>
        <i v-if="item.status === 'todo'" class="fa fa-square-o icon item-check" @click="changeStatus()"></i>
      </div>
    </div>
    <div v-if="displayItemEditForm">
      <textarea class="form-control" v-model="newItemText"></textarea>
      <div class="form-buttons">
        <button @click="updateItem()" type="button" class="btn btn-outline-success btn-sm">Zapisz</button>
        <button @click="cancelEdit()" type="button" class="btn btn-outline-danger btn-sm">Anuluj</button>
      </div>
    </div>
  </a>

</template>

<script>

export default {
  props: {
    item: {
      type: Object,
    }
  },
  data () {
    return {
      displayItemEditForm: false,
      newItemText: this.item.text,
    }
  },
  computed: {
    isChecked: function () {
      if(this.item.status === "done"){
        return true;
      }
      else return false;
    }
  },
  methods: {
    deleteItem: function () {
      let r = confirm("Czy na pewno chcesz usunąć zadanie?");
      if (r === true) {
        this.$store.dispatch("deleteItem", this.item.id);
      }
    },
    editItem: function () {
      this.displayItemEditForm = true;
    },
    updateItem: function () {
      if(this.item.text !== this.newItemText) {
        this.$store.dispatch("updateItem", {
          id: this.item.id,
          text: this.newItemText
        });
      }
      this.displayItemEditForm = false;
    },
    changeStatus: function () {
      let newStatus = "";
      if(this.item.status === "done") newStatus = "todo";
      else newStatus = "done";
      this.$store.dispatch("updateItem", {
        id: this.item.id,
        status: newStatus
      });
    },
    cancelEdit: function () {
      this.displayItemEditForm = false;
      this.newItemText = this.item.text;
    }
  }
}

</script>

<style>

.list-group-item {
  padding: .75rem 1rem;
}

.icon{
  display: none;
  position: absolute;
  z-index: 1;
  opacity: 0.7;
  cursor: pointer;
}

.item-trash{
  top: 7px;
  right: 7px;
}

.item-check{
  top: 8px;
  right: 25px;
}

.list-group-item:hover .icon{
  display : block;
}

.form-buttons {
  margin-top: 5px;
}

</style>
