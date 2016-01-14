define(['talent',
		'templates/apibox'
	],
	function(Talent,
		jst) {
		return Talent.ItemView.extend({
			template: jst['apibox/project-page'],
			className:"project-page",
			events: function() {
				var events = {};
				events["click .add-project"] = this.addProjectShow;
				events["click .back-project"] = this.addProjectHide;
				return events;
			},
			initialize: function() {
				this.model = new Talent.Model({
					projects: [{
						name: "xxxxxxxxxx",
						desc: "xxxxxxxxxxxxxxxxx",
						id: "1"
					},{
						name: "xxxxxxxxxx",
						desc: "xxxxxxxxxxxxxxxxx",
						id: "2"
					},{
						name: "xxxxxxxxxx",
						desc: "xxxxxxxxxxxxxxxxx",
						id: "3"
					},{
						name: "xxxxxxxxxx",
						desc: "xxxxxxxxxxxxxxxxx",
						id: "4"
					}]
				});
			},
			addProjectShow:function(e){
				this.$(".p-step1").hide();
				this.$(".p-step2").show();
			},
			addProjectHide:function(){
				this.$(".p-step2").hide();
				this.$(".p-step1").show();
			},
			onShow:function(){
			}
		});

	});