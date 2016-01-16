define(['talent'
	,'templates/home'
	,'views/common/page-regions/header-view'
	,'views/common/page-regions/content-view'
	,'views/common/page-regions/footer-view'
],function(Talent
	,jst
	,Header
	,Content
	,Footer
) {
	/**
	 * Inner main view class
	 * @class HomeView~MainView
	 * @extends {Backbone.View}
	 */	
	var header = Talent.Model.extend({
			defaults:{}
	});
	var content = Talent.Model.extend({
			defaults:{}
	});
	var foot = Talent.Model.extend({
			defaults:{}
	});
	var datalist = [{"desc": "这是一个轻便的接口管理器\n",
				"name": "apibox项目",
				"createTime": 1452768745220,
				"id": "1c67bb1faaf0c0255d71c8f4bc58e846",
				"apis": [{
					"name": "asdasdasdas",
					"desc": "sadasdasd",
					"project": "1c67bb1faaf0c0255d71c8f4bc58e846",
					"projectName": "apibox项目",
					"url": "dasdasd",
					"method": "POST",
					"createTime": 1452909163469,
					"id": "437a5022f0180345eb3f200dfa91dee4"
				}]
			}, {
				"name": "apibox项1目1",
				"desc": "项目测试w描述",
				"createTime": 1452768850697,
				"id": "c3078b312ad9eedc50de59cc1ea27b67",
				"apis": []
			}, {
				"desc": "打算打打",
				"name": "张京玉0001",
				"createTime": 1452769116904,
				"id": "170f10900519dc4f4cf3b3211f469070",
				"apis": []
			}];
	var MainView = Talent.Layout.extend(
	{
		template: jst['home/index-page']
		,className: 'home-page-container'
		,initialize: function() {
			this.headerView = new Header({
				model:new header({
					data:datalist
				})
			});
			this.contentView = new Content({
				model:new content()
			});
			this.footerView = new Footer({
				model:new foot()
			});
		}
		,events:function(){
			var events= {};
			return events;
		}
		,regions: {
			"header":".indexheader"
			,"icontent":".indexContent"
			,"footer":".indexFoot"
		}
		,onRender: function(){}
		,onShow: function() {
			this.header.show(this.headerView);
			this.icontent.show(this.contentView);
			this.footer.show(this.footerView);

		}
		,onClose:function(){}
	});
	return Talent.BasePageView.extend({
		layout:"empty-layout"
		,mainViewClass : MainView
		,pageTitle: 'apibox'
	});
});
