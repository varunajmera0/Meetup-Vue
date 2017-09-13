import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import {store} from './store'
import DateFilter from './filters/date'
import AlertCmp from '../../shoppingcart/src/Shared/Alert.vue'
import EditMeetup from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDate from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTime from './components/Meetup/Edit/EditMeetupTimeDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup', EditMeetup)
Vue.component('app-edit-meetup-date', EditMeetupDate)
Vue.component('app-edit-meetup-time', EditMeetupTime)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyD_88HgN622wcqL6BOMU-PxuJsT1obdVEk',
      authDomain: 'vue-devmeetup-700c6.firebaseapp.com',
      databaseURL: 'https://vue-devmeetup-700c6.firebaseio.com',
      projectId: 'vue-devmeetup-700c6',
      storageBucket: 'vue-devmeetup-700c6.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
