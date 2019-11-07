import React,{Component} from "react";
import {Card,Table,Button,Input,Select,Modal} from "antd";
import {
    reqBook,
    reqfindByName,
    reqfindByCatrgory,
    reqUpdateBook,
    reqAddBook,
    reqDeleteBook,
    reqAddCategory,
    reqfindByparentId,
    reqAddSale,
    reqfindByBookId
} from "../../api";
import {message} from "antd/es";
import UpdateAddForm from "./update-addForm";
import AddForm from "./addForm"
import AddCategory from "./addCategory"

const {Option} = Select;
export default class WareHouse extends Component {

    state = {
        book:[],
        books:{},
        searchType:"name",
        searchName:'',
        visible: false,
        visible1:false,
        visible2:false,
        loading:false,
        selectedRowKeys: [],
        category:[],
    }

    constructor(props){
        super(props)
        this.get = React.createRef()
    }

    getCategory = async (parentId) => {
        const result = await reqfindByparentId(parentId)
        console.log("result",result)
        if (result.event === 200){
            const data = result.obj
            console.log("一级",data)
            this.setState({category:data})
        }else {
            message.error("检索一级分类列表失败")
        }
    }
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
                const {bookName,price,categoryId,isbn,press,number,buyPerson,orderPrice} = values
                this.form.resetFields()
                const result = await reqAddBook(bookName,price,categoryId,isbn,press,number,buyPerson,orderPrice)
                if (result.event === 200){
                    this.getBookList()
                }
            }
        })
    }

    handleOk2 = () => {

        this.form.validateFields(async (err,values) => {
            if (!err){
                this.setState({visible2:false})
                this.form.resetFields()
                const {category,parentId} = values

                console.log("values",values)
                const result = await reqAddCategory(parentId,category)
                if (result.event === 200){
                    this.getCategory("0")
                }
            }
        })
    }

    handleCancel2 = () => {
        this.setState({visible2:false})
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
                width:'10%',
                title: 'isbn',
                dataIndex: 'isbn',
            },
            {
                width:'10%',
                title: '出版社',
                dataIndex: 'press',
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
                            <Button type='primary' onClick={() => this.addSale()}>下单</Button>
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

    deleteBook = async () => {
        const {selectedRowKeys} = this.state
        const result = await reqDeleteBook(selectedRowKeys)
        if (result.event === 200){
            this.setState({selectedRowKeys: []})
            this.getBookList()
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

    addSale = async () => {
        const {bookName,press,price,id} = this.state.book
        const result1 = await reqfindByBookId(id)
        if (result1.event === 200){
            message.error("此商品已经在订单中了")
        }else {
            const result = await reqAddSale(bookName,press,price,1,id,'pyj')
            if (result.event === 200){
                message.success("订单添加成功")
            }
        }

    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    componentWillMount() {
        this.initColumns()
        this.getBookList()
        this.getCategory("0")

    }
    componentDidMount() {

    }

    render() {
        const {book,searchType,searchName,books,loading,selectedRowKeys,category } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            fixed:true,
        };
        const hasSelected = selectedRowKeys.length > 0;
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
                <Button type='primary' onClick={() => this.setState({visible2:true})}>添加分类</Button>
                <Button type='primary' style={{margin:'0 15px'}} onClick={() => this.setState({visible1:true})}>添加图书</Button>
                <Button type="primary" onClick={this.deleteBook} disabled={!hasSelected}>
            删除图书
          </Button>
            </span>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        rowSelection={rowSelection}
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
                    />
                </Card>
                <Modal
                    title="修改图书"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <UpdateAddForm book={books} setForm={(form) => {this.form = form}}></UpdateAddForm>
                </Modal>
                <Modal
                    title="添加图书"
                    visible={this.state.visible1}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                >
                    <AddForm setForm={(form) => {this.form = form}}></AddForm>
                </Modal>
                <Modal
                    title="添加分类"
                    visible={this.state.visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                >
                    <AddCategory setForm={(form) => {this.form = form}} category={category}></AddCategory>
                </Modal>
            </div>
        )
    }
}