<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <h1>Login</h1>
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
          <q-btn type="submit" color="primary" class="q-mt-md" label="Login"/>
          <q-btn @click="changeToSignup" flat rounded color="primary" label="don't have an account?" class="q-mt-md"/>
        </q-row>
      </q-form>
    </div>
  </q-page>
</template>

<script>
  import axios from 'axios'
  import { defineComponent, ref  } from 'vue'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'LoginPage',
    setup(){
      const email = ref('')
      const password = ref('')
      const router = useRouter();

      const login = async () => {
        try {
          const url = 'http://localhost:3030/authentication'; // Replace with your API endpoint
          const dataToSend = {
            email: email.value,
          	password: password.value
          };

          const response = await axios.post(url, dataToSend);

          if (response.status === 200) {
            router.push('/');
            console.log('Success:', response.data);
          }
          // Handle the response from the server
          console.log('Response:', response.data);
        } catch (error) {
          // Handle errors here
          console.error('Error:', error.message);
        }
      }
      const changeToSignup = () => {
        router.push('/signup');
      }
      return { email, password, login, changeToSignup}
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