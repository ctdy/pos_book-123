import React,{Component} from "react";
import MenuList from "../../config/menuconfig";
import {Menu,Icon} from "antd";
import {Link,withRouter} from "react-router-dom";
import LinkButton from "../link-button";


const SubMenu = Menu.SubMenu
class LeftNav extends Component {

    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span style={{fontSize:15}}>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
                        }
                    >
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    getMeunNodes = (menuList) => {
        return menuList.reduce((pre,item) => {

            const path = this.props.location.pathname
            //用item进行遍历
            //向pre添加<Menu.Item>
            if(!item.children){
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span style={{fontSize:16}}>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                // 查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                console.log('cItem',cItem)
                if(cItem){
                    this.openkey = item.key
                }

                //向pre添加<SubMenu>
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                <Icon type={item.icon} />
                <span style={{fontSize:16}}>{item.title}</span>
              </span>
                        }
                    >
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
            return pre

        },[])
    }

    componentWillMount() {
        this.menuNodes = this.getMeunNodes(MenuList)
    }

    render() {
        let path = this.props.location.pathname
        const openkey = this.openkey
        return (
            <div  className="left-nav">
                <Link to="/" className="left-nav-header">
                    {/*<img src={} alt="logo"/>*/}
                    <h1 >硅谷后台</h1>
                </Link>
                {/*{console.log('path',path)}*/}

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}

                    defaultOpenKeys={[openkey]}
                >
                    {

                        this.menuNodes
                    }

                </Menu>
            </div>
        )
    }
}
//传递属性
export default withRouter(LeftNav)