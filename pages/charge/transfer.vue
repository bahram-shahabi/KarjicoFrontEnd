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

    <div class="page-content-wrapper">
      <div class="container">
        <div class="pt-3">
          <div class="profile-wrapper-area py-3 direction-rtl margin-150">
            <!-- User Information-->
            <div class="row">
              <div class="col-12">
                <div class="card shopCart">
                  <div class="card user-data-card bg-dark">
                    <div class="card-body">
                      <div class="title align-items-center">
                        <h5 class="mb-0 titleBorder">
                          انتقال شارژ
                        </h5>
                        <div class="line" />
                        <p class="mt-4 text-center">
                          شماره موبایلی که می خواهید برای آن شارژ انتقال دهید را وارد نمایید
                        </p>
                        <div class="btn-charge-div">
                          <span class="title-div">
                            شماره موبایل
                          </span>
                          <input
                            v-model="mobile"
                            class="form-control mb-3 bg-dar-input"
                            type="text"
                            placeholder="مثلا 09123456789"
                            maxlength="11"
                            @input="checkMobile"
                          >
                          <img class="sim" src="~/assets/img/sim.png" alt="">
                        </div>
                        <p class="mt-4 text-center">
                          نوع سیم کارت خود را انتخاب نمایید
                        </p>
                        <div class="row">
                          <div class="col-6 ">
                            <button class="btn btn-danger w-100 activeBtnTypeNet">
                              اعتباری
                            </button>
                          </div>
                          <div class="col-6">
                            <button class="btn btn-danger w-100 deactiveBtnTypeNet">
                              دائمی
                            </button>
                          </div>
                          <div class="col-12 mb-0">
                            <multiselect
                              v-model="categoryItem"
                              track-by="id"
                              label="title"
                              placeholder="مبلغ مورد نظر خود را انتخاب نمایید"
                              :options="category"
                              :searchable="true"
                              :allow-empty="false"
                              :close-on-select="true"
                              :show-labels="false"
                            >
                              <template slot="singleLabel" slot-scope="{ option }">
                                {{ option.title }}
                              </template>
                            </multiselect>
                          </div>
                          <div class="col-12 mt-0">
                            <button class="btn btn-success w-100 " @click="checkNet=1">
                              شرایط و قوانین
                            </button>
                          </div>
                          <div class="col-12 mt-4">
                            <button class="btn btn-success bg-yellow w-100 " @click="checkNet=1">
                              تایید
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
        </div>
      </div>
    </div>

    <!-- Internet Connection Status-->
  <!--    <Footer />-->
  </div>
</template>

<script>

// import axios from 'axios'
import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import VueSweetalert2 from 'vue-sweetalert2'

import 'sweetalert2/dist/sweetalert2.min.css'
//  import router from "../router";
//  import router from "../router";
// import Footer from '../../components/sections/Footer.vue'
import Header from '../../components/sections/Header.vue'

Vue.component('Multiselect', Multiselect)
Vue.use(VueSweetalert2)
export default {
  components: {
    // Footer,
    Header,
    Multiselect
  },
  data () {
    return {
      map: null,
      formData: ({
        loading: false,
        tournamentData: [],
        resultData: []
      }),
      totalPrice: 0,
      shopPrice: 0,
      userPrice: 0,
      category: ['10000', '20000']
    }
  },
  methods: {
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
.img-homepage{
  width: 50px;
  padding-bottom: 5px;
}
.invoiceForm{
margin-top: 10px;
  position: fixed;
  bottom: 0px;
  z-index: 999;
  transform: translate(-50%, 0%);
  left: 50%;
  width: -webkit-fill-available;
}
.invoiceForm .pay{
  position: absolute;
  left: 10px;
  top: 30px;
}
.invoiceForm .card {
  background-color: #fff;
  padding: 0 11px;
  border-radius: 10px 10px 0px 0px;
  width: 100%;
}
p.color-yellow{
  color: #ffc200  !important;
}
.border-yellow{
  border: 1px solid #ffaf00;
  padding: 0 10px;
}
.sim-img{
  width: 40px;
  margin-left: 10px;
}
/*.zoom-in-zoom-out {*/
/*  animation: zoom-in-zoom-out 2s ease-out infinite;*/
/*}*/

/*@keyframes zoom-in-zoom-out {*/
/*  0% {*/
/*    transform: scale(1, 1);*/
/*  }*/
/*  50% {*/
/*    transform: scale(0.5, 0.5);*/
/*  }*/
/*  100% {*/
/*    transform: scale(1, 1);*/
/*  }*/
/*}*/
.margin-150{
  margin-bottom: 0px;
}
</style>
<!--async created () {-->
<!--// const routerData = this.$router-->
<!--this.$axios.setToken('1|hN286uXntAV0Qzpc3A9YSs42cNaI1CwZfAGwhHLa', 'Bearer')-->
<!--const response = await this.$axios.post('https://karjico.ir/api/login', {-->
<!--mobile: '09155001695'-->
<!--})-->
<!--console.log(response)-->
<!--},-->
