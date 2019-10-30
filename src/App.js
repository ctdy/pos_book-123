import React,{Component} from "react";
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Admin from "./pages/admin/Admin";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}