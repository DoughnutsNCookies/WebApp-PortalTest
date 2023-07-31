<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <h1>Signup</h1>
      <q-form @submit="login">
        <div class="q-gutter-md">
          <q-input
            outlined
            v-model="email"
            label="Email"
            type="email"
          />
          <q-input
            outlined
            v-model="password"
            label="Password"
            type="password"
          />
        </div>
        <q-row class="button-row">
          <q-btn type="submit" color="primary" class="q-mt-md" label="Signup" />
          <q-btn @click="changeToLogin" flat rounded color="primary" label="already have an account?" class="q-mt-md"/>
        </q-row>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
  import { defineComponent, ref  } from 'vue'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'SignupPage',
    setup(){
      const email = ref('')
      const password = ref('')
      const router = useRouter();

      const login = () => {
        console.log('Signup with:', email.value, password.value);
      }
      const changeToLogin = () => {
        router.push('/login');
      }
      return { email, password, login, changeToLogin}
    }
  })
</script>

<style>
  .q-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .q-form {
    min-width: 300px;
  }
  .button-row{
    display: flex;
    gap: 10px;
  }
</style>