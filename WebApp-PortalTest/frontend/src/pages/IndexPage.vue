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
      <q-btn color="primary" @click="createMember" icon="add" 
        label="Add new Member" 
        rounded
        style="position: fixed; bottom: 100px; right: 20px;" 
      />
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter();
    const createMember = () => {
      router.push('/create-member');
      console.log('createMember');
    }
    return { createMember }
  }
});
</script>
