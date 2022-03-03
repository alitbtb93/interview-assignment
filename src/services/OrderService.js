import { fetchWrapper } from "@/common/FetchWrapper";
import { APIS } from "@/common/constants";

export default {
  sendOrder(data) {
    return fetchWrapper.post(APIS.INSERT_ORDER, data);
  },

  getOrders() {
    return fetchWrapper.get(APIS.GET_ORDER);
  },
};
