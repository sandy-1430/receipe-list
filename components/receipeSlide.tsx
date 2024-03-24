
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReceipeCard } from "@/components/receipeCard";

export const ReceipeSlide = ({ recipe, hideFav }: any) => {
    
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
            recipe?.length ?
                <Slider {...settings}>
                    {recipe?.map((item: any, index: number) => (
                        <ReceipeCard key={item.recipeId} item={item} index={index} hideFav={hideFav} />
                    ))}
                </Slider>
            : <div className="err_receipe">No Receipes</div>
    )
}
