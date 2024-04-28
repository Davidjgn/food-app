import Trash from "@/components/icons/trash"
import {cartProductPrice} from "@/components/AppContext";

export default function CartProduct({product,onRemove,index}) {
    return (
        <div className="flex items-center gap-4 mb-2 border-b py-2">
            <div className="w-24">
                <img src={product.image || '/pizza.png'} alt="pizza" className="max-h-32 block mx-auto" />
            </div>
            <div className="grow">
                <h3 className="font-semibold">
                    {product.name}
                </h3>
                {product.size && (
                    <div className="text-sm">
                        Size: <span>{product.size.name} ${product.size.price}</span>
                    </div>
                )}
                {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                        {product.extras.map((extra, index) => (
                            <div key={index}>
                                {extra.name} ${extra.price}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-lg font-semibold">
                ${cartProductPrice(product)}
            </div>
            {!!onRemove && (
                <div className="ml-2">
                    <button onClick={() => onRemove(index)}
                        type="button" className="border p-2">
                        <Trash />
                    </button>
                </div>
            )}
        </div>
    );
}