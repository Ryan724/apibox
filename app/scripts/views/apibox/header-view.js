define(['talent','templates/apibox'], function(Talent, jst) {
	/**
	* Header view class
	* @author nobody
	* @extends {Talent.CompositeView}
	* @class HeaderView
	*/
	return Talent.CompositeView.extend(
		/** @lends HeaderView.prototype */
	{
		template: jst['apibox/header']
		,initialize: function() {
			var self = this;
			Talent.app.request("apibox:getAllData").done(function(resp) {
				self.Data = jQuery.parseJSON(resp.message);
			});
		},
		ui:{
			"seach":'input[class=seach-nr]'
			,"listChildClick":"ul[class=seachlist-nr]"
			,"search":".search"
			,"newAPI":"input[class=new-button]"
			,"goIndex":".logo"
		},
		events:function(){
			var events = {};
			events['keyup '+this.ui.seach] = "seachClick";
			events['click '+this.ui.listChildClick] = "listClick";
			events['click '+this.ui.search] = "toSeach";
			events['click '+this.ui.newAPI] = "newAPI";
			events['click '+this.ui.goIndex] = "goIndexPage";
			return events;
		}
		,goIndexPage:function(){
			this.trigger("go:indexPage");
		}
		,newAPI:function(){//点击新建
			this.resetInput();
			this.trigger("add:interface");
		}
		,resetInput:function(){
			$("input[class=seach-nr]").val("");
			$("input[class=seach-nr]").attr("data-id","");
			$("input[class=seach-nr]").attr("data-project","");
		}
		,toSeach:function(){//点击搜索
			event.stopPropagation();
			var data = {};
			data.id = $("input[class=seach-nr]").attr("data-id");
			data.pid = $("input[class=seach-nr]").attr("data-project");
			this.resetInput();
			$(".pro").attr("data-id","");
			$(".pro").attr("data-project","");
			$(".pro").text("");
			$("input[class=seach-nr]").val("");
			$(".seach-nr").width(825);
			$("ul.seachlist-nr").width(825);
			$(".pro").removeClass("projectName");
			this.trigger("seach:apicontent",data);
			//跳转

		}
		,listClick:function(e){//点击内容
			var target = $(e.target).get(0).tagName.toLocaleLowerCase()=="li"?$(e.target):$(e.target).parent();
			var thisId = $(target).attr("data-id");
			var projectId = $(target).attr("data-project");
			if(projectId==""){
				$(".pro").attr("data-id",thisId);
				$(".pro").attr("data-project",projectId);
				$(".pro").text($(target).find(".seachlist-nr-title").attr("name"));
				$(".pro").addClass("projectName");
				$("input[class=seach-nr]").val("");
				$(".seach-nr").width(816-$(".pro").width()-8);
				$("ul.seachlist-nr").width(826-$(".pro").width()-8);
			}else{
				$("input[class=seach-nr]").attr("data-id",thisId);
				$("input[class=seach-nr]").attr("data-project",projectId);
				$("input[class=seach-nr]").val($(target).find(".seachlist-nr-title").attr("name"));
			}
			$(".pro").click(function(){
				$(".pro").attr("data-id","");
				$(".pro").attr("data-project","");
				$(".pro").text("");
				$("input[class=seach-nr]").val("");
				$(".seach-nr").width(825);
				$("ul.seachlist-nr").width(825);
				$(".pro").removeClass("projectName");
			});
			$(".seachlist-nr").empty();
		}
		,seachClick:function(e){//输入内容
			event.stopPropagation();
			var allData = this.Data
			var apiList = "";
			var inputIndex = $("input[class=seach-nr]").val();
			if($(".projectName").length==0){
				if(inputIndex!=""){
					if(inputIndex.indexOf("@")!=-1){
						inputIndex = inputIndex.substring(inputIndex.indexOf("@")+1);
						_.each(allData,function(list){
							if(list.name.indexOf(inputIndex)==0){
								apiList+="<li class='seachlist' data-id='"+list.id+"' data-project=''><div class='seachlist-nr-title' name='"+list.name+"'>"+list.name+"</div><div class='seachlist-nr-subtitle'>"+ list.desc +"</div></li>"
							}
						});
					}else{
						_.each(allData,function(list){
							_.each(list.apis,function(listChild){
								if(listChild.name.indexOf(inputIndex)==0){
									apiList+="<li class='seachlist' data-id='"+listChild.id+"' data-project='"+listChild.project+"'><div class='seachlist-nr-title' name='"+listChild.name+"'>"+listChild.name+"<span class='proNamert'>"+listChild.projectName+"</span></div><div class='seachlist-nr-subtitle'>"+ listChild.desc +"</div></li>"
								}
							});
						});
					}
				}
			}else{
				_.each(allData,function(list){
					_.each(list.apis,function(listChild){
						if(listChild.name.indexOf(inputIndex)==0&&listChild.project==$(".projectName").attr("data-id")){
							apiList+="<li class='seachlist' data-id='"+listChild.id+"' data-project='"+listChild.project+"'><div class='seachlist-nr-title' name='"+listChild.name+"'>"+listChild.name+"<span class='proNamert'>"+listChild.projectName+"</span></div><div class='seachlist-nr-subtitle'>"+ listChild.desc +"</div></li>"
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