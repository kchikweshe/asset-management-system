import './App.css';
import React, {Component} from "react";


import {Route, withRouter} from "react-router-dom";
import Homepage from "./components/home";
import Login from "./components/ui-components/forms/Login";

//
// const App = (props) => {
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [userData, setUserData] = useState([])
//     const [employee, setEmployee] = useState()
//     const [workOrders, setWorkOrders] = useState([])
//
//
//     let history = useHistory();
//     const handleLogin = e => {
//         e.preventDefault()
//         let user = {
//             username: username,
//             password: password
//         }
//         ServiceAPI.login(user).then((res) => {
//             setUserData(res.data)
//         }).catch((error) => {
//                 render(
//                     <TransitionAlert severity={"error"}
//                                      message={`${error.message}`}/>
//                 )
//             }
//         )
//     }
//
//     useEffect(() => {
//             userData.key && ServiceAPI.getAll(`workorders/${userData.employee}`, userData.key).then((res) =>
//                 setWorkOrders(res.data)
//             )
//         }
//         , [userData])
//     useEffect(() => {
//
//             workOrders.length > 0 && setEmployee(workOrders.map(item => item.worker).find(item => item))
//
//
//         }
//         , [workOrders])
//
//     useEffect(() => {
//         employee && history.push('/home')
//     }, [employee])
//     return (
//
//         //
//         // {/* A <Switch> looks through its children <Route>s and
//         //     renders the first one that matches the current URL. */
//         // }
//         <Switch>
//
//             <Route path="/home">
//                 <Homepage workOrders={workOrders} employee={
//                     employee
//
//                 } token={userData.key}/>
//             </Route>
//             <Route exact path="/">
//                 <Login setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
//             </Route>
//         </Switch>
//
//     )
//         ;
// }
// export default App


class App extends Component {
    constructor(props) {
        super(props);

    }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.info(prevState, this.state, prevProps)
    //
    //     let token = sessionStorage.getItem('token')
    //
    //     if (this.state.userData !== prevState.userData) {
    //         this.fetchData(token)
    //
    //     }
    // }


    render() {

        return (
            <div>
                <Route exact path="/">
                    <Homepage/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>

            </div>

        )
    }
}

export default withRouter(App)
