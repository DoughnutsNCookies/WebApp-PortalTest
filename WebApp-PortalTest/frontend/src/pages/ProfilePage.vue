<template>
  <q-page padding class="q-gutter-md">
    <q-btn label="Logout" @click="logout"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'ProfilePage',
  setup() {
    const router = useRouter();
    
    const logout = () => {
      localStorage.removeItem('accessToken');
      router.push('/login');
    }
    return { logout }
  }
})
</script>
