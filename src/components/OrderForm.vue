<template>
  <div class="order-form">
    <h3 class="order-from__heading">Order Form</h3>
    <app-input
      v-model="amount"
      :label="'Amount:'"
      :type="'number'"
      :min="0"
      id="amount-input"
      class="order-form__input"
    />
    <app-input
      v-model="price"
      :label="'Price:'"
      :min="0"
      :type="'number'"
      id="price-input"
    />
    <transition name="fade">
      <p
        v-if="orderResult.message"
        :class="{ 'order-form__message--error': !orderResult.success }"
        class="order-form__message"
      >
        {{ orderResult.message }}
      </p>
    </transition>
    <div class="order-form__buttons">
      <app-button
        :disabled="!Number(amount) || !Number(price)"
        :label="'Buy'"
        :theme="'green'"
        :loading="buyLoading"
        id="buy-button"
        class="order-form__button"
        @submit="submitOrder('buy')"
      />
      <app-button
        :disabled="!Number(amount) || !Number(price)"
        :label="'Sell'"
        :theme="'red'"
        :loading="sellLoading"
        id="sell-button"
        class="order-form__button"
        @submit="submitOrder('sell')"
      />
    </div>
  </div>
</template>

<script>
import AppInput from "@/common/components/AppInput";
import AppButton from "@/common/components/AppButton";
import OrderService from "@/services/OrderService";

export default {
  name: "OrderForm",

  components: { AppInput, AppButton },

  props: {
    chosenPrice: {
      type: Number,
      required: false,
    },
    chosenAmount: {
      type: Number,
      required: false,
    },
  },

  data() {
    return {
      amount: "",
      price: "",
      buyLoading: false,
      sellLoading: false,
      orderResult: {
        success: true,
        message: "",
      },
    };
  },

  watch: {
    chosenPrice: {
      immediate: true,
      handler(newValue) {
        this.price = newValue;
      },
    },

    chosenAmount: {
      immediate: true,
      handler(newValue) {
        this.amount = newValue;
      },
    },
  },

  methods: {
    async submitOrder(side) {
      const data = {
        side: side,
        price: Number(this.price),
        amount: Number(this.amount),
      };
      if (side === "buy") {
        this.buyLoading = true;
      } else {
        this.sellLoading = true;
      }
      this.orderResult.message = "";
      try {
        const response = await OrderService.sendOrder(data);
        this.orderResult.success = true;
        this.orderResult.message = `The order has been ${response.result}.`;
        if (response.result === "inserted") {
          this.orderResult.message += `Order id: ${response.order.id}`;
        }
        setTimeout(() => {
          this.orderResult.message = "";
        }, 4000);
      } catch (error) {
        console.log(error);
        this.orderResult.success = false;
        //Because we don't know the error structure we use a static error message.
        this.orderResult.message = "Something happens wrong!";
      } finally {
        this.buyLoading = false;
        this.sellLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.order-form {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem 1rem;
  box-sizing: border-box;
}
.order-from__heading {
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}
.order-form__input {
  margin-bottom: 1rem;
}
.order-form__buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
.order-form__message {
  font-size: 0.75rem;
  margin: 0.5rem 0;
  font-weight: 600;
  color: var(--dark-green);
}
.order-form__message--error {
  color: var(--dark-red);
}
</style>
