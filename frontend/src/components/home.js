import React, {Component} from 'react';
import 'react-bootstrap'
import {Row} from 'react-bootstrap';

import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import Header from "./ui-components/Header";
import Sidebar from "./ui-components/Sidebar";
import WorkOrders from "./work-order/Work-orders";

function Request() {
    return null;
}

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    //
    // static getDerivedStateFromProps(props, state) {
    //     if (props.workOrders !== state.workOrders) {
    //         console.log("Employee :",props.employee)
    //         return {
    //             workOrders: props.workOrders,
    //             employee: props.employee,
    //             token: props.token
    //
    //         };
    //     }
    //     return null;
    //
    //
    // }


    componentDidMount() {
        if (this.state.isLoggedIn) {
            this.props.history.push('/login')
        }
    }

    render() {


        return (
            <BrowserRouter>
                <div>
                    <Sidebar/>
                </div>
                <Row>

                    <main className={"mx-96 container w-100 mx-auto "}>
                        <div>
                            <Header/>
                        </div>
                        <Switch>
                            <Route path="/">
                                <WorkOrders/>

                            </Route>
                            <Route path="/requests">
                                <Request/>
                            </Route>
                        </Switch>
                    </main>
                </Row>
            </BrowserRouter>
        );
    }
}

export default withRouter(Homepage)