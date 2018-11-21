<template>
  <div>
        <h1>Filters</h1>
        <b-row>
            <b-col sm="12">
               <b-form-input
                   type="text"
                      v-model="searchText"
                      placeholder="Search">
                  </b-form-input>
              </b-col>
          </b-row>
          <br>
          <b-row>
              <b-col sm="6">
                <b-form-select
                      :options="availableLens"
                      required
                      v-model="selectedLens">
                </b-form-select>
              </b-col>
              <b-col sm="6">
                <b-form-select
                      :options="availablePublications"
                      required
                      v-model="selectedPublication">
                </b-form-select>
              </b-col>
          </b-row>
          <br>
          <h3>Type</h3>
          <b-row>
              <b-col sm="12">
                <b-form-group>
                    <b-row>
                        <b-col v-for="(topic, i) in availableTopics" :key="i">
                            <input type="checkbox" :value="topic.value" v-model="selectedTopics"> {{topic.text}}
                        </b-col>
                    </b-row>
                </b-form-group>
              </b-col>
          </b-row>
          <br>
          <h3>Date</h3>
          <b-row>
              <b-col>
                <input type="radio" value="decending" v-model="dateFilter">
                <label for="decending"> Descending</label>
              </b-col>
              <b-col>
                <input type="radio" value="accending" v-model="dateFilter">
                <label for="accending"> Ascending</label>
              </b-col>
          </b-row>
      <br><br>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "filters",
  data() {
    return {
      searchText: "",
      availableTopics: [
      ],
      availableLens: [
        { value: null, text: 'Please select a lense' },
      ],
      availablePublications: [
        { value: null, text: 'Please select a publication' },
      ],
      selectedTopics: [],
      dateFilter: "decending",
      selectedLens: null,
      selectedPublication: null,
    };
  },
  mounted() {
    this.getLenses();
    this.getPublications();
    this.getTypes();
  },
  methods: {
    getLenses(){
      var self = this;
      var app_id = "app838WoUK7gksAto";
      var app_key = "key4hPsF3lTzceL6g";
      axios.get(
          "https://api.airtable.com/v0/"+app_id+"/Lenses",
          {
              headers: { Authorization: "Bearer "+app_key }
          }
      ).then(function(response){
        response.data.records.forEach(element => {
          self.availableLens.push({text: element.fields.Name, value: element.fields.Name})
        });
      }).catch(function(error){
        console.log(error)
      });
    },
    getPublications(){
      var self = this;
      var app_id = "app838WoUK7gksAto";
      var app_key = "key4hPsF3lTzceL6g";
      axios.get(
          "https://api.airtable.com/v0/"+app_id+"/Sources",
          {
              headers: { Authorization: "Bearer "+app_key }
          }
      ).then(function(response){
        console.log(response.data.records);
        response.data.records.forEach(element => {
          self.availablePublications.push({text: element.fields.Name, value: element.id})
        });
      }).catch(function(error){
        console.log(error)
      });
    },
    getTypes(){
      var self = this;
      var app_id = "app838WoUK7gksAto";
      var app_key = "key4hPsF3lTzceL6g";
      axios.get(
          "https://api.airtable.com/v0/"+app_id+"/Type",
          {
              headers: { Authorization: "Bearer "+app_key }
          }
      ).then(function(response){
        console.log(response.data.records);
        response.data.records.forEach(element => {
          self.availableTopics.push({text: element.fields.Name, value: element.fields.Name})
        });
      }).catch(function(error){
        console.log(error)
      });
    }
  },
  watch: {
    searchText() {
      this.$emit("searched", this.searchText);
    },
    selectedTopics() {
      this.$emit("topicSelected", this.selectedTopics);
    },
    dateFilter() {
      this.$emit("dateFilter", this.dateFilter);
    },
    selectedLens() {
      this.$emit("lensSelected", this.selectedLens);
    },
    selectedPublication() {
      this.$emit("publicationSelected", this.selectedPublication);
    },
  }
};
</script>
