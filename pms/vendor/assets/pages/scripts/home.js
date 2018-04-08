/**
 * Created by John on 2017/11/7.
 */

var Home = function () {

    var initDashboardDaterange = function () {
        if (!jQuery().daterangepicker) {
            return;
        }

        var dashboard_report_range = $('#dashboard-report-range');
        !!dashboard_report_range && dashboard_report_range.daterangepicker({
            "ranges": {
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
            },
            opens: (App.isRTL() ? 'right' : 'left'),
        }, function (start, end, label) {
            dashboard_report_range.find('span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
        });

        dashboard_report_range.find('span').html(moment().subtract('days', 29).format('YYYY/MM/DD') + ' - ' + moment().format('YYYY/MM/DD'));
        dashboard_report_range.show();
    };

    var initCharts = function () {
        if (!jQuery.plot) {
            return;
        }

        function showChartTooltip(x, y, xValue, yValue) {
            $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x - 40,
                border: '0px solid #ccc',
                padding: '2px 6px',
                'background-color': '#fff'
            }).appendTo("body").fadeIn(200);
        }

        // random data generator for plot charts
        function randValue() {
            return (Math.floor(Math.random() * (1 + 5000 - 20))) + 10;
        }

        var data = [
            ['02/2013', randValue()],
            ['03/2013', randValue()],
            ['04/2013', randValue()],
            ['05/2013', randValue()],
            ['06/2013', randValue()],
            ['07/2013', randValue()],
            ['08/2013', randValue()],
            ['09/2013', randValue()],
            ['10/2013', randValue()]
        ];

        // 销售额
        var sales_statistics = $('#sales_statistics');
        if (!!sales_statistics && sales_statistics.size() != 0) {

            $('#sales_statistics_loading').hide();
            $('#sales_statistics_content').show();

            var plot_statistics = $.plot(sales_statistics, [{
                    data: data,
                    lines: {
                        fill: 0.6,
                        lineWidth: 0
                    },
                    color: ['#f89f9f']
                }, {
                    data: data,
                    points: {
                        show: true,
                        fill: true,
                        radius: 5,
                        fillColor: "#f89f9f",
                        lineWidth: 3
                    },
                    color: '#fff',
                    shadowSize: 0
                }],

                {
                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,
                        mode: "categories",
                        min: 0,
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    yaxis: {
                        ticks: 5,
                        tickDecimals: 0,
                        tickColor: "#eee",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderColor: "#eee",
                        borderWidth: 1
                    }
                });

            var previousPoint = null;
            sales_statistics.bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));
                if (item) {
                    if (previousPoint !== item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' 万元');
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
        }

        // 净利润
        var profit_statistics = $('#profit_statistics');
        if (!!profit_statistics && profit_statistics.size() !== 0) {

            var previousPoint2 = null;
            $('#profit_statistics_loading').hide();
            $('#profit_statistics_content').show();

            var data2 = [
                ['DEC', randValue()],
                ['JAN', randValue()],
                ['FEB', randValue()],
                ['MAR', randValue()],
                ['APR', randValue()],
                ['MAY', randValue()],
                ['JUN', randValue()],
                ['JUL', randValue()],
                ['AUG', randValue()],
                ['SEP', randValue()]
            ];


            $.plot(profit_statistics,
                [{
                    data: data2,
                    lines: {
                        fill: 0.2,
                        lineWidth: 0,
                    },
                    color: ['#BAD9F5']
                }, {
                    data: data2,
                    points: {
                        show: true,
                        fill: true,
                        radius: 4,
                        fillColor: "#9ACAE6",
                        lineWidth: 2
                    },
                    color: '#9ACAE6',
                    shadowSize: 1
                }, {
                    data: data2,
                    lines: {
                        show: true,
                        fill: false,
                        lineWidth: 3
                    },
                    color: '#9ACAE6',
                    shadowSize: 0
                }],

                {
                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,
                        mode: "categories",
                        min: 0,
                        font: {
                            lineHeight: 18,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    yaxis: {
                        ticks: 5,
                        tickDecimals: 0,
                        tickColor: "#eee",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderColor: "#eee",
                        borderWidth: 1
                    }
                });

            profit_statistics.bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));
                if (item) {
                    if (previousPoint2 !== item.dataIndex) {
                        previousPoint2 = item.dataIndex;
                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);
                        showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' 万元');
                    }
                }
            });

            profit_statistics.bind("mouseleave", function () {
                $("#tooltip").remove();
            });
        }

        var data1 = [
            ['02/2013', randValue()],
            ['03/2013', randValue()],
            ['04/2013', randValue()],
            ['05/2013', randValue()],
            ['06/2013', randValue()],
            ['07/2013', randValue()],
            ['08/2013', randValue()],
            ['09/2013', randValue()],
            ['10/2013', randValue()]
        ];

        // 订单量
        if ($('#order_statistics').size() != 0) {

            $('#order_statistics_loading').hide();
            $('#order_statistics_content').show();

            var plot_statistics = $.plot($("#order_statistics"), [{
                    data: data1,
                    lines: {
                        fill: 0.6,
                        lineWidth: 0
                    },
                    color: ['#f89f9f']
                }, {
                    data: data1,
                    points: {
                        show: true,
                        fill: true,
                        radius: 5,
                        fillColor: "#f89f9f",
                        lineWidth: 3
                    },
                    color: '#fff',
                    shadowSize: 0
                }],

                {
                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,
                        mode: "categories",
                        min: 0,
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    yaxis: {
                        ticks: 5,
                        tickDecimals: 0,
                        tickColor: "#eee",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderColor: "#eee",
                        borderWidth: 1
                    }
                });

            var previousPoint = null;
            $("#order_statistics").bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));
                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' 单');
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
        }

        // 缺货量
        if ($('#outstock_statistics').size() != 0) {
            //site activities
            var previousPoint2 = null;
            $('#outstock_statistics_loading').hide();
            $('#outstock_statistics_content').show();

            var data1 = [
                ['DEC', randValue()],
                ['JAN', randValue()],
                ['FEB', randValue()],
                ['MAR', randValue()],
                ['APR', randValue()],
                ['MAY', randValue()],
                ['JUN', randValue()],
                ['JUL', randValue()],
                ['AUG', randValue()],
                ['SEP', randValue()]
            ];


            var plot_statistics = $.plot($("#outstock_statistics"),

                [{
                    data: data1,
                    lines: {
                        fill: 0.2,
                        lineWidth: 0,
                    },
                    color: ['#BAD9F5']
                }, {
                    data: data1,
                    points: {
                        show: true,
                        fill: true,
                        radius: 4,
                        fillColor: "#9ACAE6",
                        lineWidth: 2
                    },
                    color: '#9ACAE6',
                    shadowSize: 1
                }, {
                    data: data1,
                    lines: {
                        show: true,
                        fill: false,
                        lineWidth: 3
                    },
                    color: '#9ACAE6',
                    shadowSize: 0
                }],

                {
                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,
                        mode: "categories",
                        min: 0,
                        font: {
                            lineHeight: 18,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    yaxis: {
                        ticks: 5,
                        tickDecimals: 0,
                        tickColor: "#eee",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderColor: "#eee",
                        borderWidth: 1
                    }
                });

            $("#outstock_statistics").bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));
                if (item) {
                    if (previousPoint2 != item.dataIndex) {
                        previousPoint2 = item.dataIndex;
                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);
                        showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' 件');
                    }
                }
            });

            $('#outstock_statistics').bind("mouseleave", function () {
                $("#tooltip").remove();
            });
        }
    };

    return {
        init: function () {
            initCharts();
            initDashboardDaterange();
        }
    };

}();

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function () {
        Home.init();
    });
}