<template>
    <q-page padding class="q-gutter-md column">
        <h4 class="q-h6">Member Info</h4>
        <q-form @submit="updateMemberInfo">
          <div class="q-gutter-md">
            <q-input
              autofocus
              outlined
              v-model="fullName"
              label="Full Name"
              type="text"
              :disable="!fab"
            />
            <q-input
              outlined
              v-model="telephone"
              label="phone number"
              type="number"
              :disable="!fab"
            />
            <q-input
              outlined
              v-model="dateOfBirth"
              label="Date of Birth"
              type="date"
              :disable="!fab"
            />
            <q-input
              outlined
              v-model="email"
              label="Email"
              type="email"
              :disable="!fab"
            />
            <div class="q-gutter-sm">
              <q-radio v-model="gender" val="male" label="Male" :disable="!fab"/>
              <q-radio v-model="gender" val="female" label="Female" :disable="!fab" />
            </div>
            <q-input
              outlined
              v-model="nationality"
              label="Nationality"
              type="text"
              :disable="!fab"
            />
            <q-input
              outlined
              v-model="religion"
              label="Religion"
              type="text"
              :disable="!fab"
            />
            <q-input
              outlined
              v-model="occupation"
              label="Occupation"
              type="text"
              :disable="!fab"
            />
            <q-input
              outlined
              v-model="address"
              label="Address"
              type="textarea"
              :disable="!fab"
            />
            <q-input
              outlined
              v-model="nameOfCompany"
              label="Name of Company"
              type="text"
              :disable="!fab"
            />
            <q-select outlined v-model="monthlyContribution" :options="contributionOptions" label="Monthly Contribution" :disable="!fab"/>
            <q-input
              outlined
              v-model="share"
              label="Shares"
              type="number"
              :disable="!fab"
            />
            <q-input
              outlined
              v-model="bankAccountNumber"
              label="Bank Account Number"
              type="number"
              :disable="!fab"
            />
            <q-input
              outlined
              v-model="bankName"
              label="Bank Name"
              type="text"
              :disable="!fab"
            />
            <q-select outlined v-model="authorityLevel" :options="authorityOptions" label="Authority Level" :disable="!fab"/>
            <div class="column" style="display: grid; justify-content: center;gap: 18px;">
              <VueSignaturePad
              style="border: 1px solid black;"
              ref="signaturePad"
              v-model="signature"
              class="signature-pad"
              width="300px"
              height="200px"
              :disable="!fab"
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
          <q-fab
          style="position: fixed; bottom: 100px; right: 20px;"
              v-model="fab"
              :label="fab?'cancel':'update member'"
              vertical-actions-align="right"
              :color="fab?'red':'primary'"
              icon="keyboard_arrow_up"
              direction="up"
              @hide="fabHide"
          >
              <q-fab-action type="submit" color="primary" @click="updateMemberInfo" label="Update" />
          </q-fab>
        </q-form>
    </q-page>
  </template>
  
  <script >
  import { defineComponent, ref, watch, onMounted } from 'vue';
  import axios from 'axios';
  import { VueSignaturePad } from 'vue-signature-pad';
  import { useRoute } from 'vue-router';
  
  export default defineComponent({
    name: 'UpdateMemberPage',
    components: {
      VueSignaturePad
    },
    setup() {
      const route = useRoute();

      const fab = ref(false)
      let submitting = false
      const signaturePad = ref(null)
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
      
      onMounted(() => {
        signaturePad.value.lockSignaturePad()
        const accessToken = localStorage.getItem('accessToken');
        axios.defaults.headers.common['Authorization'] = accessToken;
        axios.get('http://localhost:3030/form/'+ route.params.id)
          .then((response) => {
            console.log(response);
             
            fullName.value = response.data.fullName;
            telephone.value = response.data.telephone;
            dateOfBirth.value = response.data.dateOfBirth;
            email.value = response.data.email;
            gender.value = response.data.gender;
            nationality.value = response.data.nationality
            religion.value = response.data.religion
            occupation.value = response.data.occupation
            address.value = response.data.address
            nameOfCompany.value = response.data.companyName
            monthlyContribution.value = response.data.monthlyContribution
            share.value = response.data.shares
            bankAccountNumber.value = response.data.bankAccountNumber
            bankName.value = response.data.bankName
            signature.value = response.data.signature
            date.value = response.data.date
            authorityLevel.value = response.data.authorityLevel
          })
          .catch((error) => {
            console.log(error);
          })
      }),

      watch(fab, (val) => {
        if (val) {
          signaturePad.value.openSignaturePad()
        } else {
          signaturePad.value.lockSignaturePad()
        }
      })
  
      const fabHide = () => {
        if (!fab.value && !submitting){ 
            console.log('reset all input')
            submitting = false
            return;
        }
        submitting = false
      }

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
        return axios.patch('http://localhost:3030/form/' + route.params.id, dataToSend);
      }
      
      const updateMemberInfo = async ()=>{
        submitting = true
        console.log('add new member')
        try {
          const result = await addNewMember()
          console.log(result)
        } catch (error) {
          console.log(error)
        }
      }
  
      return {
        signaturePad,

        fabHide,
        fab,
        contributionOptions,
        authorityOptions,
        updateMemberInfo,
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
  