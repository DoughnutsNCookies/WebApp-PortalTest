<template>
    <q-page padding class="q-gutter-md">
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
            <q-select outlined v-model="monthlyContribution" :options="contributionOptions" label="Outlined" :disable="!fab"/>
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
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { VueSignaturePad } from 'vue-signature-pad';
  
  export default defineComponent({
    name: 'UpdateMemberPage',
    components: {
      VueSignaturePad
    },
    setup() {
    const fab = ref(false)
    let submitting = false

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
  
      const fabHide = () => {
        if (!fab.value && !submitting){ 
            console.log('reset all input')
            submitting = false
            return;
        }
        submitting = false
      }
      const updateMemberInfo = async ()=>{
        submitting = true
        console.log('add new member')
        console.log(gender.value)
        return;
      }
  
      return {
        fabHide,
        fab,
        contributionOptions,
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
  