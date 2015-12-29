define([
	'talent',
	'templates/home',
	'views/home/header-page-view',
	'views/home/footer-page-view',
	'chosen'
], function(
	Talent,
	jst,
	HeaderPageView,
	FooterPageView,
	chosen)	{
		var MainView = Talent.Layout.extend({
		template: jst['home/housingcontrast/index-page'],
		className: 'home-page-container',
		regions: {
			header: ".header",
			footer: ".footer"
		},
		ui: {},
		events: function() {
			var events = {};
			//events["click .property-infor"] = this.toPropertyInfor;
			return events;
		},
		initialize: function() {
		},
		onRender: function() {},
		onShow: function() {
			this.header.show(new HeaderPageView());
			this.footer.show(new FooterPageView());
			$('.dept_select').chosen({
				no_results_text: "没有找到",
    			allow_single_deselect: true});
			//$("#tr-floor-room-number td").not(".added").first().text("1");//通过JQuery来向表格中加入值
            //$("#tr-floor-room-number td").not(".added").first().addClass("added");
			//输出的原理是，利用JQuery过滤器每次都寻找第一个空列输出；
			
			},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		mainViewClass: MainView,
		pageTitle: '房源对比'
	});
});