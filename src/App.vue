<template>
  <div id="app">
    <div class="container">
      <div class="app-wrapper">
        <order-form
          class="app-wrapper__order-from"
          :chosenPrice="chosenPrice"
          :chosenAmount="chosenAmount"
        />
        <order-book
          @setPrice="setPrice"
          @setAmount="setAmount"
          class="app-wrapper__order-book"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OrderForm from "@/components/OrderForm";
import OrderBook from "@/components/OrderBook";

export default {
  name: "App",

  components: {
    OrderForm,
    OrderBook,
  },

  data() {
    return {
      chosenPrice: null,
      chosenAmount: null,
    };
  },

  methods: {
    setPrice(price) {
      this.chosenPrice = price;
    },

    setAmount(amount) {
      this.chosenAmount = amount;
    },
  },
};
</script>

<style>
@import "./assets/css/reset.css";

:root {
  --green: #2ecc71;
  --dark-green: #27ae60;
  --light-green: #2ecc711a;
  --red: #e74c3c;
  --dark-red: #c0392b;
  --light-red: #e74c3c1a;
  --cloud: #ecf0f1;
  --light-cloud: #f9fcfc;
  --silver: #f1f3fa;
}
html {
  font-size: 16px;
  font-family: sans-serif;
  background-color: var(--silver);
}
.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}
.app-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
  align-items: flex-start;
}
.app-wrapper__order-from {
  width: 100%;
}
.app-wrapper__order-book {
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@keyframes loading-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
  .app-wrapper {
    flex-direction: row;
    align-items: flex-start;
  }
  .app-wrapper__order-from {
    width: 50%;
  }
  .app-wrapper__order-book {
    width: 50%;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
</style>
