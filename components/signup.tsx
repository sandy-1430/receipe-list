"use cliennt";
import { useAppContext } from "@/context";
import { setLSData } from "@/utils/localStorage";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';


export default function Signup({setSignIn}:any) {
    const {data:{ userList, receipeList} }:any = useAppContext()

    const [input, setInput] = useState<any>({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit= (e:any) =>{
        e.preventDefault();

        const {name, email, password } = input;

        const requirements = [
            password.length >= 8,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password)
        ]

        const isValid = requirements.every(Boolean)

        if (!isValid) {
            toast.error("Enter Valid Password", {theme: "colored", className: "toasted"})
            return false
        } 
        
        const checkMail = userList?.filter((x:any)=> x.email === email)

        if(checkMail?.length){
            toast.error("This User is already Exits!", {theme: "colored", className: "toasted"})
            return false
        }

        userList.push({
            userId: uuidv4(),
            name,
            email,
            password,
            favorites: []
        })        

        setLSData("data", {userList, receipeList})
        toast.success("Registered Successfully!", {theme: "colored", className: "toasted"})
        setSignIn(true)
    }
    

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-content">
                <h5>Join the world{`'`}s largest </h5>
                <p>community of home cooks.</p>
            </div>
            <div className="input-text">
                <input 
                    type="text" 
                    placeholder="Username" 
                    required 
                    value={input.name}
                    onChange={(e)=>setInput((prev:any)=>({...prev, name: e.target.value}))}
                />
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
            <button type="submit" className="btn-primary">Signup</button>
            <div className="option-text">
                <div className="option">Or</div>
            </div>
            <button type="submit" className="btn-outline-secondary" onClick={()=>setSignIn(true)}>Login</button>
        </form>
    )
}
