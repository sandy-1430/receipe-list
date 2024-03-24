"use client";
import Image from "next/image";
import loginBanner from "@/assests/login.png"
import Signin from "@/components/signin";
import { useEffect, useState } from "react";
import Signup from "@/components/signup";
import { getLSData } from "@/utils/localStorage";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [signIn, setSignIn] = useState(true); 

  useEffect(() => {    
    let userInfo = getLSData("userInfo");
    if(userInfo){
      router.push("/")
    }
  }, [router])
  

  return (
    <div className="login">
      <div className="container">
        <div className="d-flex justify-btn">
          <div className="login_banner">
            <Image src={loginBanner} alt="login banner" />
            <div className="login-content">
              <h4>Welcome to recipo</h4>
              <p>Search for your favourite recipe and try to cook things on your own , signup and explore the trending recipies !</p>
            </div>
          </div>
          <div className="login_form">
            {signIn ? <Signin setSignIn={setSignIn} /> : <Signup setSignIn={setSignIn} />}
          </div>
        </div>
      </div>
    </div>
  )
}
