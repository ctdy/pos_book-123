import React,{Component} from 'react';

//引入提示框
require ('echarts/lib/component/tooltip');
//引入图例
require ('echarts/lib/component/legend');
//引入直角坐标系
require ('echarts/lib/component/grid');
//引入标题
require ('echarts/lib/component/title');
//引入线段
require ('echarts/lib/chart/line');

export const renderLineChart=function(data,title,xAxis,series,seriesValue){
    let option = {

        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        legend: {
            data:[]
        },
        yAxis: {
            // show:false,  //设置是否显示坐标轴
            type: 'value'
        },
        xAxis: {
            // show:false,  //设置是否显示坐标轴
            type: 'category',
            boundaryGap: false,
            data: []
        },
        series: []
    };
    //绘制图形
    data.map(function (item){
        //设置图例
        option.legend.data.push(item[title]);
        //给series赋值
        option.series.push({
            name:item[title],
            type:'line',
            data:renderSeries(item[series],seriesValue),
            /**设置直线的颜色，粗细 */
            itemStyle: {
                normal: {
                    color: 'red',
                    //线条样式
                    lineStyle:{
                        type: 'solid',
                        width: 2  //设置线条粗细
                    }
                }
            },
            showSymbol:false,  //设置折线上的圆点
        })
    });
    //给x轴赋值
    data.map(function (item){
        item.data.map(function (item){
            option.xAxis.data.push(item[xAxis]);
        })
    });
    //过滤,将x轴不存在的加进去，存在的不要加进去
    option.xAxis.data=Array.from(new Set(option.xAxis.data));
    console.log(option);
    return option;
};
//再次遍历，给y轴赋值
export const renderSeries=function(data,value){
    let result=[];
    data.map(function (item){
        result.push(item[value]);
    });
    return result;
};