define([
		'talent',
		'templates/home',
		'views/home/menu-page-view'
	],
	function(
		Talent,
		jst,
		MenuPageView
	) {
		var HeaderView = Talent.Layout.extend({
			template: jst['home/header-page'],
			regions: {
				mincatalog:".mincatalog>span",//控制菜单的位置
			},
			events: function() {
				var events = {};
				events["click .mincatalog"]=this.showCata;
				events["click .tenant-center-list"]=this.toTenantCentre;
				events["click .owner-center-list"]=this.toOwnerCentre;
				events["click .login-btn"]=this.toLogin;
				events["click .register-btn"]=this.toLogin;
				return events;
			},
			initialize: function() {},
			onShow: function() {},
			showCata:function(){
				this.mincatalog.show(new MenuPageView());
			},//渲染菜单到指定位置
			toTenantCentre:function(){
               Talent.app.execute('history:navigate', '#home/tenantcentre', true);
               $("#pages").remove();
			},
			toOwnerCentre:function(){
               Talent.app.execute('history:navigate', '#home/ownercentre', true);
               $("#pages").remove();
			},
			toLogin:function(e){
				var node = $(e.currentTarget);
				var eventName = node.attr("class")=="login-btn"?"login":"register"
             	this.trigger("user",eventName)
			},
			onClose: function() {}
		});

		return HeaderView;
	});