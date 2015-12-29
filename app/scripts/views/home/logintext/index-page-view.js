define([
	'talent',
	'templates/home',
	'views/home/header-page-view',
	'views/home/footer-page-view',
	'md5'
], function(
	Talent,
	jst,
	HeaderPageView,
	FooterPageView,
	MD5) {
	var MainView = Talent.Layout.extend({
		template: jst['home/logintext/index-page'],
		className: 'home-page-container',
		regions: {
			header: ".header",
			footer: ".footer"
		},
		ui: {},
		events: function() {
			var events = {};
			events["click #J_kaptcha_jpg"] = this.changeJpg;
			events["click #J_submit"] = this.loginPage;
			return events;
		},
		initialize: function() {
			$("#J_kaptcha_jpg").attr("src", global_ctxPath + "/kaptcha/img?t=" + new Date().getTime());
		},
		onRender: function() {},
		onShow: function() {
			this.header.show(new HeaderPageView());
			this.footer.show(new FooterPageView());
		},
		changeJpg: function() {
			$("#J_kaptcha_jpg").attr("src", global_ctxPath + "/kaptcha/img?t=" + new Date().getTime());
		},
		loginPage: function() {
			var $J_loginForm = $("#J_loginForm");
			var md5pwd = $J_loginForm.find("input[name='pwd']").val();
			$J_loginForm.find("input[name='pwd']").val(MD5(md5pwd).toLowerCase());
			$.ajax({
				url: global_ctxPath + "/sys/login",
				data: $J_loginForm.serialize(),
				type: 'POST',
				dataType: 'json',
				success: function(data) {
					if (data && data.status != "false") {
						window.location.href = "${global_ctxPath}/sys/index";
					}
				}
			});
		},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		mainViewClass: MainView,
		pageTitle: '登陆页面'
	});
});