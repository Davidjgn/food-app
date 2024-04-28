'use client';
import Trash from "@/components/icons/trash";
import Plus from "@/components/icons/plus";
import UpIcon from "@/components/icons/chevronUp";
import DownIcon from "@/components/icons/chevronDown"
import { useState } from "react";

export default function MenuItemPriceProps({ name, buttonLabel, props, setProps }) {
    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        });
    }

    function editProp(e, index, prop) {
        const val = e.target.value;
        setProps(prevProps => {
            const newSizes = [...prevProps];
            newSizes[index][prop] = val;
            return newSizes;
        })
    }

    function removeProp(index) {
        setProps(prev => prev.filter((v, i) => i !== index))
    }


    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button onClick={()=>setIsOpen(prev=>!prev)}
             type="button" className="inline-flex p-1 justify-start">
                {isOpen && (
                    <UpIcon />
                )}
                {!isOpen && (
                    <DownIcon />
                )}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div className="flex gap-2 items-end">
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Name" value={size.name}
                                onChange={e => editProp(e, index, 'name')} />
                        </div>
                        <div>
                            <label>Extra cost</label>
                            <input type="text" placeholder="Extra cost" value={size.price}
                                onChange={e => editProp(e, index, 'price')} />
                        </div>
                        <div>
                            <button type="button" className="bg-white mb-2 px-2"
                                onClick={() => removeProp(index)}
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button onClick={addProp} type="button" className="bg-white items-center">
                    <Plus className="w-4 h-4" />
                    <span>{buttonLabel}</span>
                </button>
            </div>
        </div>
    );
}