import React,{Component} from "react";
import {Button, Card, Table} from "antd";

export default class Order extends Component {
    initColumns = () => {
        this.columns = [
            {
                width:'10%',
                title: '商品名称',
                dataIndex: 'bookName',

            },
            {
                width:'10%',
                title: '商品类型',
                dataIndex: 'category',

            },
            {
                width:'30%',
                title: '商品描述',
                dataIndex: 'brief',
            },
            {
                width:'5%',
                title: '单价',
                dataIndex: 'price'
                ,
            },
            {
                width:'5%',
                title: '库存',
                dataIndex:'number',
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
                width:'10%',
                title: '操作',
            }
        ]
    }



    componentWillMount() {
        this.initColumns()
    }

    render() {
        const dataSource = [
            {
                key: '1',
                bookName: '放学后',
                category: "校园悬疑类",
                brief: '东野圭吾的成名作',
                price:45,
                number:100,
            },
            {
                key: '1',
                bookName: '放学后',
                category: "校园悬疑类",
                brief: '东野圭吾的成名作',
                price:45,
                number:100,
            },
            {
                key: '1',
                bookName: '放学后',
                category: "校园悬疑类",
                brief: '东野圭吾的成名作',
                price:45,
                number:100,
            },
            {
                key: '1',
                bookName: '放学后',
                category: "校园悬疑类",
                brief: '东野圭吾的成名作',
                price:45,
                number:100,
            },
        ];

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
        ];
        return (
            <div>
                <Card>
                    <Table
                        bordered={true}
                        rowKey='id'   //以每一组数据的_id作为key
                         dataSource={dataSource}
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