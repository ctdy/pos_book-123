import React,{Component} from "react";
import {withRouter} from 'react-router-dom'
import {formateDate} from "../../utils/dataUtils";
import './header.less'
import LinkButton from '../link-button/index'
import MenuList from "../../config/menuconfig";

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now())
    }
    getTimes = () => {
        this.interval = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

    getTitles = () => {
        const path = this.props.location.pathname
        let title
        MenuList.forEach(item => {
            if (item.key === path){
                title = item.title
            }else if (item.children){
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if (cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    componentWillMount() {
        this.getTimes()
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render() {
        const title = this.getTitles()
        const {currentTime} = this.state
        return (
            <div className="header">
                <div className="header-top">
                    <span>admin</span>
                    <LinkButton>退出</LinkButton>
                </div>

                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)