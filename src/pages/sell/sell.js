import React,{Component} from "react";
import { Card, Table, Input, Button, Icon} from 'antd';
import Highlighter from 'react-highlight-words';
import {reqfindAllSaleLog} from "../../api";
import {message} from "antd/es";
import {formateDate} from "../../utils/dataUtils";

export default class Sell extends Component {

    state = {
        searchText: '',
        data:[],
        selectedRowKeys:[],
        timeKey:'全 部',
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    getSell = async () => {
        const result = await reqfindAllSaleLog()
        if (result.event === 200){
            const data = result.obj
            console.log("data111111",data)
            this.setState({data})
        }else {
            message.error("检索数据失败")
        }
    }

    initColumns = () => {
        this.columns = [
            {
                title: '图书名',
                dataIndex: 'bookName',
                key: 'bookName',
                width: '20%',
                ...this.getColumnSearchProps('bookName'),
            },
            {
                title: '分类名',
                dataIndex: 'category',
                key: 'category',
                width: '20%',
                ...this.getColumnSearchProps('category'),
            },
            {
                title: '销售数量',
                dataIndex: 'number',
                key: 'number',
                width: '15%',
            },
            {
                title: '销售金额',
                dataIndex: 'amount',
                key: 'amount',
                width: '15%',
                ...this.getColumnSearchProps('amount'),
            },
            {
                title: '经手人',
                dataIndex: 'buyPerson',
                key: 'buyPerson',
                width: '15%',
                ...this.getColumnSearchProps('buyPerson'),
            },
            {
                title: '时间',
                // dataIndex: 'updateTime',
                width: '15%',
                render: (sell) => {
                    console.log("sell111",sell)
                    const {updateTime} = sell
                    console.log("updateTime",updateTime)
                    return (
                        <span>
                            <h6>{formateDate(updateTime)}</h6>
                        </span>
                    )
                }
            },
        ];
    }

    componentDidMount() {
        this.getSell()
    }

    componentWillMount() {
        this.initColumns()
    }
    onSelectChange = async selectedRowKeys => {
        console.log("selectedRowKeys",selectedRowKeys)
        this.setState({selectedRowKeys})
    }
    render() {
        const {selectedRowKeys} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
        };
        const title = (
            <span>
                <Button type="dashed" style={{fontSize:14,marginRight:10}}>全部</Button>
                <Button type="dashed" style={{fontSize:14,marginRight:10}}>七天内</Button>
                <Button type="dashed" style={{fontSize:14,marginRight:10}}>当天</Button>
                <Button type="dashed" style={{fontSize:14,marginRight:10}}>一个月内</Button>
                <Button type="dashed" style={{fontSize:14,marginRight:50}}>一个月之外</Button>
                <Button type="link" style={{fontSize:16,color:"red"}}>{this.state.timeKey}</Button>
            </span>
        )

        const extra = (
            <span>
                <Button style={{marginRight:10,fontSize:14}}>删除记录</Button>
                <Icon type="delete"></Icon>
            </span>
        )
        const {data} = this.state
        console.log("dataSell",data)
        return (
            <Card title={title} extra={extra}>
                <Table
                    rowKey='id'
                    rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={data}
                />
            </Card>
        )
    }
}