define(['talent',
		'templates/apibox',
		"jsdiff"
	],
	function(Talent,
		jst,
		jsDiff) {
		return Talent.ItemView.extend({
			template: jst['apibox/check-page'],
			diffTemplate: jst['apibox/diff-page'],
			diffType:["diffChars","diffWords","diffLines"],
			events: function() {
				var events = {};
				events["click .diff-btn"] = this.diffDataDeal;
				events["click .cancle-diff-btn"] = this.cancleDiff;
				events["keyup .server-data"] =this.formatServerData;
				return events;
			},
			initialize: function() {
				var data =_.formatJson(this.model.get("data"));
				this.model.set("data",data);
			},
			onShow: function() {
				var pid=this.model.get("config")["project"];
				var id=this.model.get("config")["id"];
				// Talent.app.request("apibox:getRealServerData",{pid:pid,id:id}).done(function(resp) {
				// 	console.log(resp);
				// });
				var serverData = _.formatJson(this.model.get("data")); 
				this.$(".server-data").html("<pre>"+serverData+"</pre>")
			},
			diffDataDeal:function(){
				var serverData = this.$(".server-data>pre").html();
				var apiData = this.$(".interface-data>pre").html();
				var diff = jsDiff[this.diffType[2]](apiData,serverData);
				var diffData = this.diffTemplate({diff:diff})
				this.$(".diff-data").html("<pre>"+diffData+"</pre>")
			},
			formatServerData:function(e){
				var serverData = this.$(".server-data>pre").html();
				try{
					JSON.parse(serverData);
					serverData = _.formatJson(serverData); 
					this.$(".server-data").html("<pre>"+serverData+"</pre>")
				}catch(err){
					console.log("修改data非标准JSON");
				}
				
			},
			cancleDiff: function() {
				this.trigger("cancle:diff")
			}
		});

	});