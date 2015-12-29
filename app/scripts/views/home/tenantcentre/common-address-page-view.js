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
		var CommonAddressView = Talent.ItemView.extend({
			template: jst['home/tenantcentre/common-address-page'],
			ui: {},
			events: function() {
				var events = {};
				events["click .save-btn"] = this.addAddress;
                events["click tr .destroy"] = this.cancelAddress;
				return events;
			},
			initialize: function() {},
			onShow: function() {
				this.model = $('#common-address-table').DataTable({
                    
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
			addAddress:function(){
                var People = $(".address-people").val();
            	var City = $(".address-city  option:selected").text();
            	var Province = $(".address-province  option:selected").text();
            	var ZipCode = $(".address-zip-code").val();
            	var AddressDetails = $(".address-details").val();
            	var Phone = $(".address-phone").val();
                this.model.row.add( [
                    People,
                    Province,
                    City,
                    AddressDetails,
                    ZipCode,
                    Phone,
                    '<input type="button" class="edit" dtid="'+ZipCode+'" value="编辑"/><input type="button" class="destroy" value="删除" />'
                ] ).draw();
			},
            cancelAddress:function(e){
                var node = $(e.currentTarget);
                var node_before = node.parent();
                var choose_tr = node_before.parent();
                choose_tr.remove();
            },
		    Close: function() {}
		});

		return CommonAddressView;
	});