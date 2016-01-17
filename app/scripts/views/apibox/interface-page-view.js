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
				events["click .data-edit"] = this.editData;
				events["blur textarea"] = this.exitEditedData;
				return events;
			},
			initialize: function() {},
			onShow:function(){},
			dataMockShow:function(e){
				var self=this;
				var data=_.formatJson(self.model.get("request"));
				this.$(".data-layer").show();
				this.mockDataView = new MockDataView({model:new Talent.Model({"data":data})});
				this.dataLayerRegion.show(this.mockDataView)
				this.listenTo(this.mockDataView,"cancle:mock",this.closeDataRegionClose);
			},
			serverCheckShow:function(e){
				var self=this
				var data=_.formatJson(self.model.get("response"));
				var config=self.model.get("config");
				this.$(".data-layer").show();
				this.serverCheckView = new ServerCheckView({model:new Talent.Model({
					"data":data
					,"config":config
				})});
				this.dataLayerRegion.show(this.serverCheckView)
				this.listenTo(this.serverCheckView,"cancle:diff",this.closeDataRegionClose);
			},
			closeDataRegionClose:function(){
				this.dataLayerRegion.close();
				this.$(".data-layer").hide()
			}
			,editData:function(e){
				var node=this.$(e.currentTarget);
				var val=node.children("pre").text();
				node.children("pre").hide();
				node.children("textarea").val(val).show().focus();
			}
			,exitEditedData:function(e){
				var self=this;
				var node=this.$(e.currentTarget);
				var val=node.val();
				node.hide();
				if (node.hasClass("api-req-deit")) {
					self.model.set({"request":val});
				}else if(node.hasClass("api-rsp-edit")){
					self.model.set({"response":val})
				};
				var data={
					config:this.model.get("config"),
					request:this.model.get("request"),
					response:this.model.get("response")
				}
				try{
	                if(JSON.parse(val)){
	                	val=_.formatJson(val);
	                	node.prev().text(val).removeClass("border-red").show();
	                };
	            }catch(erro){
	                	node.prev().text(val).addClass("border-red").show();
	                }
				Talent.app.request("apibox:updateData",data).done(function(resp) {
					console.log(resp);
				});
			}
		});

	});