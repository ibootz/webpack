/**
 * Created by John on 2017/11/7.
 */

var CustomerOrders = function () {

    // bootstrap select
    var handleBootstrapSelect = function() {
        $('.bs-select').selectpicker({
            iconBase: 'fa',
            tickIcon: 'fa-check',
            deselectAllText: '取消全部',
            selectAllText: '选择全部'
        });
    };

    // data range picker
    var handleDateRangePickers = function () {
        if (!jQuery().daterangepicker) {
            return;
        }

        $('#defaultrange').daterangepicker({
                opens: (App.isRTL() ? 'left' : 'right'),
                format: 'YYYY/MM/DD',
                separator: ' - ',
                startDate: moment().subtract('days', 29),
                endDate: moment(),
                ranges: {
                    '今天': [moment(), moment()],
                    '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
                    '过去 7 天': [moment().subtract('days', 6), moment()],
                    '过去 30 天': [moment().subtract('days', 29), moment()],
                    '当月': [moment().startOf('month'), moment().endOf('month')],
                    '上月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                "locale": {
                    "format": "YYYY/MM/DD",
                    "separator": " - ",
                    "applyLabel": "确定",
                    "cancelLabel": "取消",
                    "fromLabel": "从",
                    "toLabel": "到",
                    "customRangeLabel": "自定义",
                    "daysOfWeek": [
                        "周日",
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六"
                    ],
                    "monthNames": [
                        "一月",
                        "二月",
                        "三月",
                        "四月",
                        "五月",
                        "六月",
                        "七月",
                        "八月",
                        "九月",
                        "十月",
                        "十一月",
                        "十二月"
                    ],
                    "firstDay": 1
                }
            },
            function (start, end) {
                $('#defaultrange input').val(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
            }
        );

        //Set the initial state of the picker label
        $('#reportrange span').html(moment().subtract('days', 29).format('YYYY/MM/DD') + ' - ' + moment().format('YYYY/MM/DD'));
        $('#reportrange span').show();
    };

    // init datatables
    var initOrderTables = function () {
        var table = $('#order_tables');

        var fixedHeaderOffset = 0;
        if (App.getViewPort().width < App.getResponsiveBreakpoint('md')) {
            if ($('.page-header').hasClass('page-header-fixed-mobile')) {
                fixedHeaderOffset = $('.page-header').outerHeight(true);
            }
        } else if ($('.page-header').hasClass('navbar-fixed-top')) {
            fixedHeaderOffset = $('.page-header').outerHeight(true);
        }

        var oTable = table.dataTable({
            "language": {
                "sProcessing":   "处理中...",
                "sLengthMenu":   "显示 _MENU_ 项结果",
                "sZeroRecords":  "没有匹配结果",
                "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix":  "",
                "sSearch":       "搜索:",
                "sUrl":          "",
                "sEmptyTable":     "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands":  ",",
                "oPaginate": {
                    "sFirst":    "首页",
                    "sPrevious": "上页",
                    "sNext":     "下页",
                    "sLast":     "末页"
                },
                "oAria": {
                    "sSortAscending":  ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },

            fixedHeader: {
                header: true,
                headerOffset: fixedHeaderOffset
            },

            // save datatable state(pagination, sort, etc) in cookie.
            "bStateSave": true,

            // change per page values here
            "lengthMenu": [
                [5, 10, 30, 50, 100, 200, 500],
                [5, 10, 30, 50, 100, 200, 500]
            ],

            // set the initial value
            "pageLength": 5,

            "pagingType": "bootstrap_full_number",

            // set default column settings
            "columnDefs": [{
                'orderable': false,
                'targets': [0, 4, 8]
            }, {
                "searchable": false,
                'targets': [0, 5, 8]
            }],

            // set first column as a default sort by asc
            "order": [
                [1, "asc"]
            ],



            "searching": false,

            // 设置各组件位置; l:每页显示条数的组件，f：搜索组件..., p:分页组件
            "dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-4'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-4 col-sm-12'i><'col-md-8 col-sm-12'p>>",
        });

        // datatables事件监听
        function initPageContentIframe() {
            var innerBodyHeight = $("body").height() + 100;
            var sidebarHeight = $(".page-sidebar-menu", top.document).height();
            var finalHeight = innerBodyHeight > sidebarHeight ? innerBodyHeight : sidebarHeight;
            console.log(innerBodyHeight, sidebarHeight, finalHeight);
            $(".self-content-iframe", parent.document).height(finalHeight);
        };
        oTable.on('length.dt', function(e, settings, len){
            initPageContentIframe();
        });

        var tableWrapper = jQuery('#order_tables_wrapper');

        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).prop("checked", true);
                } else {
                    $(this).prop("checked", false);
                }
            });
        });

    };

    // 页面优化，当点击搜索之后，将页面滚动到tbale区域
    var initTableShow = function(){
        var show_friendly_btns = $('.show-friendly');
        !!show_friendly_btns && !!show_friendly_btns.length && show_friendly_btns.each(function(){
            $(this).on('click', function(){
                $('html,body', window.parent.document).animate({scrollTop: $('#show-friendly-content').offset().top + 50}, 1000);
            })
        })
    }

    return {
        init: function () {

            if (!jQuery().dataTable) {
                return;
            }

            handleBootstrapSelect();
            handleDateRangePickers();
            initOrderTables();
            initTableShow();
        }
    };

}();

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        CustomerOrders.init();
    });
}