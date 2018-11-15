<template>
  <div>
      <b-container>
        <b-row>
          <b-col sm="12">
            <filters @searched="searchIt" @topicSelected="topicSelected" @dateFilter="dateFilter"></filters>
          </b-col>
        </b-row>
        <b-row>
            <b-col sm="4" v-for="(listing, i) in filteredListings" :key="i" @click="openListing(i)">
                <b-card :title="listing.fields['Title/Topic'].substring(0,20)"
                    :img-src="getImageUrl(i)"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
                    <p class="card-text">
                        {{listing.fields.Clipping.substring(0, 50)}}
                    </p>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import Filters from './Filters.vue';
import moment from 'moment'
export default {
  name: "Cards",
  components: {Filters},
  data() {
    return {
      listings: [],
      searchQuery: '',
      selectedTopics: [],
      datefilter: 'accending',
    };
  },
  computed: {
    filteredListings () {
      let filtered = this.listings;
      if(this.datefilter === 'accending'){
        filtered = filtered.sort((a,b) => {
          return moment(a.fields['Date Added']) > moment(b.fields['Date Added']);
        });
      }else if(this.datefilter === 'decending'){
        filtered = filtered.sort((a,b) => {
          return moment(a.fields['Date Added']) < moment(b.fields['Date Added']);
        });
      }
      if(this.searchQuery.length > 0) {
        filtered = this.listings.filter(x => x.fields['Title/Topic'].toLowerCase().trim().indexOf(this.searchQuery.toLowerCase().trim()) !== -1);
      }
      if(this.selectedTopics.length > 0) {
        filtered = filtered.filter(x => x.fields.Type && x.fields.Type.some(r => this.selectedTopics.includes(r.toLowerCase())));
      }
      return filtered;
    }
  },
  mounted() {
    this.loadListings();
  },
  methods: {
    searchIt (searchText){
      this.searchQuery = searchText;
    },
    topicSelected (selectedTopics){
      this.selectedTopics = selectedTopics;
    },
    dateFilter (filter) {
      this.datefilter = filter;
    },
    loadListings(){
      var self = this;
      var app_id = "app838WoUK7gksAto";
      var app_key = "key4hPsF3lTzceL6g";
      axios.get(
          "https://api.airtable.com/v0/"+app_id+"/Weekly%20Report?maxRecords=50&view=Main%20View",
          {
              headers: { Authorization: "Bearer "+app_key }
          }
      ).then(function(response){
        console.log(response.data.records);
        self.listings = response.data.records;
      }).catch(function(error){
        console.log(error)
      });
    },
    getImageUrl(id){
        if(this.listings[id].fields.Attachment)
            return this.listings[id].fields.Attachment[0].thumbnails.large.url
        else
            return 'https://picsum.photos/600/300/?image=25'
    },
    openListing(id){
        this.$router.push({ name: 'Listing', params: { id: this.listings[id].id }})
    }
  }
};
</script>