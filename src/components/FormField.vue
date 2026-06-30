<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
  error?: string
}>()
</script>

<template>
  <div class="form-field">
    <label class="field-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <div class="field-input">
      <slot></slot>
    </div>
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>

<style scoped>
.form-field {
  margin-bottom: 18px;
}

.field-label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
}

.required {
  color: #e8689c;
  margin-left: 2px;
}

.field-error {
  font-size: 12px;
  color: #e8689c;
  margin-top: 4px;
}
</style>
