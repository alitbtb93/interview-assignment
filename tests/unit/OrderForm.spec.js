import { mount } from "@vue/test-utils";
import OrderForm from "@/components/OrderForm.vue";
import OrderService from "../../src/services/OrderService";

describe("OrderForm.vue", () => {
  it("should set price input value and amount input value when props are provided", () => {
    const wrapper = mount(OrderForm, {
      propsData: {
        chosenPrice: 20000,
        chosenAmount: 200,
      },
    });
    const amountInputValue = wrapper.find("#amount-input input").element.value;
    const priceInputValue = wrapper.find("#price-input input").element.value;
    expect(amountInputValue).toBe("200");
    expect(priceInputValue).toBe("20000");
  });

  it("should show error message when api request fails", async () => {
    const wrapper = mount(OrderForm);
    await wrapper.setData({
      amount: 20,
      price: 100,
    });
    jest.spyOn(OrderService, "sendOrder").mockImplementation(() => {
      throw Error;
    });
    await wrapper.find("#buy-button").trigger("click");
    expect(wrapper.text()).toContain("Something happens wrong!");
  });
});
