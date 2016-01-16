define(['talent',
 'templates/apibox',
  "views/apibox/project-select-view",
  "views/apibox/interface-page-view"], 
  function(Talent,
   jst,
    ProjectSelectView,
    InterfacePageView) {
	return Talent.Layout.extend({
		template: jst['apibox/add-interface-page'],
		className: 'home-page-container',
		regions: {
			projectRegion: ".project-select",
			contentRegion:".box-content"
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
			return events;
		},
		initialize: function() {
			console.log(11111111)
			this.model = new Talent.Model({
				isNext: false
			});
		},
		onRender: function() {},
		onShow: function() {
			this.$(".next-page").hide();
			// this.showInterface();
		},
		createApi: function(e) {
			var self = this;
			var flag=true;
			var url=this.$(".api-url").val();
			var m = url.match(/(http[^"]*)"/g);
			if(m){}
			var method=this.$(".method").val();
			var request=this.$(".api-req").val();
			var response=this.$(".api-rsp").val();
			try{
				JSON.parse(request);
				this.$(".api-req").removeClass("border-red");flag=true;
			}catch(erro){
				this.$(".api-req").addClass("border-red");flag=false;
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
				"url": this.$(".api-url").val(),
				"method": this.$(".method").attr("id")
			};
			var api = {
				"config": config,
				"request": this.$(".api-req").val(),
				"response": this.$(".api-rsp").val()
			}
			if(flag){
				Talent.app.request("apibox:addApi",api).done(function(resp) {
				console.log(resp)
				if(resp.flag){
					self.showInterface(resp.message);
				}
			});
			}
		},
		getInterfaceData:function(pid,id){
			Talent.app.request("apibox:getApi",{pid:pid,id:id}).done(function(resp) {
				console.log(resp);
			});
		},
		showInterface:function(data){
			var self=this;
			// data ={"config":{"name":"1111111","desc":"111111111","projectName":"projectName","project":"1c67bb1faaf0c0255d71c8f4bc58e846","url":"11111111","method":"GET","createTime":1452826846748,"id":"bbe36fe19baf62630e3108a481a9a76f"},"request":"11111","request":"111111"}
			if(data){
				data.response=_.formatJson(data.response);
				data.request=_.formatJson(data.request);
				this.interfacePageView = new InterfacePageView({model:new Talent.Model(data)});
				this.contentRegion.show(this.interfacePageView);
				this.listenTo(this.interfacePageView,"","xx")
			}
		},
		showNextStep: function(e) {
			//校验值
			var flag=true;
			var interfaceName=$(".api-name").val();
			var productName=$(".project").val();
			var discribe=$(".api-desc").val();
		     if(interfaceName==""){
		     	$(".api-name").addClass("border-red");
		     	flag=false;
		     };
		     if (productName=="") {
		     	$(".project").addClass("border-red");
		     	flag=false;
		     };
		     //  if (discribe=="") {
		     // 	$(".api-desc").val("数据为空");
		     // };
		     if (flag) {
			    this.model.set("isNext", true);
				this.$(".next-page").show();
				this.$(".next-page").removeClass("next-page").addClass("pre-page");
				this.$(".c-step1").hide();
				this.$(".c-step2").show();
		     };
		},
		showPreStep: function() {
			this.$(".c-step2").hide();
			this.$(".c-step1").show();
			this.$(".pre-page").removeClass("pre-page").addClass("next-page");
			if (this.model.set("isNext")) this.$(".next-page").show();
		},
		backIndexPage: function(e) {
			alert("回到解放前")
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
		onClose: function() {}
	});
});