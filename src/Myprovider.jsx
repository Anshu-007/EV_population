import { useState } from "react";
import MyContext from './MyContext'



const MyProvider = ({children}) =>{
    const [evPopulationData, setEvPopulationData] = useState([]);
    return (
        <MyContext.Provider value={{evPopulationData,setEvPopulationData}}>
            {children}
         </MyContext.Provider>
    )
}
export default MyProvider;