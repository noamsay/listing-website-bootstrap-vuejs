<template>
  <div>
      <b-container>
          <b-row>
              <b-col>
                  <h1>
                      {{currentListing.fields['Title/Topic']}}
                  </h1>
              </b-col>
          </b-row>
          <b-row>
              <b-col sm="8">
                   <b-img :src="getImageUrl()" fluid alt="Responsive image" />
              </b-col>
              <b-col sm="4">
                  <h1>Description</h1>
                  <p>{{currentListing.fields.Clipping}}</p>
                  <ul>
                      <li>{{currentListing.fields['Date Added']}}</li>
                      <li>{{currentListing.fields['Lens-str']}}</li>
                      <li>{{currentListing.fields['Link 1']}}</li>
                  </ul>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Card",
  data() {
    return {
        id: null,
        listings: []
    };
  },
  computed: {
      currentListing() {
          return this.listings[this.listings.findIndex(x => x.id === this.id)];
      }
  },
  mounted() {
      this.id = this.$route.params.id;
      this.getListings();
  },
  methods: {
      getListings(){
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
      getImageUrl(){
        if(this.currentListing.fields.Attachment !== null)
            return this.currentListing.fields.Attachment[0].thumbnails.large.url
        else
            return 'https://picsum.photos/600/300/?image=25'
    },
  }
};
</script>
