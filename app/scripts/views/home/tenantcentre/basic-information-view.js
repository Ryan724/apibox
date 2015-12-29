define([
		'talent',
		'views/home/tenantcentre/basic-information-page-view'
	],
	function(
		Talent,
        BasicInformationView
	){
		var BasicInformationCompositeView = Talent.CompositeView.extend({
			ui: {},
			template :'<div class="centre-page-title"></div>',
			itemViewContainer : '<div class="centre-page-title">',
			itemView: BasicInformationView,//将Item的元素都渲染到一个div中
            collectionEvents: {
                "add":"modelAdded"
            },
			events: function() {
				var events = {};
				events["click .save-btn"] = this.addLinkMan;
				return events;
			},
			initialize: function() {},
			onShow: function() {},
			addLinkMan:function(){
				var self = this;
            	self.collection.create({
            		LinkMan:$("#linkman-name").val(),
            		JobTitle:$("#linkman-job").val(),
            		LinkPhone:$("#linkman-phone").val(),
            		Disable:$("input:radio[name=status]:checked").val(),
            		Order:self.collection.nextOrder()
           			 });
         	},
         	modelAdded:function(){
         		var self = this;
         		var flag = self.model.get("Order");
                switch(flag){
                	case 1:
                	$("tbody tr:eq(0)").replaceWith("<tr><td>"+self.model.get("LinkMan")+"</td>"+"<td>"+self.model.get("JobTitle")+"</td>"+"<td>"+self.model.get("LinkPhone")+"</td>"+"<td>"+self.model.get("Disable")+"</td>"+"<td>&nbsp;</td></tr>");
                	break;
                	case 2:
                	$("tbody tr:eq(1)").replaceWith("<tr><td>"+self.model.get("LinkMan")+"</td>"+"<td>"+self.model.get("JobTitle")+"</td>"+"<td>"+self.model.get("LinkPhone")+"</td>"+"<td>"+self.model.get("Disable")+"</td>"+"<td>&nbsp;</td></tr>");
                	break;
                	case 0:
                	$("tbody tr:eq(2)").replaceWith("<tr><td>"+self.model.get("LinkMan")+"</td>"+"<td>"+self.model.get("JobTitle")+"</td>"+"<td>"+self.model.get("LinkPhone")+"</td>"+"<td>"+self.model.get("Disable")+"</td>"+"<td>&nbsp;</td></tr>");
                	break;
                }
         	},
		    Close: function() {}
		});

		return BasicInformationCompositeView;
	});