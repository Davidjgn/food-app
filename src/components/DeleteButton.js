import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);
    
    if(showConfirm){
        return(
            <div className="fixed bg-black/50 inset-0 flex items-center h-full justify-center">
                <div className="bg-white rounded-lg p-4">
                    <div>Are you sure you want to delete?</div>
                    <div className="flex gap-2 mt-1">
                        <button type="button" className="border border-gray-300" onClick={()=>setShowConfirm(false)}>
                            Cancel
                        </button>
                        <button
                            onClick={()=>{
                                onDelete();
                                setShowConfirm(false);
                            }}
                            type="button" className="bg-primary text-white">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <button className="border border-gray-300" type="button" onClick={()=>setShowConfirm(true)}>
            {label}
        </button>
    );
}