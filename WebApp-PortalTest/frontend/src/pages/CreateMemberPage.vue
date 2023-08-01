<template>
  <q-page padding class="q-gutter-md">
      <h4 class="q-h6">Add New Member</h4>
      <q-form @submit="addNewMember">
        <div class="q-gutter-md">
          <q-input
            autofocus
            outlined
            v-model="fullName"
            label="Full Name"
            type="text"
          />
          <q-input
            outlined
            v-model="telephone"
            label="phone number"
            type="number"
          />
          <q-input
            outlined
            v-model="dateOfBirth"
            label="Date of Birth"
            type="date"
          />
          <q-input
            outlined
            v-model="email"
            label="Email"
            type="email"
          />
          <div class="q-gutter-sm">
            <q-radio v-model="gender" val="male" label="Male" />
            <q-radio v-model="gender" val="female" label="Female" />
          </div>
          <q-input
            outlined
            v-model="nationality"
            label="Nationality"
            type="text"
          />
          <q-input
            outlined
            v-model="religion"
            label="Religion"
            type="text"
          />
          <q-input
            outlined
            v-model="occupation"
            label="Occupation"
            type=""
          />
          <q-input
            outlined
            v-model="address"
            label="Address"
            type="textarea"
          />
          <q-input
            outlined
            v-model="nameOfCompany"
            label="Name of Company"
            type="text"
          />
          <q-select outlined v-model="monthlyContribution" :options="contributionOptions" label="Outlined" />
          <q-input
            outlined
            v-model="share"
            label="Shares"
            type="number"
          />
          <q-input
            outlined
            v-model="bankAccountNumber"
            label="Bank Account Number"
            type="number"
          />
          <q-input
            outlined
            v-model="bankName"
            label="Bank Name"
            type="text"
          />
          <q-select outlined v-model="authorityLevel" :options="authorityOptions" label="Outlined" />
          <div class="column" style="display: grid; justify-content: center;gap: 18px;">
            <VueSignaturePad
            style="border: 1px solid black;"
            ref="signaturePad"
            v-model="signature"
            class="signature-pad"
            width="300px"
            height="200px"
            :options="{
              penColor: 'rgb(0, 0, 0)',
            }"
            />
            <q-input
              outlined
              v-model="date"
              label="Date"
              type="date"
            />
          </div>
        </div>
        <q-btn type="submit" color="primary" class="q-mt-md" label="Add"/>
      </q-form>
  </q-page>
</template>

<script >
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { VueSignaturePad } from 'vue-signature-pad';

export default defineComponent({
  name: 'CreateMemberPage',
  components: {
    VueSignaturePad
  },
  setup() {
    const fullName = ref('')
    const telephone = ref('')
    const dateOfBirth = ref('')
    const email = ref('')
    const gender = ref('')
    const nationality = ref('');
    const religion = ref('');
    const occupation = ref('');
    const address = ref('');
    const nameOfCompany = ref('');
    const monthlyContribution = ref('');
    const share = ref(0);
    const bankAccountNumber = ref('');
    const bankName = ref('');
    const signature = ref(null);
    const date = ref('');
    const authorityLevel = ref('');

    const contributionOptions=[
      "RM 30",
      "RM 50",
      "RM 100",
      "others",
    ]
    const authorityOptions=[
      "Admin",
      "Member",
      "Senior Member"
    ]

    const addNewMember = async ()=>{
      const accessToken = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = accessToken;
      const dataToSend ={
        fullName : fullName.value,
        telephone : telephone.value,
        dateOfBirth : dateOfBirth.value,
        email : email.value,
        gender : gender.value,
        nationality : nationality.value,
        religion : religion.value,
        occupation : occupation.value,
        address : address.value,
        companyName : nameOfCompany.value,
        monthlyContribution : monthlyContribution.value,
        shares : share.value,
        bankAccountNumber : bankAccountNumber.value,
        bankName : bankName.value,
        authorityLevel : authorityLevel.value,
      }
      axios.post('http://localhost:3030/form', dataToSend).then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          router.push('/');
        } else if (response.status > 400) {
          console.log(response.data);
          router.push('/login');
        }
      }).catch((error) => {
        console.log(error);
        localStorage.removeItem('accessToken');
        router.push('/login');
      });
      return;
    }

    return {
      authorityOptions,
      contributionOptions,
      addNewMember,
      fullName,
      telephone,
      dateOfBirth,
      email,
      gender,
      nationality,
      religion,
      occupation,
      address,
      nameOfCompany,
      monthlyContribution,
      share,
      bankAccountNumber,
      bankName,
      signature,
      date,
      authorityLevel,
    }
  }
})
</script>
