'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile"
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage() {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const {loading, data} = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(()=>{
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
          res.json().then(categories => {
            setCategories(categories);
          });
        });
      }

    async function handleCategory(e){
        e.preventDefault();
        const createPromise = new Promise(async (resolve, reject)=>{
            const data = {name: category};
            if(editedCategory){
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            });
            setCategory('');
            setEditedCategory(null);
            fetchCategories();
            if(response.ok) 
                resolve();
            else
                reject();
        });
        await toast.promise(createPromise, {
            loading: editedCategory ? 'Updating category...' : 'Creating category...',
            success: editedCategory ? 'Category updated.' : 'Category created.',
            error: 'Error.',
        })
    }

    async function handleDeleteClick(_id){
        const promise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/categories?_id='+_id, {
                method: 'DELETE',
            });
            if(response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(promise, {
            loading:'Deleting...',
            success: 'Category deleted.',
            error: 'Error.',
        });

        fetchCategories();
    }

    if(loading){
        return 'Loading...';
    }
    if(!data.admin){
        return 'Not an admin.';
    }

    return(
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={data.admin}/>
            <form className="mt-8" onSubmit={handleCategory}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category: ' : 'New Category Name'}
                            {editedCategory && (<><b>{editedCategory.name}</b></>)}
                        </label>
                        <input type="text" value={category} onChange={e=>{setCategory(e.target.value)}}/>
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button type="submit">{editedCategory ? 'Update' : 'Create'}</button>
                        {editedCategory && (
                            <button onClick={()=>{setEditedCategory(null);
                                                  setCategory('');
                                                    }}
                                className="border border-gray-300" type="button">
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
                {categories?.length > 0 && categories.map((c, index)=>(
                    <div key={index} className="bg-gray-200 rounded-xl py-2 px-4 mb-1 flex items-center">
                        <div className="grow">
                            {c.name}
                        </div>
                        <div className="flex gap-1">
                            <button className="border border-gray-300" type="button" onClick={()=>{
                                setEditedCategory(c);
                                setCategory(c.name);
                                }}>
                                Edit
                            </button>
                            <DeleteButton label="Delete" onDelete={()=>handleDeleteClick(c._id)} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
