<template>
  <div class="wrapper">
    <div class="container-enter">
      <div class="modal__block">
        <form class="modal__form-login" @submit.prevent="handleSubmit">
          <NuxtLink to="/">
            <div class="modal__logo">
              <NuxtImg
                src="/img/logo_modal.png"
                alt="логотип Skypro Music"
                :placeholder="[5]"
                loading="eager"
                quality="90"
                format="webp"
                preload
              />
          </div>
          </NuxtLink>

          <input
            v-model="email"
            class="modal__input login"
            :class="{ 'input-error': emailError }"
            type="text"
            name="login"
            :placeholder="emailError || 'Почта'"
            @focus="emailError = ''"
          />

          <input
            v-model="password"
            class="modal__input password-first"
            :class="{ 'input-error': passwordError }"
            type="password"
            name="password"
            :placeholder="passwordError || 'Пароль'"
            @focus="passwordError = ''"
          />

          <input
            v-if="isRegistration"
            v-model="confirmPassword"
            class="modal__input password-double"
            type="password"
            name="password"
            placeholder="Повторите пароль"
          />

          <button type="submit" class="modal__btn-enter">
            <a>{{ isRegistration ? "Зарегистрироваться" : "Войти" }}</a>
          </button>

          <NuxtLink
            :to="isRegistration ? '/signin' : '/signup'"
            class="modal__btn-signup"
          >
            {{ isRegistration ? "Войти" : "Зарегистрироваться" }}
          </NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isRegistration: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const emailError = ref("");
const passwordError = ref("");

const handleSubmit = async () => {
  emailError.value = "";
  passwordError.value = "";

  if (!email.value.trim()) {
    emailError.value = "Введите логин";
  } else if (!email.value.includes("@")) {
    email.value = "";
    emailError.value = "Логин введён неверно";
  }

  if (!password.value.trim()) {
    passwordError.value = "Введите пароль";
  }

  if (emailError.value || passwordError.value) {
    return;
  }

  if (props.isRegistration && password.value !== confirmPassword.value) {
    alert("Пароли не совпадают");
    return;
  }

  emit("submit", { email: email.value, password: password.value });
};
</script>

<style scoped>
.modal__input {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  outline: none;
}

.input-error::placeholder {
  color: #ff4d4f;
}

.input-error {
  border-bottom-color: #ff4d4f;
}

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

a,
a:visited {
  text-decoration: none;
  font-family: "StratosSkyeng", sans-serif;
  cursor: pointer;
}

button,
._btn {
  cursor: pointer;
}

ul li {
  list-style: none;
}

@font-face {
  font-family: "StratosSkyeng";
  src: local("StratosSkyeng"), local("StratosSkyeng"),
  url("../fonts/StratosSkyeng.woff2") format("woff2"),
  url("../fonts/StratosSkyeng.woff") format("woff"),
  url("../fonts/StratosSkyeng.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: "StratosSkyeng", sans-serif;
}

.wrapper {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}

.container-enter {
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.85);
}

.modal__btn-enter:hover {
  background-color: #3f007d;
}

.modal__btn-signup:hover {
  background-color: #f4f5f6;
}

.modal__btn-enter:active {
  background-color: #271a58;
}

.modal__btn-signup:active {
  background-color: #d9d9d9;
}

.modal__block {
  position: absolute;
  z-index: 2;
  left: calc(50% - (366px / 2));
  top: calc(50% - (439px / 2));
  opacity: 1;
}

.modal__form-login {
  width: 366px;
  height: 439px;
  background-color: #ffffff;
  border-radius: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 43px 47px 47px 40px;
}

.modal__form-login input:first-child {
  margin-bottom: 30px;
}

.modal__logo {
  width: 140px;
  height: 21px;
  margin-bottom: 34px;
  background-color: transparent;
}

.modal__logo img {
  width: 140px;
  height: auto;
}

.modal__input {
  width: 100%;
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 8px 1px;
}

.modal__input::-webkit-input-placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__input:-ms-input-placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__input::-ms-input-placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__input::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
}

.modal__btn-enter {
  width: 278px;
  height: 52px;
  background-color: #580ea2;
  border-radius: 6px;
  margin-top: 60px;
  margin-bottom: 20px;
  border: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.modal__btn-enter a {
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #ffffff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.modal__btn-signup {
  width: 278px;
  height: 52px;
  background-color: transparent;
  border: 1px solid #d0cece;
  border-radius: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #000000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.modal__btn-signup a {
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #000000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.login {
  margin-bottom: 30px;
}

</style>
