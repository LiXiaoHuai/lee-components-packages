<template>
    <div class="container" draggable="false" @mousedown="returnFalse">
        <div class="album" ref="album" @mousedown="returnFalse">
            <img src="../assets/img/1 - 副本 (1).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (2).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (3).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (4).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (5).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (6).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (7).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (8).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (9).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (10).jpg" alt="" width="150" height="200">
            <img src="../assets/img/1 - 副本 (11).jpg" alt="" width="150" height="200">
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    returnFalse (e) {
      e.preventDefault()
    }
  },
  mounted () {
    var album = this.$refs.album
    var imgs = this.$refs.album.children
    var len = imgs.length
    var unitDeg = 360 / len
    var newX, newY, lastX, lastY, minusX, minusY
    var rotX = 0
    var rotY = 0
    this.$nextTick(() => {
      Array.prototype.forEach.call(imgs, (it, i) => {
        it.style.transform = `rotateY(${i * unitDeg}deg) translateZ(300px)`
        it.style.transition = `1s ${(len - i) * 0.1}s`
        it.onmousedown = this.returnFalse
      })
      //   鼠标移动 相册旋转 改变album的transform 的rotateX 和 rotateY的值
      document.onmousedown = function (e) { // 鼠标点击事件
        lastX = e.clientX
        lastY = e.clientY
        this.onmousemove = (e) => { // 鼠标移动事件
          newX = e.clientX
          newY = e.clientY

          // 假设 并求值 两次鼠标移动的差值就是移动的距离 和相册旋转的角度成正比
          minusX = newX - lastX
          minusY = newY - lastY

          rotX += minusY
          rotY += minusX

          album.style.transform = `rotateX(${-rotX * 0.2}deg) rotateY(${rotY * 0.2}deg)`

          // 新的值用完之后就成了旧的值
          lastX = newX
          lastY = newY
        }
        this.onmouseup = () => { // 鼠标松开事件
          console.log('松开')
          this.onmousemove = null
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.container{
    height: 100%;
    background: black;
    perspective: 1000px;/*场景景深*/
    &:before{
        content: "";
        display: table;
    }
    .album{
        width: 150px;
        height: 200px;
        // border: solid 1px red;
        margin: 200px auto;
        position: relative;
        transform-style:preserve-3d; /*设置场景风格*/
        img{
            position: absolute;
            -webkit-box-reflect: below 5px -webkit-linear-gradient(top,rgba(250,250,250,0),rgba(250,250,250,.0) 30%,rgba(250,250,250,0.3));
        }
    }
}

</style>