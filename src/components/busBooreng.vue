<script>
import { nextTick, onMounted, ref } from "vue";
import TWEEN, { Tween } from "@tweenjs/tween.js";

export default {
  name: "busBooreng",
  setup() {
    const ani = ref(false);
    let coords = { x: 0 };
    let coords2 = { x: 0 };
    const busBg = ref(undefined);
    const busBg2 = ref(undefined);

    const animation = time => {
      requestAnimationFrame(animation);
      TWEEN.update(time);
    };

    onMounted(() => {
      busBg.value = document.getElementById("buss-bg");
      busBg2.value = document.getElementById("buss-bg2");
      nextTick(() => {
        ani.value = true;
        let index = 0;

        const busTween2 = new Tween(coords2)
          .to({ x: 200 }, 2000)
          .onUpdate(() => {
            busBg2.value.style.setProperty("transform", `translateX(${coords2.x}%)`);
          })
          .onComplete(() => {
            console.log("complete busTween2");
          });

        const busTween = new Tween(coords)
          .to({ x: 200 }, 2000)
          .onUpdate(() => {
            busBg.value.style.setProperty("transform", `translateX(${coords.x}%)`);
          })
          .onComplete(() => {
            console.log("complete busTween1");
            busTween2.start();
          })
          .start();

        requestAnimationFrame(animation);
      });
    });
    return {
      ani,
    };
  },
};
</script>
<template>
  <section class="bus-booreng">
    <img id="buss-bg2" src="/assets/image/buss_bg.png" alt="버스배경2" />
    <img id="buss-bg" src="/assets/image/buss_bg.png" alt="버스배경" />
    <img id="buss" src="/assets/image/buss.png" alt="버스" />
  </section>
</template>

<style lang="scss">
.bus-booreng {
  top: 0;
  z-index: 100;
  position: fixed;
  height: 100vh;

  #buss-bg {
    position: fixed;
    height: 100vh;
    right: 0px;
    transform: translateX(0%);
    transition: all 5s linear;
  }

  #buss-bg2 {
    position: fixed;
    height: 100vh;
    right: 0px;
    transform: translateX(0%);
    transition: all 5s linear;
  }

  .active {
    transform: translateX(150%);
    transition: all 5s linear;
  }

  #buss {
    position: fixed;
    left: 50%;
    //transform: translateX(-50%);
    bottom: 50px;
  }
}
</style>
