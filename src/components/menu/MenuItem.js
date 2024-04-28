import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile";

export default function MenuItem(menuItem) {
    const { name, image, desc, basePrice, sizes, extraIng } = menuItem;
    const { addToCart } = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [extrasSelected, setExtrasSelected] = useState([]);

    function addToCartButton() {
        const hasOptions = sizes.length > 0 || extraIng.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
        addToCart(menuItem, selectedSize, extrasSelected);
        setShowPopup(false);
        toast.success('Added to cart.');

    }

    function handleIngredients(e, extraItem) {

        const checked = e.target.checked;
        if (checked) {
            setExtrasSelected(prev => [...prev, extraItem]);
        } else {
            setExtrasSelected(prev => {
                return prev.filter(e => e.name !== extraItem.name);
            });
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (extrasSelected?.length > 0) {
        for (const i of extrasSelected) {
            selectedPrice += i.price;
        }
    }

    return (
        <>
            {showPopup && (
                <div onClick={() => setShowPopup(false)}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center">
                    <div onClick={(e) => e.stopPropagation()}
                        className="bg-white my-8 rounded-lg p-2 max-w-md max-h-screen">
                        <div className="overflow-y-scroll p-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <img src={image || 'pizza.png'} alt="pizza" className="max-h-64 block mx-auto" />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{desc}</p>
                            {sizes?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Pick your size</h3>
                                    {sizes.map((size, index) => (
                                        <label key={index} className="flex items-center gap-2 p-4 mb-1 rounded-md border">
                                            <input onChange={() => setSelectedSize(size)}
                                                checked={selectedSize?.name === size.name}
                                                type="radio" name="size" /> {size.name} ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIng?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Extra ingredients</h3>
                                    {extraIng.map((ingredient, index) => (
                                        <label key={index} className="flex items-center gap-2 p-4 mb-1 rounded-md border">
                                            <input type="checkbox" onChange={(e) => handleIngredients(e, ingredient)}
                                                name={ingredient.name} /> {ingredient.name} + ${ingredient.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button onClick={addToCartButton}
                                className="bg-primary text-white sticky bottom-0" type="button">
                                Add to cart ${selectedPrice}
                            </button>
                            <button type="button" onClick={() => setShowPopup(false)} className="border mt-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile {...menuItem} onAddToCart={addToCartButton} />
        </>
    );
}