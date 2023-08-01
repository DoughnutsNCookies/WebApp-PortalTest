<template>
  <q-page v-if="stage === 0" padding class="q-gutter-md">
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
          
        </div>
        <q-btn type="submit" color="primary" class="q-mt-md" label="Add"/>
      </q-form>
    </q-page>
    
  <q-page v-if="stage === 1">
    <div class="q-pa-md flex justify-center">
      <div style="width: 80vw;">
        <div class="column items-center" style=" gap: 18px;">
          <q-uploader
            style="max-width: 300px"
            label="Ic Front"
            multiple="false"
            max-files="1"
            hide-upload-btn
            accept=".jpg,.png, image/*"
            @added="onPickIcfront"
            @rejected="onRejected"
          />
          <q-uploader
            style="max-width: 300px"
            label="Ic Back"
            multiple="false"
            max-files="1"
            hide-upload-btn
            accept=".jpg,.png, image/*"
            @added="onPickIcBack"
            @rejected="onRejected"
          />
          <VueSignaturePad
          style="border: 1px solid black;"
          ref="signaturePadRef"
          v-model="signature"
          class="signature-pad"
          width="300px"
          height="200px"
          :options="{
            penColor: 'rgb(0, 0, 0)',
          }"
          />
          <q-btn-group push>
            <q-btn push label="Undo" icon="visibility" @click="undoSignature" />
            <q-btn push label="Clear" icon="update" @click="clearSignature" />
          </q-btn-group>
          <q-btn color="primary" class="q-mt-md" label="upload attachment" @click="uploadImages"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script >
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { VueSignaturePad } from 'vue-signature-pad';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'CreateMemberPage',
  components: {
    VueSignaturePad
  },
  setup() {
    const router = useRouter();
    const stage = ref(0);
    // Dom Elements
    const signaturePadRef = ref(null)

    // member id
    const memberId = ref('');

    // form data
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
    const authorityLevel = ref('');
    
    // files 
    const icfront = ref(null);
    const icback = ref(null);
    const signature = ref(null);

    // optionsa
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
        switch (response.status) {
          case 201:
            console.log(response.data);
            memberId.value = response.data._id;
            stage.value = 1;
            break;
          case 200:
            console.log(response.data);
            router.push('/');
            break;
          case 400:
            console.log(response.data);
            break;
          case 401:
            console.log(response.data);
            localStorage.removeItem('accessToken');
            router.push('/login');
            break;
          default:
            break;
        }
      }).catch((error) => {
        console.log(error);
        localStorage.removeItem('accessToken');
        router.push('/login');
      });
      return;
    }

    const undoSignature = () => {
      signaturePadRef.value.undoSignature();
    }

    const clearSignature = () => {
      signaturePadRef.value.clearSignature();
    }

    const onPickIcfront= (evt)=>{
      console.log(evt);
      icfront.value = evt[0];
    }

    const onPickIcBack= (evt)=>{
      console.log(evt);
      icback.value = evt[0];
    }

    const onRejected= (evt)=>{

    }

    const uploadImages = () => {
      const newFormData = new FormData();
      newFormData.append('formId', memberId.value);
      newFormData.append('icfront', icfront.value);
      newFormData.append('icback', icback.value);
      const {isEmpty, data} = signaturePadRef.value.saveSignature();
      if (!isEmpty) {
        newFormData.append('signature', data);
      }
      // newFormData.append('signature', signaturePadRef.value.getSignatureImage());
      for (const entry of newFormData){
        console.log(entry);
      }
      const accessToken = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = accessToken;
      axios.post("http://localhost:3030/upload",newFormData).then((response) => {
        switch (response.status) {
          case 201:
            console.log(response.data);
            router.push('/');
            break;
          case 200:
            console.log(response.data);
            router.push('/');
            break;
          case 400:
            console.log(response.data);
            break;
          case 401:
            console.log(response.data);
            localStorage.removeItem('accessToken');
            router.push('/login');
            break;
          default:
            break;
        }
      }).catch((error) => {
        console.log(error);
        localStorage.removeItem('accessToken');
        router.push('/login');
      });
    }

    return {
      stage,

      // Dom Elements
      signaturePadRef,

      // images
      icfront,
      icback,
      signature,

      // options
      authorityOptions,
      contributionOptions,

      // methods
      onPickIcfront,
      onPickIcBack,
      undoSignature,
      clearSignature,
      onRejected,
      addNewMember,
      uploadImages,

      // form data
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
      authorityLevel,
    }
  }
})
</script>
