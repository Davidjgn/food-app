export default function MenuItemTile({onAddToCart, ...item}) {
    const {image,name,desc,basePrice,sizes,extraIng} = item;
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <div className="text-center">
                <img src={image || 'pizza.png'} alt="pizza" className="max-h-24 block mx-auto" />
            </div>
            <h4 className="font-semibold text-xl my-3">
                {name}
            </h4>
            <p className="text-gray-500 text-sm line-clamp-3">
                {desc}
            </p>
            <button onClick={onAddToCart}
                type="button"
                className="mt-4 bg-primary text-white px-8 py-2 rounded-full">
                {(sizes?.length > 0 || extraIng?.length > 0) ? (
                    <span>Add to cart (from ${basePrice})</span>
                ) : (
                    <span>Add to Cart ${basePrice}</span>
                )}
            </button>
        </div>
    );
}