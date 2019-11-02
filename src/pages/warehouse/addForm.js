import React,{Component} from "react";
import {Input,Select,Form,Col,Button,Tooltip,Icon,Cascader,Row,Checkbox} from "antd";
import PropTypes from 'prop-types'
import { reqfindByparentId, reqfindSubCategory} from "../../api";

import {message} from "antd/es";

const { TextArea } = Input;
const { OptGroup } = Select;
class AddForm extends Component {

    static propTypes = {
        setForm:PropTypes.func.isRequired,
    }
    state = {
        category:[],
        subcategory:[],
    };
    getsubCategory = async () => {
        const result = await reqfindSubCategory()
        if (result.event === 200){
            const data = result.obj
            console.log("二级",data)
            this.setState({subcategory:data})
        }else {
            message.error("检索二级分类列表失败")
        }
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


    validatePrice = (rule,value,callback) => {
        if(value*1 > 0){
            callback()  //没有参数，验证就通过
        }else {
            callback('价格必须大于0')
        }

    }
    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    componentDidMount() {
        console.log("componentWillMount执行")
        this.getCategory("0")
        this.getsubCategory()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {category,subcategory} = this.state;
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
                        {
                            category.map(c => <OptGroup label={c.category} >
                                {
                                    subcategory.map(e => {
                                        if (e.parentId === c.id){
                                            return <option value={e.id}>{e.category}</option>
                                        }else {
                                            return ;
                                        }

                                    })
                                }
                            </OptGroup>)
                        }
                    </Select>)}
                </Form.Item>
                <Form.Item label="图书简介：">
                    {getFieldDecorator('brief', {
                        initialValue:'',
                        rules: [
                            {
                                required: true,
                                message: '请输入图书简介',
                            },
                        ],
                    })(<TextArea autoSize={{minRows:2,maxRows:6}}/>)}
                </Form.Item>
                <Form.Item label="采购人：">
                    {getFieldDecorator('buyPerson', {
                        initialValue:'',
                        rules: [
                            {
                                required: false,
                                message: '采购人',
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="采购单价：">
                    {getFieldDecorator('orderPrice', {
                        initialValue:'',
                        rules: [
                            {
                                required: false,
                                message: '请输入采购单价',
                            },{
                                validator:this.validatePrice
                            }
                        ],
                    })(<Input style={{width:100}}/>)}
                </Form.Item>
                <Form.Item label="单价：">
                    {getFieldDecorator('price', {
                        initialValue:'',
                        rules: [
                            {
                                required: true,
                                message: '请输入单价',
                            },{
                                validator:this.validatePrice
                            }
                        ],
                    })(<Input style={{width:100}}/>)}
                </Form.Item>
                <Form.Item label="库存：">
                    {getFieldDecorator('number', {
                        initialValue:'',
                        rules: [
                            {
                                required: true,
                                message: '请输入库存数',
                            },
                        ],
                    })(<Input style={{width:100}}/>)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm);