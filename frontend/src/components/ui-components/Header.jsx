import React from "react";

const Header = () => {
   let employee= JSON.parse(sessionStorage.getItem('employee-data'))
    console.info('employee: ',employee.title)
    const work_orders=sessionStorage.getItem('work-orders')
    return (
        <div className={"flex flex-row "}>
            <div className={"flex justify-center space-x-5 "}>
                <div className={"flex"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>

                <div className={"flex"}>
                    <span className={"text-xl"}>Hello {employee.user.first_name}</span>
                    </div>
            </div>

        </div>
    )
}
export default Header