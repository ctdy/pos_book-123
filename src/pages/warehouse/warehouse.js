import React,{Component} from "react";
import {Card,Table,Button} from "antd";



export default class WareHouse extends Component {

    initColumns = () => {
        this.columns = [
            {
                width:'10%',
                title: '商品名称',
                dataIndex: 'shoppingname',

            },
            {
                width:'10%',
                title: '商品类型',
                dataIndex: 'category',

            },
            {
                width:'40%',
                title: '商品描述',
                dataIndex: 'category',
            },
            {
                width:'5%',
                title: '单价',
                dataIndex: 'price'
,
            },
            {
                width:'5%',
                title: '状态',
                reder: () => {
                    return (
                        <span>
                            <Button type='primary'>采购</Button>
                            <Button type='primary'>购买</Button>
                        </span>
                    )
                }
            },
            {
                width:'5%',
                title: '操作',
                dataIndex: 'price'
            }
    ]
    }

    componentWillMount() {
        this.initColumns()
    }

    render() {
        return (
            <div>
                <Card>
                    <Table
                        bordered={true}
                        rowKey='id'   //以每一组数据的_id作为key
                        // dataSource={products}
                        // loading={loading}
                        columns={this.columns}
                        // pagination={{total:this.state.total,
                        //     defaultPageSize: 5,
                        //     showQuickJumper: true,
                        //      onChange: this.getProduct   //(pageNum)=>{this.getProduct(pageNum)}的简化
                        // }}
                    />;
                </Card>
            </div>
        )
    }
}