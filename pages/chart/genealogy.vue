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
    <Header />
    <div class="page-content-wrapper direction-rtl">
      <div class="container">
        <!-- Profile Wrapper-->
        <div class="profile-wrapper-area py-3 ">
          <!-- User Information-->
          <div class="card user-info-card">
            <div class="card-body p-4 d-flex align-items-center">
              <div class="user-info">
                <p class="mb-0 text-dark">
                  ژنولوژی
                </p>
              </div>
            </div>
          </div>
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="card user-data-card">
            <div class="card-body">
              <div class="row">
                <router-link to="/chart/index11"  class="btn btn-success w-100" >
                  چارت 2
                </router-link>
                <router-link to="/chart/user"  class="btn btn-success w-100" >
                  کاربران زیر مجموعه
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import axios from 'axios'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

//  import router from "../router";
//  import router from "../router";
// import FlipCountdown from 'vue2-flip-countdown'
import Header from '../../components/sections/Header.vue'

Vue.use(VueSweetalert2)
export default {
  components: {
    // FlipCountdown,
    Header
  },
  data () {
    return {
      ds: [],
      username: null,
      selectUser: null,
      map: null,
      search: null,
      formData: ({
        loading: false,
        userData: [],
        userListData: [],
        type: [],
        perPage: 10,
        page: 1,
        current_page: 1,
        total: 1,
        last_page: 1
      })

    }
  },
  created () {
  },
  methods: {
  }

}

</script>
<style lang="scss">
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
.chartItem
{
  height: 130px;
  background: green;
  border-radius: 10px;
  text-align: center;
  color: #fff;
}
.chartItem span{
  color: #fff;
}
text-center {
  text-align: center;
  margin-bottom: 32px;
}
.node-title{
  background-color: #ff6565;
}
.node-content{
  background-color: #7cff7c;
  direction: rtl;
}
.custom-card {
  display: flex;
  align-items: center;
  width: 220px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 0 6px 2px rgba(#000, 0);
  transition: box-shadow .2s ease;

  &:hover {
    box-shadow: 0 0 6px 2px rgba(#000, .1);
  }

  &__image {
    flex: 0 0 auto;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #dedede;
    background-size: cover;
    background-position: 50%;
  }

  &__info {
    padding-left: 16px;
  }

  &__name {
    font-weight: 600;
  }

  &__age {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>
