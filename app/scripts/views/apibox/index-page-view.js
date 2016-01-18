define(['talent',
	'templates/apibox',
	'views/apibox/header-view',
	'views/apibox/add-interface-view',
 	'views/apibox/content-view',
	'views/apibox/interface-page-view'
], function(Talent,
	jst,
	Header,
	AddInterface,
	Content,
	InterfacePageView) {
	var MainView = Talent.Layout.extend({
		template: jst['apibox/index-page'],
		className: 'home-page-container',
		events: function() {
			var events = {};
			return events;
		},
		regions: {
			"header": ".indexheader",
			"icontent": ".indexContent"
		},
		initialize: function() {
			var self = this;

		},
		onRender: function() {
			var self = this;
			//--------------------------------实例化--------------------------------------
			this.headerView = new Header();  				//---头header
			this.contentView = new Content();				//---主页content
			this.addInterfaceView = new AddInterface();		//---新建页面content
			//-------------------------------事件监听-------------------------------------

			this.listenTo(this.headerView,"seach:apicontent",function(data){//搜索
				self.getInterfaceData(data.pid,data.id)
			});
			this.listenTo(this.headerView, "add:interface", function() {
				self.icontent.show(self.addInterfaceView);
			});
			this.listenTo(this.headerView,"go:indexPage",function(){
				self.icontent.show(self.contentView);
			});
			this.listenTo(this.headerView,"change:count",function(data){
				self.contentView.model.set("count",self.newCount(data));
			});
			this.listenTo(this.addInterfaceView, "add:content", function() {
				self.icontent.show(self.contentView);
			});
			this.listenTo(this.addInterfaceView,"reset:apilist",function(){
				self.headerView.trigger("reset:apilist");
			});
			
		},
		getInterfaceData:function(pid,id){
			var self =this;
			Talent.app.request("apibox:getApi",{pid:pid,id:id}).done(function(resp) {
				if(resp.flag) self.showInterface(resp.message)
			});
		}, 
		showInterface:function(data){
			var self=this;
			data=JSON.parse(data);
			if(data){
				data.response=_.formatJson(data.response);
				data.request=_.formatJson(data.request);
				this.interfacePageView = new InterfacePageView({model:new Talent.Model(data)});
				this.icontent.show(this.interfacePageView);
				this.listenTo(this.interfacePageView,"","xx")
			}
		},
		newCount:function(data){
			var self = this;
			self.count = 0;
			_.each(data,function(list){
				self.count +=list.apis.length;
			});
			return self.count;
		},
		onShow: function() {
			this.header.show(this.headerView);
			this.icontent.show(this.contentView);
		},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		layout: "empty-layout",
		mainViewClass: MainView,
		pageTitle: 'apibox'
	});
});
