<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h2>{{ userInfo.name }} 今年 {{ age }}岁, 在{{ city }}</h2>
    <div v-for="item in userInfo.fave" :key="item">{{ item }}</div> -->
    <div>{{ info }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    info:{
      type: Object
    }
  },
  // inject:['userInfo','age','cityFn'],
  computed:{
    // city(){
    //   return this.cityFn()
    // }
  },
  mounted(){
    setTimeout(()=>{
      this.info.name = 'lihuaihuai';
      this.msg = 'zzzzzzzzzzzz'
    },5000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
