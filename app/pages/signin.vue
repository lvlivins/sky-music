<script setup>
definePageMeta({
  layout: false
});

useHead({
  title: "Вход | Skypro.Music",
  meta: [{ name: "description", content: "Войдите в Skypro.Music" }],
});
</script>

<template>
  <div class="auth-page">
    <AuthForm :is-registration="false" />
  </div>
</template>
