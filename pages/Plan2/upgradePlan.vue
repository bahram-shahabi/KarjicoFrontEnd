<template>
  <div v-if="formData.loading" class="centerLoader">
    <p class="spinner-title">
      درحال لود شدن
    </p>
    <img class="header-logo" src="~/assets/img/icons/logo.png" alt="">
    <br>
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
          <div class="card user-info-card text-center ">
            <div class="card-body p-3 d-flex align-items-center text-center">
              <div class="user-info w-100">
                <h5 class="mb-0 text-center">
                  محدوده تبلیغاتی فعلی شما : محدوده {{ formData.userInfo.level }}
                </h5>
              </div>
            </div>
          </div>
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="card user-data-card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-12 mb-3">
                  <div class="shipping-method-choose">
                    <ul class="ps-0">
                      <li v-for="item in formData.levelList" :key="item.id">
                        <div v-if="item.id <= formData.userLevel">
                          <input :id="'id'+item.id" type="radio" checked disabled>
                          <label :for="'id'+item.id">محدوده {{ item.id }} : <span>{{ item.pay_price.toLocaleString() }} تومان</span> <span class="active-lable">فعال</span></label>
                          <div class="check" />
                          <div><img src="~/assets/img/question.png" class="image-help"></div>
                        </div>
                        <div v-else>
                          <input :id="'id'+item.id" type="radio" name="level" @click="calcPrice(item.id)">
                          <label :for="'id'+item.id">محدوده {{ item.id }} : <span>{{ item.pay_price.toLocaleString() }} تومان</span></label>
                          <div class="check" />
                          <div><img src="~/assets/img/question.png" class="image-help"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="selectLevel" class="row">
            <div class="col-12">
              <div class="shipping-method-choose mb-3">
                <div class="card shipping-method-choose-title-card bg-success">
                  <div class="card-body">
                    <h6 class="text-center mb-0 text-white">
                      نحوه پرداخت
                    </h6>
                  </div>
                </div>
                <div class="card shipping-method-choose-card">
                  <div class="card-body">
                    <div class="shipping-method-choose">
                      <div>
                        مبلغ قابل پرداخت : {{ price }}
                      </div>
                      <ul class="ps-0 pb-3">
                        <li>
                          <input id="anicart" v-model="payType" type="radio" name="payType" value="0">
                          <label for="anicart">کیف پول - <span>موجودی شما {{ formData.virtualCardAmount }} تومان</span></label>
                          <div class="check" />
                        </li>
                        <li>
                          <input
                            id="online"
                            v-model="payType"
                            type="radio"
                            name="payType"
                            value="1"
                            checked
                          >
                          <label for="online">آنلاین</label>
                          <div class="check" />
                        </li>
                      </ul>
                      <button class="btn btn-success w-100" @click="upgradeLevel()">
                        پرداخت
                      </button>
                    </div>
                  </div>
                </div>
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
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
//  import router from "../router";
//  import router from "../router";
import Header from '../../components/sections/Header.vue'
import Footer from '../../components/sections/Footer.vue'
Vue.use(VueSweetalert2)
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
        levelList: [],
        user: null,
        wallet: null,
        userInfo: [],
        userLevel: null,
        virtualCardAmount: 0,
        link: null
      }),
      price: null,
      selectLevel: false,
      selectLevelId: 0,
      payType: 1,
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
    const thisData = this
    if (localStorage.token === undefined || localStorage.userId === undefined) {
      this.$router.push({ name: 'login' })
    }
    formDataInfo.loading = true
    axios
      .post('https://dbsa.ir/api/upgradeUserPlanInfo', {
        user_id: localStorage.userId,
        token: localStorage.token
      })
      .then(function (response) {
        formDataInfo.virtualCardAmount = response.data.data.virtualCardAmount
        formDataInfo.levelList = response.data.data.levelList
        formDataInfo.userInfo = response.data.data.userInfo
        formDataInfo.userLevel = response.data.data.userInfo.level
        formDataInfo.loading = false
      })
      .catch(function (error) {
        thisData.$router.push({ path: '/login' })
        console.log(error)
        formDataInfo.loading = false
      })
  },
  methods: {
    calcPrice (id) {
      let count = 0
      for (let i = this.formData.userLevel; i < id; i++) {
        count = count + this.formData.levelList[i].pay_price
      }
      this.price = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.selectLevel = true
      this.selectLevelId = id
    },
    upgradeLevel () {
      const thisData = this
      const formDataInfo = this.formData
      const message = 'آیا از پرداخت' + this.price + 'تومان مطمئن هستید؟'
      this.$swal.fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: 'بلی',
        cancelButtonText: 'خیر'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // const routerData = this.$router
          axios
            .post('https://dbsa.ir/api/upgradeUserPlan1', {
              user_id: localStorage.userId,
              token: localStorage.token,
              levelUpgrade: this.selectLevelId,
              amount: this.price,
              payType: this.payType
            })
            .then(function (response) {
              thisData.selectLevel = false
              location.replace(response.data.data.link.original.url)
              // formDataInfo.$router.push({ path: response.data.data.link.original.url })
            })
            .catch(function (error) {
              console.log(error)
              formDataInfo.loading = false
            })
        }
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

</style>
