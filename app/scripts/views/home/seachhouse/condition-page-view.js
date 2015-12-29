define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	) {
		var MenuView = Talent.ItemView.extend({
			template: jst['home/seachhouse/condition-page'],
			ui: {},
			events: function() {
				var events = {};
				events["mouseover .regional-plate span"] = this.regionalPlate;
				events["click .regional-plate .active"] = this.showDetile;
				events["click .regional-plate-detail .sure"] = this.hiddenDetile;
				events["mouseover .subway span"] = this.subway;
				events["click .subway .active"] = this.showDetile;
				events["click .subway-detail .sure"] = this.hiddenDetile;
				events["click input[type='radio']"] = this.radioToggle;
				events["click .price-item"] = this.TogglePrice;
				return events;
			},
			initialize: function() {},
			onShow: function() {},
			subway: function(e) {
				var node = $(e.currentTarget);
				if (node.attr("class") != "none" && node.attr("class") != "active" && this.$(".subway-detail").css("display") != "block") {
					node.addClass("active").siblings().removeClass("active")
				}
			},
			regionalPlate: function(e) {
				var node = $(e.currentTarget);
				if (node.attr("class") != "none" && node.attr("class") != "active" && this.$(".regional-plate-detail").css("display") != "block") {
					node.addClass("active").siblings().removeClass("active")
				}
			},
			showDetile: function(e) {
				var node = $(e.currentTarget);
				if (node.parent().attr("class") == "regional-plate") {
					this.$(".regional-plate").find(".active").addClass("active2").siblings().removeClass("active2")
					this.$(".regional-plate-detail").show();
				}else{
					this.$(".subway").find(".active").addClass("active2").siblings().removeClass("active2")
					this.$(".subway-detail").show();
				}

			},
			hiddenDetile: function(e) {
				var node = $(e.currentTarget);
				var checkedNode =node.parent().find("input[type='radio']:checked");
				var newCdt = {}; 
				var flag =false;
				if(checkedNode.length==1){
					newCdt.tag=checkedNode.attr("tag");
					flag =true;
				}
				
				if (node.parent().attr("class") == "regional-plate-detail") {
					if(flag){newCdt.text='区域板块:'+checkedNode.parent().text(); newCdt.id = "plate"}
					this.$(".regional-plate").find(".active2").removeClass("active2")
					this.$(".regional-plate-detail").hide();
				}else{
					if(flag){newCdt.text='轨道交通:'+checkedNode.parent().text(); newCdt.id = "subway"}
					this.$(".subway").find(".active2").removeClass("active2")
					this.$(".subway-detail").hide();
				}
				if(flag){
					$(node.parent().parent().find(".none")[0]).find("input[type='radio']").attr("checked", false);
					this.addNewCdt(newCdt);
				}
			},
			radioToggle: function(e) {
				var node = $(e.currentTarget);
				node.parent().siblings().find("input[type='radio']").attr("checked", false);
				var activePID = node.parent().parent().attr("id")||node.parent().parent().attr("class");
				var newCdt = {
					tag: node.attr("tag")
				}; 
				switch (activePID) {
					case "regional-plate":
						newCdt.text = '区域板块:不限';
						newCdt.id ="plate";
						this.addNewCdt(newCdt);
						break;
					case "subway":
						newCdt.text = '轨道交通:不限';
						newCdt.id ="subway";
						this.addNewCdt(newCdt);
						break;
					case "type":
						newCdt.text = '物业类型:' + node.parent().text();
						newCdt.id = "type";
						this.addNewCdt(newCdt);
						break;
					case "price-day":
						newCdt.text = '租金:' + node.parent().text();
						newCdt.id = "price";
						this.addNewCdt(newCdt);
						break;
					case "price-month":
						newCdt.text = '租金:' + node.parent().text();
						newCdt.id = "price";
						this.addNewCdt(newCdt);
						break;
					case "acreage":
						newCdt.text = '面积m2:' + node.parent().text();
						newCdt.id = "acreage";
						this.addNewCdt(newCdt);
						break;
				}
			},
			addNewCdt: function(newCdt) {
				if(this.$(".item").length == 0)  this.$(".condition-detail").css("visibility","visible");
				this.$(".cdt-details").find("#" + newCdt.id).remove();
				var newCdtHtml = '<span class="item" id="' + newCdt.id + '" tag="' + newCdt.tag + '">' + newCdt.text + '</span>'
				this.$(".cdt-details").append(newCdtHtml);
			},
			TogglePrice: function(e) {
				var self = this;
				var node = $(e.currentTarget);
				node.removeClass("price-not-selected").siblings().addClass("price-not-selected");
				node.attr("id") === "m2-day" ? (function() {
					self.$(".price-day").removeClass("hidden")
					self.$(".price-month").addClass("hidden")
				})() : (function() {
					self.$(".price-day").addClass("hidden")
					self.$(".price-month").removeClass("hidden")
				})()
			},
			onClose: function() {}
		});

		return MenuView;
	});