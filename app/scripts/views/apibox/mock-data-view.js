define(['talent',
		'templates/apibox'
	],
	function(Talent,
		jst) {
		return Talent.ItemView.extend({
			template: jst['apibox/mock-page'],
			events: function() {
				var events = {};
				events["click .create-url-btn"] = this.createMockUrl;
				events["click .cancle-mock-btn"] = this.cancleMock;
				events["keyup .server-data"] =this.formatServerData;
				return events;
			},
			initialize: function() {
				var data =this.model.get("data") !="" ? _.formatJson(this.model.get("data")) : "";
				this.model.set("data",data);
			},
			onShow: function() {
				var self=this;
				$('body').click(function(e){
                var node=self.$(e.target).attr("data-name");
                var mockData=self.$(".mock-data pre").text();
                	if(!node){
		                	try{
		                		if(JSON.parse(mockData)){
		                			self.$(".mock-data").removeClass("border-red");
		                		};
		                	}catch(erro){
		                		self.$(".mock-data").addClass("border-red");
	                		}
                		}
            	});
            },
			createMockUrl:function(){
				var self =this;
				var mockData = this.$(".mock-data").html();
				Talent.app.request("apibox:getMockUrl",{"pid":this.model.get("pid"),"id":this.model.get("id"),"mockData":mockData}).done(function(resp) {
					if(resp.flag)self.$(".mock-url").html(resp.message).show();
				});
			},
			cancleMock: function() {
				this.trigger("cancle:mock")
			}
		});

	});