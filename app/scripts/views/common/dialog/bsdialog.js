define(['_', '$', 'talent', 'templates/common', 'vendor/plugins/simplemodal-view-v2', 'views/common/dialog/bsdialog-content-view', 'jquery.ui'],
    function(_, $, Talent, jst, SimpleModalView, dialogContentView) {
        return Talent.Layout.extend({
            //popTemplate: jst['common/plugins/bsdialog'],//弹窗view渲染所用模板
            //template: jst['pools/common/dialog/common-dialog'],//自身view渲染用模板
            template: jst['common/dialog/bsdialog'],
            events: {},
            regions: {
                "content": ".bsdialog_content",
            },
            defaults: {
                type: "common" //dialog类型决定是否有图标，以及图标类型
                    ,
                title: "" //默认一个空格
                    ,
                buttons: undefined //dialog底部按钮数组，现在支持设定：name、id、type、eventName
                    ,
                simpleModal: undefined //对蒙版的配置，现在支持配置参数：modal
                    ,
                isDrag: true //支持是否可拖拽
                    ,
                moveDown: false,
                icon: "common",
                radius: false,
                dialogId: ""
            },
            initialize: function() {
                this.model.set(_.extend(_.clone(this.defaults), this.options.config));
                this.renderPopView();

            },
            onShow: function() {
                this.bindBtnsEvents();
                this.bindDragDropEvents();
                this.showContent();
                // this.renderPopView(); 
            },
            showContent: function() {
                var self = this;
                var cont = self.model.get("content");
                cont = self.parseContent(cont);
                self.content.show(cont);
                Talent.$(window).on('hashchange',function(e){
                    self.close();
                });
            },
            parseContent: function(cont) {
                if (cont instanceof Talent.View || cont instanceof Backbone.View) return cont;
                //非视图转成Talent.View
                var dialogContentModel = new Talent.Model({
                    content: cont
                });
                return new dialogContentView({
                    model: dialogContentModel
                });
            },
            bindBtnsEvents: function() {
                var self = this;
                var buttons = self.model.get("buttons");
                _.each(buttons, function(item, index) {
                    var eName = item.type == "text" ? item.id : ("click #" + item.id);
                    self.events[eName] = function(e) {
                        self.trigger(item.eventName, e, self);
                    };
                });
            },
            bindDragDropEvents: function() {
                if (this.model.get("isDrag")) {
                    // this.$el.find('.bs_dialog3').draggable({ containment: 'body'});
                }

            },
            renderPopView: function() {
                var smodal = this.configSimpleModal();
                this.popView = new SimpleModalView(smodal);
                //var body=top.document.body;
                this.popView.$el.appendTo('body');
                var pop = this.popView.show();
                this.configStyle(pop);

            },
            configStyle: function(pop) {
                if (this.model.get("moveDown")) pop.find(".bs_dialog3").addClass("move_down");
                if (!this.model.get("title") && !this.model.get("radius")) pop.find(".bs_dialog3_wrap").addClass("noradius");
                if (this.model.get("simpleModal").modal) pop.find(".bs_dialog3_wrap").addClass("shadow");
                if (this.model.get("position")) {
                    var top,left;
                    if (this.model.get("position") == "right_bottom") {
                         top = document.documentElement.clientHeight - pop.find(".simplemodal-container").height() - 60;
                         left = document.documentElement.clientWidth - pop.find(".simplemodal-container").width() - 10;
                        pop.find(".simplemodal-container").css({left: left,top: top});
                    }
                    if (typeof  this.model.get("position") =="number") {

                        pop.find(".simplemodal-container").css({top: this.model.get("position")});
                    }

                }
                pop.find(".simplemodal-wrap").css({
                    overflow: 'visible'
                });

            },
            configSimpleModal: function() {
                var smodal = {
                    zIndex: 1100,
                    position: [0],
                    data: this
                };
                var configSModal = this.model.get("simpleModal");
                if (configSModal) {
                    configSModal = _.pick(configSModal, "modal", "minWidth", "maxWidth", "minHeight", "maxHeight", "opacity");
                    return _.extend(smodal, configSModal);
                }
                return smodal;
            },
            onClose: function() {
                this.popView.close();
            }
        });
    });