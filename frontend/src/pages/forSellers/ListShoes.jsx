import React, { useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import Footer from '../components/Footer.jsx'
import { app } from '../../firebase.js';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { useAuth } from '../context/ContextAPI.jsx';
import {Bounce, toast } from 'react-toastify'
const ListShoes = () => {

    const {authUser} = useAuth();

    const [files , setFile] = useState({});
    const [imgloading , imgsetLoading] = useState(false)
    const [formData , setFormData] = useState({
        selleris:authUser?.useris?._id,
        imageUrls:[],
    });
console.log(formData);
    console.log(files);
    const submitImage=()=>{
        if(files.length > 0 && files.length < 5){
            const promises = [];
            for(let i=0;i<files.length;i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)})
            }).catch((error)=>{
                toast.error('Image Upload Failed (2mb Max Per Image', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                  })
            });

        }
        else(
            toast.error("Image Shoul be More then 0 and Lest Then 5", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              })
        )
    };

    const storeImage=async(file)=>{
        return new Promise((resolve , reject) =>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage , fileName);
            const UploadTask = uploadBytesResumable(storageRef,file);
            UploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    
                    console.log(`Uploades is ${progress}% done`);
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL);
                    })
                }
            )
        })
    }
    return (
        <div>
            <NavBar />
            <div className='max-w-[98%] mx-auto h-auto flex justify-center items-center my-4'>
                <div className='felx flex-col justify-center items-center bg-blue-800 md:w-auto w-[300px] rounded-md p-2'>
                    <h1 className='text-4xl font-bold font-mono text-white my-4 text-center'>LIST SHOES</h1>
                    <form className='w-full flex flex-col md:flex-row gap-2 '>
                        <div className='flex flex-col gap-4 md:w-[50%] '>
                            <div className='flex gap-1'>
                                <input placeholder='Name..' className='rounded-md p-1 w-full' />
                            </div>
                            <div className='flex gap-1'>
                                <textarea placeholder='Description..' rows={4} className='w-full rounded-md p-1' />
                            </div>
                            <div className='flex gap-1'>
                                <input placeholder='Price in ₹' type='number' className='w-full rounded-md p-1' />
                            </div>
                            <div className='flex gap-1'>
                                <input placeholder='Shoe Size' type='number' className='w-full rounded-md p-1' />
                            </div>
                            <div className='flex gap-1'>
                                <input placeholder='Shoe Color' type='text' className='w-full rounded-md p-1' />
                            </div>
                            <div className='flex gap-1'>
                                <input type='text' placeholder='Shoe Brand' className='w-full rounded-md p-1' />
                            </div>
                        </div>
                        <div className='md:w-[50%] flex gap-2 flex-col'>
                            <div className='flex flex-col w-full'>
                                <label className='text-white font-bold'>Auction End Data</label>
                                <input type='date' className='w-full rounded-md p-1' />
                            </div>
                            <div className='flex flex-col w-full'> 
                                <p className='text-white font-bold'>Shoe Images :<span className='font-thin text-sm'>first IMAGE will be the Cover (max 4)</span></p>
                                <div className='flex border rounded gap-2'>
                            <input onChange={(e)=>setFile(e.target.files)} className='p-1 rounded w-full' type='file' id='images' accept='image/*' multiple />
                            <button type='button' onClick={submitImage} className='p-1 text-green-600 bg-white border border-green-600 rounded hover:shadow-lg hover:text-blue-700 font-bold'>Upload</button>
                           </div>
                           <div className='grid grid-cols-2 gap-4 my-1'>
                           {
                            formData.imageUrls.length>0 && formData.imageUrls.map((url)=>(
                                <div key={url} className='flex  border rounded relative'>
                                <img src={url} alt='shoes.png' className='w-20 h-20 object-cover rounded-md'/>
                                <button className='absolute top-0 right-0 p-1 bg-red-500 border border-white text-white rounded-bl'>Delete</button>
                            </div>
                            ))
                           }
                           </div>
                            </div>
                            <button type='submit' className='w-full border p-2 rounded text-green-700 font-bold bg-white border-green-700'>List Shoe</button>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListShoes