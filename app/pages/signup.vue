<script setup>
definePageMeta({
  layout: false,
});

useHead({
  title: "Регистрация | Skypro.Music",
  meta: [{ name: "description", content: "Зарегистрируйтесь в Skypro.Music" }],
});
</script>

<template>
  <AuthForm :is-registration="true" />
</template>