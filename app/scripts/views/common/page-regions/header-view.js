define(['talent','templates/common'], function(Talent, jst) {
	/**
	* Header view class
	* @author nobody
	* @extends {Talent.CompositeView}
	* @class HeaderView
	*/
	return Talent.CompositeView.extend(
		/** @lends HeaderView.prototype */
	{
		template: jst['common/page-regions/header']
		,initialize: function() {
		},
		ui:{
			"seach":'input[class=seach-nr]'
			,"listChildClick":"ul[class=seachlist-nr]"
			,"search":".search"
		},
		events:function(){
			var events = {};
			events['keyup '+this.ui.seach] = "seachClick";
			events['click '+this.ui.listChildClick] = "listClick";
			events['click '+this.ui.search] = "toSeach";
			return events;
		}
		,toSeach:function(){//点击搜索
			event.stopPropagation();
			var data = {};
			data.id = $("input[class=seach-nr]").attr("data-id");
			data.project = $("input[class=seach-nr]").attr("data-project");
			$("input[class=seach-nr]").attr("data-id","");
			$("input[class=seach-nr]").attr("data-project","");






		}
		,listClick:function(e){//点击内容
			var target = $(e.target).get(0).tagName.toLocaleLowerCase()=="li"?$(e.target):$(e.target).parent();
			var thisId = $(target).attr("data-id");
			var projectId = $(target).attr("data-project");
			$("input[class=seach-nr]").attr("data-id",thisId);
			$("input[class=seach-nr]").attr("data-project",projectId);
			$("input[class=seach-nr]").val($(target).find(".seachlist-nr-title").text());
			$(".seachlist-nr").empty();
		}
		,seachClick:function(e){//输入内容
			event.stopPropagation();
			var allData = this.model.get("data");
			var apiList = "";
			var inputIndex = $("input[class=seach-nr]").val();
			if(e.keyCode==229){
				_.each(allData,function(){

				});
			}else{
				_.each(allData,function(list){
					_.each(list.apis,function(listChild){
						if(listChild.name.indexOf(inputIndex)==0){
							apiList+="<li class='seachlist' data-id='"+listChild.id+"' data-project='"+listChild.project+"'><div class='seachlist-nr-title'>"+listChild.name+"            ---"+listChild.projectName+"</div><div class='seachlist-nr-subtitle'>"+ listChild.desc +"</div></li>"
						}
					});
				});
			}
			
			$(".seachlist-nr").empty().append(apiList);

		}
		,onRender: function() {
		
		}
	});

});