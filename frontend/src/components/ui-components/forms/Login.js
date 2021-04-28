import CustomTextField from "../../ui-components/CustomTextField.jsx";

import React, {useState} from "react";
import Logo from "../Logo.jsx";
import {withRouter} from "react-router-dom";
import ServiceAPI from "../../forms/Service";
import {TransitionAlert} from "../TransitionalAlert";
import {render} from "@testing-library/react";

function onEmployeeDataFetched(props) {
    let workOrders = JSON.parse(sessionStorage.getItem('work-orders'))
    console.info("Work Order data: ", workOrders)

    let employee_data = workOrders.map(work_order => work_order.worker).find(worker => worker)
    console.info("Employee data: ",  employee_data)
    sessionStorage.setItem('employee-data', JSON.stringify(employee_data))

    props.history.push('/')

}

function fetchData(token, props) {
    let employeeId = sessionStorage.getItem('employeeId')

    ServiceAPI.getAll(`workorders/${employeeId}`, token).then((res) => {
            sessionStorage.setItem('work-orders', JSON.stringify(res.data))
        }
    ).then(() => onEmployeeDataFetched(props))

}

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = e => {
        e.preventDefault()

        let user = {
            username: username,
            password: password,
        }
        ServiceAPI.login(user).then((res) => {
            sessionStorage.setItem('token', res.data['key'])
            sessionStorage.setItem('employeeId', res.data['employee'])

            console.info("Session token,", sessionStorage.getItem('token'))
        }).then(() => {
            let token = sessionStorage.getItem('token')
            fetchData(token, props)
        }).catch((error) => {
                render(
                    <TransitionAlert severity={"error"}
                                     message={`${error.message}`}/>
                )
            }
        )
    }


    return (
        <div className={"flex flex-column "}>
            <div className={"container flex justify-content-center"}><Logo/></div>
            <div className={"mt-8 sm:mx-auto sm:w-full sm:max-w-md px-6 py-8 shadow-lg"}>
                <form className={"mb-0 space-y-6 "} onSubmit={handleLogin}>
                    <CustomTextField setter={setUsername} value={username} label={"Username"}
                                     placeholder={"Username"}/>
                    <CustomTextField setter={setPassword} value={password} type={'password'}
                                     label={"Password"}
                                     placeholder={"Password"}/>
                    <div>
                        <button type={"submit"} className={"bg-indigo-600 text-white " +
                        "w-full flex justify-center " +
                        "py-2 px-4 border font-medium border-transparent text-sm rounded-md shadow-sm "}>
                            LOGIN
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default withRouter(Login)
