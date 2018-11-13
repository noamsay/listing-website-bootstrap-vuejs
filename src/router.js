import Router from 'vue-router'
import Cards from './Cards.vue'
import Card from './Card.vue'
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Listings',
      component: Cards
    },
    {
      path: '/listing/:id',
      name: 'Listing',
      component: Card
    }
  ]
})