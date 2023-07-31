<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md flex justify-center">
      <div style="width: 80vw;">
        <q-intersection
          v-for="index in 60"
          :key="index"
          transition="flip-right"
          class="example-item"
        >
          <q-item clickable>
            <q-item-section>
              <q-item-label>Contact #{{ index }}</q-item-label>
              <q-item-label caption lines="1">some@email.com</q-item-label>
            </q-item-section>
          </q-item>
        </q-intersection>
      </div>
  </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>
