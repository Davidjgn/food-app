'use client';
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { useProfile } from "../UseProfile";
import AddressInputs from "./AddressInputs";

export default function UserForm({user, onSave}) {
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [street, setStreet] = useState(user?.street || '');
    const [pCode, setPCode] = useState(user?.pCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false)
    const {data} = useProfile();

    function handleAddress(propName, value){
        if(propName === 'phone') setPhone(value);
        if(propName === 'street') setStreet(value);
        if(propName === 'pCode') setPCode(value);
        if(propName === 'city') setCity(value);
        if(propName === 'country') setCountry(value);
    }

    return (
        <div className="sm:flex gap-4">
            <div>
                <div className="p-2 rounded-lg max-w-[120px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form className="grow" onSubmit={(e)=>onSave(e, {name:userName, image, phone, street, pCode, city, country, admin})}>
                <label>First and last name</label>
                <input type="text" placeholder="First and last name" value={userName} onChange={e => setUserName(e.target.value)} />

                <label>Email</label>
                <input type="email" placeholder="email"
                    value={user.email} disabled={true} />

                <AddressInputs addressProps={{phone,street,pCode,city,country}} 
                    setAddressProps={handleAddress}/>
                {data.admin && (
                    <div>
                        <label className="p-2 block inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                            <input className="" id="adminCb" type="checkbox" value={'1'}
                                checked={admin} onChange={e=>setAdmin(e.target.checked)}/> 
                            <span>Admin</span>
                        </label>
                    </div>
                )}

                <button type="submit">Save</button>
            </form>
        </div>
    );
}