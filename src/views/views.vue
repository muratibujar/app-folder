<template>
<div style="height: 100vh">
  <div class="content-sidebar">

    <div class="content-qf">
      <router-view/>
    </div>
  </div>



</div>
</template>

<script>


export default {
  name: "views",

}
</script>

<style scoped lang="scss">
.content-sidebar{
  display: flex;
  width: 100%;
.content-qf{
  width: 100%;
  overflow-y: scroll;
  height: calc(100vh - 90px);
  background-color: white;
}

.sidebar{
  background-color: white;
  border-right: 1px solid #363435;
  height: calc(100vh - 90px);
}

}

@media only screen and (max-width: 820px) {
  /* For mobile phones: */
  [class*="col-"] {
    width: 100%;
  }

  .content-sidebar {
    flex-direction: column-reverse;
    .content-qf {
      height: calc(100vh - 160px);
      .wrapper {
        padding: 0 15px;
      }
    }

    .sidebar {
      // display:flex e kthen sidebarin ne footer per mobile
      display: flex;
      justify-content: center;
      height: 70px;
      background-color: #fdf8f4;
      border-right: 1px solid #cab779;
      background-color: #cab779;

    }

    .content-qf {
      //height: 70vh;
    }
  }
}
</style>
