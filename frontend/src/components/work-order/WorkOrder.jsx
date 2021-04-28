export default function WorkOrder({work_order}) {

    return (<div className="flex relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">

            <div
                className=" text-white flex work_orders-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
            </div>
            <div className="mt-8">
                <p className="text-xl font-semi-bold my-2">{work_order.name}</p>
                <div className="flex space-x-2 text-gray-400 text-sm">

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p>{work_order.description}</p>
                </div>
                <div className="flex space-x-2 text-gray-400 text-sm my-3">

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <p>{work_order.due_date}</p>
                </div>
                <div className="border-t-2"/>

                <div className="flex justify-between">
                    <div className="my-2">
                        <p className="font-semi-bold text-base mb-2">Team Member</p>
                        <div className="flex space-x-2">
                            <img
                                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                className="w-6 h-6 rounded-full"/>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Woman_7.jpg"
                                 className="w-6 h-6 rounded-full"/>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSqK0tVELGWDYAiUY1oRrfnGJCKSKv95OGUtm9eKG9HQLn769YDujQi1QFat32xl-BiY&usqp=CAU"
                                className="w-6 h-6 rounded-full"/>
                        </div>
                    </div>
                    <div className="my-2">
                        <p className="font-semi-bold text-base mb-2">Progress</p>
                        <div className="text-base text-gray-400 font-semi-bold">
                            <p>34%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

