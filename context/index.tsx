'use client'
import { createContext, useContext, useReducer } from 'react'
 
const AppContext = createContext({})

export const AppWrapper = ({children,}:{ 
    children: React.ReactNode;
  }) => {
    const [data, setData] = useReducer(
        (prev:any, next:any)=>({...prev, ...next}),
        {
            loggedIn: false,
            userInfo: '',
            userList: [],
            receipeList: []
        }
    );

    return(
        <AppContext.Provider value={{ data, setData}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () =>{
    return useContext(AppContext)
}