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
			events["click .next-page"] = this.showNextStep;
			events["click .next-btn"] = this.showNextStep;
			events["click .pre-page"] = this.showPreStep;
			events["click .cancle-btn"] = this.backIndexPage;
			events["click .method-li"] = this.chageMethod;
			events["click .method"] = this.showMethod;
			events["click .submit-btn"] = this.createApi;
			return events;
		},
		initialize: function() {
			this.model = new Talent.Model({
				isNext: false
			});
		},
		onRender: function() {},
		onShow: function() {
			this.$(".next-page").hide();
		},
		createApi: function(e) {
			var config = {
				"name": this.$(".api-name").val(),
				"desc": this.$(".api-desc").val(),
				"project": this.$(".project").attr("id"),
				"url": this.$(".api-url").val(),
				"method": this.$(".method").attr("id")
			};
			var api = {
				"config": config,
				"request": this.$(".api-req").val(),
				"response": this.$(".api-rsp").val()
			}
			Talent.app.request("apibox:addApi",api).done(function(resp) {
				console.log(resp)
			});
		},
		showNextStep: function(e) {
			//校验值
			this.model.set("isNext", true);
			this.$(".next-page").show();
			this.$(".next-page").removeClass("next-page").addClass("pre-page");
			this.$(".c-step1").hide();
			this.$(".c-step2").show();
		},
		showPreStep: function() {
			this.$(".c-step2").hide();
			this.$(".c-step1").show();
			this.$(".pre-page").removeClass("pre-page").addClass("next-page");
			if (this.model.set("isNext")) this.$(".next-page").show();
		},
		backIndexPage: function(e) {
			alert("回到解放前")
		},
		showProjectInput: function(e) {
			var self = this;
			if (this.isProjectRegionShow == true) return;

			Talent.app.request("apibox:getProjects").done(function(resp) {
				if (resp.flag == false) return;
				self.projectSelectView = new ProjectSelectView({
					model: new Talent.Model({
						"projects": resp.message
					})
				});
				self.projectRegion.show(self.projectSelectView);
				self.listenTo(self.projectSelectView, "choice:project", self.chageProject)
				self.$(".project-select").show();
				self.isProjectRegionShow = true;
			});
		},
		chageMethod: function(e) {
			var $node = $(e.currentTarget);
			var id = $node.attr("id");
			this.$(".method").val(id).attr("id", id);
			this.$(".methods").hide();
		},
		showMethod: function() {
			this.$(".methods").show();
		},
		chageProject: function(project) {
			this.$(".project").val(project.name).attr("id", project.id);
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