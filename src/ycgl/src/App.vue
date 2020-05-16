<template>
  <router-view/>
</template>

<style lang="scss">
  html,body {
    font-size: 12px;
    color: #666;
    background-color: #fafafa;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6, p, ul, ol, dl, dd{
    margin: 0;
  }

  ul,ol { padding: 0; }

  a {
    text-decoration: none;
    color: #5392FF;
    cursor: pointer;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .ar-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    flex: 1 0 auto;
    box-sizing: border-box;
    flex-basis: auto;
    min-width: 0;
    &.is-vertical { flex-direction: column }
  }
  .ar-main {
    display: block;
    flex: 1;
  }
  .ar-aside{
    width: 220px;
  }
  .ar-right {
    width: 390px;
  }
  .ar-aside,
  .ar-main {
    overflow: auto;
  }
  .ar-main,
  .ar-aside,
  .ar-header,
  .ar-footer {  
    flex-shrink: 0;
    box-sizing: border-box;
  }
  // .ar-right .el-input__inner{
  //   width: 220px!important;
  //   border: none;
  //   background-color: #FAFAFA;
  // }
</style>
