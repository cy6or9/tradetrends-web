<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">TradeTrends - Real-time US Stock Prices</h1>

    <!-- Filters -->
    <div class="row mb-3">
      <div class="col-md-3">
        <label for="sector">Sector:</label>
        <select v-model="filters.sector" class="form-select" @change="filterStocks">
          <option value="">All</option>
          <option v-for="sector in uniqueSectors" :key="sector" :value="sector">{{ sector }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="marketCap">Market Cap:</label>
        <select v-model="filters.marketCap" class="form-select" @change="filterStocks">
          <option value="">All</option>
          <option value="large">Large Cap</option>
          <option value="mid">Mid Cap</option>
          <option value="small">Small Cap</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="ratingSource">Rating Source:</label>
        <select v-model="filters.ratingSource" class="form-select" @change="filterStocks">
          <option value="">All</option>
          <option v-for="source in uniqueRatingSources" :key="source" :value="source">{{ source }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="priceSort">Sort by Price:</label>
        <button class="btn btn-primary w-100" @click="togglePriceSort">
          {{ priceSortAscending ? 'Ascending' : 'Descending' }}
        </button>
      </div>
    </div>

    <!-- Stock Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Name</th>
          <th>Sector</th>
          <th>Market Cap</th>
          <th>Price</th>
          <th>Rating Source</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in filteredStocks" :key="stock.symbol">
          <td>{{ stock.symbol }}</td>
          <td>{{ stock.name }}</td>
          <td>{{ stock.sector }}</td>
          <td>{{ stock.marketCap }}</td>
          <td>${{ stock.price.toFixed(2) }}</td>
          <td>{{ stock.ratingSource }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      stocks: [],
      filters: {
        sector: "",
        marketCap: "",
        ratingSource: "",
      },
      priceSortAscending: true,
    };
  },
  computed: {
    uniqueSectors() {
      return [...new Set(this.stocks.map(stock => stock.sector))];
    },
    uniqueRatingSources() {
      return [...new Set(this.stocks.map(stock => stock.ratingSource))];
    },
    filteredStocks() {
      let filtered = [...this.stocks];

      if (this.filters.sector) {
        filtered = filtered.filter(stock => stock.sector === this.filters.sector);
      }
      if (this.filters.marketCap) {
        filtered = filtered.filter(stock => stock.marketCap === this.filters.marketCap);
      }
      if (this.filters.ratingSource) {
        filtered = filtered.filter(stock => stock.ratingSource === this.filters.ratingSource);
      }

      return filtered.sort((a, b) => 
        this.priceSortAscending ? a.price - b.price : b.price - a.price
      );
    }
  },
  methods: {
    fetchStockData() {
      const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
      const url = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`;

      axios.get(url)
        .then(response => {
          this.stocks = response.data.map(stock => ({
            symbol: stock.symbol,
            name: stock.description || stock.symbol,
            sector: this.getSector(stock.symbol), // Placeholder function
            marketCap: this.getMarketCap(stock.symbol), // Placeholder function
            price: Math.random() * 500, // Replace with real price API
            ratingSource: this.getRatingSource(stock.symbol), // Placeholder function
          }));
        })
        .catch(error => console.error("Error fetching stock data:", error));
    },
    filterStocks() {
      // Filters are handled by computed properties
    },
    togglePriceSort() {
      this.priceSortAscending = !this.priceSortAscending;
    },
    getSector(symbol) {
      // Placeholder: Use actual sector API
      const sectors = ["Technology", "Finance", "Healthcare", "Energy"];
      return sectors[Math.floor(Math.random() * sectors.length)];
    },
    getMarketCap(symbol) {
      // Placeholder: Assign market cap randomly for now
      const caps = ["large", "mid", "small"];
      return caps[Math.floor(Math.random() * caps.length)];
    },
    getRatingSource(symbol) {
      // Placeholder: Assign rating sources randomly
      const sources = ["Analyst A", "Analyst B", "Analyst C"];
      return sources[Math.floor(Math.random() * sources.length)];
    }
  },
  mounted() {
    this.fetchStockData();
  }
};
</script>

<style scoped>
h1 {
  color: #17a2b8;
}
</style>
