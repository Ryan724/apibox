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
			if (this.isProjectRegionShow) return;
			this.projectSelectView = new ProjectSelectView();
			// Talent.app.request("apibox:getClassData").done(function(resp) {
			self.projectRegion.show(this.projectSelectView);
			self.$(".project-select").show();
			self.isProjectRegionShow = true;
			// });
		},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		mainViewClass: MainView,
		pageTitle: 'apibox'
	});
});