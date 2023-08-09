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
          <div class="card user-info-card ">
            <div class="card-body p-4 align-items-center">
              <div class="user-info text-center mt-2">
                <h5 class="mb-0 text-center">
                  {{ formData.adv.title }}
                </h5>
                <span class="adv-count">{{ getScore }} از {{ allScore }}</span>
                <span v-if="price!== 0" class="adv-price">درآمد شما از این تبلیغ: {{ price }} تومان</span>
              </div>
            </div>
          </div>
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="card user-data-card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12 mb-3">
                  <img :src="image">
                </div>
                <p class="mb-0 adv-description">
                  {{ formData.adv.description }}
                </p>
              </div>
              <button v-if="price!== 0" class="btn btn-success w-100" @click="getAdvPrice">
                مشاهده و دریافت درآمد
              </button>
              <button v-else class="btn btn-success w-100" @click="getAdvPrice">
                مشاهده تبلیغ
              </button>
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
import Header from '../../components/sections/Header.vue'
import Footer from '../../components/sections/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      map: null,
      formData: ({
        loading: true,
        adv: null,
        user: null,
        wallet: null
      }),
      price: null,
      image: null,
      allScore: null,
      getScore: null,
      id: this.$route.params.id
    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    axios
      .post('https://karjico.ir/api/user/userAvd', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        thisData.formData.adv = response.data.data.adv
        thisData.allScore = response.data.data.allScore
        thisData.getScore = response.data.data.getScore
        thisData.price = response.data.data.price
        thisData.image = response.data.data.image
        thisData.formData.loading = false
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
  methods: {
    getAdvPrice () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('advId', this.formData.adv.id)
      axios
        .post('https://karjico.ir/api/user/getAdv', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.formData.adv = response.data.data.adv
          thisData.allScore = response.data.data.allScore
          thisData.getScore = response.data.data.getScore
          thisData.price = response.data.data.price
          thisData.image = response.data.data.image
          thisData.formData.loading = false
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
.adv-description{
  white-space: pre-wrap;
  text-align: center;
}
</style>
