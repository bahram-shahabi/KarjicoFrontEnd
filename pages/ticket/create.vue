<template>
  <div v-if="formData.loading">
    <p class="spinner-title">
      درحال لود شدن
    </p>
    <div class="spinner-border" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>
  <div v-else>
    <Header/>

    <div class="page-content-wrapper">
      <div class="container">
        <div class="pt-3">
          <div class="profile-wrapper-area py-3 direction-rtl">
            <div class="profile-wrapper-area py-3">
            <div class="card user-data-card">
              <div class="card-body">
                <div class="mb-3">
                  <div class="title mb-2">
                    <span>عنوان</span>
                  </div>
                  <input v-model="title" style="color: #000" class="form-control" type="text" />
                </div>
                <div class="mb-3">
                  <div class="title mb-2">
                    <span>توضیحات</span>
                  </div>
                  <textarea v-model="description" style="color: #000" class="form-control" type="text"> </textarea>
                </div>
                <button class="btn btn-success w-100" @click="saveDescription">
                  ثبت
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import axios from 'axios'

import Footer from '../../components/sections/Footer.vue'
import Header from '../../components/sections/Header.vue'

export default {
  components: {
    Header,
    Footer
  },

  data () {
    return {
      map: null,
      totalPrice: 0,
      formData: ({
        loading: false,
        ticketData: [],
        reply: []
      }),
      title: null,
      description: null,
      id: this.$route.params.id
    }
  },
  created () {
  },
  methods: {
    saveDescription () {
      this.formData.loading = true
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('title', this.title)
      formDataV.append('description', this.description)
      //  console.log(this.$route.params.serviceId);
      axios
        .post('https://karjico.ir/api/user/createMessage', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.$router.push({ path: '/ticket' })
          formDataInfo.loading = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.totalPrice {
  text-align: center;
  background: green;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 5px;
  color: #fff;
}
.service-title-1{
  color: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 10px;
  background-color: #002f00;
}
.service-title-1 p{
  color: #fff;
}
.service-title{
  margin-top: 10px;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 10px;
}
.service-title p{
  color: #fff;
}
</style>
