<script setup>
import { defineProps, defineEmits, ref } from "vue";
import InputTextVue from "./InputText.vue";

const props = defineProps({
  completed: Boolean,
  item: String,
  id: Number,
});

const emit = defineEmits(["save", "remove", "done"]);

const readonly = ref(true);

const model = ref(props.item);

const isCompleted = ref(props.completed);

function handleClickEdit() {
  readonly.value = !readonly.value;
}

function handleClickSave(id) {
  emit("save", { id, item: model.value });
  handleClickEdit();
}

function handleClickRemove(id) {
  emit("remove", id);
}

function handleChangeTask(id) {
  isCompleted.value = !isCompleted.value;
  emit("done", { id, completed: isCompleted.value });
}
</script>

<template>
  <li
    class="inline-flex border rounded-lg group"
    :class="{
      'px-5 py-3 bg-white border-gray-400 hover:border-sky-600 hover:bg-sky-600 hover:text-white':
        readonly,
      'border-transparent': !readonly,
    }"
  >
    <div
      v-if="!readonly"
      class="relative inline-flex w-full overflow-hidden rounded-lg"
    >
      <InputTextVue :id="props.item" v-model:value="model" />
      <button
        @click="handleClickSave(props.id)"
        title="Save"
        class="absolute right-0 flex items-center justify-center w-10 h-full text-lg text-white -translate-y-1/2 rounded-sm top-1/2 bg-sky-600 hover:bg-sky-700"
      >
        &check;
      </button>
    </div>
    <div v-else class="inline-flex items-center w-full gap-2">
      <div class="inline-flex">
        <input
          class="accent-sky-600 group-hover:accent-white"
          :checked="isCompleted"
          type="checkbox"
          name="checkbox"
          :id="`checkbox-${props.item}`"
          @change="handleChangeTask(props.id)"
        />
      </div>
      <div class="inline-flex grow" :class="{ 'line-through': isCompleted }">
        <label :for="`checkbox-${props.item}`">{{ props.item }}</label>
      </div>
      <div class="hidden gap-2 group-hover:inline-flex">
        <button
          @click="handleClickEdit"
          class="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Edit
        </button>
        <button
          @click="handleClickRemove(props.id)"
          class="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  </li>
</template>
