import React,{Component} from "react";
import { Card, Table, Input, Button, Icon} from 'antd';
import Highlighter from 'react-highlight-words';
import {reqfindAllSaleLog} from "../../api";
import {message} from "antd/es";

export default class Sell extends Component {

    state = {
        searchText: '',
        data:[],
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
            this.setState({data})
        }else {
            message.error("检索数据失败")
        }
    }

    componentDidMount() {
        this.getSell()
    }

    render() {
        const {data} = this.state
        console.log("dataSell",data)

        const columns = [
            {
                title: '图书名',
                dataIndex: 'bookId',
                key: 'bookId',
                width: '30%',
                ...this.getColumnSearchProps('bookId'),
            },
            {
                title: '分类名',
                dataIndex: 'category',
                key: 'category',
                width: '20%',
                ...this.getColumnSearchProps('category'),
            },
            {
                title: '时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                ...this.getColumnSearchProps('updateTime'),
            },
        ];
        return (
            <Card title="Card Title">
                <Table columns={columns} dataSource={data}/>
            </Card>
        )
    }
}