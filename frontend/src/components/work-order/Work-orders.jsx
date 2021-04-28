import WorkOrder from "./WorkOrder";
import {withRouter} from "react-router-dom";

let work_orders = JSON.parse(sessionStorage.getItem('work-orders'))

function WorkOrders() {
    console.log("Data: ", work_orders);
    return (
        <div className={"flex justify-center "}>
            <div className={""}>
                <ul className={"flex flex-row grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"}>
                    {work_orders.map(w =>
                        <li className={"flex"} key={w.id}><WorkOrder work_order={w}/></li>
                    )}


                </ul>

            </div>
        </div>

    )
}

export default withRouter(WorkOrders)