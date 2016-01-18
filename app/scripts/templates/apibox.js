define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["apibox/add-interface-page"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="box-mian">\r\n\t<div class="box-content">\r\n\t\t<div class="create-api">\r\n\t\t\t<span class="next-page"></span>\r\n\t\t\t<div class="c-step c-step1">\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<span>接口名称</span>\r\n\t\t\t\t\t<input type="text" class="api-name" placeholder="请输入接口名称"/>\r\n\t\t\t\t</div> \r\n\t\t\t\t<div>\r\n\t\t\t\t\t<span>项目</span>\r\n\t\t\t\t\t<input type="text" class="project" placeholder="请选择项目"  readonly="readonly"/>\r\n\t\t\t\t\t<span class="icons-down"></span>\r\n\t\t\t\t\t<div class="project-select"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div> \r\n\t\t\t\t\t<span style="float: left; margin:10px 5px 0 0;">接口描述</span>\r\n\t\t\t\t\t<textarea   class="api-desc" placeholder="请输入接口描述"></textarea>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<div class="btns">\r\n\t\t\t\t\t\t<span class="btn btn-blue next-btn">下一步</span>\r\n\t\t\t\t\t\t<span class="btn btn-grey cancle-btn">取消</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="c-step c-step2">\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<span>接口路径</span>\r\n\t\t\t\t\t<input type="text"    class="api-url" placeholder="请输入接口路径"/>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<span>请求方式</span>\r\n\t\t\t\t\t<input type="text" class="method" placeholder="请选择请求方式"  readonly="readonly"/>\r\n\t\t\t\t\t<span class="icons-down"></span>\r\n\t\t\t\t\t<ul class="methods">\r\n\t\t\t\t\t\t<li class="method-li" id="POST">POST<li>\r\n\t\t\t\t\t\t<li class="method-li" id="GET">GET<li>\r\n\t\t\t\t\t\t<li class="method-li" id="DELETE">DELETE<li>\r\n\t\t\t\t\t\t<li class="method-li" id="PUT">PUT<li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<span style="float: left; margin:10px 5px 0 0;">请求数据</span>\r\n\t\t\t\t\t<div class="request-json"></div>\r\n\t\t\t\t\t<textarea  placeholder="请输入接口描述"   class="api-req" ></textarea>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<span style="float: left; margin:10px 5px 0 0;">响应数据</span>\r\n\t\t\t\t\t<div class="respone-json"></div>\r\n\t\t\t\t\t<textarea  placeholder="请输入接口描述"   class="api-rsp"></textarea>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<div class="btns">\r\n\t\t\t\t\t\t<span class="btn btn-blue submit-btn">提交</span>\r\n\t\t\t\t\t\t<span class="btn btn-grey cancle-btn">取消</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t<div>\r\n\t</div>\r\n</div>';}return __p};

  this["JST"]["apibox/check-page"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="check-view">\r\n\t<ul class="data-ul">\r\n\t\t<li style="border-top:2px solid #6fd9b2">\r\n\t\t\t<span>接口定义数据</span>\r\n\t\t\t<div class="data-area interface-data">\r\n\t\t\t\t\t<pre>' +((__t = (data)) == null ? '' : __t) +'</pre>\r\n\t\t\t</div>\r\n\t\t</li>\r\n\t\t<li  style="border-top:2px solid #a4c6ed;margin:0 100px">\r\n\t\t\t<span>sever数据</span>\r\n\t\t\t<div class="data-area server-data" contenteditable="true">\r\n\t\t\t</div>\r\n\t\t</li>\r\n\t\t<li  style="border-top:2px solid #fcd1b4">\r\n\t\t\t<span>比对结果</span>\r\n\t\t\t<div class="data-area diff-data"><pre></pre></div>\r\n\t\t</li>\r\n\t</ul>\r\n\t<div class="btns" style="margin-top:30px">\r\n\t\t<span class="btn btn-blue diff-btn">对比</span>\r\n\t\t<span class="btn btn-grey cancle-diff-btn">取消</span>\r\n\t</div>\r\n</div>';}return __p};

  this["JST"]["apibox/content"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="content"> \r\n <div class="content-title"> APIBOX </div>\r\n <div class="content-subtitle"> 简洁，直观，强悍的API管理工具 </div>\r\n <div class="api-count">\r\n  <span class="api-count-logo"></span>\r\n  <span class="api-count-content">' +((__t = (count)) == null ? '' : __t) +'</span> <span>个接口数据</span>\r\n </div> \r\n</div> \r\n<div class="indexFoot">\r\n<div class="foot-content"> \r\n <div> \r\n  <div class="foot-content-logo1"></div> \r\n  <div class="foot-content-title"> API记录 </div> \r\n  <div class="foot-content-subtitle"> API记录描述API记录描述API记录描述 </div>\r\n  <div class="foot-content-subtitle"> API记录描述API记录描述 </div>\r\n </div> \r\n <div> \r\n  <div class="foot-content-logo2"></div> \r\n  <div class="foot-content-title"> 后台数据校验 </div> \r\n  <div class="foot-content-subtitle"> API记录描述API记录描述API记录描述 </div>\r\n  <div class="foot-content-subtitle"> API记录描述API记录描述 </div>\r\n </div> \r\n <div> \r\n  <div class="foot-content-logo3"></div> \r\n  <div class="foot-content-title"> 前台数据mock </div>\r\n  <div class="foot-content-subtitle"> API记录描述API记录描述API记录描述 </div>\r\n  <div class="foot-content-subtitle"> API记录描述API记录描述 </div>\r\n </div> \r\n</div> \r\n</div>';}return __p};

  this["JST"]["apibox/diff-page"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {for (var i=0; i < diff.length; i++) {if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {var swap = diff[i]; diff[i] = diff[i + 1]; diff[i + 1] = swap; } if (diff[i].removed) {;__p += '<del>' +((__t = (diff[i].value )) == null ? '' : __t) +'</del>';} else if (diff[i].added) {;__p += '<ins>' +((__t = (diff[i].value )) == null ? '' : __t) +'</ins>';} else{;__p +=((__t = (diff[i].value )) == null ? '' : __t);}};}return __p};

  this["JST"]["apibox/header"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="header-content">\r\n\t<span class="logo"></span>\r\n\t<span class= "pro"></span>\r\n\t<div class="seach-nr bordernone">\r\n\t\t<input type="text" class="seach-nr" placeholder="find packages"/>\r\n\t\t<ul class="seachlist-nr">\r\n\t\t</ul>\r\n\t</div>\r\n\t<span class= "search"></span>\r\n\t<input type="button" class="new-button" value="新建"/>\r\n</div>';}return __p};

  this["JST"]["apibox/index-page"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="indexheader"></div> \r\n<div class="indexContent"></div> \r\n\r\n';}return __p};

  this["JST"]["apibox/interface-page"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="interface-api">\r\n\t<ul>\r\n\t\t<li>\r\n\t\t\t<span>接口名称</span>\r\n\t\t\t<span class="api-name desc-span">' +((__t = (config.name)) == null ? '' : __t) +'</span>\r\n\t\t\t<input type="text" class="api-name-edit common" data-name="name"/>\r\n\t\t</li>\r\n\t\t<li style="position:relative;">\r\n\t\t\t<span>项目</span>\r\n\t\t\t<span class="api-project desc-span">' +((__t = (config.projectName)) == null ? '' : __t) +'</span>\r\n\t\t\t<section  class="api-project-edit">\r\n\t\t\t\t<input data-name="projectName" type="text" class="project common" placeholder="请选择项目"  readonly="readonly"/>\r\n\t\t\t\t<span class="icons-down"></span>\r\n\t\t\t\t<div class="project-select"></div>\r\n\t\t\t</section>\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t<span style="float: left; margin:10px 50px 0 0;">接口描述</span>\r\n\t\t\t<pre class="desc-span">' +((__t = (config.desc)) == null ? '' : __t) +'</pre>\r\n\t\t\t<textarea data-name="desc" class="api-desc-edit common"  placeholder="请输入接口描述"></textarea>\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t<span style="float:left">接口路径</span>\r\n\t\t\t<span class="api-url desc-span">' +((__t = (config.url)) == null ? '' : __t) +'</span>\r\n\t\t\t<input data-name="url" type="text" class="api-url-edit common" class="api-name"/>\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t<span>请求方式</span>\r\n\t\t\t<span class="api-method desc-span">' +((__t = (config.method)) == null ? '' : __t) +'</span>\r\n\t\t\t<input data-name="method" type="text" class="api-method-edit common" class="api-name"/>\r\n\t\t</li>\r\n\t\t<li class="data-edit">\r\n\t\t\t<span style="float: left; margin:10px 50px 0 0;">请求数据</span>\r\n\t\t\t<pre>' +((__t = (request)) == null ? '' : __t) +'</pre>\r\n\t\t\t<textarea data-name="method" class="api-req-deit" placeholder="请输入接口描述"></textarea>\r\n\t\t</li>\r\n\t\t<li class="data-edit">\r\n\t\t\t<span style="float: left; margin:10px 50px 0 0;">响应数据</span>\r\n\t\t\t<pre>' +((__t = (response)) == null ? '' : __t) +'</pre>\r\n\t\t\t<textarea   class="api-rsp-edit" placeholder="请输入接口描述"></textarea>\r\n\t\t</li>\r\n\t</ul>\r\n\t<div class="data-deal">\r\n\t\t<div class="data-mock-btn">\r\n\t\t\t<span class="ico01"></span><span>数据Mock</span>\r\n\t\t</div>\r\n\t\t<div class="server-check-btn">\r\n\t\t\t<span class="ico02"></span><span>Sever数据校验</span>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="data-layer data-layer-data-layer">\r\n\t</div>\r\n</div>';}return __p};

  this["JST"]["apibox/mock-page"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="mock-view">\r\n\t<ul class="data-ul">\r\n\t\t<li style="border-top:2px solid #6fd9b2;">\r\n\t\t\t<span>接口定义数据</span>\r\n\t\t\t<div class="data-area mock-data"  contenteditable="true" data-name="mackData">\r\n\t\t\t<pre data-name="mackData">' +((__t = (data)) == null ? '' : __t) +'</pre></div>\r\n\t\t</li>\r\n\t</ul>\r\n\t<div style="height:30px;text-align: center;"><span class="mock-url"></span></div>\r\n\t<div class="btns" style="width:226px;">\r\n\t\t<span class="btn btn-blue create-url-btn">生成MOCK URL</span>\r\n\t\t<span class="btn btn-grey cancle-mock-btn">取消</span>\r\n\t</div>\r\n</div>';}return __p};

  this["JST"]["apibox/project-page"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<div class="p-step1">\r\n<div class="add-project">\r\n\t<span>+ 新增项目</span>\r\n</div>\r\n<div class="projects">\r\n\t<ul>\r\n\t'; _.each(projects,function(item,index){;__p += '\r\n\t\t<li id="' +((__t = (item.id)) == null ? '' : __t) +'" class="project-item">\r\n\t\t\t<span class="name">' +((__t = (item.name)) == null ? '' : __t) +'</span>\r\n\t\t\t<span class="desc">' +((__t = (item.desc)) == null ? '' : __t) +'</span>\r\n\t\t</li>\r\n\t';});__p += '\r\n\t</ul>\r\n</div>\r\n</div>\r\n<div class="p-step2">\r\n\t<div class="back-project">\r\n\t\t<span>&lt;返回</span>\r\n\t</div>\r\n\t<ul class="project-section">\r\n\t\t<li>\r\n\t\t\t<span>项目名称</span>\r\n\t\t\t<input class="project-name" type="text" placeholder="请输入项目名称" style="width:250px;box-sizing: border-box;"/>\r\n\t\t</li>\r\n\t\t<li style="margin-top:20px;">\r\n\t\t\t<span style="float: left; margin:10px 5px 0 0;">项目描述</span>\r\n\t\t\t<textarea class="project-desc" placeholder="请输入项目描述" style="width:250px;height:110px; box-sizing: border-box;resize:\'none\'"></textarea>\r\n\t\t</li>\r\n\t</ul>\r\n\t<div class="small-btns bottom-right-btns">\r\n\t\t<span class="btn btn-blue add-sure">确定</span>\r\n\t\t<span class="btn btn-grey add-cancle">取消</span>\r\n\t</div>\r\n</div>\r\n';}return __p};

  return this["JST"];

});