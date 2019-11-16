import React,{Component} from 'react';

//引入echarts主模块
import echarts from 'echarts';
class SingleLine3 extends Component{
    /**设置渲染状态id */
    componentDidMount() {
        /**设置状态id
         * 1.this.props.id
         * 2.this.state.id
         */
        let myCharts=echarts.init(document.getElementById("line"));
        myCharts.setOption(this.props.option);
    }
    render() {
        return (
            <div id="line" style={{width:'40%',height:300}}></div>
        );
    }
}
export default SingleLine3;