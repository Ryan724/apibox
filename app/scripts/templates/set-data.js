define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["set-data/dialog-type"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<div class="data-list">\r\n<input type="text" class="edit-input">\r\n<ul class="select-datalist">\r\n\t'; if(data) {		_.each(data,function(item){;__p += '\r\n\t\t\t<li data-name="' +((__t = (item.name)) == null ? '' : __t) +'">' +((__t = (item.name)) == null ? '' : __t) +'</li>\r\n\t\t';})	};__p += '\r\n</ul>\r\n<span class="select-icon"></span> \r\n</div>';}return __p};

  this["JST"]["set-data/index-page"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="set-data">\r\n\t<div class="box">\r\n\t\t<div class="data-desc">请输入数据{</div>\r\n\t\t<div class="key-box">\r\n\t\t\t<span class="data-key"></span>\r\n\t\t\t<input type="text" class="input-key" size="1">\r\n\t\t</div>\r\n\t\t<div class="edit-next"></div>\r\n\t\t<div class="data-close">}</div>\r\n\t</div>\r\n</div>';}return __p};

  return this["JST"];

});