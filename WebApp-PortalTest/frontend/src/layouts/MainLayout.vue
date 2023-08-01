<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) The Footer -->
    <q-footer>
      <q-tabs switch-indicator>
        <q-route-tab
          icon="dashboard"
          to="/"
          replace
          label="Dashboard"
        />
        <q-route-tab
          icon="person"
          to="/profile"
          replace
          label="Profile"
        />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter();
    onMounted(() => {
      const accessToken = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = accessToken;
      axios.get('http://localhost:3030/users').then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
        localStorage.removeItem('accessToken');
        router.push('/login');
      });
      console.log('IndexPage mounted');
    });
    return {}
  }
})
</script>
