<script setup>
import Notification from "~/components/common/Notification.vue";

definePageMeta({ layout: false });

useHead({
  title: "Вход | Skypro.Music",
  meta: [{ name: "description", content: "Войдите в Skypro.Music" }],
});

const show = ref(false);
const message = ref("");
const type = ref("success");

const handleLogin = () => {
  message.value = "Вы успешно вошли";
  type.value = "success";
  show.value = true;

  setTimeout(() => {
    show.value = false;
    navigateTo("/");
  }, 1500);
};
</script>

<template>
  <div class="auth-page">
    <AuthForm :is-registration="false" @submit="handleLogin" />
    <Notification :show="show" :message="message" :type="type" />
  </div>
</template>
