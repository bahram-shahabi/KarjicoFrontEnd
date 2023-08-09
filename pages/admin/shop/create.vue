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
                  ثبت فروشگاه جدید
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
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>نام فروشگاه</span>
                    </div>
                    <input v-model="shopName" class="form-control" type="text">
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>شماره تماس</span>
                    </div>
                    <input v-model="phone" class="form-control" type="text">
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>ساعات پشتیبانی</span>
                    </div>
                    <input v-model="clockSupport" class="form-control" type="text">
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>روزهای پشتیبانی</span>
                    </div>
                    <input v-model="daySupport" class="form-control" type="text">
                  </div>
                  <div class="col-md-6 col-6 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>دسته بندی خدمات</span>
                    </div>
                    <multiselect
                      v-model="categoryId"
                      track-by="id"
                      label="title"
                      placeholder="دسته بندی مد نظر خود را انتخاب نمایید"
                      :options="categoryList"
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
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>نمایش در سایت</span>
                    </div>
                    <select v-model="status" class="mb-3 form-control form-select direction-lt">
                      <option value="1" selected>
                        نمایش داده شود
                      </option>
                      <option value="0">
                        نمایش داده نشود
                      </option>
                    </select>
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>کاربر - پذیرنده</span>
                    </div>
                    <multiselect
                      v-model="shopUserId"
                      placeholder="کاربر فروشگاه را انتخاب نمایید"
                      label="name"
                      track-by="name"
                      :options="userList"
                      :custom-label="customLabel"
                      :searchable="true"
                      :allow-empty="false"
                      :close-on-select="true"
                      :show-labels="false"
                    >
                      <template slot="singleLabel" slot-scope="props">
                        {{ props.option.name }} {{ props.option.last_name }} {{ props.option.user_name }}
                      </template>
                      <template slot="singleLabel" slot-scope="{ option }">
                        {{ option.name }} {{ option.last_name }} {{ option.username }}
                      </template>
                    </multiselect>
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>مسئول اجرایی</span>
                    </div>
                    <multiselect
                      v-model="responsibleUserId"
                      placeholder="کاربر مسئول اجرایی را انتخاب نمایید"
                      label="name"
                      track-by="name"
                      :options="userList"
                      :custom-label="customLabel"
                      :searchable="true"
                      :allow-empty="false"
                      :close-on-select="true"
                      :show-labels="false"
                    >
                      <template slot="singleLabel" slot-scope="props">
                        {{ props.option.name }} {{ props.option.last_name }} {{ props.option.user_name }}
                      </template>
                      <template slot="singleLabel" slot-scope="{ option }">
                        {{ option.name }} {{ option.last_name }} {{ option.username }}
                      </template>
                    </multiselect>
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>انتخاب استان</span>
                    </div>
                    <multiselect
                      v-model="provinceId"
                      track-by="title"
                      label="title"
                      placeholder="دسته بندی مد نظر خود را انتخاب نمایید"
                      :options="provinceList"
                      :searchable="true"
                      :allow-empty="false"
                      :close-on-select="true"
                      :show-labels="false"
                      @input="getCity()"
                    >
                      <template slot="singleLabel" slot-scope="{ option }">
                        {{ option.title }}
                      </template>
                    </multiselect>
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>انتخاب شهر</span>
                    </div>
                    <multiselect
                      v-model="cityId"
                      track-by="title"
                      label="title"
                      placeholder="شهر مد نظر خود را انتخاب نمایید"
                      :options="cityList"
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
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>محصولات</span>
                    </div>
                    <textarea v-model="products" class="form-control" cols="4" />
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>امکانات</span>
                    </div>
                    <textarea v-model="possibilities" class="form-control" cols="4" />
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>شرایط</span>
                    </div>
                    <textarea v-model="conditions" class="form-control" cols="4" />
                  </div>
                  <div class="col-md-6 col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>آدرس</span>
                    </div>
                    <textarea v-model="address" class="form-control" cols="4" />
                  </div>
                  <div class="col-6 mb-3">
                    <div class="col-9 float-right">
                      <div class="title mb-2">
                        <i class="lni lni-user" /><span>تصویر اصلی</span>
                      </div>
                      <input class="form-control" type="file" accept="image/png, image/gif, image/jpeg" @change="handleImage1Upload">
                    </div>
                    <div class="col-3 float-right">
                      <img :src="url" width="auto" class="uploadImage">
                    </div>
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
import Vue from 'vue'
import Multiselect from 'vue-multiselect'
//  import router from "../router";
//  import router from "../router";
import Header from '../../../components/sections/admin/Header.vue'
import Footer from '../../../components/sections/admin/Footer.vue'

Vue.component('Multiselect', Multiselect)
export default {
  components: {
    Header,
    Footer,
    Multiselect
  },
  data () {
    return {
      map: null,
      formData: ({
        loading: true,
        slider: null,
        user: null,
        shopDiscount: [],
        showModalDiscount: false
      }),
      shopName: null,
      phone: null,
      clockSupport: null,
      daySupport: null,
      categoryId: 1,
      categoryList: [],
      shopUserId: null,
      responsibleUserId: null,
      userList: [],
      cityList: [],
      provinceList: [],
      cityId: null,
      provinceId: null,
      image: null,
      description: null,
      products: null,
      possibilities: null,
      address: null,
      conditions: null,
      url: null,
      status: 1
      // id: this.$route.params.id
    }
  },
  watch: {
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()

    axios
      .post('https://karjico.ir/api/admin/shop/create', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        thisData.userList = response.data.data.user
        thisData.provinceList = response.data.data.province
        thisData.cityList = response.data.data.city
        thisData.categoryList = response.data.data.shopCategory
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
    // eslint-disable-next-line camelcase
    customLabel ({ name, last_name, username }) {
      // eslint-disable-next-line camelcase
      return `${name} ${last_name} – ${username}`
    },
    handleImage1Upload (e) {
      this.image = e.target.files[0]
    },
    validateData () {
      this.registerRequest()
    },
    getCity () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('province_id', thisData.provinceId.id)
      axios
        .post('https://karjico.ir/api/admin/shop/getCity', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.cityList = response.data.data.city
          thisData.cityId = null
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
    registerRequest () {
      this.formData.loading = true
      const thisData = this
      const formDataInfo = this.formData
      const routerData = this.$router
      const formDataV = new FormData()
      const image = this.image
      formDataV.append('image', image)
      formDataV.append('title', this.shopName)
      formDataV.append('address', this.address)
      formDataV.append('phone', this.phone)
      formDataV.append('category_id', this.categoryId.id)
      formDataV.append('Conditions', this.conditions)
      formDataV.append('clock_support', this.clockSupport)
      formDataV.append('day_support', this.daySupport)
      formDataV.append('Possibilities', this.possibilities)
      formDataV.append('Products', this.products)
      formDataV.append('responsible_id', this.responsibleUserId.id)
      formDataV.append('shop_user_id', this.shopUserId.id)
      formDataV.append('state', this.provinceId.id)
      formDataV.append('state_name', this.provinceId.title)
      formDataV.append('city', this.cityId.id)
      formDataV.append('city_name', this.cityId.title)
      formDataV.append('description', this.description)
      formDataV.append('status', this.status)
      axios
        .post('https://karjico.ir/api/admin/shop/store', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.formData.loading = false
          routerData.push({ name: 'admin-shop' })
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.cart-title {
  font-size: 12px;
  text-align: center;
}

#accordionExample {

  margin-bottom: 85px;

}
input{
  color: #000!important;
}
textarea{
  color: #000!important;
}
</style>
