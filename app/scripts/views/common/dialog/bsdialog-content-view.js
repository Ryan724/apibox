define(['_','$','talent','templates/common'],
    function(_,$,Talent,jst) {
    	return Talent.ItemView.extend({
    		template:jst['common/dialog/bsdialog-content-view']
    	});
    });