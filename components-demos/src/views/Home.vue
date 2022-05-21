<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="show">
      <HelloWorld :msg="msg" :info="myUserInfo"/>
    </div>
    <button @click="clickBtn(1)">张三</button>
    <button @click="clickBtn(2)">李四</button>
    <div style="padding: 40px">
      <button @click="addHelloWorld">add</button>
      <button @click="show = !show">show</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { h, render } from "vue";
// import HelloWorld from "@/components/HelloWorld.vue";

 const HelloWorld = () => ({
      component: import( /* webpackChunkName:"HelloWorld" */ '@/components/HelloWorld.vue'),
      loading: '<div>loading...</div>',
      delay: 4000,
      timeout: 6000
    });

export default {
  name: "Home",
  components: {
    // HelloWorld,
    HelloWorld
  },
  provide() {
    return {
      userInfo: this.myUserInfo,
      cityFn: () => this.city,
      age: this.age //直接传值
    };
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      myUserInfo: {
        name: "lee",
        fave: [1, 2, 3]
      },
      age: 12,
      city: "北京",
      show: false
    };
  },
  mounted(){
    setTimeout(()=>{
      console.log('this.myUserInfo',this.myUserInfo,this.msg);
    },6000)
  },
  methods: {
    clickBtn(val) {
      if (val == 1) {
        this.myUserInfo.name = "张三";
        this.age = 24;
        this.city = "上海";
        this.myUserInfo.fave = [2, 3, 4];
      } else if (val == 2) {
        this.myUserInfo.name = "李四";
        this.age = 30;
        this.city = "深圳";
        this.myUserInfo.fave = [5, 6, 7];
      }
    },
    addHelloWorld() {
      // const HelloWorldConstructor = Vue.extend(HelloWorld);
      // let VNode = new HelloWorldConstructor();
      // VNode.msg = 'lihuai ';

      // 1.将div变成虚拟DOM
      // const VNode = h(HelloWorld,{
      //   msg: 'aaaaaaaaaaaaaaaaa'
      // });
      // // 2.创建div节点,并添加到页面中
      // const container = document.createElement('div');
      // document.body.appendChild(container);
      // // 3.渲染虚拟DOM到真实DOM
      // render(VNode,container);
    }
  }
};
</script>
