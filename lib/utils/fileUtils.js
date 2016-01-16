/**
* @Name FileUtils
* @Author Richard
* @Description 文件操作工具函数
*/

//引入module
var fs=require('fs');

var FileUtils=function(){};

FileUtils.prototype = {
	constructor:FileUtils,

	//读取文件
	readFile:function(fpath){
		var data=null;
		if(!fs.existsSync(fpath))return data;

		data=fs.readFileSync(fpath,'utf-8');					
		return data;
	},
	//读取文件内容为json
	readFileToJson:function(fpath){
		var data=this.readFile(fpath);
		if(data!=null)
			data=JSON.parse(data);
		return data;
	},
	//写入文件
	writeFile:function(fpath,content){
		console.log(content);
		fs.writeFileSync(fpath,content,"utf-8","w+");
	},
	//追加写入
	appendWrite:function(fpath,content){
		console.log(content);
		fs.writeFileSync(fd,content,"utf-8","w+");
	}
}


var fileUtils=new FileUtils();
//导出module
module.exports={
	//读取文件
	read:function(path){
		return fileUtils.readFile(path);
	},
	readToJson:function(path){
		return fileUtils.readFileToJson(path);
	},
	//写入文件
	write:function(path,content){
		fileUtils.writeFile(path,content);
	},
	//追加写入
	append:function(path,content){
		fileUtils.appendWrite(path,content);
	}
}

