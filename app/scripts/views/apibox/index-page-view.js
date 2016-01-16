define(['talent'
	,'templates/home'
	,'views/common/page-regions/header-view'
	,'views/common/page-regions/content-view'
	,'views/common/page-regions/footer-view'
],function(Talent
	,jst
	,Header
	,Content
	,Footer
) {
	/**
	 * Inner main view class
	 * @class HomeView~MainView
	 * @extends {Backbone.View}
	 */	
	var header = Talent.Model.extend({
			defaults:{}
	});
	var content = Talent.Model.extend({
			defaults:{}
	});
	var foot = Talent.Model.extend({
			defaults:{}
	});
	var datalist = [{"desc": "这是一个轻便的接口管理器\n",
				"name": "apibox项目",
				"createTime": 1452768745220,
				"id": "1c67bb1faaf0c0255d71c8f4bc58e846",
				"apis": [{
					"name": "asdasdasdas",
					"desc": "sadasdasd",
					"project": "1c67bb1faaf0c0255d71c8f4bc58e846",
					"projectName": "apibox项目",
					"url": "dasdasd",
					"method": "POST",
					"createTime": 1452909163469,
					"id": "437a5022f0180345eb3f200dfa91dee4"
				}]
			}, {
				"name": "apibox项1目1",
				"desc": "项目测试w描述",
				"createTime": 1452768850697,
				"id": "c3078b312ad9eedc50de59cc1ea27b67",
				"apis": []
			}, {
				"desc": "打算打打",
				"name": "张京玉0001",
				"createTime": 1452769116904,
				"id": "170f10900519dc4f4cf3b3211f469070",
				"apis": []
			}];
	var MainView = Talent.Layout.extend(
	{
		template: jst['home/index-page']
		,className: 'home-page-container'
		,initialize: function() {
			this.headerView = new Header({
				model:new header({
					data:datalist
				})
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
			// data ={"config":{"name":"1111111","desc":"111111111","projectName":"projectName","project":"1c67bb1faaf0c0255d71c8f4bc58e846","url":"11111111","method":"GET","createTime":1452826846748,"id":"bbe36fe19baf62630e3108a481a9a76f"},"request":"11111","request":"111111"}
			if(data){
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
			this.contentView = new Content({
				model:new content()
			});
			this.footerView = new Footer({
				model:new foot()
			});
		}
		,events:function(){
			var events= {};
			return events;
		}
		,regions: {
			"header":".indexheader"
			,"icontent":".indexContent"
			,"footer":".indexFoot"
		}
		,onRender: function(){}
		,onShow: function() {
			this.header.show(this.headerView);
			this.icontent.show(this.contentView);
			this.footer.show(this.footerView);

		}
		,onClose:function(){}
	});
	return Talent.BasePageView.extend({
		layout:"empty-layout"
		,mainViewClass : MainView
		,pageTitle: 'apibox'
	});
});
