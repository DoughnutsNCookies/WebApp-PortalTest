<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) The Footer -->
    <q-footer>
      <q-tabs switch-indicator>
        <q-route-tab
          icon="map"
          to="/"
          replace
          label="Dashboard"
        />
        <q-route-tab
          icon="assignment"
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
import { defineComponent} from 'vue'
export default defineComponent({
  name: 'MainLayout',
})
</script>
