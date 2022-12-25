<script setup>
import TaskVue from "./Task.vue";

const props = defineProps({
  todos: {
    default: [],
    type: Array,
  },
});
const emit = defineEmits(["update", "remove", "toggleComplete"]);

function handleSave(data) {
  emit("update", data);
}

function handleDone(data) {
  emit("toggleComplete", data);
}

function handleRemove(id) {
  emit("remove", id);
}
</script>

<template>
  <section class="flex flex-col w-full max-w-[500px] gap-4">
    <h2 class="text-xl font-bold text-center">Your To Do List</h2>
    <ul v-if="props.todos.length > 0" class="flex flex-col gap-2">
      <TaskVue
        v-for="todo in todos"
        :key="todo.id"
        :item="todo.item"
        :id="todo.id"
        :completed="todo.completed"
        @done="handleDone"
        @save="handleSave"
        @remove="handleRemove"
      />
    </ul>
    <p v-else class="text-center">Nothing to show here</p>
  </section>
</template>
