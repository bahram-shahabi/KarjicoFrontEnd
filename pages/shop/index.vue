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
          <div class="profile-wrapper-area py-3 direction-rtl">
            <!-- User Information-->
            <div class="row">
              <div class="col-12">
                <div class="card user-info-card mt-3 text-center">
                  <div class="card-body p-3 d-flex align-items-center ">
                    <div class="user-info w-100">
                      <h5 class="mb-0 ">
                        جستجو در پذیرنده ها
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="card user-data-card mb-3 ">
                  <div class="card-body">
                    <div class="row">
<!--                      <div class="col-12 mb-3 text-center">-->
<!--                        <img class="logo" src="~/assets/img/AS-1.png" alt="">-->
<!--                      </div>-->
                      <div class="col-xl-6 col-12 mb-3">
                        <multiselect
                          v-model="cityItem"
                          track-by="city"
                          label="city_name"
                          placeholder="شهر خود را انتخاب نمایید"
                          :options="city"
                          :searchable="true"
                          :allow-empty="false"
                          :close-on-select="true"
                          :show-labels="false"
                        >
                          <template slot="singleLabel" slot-scope="{ option }">
                            {{ option.city_name }}
                          </template>
                        </multiselect>
                      </div>
                      <div class="col-xl-6 col-12 mb-3">
                        <multiselect
                          v-model="categoryItem"
                          track-by="id"
                          label="title"
                          placeholder="دسته بندی مد نظر خود را انتخاب نمایید"
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
                      <div class="col-xl-12 col-12 mb-3">
                        <input v-model="title" class="form-control color-black" type="text" placeholder="جستجو نام فروشگاه">
                      </div>
                    </div>
                    <button href="/advPlan/upgradePlan" class="btn btn-success w-100" @click="serach()">
                      جستجو
                    </button>
                  </div>
                </div>
              </div>
              <div v-for="item in formData.tournamentData" :key="item.id" class="col-lg-4 col-md-6 col-sm-12">
                <div class="card shopCart">
                  <nuxt-link :to="'/shop/'+item.id">
                    <div class="align-items-center">
                      <div class="cardImage">
                        <img v-lazy-load class="shopImage" :src="item.image" alt="">
                        <img class="logo" src="~/assets/img/icons/logo.png" alt="">
                        <div class="city">
                          <i class="lni lni-map-marker" /> {{ item.city_name }}
                        </div>
                      </div>
                      <div class="shopInfo">
                        <p class="mb-0">
                          {{ item.title }}
                        </p>
                        <p class="mb-0 address">
                          {{ item.address }}
                        </p>
                        <hr>
                        <div class="mb-0">
                          <a href="" class="percent" v-if=" item.discounts"> {{ item.discounts[0].discount }} درصد کارمزد تبلیغات</a>
                          <a href="" class="buy">خرید آنلاین</a>
                          <div class="clearfix" />
                        </div>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
            <InfiniteScroll :enough="enough" @load-more="getData()" />
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
import Multiselect from 'vue-multiselect'
//  import router from "../router";
//  import router from "../router";

import Footer from '../../components/sections/Footer.vue'
import Header from '../../components/sections/Header.vue'
Vue.component('Multiselect', Multiselect)
// import axios from "axios";
export default {
  components: {
    Footer,
    Header,
    Multiselect
  },
  data () {
    return {
      map: null,
      formData: ({
        loading: true,
        tournamentData: []
      }),
      perPage: 5,
      page: 1,
      current_page: 1,
      total: 1,
      last_page: 1,
      total_pages: 1,
      state: null,
      city: null,
      category: null,
      title: null,
      enough: 0,
      cityItem: null,
      categoryItem: null
    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    formDataV.append('type_id', 2)
    formDataV.append('per_page', this.perPage)
    formDataV.append('shopName', this.title)
    formDataV.append('cityId', this.cityItem ? this.cityItem.city : 0)
    formDataV.append('categoryId', this.categoryItem ? this.categoryItem.id : 0)
    formDataV.append('page', this.page)
    axios
      .post('https://karjico.ir/api/user/shopList', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.tournamentData = response.data.data.data.data
        thisData.city = response.data.data.city
        thisData.category = response.data.data.category
        thisData.current_page = response.data.data.data.current_page
        thisData.per_page = response.data.data.data.per_page
        thisData.total = response.data.data.data.total
        thisData.last_page = response.data.data.data.last_page
        thisData.total_pages = response.data.data.data.total_pages
        if (thisData.total_pages === thisData.current_page) { thisData.enough = true }
        formDataInfo.loading = false
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
    getData () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('type_id', 2)
      formDataV.append('per_page', this.perPage)
      formDataV.append('shopName', this.title)
      formDataV.append('cityId', this.cityItem ? this.cityItem.city : 0)
      formDataV.append('categoryId', this.categoryItem ? this.categoryItem.id : 0)
      formDataV.append('page', this.page++)
      axios
        .post('https://karjico.ir/api/user/shopList', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.tournamentData = formDataInfo.tournamentData.concat(response.data.data.data.data)
          thisData.current_page = response.data.data.data.current_page
          thisData.per_page = response.data.data.data.per_page
          thisData.total = response.data.data.data.total
          thisData.total = response.data.data.data.total
          thisData.total_pages = response.data.data.data.total_pages

          if (thisData.total_pages === thisData.current_page) { thisData.enough = true }
          formDataInfo.loading = false
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
    serach () {
      this.page = 1
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('type_id', 2)
      formDataV.append('per_page', this.perPage)
      formDataV.append('shopName', this.title)
      formDataV.append('cityId', this.cityItem ? this.cityItem.city : 0)
      formDataV.append('categoryId', this.categoryItem ? this.categoryItem.id : 0)
      formDataV.append('page', this.page++)
      axios
        .post('https://karjico.ir/api/user/shopList', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.tournamentData = response.data.data.data.data
          thisData.current_page = response.data.data.data.current_page
          thisData.per_page = response.data.data.data.per_page
          thisData.total = response.data.data.data.total
          thisData.last_page = response.data.data.data.last_page
          thisData.total_pages = response.data.data.data.total_pages
          if (thisData.total_pages === thisData.current_page) {
            thisData.enough = true
          }
          formDataInfo.loading = false
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
.img-homepage{
  width: 50px;
  padding-bottom: 5px;
}
.color-black{
  color: black!important;
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

</style>
<!--async created () {-->
<!--// const routerData = this.$router-->
<!--this.$axios.setToken('1|hN286uXntAV0Qzpc3A9YSs42cNaI1CwZfAGwhHLa', 'Bearer')-->
<!--const response = await this.$axios.post('https://karjico.ir/api/login', {-->
<!--mobile: '09155001695'-->
<!--})-->
<!--console.log(response)-->
<!--},-->
