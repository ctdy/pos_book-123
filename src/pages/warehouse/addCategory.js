import React,{Component} from "react";
import { Input,Select,Form } from "antd";
import PropTypes from "prop-types";
import {reqfindByparentId} from "../../api";
import {message} from "antd/es";

const {Item} = Form.Item
const { OptGroup,Option } = Select;
class AddCategory extends Component {

    static propTypes = {
        setForm:PropTypes.func.isRequired,
    }

    state = {
        category:[],
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

    componentDidMount() {
        this.getCategory("0")
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { category } = this.state
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
                <Form {...formItemLayout}>
                    <Form.Item label="书名：">
                        {getFieldDecorator('bookName', {
                            initialValue:'',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入书名',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="分类">
                        {getFieldDecorator('categoryId', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '选中分类' },
                            ],
                        })(<Select>
                            <Option value="1">一级分类</Option>
                            {
                                category.map(c => <Option value={c.id}>{c.category}</Option>)
                            }
                        </Select>)}
                    </Form.Item>
                </Form>
        )
    }
}
export default Form.create()(AddCategory);