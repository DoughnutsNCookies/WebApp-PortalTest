<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md flex justify-center">
      <div style="width: 80vw;">
        <q-list bordered separator

          v-for="member in members"
          :key="member._id"
        >
          <q-item clickable v-ripple
            :to="'/member/' + member._id"
          >
            <q-item-section>
              <q-item-label overline>{{ member.fullName }}</q-item-label>
              <q-item-label>{{ member.email }}</q-item-label>
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
import { defineComponent, onMounted, ref,onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter();

    const members = ref([]);
    const createMember = () => {
      router.push('/create-member');
      console.log('createMember');
    }

    const scrollEvent = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          axios.get('http://localhost:3030/form/?$limit=20&$skip=' + members.value.length)
            .then((response) => {
              console.log(response);
              members.value = members.value.concat(response.data.data);
            })
            .catch((error) => {
              console.log(error);
            })
        }
    }

    onMounted(() => {
      const accessToken = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = accessToken;
      axios.get('http://localhost:3030/form/?$limit=20&$skip=0')
        .then((response) => {
          console.log(response);
          members.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        })
      setTimeout(() => {
        window.addEventListener('scroll', scrollEvent)
      }, 10);
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scrollEvent)
    })
    return { createMember, members }
  }
});
</script>
