<template>
  <div v-if="formData.loading">
    <p class="spinner-title">
      درحال لود شدن
    </p>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="mb-125">
    <!-- Header Area-->
    <Header />
    <!-- PWA Install Alert -->

    <div class="page-content-wrapper direction-rtl">
      <div class="container">
        <!-- Profile Wrapper-->
        <div class="profile-wrapper-area py-3">
          <!-- User Information-->
          <div class="card user-info-card">
            <div class="card-body p-4 d-flex align-items-center">
              <div class="user-info">
                <p class="mb-0 text-dark">
                  شارژ کیف پول
                </p>
              </div>
            </div>
          </div>
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="card user-data-card">
            <div class="card-body">
              <form @submit.prevent="validateData">
                <div class="row">
                  <div class="col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>نام کاربری:</span><span>{{ nameData }}</span>
                    </div>
                    <input v-model="username" class="form-control" type="text" @change="getName">
                  </div>
                  <div class="col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>مبلغ</span>
                    </div>
                    <input v-model="price" class="form-control" type="text">
                  </div>

                </div>
                <button class="btn btn-success w-100" type="submit">
                  ثبت اطلاعات
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Internet Connection Status-->
    <Footer />
  </div>
</template>

<script>

import axios from 'axios'
//  import router from "../router";
//  import router from "../router";
import Header from '../../../components/sections/admin/Header.vue'
import Footer from '../../../components/sections/admin/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      nameData: null,
      map: null,
      formData: ({
        loading: true,
        slider: null,
        user: null
      }),
      image: null,
      username: null,
      price: null,
      id: this.$route.params.id
    }
  },
  watch: {
  },
  created () {
    this.formData.loading = false
  },
  methods: {
    handleImage1Upload (e) {
      this.image = e.target.files[0]
    },
    validateData () {
      this.registerRequest()
    },
    registerRequest () {
      this.formData.loading = true
      const formDataInfo = this.formData
      const thisData = this
      // const routerData = this.$router
      const formDataV = new FormData()
      formDataV.append('username', this.username)
      formDataV.append('price', this.price)
      axios
        .post('https://karjico.ir/api/admin/report/chargeAnicard', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          // const id = response.data.data.requestInfo
          thisData.formData.loading = false
          thisData.price = null
          thisData.username = null
          // routerData.push({ name: 'slider-id', params: { id } })
        }, function (error) {
          if (error.response.status === 401) {
            thisData.$router.push({ path: '/login' })
          }
          return Promise.reject(error)
        })
        .catch(function (error) {
          console.log(error)
          formDataInfo.loading = false
        })
    },
    getName () {
      this.formData.loading = false
      const formDataInfo = this.formData
      const thisData = this
      // const routerData = this.$router
      const formDataV = new FormData()
      formDataV.append('username', this.username)
      axios
        .post('https://karjico.ir/api/admin/report/getName', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          // const id = response.data.data.requestInfo
          thisData.formData.loading = false
          thisData.nameData = response.data.data.name
          // routerData.push({ name: 'slider-id', params: { id } })
        }, function (error) {
          if (error.response.status === 401) {
            thisData.$router.push({ path: '/login' })
          }
          return Promise.reject(error)
        })
        .catch(function (error) {
          console.log(error)
          formDataInfo.loading = false
        })
    }
  }

}

</script>
<style>
.cart-title {
  font-size: 12px;
  text-align: center;
}

#accordionExample {

  margin-bottom: 85px;

}
input {
  color: #000!important;
}
</style>
