<script setup>
import { computed } from "vue";
import InputTextVue from "./InputText.vue";

const props = defineProps({
  value: String,
});
const emit = defineEmits(["update:value", "submitTodo"]);
const model = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("update:value", value);
  },
});

function handleSubmit(item) {
  if (!item) return;
  emit("submitTodo", item);
  model.value = "";
}
</script>

<template>
  <section class="flex flex-col w-full max-w-[500px] gap-4">
    <h2 class="text-xl font-bold text-center">Add Something To Do</h2>
    <form class="flex flex-col gap-2" @submit.prevent="handleSubmit(model)">
      <InputTextVue
        id="todo"
        v-model:value="model"
        placeholder="Write your task here"
      />
      <button
        class="px-4 py-2 font-medium text-white rounded-lg bg-sky-600 hover:bg-sky-800"
        type="submit"
      >
        Add to List
      </button>
    </form>
  </section>
</template>
