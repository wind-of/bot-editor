<template>
  <div 
      class="message"
      :id="message.id"
      :style="`top: ${message.view.top}px; left: ${message.view.left}px`"
      @click="$emit('click', $event)"
    >
    <div class="message__title-wrapper">
      <h3 class="message__title">{{ message.options.title }}</h3>
    </div>
    <div class="message__text-wrapper">
      <p class="message__text">{{ message.options.text }}</p>
    </div>
    <div class="message__type-wrapper">
      <h3 class="message__type">{{ message.type }}</h3>
    </div>
    <div class="message__state-wrapper">
      <h3 class="message__state">{{ message.state }}</h3>
    </div>
    <div class="message__buttons">
      <button 
          class="message__buttons__button" 
          v-for="(button, i) in message.options.buttons" 
          :key="'message-button_' + i + Math.random()"
        >
        {{ button.text }}
      </button>
    </div>
  </div>
</template>


<script>
export default {
  name: "CanvasMessage",
  props: {
    message: Object
  }
}
</script>


<style lang="scss">
.message {
  box-sizing: border-box;
  position: relative;
  width: 200px;

  background-color: white;
  border: 1px solid var(--light-grey);
  border-radius: 5px;

  transition: .2s ease;
  cursor: default;
  overflow: hidden;


  &:hover, &.active {
    border-color: var(--light-blue);
  }
  &:hover &__title, &.active &__title {
    color: var(--light-blue);
    border-color: var(--light-blue);
  }

  h3 {
    font-weight: 400;
    font-size: 14px;
  }
  > :not(.message__title-wrapper) {
    padding: 5px 10px;
    &:not(:last-child) {
      border-bottom: 1px solid var(--light-grey);
    }
  }
  &__title { 
    padding: 0 5px;

    font-size: 16px;
    font-weight: 400;

    border: 5px solid var(--light-grey);
    border-top: none;
    border-bottom: none;
    border-right: none;

    transition: .2s ease;

    &-wrapper {
      padding: 10px 0;
      background-color: var(--almost-white);
      border-radius: 5px;

      cursor: pointer;
    }
  }
  &__text {
    font-size: 13px;
  }
  &__buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 10px;
  }
  &__buttons__button {
    box-sizing: border-box;
    padding: 5px; 

    font-size: 12px;

    background-color: var(--almost-white);
    border-radius: 5px;
    border: 1px solid var(--light-grey);

    transition: border-color .15s; 
    &:hover {
      border-color: var(--light-blue);
    }
  }
}
</style>