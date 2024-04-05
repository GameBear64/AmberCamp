import { createPortal } from 'react-dom';

export default function Modal() {
  return createPortal(
    <div
    class="z-100 absolute right-0 top-0 flex h-screen w-screen flex-col items-center justify-center bg-slate-500/40"
    @click.self="() => {  
      if (props.easyClose) props.close()
    }"
  >
    <div
      class="w-2/3 min-w-[20em] max-w-[80vw] rounded-lg bg-base px-4 py-3 text-onBase md:w-1/2 lg:max-w-[60vw] xl:w-1/3"
      :class="props.class"
    >
      <div
        class="flex justify-between pb-1"
        :class="{'border-b-2 border-primary': close}"
      >
        <p class="text-xl font-bold">
          {{ props.title }}
        </p>
        <button
          v-if="close"
          @click="props.close"
        >
          <Icon icon="close" />
        </button>
      </div>
      <div class="max-h-[80vh] overflow-auto py-2">
        <slot />
      </div>
      <div
        v-if="slots.buttons"
        class="flex justify-end pt-4"
      >
        <slot name="buttons" />
      </div>
    </div>
  </div>,
    document.body
  )
}
