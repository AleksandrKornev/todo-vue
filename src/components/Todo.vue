<template>
  <div class="todo">
    <div 
      class="todo__checkbox"
      :class="{ active: isActive, home_route: isHome  }"
      @click="toggle"
    />
    <div 
      class="todo__name"
      :class="{ active: isActive }"
      tabindex="0"
      @focus="focusName"
    >
      <template v-if="!isFocus">
        <span class="todo__name__text">{{ newName }}</span>
        <span class="todo__name__line"/>
      </template>
      <template>
        <textarea 
          class="todo__name__input"
          :class="{ active: isFocus }"
          ref="input"
          v-model="newName"
          @input="heightTextarea"
        />
      </template>
    </div>
    <div 
      v-if="isFocus && !isHome"
      class="todo__actions"
    >
      <div 
        class="todo__actions__action"
        @click="edit"
      >
        <img 
          class="todo__actions__action__img"
          src="@/assets/images/ok.png"
        />
      </div>
      <div 
        class="todo__actions__action"
        @click="cancel"
      >
        <img 
          class="todo__actions__action__img"
          src="@/assets/images/cancel.png"
        />
      </div>
      <div 
        class="todo__actions__action"
        @click="removeTodo"
      >
        <img 
          class="todo__actions__action__img"
          src="@/assets/images/delete.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    isActive: {
      type: Boolean
    },
    name: {
      type: String
    },
    indexTodo: {
      type: Number
    },
    isHome: {
      type: Boolean
    }
  },
  data() {
    return {
      newName: null,
      isFocus: null
    }
  },
  watch: {
    name(val) {
      this.newName = val;
      this.isFocus = false;
    }
  },
  created() {
    this.newName = this.name;
  },
  methods: {
    toggle() {
      if (this.isHome) return;
      this.$emit("toggle", this.indexTodo);
    },

    focusName() {
      if (this.isHome) return;
      this.isFocus = true;
      this.$refs.input.focus();
      this.heightTextarea();
    },

    blurName() {
      this.isFocus = false;
      this.heightTextarea();
    },

    heightTextarea() {
      if (!this.isFocus) {
        requestAnimationFrame(() => {
          this.$refs.input.style.height = 0;
        })
      } else {
        requestAnimationFrame(() => {
          this.$refs.input.style.height = this.$refs.input.scrollHeight + 'px';
        })
      }
    },

    edit() {
      const payload = {
        name: this.newName,
        indexTodo: this.indexTodo
      };
      this.$emit("edit", payload);
      this.isFocus = false;
    },

    cancel() {
      this.newName = this.name;
      this.isFocus = false;
    },

    removeTodo() {
      const payload = {
        indexTodo: this.indexTodo
      };
      this.isFocus = false;
      this.$emit("remove", payload);
    }
  }
}
</script>

<style lang="scss">
.todo {
  display: flex;
  padding: 10px;

  &__checkbox {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    margin-right: 15px;
    border: 2px solid #4265a5;
    box-sizing: border-box;
    border-radius: 6px;
    background: #fff;
    transition: .4s .2s;
    overflow: hidden;

    &::before, &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      background: #6a98ee;
      transition: .4s;
    }

    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }

    &:not(.home_route):hover {
      &::before, &::after {
        width: 16px;
        height: 2px;
      }
    }

    &.active {
      &::before, &::after {
        width: 16px;
        height: 2px;

        animation-name: increase;
        animation-duration: .6s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }
    }
  }

  &__name {
    position: relative;
    align-self: baseline;
    width: calc(100% - 82px);
    border-bottom: 1px solid #000;
    text-align: left;
    word-break: break-all;

    &:focus {
      outline: none;
    }

    &__text {
      display: inline-block;
      min-height: 16px;
      padding-bottom: 5px;  
    }

    &__line {
      position: absolute;
      left: 0;
      top: 40%;
      background: #000;
      width: 0;
      height: 1px;
      transition: width .4s;
    }

    &.active & {
      &__line {
        width: 100%;
        height: 1px;
      }
    }

    &__input {
      width: 0;
      height: 20px;
      padding: 0;
      border: 0;
      font-size: 16px;
      outline: none;
      resize: none;

      &.active {
        width: 100%;
        border: none;
        box-sizing: border-box;
      }
    }
  }

  &__actions {
    padding-left: 10px;

    &__action {
      width: 30px;
      cursor: pointer;

      &__img {
        width: 100%;
      }
    }
  }
}

@keyframes increase {
  0% {
    width: 16px;
    height: 2px;
  }

  50% {
    width: 24px;
    height: 2px;
  }

  100% {
    width: 34px;
    height: 34px;
  }
}
</style>