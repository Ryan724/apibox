define([
		'talent',
		'templates/home',
		'views/home/footer-page-view'
	],
	function(
		Talent,
		jst,
		FooterPageView
	) {
		var RegisterView = Talent.Layout.extend({
			template: jst['home/welcome/register-page'],
			ui: {},
			regions: {
				footer: ".footer"
			},
			events: function() {
				var events = {};
				events["click .login-btn"] = this.login;
				events["click .agree"] = this.register;
				events["click .l-getcode"] = this.lGetCode;
				events["click .r-getcode"] = this.rGetCode;
				events["click .forget-pwd"] = this.findPwd;
				events["click .new-user-register"] = this.toRegister;
				
				return events;
			},
			initialize: function() {},
			onShow: function() {
				this.$(".baoban-register-login").css("height", ($(document.body).outerHeight(true) - 72));
				this.footer.show(new FooterPageView());
			},
			login: function() {
				var phone = this.$(".r-phone").val();
				var pwd = this.$(".r-pwd").val();
				var code = this.$(".r-getcode").val();
				var loginData = {telphone: phone, password: pwd, phoneCode: code }
				Talent.app.request("welcome:login", loginData).done(function(resp) {
					//
				});
			},
			register: function() {
				var phone = this.$(".r-phone").val();
				var repwd = this.$(".r-repwd").val();
				var pwd = this.$(".r-pwd").val();
				var code = this.$(".r-getcode").val();
				var registerData = {telphone: phone, password: pwd, phoneCode: code }
				Talent.app.request("welcome:register", registerData).done(function(resp) {

				});

			},
			volidate:function(){
				
			},
			lGetCode: function() {
				Talent.app.request("welcome:getCode", registerData).done(function(resp) {
					
				});
			},
			rGetCode: function() {
				Talent.app.request("welcome:getPhoneCode", registerData).done(function(resp) {
					
				});
			},
			toRegister:function(){
				this.trigger("to:register","register");
			},
			Close: function() {}
		});

		return RegisterView;
	});