<template>
  <div 
    class="modal_confirm__wrapper"
    :class="{ active: isActive }"
  >
    <div class="modal_confirm">
      <p class="modal_confirm__text">Вы уверены?</p>
      <div class="modal_confirm__actions">
        <div 
          class="modal_confirm__actions__action ok"
          @click="confirm"
        >Ok</div>
        <div 
          class="modal_confirm__actions__action cancel"
          @click="cancel"
        >Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";

export default {
  name: "ModalConfirm",
  data() {
    return {
      isActive: null,
      payload: null
    }
  },
  created() {
    eventBus.$on("modalShow", this.show);
    eventBus.$on("modalHide", this.hide);
  },
  beforeDestroy() {
    eventBus.$off("modalShow", this.show);
    eventBus.$off("modalHide", this.hide);
  },
  methods: {
    show(payload) {
      this.payload = payload;
      this.isActive = true;
    },

    hide() {
      this.isActive = false;
    },

    confirm() {
      if ("ok" in this.payload) this.payload.ok();
      this.hide();
    },

    cancel() {
      if ("cancel" in this.payload) this.payload.cancel();
      this.hide();
    }
  }
}
</script>

<style lang="scss">
.modal_confirm {
  &__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .4);
    opacity: 0;
    z-index: -99;
    transition: all .4s, z-index 0s .4s;

    &.active {
      opacity: 1;
      z-index: 99;
      transition: all .4s, z-index 0s 0s;
    }
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 200px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background: #fff;

  &__text {
    font-size: 20px;
  }

  &__actions {
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;

    &__action {
      padding: 15px 20px;
      border-radius: 10px;
      color: #fff;
      cursor: pointer;
      transition: .4s;

      &.ok {
        background: #78df78;

        &:hover {
          background: #83f083;
        }
      }
      &.cancel {
        background: #e65656;

        &:hover {
          background: #f15c5c;
        }
      }
    }
  }
}
</style>