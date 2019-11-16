import React,{Component} from "react";
import echarts from 'echarts'
import SingleLine3 from "./SingLine3";
import {renderLineChart} from "./renderLineChart";
// import {renderLineChart, renderSeries} from "./renderLineChart";
import {reqfindGroupCategory, findAmountGroudBySaleLog} from "../../api";
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

export default class Charts extends Component {

    constructor(props){
        super(props)
        // this.renderSeries = this.renderSeries.bind(this)
    }
    state={
        data:[
            {
                title:"第二条折线",
                data:[
                    {
                        name:'星期一',
                        total:Math.random().toFixed(2),
                    },
                    {
                        name:'星期二',
                        total:Math.random().toFixed(2),
                    },
                    {
                        name:'星期三',
                        total:Math.random().toFixed(2),
                    },
                    {
                        name:'星期四',
                        total:Math.random().toFixed(2),
                    },
                    {
                        name:'星期五',
                        total:Math.random().toFixed(2),
                    },
                    {
                        name:'星期六',
                        total:Math.random().toFixed(2),
                    },
                    {
                        name:'星期天',
                        total:Math.random().toFixed(2),
                    },
                ]
            },
        ]
    };

    componentDidMount() {
    this.getPieChart()
    this.getLineChart()
    }

    getLineChart = async () => {
        const result = await findAmountGroudBySaleLog(7)
        if (result.event === 200){
            console.log("result: ", result.obj)
            this.data = [
                {
                    title:"5天内的销售记录",
                    data:result.obj,
                }
            ]
        }else {
            this.data = [{
                title:"5天的销售记录1",
                data:[],
            }]
            console.log("zhixing1111")
        }
        let myCharts=echarts.init(document.getElementById("line"));
        this.option= renderLineChart(this.data,'title','name','data','total')
        console.log("this.option: ",this.option)
        myCharts.setOption(this.option);
    }

    getPieChart = async () => {
        const result = await reqfindGroupCategory()

        if (result.event === 200){
            const data = result.obj
            const types = []
            const amounts = []
            data.map(c => {
                types.push(c.name)
                amounts.push(c.echartForm)
            })
            this.chart(types,amounts)
        }
    }

    chart = (types,amounts) => {
        var pieChartForm = echarts.init(document.getElementById("main"))
        pieChartForm.setOption({
            title : {
                text: '',
                subtext: '',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data: types,
                textStyle: {
                    fontSize: 14
                }
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1200
                            }
                        }
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'舆论来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data: amounts,
                    label: {
                        textStyle: {
                            fontSize: 14
                        }
                    }
                }
            ],
        })
        window.onresize = function(){
            pieChartForm.resize();
        }
    }

        render() {
                    const {data} = this.state

                    console.log("data1111: ", data)
                    return (
                        <div>
                            <div id="main" style={{width: 500, height: 500}}>
                            </div>
                            <div id="line" style={{width:'40%',height:200}}></div>
                            {/*<SingleLine3  option={renderLineChart(data,'title','name','data','total')}/>*/}
                        </div>
                    )
                }
        }