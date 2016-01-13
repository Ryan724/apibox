define(['talent'
	,'templates/set-data'
	,'views/set-data/dialog-type-view'
	,'views/common/dialog/bsdialog'
],function(Talent
	,jst
	,DialogTypeView
	,BSDialogView
) {
	var MainView = Talent.Layout.extend({
		template: jst['set-data/index-page']
		,initialize: function() {

		}
		,regions: {
			// main: '.page-main-region'
		}
		,ui:{
			// item: '.ui-item'
			
		}
		,events:function(){
			var events = {};
			events['click .data-key'] = 'editDataKey';
			// events['keyup .input-key'] = 'changeInfoLength';
			events['blur .input-key'] = 'toggleEditStatus';
			events['keyup .edit-input'] = 'editData';
			events['keyup .input-key'] = 'thinkData';
			events['click .select-datalist li'] = 'toggelData';
			return events;
		}
		,editDataKey:function(e){
			$(e.target).text("");
			$(e.target).siblings(".input-key").focus().show();
		}
		,changeInfoLength:function(e){
			var len=$(e.target).val().length;
			$(e.target).attr("size",len);
			var patt1=new RegExp(":");
			if(patt1.test($(e.target).val())){
				$(e.target).hide();
				$(e.target).siblings(".data-key").text($(e.target).val());
				$(e.target).parent().siblings(".value-box").children(".input-value").show().focus();
			}
		}
		,toggleEditStatus:function(e){
			$(e.target).hide();
			$(e.target).siblings(".data-key").text($(e.target).val());
		}
		,thinkData:function(e){
			var self=this;
			var html='';
			var data=[{name:"Object"}
					   ,{name:"String"}
					   ,{name:"Array"} 
					   ,{name:"Number"}
					   ,{name:"Boolean"}
					 ];
			var patt1=new RegExp(":");
			if(patt1.test($(e.target).val())){
			    html+='<div class="data-list">';
			    html+='<input type="text" class="edit-input" placeholder="请选择">';
			    html+='<ul class="select-datalist">';
			    _.each(data,function(item){
			    	html+='<li data-name="'+item.name+'">'+item.name+'</li>';
			    });
			    html+='</ul>';
			    html+='<span class="select-icon"></span>'
			    html+='</div>'
				$(e.target).after($(html));
			}
		}
		,toggelData:function(e){
			var self=this;
			var html='';
			var dataName=$(e.currentTarget).attr("data-name");
			if(dataName=='Object'){
				html=self.htmlType('{','}');
			}else if (dataName=='Array') {
				html=self.htmlType('[',']');
			}else if (dataName=='Boolean' || dataName=='Number' ||dataName=='String') {
				html=self.htmlType('"','"');
			}
			$(e.currentTarget).parents(".data-list").eq(0).html(html).find(".data-key").text(dataName);
		}
		,htmlType:function(open,close){
			var html='';
			html+='<div class="data-desc">'+open+'</div>';
			html+='<div class="key-box">';
			html+='<span class="data-key"></span>';
			html+='<input type="text" class="input-key" size="1">';
			html+='</div>'
			html+='<div class="data-close">'+close+'</div>';
			return html;
		}
		,editData:function(e){
			var val=$(e.currentTarget).val();
			var html='';
			var data=[{name:"Object"}
					   ,{name:"String"}
					   ,{name:"Array"}
					   ,{name:"Number"}
					   ,{name:"Boolean"}
					 ];
			_.each(data,function(item){
				if (item.name.indexOf(val)>-1) {
					html+='<li data-name="'+item.name+'">'+item.name+'</li>';
				};
			});
			$(e.currentTarget).next().empty().append(html);
		}
	});

	return Talent.BasePageView.extend({
		mainViewClass : MainView
		,pageTitle: 'About'
	});
});
