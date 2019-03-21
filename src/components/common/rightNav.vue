<template>
	<div class="right-nav">
		<ul>
			<li>
				<i class="icon iconfont icon-kafei"></i>
				<div>收银</div>
			</li>
			<li>
				<i class="icon iconfont icon-dianpu"></i>
				<div>店铺</div>
			</li>
			<li>
				<i class="icon iconfont icon-goumai"></i>
				<div>商品</div>
			</li>
			<li>
				<i class="icon iconfont icon-haodapai"></i>
				<div>会员</div>
			</li>
			<li>
				<i class="icon iconfont icon-liebiao"></i>
				<div>统计</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'rightNav',
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped="scoped">
.right-nav{
	color: #fff;
	font-size: 18px;
	float: right;
	width: 5%;
	height:100%;
	background-color: #13CE66;
}
.iconfont{
	font-size: 24px;
}
.right-nav ul{
	padding: 0px;
	margin: 0px;
}
.right-nav li{
	text-align: center;
	padding: 20px;
	list-style: none;
	border-bottom: 1px solid red;
}
</style>
