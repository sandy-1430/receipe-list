'use client';
import Link from "next/link";
import { useAppContext } from "@/context";
import { Each } from "@/utils/Each";
import { useEffect, useState } from "react";
import { ReceipeSearch } from "@/components/receipeSearch";
import { ReceipeSlide } from "@/components/receipeSlide";
import { getLSData } from "@/utils/localStorage";
import { useRouter } from "next/navigation";


export default function Home() {
  const { data: { userInfo: { username } ,receipeList }, setData }: any = useAppContext()
  const router = useRouter();
  
  const [tags, setTags] = useState<any>([])
  const [recipe, setRecipe] = useState<any>([])
  const [search, setSearch] = useState<any>("")

  useEffect(() => {
    let userInfo = getLSData("userInfo");
    if (!userInfo) {
        console.log(userInfo);
        setData({loggedIn: false})
        router.push("/login")
    } else {
        setData({loggedIn: true, userInfo: userInfo})
    }
  }, [router, setData])

  useEffect(() => {
    let filteredArr: any = [];
    receipeList.filter((x: any) => {
      filteredArr.push(x.tags)
    })

    let uniqueArr = Array.from(new Set(filteredArr.flat()))
    

    let finalArr: any = []
    uniqueArr.map((x: any) => {
      finalArr.push({ active: false, tagName: x })
    })

    setTags(finalArr)

    setRecipe(receipeList)

  }, [receipeList])  

  const hanldeFilter = (key: number) => {
    let ActiveArr = tags?.map((x: any, index: number) => {
      if (index === key) {
        x.active = !x.active
      }
      return x;
    })

    setTags(ActiveArr)
  }

  const handleSearch = (value: any) => {
    setSearch(value)
  }

  useEffect(() => {
    let searchArr = receipeList.filter((x: any) => {
      return x.title.toLowerCase().indexOf(search) !== -1 ? x : ''
    })

    let checkActive = tags?.filter((x: any) => x.active === true)
      if (checkActive?.length) {
        let filterActive: any = [];
        searchArr.filter((el: any) => {
          return !tags.find((element: any) => {
            if (element.active) {
              return el.tags.includes(element.tagName) ? filterActive.push(el) : '';
            }
          });
        });
        setRecipe(filterActive);
      }
      else{
        setRecipe(searchArr);
      }

  }, [tags, search, receipeList])

  return (
    <div className="home">
      <div className="container">
        <div className="d-flex justify-btn flex-wrap home-content">
          <div className="main_content">
            <h2>
              Welcome back , <span>{username}</span>
              <br /> Lets cook something New !
            </h2>
          </div>
          <div>
            <Link href="/add-recipe" className="black-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9998 10.8333H10.8332V15C10.8332 15.4583 10.4582 15.8333 9.99984 15.8333C9.5415 15.8333 9.1665 15.4583 9.1665 15V10.8333H4.99984C4.5415 10.8333 4.1665 10.4583 4.1665 9.99999C4.1665 9.54166 4.5415 9.16666 4.99984 9.16666H9.1665V4.99999C9.1665 4.54166 9.5415 4.16666 9.99984 4.16666C10.4582 4.16666 10.8332 4.54166 10.8332 4.99999V9.16666H14.9998C15.4582 9.16666 15.8332 9.54166 15.8332 9.99999C15.8332 10.4583 15.4582 10.8333 14.9998 10.8333Z" fill="white" />
              </svg>
              Add a New Recipe
            </Link>
          </div>
        </div>
        <ReceipeSearch hideFav={false} search={search} handleSearch={handleSearch} />
        <div className="receipe-tags d-flex">
          <Each of={tags} render={(item: any, index: any) =>
            <button type="button" className={item.active ? 'active' : ''} onClick={() => hanldeFilter(index)}> {item.tagName} </button>}
          />
        </div>
        <div className="receipe_list">
          <h4>Recommended Indian food  for you</h4>
          <ReceipeSlide recipe={recipe} hideFav={false} />
        </div>
      </div>
    </div>
  );
}
