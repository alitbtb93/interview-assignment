<template functional>
  <div class="loading loading--1">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "AppLoading",

  functional: true,
};
</script>

<style scoped>
.loading {
  display: inline-block;
  position: absolute;
  width: 2.5rem;
  height: 0.625rem;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 9;
}
.loading div {
  position: absolute;
  top: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: white;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loading-1 div {
  background: #efefef;
}
.loading div:nth-child(1) {
  left: 0.25rem;
  animation: lds-ellipsis1 0.6s infinite;
}
.loading div:nth-child(2) {
  left: 0.25rem;
  animation: lds-ellipsis2 0.6s infinite;
}
.loading div:nth-child(3) {
  left: 1rem;
  animation: lds-ellipsis2 0.6s infinite;
}
.loading div:nth-child(4) {
  left: 1.75rem;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(12px, 0);
  }
}
</style>
