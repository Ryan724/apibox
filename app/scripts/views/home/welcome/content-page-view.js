define([
		'talent',
		'templates/home',
		"unslider",
		"switchpage",
		'views/home/footer-page-view',
		'views/home/seach-page-view'
	],
	function(
		Talent,
		jst,
		unslider,
		switchPage,
		FooterPageView,
		SearchPageView
	) {
		var ContentView = Talent.Layout.extend({
			template: jst['home/welcome/content-page'],
			regions: {
				footer: ".footer",
				search1: ".szone1",
				search2: ".szone2"
			},
			ui: {},
			events: function() {
				var events = {};
				events["click .newslist-item"] = this.hrefNextPage;
				events["click .bb-value"] = this.hrefNextPage;
				return events;
			},
			initialize: function() {},
			onShow: function() {
				this.$(".baoban-welcome").css("height", ($(document.body).outerHeight(true) - 72));
				this.showUnslider();
				var search1View =new SearchPageView();
				var search2View =new SearchPageView();
				this.search1.show(search1View);
				this.search2.show(search2View);
				this.footer.show(new FooterPageView());
				this.showSwitchPage()
				this.listenTo(search1View,"navigate",this.close);
				this.listenTo(search2View,"navigate",this.close);
			},
			showUnslider: function() {
				this.$('.banner').unslider({
					'arrows': true,
					'height': $(document.body).outerHeight(true) - 250,
					'fluid': true,
					'dots': false
				});

			},
			showSwitchPage: function() {
				this.closeSwitchPage = this.$(".baoban-welcome").switchPage({
					'container': '.baoban-welcome',
					'loop': true,
					'keyboard': true,
					'sections': ".cont-item",
					'easing': 'ease',
					'duration': 500
				});
			},
			hrefNextPage:function(e){
				var node =$(e.currentTarget);
				var url = node.attr("url");
				window.open(url)
			},
			onClose: function() {
				this.closeSwitchPage();
			}
		});

		return ContentView;
	});