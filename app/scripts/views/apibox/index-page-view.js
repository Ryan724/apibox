define(['talent', 'templates/apibox', "views/apibox/project-select-view"], function(Talent, jst, ProjectSelectView) {
	/**
	 * Inner main view class
	 * @class HomeView~MainView
	 * @extends {Backbone.View}
	 */
	var MainView = Talent.Layout.extend({
		template: jst['apibox/index-page'],
		className: 'home-page-container',
		regions: {
			projectRegion: ".project-select"
		},
		events: function() {
			var events = {};
			events["click .project"] = this.showProjectInput;
			return events;
		},
		initialize: function() {},
		onRender: function() {},
		onShow: function() {},
		showProjectInput: function(e) {
			var self = this;
			if (this.isProjectRegionShow==true) return;
			
			Talent.app.request("apibox:getProjects").done(function(resp) {
				if(resp.flag==false) return;
				self.projectSelectView = new ProjectSelectView({model:new Talent.Model({"projects":resp.message})});
				self.projectRegion.show(self.projectSelectView);
				self.listenTo(self.projectSelectView,"choice:project",self.chageProject)
				self.$(".project-select").show();
				self.isProjectRegionShow = true;
			});
		},
		chageProject:function(project){
			this.$(".project").val(project.name).attr("id",project.id);
			this.$(".project-select").hide();
			this.isProjectRegionShow = false;
		},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		mainViewClass: MainView,
		pageTitle: 'apibox'
	});
});