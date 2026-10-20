<template>
  <Teleport to="body">
    <Transition name="notification">
      <div v-if="show" class="notification" :class="type">
        {{ message }}
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "error",
    validator: (value) => ["error", "happy", "info"].includes(value),
  },
});
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification.error {
  background-color: #ff4d4f;
}

.notification.happy {
  background-color: #52c41a;
}

.notification.info {
  background-color: #1890ff;
}
</style>