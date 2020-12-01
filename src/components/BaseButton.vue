<template>
  <button
    class="base-button py-2 px-2 text-medium"
    :class="{
      'base-button--full-width' : isFullWidth,
      'base-button--icon' : isIcon,
      'base-button--disabled' : isDisabled
    }"
    :style="{
      background: color,
      color: textColor,
      'border-color' : borderColor,
      'box-shadow' : `${noBorder ? 'none' : ''}`,
    }"
    @click="click"
  >
    {{ text }}
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class BaseButton extends Vue {
@Prop({ default: "" }) text! : string
@Prop({ default: "#1DB954" }) color! : string
@Prop({ default: "white" }) textColor! : string
@Prop({ default: "#1DB954" }) borderColor! : string

@Prop({ default: false, type: Boolean }) isFullWidth! : boolean
@Prop({ default: false, type: Boolean }) isIcon! : boolean
@Prop({ default: false, type: Boolean }) isDisabled! : boolean
@Prop({ default: false, type: Boolean }) noBorder! : boolean


@Emit("click")
click(event: Event) : Event {
  return event;
}
}
</script>

<style lang="scss">
.base-button {
  display: flex;
  outline: none;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid black;
  box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.4);
  cursor: pointer;
  &--full-width {
    display: block;
    width: 100%;
  }
  &--icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  &--disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
