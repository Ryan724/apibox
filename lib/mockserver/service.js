/**
* @name:Mock接口业务处理
* @author:richard
* @description:mock接口
*/
var path=require("path"),
	fileUtils=require('../utils/fileUtils');

/**
*标准返回信息格式
*/
var result=function(flag,message){
	return {flag:flag,message:message};
}

var Service=function(){};

Service.prototype={
	constructor:Service,

	//获取api路径
	_getPath:function(pid,mid){
		var apiPath="./"+"apilib"+"/"+pid+"/"+mid;
		return apiPath;
	},
	//查询mocko数据
	queryMockData:function(data){		
		
		if(data&&data.pid&&data.mid){
			try{
				var apiPath=this._getPath(data.pid,data.mid);

				var interfaceData=fileUtils.readToJson(apiPath);

				if(interfaceData&&interfaceData.mock){
					return result(true,interfaceData.mock);
				}else if(interfaceData){
					return result(true,interfaceData.request);
				}else{
					return result(false,"mock数据不存在");
				}	
			}catch(e){				
				return result(false,e);
			}

		}else{
			return result(false,"查询参数错误");
		}
	},
	//保存mock数据
	saveMockData:function(data){
		try{		
			
			if(data&&data.pid&&data.mid&&data.mockData){
				//pid,mid,mockData		
			
				var apiPath=this._getPath(data.pid,data.mid);				
				console.log(apiPath);
				var interfaceData=fileUtils.readToJson(apiPath);	
				console.log(222);			
				console.log(data.mockData);
				interfaceData.mock=data.mockData;
				console.log(interfaceData);					
				var dd=JSON.stringify(interfaceData);
				console.log(dd);
				fileUtils.write(apiPath,JSON.stringify(interfaceData));
			}else{
				return result(false,"保存参数错误");
			}
		}catch(e){
			return result(false,e);
		}
		return result(true,"保存成功");	
	}
}

var service=new Service();
module.exports=service;
