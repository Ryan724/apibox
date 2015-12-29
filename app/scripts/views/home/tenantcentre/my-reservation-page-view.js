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
		var MyReservationView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/my-reservation-page'],
			ui: {},
			events: function() {
				var events = {};
				events["click tr .destroy"] = this.cancelList;
				events["click tr .judge"] = this.judgeList;
				events["click tr .complaint"] = this.complaintList;
				return events;
			},
			initialize: function() {},
			onShow: function() {
         		$('#reservation-page-table').DataTable({
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
                    "lengthMenu": [[3, 6, 9, -1], [3, 6, 9, "All"]],//控制长度菜单，即每页显示多少item数目的下拉选择框中可选的数字);
				});
			},
			cancelList:function(e){//点击取消按钮，此函数可以定位到该条语句
				var node = $(e.currentTarget);
				var node_before = node.parent();
				var choose_tr = node_before.parent();
				choose_tr.remove();
			},
			judgeList:function(e){//点击查看按钮，此函数可以查看该预约单
				var node = $(e.currentTarget);
				var node_before = node.parent();
				var choose_tr = node_before.parent();
				alert("你选择查看单号为"+choose_tr.find("td:eq(0)").text()+"的房源预约单，接下来将转入评价页面");
			},
			complaintList:function(e){//点击投诉按钮，此函数可以获得该列的单号并转至投诉页面
				var node = $(e.currentTarget);
				var node_before = node.parent();
				var choose_tr = node_before.parent();
				alert("你选择投诉单号为"+choose_tr.find("td:eq(0)").text()+"的房源预约单，接下来将转入投诉页面");
			},
		    Close: function() {}
		});

		return MyReservationView;
	});