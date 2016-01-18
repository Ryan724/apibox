define(['talent',
		'templates/apibox',
		'views/apibox/server-check-view',
		"views/apibox/project-select-view",
		'views/apibox/mock-data-view',
		'jsdiff'
	],	
	function(Talent,
		jst,
		ServerCheckView,
		ProjectSelectView,
		MockDataView,
		jsDiff) {
		return Talent.Layout.extend({
			template: jst['apibox/interface-page'],
			regions:{
				dataLayerRegion : ".data-layer-data-layer",
				projectRegion: ".project-select"
			},
			events: function() {
				var events = {};
				events["click .data-mock-btn"] = this.dataMockShow;
				events["click .server-check-btn"] = this.serverCheckShow;
				events["click .data-edit"] = this.editData;
				events["click .desc-span"] = this.editAllData;
				events["click .project"] = this.showProjectInput;
				events["blur .data-edit>textarea"] = this.exitEditedData;
				events["blur .common"] = this.exitInputData;
				events["blur .api-desc-edit"] = this.exitInputData;
				return events;
			},
			initialize: function() {},
			onShow:function(){},
			dataMockShow:function(e){
				var self=this;
				var req=self.model.get("request");
				var data=(req!="" ? _.formatJson(req) :"");
				this.$(".interface-api>ul").hide();
				this.$(".data-layer").show();
				this.mockDataView = new MockDataView({model:new Talent.Model({"data":data,"pid":self.model.get("config").project,"id":self.model.get("config").id})});
				this.dataLayerRegion.show(this.mockDataView)
				this.listenTo(this.mockDataView,"cancle:mock",this.closeDataRegionClose);
			},
			serverCheckShow:function(e){
				var self=this
				var data=_.formatJson(self.model.get("response"));
				var config=self.model.get("config");
				this.$(".interface-api>ul").hide();
				this.$(".data-layer").show();
				this.serverCheckView = new ServerCheckView({model:new Talent.Model({
					"data":data
					,"config":config
				})});
				this.dataLayerRegion.show(this.serverCheckView)
				this.listenTo(this.serverCheckView,"cancle:diff",this.closeDataRegionClose);
			},
			exitInputData:function(e){
				var $node=this.$(e.currentTarget);
				var dataType=$node.attr("data-name");
				var val=$node.val();
				if(!$node.hasClass("project")){
					$node.hide();
					var val=$node.val();
					$node.prev().text(val).show().focus();
				};
				this.saveData(dataType,val);
			},
			saveData:function(type,value){
					var self=this;
					var config=self.model.get("config");
					config[type]=value;
					var data={
					config:config,
					request:this.model.get("request"),
					response:this.model.get("response")
				}
					Talent.app.request("apibox:updateData",data).done(function(resp) {
					console.log(resp);
				});
			},
			showProjectInput: function(e) {
				var self = this;
				if (this.isProjectRegionShow == true) return;
				Talent.app.request("apibox:getProjects").done(function(resp) {
					if (resp.flag == false) return;
					self.projectSelectView = new ProjectSelectView({
						model: new Talent.Model({
							"projects": resp.message
						})
					});
					self.projectRegion.show(self.projectSelectView);
					self.listenTo(self.projectSelectView, "choice:project", self.chageProject)
					self.$(".project-select").show();
					self.isProjectRegionShow = true;
				});
			},
			chageProject: function(project) {
				this.$(".project").parent().prev().text(project.name).attr("id", project.id).show();
				// this.$(".project").val(project.name).attr("id", project.id);
				this.$(".project").parent().hide();
				this.$(".project-select").hide();
				this.saveData("projectName",project.name);
				this.isProjectRegionShow = false;
			},
			closeDataRegionClose:function(){
				this.dataLayerRegion.close();
				this.$(".interface-api>ul").show();
				this.$(".data-layer").hide()
			}
			,editData:function(e){
				var node=this.$(e.currentTarget);
				var val=node.children("pre").text();
				node.children("pre").hide();
				node.children("textarea").val(val).show().focus();
			}
			,exitEditedData:function(e){
				var self=this;
				var node=this.$(e.currentTarget);
				var val=node.val();
				node.hide();
				if (node.hasClass("api-req-deit")) {
					self.model.set({"request":val});
				}else if(node.hasClass("api-rsp-edit")){
					self.model.set({"response":val})
				};
				var data={
					config:this.model.get("config"),
					request:this.model.get("request"),
					response:this.model.get("response")
				}
				try{
	                if(JSON.parse(val)){
	                	val=_.formatJson(val);
	                	node.prev().text(val).removeClass("border-red").show();
	                };
	            }catch(erro){
	                	node.prev().text(val).addClass("border-red").show();
	                }
				Talent.app.request("apibox:updateData",data).done(function(resp) {
					console.log(resp);
				});
			}
			,editAllData:function(e){
				var $node=this.$(e.currentTarget);
				var value=$node.text();
				if (!$node.next().hasClass("api-project-edit")) {
					$node.next().val(value);
				};
				$node.hide();
				$node.next().show().focus();
			}
		});

	});