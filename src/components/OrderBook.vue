<template>
  <div v-if="orders.length" class="order-book">
    <h3 class="order-book__heading">Order Book</h3>
    <label class="order-book__label" for="price-group">Price Group:</label>
    <select
      class="order-book__form"
      v-model="groupByNumber"
      name="group size"
      id="price-group"
    >
      <option value="0">None</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="100">100</option>
    </select>
    <app-table :items="sellOrdersGroupBy" :headings="headings" :type="'sell'" />
    <p class="order-book__mark">MARK: {{ markPrice | priceSeparator }}</p>
    <app-table :items="buyOrdersGroupBy" :headings="headings" />
  </div>
</template>

<script>
import AppTable from "@/common/components/AppTable";
import SocketService from "@/services/SocketService";

export default {
  name: "OrderBook",

  components: {
    AppTable,
  },

  data() {
    return {
      headings: ["Price", "Amount"],
      groupByNumber: "0",
      orders: [],
    };
  },

  mounted() {
    this.connectWebsocket();
  },

  computed: {
    buyOrdersGroupBy() {
      const buyOrders = this.orders.filter((order) => order.side === "buy");
      const sortedBuyOrders = this.sortOrders(buyOrders);
      if (Number(this.groupByNumber)) {
        return this.groupBy(sortedBuyOrders);
      }
      return sortedBuyOrders;
    },

    sellOrdersGroupBy() {
      const sellOrders = this.orders.filter((order) => order.side === "sell");
      const sortedSellOrders = this.sortOrders(sellOrders);
      if (Number(this.groupByNumber)) {
        return this.groupBy(sortedSellOrders);
      }
      return sortedSellOrders;
    },

    markPrice() {
      //assuming best sell is highest sell and best buy is lowest buy
      const buyOrders = this.orders.filter((order) => order.side === "buy");
      const sortedBuyOrders = this.sortOrders(buyOrders);
      const sellOrders = this.orders.filter((order) => order.side === "sell");
      const sortedSellOrders = this.sortOrders(sellOrders);
      if (sortedBuyOrders.length && sortedSellOrders.length) {
        return (
          (sortedBuyOrders[sortedBuyOrders.length - 1].price +
            sortedSellOrders[0].price) /
          2
        );
      }
      return 0;
    },
  },

  methods: {
    groupBy(array) {
      const buyOrdersLength = array.length;
      let finalResults = [];
      let i = buyOrdersLength - 1;
      const priceInteger = Math.trunc(array[i].price);
      let maxPrice =
        priceInteger -
        (priceInteger % Number(this.groupByNumber)) +
        Number(this.groupByNumber);
      while (i >= 0) {
        let amountSum = 0;
        let j = i;
        while (j >= 0 && array[j].price <= maxPrice) {
          amountSum += array[j].amount;
          j--;
        }
        i = j;
        finalResults.unshift({
          price: maxPrice,
          amount: amountSum,
        });
        maxPrice += Number(this.groupByNumber);
      }
      return finalResults;
    },

    sortOrders(array) {
      return array
        .sort((a, b) => b.price - a.price)
        .map((order) => {
          return {
            price: Number(order.price.toFixed(2)),
            amount: Number(order.amount.toFixed(2)),
          };
        });
    },

    removeItems(array) {
      this.orders = this.orders.filter((order) => !array.includes(order.id));
    },

    insertItems(array) {
      this.orders.push(...array);
    },

    connectWebsocket() {
      const websocket = SocketService.createWebsocket();
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.existing) {
          this.orders = [...data.existing];
        }
        if (data.delete) {
          this.removeItems([...data.delete]);
        }
        if (data.insert) {
          this.insertItems([...data.insert]);
        }
      };
    },
  },
};
</script>

<style scoped>
.order-book {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem 0;
}
.order-book__heading {
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  padding: 0 1rem;
}
.order-book__mark {
  font-size: 0.875rem;
  padding: 1rem 2rem;
}
.order-book__form {
  margin-bottom: 0.5rem;
  width: 7.5rem;
  height: 1.5rem;
  cursor: pointer;
  margin-left: 0.5rem;
}
.order-book__label {
  font-size: 0.875rem;
  margin-left: 1rem;
}
</style>
