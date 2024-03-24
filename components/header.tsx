"use client";
import { useEffect, useState } from "react"
import dataJson from "@/libs/data.json"
import { getLSData, setLSData, removeLSData } from "@/utils/localStorage";
import Image from "next/image";
import logo from "@/assests/logo.png"
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

export default function Header() {
    const [menu, setMenu] = useState(false)
    const router = useRouter();
    const {data:{ loggedIn}, setData }:any = useAppContext()

    useEffect(() => {
        const getData = getLSData("data");
        if (!getData) {
            setLSData("data", dataJson?.data)
            setData({
                userList: dataJson?.data?.userList,
                receipeList: dataJson?.data?.receipeList
            })
        }else{    
            setData({
                userList: getData?.userList,
                receipeList: getData?.receipeList
            })
        }
    }, [setData])

    const handleLogout = () =>{
        removeLSData("userInfo")
        setData({loggedIn: false})
        router.push('/login')
    }

    return (
        <header>
            <div className="container">
                <div className="d-flex justify-btn align-center">
                    <div className="logo">
                        <Link href="/">
                            <Image src={logo} alt="logo" />
                        </Link>
                    </div>
                    {loggedIn &&
                        <>
                            <div className={`navMenu ${menu ? 'active' : ''}`} onClick={() => setMenu(menu ? false : true)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="nav-list d-flex align-center">
                                <ul className="d-flex">
                                    <li><Link href="/">Recipies</Link></li>
                                    <li><Link href="">Cuisine{`'`}s</Link></li>
                                    <li><Link href="">Region</Link></li>
                                    <li><Link href="">About US</Link></li>
                                    <li><Link href="">Contact US</Link></li>
                                </ul>
                                <button type="button" className="btn-rounded-primary" onClick={handleLogout}>Logout</button>
                            </div>
                        </>
                    }
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </header>
    )
}
