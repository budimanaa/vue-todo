<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  id: String,
  value: String,
  placeholder: String,
  readonly: Boolean,
});

const emit = defineEmits(["update:value"]);

const model = computed({
  get() {
    return props.value;
  },
  set(value) {
    return emit("update:value", value);
  },
});
</script>

<template>
  <input
    class="w-full px-4 py-2 border border-gray-500 rounded-lg outline-sky-600 focus:border-sky-600 caret-sky-600 placeholder:text-gray-400"
    type="text"
    name="input-text"
    :id="`inputText-${props.id}`"
    v-model="model"
    autocomplete="off"
    :placeholder="props.placeholder"
  />
</template>
