<template>
	<div class="pos">
		<leftnav></leftnav>
		<div>
			<el-row>
				<el-col :span='7' id="order-list" class='pos-order'>
                我是订单栏
				<el-tabs>
					<el-tab-pane label="点餐">
						<el-table :data="tableData" border show-summary style='width: 100%;'>
							<el-table-column prop="goodsName" label="商品"></el-table-column>
							<el-table-column prop="count" label="数量" width="80"></el-table-column>
							<el-table-column prop="price" label="金额" width="80"></el-table-column>
							<el-table-column label="操作" width="150" fixed="right">
								<template scope="scope">
									<el-button size="samll" type='text' @click="delSingleGoods(scope.row)">删除</el-button>
									<el-button type='text' size='small' @click='ddd(scope.row)'>减少</el-button>
									<el-button size="samll" type='text' @click="addOrderList(scope.row)">增加</el-button>
									<!--addOrderList(scope.row)  官方要求这么写，没为什么-->
								</template>
							</el-table-column>
						</el-table>
						
						<div class="totalDiv">
							<p><small>数量：{{totalCount}} </small>&nbsp;&nbsp;<small>金额：{{totalMoney}}</small> </p>
						</div>
						<div class="div-btn">
							<el-button type="warning" >挂单</el-button>
							<el-button type="danger" @click="delAllGoods()">删除</el-button>
							<el-button type="success" @click='checkout'>结账</el-button>
						</div>
					</el-tab-pane>
					<el-tab-pane label="挂单">挂单</el-tab-pane>
					<el-tab-pane label="外卖">外卖</el-tab-pane>
				</el-tabs>
                </el-col>
				
            <!--商品展示-->
                <el-col :span="13" id="order-list">
                 我是产品栏
				 <div class="often-goods">
					 <div class="title">基本商品</div>
					 <div class="often-goods-list">
						 <ul>
							 <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
								 <span>{{goods.goodsName}}</span>
								 <span class="o-price">￥{{goods.price}}</span>
							 </li>
							 
						 </ul>
					 </div>
					 
				 </div>
				 <div class="goods-type">
				 	<el-tabs>
				 		<el-tab-pane label="汉堡">
				 			<div>
								<ul class="cookList">
									<li v-for="goods in type0Goods" @click="addOrderList(goods)">
										<span class="foodImg"><img src="../../static/ji.jpg" width="100%"></span>
										<span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">￥{{goods.price}}元</span>
									</li>
								</ul>
							</div>
				 		</el-tab-pane>
				 		<el-tab-pane label="小食">
				 			<div>
								<ul class="cookList">
									<li v-for="goods in type1Goods" @click="addOrderList(goods)">
										<span class="foodImg"><img src="../../static/ji.jpg" width="100%"></span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">￥{{goods.price}}元</span>
									</li>
								</ul>
							</div>
				 		</el-tab-pane>
				 		<el-tab-pane label="饮料">
				 			<diav>
								<ul class="cookList">
									<li v-for="goods in type2Goods" @click="addOrderList(goods)">
										<span class="foodImg"><img src="../../static/ji.jpg" width="100%"></span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">￥{{goods.price}}元</span>
									</li>
								</ul>
							</diav>
				 		</el-tab-pane>
				 		<el-tab-pane label="套餐">
				 		<diav>
				 			<ul class="cookList">
				 				<li v-for="goods in type3Goods" @click="addOrderList(goods)">
				 					<span class="foodImg"><img src="../../static/ji.jpg" width="100%"></span>
				 					<span class="foodName">{{goods.goodsName}}</span>
				 					<span class="foodPrice">￥{{goods.price}}元</span>
				 				</li>
				 			</ul>
				 		</diav>
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
		name:'pos',
		data() {
			return {
		        tableData: [],
		        oftenGoods:[],
	            type0Goods:[],
		        type1Goods:[],
		        type2Goods:[],
		        type3Goods:[],
		        totalMoney:0,
		        totalCount:0
			};
		},
		components:{
			
		},
		methods:{
			addOrderList(goods){
				this.totalCount=0; //汇总数量清0
                this.totalMoney=0;
                let isHave=false;//存在？
				
            //判断是否这个商品已经存在于订单列表
                for (let i=0; i<this.tableData.length;i++){
                   console.log(this.tableData[i].goodsId);
                   if(this.tableData[i].goodsId==goods.goodsId){
                   isHave=true; //存在
                   }
                }
				
		    //根据isHave的值判断订单列表中是否已经有此商品
                if(isHave){
                  //存在就进行数量添加
                  let arr = this.tableData.filter(o =>o.goodsId == goods.goodsId);//filter数组过滤方法
                  arr[0].count++;
                  //console.log(arr);
                }else{
                //不存在就推入数组
                   let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
                   this.tableData.push(newGoods);
                }
				        //进行数量和价格的汇总计算
                this.tableData.forEach((element) => {  //element可随意
                  this.totalCount+=element.count;
                  this.totalMoney=this.totalMoney+(element.price*element.count);   
                });
			},
			ddd(goods){
							  //根据isHave的值判断订单列表中是否已经有此商品
							  if(true){
							      //存在就进行数量添加
							       let arr = this.tableData.filter(o =>o.goodsId == goods.goodsId);
								   if(arr[0].count<=1){
									   this.delSingleGoods(goods)
								   }else{
									   arr[0].count--;
								   }
							       //console.log(arr);
							  }
							  //进行数量和价格的汇总计算
							  this.getAllMoney()()
			},
			
			//删除单个商品
			delSingleGoods(goods){
				console.log(goods);
				this.tableData=this.tableData.filter(o=>o.goodsId!=goods.goodsId);
				this.getAllMoney();//调用 并清零重新计算
			},
			delAllGoods(){
				this.totalCount=0;
				this.totalMoney=0;
				this.tableData=[]
			},
			
			//汇总数量和金额
			getAllMoney(){
				this.totalCount=0;
				this.totalMoney=0;
				if(this.tableData){
					this.tableData.forEach((element)=>{
						this.totalCount+=element.count;
						this.totalMoney=this.totalMoney+(element.price*element.count);
					});
				}
			},
			
			//结账
			/*
			1设置我们Aixos的Pos方法。（需要服务器）
            2接受返回值进行处理。
            3如果成功，清空现有构造器里的tableData，totalMoney，totalCount数据。
            4进行用户的友好提示。*/
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
		created:function(){
			axios.get('https://api.myjson.com/bins/qtr0u')
			.then(reponse=>{
				console.log(reponse)//object.data正常返回
				this.oftenGoods=reponse.data
			})
			.catch(error=>{
				console.log(error);
			})
			axios.get('https://api.myjson.com/bins/1ep8dq')
			.then(reponse=>{
				console.log(reponse)
				this.type0Goods=reponse.data[0];
				this.type1Goods=reponse.data[1];
				this.type2Goods=reponse.data[2];
				this.type3Goods=reponse.data[3];
			})
			.catch(error=>{
				console.log(error);
			})
		},
		//生命周期 钩子函数
		mounted:function(){
         var orderHeight=document.body.clientHeight;
	     console.log(orderHeight)
         document.getElementById("order-list").style.height=orderHeight+'px';
  },
	}
