"use client"
import { useAppContext } from "@/context"
import { setLSData } from "@/utils/localStorage"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function Signin({setSignIn}:any) {
    const {data:{ userList}, setData }:any = useAppContext()
    const router = useRouter();
    
    const [input, setInput] = useState<any>({
        email: '',
        password: ''
    })

    const handleLogin =(e:any) =>{
        e.preventDefault();

        const checkUser = userList?.filter((x:any)=> x.email === input.email && x.password === input.password)

        if(!checkUser?.length){
            toast.error("enter valid credentials!", {theme: "colored", className: "toasted"})
            return false
        }

        setLSData("userInfo", checkUser[0])
        
        setData({userInfo: checkUser[0], loggedIn: true})
        router.push('/')
    }

    return (
        <form onSubmit={(e)=>handleLogin(e)}>
            <div className="form-content">
                <h5>Welcome Back.</h5>
                <p>Login To Get Started</p>
            </div>
            <div className="input-text">
                <input 
                    type="email" 
                    placeholder="Email" 
                    required
                    value={input.email}
                    onChange={(e)=>setInput((prev:any)=>({...prev, email: e.target.value}))}
                />
            </div>
            <div className="input-text">
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={input.password}
                    onChange={(e)=>setInput((prev:any)=>({...prev, password: e.target.value}))}
                />
            </div>
            <button type="submit" className="btn-primary">Login</button>
            <div className="option-text">
                <div className="option">Or</div>
            </div>
            <button type="button" className="btn-outline-secondary" onClick={()=>setSignIn(false)}>Signup</button>
        </form>
    )
}
