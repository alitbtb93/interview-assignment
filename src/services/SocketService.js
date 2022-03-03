import { APIS } from "@/common/constants";

export default {
  createWebsocket() {
    return new WebSocket(APIS.SOCKET, "protocolOne");
  },
};
