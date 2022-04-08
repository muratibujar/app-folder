<template>
  <div id="app">

    <router-view/>

  </div>
</template>
<script>

import Cookies from "js-cookie";
import mutations from "@/store/mutations_types";
export default {
  name: "App",
  data() {
    return {
      deferredPrompt: null
    };
  },
  created() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // var element = document.getElementById('text');
    if (isMobile) {
      this[mutations.SER_BOTTOM_MENU_MOBILE](false);
      // element.innerHTML = "You are using Mobile";
    } else {
      this[mutations.SER_BOTTOM_MENU_MOBILE](true);
      // element.innerHTML = "You are using Desktop";
    }
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      if (Cookies.get("add-to-home-screen") === undefined) {
        this.deferredPrompt = e;
      }
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },

  methods: {

    async dismiss() {
      Cookies.set("add-to-home-screen", null, { expires: 15 });
      this.deferredPrompt = null;
    },
    async install() {
      this.deferredPrompt.prompt();
    }
  }
};
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: white

  }
  .centered {
    display: flex;
    justify-content: center;
    align-items: center
  }

  .loader svg{
    /*svg {*/
    animation: rotate linear 3s infinite;
    /*}*/
  }

  .msg_error{
    color: red;
  }
</style>
