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
				var data =_.formatJson(this.model.get("data"));
				this.model.set("data",data);
			},
			onShow: function() {
				$('body').click(function(e){
                var node=this.$(e.target).attr("data-name");
                var mockData=this.$(".mock-data pre").text();
	                if(!node){
	                	try{
	                		if(JSON.parse(mockData)){
	                			this.$(".mock-data").removeClass("border-red");
	                		};
	                	}catch(erro){
	                		this.$(".mock-data").addClass("border-red");
	                	}
                	}
            	});
            },
			createMockUrl:function(){
				var mockData = this.$(".mock-data").html();
			},
			cancleMock: function() {
				this.trigger("cancle:mock")
			}
		});

	});