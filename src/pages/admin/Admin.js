import React,{Component} from "react";
import { Layout, Menu, Icon } from 'antd';
import {Redirect,Route,Switch} from 'react-router-dom'
import LeftNav from "../../components/left-nav/left-nav";
import Charts from "../echarts/echarts";
import Order from "../order/Order";
import Sell from "../sell/sell";
import User from "../user/user";
import WareHouse from "../warehouse/warehouse";
import Home from "../home/home";
import Header from '../../components/header/header'

const {Content, Footer, Sider } = Layout;
export default class Admin extends Component {
    render() {
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <div className="logo" />
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ margin: '24px 16px 0',height:'100%' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
                            content
                            <Switch>
                                <Route path='/home' component={Home} exact/>
                                <Route path='/user' component={User}/>
                                <Route path='/warehouse' component={WareHouse}/>
                                <Route path='/sell' component={Sell}/>
                                <Route path='/charts' component={Charts}/>
                                <Route path='/order' component={Order}/>
                                <Redirect to='/home'></Redirect>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}