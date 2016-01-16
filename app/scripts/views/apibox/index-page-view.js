define(['talent',
	'templates/apibox',
	'views/apibox/header-view',
	'views/apibox/add-interface-view',
	'views/apibox/content-view'
], function(Talent,
	jst,
	Header,
	AddInterface,
	Content) {
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
			Talent.app.request("apibox:getAllData").done(function(resp) {
				console.log(resp)
			});
		},
		onRender: function() {
			var self = this;
			this.headerView = new Header({
				model: new Talent.Model({
					data: this.datalist
				})
			});
			this.contentView = new Content({
				model:new Talent.Model()
			}); 
			this.addInterfaceView = new AddInterface();
			this.listenTo(this.headerView, "add:interface", function() {
				self.icontent.show(self.addInterfaceView);
			});
			this.listenTo(this.headerView,"go:indexPage",function(){
				self.icontent.show(self.contentView);
			});
			this.listenTo(this.addInterfaceView, "add:content", function() {
				self.icontent.show(self.contentView);
			});
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