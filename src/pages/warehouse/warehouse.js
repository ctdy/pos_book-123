import React,{Component} from "react";
import {Card,Table,Button,Input,Select,Modal} from "antd";
import {reqBook,reqfindByName,reqfindByCatrgory,reqUpdateBook,reqAddBook} from "../../api";
import {message} from "antd/es";
import UpdateAddForm from "./update-addForm";
import AddForm from "./addForm"

const {Option} = Select;
export default class WareHouse extends Component {

    state = {
        book:[],
        books:{},
        searchType:"name",
        searchName:'',
        visible: false,
        visible1:false,
        loading:false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.form.validateFields(async (err,values) => {
            if (!err){
                this.setState({
                    visible: false,
                });
                const {id,bookName,price,categoryId,brief,number} = values
                console.log("values111",values)
                this.form.resetFields()
                const result = await reqUpdateBook(id,bookName,price,categoryId,brief,number)
                if (result.event === 200){
                    this.getBookList()
                }

            }
        })

    };
    handleOk1 = () => {
        this.form.validateFields(async (err,values) => {
            if (!err){
                this.setState({
                    visible1:false,
                })
                console.log("handleOk1",values)
                const {bookName,price,categoryId,brief,number,buyPerson,orderPrice} = values
                this.form.resetFields()
                const result = await reqAddBook(bookName,price,categoryId,brief,number,buyPerson,orderPrice)
                if (result.event === 200){
                    this.getBookList()
                }
            }
        })
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel1 = () => {
        this.setState({
            visible1: false,
        })
    }
    initColumns = () => {
        this.columns = [
            {
                width:'10%',
                title: '图书名称',
                dataIndex: 'bookName',

            },
            {
                width:'10%',
                title: '图书类型',
                dataIndex: 'category',
            },
            {
                width:'30%',
                title: '图书描述',
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
            },
            {
                width:'10%',
                title: '操作',
                render: (books) => {
                    console.log("book",books)
                    return (
                        <span>
                            <Button type='primary' style={{margin:'0 15px'}} onClick={() => this.setState({visible:true,books:books})}>修改</Button>
                            <Button type='primary'>采购</Button>
                        </span>
                    )
                }
            }
    ]
    }

    getBookList = async () => {
        const result = await reqBook()
        console.log("result",result)
        this.setState({loading:true})
        if (result.event === 200){
            const book = result.obj
            console.log("book",book)
            this.setState({book})
            this.setState({loading:false})
        }else {
            message.error("获取图书列表失败")
        }
    }

    getBookSearch = () => {
        if (!this.state.searchName)
            this.getBookList()
        if (this.state.searchName) {
            const {searchName,searchType} = this.state
            if (searchType === 'name') {
                this.getBookSearchByName(searchName)
            } else {
                this.getBookSearchByCategory(searchName)
            }
        }
    }

    getBookSearchByCategory = async (category) => {
        const result = await reqfindByCatrgory(category)
        if (result.event === 200){
            const book = result.obj
            this.setState({book})
        }else {
            message.error("搜索失败")
        }
    }

    getBookSearchByName = async (bookName) => {
        const result = await reqfindByName(bookName)

        console.log("1111",result)
        if (result.event === 200){
            const book = result.obj
            this.setState({book})
        }else {
            message.error("搜索失败")
        }
    }

    componentWillMount() {
        this.initColumns()

    }
    componentDidMount() {
            this.getBookList()
    }

    render() {
        const {book,searchType,searchName,books,loading} = this.state
        const title = (
            <span>
                <Select style={{width:150}} value={searchType} onChange={(value) => this.setState({searchType: value})}>
                    <Option value='name'>按图书名称搜索</Option>
                    <Option value='category'>按图书类型搜索</Option>
                </Select>
                <Input style={{width:200,margin:'0 15px'}} placeholder="关键字" value={searchName} onChange={(event) => this.setState({searchName: event.target.value})}></Input>
                <Button type='primary' onClick={() => {this.getBookSearch()}}>搜索</Button>
            </span>
        )
        const extra = (
            <span>
                <Button type='primary' style={{margin:'0 15px'}} onClick={() => this.setState({visible1:true})}>添加图书</Button>
            </span>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        bordered={true}
                        rowKey='id'       //以每一组数据的_id作为key
                         dataSource={book}
                        loading={loading}
                        columns={this.columns}
                        pagination={{
                            // total:this.state.total,
                            defaultPageSize: 5,
                            showQuickJumper: true,
                             // onChange: this.getProduct   //(pageNum)=>{this.getProduct(pageNum)}的简化
                        }}
                    />;
                </Card>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <UpdateAddForm book={books} setForm={(form) => {this.form = form}}></UpdateAddForm>
                </Modal>
                <Modal
                    visible={this.state.visible1}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                >
                    <AddForm setForm={(form) => {this.form = form}}></AddForm>
                </Modal>
            </div>
        )
    }
}