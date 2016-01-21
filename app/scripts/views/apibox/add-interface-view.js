define(['talent',
 'templates/apibox',
  "views/apibox/project-select-view",
  "views/apibox/interface-page-view",
  'views/common/json/json-page-view'], 
  function(Talent,
   jst,
    ProjectSelectView,
    InterfacePageView,
    JsonPageView) {
	return Talent.Layout.extend({
		template: jst['apibox/add-interface-page'],
		className: 'home-page-container',
		regions: {
			projectRegion: ".project-select",
			contentRegion:".box-content",
			rspRegin : ".respone-json",
			reqRegin : ".request-json"
		},
		events: function() {
			var events = {};
			events["click .project"] = this.showProjectInput;
			events["click .next-page"] = this.showNextStep;
			events["click .next-btn"] = this.showNextStep;
			events["click .pre-page"] = this.showPreStep;
			events["click .cancle-btn"] = this.backIndexPage;
			events["click .method-li"] = this.chageMethod;
			events["click .method"] = this.showMethod;
			events["click .submit-btn"] = this.createApi;
			events["click .api-req-b"] = this.editReqJson;
			events["click .api-rsp-b"] = this.editRspJson;
			events["blur .api-req"] = this.formatDate;
			events["blur .api-rsp"] = this.formatDate;
			return events;
		},
		initialize: function() {
			this.model = new Talent.Model({
				isNext: false
			});
		},
		onRender: function() {},
		onShow: function() {
			this.$(".next-page").hide();
			this.showRspRegin();
			this.showReqRegin();
		},
		showRspRegin:function(data){
			var self =this;
			data = data;
			self.$(".respone-json").show();
			this.rspView = new JsonPageView({model: new Talent.Model({data:data})});
			this.rspRegin.show(this.rspView);
			this.listenTo(this.rspView,"see:json",function(jsonStr){
				var json =$.trim(_.formatJson(jsonStr));
				self.$(".api-rsp").html(json);
				self.$(".api-rsp-p").show();
				self.rspView.close();
				self.$(".respone-json").hide();
			})
		},
		showReqRegin:function(data){
			var self =this;
			data = data;
			self.$(".request-json").show();
			this.reqView = new JsonPageView({model: new Talent.Model({data:data})});
			this.reqRegin.show(this.reqView);
			this.listenTo(this.reqView,"see:json",function(jsonStr){
				var json =$.trim(_.formatJson(jsonStr));
				self.$(".api-req").html(json);
				self.$(".api-req-p").show();
				self.reqView.close();
				self.$(".request-json").hide();
			})
		},
		editRspJson:function(e){
			var node =$(e.currentTarget).parent();
			var textareaNode  = node.find(".api-rsp");
			var val = textareaNode.val();
			this.$(".api-rsp-p").hide();
			this.showRspRegin(val);
		},
		editReqJson:function(e){
			var node =$(e.currentTarget).parent();
			var textareaNode  = node.find(".api-req");
			var val = textareaNode.val()
			this.$(".api-req-p").hide();
			this.showReqRegin(val);
		},
		createApi: function(e) {
			var self = this;
			var flag=true;
			var url=this.$(".api-url").val();
			var method=this.$(".method").val();
			var request=this.$(".api-req").val().replace(/[ ]|\ +|[\r\n]/g,"");
			var response=this.$(".api-rsp").val().replace(/[ ]|\ +|[\r\n]/g,"");
			if (request!="") {
				try{
					JSON.parse(request);
					this.$(".api-req").removeClass("border-red");flag=true;
				}catch(erro){
					this.$(".api-req").addClass("border-red");flag=false;
				};
			}else{
				request="";
			};

			try{
				JSON.parse(response);
				this.$(".api-rsp").removeClass("border-red");flag=true;
			}catch(erro){
				this.$(".api-rsp").addClass("border-red");flag=false;
			}
			if(url==""){this.$(".api-url").addClass("border-red");flag=false};
			if(method==""){this.$(".method").addClass("border-red");flag=false};
			var config = {
				"name": this.$(".api-name").val(),
				"desc": this.$(".api-desc").val(),
				"project": this.$(".project").attr("id"),
				"projectName": this.$(".project").val(),
				"url": url,
				"method": method
			};
			var api = {
				"config": config,
				"request": request,
				"response": response
			}
			if(flag){
				Talent.app.request("apibox:addApi",api).done(function(resp) {
				self.trigger("reset:apilist");
				if(resp.flag){
					self.showInterface(resp.message);
				}
			});
			}
		},
		showInterface:function(data){
			var self=this;
			if(data){
				data.response=_.formatJson(data.response);
				data.request=_.formatJson(data.request);
				this.interfacePageView = new InterfacePageView({model:new Talent.Model(data)});
				this.contentRegion.show(this.interfacePageView);
			}
		},
		showNextStep: function(e) {
			//校验值
			var flag=true;
			var self=this;
			var interfaceName=$(".api-name").val();
			var productName=$(".project").val();
			var discribe=$(".api-desc").val();
		     if(interfaceName==""){
		     	$(".api-name").addClass("border-red");
		     	flag=false;
		     }else{$(".api-name").removeClass("border-red");};
		     if (productName=="") {
		     	$(".project").addClass("border-red");
		     	flag=false;
		     }else{$(".project").removeClass("border-red");};
		     if (flag) {
			    this.model.set("isNext", true);
				this.$(".next-page").show();
				this.$(".next-page").removeClass("next-page").addClass("pre-page");
				this.$(".c-step1").animate({'left':'-100%'},function(){
					self.$(".c-step1").hide();
					self.$(".c-step2").show();
					self.$(".c-step2").animate({'left':0})
				});
		     };
		},
		showPreStep: function() {
			this.$(".c-step2").hide();
			this.$(".c-step1").show();
			this.$(".c-step1").animate({'left':0},function(){
				self.$(".c-step2").animate({'left':'100%'});
			});
			this.$(".pre-page").removeClass("pre-page").addClass("next-page");
			if (this.model.set("isNext")) this.$(".next-page").show();
		},
		backIndexPage: function(e) {
			this.trigger("add:content");
		},
		showProjectInput: function(e) {
			var self = this;
			if (this.isProjectRegionShow == true) return;

			Talent.app.request("apibox:getProjects").done(function(resp) {
				if (resp.flag == false) return;
				self.projectSelectView = new ProjectSelectView({
					model: new Talent.Model({
						"projects": resp.message
					})
				});
				self.projectRegion.show(self.projectSelectView);
				self.listenTo(self.projectSelectView, "choice:project", self.chageProject)
				self.$(".project-select").show();
				self.isProjectRegionShow = true;
			});
		},
		chageMethod: function(e) {
			var $node = $(e.currentTarget);
			var id = $node.attr("id");
			this.$(".method").val(id).attr("id", id);
			this.$(".methods").hide();
		},
		showMethod: function() {
			this.$(".methods").show();
		},
		chageProject: function(project) {
			this.$(".project").val(project.name).attr("id", project.id);
			this.$(".project-select").hide();
			this.isProjectRegionShow = false;
		},
		formatDate:function(e){
			var self=this;
			var node = this.$(e.currentTarget);
			var val=node.val();
			try{
				if (JSON.parse(val)) {
					val=$.trim(_.formatJson(val));
					self.$(e.currentTarget).val(val);
				};
			}catch(err){
				return false;
			}
		},
		onClose: function() {}
	});
});