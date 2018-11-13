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
              <b-col sm="12">
                <b-form-group label="Type">
                    <b-row>
                        <b-col v-for="(topic, i) in availableTopics" :key="i">
                            <input type="checkbox" :value="topic.value" v-model="selectedTopics"> {{topic.text}}
                        </b-col>
                    </b-row>
                </b-form-group>
              </b-col>
          </b-row>
          <br>
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
      searchText: '',
      availableTopics: [{text: 'New', value: 'new'},
        {text: 'Analysis', value: 'analysis'},
        {text: 'Report', value: 'report'},
        {text: 'Opinion', value: 'opinion'},
        {text: 'Audio/Visual', value: 'audio/Visual'}],
      selectedTopics: [],
      dateFilter: 'accending',
    };
  },
  methods: {},
  watch: {
      searchText () {
          this.$emit('searched', this.searchText);
      },
      selectedTopics () {
          this.$emit('topicSelected', this.selectedTopics);
      },
      dateFilter () {
          this.$emit('dateFilter', this.dateFilter);
      }
  }
};
</script>