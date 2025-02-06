<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const isLogin = ref<boolean>(true);
const isLoading = ref<boolean>(false);

interface userData {
  email: string;
  password: string;
}

const userData = reactive<userData>({
  email: '',
  password: '',
});

const subtitleText = computed<string>(() => {
  return isLogin.value ? 'Нет аккаунта ?' : 'Есть аккаунт?';
});

const linkAccountText = computed<string>(() => {
  return isLogin.value ? 'Зарегистрироваться' : 'Авторизоваться';
});
const submitButtonText = computed<string>(() => {
  return isLogin.value ? 'Авторизация' : 'Регистрация';
});

const toggleAuth = (): void => {
  isLogin.value = !isLogin.value;
};

const submitForm = (): void => {
  auth();
};

const auth = async (): Promise<void> => {
  try {
    if (isLogin.value) {
      await signInWithEmailAndPassword(getAuth(), userData.email, userData.password);
    } else {
      await createUserWithEmailAndPassword(getAuth(), userData.email, userData.password);
    }
    router.push('/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({ severity: 'error', summary: 'Ошибочка', detail: error.message, life: 4000 });
      console.log(error.message);
    }
  }
};

onMounted(() => {
  onAuthStateChanged(getAuth(), user => {
    if (user) {
      router.push('/');
    }
  });
});
</script>

<template>
  <app-toast position="top-right" />
  <section class="auth">
    <div class="auth-card">
      <div class="auth-card__content">
        <p class="auth-card__title">Авторизация / регистрация</p>
        <span class="auth-card__subtitle">{{ subtitleText }}</span>
        <a class="auth-card__link" @click="toggleAuth">
          {{ linkAccountText }}
        </a>
      </div>
      <form @submit.prevent="submitForm" class="auth-form">
        <label class="auth-form__label">
          Почта
          <app-input-text v-model="userData.email" type="email" class="auth-form__input" required />
        </label>
        <label class="auth-form__label">
          Пароль
          <app-input-text v-model="userData.password" type="password" class="auth-form__input" required />
        </label>
        <app-button
          :label="submitButtonText"
          type="submit"
          icon="pi pi-user"
          :loading="isLoading"
          class="w-full"
        ></app-button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  font-size: 18px;
}
.auth-card {
  padding: 24px;
  max-width: 500px;
  width: 100%;
  border: 1px solid rgba(124, 124, 124, 0.473);
  border-radius: 3px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.03), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.12);
}
.auth-card__content {
  margin-bottom: 16px;
  text-align: center;
}
.auth-card__title {
  font-weight: 500;
  font-size: 30px;
  margin-bottom: 16px;
}

.auth-card__subtitle {
  font-weight: 500;
  line-height: 1.5;
}

.auth-card__link {
  margin-left: 8px;
  color: var(--color-link);
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
}

.auth-form {
}
.auth-form__label {
  display: grid;
  gap: 5px;
  margin-bottom: 10px;
}
.auth-form__input {
  margin-bottom: 16px;
  width: 100%;
  border-radius: 4px;
}
</style>
