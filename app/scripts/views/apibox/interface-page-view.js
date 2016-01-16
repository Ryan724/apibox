define(['talent',
		'templates/apibox',
		'views/apibox/server-check-view',
		'views/apibox/mock-data-view',
		'jsdiff'
	],	
	function(Talent,
		jst,
		ServerCheckView,
		MockDataView,
		jsDiff) {
		return Talent.Layout.extend({
			template: jst['apibox/interface-page'],
			regions:{
				dataLayerRegion : ".data-layer-data-layer"
			},
			events: function() {
				var events = {};
				events["click .data-mock-btn"] = this.dataMockShow;
				events["click .server-check-btn"] = this.serverCheckShow;
				return events;
			},
			initialize: function() {},
			onShow:function(){
				// this.serverCheckShow();
			},
			dataMockShow:function(e){
				var self=this;
				debugger;
				var data=_.formatJson(self.model.get("response"));
				this.$(".data-layer").show();
				this.mockDataView = new MockDataView({model:new Talent.Model({"data":data})});
				this.dataLayerRegion.show(this.mockDataView)
				this.listenTo(this.mockDataView,"cancle:mock",this.closeDataRegionClose);
			},
			serverCheckShow:function(e){
				var self=this
				var data=_.formatJson(self.model.get("response"));
				this.$(".data-layer").show();
				this.serverCheckView = new ServerCheckView({model:new Talent.Model({"data":data})});
				this.dataLayerRegion.show(this.serverCheckView)
				this.listenTo(this.serverCheckView,"cancle:diff",this.closeDataRegionClose);
			},
			closeDataRegionClose:function(){
				this.dataLayerRegion.close();
				this.$(".data-layer").hide()
			}
		});

	});