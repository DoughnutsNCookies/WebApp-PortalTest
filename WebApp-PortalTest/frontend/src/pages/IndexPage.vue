<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md flex justify-center">
      <div style="width: 80vw;">
        <q-list bordered separator

          v-for="index in 60"
          :key="index"
        >
          <q-item clickable v-ripple
            :to="'/member/' + index"
          >
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption {{ index }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent,onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter();
    onMounted(() => {
      if (!localStorage.getItem('accessToken')) {
        router.push('/login');
      }
      console.log('IndexPage mounted');
    });
    return {};
  },
});
</script>
