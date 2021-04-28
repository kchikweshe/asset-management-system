import React from 'react';

import {Link, withRouter} from 'react-router-dom';
import {badge} from "./UIComponents";

let workOrders = JSON.parse(sessionStorage.getItem('work-orders'))
// console.info("work", workOrders.map(i => i.name))
const Sidebar = () => (

    <div>
        <nav className={"fixed h-full bg-white-300 w-1/6 shadow-lg"}>

            <ul className={" inset-y-0 left-0 flex flex-col divide-y-4"}>
                <span className={"text-2xl py-5 text-center font-black antialiased font-sans"}>ASSET MANAGEMENT</span>
                <list
                    className={" group hover:bg-blue-500 hover:border-transparent hover:shadow-md group block rounded-lg "}>
                    <Link className={"group-hover:text-white block font-black text-black text-center text-xl py-6"}
                          to="/work-orders">
                        Work Orders {badge(workOrders.length)}
                    </Link>

                </list>
                <list
                    className={"container group hover:bg-blue-500 hover:border-transparent hover:shadow-md group block rounded-lg "}>
                    <Link className={"group-hover:text-white block font-black  text-black text-center text-xl py-6"}
                          to="/work-orders">
                        Requests
                    </Link>

                </list>


            </ul>
        </nav>

    </div>


);


export default withRouter(Sidebar);