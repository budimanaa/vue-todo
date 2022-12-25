<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  id: String,
  options: Array,
  value: String,
  placeholder: String,
  defaultValue: String,
});

const emit = defineEmits(["update:value"]);

const model = computed({
  get() {
    return props.value || props.defaultValue;
  },
  set(value) {
    return emit("update:value", value);
  },
});
</script>

<template>
  <select
    class="w-full p-2 border border-gray-500 rounded-lg outline-sky-600 focus:border-sky-600"
    name="input-select"
    :id="`inputSelect-${props.id}`"
    v-model="model"
  >
    <option
      v-for="(option, index) in props.options"
      :key="index"
      :value="option"
      :selected="option === props.value || option === props.defaultValue"
    >
      {{ option }}
    </option>
  </select>
</template>
