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
                <button class="btn btn-success w-100" @click="validateData">
                  ثبت اطلاعات
                </button>
                <button type="button" class="btn btn-warning w-100" @click="formData.showModalDiscount = true">
                  ثبت تخفیف
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="formData.showModalDiscount"
      class="modal fade show"
      tabindex="-1"
      aria-labelledby="exampleModalScrollableTitle"
      style="display: block;"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              تخفیفات
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="formData.showModalDiscount = false"
            />
          </div>
          <div class="modal-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    #
                  </th>
                  <th scope="col">
                    توضویحات
                  </th>
                  <th scope="col">
                    مبلغ کل تخفیف
                  </th>
                  <th scope="col">
                    سود شرکت
                  </th>
                  <th scope="col">
                    سود کاربر
                  </th>
                  <th scope="col">
                    سود معرف
                  </th>
                  <th scope="col">
                    سود مسئول اجرایی
                  </th>
                  <th scope="col">
                    سود کاربر1
                  </th>
                  <th scope="col">
                    سود کاربر2
                  </th>
                  <th scope="col">
                    سود کاربر3
                  </th>
                  <th scope="col">
                    سود کاربر4
                  </th>
                  <th scope="col">
                    سود کاربر5
                  </th>
                  <th scope="col">
                    سود کاربر6
                  </th>
                  <th scope="col">
                    سود کاربر7
                  </th>
                  <th scope="col">
                    سود کاربر8
                  </th>
                  <th scope="col">
                    سود کاربر9
                  </th>
                  <th scope="col">
                    سود کاربر10
                  </th>
                  <th scope="col">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in formData.shopDiscount" :key="index">
                  <th scope="row">
                    {{ index }}
                  </th>
                  <td>{{ item.description }}</td>
                  <td>{{ item.discount }}</td>
                  <td>{{ item.profit_company }}</td>
                  <td>{{ item.profit_user }}</td>
                  <td>{{ item.profit_reference }}</td>
                  <td>{{ item.profit_rsponsible }}</td>
                  <td>{{ item.profit_u_1 }}</td>
                  <td>{{ item.profit_u_2 }}</td>
                  <td>{{ item.profit_u_3 }}</td>
                  <td>{{ item.profit_u_4 }}</td>
                  <td>{{ item.profit_u_5 }}</td>
                  <td>{{ item.profit_u_6 }}</td>
                  <td>{{ item.profit_u_7 }}</td>
                  <td>{{ item.profit_u_8 }}</td>
                  <td>{{ item.profit_u_9 }}</td>
                  <td>{{ item.profit_u_10 }}</td>
                  <td>
                    <a class="remove-product" href="#" @click="removeDiscount(item.id)"><i class="lni lni-close" /></a>
                    <a class="edit-product" href="#" @click="editDiscount(item.id, index)"><i class="lni lni-pencil" /></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="card user-data-card">
              <div class="card-body">
                <form @submit.prevent="insertDiscount()">
                  <div class="row">
                    <div class="col-md-12 col-12 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>عنوان</span>
                      </div>
                      <textarea v-model="formData.descriptionModal" class="form-control" cols="4" />
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>مبلغ تخفیف</span>
                      </div>
                      <input v-model="formData.discount" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود شرکت</span>
                      </div>
                      <input v-model="formData.dcModal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر</span>
                      </div>
                      <input v-model="formData.duModal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود معرف</span>
                      </div>
                      <input v-model="formData.drModal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود مسئول اجرایی</span>
                      </div>
                      <input v-model="formData.drpModal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر 1</span>
                      </div>
                      <input v-model="formData.du1Modal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر 2</span>
                      </div>
                      <input v-model="formData.du2Modal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر 3</span>
                      </div>
                      <input v-model="formData.du3Modal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر4 </span>
                      </div>
                      <input v-model="formData.du4Modal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر 5</span>
                      </div>
                      <input v-model="formData.du5Modal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر 6</span>
                      </div>
                      <input v-model="formData.du6Modal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر 7</span>
                      </div>
                      <input v-model="formData.du7Modal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر 8</span>
                      </div>
                      <input v-model="formData.du8Modal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر 9</span>
                      </div>
                      <input v-model="formData.du9Modal" class="form-control" type="text">
                    </div>
                    <div class="col-md-6 col-6 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>سود کاربر 10</span>
                      </div>
                      <input v-model="formData.du10Modal" class="form-control" type="text">
                    </div>
                  </div>
                  <div class="separator-small" />
                  <button class="btn btn-success w-100" type="submit">
                    ثبت اطلاعات
                  </button>
                </form>
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
        showModalDiscount: false,
        descriptionModal: null,
        discount: null,
        dcModal: null,
        duModal: null,
        drModal: null,
        drpModal: null,
        du1Modal: null,
        du2Modal: null,
        du3Modal: null,
        du4Modal: null,
        du5Modal: null,
        du6Modal: null,
        du7Modal: null,
        du8Modal: null,
        du9Modal: null,
        du10Modal: null,
        insert: 0
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
      status: 1,
      id: this.$route.params.id
    }
  },
  watch: {
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    formDataV.append('shop_id', this.id)
    axios
      .post('https://karjico.ir/api/admin/shop/edit', formDataV,
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
        thisData.formData.shopDiscount = response.data.data.shopDiscount
        thisData.categoryId = response.data.data.categoryId
        thisData.shopUserId = response.data.data.shopUserId
        thisData.responsibleUserId = response.data.data.responsibleUserId
        thisData.cityId = response.data.data.cityId
        thisData.provinceId = response.data.data.provinceId
        thisData.formData.loading = false
        thisData.shopName = response.data.data.shop.title
        thisData.phone = response.data.data.shop.phone
        thisData.clockSupport = response.data.data.shop.clock_support
        thisData.daySupport = response.data.data.shop.day_support
        thisData.image = response.data.data.shop.image
        thisData.description = response.data.data.description
        thisData.products = response.data.data.shop.Products
        thisData.possibilities = response.data.data.shop.Possibilities
        thisData.address = response.data.data.shop.address
        thisData.conditions = response.data.data.shop.Conditions
        thisData.status = response.data.data.shop.status
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
      const formDataInfo = this.formData
      this.formData.loading = true
      const thisData = this
      // const routerData = this.$router
      const formDataV = new FormData()
      const image = this.image
      formDataV.append('shop_user_id', this.shopUserId)
      formDataV.append('token', localStorage.token)
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
      formDataV.append('status', this.status)
      formDataV.append('shop_id', this.id)
      axios
        .post('https://karjico.ir/api/admin/shop/update', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          // const id = response.data.data.requestInfo
          thisData.$toast.show('به روزرسانی انجام شد', {
            position: 'bottom-center',
            type: 'success',
            theme: 'bubble',
            duration: 7000
          })
          thisData.formData.loading = false
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
    insertDiscount () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('shop_id', this.id)
      formDataV.append('insert', this.formData.insert)
      formDataV.append('profit_u_10', this.formData.du10Modal)
      formDataV.append('profit_u_9', this.formData.du9Modal)
      formDataV.append('profit_u_8', this.formData.du8Modal)
      formDataV.append('profit_u_7', this.formData.du7Modal)
      formDataV.append('profit_u_6', this.formData.du6Modal)
      formDataV.append('profit_u_5', this.formData.du5Modal)
      formDataV.append('profit_u_4', this.formData.du4Modal)
      formDataV.append('profit_u_3', this.formData.du3Modal)
      formDataV.append('profit_u_2', this.formData.du2Modal)
      formDataV.append('profit_u_1', this.formData.du1Modal)
      formDataV.append('profit_reference', this.formData.drModal)
      formDataV.append('profit_user', this.formData.duModal)
      formDataV.append('profit_rsponsible', this.formData.drpModal)
      formDataV.append('profit_company', this.formData.dcModal)
      formDataV.append('discount', this.formData.discount)
      formDataV.append('description', this.formData.descriptionModal)
      axios
        .post('https://karjico.ir/api/admin/shop/insertDiscount', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.shopDiscount = response.data.data.shopDiscount
          formDataInfo.insert = 0
          formDataInfo.loading = false
          thisData.formData.descriptionModal = ''
          thisData.formData.dcModal = ''
          thisData.formData.drpModal = ''
          thisData.formData.discount = ''
          thisData.formData.drModal = ''
          thisData.formData.duModal = ''
          thisData.formData.du1Modal = ''
          thisData.formData.du2Modal = ''
          thisData.formData.du3Modal = ''
          thisData.formData.du4Modal = ''
          thisData.formData.du5Modal = ''
          thisData.formData.du6Modal = ''
          thisData.formData.du7Modal = ''
          thisData.formData.du8Modal = ''
          thisData.formData.du9Modal = ''
          thisData.formData.du10Modal = ''
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
    removeDiscount (id) {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('shop_id', this.id)
      formDataV.append('discountId', id)
      axios
        .post('https://karjico.ir/admin/shop/removeDiscount', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.shopDiscount = response.data.data.shopDiscount
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
    editDiscount (id, key) {
      this.auction_description_id = id
      this.formData.descriptionModal = this.formData.shopDiscount[key].description
      this.formData.dcModal = this.formData.shopDiscount[key].profit_company
      this.formData.drpModal = this.formData.shopDiscount[key].profit_rsponsible
      this.formData.discount = this.formData.shopDiscount[key].discount
      this.formData.drModal = this.formData.shopDiscount[key].profit_reference
      this.formData.duModal = this.formData.shopDiscount[key].profit_user
      this.formData.du1Modal = this.formData.shopDiscount[key].profit_u_1
      this.formData.du2Modal = this.formData.shopDiscount[key].profit_u_2
      this.formData.du3Modal = this.formData.shopDiscount[key].profit_u_3
      this.formData.du4Modal = this.formData.shopDiscount[key].profit_u_4
      this.formData.du5Modal = this.formData.shopDiscount[key].profit_u_5
      this.formData.du6Modal = this.formData.shopDiscount[key].profit_u_6
      this.formData.du7Modal = this.formData.shopDiscount[key].profit_u_7
      this.formData.du8Modal = this.formData.shopDiscount[key].profit_u_8
      this.formData.du9Modal = this.formData.shopDiscount[key].profit_u_9
      this.formData.du10Modal = this.formData.shopDiscount[key].profit_u_10
      this.formData.insert = this.formData.shopDiscount[key].id
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
select{
  color: #000!important;
}
</style>
