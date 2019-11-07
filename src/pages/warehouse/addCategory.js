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
        category:PropTypes.array.isRequired,
    }

    state = {
        category:[],
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { category } = this.props
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
                    <Form.Item label="分类名：">
                        {getFieldDecorator('category', {
                            initialValue:'',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入分类名',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="分类">
                        {getFieldDecorator('parentId', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '选中分类' },
                            ],
                        })(<Select defaultValue="0">
                            <Option value="0">一级分类</Option>
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