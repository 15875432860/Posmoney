<template>
	<div class="pos2">
		<div>
			<el-row>
				<el-col :span='5' class='pos-order'>
					我是订单
					<el-tabs>
						<el-tab-pane label='点餐'>
							<el-table :data="tableData" border show-summary style="width: 100%">
								<el-table-column prop="goodsName" label='商品'></el-table-column>
								<el-table-column prop='count' label='量' width='50'></el-table-column>
								<el-table-column prop='price' label='金额' width='70'></el-table-column>
								<el-table-column label='操作' width='150' fixed='right'>
									<template scope='scope'>
										<el-button type='text' size='small' @click='del(scope.row)'>删除</el-button>
										<el-button type='text' size='small' @click='ddd(scope.row)'>减少</el-button>
										<el-button type='text' size='small' @click='add(scope.row)'>增加</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label='222'>222</el-tab-pane>
						<el-tab-pane label='333'>333</el-tab-pane>
					</el-tabs>
					<div class="totalDiv">
						<p><small>数量：{{totalCount}} </small>&nbsp;&nbsp;<small>金额：{{totalMoney}}</small> </p>
					</div>
					<el-button type='warning'>挂</el-button>
					<el-button type='info' @click="delAll()">删除</el-button>
					<el-button type="success" @click='checkout()'>结账</el-button>
				</el-col>
				<el-col :span='17'>
					我是产品
					<div class="often-goods">
						<div class="title">产品</div>
						<div class="often-goods-list">
							<ul>
								<li v-for="goods in oftenGoods" @click="add(goods)">
									<span>{{goods.goodsName}}</span>
									<span class="o-price">${{goods.price}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="goods-type">
						<el-tabs>
							<el-tab-pane label='汉堡'>
								<ul class="cookList">
									<li v-for="goods in type0Goods" @click="add(goods)">
										<span class="foodImg">
											<img src="../../static/ji.jpg" width="100%">
										</span>
										 <span class="foodName">{{goods.goodsName}}</span>
										 <span class="foodPrice">￥{{goods.price}}元</span>
									</li>
								</ul>
							</el-tab-pane>
							<el-tab-pane label='饮料'>
								<ul class="cookList">
									<li v-for="goods in type1Goods" @click="add(goods)">
										<span class="foodImg">
											<img src="../../static/ji.jpg" width="100%">
										</span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">￥{{goods.price}}元</span>
									</li>
								</ul>
							</el-tab-pane>
							<el-tab-pane label='汉堡'>
								<ul class="cookList">
									<li v-for="goods in type2Goods" @click="add(goods)">
										<span class="foodImg">
											<img src="../../static/ji.jpg" width="100%">
										</span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">￥{{goods.price}}元</span>
									</li>
								</ul>
							</el-tab-pane>
							<el-tab-pane label='饮料'>
								<ul class="cookList">
									<li v-for="goods in type3Goods" @click="add(goods)">
										<span class="foodImg">
											<img src="../../static/ji.jpg" width="100%">
										</span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">￥{{goods.price}}元</span>
									</li>
								</ul>
							</el-tab-pane>
						</el-tabs>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'pos2',
		data() {
			return {
				tableData:[],
		        oftenGoods:[],
	            type0Goods:[],
	            type1Goods:[],
	            type2Goods:[],
	            type3Goods:[],
	            totalMoney:0,
	            totalCount:0
			};
		},
		created:function(){
			axios.get('https://api.myjson.com/bins/qtr0u')
			.then(reponse=>{
				this.oftenGoods=reponse.data
			})
			.catch(error=>{
				console.log(error);
			})
			axios.get('https://api.myjson.com/bins/1ep8dq')
			.then(reponse=>{
				this.type0Goods=reponse.data[0];
				this.type1Goods=reponse.data[1];
				this.type2Goods=reponse.data[2];
				this.type3Goods=reponse.data[3];
			})
			.catch(error=>{
				alert("网络错误")
			})
		},
		methods:{
			add(goods){
				this.totalCount=0;
				this.totalMoney=0;
				let isHave=false;
				for(let i=0;i<this.tableData.length;i++){
					if(this.tableData[i].goodsId==goods.goodsId){
						isHave=true;
					}
				}
				if(isHave){
					let arr=this.tableData.filter(a=>a.goodsId==goods.goodsId);
					arr[0].count++;
				}else{
					let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
					this.tableData.push(newGoods);
				}
				this.tableData.forEach((el)=>{
					this.totalCount+=el.count;
					this.totalMoney=this.totalMoney+(el.price*el.count)
				})
			},
			ddd(goods){
							  //根据isHave的值判断订单列表中是否已经有此商品
							  if(true){
							      //存在就进行数量添加
							       let arr = this.tableData.filter(o =>o.goodsId == goods.goodsId);
								   if(arr[0].count<=1){
									   this.del(goods)
								   }else{
									   arr[0].count--;
								   }
							       //console.log(arr);
							  }
							  //进行数量和价格的汇总计算
							  this.getAll()
			},
			del(goods){
				this.tableData=this.tableData.filter(a=>a.goodsId !=goods.goodsId)
				this.getAll();
			},
			getAll(){
				this.totalCount=0;
				this.totalMoney=0;
				if(this.tableData){
					this.tableData.forEach((el)=>{
						this.totalCount+=el.count;
						this.totalMoney+=this.totalMoney+(el.price*el.count);
					})
				}
			},
			delAll(){
				this.tableData=[];
				this.totalCount=0;
				this.totalMoney=0;
			},
			checkout(){
				if(this.totalCount!=0){
					this.tableData=[];
					this.totalCount=0;
					this.totalMoney=0;
					this.$message({
						message:'结账成功，感谢你的惠顾！',
						type:"success"
					});
				}else{
					this.$message.error('快去选喜欢的商品吧')
				}
			},
			
		},
	}
</script>

<style scoped="scoped">
.pos-order{
	background-color: ivory;
	border-right: 1px solid #C0CCDA;
	height: 800px;
}


/**/
.title{
	height: 20px;
	border-bottom: 1px solid #D3D4D6;
	background-color: #F9FAFC;
	padding: 10px;
}
.often-goods-list ul li{
	cursor: pointer;
	list-style: none;
	float: left;
	padding: 10px;
	margin: 5px;
	background-color: #fff;
}
.o-price{
	color: #58B7FF
}
.goods-type{
	clear: both;
}
.cookList li{
	cursor: pointer;
	list-style: none;
	width: 23%;
	border: 1px solid #E1F3D8;
	height: auto;
	overflow: hidden;
	background-color: #fff;
	padding: 2px;
	float: left;
	margin: 2px;
}
.cookList li span{
	display: block;
	float: left;
}
.foodImg{
	width: 40%;
}
.foodName{
	font-size: 18px;
	padding-left: 10px;
	color: brown;
}
.foodPrice{
	font-size: 16px;
	padding-left: 10px;
	padding-top: 10px;
}
</style>
