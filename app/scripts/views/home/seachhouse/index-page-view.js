define([
	'talent',
	'templates/home',
	'views/home/header-page-view',
	'views/home/footer-page-view',
	'views/home/seach-page-view',
	'views/home/seachhouse/condition-page-view',
	'views/home/seachhouse/recommend-page-view',
	'views/home/seachhouse/hot-page-view',
	'views/home/seachhouse/detail-page-view',
], function(
	Talent,
	jst,
	HeaderPageView,
	FooterPageView,
	SeachPageView,
	ConditionPageView,
	RecommendPageView,
	HotPageView,
	DetailPageView) {
	var MainView = Talent.Layout.extend({
		template: jst['home/seachhouse/index-page'],
		className: 'home-page-container',
		regions: {
			header: ".header",
			footer: ".footer",
			seach: ".seach",
			condition: ".condition-houses",
			hotHouses: ".hot-houses",
			recommendHouses: ".recommend-houses"
		},
		ui: {},
		events: function() {
			var events = {};
			return events;
		},
		initialize: function() {
			this.conditionModel = new Talent.Model({
				"regionalPlate": [{
					"regionId": "xxxx",
					"regionName": "浦东",
					"subRegions": [{
						"subRegionId": "xxxx",
						"subRegionName": "世纪公园"
					}]
				}],
				"subWay": [{
					"subWayId": "xxxx",
					"subWayName": "1号线",
					"subWayStations": [{
						"subWayStationId": "xxxx",
						"subWayStationName": "世纪公园"
					}]
				}],
			});
			this.recommendModel = new Talent.Model({
				"recommendHouseResources": [{
					"HouseResourcesId": "xxxx",
					"HouseResourcesName": "中心城",
					"HouseResourcesprice": "4.5-6",
					"HouseResourcesImgUrl": "https://drscdn.500px.org/photo/53685060/m%3D1170/b41577c95cffc03030736f54d7ca07b8"
				}]
			});
			this.hotModel = new Talent.Model({
				"totalPages": 70,
				"hotHouseResources": [{
					"HouseResourcesId": "xxxx",
					"HouseResourcesName": "中心城1",
					"HouseResourcesprice": "4.5-6",
					"HouseResourcesImgUrl": "https://drscdn.500px.org/photo/53685060/m%3D1170/b41577c95cffc03030736f54d7ca07b8"
				}, {
					"HouseResourcesId": "xxxx",
					"HouseResourcesName": "中心城2",
					"HouseResourcesprice": "4.5-6",
					"HouseResourcesImgUrl": "https://drscdn.500px.org/photo/53685060/m%3D1170/b41577c95cffc03030736f54d7ca07b8"
				}, {
					"HouseResourcesId": "xxxx",
					"HouseResourcesName": "中心城3",
					"HouseResourcesprice": "4.5-6",
					"HouseResourcesImgUrl": "https://drscdn.500px.org/photo/53685060/m%3D1170/b41577c95cffc03030736f54d7ca07b8"
				}, {
					"HouseResourcesId": "xxxx",
					"HouseResourcesName": "中心城4",
					"HouseResourcesprice": "4.5-6",
					"HouseResourcesImgUrl": "https://drscdn.500px.org/photo/53685060/m%3D1170/b41577c95cffc03030736f54d7ca07b8"
				}, {
					"HouseResourcesId": "xxxx",
					"HouseResourcesName": "中心城5",
					"HouseResourcesprice": "4.5-6",
					"HouseResourcesImgUrl": "https://drscdn.500px.org/photo/53685060/m%3D1170/b41577c95cffc03030736f54d7ca07b8"
				}]
			});
		},
		onRender: function() {},
		onShow: function() {
			this.seach.show(new SeachPageView())
			this.header.show(new HeaderPageView());
			this.footer.show(new FooterPageView());
			this.condition.show(new ConditionPageView({
				model: this.conditionModel
			}));
			this.recommendHouses.show(new RecommendPageView({
				model: this.recommendModel
			}));
			//------------------------------------------------------------
			var hotHousesView = new DetailPageView({
				model: this.hotModel
			})
			this.hotHouses.show(hotHousesView);
			this.listenTo(hotHousesView, "show:houseListDetail", this.requestListDetailData)
				//------------------------------------------------------------
		},
		requestListDetailData: function() {
			var self = this;
			// Talent.app.request("welcome:getDetailListData", {
			// }).done(function(resp) {
			self.showDetailHousesView()
			// });
		},
		showDetailHousesView: function() {
			var detailHousesView = new DetailPageView({
				model: this.hotModel
			})
			this.hotHouses.show(detailHousesView);
			this.listenTo(detailHousesView, "show:houseListDetail", this.requestListDetailData)
		},
		onClose: function() {}
	});
	return Talent.BasePageView.extend({
		mainViewClass: MainView,
		pageTitle: '查询房源'
	});
});