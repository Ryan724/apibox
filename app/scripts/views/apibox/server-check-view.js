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
				return events;
			},
			initialize: function() {
				var data =_.formatJson(this.model.get("data"));
				this.model.set("data",data);
			},
			onShow: function() {
				var serverData = _.formatJson('{"a": 11, "b": {"d": 12 } }'); 
				this.$(".server-data").html("<pre>"+serverData+"</pre>")
			},
			diffDataDeal:function(){
				var serverData = this.$(".server-data>pre").html();
				var apiData = this.$(".interface-data>pre").html();
				var diff = jsDiff[this.diffType[2]](apiData,serverData);
				var diffData = this.diffTemplate({diff:diff})
				this.$(".diff-data").html("<pre>"+diffData+"</pre>")
			},
			cancleDiff: function() {
				this.trigger("cancle:diff")
			}
		});

	});