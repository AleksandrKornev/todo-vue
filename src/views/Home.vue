<template>
  <div class="home">
    <TodoLists
      class="home__todo_lists"
      :todoLists="todoLists"
      :isCreateList="true"
    />
    <ModalConfirm/>
  </div>
</template>

<script>
import { mapState } from "vuex";

import TodoLists from "@/components/TodoLists";
import ModalConfirm from "@/components/ModalConfirm";

export default {
  name: 'Home',
  components: {
    TodoLists,
    ModalConfirm
  },
  computed: {
    ...mapState({
      todoLists: state => state.todoLists
    })
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
</style>