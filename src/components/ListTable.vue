<template>
  <md-card class="card list-card">
    <md-card-area md-inset>
      <md-card-header class="card-header">
        <div class="card-title md-title">{{ title }}</div>
        <div class="card-subtitle md-subhead">{{ subtitle }}</div>      
      </md-card-header>
      <md-card-content>
        <div id="data-list" class="list-container">
          <table>
            <thead>
              <tr>
                <th>country</th>
                <th md-numeric>migrants</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in 20" :key="index">
                <td>[country]</td>
                <td v-for="(col, index) in 1" :key="index" md-numeric>100</td>
              </tr>
            </tbody>
          </table>
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
      title: 'Migrants',
      subtitle: 'All Countries'
    }
  }
}
</script>

<style>

/* List Table View styles */
.list-container {
  margin: 0px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
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
