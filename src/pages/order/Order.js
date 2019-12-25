import React,{Component} from "react";
import {Table,InputNumber,Button,Icon} from "antd";
import {
    reqfindAllOrder,
    reqUpdateOrder,
    reqDeleteOrder,
    reqfindSaleForm,
    reqfindDeleteSaleForm,
    reqUpdateBookNumber,
    reqAddSaleLog
} from "../../api";
import {message} from "antd/es";
import Grid from "antd/es/card/Grid";


export default class Order extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        data:[],
        selectData:[],
        amount:'',
        price:'',
        sale:'',
        number:'',
        totalAmount:'0',
    };
    initColumns = () => {
        this.columns = [
            {
                width:'20%',
                align:'center',
                title: '书名',
                dataIndex: 'bookName',
            },
            {
                width:'20%',
                align:'center',
                title: '出版社',
                dataIndex: 'press',
            },
            {
                width:'20%',
                align:'center',
                title: '数量',
                render: (sales) => {
                    const {number,price,id,bookId,totalNumer} = sales
                    console.log("sale111",sales)
                    console.log("number111",number)
                    return (
                        <span>
                        <InputNumber
                            min={1}
                            max={10}
                            defaultValue={sales.number}
                            onChange={(value) => this.onChange(value,price,id,bookId,totalNumer)}
                            formatter={value => `$ ${value}      本`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                        </span>
                    )
                }
            },
            {
                width:'15%',
                align:'center',
                title: '单价(元)',
                dataIndex: 'price',
            },

            {
                width:'15%',
                align:'center',
                title: '总金额(元)',
                dataIndex: 'amount',
            },
            {
                width:'10%',
                align:'center',
                title: '操作',
                render: (order) => {
                    const {id} = order
                    return (
                       <span>
                            <Icon type="delete" style={{color:"red",fontSize:'16px'}} onClick={() => this.deleteOrder(id)}/>
                       </span>
                    )
                }
            },
        ];
    }

    deleteOrder = async (id) => {
        const result = await reqDeleteOrder(id)
        if (result.event === 200){
            // eslint-disable-next-line no-restricted-globals
            location.reload(true)   //强制刷新页面
        }else {
            message.error("删除失败")
        }
    }

    onChange =  async (value,price,id,bookId,totalNumber) =>  {
        if (value > totalNumber){
            message.error("数量不能超过库存")
            return
        }
        const result = await reqUpdateOrder(value,value*price,id)
        if (result.event === 200){
            message.success("更新成功")
            this.getOrder()
        }else {
            message.error("更新失败")
        }
    }

    onSelectChange = async selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        let result = []
        if (selectedRowKeys.length > 0){
             result = await reqfindSaleForm(selectedRowKeys)
        }else {
            return
        }
        if (result.event === 200){
            const data = result.obj
            let totalAmount = 0
            data.map(c => {
                totalAmount += c.amount
            })
            this.setState({totalAmount,selectedRowKeys})
        }
    };

    getOrder = async () => {
        const result = await reqfindAllOrder()
        if (result.event === 200){
            const data = result.obj
            const price = data.price
            this.setState({data,price})
        }else{
            message.error("检索失败")
        }
    }
    componentDidMount() {
        this.getOrder()
    }

    submitOrder = async () => {
        const {selectedRowKeys} = this.state
        console.log("selectedRowKeys",selectedRowKeys)
        if (selectedRowKeys.length > 0){
            const result = await reqfindSaleForm(selectedRowKeys)
            if (result.event === 200){
                const data = result.obj
                console.log("data111: ",data)
                data.map(async c => {
                    const result = await reqUpdateBookNumber((c.totalNumber-c.number),c.bookId)
                    const result1 = await reqAddSaleLog(c.bookId,"pyj",c.number,c.amount,c.categoryId)
                    if (result.event === 200){
                        message.success("更改库存数量成功")
                    }
                    if (result1.event ===200){
                        message.success("添加库存记录成功")
                    }
                })
            }
            const result1 = await reqfindDeleteSaleForm(selectedRowKeys)
            if (result1.event === 200){
                message.error("订单购买成功")
                this.setState({totalAmount:'0'})
                this.getOrder()
            }
        }else if (selectedRowKeys.length === 0){
            message.error("请先勾选要购买的物品")
            return
        }

    }

    componentWillMount() {
        this.initColumns()
    }

    render() {
        const {selectedRowKeys,data,totalAmount} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
        };
        return (
            <div>
                <Grid style={{width:'100%'}}>
                    <Table
                        rowKey='id'
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={data}/>
                    <span style={{fontSize:18}}><Button type="primary" style={{marginTop:10,marginRight:10}} onClick={() => this.submitOrder()}>提交订单</Button>$ {totalAmount}</span>
                </Grid>
            </div>
        )
    }
}