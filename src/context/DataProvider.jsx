import { createContext, useState } from "react"

// this creates a context that is used to pass childern in a component.

export const DataContex = createContext(null);

////////////////////////////////////////////
//                                        //
//    BRO CONTEXT PADH LIO EK BAAR PLIJ   //
//                                        //
////////////////////////////////////////////

const DataProvider = ( { children } ) =>{

    const [account, setAccount] = useState({ username: '', name: '' });

    return(

        <DataContex.Provider value={{ 
            account,
            setAccount
        }}>
            { children }
        </DataContex.Provider>

    )
}

export default DataProvider;