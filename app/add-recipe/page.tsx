"use client";
import { useAppContext } from "@/context";
import { getLSData, setLSData } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
    const { data: { userInfo: { userId }, userList, receipeList }, setData }: any = useAppContext()
    const router = useRouter();

    const [input, setInput] = useState({
        title: '',
        ingredients: '',
        tags: '',
        duration: '',
        imageUrl: ''
    })

    useEffect(() => {
        let userInfo = getLSData("userInfo");
        if (!userInfo) {
            console.log(userInfo);
            setData({ loggedIn: false })
            router.push("/login")
        } else {
            setData({ loggedIn: true, userInfo: userInfo })
        }
    }, [router, setData])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let { title, ingredients, tags, duration, imageUrl } = input;

        receipeList.push({
            recipeId: uuidv4(),
            title,
            ingredients: ingredients.split(',').join('').split(' '),
            tags: tags.split(',').join('').split(' '),
            duration,
            imageUrl,
            userId
        })

        setLSData("data", { userList, receipeList })
        setData({
            userList: userList,
            receipeList: receipeList
        })
        toast.success("Recipe Added!", { theme: "colored", className: "toasted" })
        setInput({
            title: '',
            ingredients: '',
            tags: '',
            duration: '',
            imageUrl: ''
        })
    }

    return (
        <div className="container">
            <form className="add-recipe" onSubmit={(e) => handleSubmit(e)}>
                <h2>Add a New Recipie</h2>
                <div className="input-text">
                    <input
                        type="text"
                        placeholder="Add a name to your recipie"
                        required
                        value={input.title}
                        onChange={(e) => setInput((prev: any) => ({ ...prev, title: e.target.value }))}
                    />
                </div>
                <div className="input-text">
                    <input
                        type="text"
                        placeholder="Add the ingredients list"
                        required
                        value={input.ingredients}
                        onChange={(e) => setInput((prev: any) => ({ ...prev, ingredients: e.target.value }))}
                    />
                </div>
                <div className="input-text">
                    <input
                        type="text"
                        placeholder="Describe how much duration does it take"
                        required
                        value={input.duration}
                        onChange={(e) => setInput((prev: any) => ({ ...prev, duration: e.target.value }))}
                    />
                </div>
                <div className="input-text">
                    <input
                        type="text"
                        placeholder="add cloudinary image url"
                        required
                        value={input.imageUrl}
                        onChange={(e) => setInput((prev: any) => ({ ...prev, imageUrl: e.target.value }))}
                    />
                </div>
                <div className="input-text">
                    <input
                        type="text"
                        placeholder="Please add a appropriate category to your recipie"
                        required
                        value={input.tags}
                        onChange={(e) => setInput((prev: any) => ({ ...prev, tags: e.target.value }))}
                    />
                </div>
                <button type="submit" className="btn-primary">Submit</button>
            </form>
        </div>
    )
}
