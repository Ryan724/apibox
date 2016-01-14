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
				events["click .add-sure"] = this.addProject;
				events["click .project-item"] = this.choiceItem;
				events["click .add-cancle"] = this.addProjectHide;
				return events;
			},
			initialize: function() {},
			choiceItem:function(e){
				var $node =$(e.currentTarget);
				var id = $node.attr("id");
				var project = _.find(this.model.get("projects"),{"id":id});
				this.trigger("choice:project",project)
			},
			addProject:function(e){
				var self = this;
				var project ={
					desc : this.$(".project-desc").val(),
					name : this.$(".project-name").val()
				}
				Talent.app.request("apibox:addProject",project).done(function(resp) {
					if(resp.flag==false) return;
					self.trigger("choice:project",resp.message)
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