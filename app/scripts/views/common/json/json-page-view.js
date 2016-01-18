define(['talent',
	'templates/common',
], function(Talent,
	jst) {
	return Talent.Layout.extend({
		template: jst['common/json/json-page'],
		inputTpl: jst['common/json/enter-span'],
		mapTpl: jst['common/json/map-page'],
		className:"json-root-page-v",
		events: function() {
			var events = {};
			events["click .glyphicon-chevron-down"] = this.showSonView;
			events["click .glyphicon-chevron-right"] = this.hideSonView;
			events["click .glyphicon-plus"] = this.appendInput;
			events["click .glyphicon-trash"] = this.trashInput;
			events["change .type"] = this.isShowValue;
			events["keyup .name"] = this.changeValue;
			events["click .json-add"] = this.addData;
			events["click .json-cancel"] = this.cacelInput;
			events["click .see-json"] = this.triggerSeeJson;
			return events;
		},
		initialize: function() {
			this.model = new Talent.Model({
				rootPid: (new Date()).valueOf()
			})
			this.typeArr=["String","Object","Array","Number","Boolean","Date"];
		},
		onShow:function(){
			var rootPid = this.model.get("rootPid");
			this[rootPid] ={};
			this.root=this[rootPid];
			if(this.model.get("data")){
				this.bulidDataChart();
			}
		},
		bulidDataChart:function(){
			var data = this.model.get("data");
		},
		isShowValue: function(e) {
			var node = $(e.currentTarget);
			var type = node.val();
			this.changeValue(e);
			if (type ==1||type ==2) {
				node.siblings(".text-span").hide();
			} else {
				node.siblings(".text-span").show()
			}
		},
		changeValue:function(e){
			var node = $(e.currentTarget).parent();
			var valNode = node.find(".text-span>.value");
			var type = +node.find(".type").val();
			var name = node.find(".name").val();
			var result = [name,0,0,Math.round(Math.random()*10),true,(new Date()).valueOf()];
			valNode.val(result[type]);
		},
		cacelInput:function(e){
			var node = $(e.currentTarget).parent();
			node.siblings(".glyphicon-plus").show();
			node.detach();
		},
		trashInput:function(e){
			var self = this;
			var node = $(e.currentTarget)
			var nodeParent = node.parent();
			var pid = nodeParent.attr("pid");
			var id = nodeParent.attr("id");
			var key = node.attr("key")
			if(_.isArray(self[pid])){
				_.remove(self[pid],function(item){
					console.log(item, self[id])
					return  item == self[id]?true:false;
				})
			}else{
				delete self[pid][key]
			}
			nodeParent.detach();
		},
		addData:function(e){
			var node = $(e.currentTarget);
			var pid=node.attr("pid");
			var ptype=node.attr("ptype");
			var obj = {
				name: node.siblings(".name").val(),
				type: node.siblings(".type").val(),
				value: node.siblings(".text-span").find(".value").val(),
				id : (new Date()).valueOf(),
				pid:pid
			}
			if(ptype!=2){
				if(!obj.name) return;
				if(obj.type==1){
					this[obj.id] ={};
					this[pid][obj.name]=this[obj.id];	
				}else if(obj.type==2){
					this[obj.id] =[];
					this[pid][obj.name]=this[obj.id];
				}else{
					this[obj.id] = obj.value;
					this[pid][obj.name]=this[obj.id];
				}
			}else{
				var finalValue;
				if(obj.type==1){
					this[obj.id] ={};
					finalValue= this[obj.id];	
				}else if(obj.type==2){
					this[obj.id] =[];
					finalValue= this[obj.id];		
				}else{
					this[obj.id] = obj.value;
					finalValue= obj.value;
				}	
				this[pid].push(finalValue)
			}
			obj.typeName = this.typeArr[+obj.type];
			node.parent().siblings(".glyphicon-plus").before(this.mapTpl(obj))
			this.cacelInput(e);
		},
		appendInput:function(e){
			var node = $(e.currentTarget);
			var parentNode = node.parent();
			parentNode.append(this.inputTpl({type:node.attr("type"),pid:node.attr("pid")}));
			node.hide();
		},
		showSonView:function(e){
			var node = $(e.currentTarget);
			var sonNode = $(node.parent().find(".contents")[0])
			node.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
			sonNode.hide();
		},
		triggerSeeJson:function(){
			var jsonStr = JSON.stringify(this.root);
			this.trigger("see:json",jsonStr);
		},
		hideSonView:function(e){
			var node = $(e.currentTarget);
			var sonNode = $(node.parent().find(".contents")[0])
			node.removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
			sonNode.show();
		}
	});
});
