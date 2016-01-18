define(['talent','templates/apibox'], function(Talent, jst) {
	return Talent.ItemView.extend({
		template: jst['apibox/header']
		,initialize: function() {
			var self = this;
			this.Data = {};
			this.dealDataApis = {};
			this.askAPI();
			this.listenTo(this,"reset:apilist",function(){
				self.askAPI();
			});
		},
		events:function(){
			var events = {};
			events['keyup input[class=seach-nr]'] = "seachClick";//搜索框输入
			events['click ul[class=seachlist-nr]'] = "listClick";//点击内容
			events['click .search'] = "toSeach";			     //点击搜索
			events['click input[class=new-button]'] = "newAPI";  //点击新建
			events['click .logo'] = "goIndexPage";               //点击logo返回主菜单
			return events;
		}
		,goIndexPage:function(){//返回主菜单
			this.resetInput();
			this.trigger("go:indexPage");
		}
		,newAPI:function(){//点击新建
			this.resetInput();
			this.trigger("add:interface");
		}
		,askAPI:function(){//请求数据
			//--------------------请求数据（全部接口）--------------------------------
			var self = this;
			Talent.app.request("apibox:getAllData").done(function(resp) {
				if (resp.flag) {
					self.Data = resp.message;
					self.trigger("change:count", self.Data);
					self.dealDataApis = self.dealData();
				}
			});
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
			if(data.pid==""||data.id=="") return false;
			this.resetInput();
			this.trigger("seach:apicontent",data); //跳转
		}
		,listClick:function(e){//点击内容
			var self = this;
			var target = $(e.target).get(0).tagName.toLocaleLowerCase()=="li"?$(e.target):$(e.target).parent();
			var thisId = $(target).attr("data-id");
			var projectId = $(target).attr("data-project");
			if(projectId==""){// ""为项目名称
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
		,dealData:function(){//处理数据
			var self = this;
			var temporaryApis = [];
			_.each(self.Data,function(item){
				$.merge(temporaryApis,item.apis);
			});
			return temporaryApis;
		}
		,seachClick:function(e){//输入内容
			event.stopPropagation();
			var self = this;
			var allData = this.Data
			var apiList = "";
			var inputIndex = $("input[class=seach-nr]").val();
			if($(".projectName").length==0){//是否指定项目
				if(inputIndex!=""){//是否有接口名称
					if(inputIndex.indexOf("@")!=-1){//检索项目
						inputIndex = inputIndex.substring(inputIndex.indexOf("@")+1);
						var filtData = _.filter(allData,function(list){
							return list.name.indexOf(inputIndex)!=-1;
						});
						_.each(filtData,function(list){
							apiList+="<li class='seachlist' data-id='"+list.id+"' data-project=''><div class='seachlist-nr-title' name='"+list.name+"'>"+list.name+"</div><div class='seachlist-nr-subtitle'>"+ list.desc +"</div></li>";
						});
					}else{//未指定项目 检索接口
						var filtData = _.filter(self.dealDataApis,function(list){
							return list.name.indexOf(inputIndex)!=-1;
						});
						_.each(filtData,function(listChild){
							apiList+="<li class='seachlist' data-id='"+listChild.id+"' data-project='"+listChild.project+"'><div class='seachlist-nr-title' name='"+listChild.name+"'>"+listChild.name+"<span class='proNamert'>"+listChild.projectName+"</span></div><div class='seachlist-nr-subtitle'>"+ listChild.desc +"</div></li>";
						});
					}
				}
			}else{//指定项目 检索接口
				var pointProjectId = $(".projectName").attr("data-id");
				var findData = _.find(allData,function(list){
					return list.id==pointProjectId;
				});
				var filtData = _.filter(findData.apis,function(list){
					return	list.name.indexOf(inputIndex)!=-1;
				});
				_.each(filtData,function(listChild){
					apiList+="<li class='seachlist' data-id='"+listChild.id+"' data-project='"+listChild.project+"'><div class='seachlist-nr-title' name='"+listChild.name+"'>"+listChild.name+"<span class='proNamert'>"+listChild.projectName+"</span></div><div class='seachlist-nr-subtitle'>"+ listChild.desc +"</div></li>";
				});
			}
			$(".seachlist-nr").empty().append(apiList);
			this.trigger("reset:apilist");
		}
		,onRender: function() {}
	});

});