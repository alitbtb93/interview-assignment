import { shallowMount } from "@vue/test-utils";
import OrderBook from "@/components/OrderBook";
import PriceSeparator from "@/common/PriceSeparator";
import Vue from "vue";

const mockOrders = [
  {
    side: "sell",
    amount: 20,
    price: 200,
  },
  {
    side: "buy",
    amount: 100,
    price: 300,
  },
  {
    side: "buy",
    amount: 30,
    price: 150,
  },
  {
    side: "buy",
    amount: 30,
    price: 200,
  },
  {
    side: "sell",
    amount: 40,
    price: 300,
  },
  {
    side: "sell",
    amount: 40,
    price: 450,
  },
];

const buyOrders = [
  {
    amount: 100,
    price: 300,
  },
  {
    amount: 30,
    price: 200,
  },
  {
    amount: 30,
    price: 150,
  },
];

const groupBuyOrders = [
  {
    amount: 100,
    price: 300,
  },
  {
    amount: 60,
    price: 200,
  },
];

const sellOrders = [
  {
    amount: 40,
    price: 450,
  },
  {
    amount: 40,
    price: 300,
  },
  {
    amount: 20,
    price: 200,
  },
];

const groupSellOrders = [
  {
    amount: 40,
    price: 500,
  },
  {
    amount: 0,
    price: 400,
  },
  {
    amount: 60,
    price: 300,
  },
];

Vue.filter("PriceSeparator", PriceSeparator);

describe("OrderBook", () => {
  it("should set sell and buy orders based on given orders", async () => {
    const wrapper = shallowMount(OrderBook);
    await wrapper.setData({
      orders: mockOrders,
    });
    expect(wrapper.vm.buyOrdersGroupBy).toStrictEqual([...buyOrders]);
    expect(wrapper.vm.sellOrdersGroupBy).toStrictEqual([...sellOrders]);
  });

  it("should group set sell and buy orders based on groupByNumber", async () => {
    const wrapper = shallowMount(OrderBook);
    await wrapper.setData({
      orders: mockOrders,
      groupByNumber: 100,
    });
    expect(wrapper.vm.buyOrdersGroupBy).toStrictEqual([...groupBuyOrders]);
    expect(wrapper.vm.sellOrdersGroupBy).toStrictEqual([...groupSellOrders]);
  });
});
