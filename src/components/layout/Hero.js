import Image from "next/image";
import Right from "../icons/right";

export default function Hero(){
    return(
        <section className="body mt-4" >
            <div className="py-12">
                <h1 className="text-4xl font-semibold">
                    Everything <br/> 
                    is better <br/> 
                    with&nbsp;
                    <span className="text-primary">Pizza</span>
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                    Indulge in Irresistible Flavor: Welcome to our Pizza Haven, Where Every Bite Tells a Story of Freshness, Quality, and Tradition. Join us on a Culinary Journey, Crafting Memories One Slice at a Time!
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="flex justify-center bg-primary text-white uppercase px-4 py-2 rounded-full flex items-center gap-2">
                        Order Now
                        <Right/>
                    </button>
                    <button className="flex items-center gap-2 py-2 text-gray-600 font-semibold">
                        Learn More
                        <Right/>
                    </button>
                </div>
            </div>
            <div className="relative hidden md:block">
                <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'}/>
            </div>
        </section>
    );
}