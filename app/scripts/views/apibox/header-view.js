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
		events:function(){
			var events = {};
			events['keyup input[class=seach-nr]'] = "seachClick";
			events['click ul[class=seachlist-nr]'] = "listClick";
			events['click .search'] = "toSeach";
			events['click input[class=new-button]'] = "newAPI";
			events['click .logo'] = "goIndexPage";
			return events;
		}
		,goIndexPage:function(){
			this.resetInput();
			this.trigger("go:indexPage");
		}
		,newAPI:function(){//点击新建
			this.resetInput();
			this.trigger("add:interface");
		}
		,resetInput:function(){//重置输入框
			this.$("input[class=seach-nr]").val("").attr("data-id","").attr("data-project","");
			this.$(".pro").attr({"data-id":"","data-project":""}).text("").removeClass("projectName");;
			this.$("input[class=seach-nr]").val("");
			this.$("div.seach-nr").width(824);
			this.$("input.seach-nr").width(814);
			this.$("ul.seachlist-nr").width(824);
			this.$(".seachlist-nr").empty();
		}
		,toSeach:function(){//点击搜索
			event.stopPropagation();
			var data = {};
			data.id = $("input[class=seach-nr]").attr("data-id");
			data.pid = $("input[class=seach-nr]").attr("data-project");
			this.resetInput();
			console.log(data);
			this.trigger("seach:apicontent",data); //跳转
		}
		,listClick:function(e){//点击内容
			var self = this;
			var target = $(e.target).get(0).tagName.toLocaleLowerCase()=="li"?$(e.target):$(e.target).parent();
			var thisId = $(target).attr("data-id");
			var projectId = $(target).attr("data-project");
			if(projectId==""){
				this.$(".pro").attr("data-id",thisId).attr("data-project",projectId).text($(target).find(".seachlist-nr-title").attr("name")).addClass("projectName");
				this.$("input[class=seach-nr]").val("");
				this.$("div.seach-nr").width(807-$(".pro").width());
				this.$("input.seach-nr").width(797-$(".pro").width());
				this.$("ul.seachlist-nr").width(807-$(".pro").width());
			}else{
				this.$("input[class=seach-nr]").attr("data-id",thisId).attr("data-project",projectId).val($(target).find(".seachlist-nr-title").attr("name"));
			}
			$(".pro").click(function(){
				self.resetInput();
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
						var filtData = _.filter(allData,function(list){
							return list.name.indexOf(inputIndex)==0;
						});
						_.each(filtData,function(list){
							apiList+="<li class='seachlist' data-id='"+list.id+"' data-project=''><div class='seachlist-nr-title' name='"+list.name+"'>"+list.name+"</div><div class='seachlist-nr-subtitle'>"+ list.desc +"</div></li>";
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
		,onRender: function() {}
	});

});