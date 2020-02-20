<template>
  <div class="create_todo_list">
    <div 
      class="create_todo_list__plus"
      @click="createList"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "CreateTodoList",
  methods: {
    ...mapMutations({
      ADD_LIST: "ADD_LIST"
    }),

    createList() {
      const payload = {
        name: "Новый список",
        todos: []
      }
      this.ADD_LIST(payload);
    }
  }
}
</script>

<style lang="scss">
.create_todo_list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  height: 170px;
  border-radius: 20px;
  background: rgba(255, 255, 255, .2);

  &__plus {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background: #fff;
    opacity: .2;
    transition: all .4s .2s, transform .4s;
    cursor: pointer;

    &::before, &::after {
      content: '';
      position: absolute;
      display: block;
      width: 4px;
      height: 25px;
      background: #d1d1d1;
    }

    &::after {
      transform: rotate(90deg);
    }

    &:hover {
      opacity: .6;
      transform: rotate(90deg);
      transition: all .4s, transform .4s .4s;
    }
  }
}
</style>