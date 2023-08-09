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
                  ایجاد یک مزایده جدید
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
                      <i class="lni lni-pencil" /><span>نام کالا</span>
                    </div>
                    <input class="form-control" type="text">
                  </div>
                </div>
                <button class="btn btn-success w-100" type="submit">
                  ثبت اطلاعات
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="card settings-card">
          <div class="card-body">
            <!-- Single Settings-->
            <div class="single-settings d-flex align-items-center justify-content-between">
              <div class="title">
                <i class="lni lni-wallet" />
                <span style="margin-right:35px ">موجودی کیف پول</span>
                <br>
                <span style="margin-right:35px ">{{ formData.wallet }} تومان</span>
              </div>
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
        auction: null,
        user: null,
        wallet: null,
        warranty: null
      }),
      id: this.$route.params.id
    }
  },
  watch: {
    price (newValue) {
      const result = newValue.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.price = result
    }
  },
  created () {
    const formDataInfo = this.formData
    const priceData = this
    if (localStorage.token === undefined || localStorage.userId === undefined) {
      this.$router.push({ name: 'login' })
    }
    axios
      .post('https://api.rumbamarket.ir/api/registerUserAuction', {
        id: localStorage.getItem('userId'), // localStorage.userId,
        api_token: localStorage.getItem('token'), // localStorage.token
        auction_id: 6
      })
      .then(function (response) {
        formDataInfo.auction = response.data.data.auction
        formDataInfo.user = response.data.data.user
        formDataInfo.wallet = response.data.data.wallet
        formDataInfo.loading = false
        priceData.price = response.data.data.price
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    handleImage1Upload (e) {
      this.image1 = e.target.files[0]
    },
    validateData () {
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

</style>
