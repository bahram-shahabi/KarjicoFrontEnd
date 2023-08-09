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
                  ایجاد تبلیغ جدید
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
                      <i class="lni lni-pencil" /><span>عنوان</span>
                    </div>
                    <input v-model="title" class="form-control" type="text">
                  </div>
                  <div class="col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>توضیحات</span>
                    </div>
                    <textarea v-model="description" class="form-control" cols="4"></textarea>
                  </div>
                  <div class="col-6 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-user" /><span>تصویر اصلی</span>
                    </div>
                    <input class="form-control" type="file" accept="image/png, image/gif, image/jpeg" @change="handleImage1Upload">
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
      map: null,
      formData: ({
        loading: true,
        slider: null,
        user: null
      }),
      image: null,
      title: null,
      description: null,
      id: this.$route.params.id
    }
  },
  watch: {
  },
  created () {
    this.formData.loading = true
    const thisData = this
    const formDataInfo = this.formData
    // const routerData = this.$router
    const formDataV = new FormData()
    formDataV.append('id', this.id)
    axios
      .post('https://karjico.ir/api/admin/adv/edit', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        // const id = response.data.data.requestInfo
        thisData.formData.loading = false
        thisData.title = response.data.data.adv.title
        thisData.description = response.data.data.adv.description
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
  methods: {
    handleImage1Upload (e) {
      this.image = e.target.files[0]
    },
    validateData () {
      this.registerRequest()
    },
    registerRequest () {
      this.formData.loading = true
      const thisData = this
      // const routerData = this.$router
      const formDataV = new FormData()
      const image = this.image
      const title = this.title
      formDataV.append('user_id', localStorage.userId)
      formDataV.append('token', localStorage.token)
      formDataV.append('image', image)
      formDataV.append('title', title)
      formDataV.append('description', this.description)
      formDataV.append('id', this.id)
      axios
        .post('https://dbsa.ir/api/admin/adv/update', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        .then(function (response) {
          // const id = response.data.data.requestInfo
          thisData.formData.loading = false
          thisData.title = response.data.data.adv.title
          thisData.description = response.data.data.adv.description
          // routerData.push({ name: 'slider-id', params: { id } })
        })
        .catch(function (error) {
          console.log(error)
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
