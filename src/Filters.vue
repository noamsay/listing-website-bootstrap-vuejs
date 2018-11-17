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
                <input type="radio" value="accending" v-model="dateFilter">
                <label for="accending"> Accending</label>
              </b-col>
              <b-col>
                <input type="radio" value="decending" v-model="dateFilter">
                <label for="decending"> Decending</label>
              </b-col>
          </b-row>
      <br><br>
  </div>
</template>

<script>
export default {
  name: "filters",
  data() {
    return {
      searchText: "",
      availableTopics: [
        { text: "New", value: "new" },
        { text: "Analysis", value: "analysis" },
        { text: "Report", value: "report" },
        { text: "Opinion", value: "opinion" },
        { text: "Audio/Visual", value: "audio/Visual" }
      ],
      availableLens: [
        { value: null, text: 'Please select an option' },
        { value: '12', text: 'Second' },
        { value: '34', text: 'Third' },
        { value: '56', text: 'Fourth' },
      ],
      availablePublications: [
        { value: null, text: 'Please select a publication' },
        { value: '12', text: 'Second' },
        { value: '34', text: 'Third' },
        { value: '56', text: 'Fourth' },
      ],
      selectedTopics: [],
      dateFilter: "accending",
      selectedLens: null,
      selectedPublication: null,
    };
  },
  methods: {},
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