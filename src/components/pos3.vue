<template>
	<div>
		<el-row>
			<el-col :span='7'>1
			   <el-tabs>
				   <el-tab-pane label='a'>
					   <el-table border show-summary :data='tableData'>
						   <el-table-column label='a' prop="goodsName"></el-table-column>
						   <el-table-column label="b" prop="price"></el-table-column>
						   <el-table-column label="c" prop='count'></el-table-column>
						   <el-table-column label="d" fixed="right" width="150">
							   <template scope="scope">
								   <el-button type="text" size="small" @click='del(scope.row)'>删除</el-button>
								   <el-button type='text' size='small' @click='ddd(scope.row)'>减少</el-button>
                                   <el-button type="text" size="small" @click='add(scope.row)'>增加</el-button>
							   </template>
						   </el-table-column>
					   </el-table>
					   <p>金额：{{totalMoney}}</p><p>数量：{{totalCount}}</p>
				   </el-tab-pane>
				   <el-button type="warning">A</el-button>
				   <el-button type='info' @click="delAll()">删除</el-button>
				   <el-button type='success' @click='checkout()'>结算</el-button>
				   <el-tab-pane label='b'>b</el-tab-pane>
				   <el-tab-pane label='c'>c</el-tab-pane>
			   </el-tabs>
			</el-col>
			<el-col :span='14'>2
<div class="often-goods">
    <div class="title">常用商品</div>
    <div class="often-goods-list">
        <ul>
            <li v-for="goods in oftenGoods" @click="add(goods)">
				<span>{{goods.goodsName}}</span>
				<span class="o-price">{{goods.price}}元</span>
            </li>
        </ul>
    </div>
	<div class="goods-type">
	    <el-tabs>
	        <el-tab-pane label="汉堡">
	            <ul class="cookList">
					<li v-for="goods in type0Goods" @click="add(goods)">
						<span class="foodImg"><img src="../../static/ji.jpg" width="100%"></span>
						<span class="foodName">{{goods.goodsName}}</span>
						<span class="foodPrice">{{goods.price}}元</span>
					</li>
				</ul>
	        </el-tab-pane>
	            <el-tab-pane label="小食">
	            <ul class="cookList">
	            	<li v-for="goods in type1Goods" @click="add(goods)">
	            		<span class="foodImg"><img src="../../static/ji.jpg" width="100%"></span>
	            		<span class="foodName">{{goods.goodsName}}</span>
	            		<span class="foodPrice">{{goods.price}}元</span>
	            	</li>
	            </ul>
	        </el-tab-pane>
	        <el-tab-pane label="饮料">
	            饮料
	        </el-tab-pane>
	        <el-tab-pane label="套餐">
	            套餐
	        </el-tab-pane>
	    </el-tabs>
	</div>
</div>		

	    
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				oftenGoods:[],
				type0Goods:[],
				type1Goods:[],
				type2Goods:[],
				type3Goods:[],
				tableData:[],
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
              //添加订单列表的方法
              add(goods){
                    let isHave=false;
                    //判断是否这个商品已经存在于订单列表
                    for (let i=0; i<this.tableData.length;i++){
                        if(this.tableData[i].goodsId==goods.goodsId){
                            isHave=true; //存在
                        }
                    }
                    //根据isHave的值判断订单列表中是否已经有此商品
                    if(isHave){
                        //存在就进行数量添加
                         let arr = this.tableData.filter(o =>o.goodsId == goods.goodsId);
                         arr[0].count++;
                         //console.log(arr);
                    }else{
                        //不存在就推入数组
                        let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
                        this.tableData.push(newGoods);
                    }
                    //进行数量和价格的汇总计算
                    this.getAll()
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
				  this.tableData=this.tableData.filter(o=>o.goodsId !=goods.goodsId);
				  this.getAll()
			  },
			  getAll(){
				  this.totalCount=0;
				  this.totalMoney=0;
				  if(this.tableData){
					  this.tableData.forEach((el)=>{
						  this.totalCount+=el.count;
						  this.totalMoney=this.totalMoney+(el.price*el.count)
					  });
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
					  this.totalMoney=0;
					  this.totalCount=0;
					  this.$message({
						  message:'lolgg',
						  type:'info'
					  });
				  }else{
					  this.$message.error('no!')
				  }
			  }
          }
	}
</script>

<style>
 .title{
       height: 20px;
       border-bottom:1px solid #D3DCE6;
       background-color: #F9FAFC;
       padding:10px;
   }
   .often-goods-list ul li{
      list-style: none;
      float:left;
      border:1px solid #E5E9F2;
      padding:10px;
      margin:5px;
      background-color:#fff;
	  
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
   }
   .cookList li span{
        display: block;
        float:left;
   }
   .foodImg{
       width: 40%;
   }
   .foodName{
       font-size: 18px;
       padding-left: 10px;
       color:brown;
   }
   .foodPrice{
       font-size: 16px;
       padding-left: 10px;
       padding-top:10px;
   }
   
</style>
