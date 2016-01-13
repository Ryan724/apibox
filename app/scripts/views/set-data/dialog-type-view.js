define(['talent'
	, 'templates/set-data']
	, function(Talent, jst) {
	return Talent.View.extend(
	{
		template: jst['set-data/dialog-type']
		,ui:{
			
		}
		,events: function() {
			var events = {};
			// events["click " + this.ui.uiItem]="clickNavItem";
			return events;
		}
		,initialize: function() {
			
		}
		
		,render: function() {
			
		}
	});

});
