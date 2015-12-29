define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var AuthenticationInformationView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/authentication-information-page'],
			ui: {},
			events: function() {
				var events = {};
				events["click .enterprise-btn"] = this.enterpriseInput;
				events["click .individual-btn"] = this.individualInput;
				return events;
			},
			initialize: function() {
			},
			onShow: function() {
				$(".enterprise-contenrt").hide()
				$("input[name=user-type]:eq(0)").attr("checked",'checked');
			},
			enterpriseInput:function(){
				$(".individual-contenrt").hide();
				$(".enterprise-contenrt").show();
			},
			individualInput:function(){
				$(".enterprise-contenrt").hide();
				$(".individual-contenrt").show();
			},
		    Close: function() {}
		});

		return AuthenticationInformationView;
	});