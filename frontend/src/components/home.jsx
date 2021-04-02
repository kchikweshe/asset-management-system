import React, { Component } from 'react'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employee_id: "",
            requests: [],
            work_orders: [],
            server: "http://localhost:8000/api"

        };
    }

    componentDidMount() {
        let server = this.state.server
        fetch(server + "/workOrders").then(
            (response) => {
                this.setState({ work_orders: response })
            }
        )
    }


}



