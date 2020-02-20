<template>
  <div class="home">
    <Back/>
    <TodoLists
      class="home__todo_lists"
      :todoLists="[currentList]"
      :isSingleList="true"
      :indexSingleList="currentListIndex"
    />
    <ModalConfirm/>
  </div>
</template>

<script>
import { mapState } from "vuex";

import TodoLists from "@/components/TodoLists";
import ModalConfirm from "@/components/ModalConfirm";
import Back from "@/components/Back";

export default {
  name: 'ByTodoList',
  components: {
    TodoLists,
    ModalConfirm,
    Back
  },
  computed: {
    ...mapState({
      todoLists: state => state.todoLists
    }),

    currentList() {
      const indexRoute = this.$route.params.index;
      if (typeof indexRoute !== "number" && indexRoute < 0) return [];
      
      return this.todoLists[indexRoute];
    },

    currentListIndex() {
      const indexRoute = this.$route.params.index;
      return +indexRoute;
    }
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