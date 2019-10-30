import React,{Component} from "react";
import './index.less'
/*
外形像链接的按钮
 */

import {Button} from "antd";

export default function LinkButton(props) {
    //...props接收多个props对象
    return <button {...props} className="link-button"></button>
}