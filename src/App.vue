<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body{
  margin: 0 auto;
  background-color: #f7f7f7;
}

.one-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.auto-img{
  width: 100%;
  display: block;
}

</style>
