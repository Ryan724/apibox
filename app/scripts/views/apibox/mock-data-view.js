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
				events["blur  .mock-data"] =this.formatMockData;
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
            formatMockData:function(){
            	var mockData = this.$(".mock-data").text().replace(/[ ]|\ +|[\r\n]/g,"");
        		try{
					JSON.parse(mockData);
					mockData = _.formatJson(mockData); 
					this.$(".mock-data").html("<pre>"+mockData+"</pre>")
				}catch(err){
					console.log("修改data非标准JSON");
				}
            },
			createMockUrl:function(){
				var self =this;
				var mockData = this.$(".mock-data").text().replace(/[ ]|\ +|[\r\n]/g,"");
				Talent.app.request("apibox:getMockUrl",{"pid":this.model.get("pid"),"id":this.model.get("id"),"mock":mockData}).done(function(resp) {
					if(resp.flag)self.$(".mock-url").html(resp.message).show();
				});
			},
			cancleMock: function() {
				this.trigger("cancle:mock")
			}
		});

	});