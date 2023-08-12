<template>
  <div class="login-wrapper d-flex align-items-center justify-content-center text-center">
    <!-- Background Shape-->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
          <img class="big-logo login-logo" src="~/assets/img/icons/logo.png" alt="karjico">
          <!-- Register Form-->
          <div class="mt-5 px-4">
            <div class="row">
              <div class="col-12">
                <div class="card shopCart">
                  <div class="card user-data-card bg-dark">
                    <div class="card-body">
                        <div class="user-icon ">
                          <div class="text-white">
                            <img src="~/assets/img/icons/person-fill-check.svg" alt="">
                          </div>
                          <p>ورود به کارجیکو</p>
                        </div>
                          <div class="nav nav-tabs card-header-tabs nav-justified mb-3">
                            <a class="nav-link" href="/register">ثبت نام</a>
                            <a class="nav-link active" href="/login">ورود</a>
                          </div>
                          <form @submit.prevent="validateData">
                            <div class="btn-charge-div form-group text-start mb-4">
                              <span class="title-div phone-title">تلفن همراه</span>
                              <div class="user">
                                <img src="~/assets/img/icons/person-fill.svg" alt="">
                              </div>
                              <input v-model.lazy="username" class="form-control mb-3 bg-dar-input" placeholder="تلفن همراه خود را وارد کنید">
                            </div>
                            <div class="btn-charge-div form-group text-start mb-4">
                              <span class="title-div">کلمه عبور</span>
                              <div class="user">
                                <i class="lni lni-key"></i>
                              </div>
                              <input v-model.lazy="password" class="form-control mb-3 bg-dar-input" placeholder="کلمه عبور خود را وارد کنید">
                                <img id="eye" @click="toggleEye" src="~/assets/img/icons/eye-fill.svg" alt="">
                            </div>
                            <button class="btn btn-warning border-0 bg-warning btn-lg w-100">
                              ورود
                            </button>
                            <a class="link-register btn-lg w-100" href="/remember">رمز را فراموش کرده‌اید؟<span class="text-warning"> بازیابی رمز ورود</span></a>
                          </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
      username: '',
      password: ''
    }
  },
  methods: {
    // toggleEye () {
    //   document.getElementById('eye').attributes.src.value =
    //   document.getElementById('eye').attributes.src.value === '~/assets/img/icons/eye-fill.svg'
    //    ? '~/assets/img/icons/eye-slash-fill.svg' : '~/assets/img/icons/eye-fill.svg'
    // },
    validateData () {
      this.login()
    },
    login  () {
      // const router = this.$router
      const thisData = this
      axios
        .post('https://karjico.ir/api/login', {
          username: this.username,
          password: this.password
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
            localStorage.setItem('api_token', response.data.data.token)
            thisData.token = localStorage.api_token
            thisData.receivedCode = 0

            if (response.data.data.roles.includes(1)) {
              localStorage.setItem('admin', 1)
              thisData.admin = 1
            }
            if (response.data.data.roles.includes(2)) {
              localStorage.setItem('user', 1)
              thisData.coach = 1
            }
            if (response.data.data.roles.includes(3)) {
              localStorage.setItem('shop', 1)
              thisData.place = 1
            }
            localStorage.name = response.data.data.name
            localStorage.lastName = response.data.data.last_name
            localStorage.mobile = response.data.data.mobile
            localStorage.username = response.data.data.username
            console.log('333')
            thisData.$router.push({ name: 'index' })
            console.log('444')
          } else {
            thisData.$toast.show('نام کاربری یا رمز ورود اشتباه است', {
              position: 'bottom-center',
              type: 'error',
              theme: 'bubble',
              duration: 7000
            })
            thisData.formData.loading = false
          }
        })
        .catch(function (error) {
          thisData.$toast.show('نام کاربری یا رمز ورود اشتباه است', {
            position: 'bottom-center',
            type: 'error',
            theme: 'bubble',
            duration: 7000
          })
          console.log(error)
        })
    }
  }
}

</script>
<style>
#eye{
  position: absolute;
  bottom: 25%;
  left: 5%;
}
.user-icon img{
  width: 50px;
}
.btn-charge-div {
  height: 47px;
}
.phone-title{
  left: 72% !important;
}
.user img{
  position: absolute;
  z-index: 1;
  left: 88%;
  bottom: 27%;
  width: 20px;
}

.user i{
  color: #fff;
  position: absolute;
  z-index: 1;
  left: 88%;
  bottom: 27%;
  width: 20px;
}
.user-icon{
  margin-bottom: 40px;
}
.link-register{
  color:#fff!important;
  margin-top:10px ;
  font-size: 12px;
  margin-top: 20px;
}
.bg-dark{
  border-radius: 6px !important;
}

.nav-link{
  color: #fff;
  padding: 0px;
}
.nav-link:hover{
  color: #ffaf00;
}

.nav-tabs .nav-link.active{
  background-color: #ffaf00;
  border: none;
  border-radius: 100px;
}

.nav-tabs .nav-link{
  border-radius: 100px !important;
}

.link-register i{
  margin-left: 5px;
}
.bg-dar-input {
    border: none !important;
    border-radius: 26px !important;
    text-align: center !important;
}
.btn-charge-div .title-div{
  left: 75%;
  right: 0;
}
.card-header-tabs{
  background-color: #8d8d8d;
  padding: 5px;
  border-radius: 100px !important;
}
.card{
  border-radius: 25px !important;
}
.login-wrapper{
  background: linear-gradient(to left, #000000, #303030) !important;
}
.login-logo{
  width: 180px !important;
}
@media only screen and (min-width: 576px) and (max-width: 767px) {
  .container {
    max-width: 600px;
  }
}
</style>
