/**
* @name:Mock接口业务处理
* @author:richard
* @description:mock接口
*/
var path=require("path"),
	fileUtils=require('../utils/fileUtils'),
	hashUtils=require('../utils/hashUtils'),
	config = require('../../config.json').mockserver;


function parentDir(path){
    path= path.split("\\")
    path.pop();
    return path.join("\\");
}
//mock配置文件
var mockJsonPath = parentDir(parentDir(__dirname))+"/apilib/mock.json";	


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
	//查询mock数据
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
	//根据url查询mock data
	getMockData:function(hashcode){		
		var mockConfig=fileUtils.readToJson(mockJsonPath);
		if(!mockConfig){
			mockConfig={};
		}
		var mock=mockConfig[hashcode];
		if(mock){
			var result=this.queryMockData(mock);
			if(result)
				return result.message;
			else
				return {};			
		}else{
			return {};
		}		
	},
	//保存mock数据
	saveMockData:function(data){
		try{					
			if(data&&data.pid&&data.mid&&data.mockData){
				var apiPath=this._getPath(data.pid,data.mid);								
				var interfaceData=fileUtils.readToJson(apiPath);					
				interfaceData.mock=data.mockData;											
				fileUtils.write(apiPath,JSON.stringify(interfaceData));
			}else{
				return result(false,"保存参数错误");
			}
		}catch(e){
			return result(false,e);
		}
		return result(true,"保存成功");	
	},
	//生成mock Url
	generateUrl:function(data){
		var id= data.pid+";"+data.mid;
		try{
			//生成hash code
			/*var hashCode=this._djbCode(id);*/
			var hashCode=hashUtils.additive(id);
			data.hashcode=hashCode;
			var url= "http://"+config.localhost+":"+config.port+"/api/mocks/"+hashCode;
			this._saveMockConfig(data);
			return url;
		}catch(e){
			console.log("生成url出错",e);
			return null;
		}
	},
	//保存mock url配置文件
	_saveMockConfig:function(data){		
		var mockConfig=fileUtils.readToJson(mockJsonPath);
		if(!mockConfig){
			mockConfig={};
		}
		var mock=mockConfig[data.hashcode];		
		if(!mock){
			mockConfig[data.hashcode]={"pid":data.pid,"mid":data.mid};
			fileUtils.write(mockJsonPath,JSON.stringify(mockConfig));
		}
	}
}

var service=new Service();
module.exports=service;
