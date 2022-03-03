<template>
  <div class="app-table">
    <table class="app-table__content">
      <thead class="app-table__header">
        <tr>
          <th
            v-for="(heading, index) in headings"
            :key="index"
            class="app-table__heading"
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'app-table__row--sell': type === 'sell' }"
          class="app-table__row"
        >
          <td
            v-for="([key, value], index) in Object.entries(item)"
            :key="index"
            :class="{
              'app-table__data-cell-price--sell':
                key === 'price' && type === 'sell',
              'app-table__data-cell-price': key === 'price',
            }"
            @click="setItem(item, key)"
            class="app-table__data-cell"
          >
            {{ value | priceSeparator }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AppTable",

  props: {
    headings: {
      type: Array,
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },

    type: {
      type: String,
      required: false,
      default: "buy",
    },
  },

  methods: {
    setItem(item, key) {
      if (key === "price") {
        this.$parent.$emit("setPrice", item.price);
      } else {
        this.$parent.$emit("setAmount", item.amount);
      }
    },
  },
};
</script>

<style scoped>
.app-table {
  max-height: 13.5625rem;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  position: relative;
}
.app-table__content {
  width: 100%;
}
.app-table__header {
  background-color: var(--cloud);
  position: sticky;
  top: 0;
}
.app-table__heading {
  padding: 0.5rem;
  font-size: 0.875rem;
}
.app-table__row {
  cursor: pointer;
}
.app-table__row:nth-child(even) {
  background-color: var(--light-cloud);
}
.app-table__row:hover {
  background-color: var(--light-green);
}
.app-table__row--sell:hover {
  background-color: var(--light-red);
}
.app-table__data-cell {
  padding: 0.5rem;
  font-size: 0.875rem;
  border: solid 1px var(--cloud);
  text-align: center;
}
.app-table__data-cell-price {
  color: var(--dark-green);
  font-weight: 600;
}
.app-table__data-cell-price--sell {
  color: var(--dark-red);
}
</style>
