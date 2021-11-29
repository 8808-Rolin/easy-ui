<template>
  <div id="app">
    <vue-particles
        color="#f5f8f9"
        :particleOpacity="0.7"
        :particlesNumber="120"
        shapeType="circle"
        :particleSize="3"
        linesColor="#8eaed0"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
      </vue-particles>
	<transition :name="transitionName">
		<router-view></router-view>
	</transition>
  </div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				transitionName: 'slide-left'
			}
		},
		watch: {
		    //使用watch 监听$router的变化
		    $route(to, from) {
		      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
		      if (to.meta.index > from.meta.index) {
		        //设置动画名称
		        this.transitionName = "slide-right";
		      } else {
		        this.transitionName = "slide-left";
		      }
		    },
		  },
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
	}
	
	.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
	      will-change: transform;
	      transition: all 500ms;
	      /* position: absolute; */
	    }
	
	    .slide-right-enter {
	      opacity: 0;
	      transform: translate3d(-100%, 0, 0);
	    }
	
	    .slide-right-leave-active {
	      opacity: 0;
	      transform: translate3d(100%, 0, 0);
	    }
	
	    .slide-left-enter {
	      opacity: 0;
	      transform: translate3d(100%, 0, 0);
	    }
	
	    .slide-left-leave-active {
	      opacity: 0;
	      transform: translate3d(-100%, 0, 0);
	    }
		
		 #particles-js{
		    width: 100%;
		    height: 100%;
		    position: fixed;   /* //设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景 */
			z-index: 0;
		}
</style>
