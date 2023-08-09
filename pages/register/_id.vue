<template>
  <div class="container">
    <div class="row justify-content-center">
      <img class="big-logo login-logo" src="~/assets/img/icons/logo.png" alt="">
    </div>
    <div class="register-form rtl mt-5 px-4 direction-rtl">
      <form @submit.prevent="validateData">
        <div class="form-group text-start mb-4">
          <span>نام</span>
          <label><i class="lni lni-user" /></label>
          <input v-model.lazy="name" class="form-control" type="text" placeholder="">
        </div>
        <div class="form-group text-start mb-4">
          <span>نام خانوادگی</span>
          <label><i class="lni lni-user" /></label>
          <input v-model.lazy="last_name" class="form-control" type="text" placeholder="">
        </div>
        <div class="form-group text-start mb-4">
          <span>نام کاربری(حروف انگلیسی)</span>
          <label><i class="lni lni-user" /></label>
          <input
            v-model.lazy="username"
            class="form-control"
            type="text"
            placeholder=""
            pattern="[A-Za-z0-9]+"
            @blur="onInputUsername"
          >
        </div>
        <div class="form-group text-start mb-4" pattern="[a-zA-Z]+">
          <span>  کد معرف </span><span>{{ referenceName }}</span>
          <label><i class="lni lni-user" /></label>
          <input v-model.lazy="reference_code" class="form-control" type="text" placeholder="" @blur="onInput">
        </div>
        <div class="form-group text-start mb-4">
          <span>تلفن همراه</span>
          <label><i class="lni lni-envelope" /></label>
          <input
            v-model="phone"
            class="form-control"
            type="number"
            placeholder=""
            pattern="[0-9]+"
          >
        </div>
        <div class="form-group text-start mb-4">
          <span>رمز ورود (حداقل 6 کاراکتر)</span>
          <label><i class="lni lni-lock" /></label>
          <input v-model.lazy="password" class="input-psswd form-control" type="password" placeholder="">
        </div>
        <div class="form-group text-start mb-4">
          <span>تکرار رمز ورود</span>
          <label><i class="lni lni-lock" /></label>
          <input v-model.lazy="repassword" class="input-psswd form-control" type="password" placeholder="">
        </div>
        <div>
          <div class="title mb-2 checkbox-title">
            <input ref="rolesSelected" type="checkbox" class="checkbox">تمامی <a href="/auction"> قوانین و مقررات </a> را مطالعه کرده و با شرایط موافق می باشم
          </div>
        </div>
        <button class="btn btn-warning btn-lg w-100" type="submit">
          ثبت نام
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2)
export default {
  layout: 'default',
  data () {
    return {
      map: null,
      formData: ({
        email: '',
        password: '',
        titleErrorText: '',
        loading: false
      }),
      name: null,
      last_name: null,
      phone: null,
      username: '',
      reference_code: null,
      password: null,
      repassword: null,
      referenceName: '',
      checkReference: 0,
      checkUsername: 0,
      id: this.$route.params.id
    }
  },
  created () {
    const thisData = this
    console.log(this.id)
    this.reference_code = this.id
    this.userLogin = localStorage.getItem('api_token')
    axios
      .post('https://dbsa.ir/api/check-username', {
        username: this.reference_code
      })
      .then(function (response) {
        if (response.data.data.code === 200) {
          thisData.referenceName = response.data.data.data.name + ' ' + response.data.data.data.last_name
          thisData.checkReference = 1
        } else {
          thisData.referenceName = 'کد معرف نامعتبر'
          thisData.checkReference = 0
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    validateData () {
      if (!this.$refs.rolesSelected.checked) {
        this.$swal.fire({
          icon: 'warning',
          title: 'لطفا قوانین و مقررات را تایید نمایید',
          confirmButtonText: 'بستن'
        })
      } else if (this.name === '' || this.last_name === '' || this.phone === '' || this.reference_code === '' || this.password === '' || this.repassword === '' || this.username === '' ||
        this.name === null || this.last_name === null || this.phone === null || this.reference_code === null || this.password === null || this.repassword === null || this.username === null) {
        this.$swal.fire({
          icon: 'warning',
          title: 'لطفا تمامی مقادیر را پر نمایید',
          confirmButtonText: 'بستن'
        })
      } else if (this.password !== this.repassword) {
        this.$swal.fire({
          icon: 'warning',
          title: 'پسورد و تکرار آن یکسان نمی باشد',
          confirmButtonText: 'بستن'
        })
      } else if ((!(this.phone.length === 11)) || (!this.phone.startsWith('09'))) {
        this.$swal.fire({
          icon: 'warning',
          title: 'تلفن همراه صحیح نمی باشد',
          confirmButtonText: 'بستن'
        })
      } else if (this.password.length < 6) {
        this.$swal.fire({
          icon: 'warning',
          title: 'حداقل طول پسورد 6 کاراکتر می باشد',
          confirmButtonText: 'بستن'
        })
      } else if (this.checkReference === 0) {
        this.$swal.fire({
          icon: 'warning',
          title: 'کد معرف معتبر نمی باشد',
          confirmButtonText: 'بستن'
        })
      } else if (this.checkUsername === 0) {
        this.$swal.fire({
          icon: 'warning',
          title: 'نام کاربری تکراری می باشد',
          confirmButtonText: 'بستن'
        })
      } else {
        this.register()
      }
    },
    register  () {
      this.formData.loading = true
      const thisData = this
      const router = this.$router
      this.formData.loading = true
      axios
        .post('https://dbsa.ir/api/register-user', {
          name: this.name,
          last_name: this.last_name,
          username: this.username,
          password: this.password,
          reference_code: this.reference_code,
          phone: this.phone
        })
        .then(function (response) {
          if (response.data.code === 200) {
            localStorage.userId = response.data.id
            localStorage.token = response.data.token
            localStorage.name = response.data.name
            localStorage.lastName = response.data.last_name
            localStorage.username = response.data.username
            localStorage.mobile = response.data.phone
            router.push({ path: '/' })
          } else {
            thisData.formData.loading = false
            thisData.$swal.fire({
              icon: 'warning',
              title: 'خطایی در سیستم رخ داده است',
              confirmButtonText: 'بستن'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onInput () {
      const thisData = this
      axios
        .post('https://dbsa.ir/api/check-username', {
          username: this.reference_code
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
            thisData.referenceName = response.data.data.data.name + ' ' + response.data.data.data.last_name
            thisData.checkReference = 1
          } else {
            thisData.referenceName = 'کد معرف نامعتبر'
            thisData.checkReference = 0
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onInputUsername () {
      const thisData = this
      axios
        .post('https://dbsa.ir/api/check-username', {
          username: this.username
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
            thisData.$swal.fire({
              icon: 'warning',
              title: 'نام کاربری تکراری می باشد',
              confirmButtonText: 'بستن'
            })
            thisData.checkUsername = 0
          } else {
            thisData.checkUsername = 1
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.checkbox-title{
  color: #fff!important;
}
</style>
