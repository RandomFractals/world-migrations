<template>
  <md-card class="card list-card">
    <md-card-area md-inset>
      <md-card-header class="card-header">
        <div class="card-title md-title">{{ title }}</div>
        <div class="card-subtitle md-subhead">{{ subtitle }}</div>      
      </md-card-header>
      <md-card-content>
        <div id="data-list" class="list-container">
          <md-table md-sort="migrants">
            <md-table-header>
              <md-table-row>
                <md-table-head>country</md-table-head>
                <md-table-head md-numeric>migrants</md-table-head>
              </md-table-row>
            </md-table-header>
            <md-table-body>
              <md-table-row v-for="(row, index) in 20" :key="index">
                <md-table-cell>[country]</md-table-cell>
                <md-table-cell v-for="(col, index) in 1" :key="index" md-numeric>100</md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>
        </div>
      </md-card-content>
    </md-card-area>
  </md-card>
</template>

<script>
export default {
  name: 'listTable',
  data () {
    return {
      title: '[list title]',
      subtitle: '[subtitle]'
    }
  }
}
</script>

<style scoped>

/* List Table View styles */
.list-card {
  width: 240px;
}

.list-container {
  margin: 0px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;  
}

table {
	border-width: 1px;
	border-color: #666;
	border-collapse: collapse;
	border-style: solid;
	width: 100%;
}

th {
	background-color: #efefef;
  color: #333;
	font-size: 12px;
  font-weight: normal;	
}

td, th {
  font-size: 0.8em;
  padding: 5px;
	border-width: 1px;	
	border-color: #ddd;
	border-collapse: collapse;
	border-style: solid;		
  cursor: pointer;	
}

tr:hover {
	background-color: #ffffcc;
}

</style>
