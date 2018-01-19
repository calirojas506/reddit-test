<template lang="pug">
  #app.container-fluid
    .row
      .col-sm-12
        h1
          i.fa.fa-reddit-alien
          |&nbsp;Mr. Reddit
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  $vue-primary: #35495E;
  $vue-secondary: #41B883;

  body{
    background: $vue-primary;

    h1{
      color: #fff;
      margin: 20px 0;
    }
  }
  #app{

  }
</style>
