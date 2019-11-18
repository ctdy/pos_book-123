import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React,{Component} from "react";
import './login.less'
import logo from "../../assets/images/logo.png"

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault(); ///阻止默认事件
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>

                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <Form.Item>
                            {
                                //注意命名
                                getFieldDecorator('name', {
                                    //声明式验证，直接用别人写的
                                    rules: [
                                        {required:true,whiteSpace:true,message:'用户必须输入'},
                                        {min:4,message:'用户名至少4位'},
                                        {max:12,message:'用户名至多12位'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或者下划线组成'},
                                    ],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                           placeholder="用户名"
                                    />)
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {required:true,whiteSpace:true,message:"请用户输入密码"},
                                        {min:4,message:'用户名至少4位'},
                                        {max:12,message:'用户名至多12位'}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />)
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Form.create()(Login);