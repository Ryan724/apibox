define([
		'talent',
		'templates/home'
	],
	function(
		Talent,
		jst
	){
		var BasicInformationView = Talent.ItemView.extend({
			template: jst['home/ownercentre/basic-information-page'],
			ui: {},
			events: function() {
				var events = {};
				events["click .save-btn"] = this.addLinkMan;
				return events;
			},
			initialize: function() {},
			onShow: function() {},
			addLinkMan:function(){
            var employees = [{ "LinkMan":"","JobTitle":"","LinkPhone":"","Disable":""}];
            var txt = '{ "employees" : [' +
          '{ "LinkMan":"","JobTitle":"","LinkPhone":"","Disable":"" },' +
          '{ "LinkMan":"","JobTitle":"","LinkPhone":"","Disable":"" },' +
          '{ "LinkMan":"","JobTitle":"","LinkPhone":"","Disable":"" } ]}';
            var obj = eval ("(" + txt + ")");
            obj.employees[0].LinkMan = $("#linkman-name").val();
            obj.employees[0].JobTitle = $("#linkman-job").val();
            obj.employees[0].LinkPhone = $("#linkman-phone").val();
            obj.employees[0].Disable = $("input:radio[name=status]:checked").val();
         	$("tbody tr:eq(0)").replaceWith("<tr><td>"+obj.employees[0].LinkMan+"</td>"+"<td>"+obj.employees[0].JobTitle+"</td>"+"<td>"+obj.employees[0].LinkPhone+"</td>"+"<td>"+ obj.employees[0].Disable+"</td>"+"<td>&nbsp;</td></tr>");
            },
		    Close: function() {}
		});

		return BasicInformationView;
	});