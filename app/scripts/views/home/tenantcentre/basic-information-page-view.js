define([
		'talent',
		'templates/home',
		'datatables'
	],
	function(
		Talent,
		jst,
		DataTable
	){
		var BasicInformationView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/basic-information-page'],
			ui: {},
			events: function() {
				var events = {};
				events["click .save-btn"] = this.addLinkMan;
                events["click tr .edit"] = this.editLinkMan;
				return events;
			},
			initialize: function() {},
			onShow: function() {
                     this.model = $('#basic-infor-page-table').DataTable({
          			"language": {
                        "lengthMenu": "每页 _MENU_ 条记录",
                        "zeroRecords": "没有找到记录",
                        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
                        "infoEmpty": "无记录",
                        "infoFiltered": "(从 _MAX_ 条记录过滤)",
                        "search": "搜索",
                        "paginate": {
                         	"previous": "上一页",
                          	"next": "下一页",
                          	"first": "第一页",
                          	"last": "最后一页"
                			}
                    },
                    "pagingType": "full_numbers",//控制前一页后一页等按钮
                    "lengthMenu": [[3], [3]],//控制长度菜单，即每页显示多少item数目的下拉选择框中可选的数字);
				});
			},
			addLinkMan:function(){
                var LinkMan = $("#linkman-name").val();
            	var JobTitle = $("#linkman-job").val();
            	var LinkPhone = $("#linkman-phone").val();
            	var Disable = $("input:radio[name=status]:checked").val();
                var editButton = 
                this.model.row.add( [
                    LinkMan,
                    JobTitle,
                    LinkPhone,
                    Disable,
                    '<input type="button" class="edit" value="编辑"/>'
                ] ).draw();
			},
            editLinkMan:function(){
                alert("编辑弹出框");
            },
		    Close: function() {}
		});

		return BasicInformationView;
	});