</script>

<style scoped>
.pos{
	
}
.pos-order{
	background-color: ivory;
	border-right: 1px solid #C0CCDA;
	height: 800px;
}
.div-btn{
	margin-right: 20px;
}
.totalDiv{
	background-color: #fff;
	padding: 10px;
	border-bottom: 1px solid #D1DBE5;
}

/**/

.title{
       height: 20px;
       border-bottom:1px solid #D3DCE6;
       background-color: #F9FAFC;
       padding:10px;
   }
   .often-goods-list ul li{
      list-style: none;
      float: left;
      border:1px solid #E5E9F2;
      padding:15px;
      margin:5px;
      background-color:#fff;
	  cursor: pointer;
   }
  .o-price{
      color:#58B7FF; 
   }
   .goods-type{
	   clear: both;
   }
   .cookList li{
       list-style: none;
       width:23%;
       border:1px solid #E5E9F2;
       height: auot;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       float:left;
       margin: 2px;
	   cursor: pointer;
   }
   .cookList li span{
        display: block;
        float:left;
   }
   .foodImg{
       width: 40%;
   }
   .foodName{
       font-size: 14px;
       padding-left: 10px;
       color:brown;
   }
   .foodPrice{
       font-size: 16px;
       padding-left: 10px;
       padding-top:10px;
   }
</style>
