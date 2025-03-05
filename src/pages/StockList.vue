<template>
    <div class="container mt-4">
      <h1>Stock List</h1>
      <div class="row">
        <div class="col-md-6" v-for="stock in stocks" :key="stock.symbol">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ stock.symbol }}</h5>
              <p class="card-text">Price: {{ stock.price }}</p>
              <p class="card-text">Change: {{ stock.change }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getStockData } from "../utils/api";
  
  export default {
    data() {
      return {
        stocks: [],
      };
    },
    async mounted() {
      this.stocks = await getStockData();
    },
  };
  </script>
  