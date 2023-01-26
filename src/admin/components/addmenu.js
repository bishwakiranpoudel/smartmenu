import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Sidebar from '../Sidebar';
import { collection, query, onSnapshot, doc, setDoc, addDoc, getDoc, getDocs, deleteDoc, updateDoc, where, FieldValue, Firestore, arrayUnion } from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from '../../firebase'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Snackbar, Alert, Stack, Modal } from '@mui/material';


//Algorithm:
// category halne agadi add user ma auta N/A halera initialize gareko cha aba chiyeko update
// product halne -> name, image, price, category (select garne mathi ko category bata) -> Reason sab ko aafno category haru huna milo 
//product sab hali sake pachi auto view menu page ko qr generate garne yaha batai downloadable 
//scalability user haru ko user emai pw dine user create garda tyo uid halne ani tei anusar sab display 

//map ma problem line no 100



function Addmenu() {
    const {id} = useParams(); //user ko id 
    const [message, setmessage] = useState([]);
    const [original, setOriginal] = useState([]);
    const [addedIt, setAddedIt] = useState(false);

    const getCategory = () => {

        try {
             const ref = query(doc(db, 'user', id));
             onSnapshot(ref, (doc) => {
                setmessage(doc.data());
            });
            
            
            
        }
        catch (e) {
            console.log(e)
        }
        
    }

    const getCategoryTwo = () => {

        try {
            
           
           const ref2 = query(doc(db, 'user', id, 'category', message.cid))
           onSnapshot(ref2, (doc) => {
               setOriginal(doc.data())
               
           });
           
       }
       catch (e) {
           console.log(e)
       }
    }

    const AddCategory = () => {
        const [cat, setCat] =React.useState('');
        

        const handleCat = (event) => {
            setCat(event.target.value);
        }
        const disabled = cat === '' ;

        const handleSubmit = async (e) => {
            e.preventDefault();

            console.log(message.cid);
            var cid = message.cid
            try {
                const catref =doc(db, "user", id, "category", cid);
                
                await updateDoc(catref, {
                    category:arrayUnion(cat)

                });
                setAddedIt(true);
            }
            catch (e) {
                console.log(e);
            }
            setTimeout(() => {
                setAddedIt(false);
            }, 3000);
        }
        var array = original.category;
        return (
            <>
                <form onSubmit={handleSubmit} className='mt-5 gap-2 flex flex-col items-center justify-center border dark:border-white-rgba-1 rounded p-5 mb-5'>

                <label className='text-sm font-bold dark:text-white-rgba-7'>Category</label>
                    <input maxLength={50} className='w-2/4 lg:w-1/4 p-2 border border-linkblue dark:border-white-rgba-2 dark:bg-grayer rounded dark:text-white-rgba-6 cont' type='text' value={cat} onChange={handleCat} placeholder="Eg. Lustu" />

                    
                    {addedIt && <Alert variant='outlined' className='text-green-500 text-sm my-3'>user added successfully</Alert>}

                    <div className='flex gap-2'>
                        <Button
                            disabled={disabled}
                            className={`${disabled === true && 'bg-opacity-40 dark:bg-white-rgba-1 dark:text-white-rgba-2'} p-2 border rounded bg-linkblue hover:bg-linkbluer text-white uppercase w-1/8 dark:bg-white-rgba-3 dark:hover:bg-white-rgba-2`}
                            type='submit'
                        >
                            ADD
                        </Button>
                    </div>
                </form>
                {array?.map((cato) => (
                    <div>{cato}</div>
                ))}
      
            </>
        )
    }

    const AddProduct = () => {
        const [pro, setPro] =React.useState('');//name
        const [pri, setPri] =React.useState('');//price

        const handlePro = (event) => {
            setPro(event.target.value);
        }
        const handlePri = (event) => {
            setPri(event.target.value);
        }
        const disabled = pro === '' || pri === ''  ;

        const handleSubmit = async (e) => {
            e.preventDefault();

            
            try {
                await addDoc(collection(db, "user", id, "product"), { // user banako 
                    name: pro,
                    price: pri,

                });
            }
            catch (e) {
                console.log(e);
            }
            setTimeout(() => {
                setPro('');
                setPri('');
                setAddedIt(false);
            }, 3000);
        }

        return (
            <>
                <form onSubmit={handleSubmit} className='mt-5 gap-2 flex flex-col items-center justify-center border dark:border-white-rgba-1 rounded p-5 mb-5'>

                <label className='text-sm font-bold dark:text-white-rgba-7'>Product Name</label>
                    <input maxLength={50} className='w-2/4 lg:w-1/4 p-2 border border-linkblue dark:border-white-rgba-2 dark:bg-grayer rounded dark:text-white-rgba-6 cont' type='text' value={pro} onChange={handlePro} placeholder="Eg. Lustu" />

                    <label className='text-sm font-bold dark:text-white-rgba-7'>Price</label>
                    <input maxLength={50} className='w-2/4 lg:w-1/4 p-2 border border-linkblue dark:border-white-rgba-2 dark:bg-grayer rounded dark:text-white-rgba-6 cont' type='text' value={pri} onChange={handlePri} placeholder="Eg. Lustu" />

                    
                    {addedIt && <Alert variant='outlined' className='text-green-500 text-sm my-3'>user added successfully</Alert>}

                    <div className='flex gap-2'>
                        <Button
                            disabled={disabled}
                            className={`${disabled === true && 'bg-opacity-40 dark:bg-white-rgba-1 dark:text-white-rgba-2'} p-2 border rounded bg-linkblue hover:bg-linkbluer text-white uppercase w-1/8 dark:bg-white-rgba-3 dark:hover:bg-white-rgba-2`}
                            type='submit'
                        >
                            ADD
                        </Button>
                    </div>
                </form>
            </>
        )
    }



    useEffect(() => {
        getCategory();
        getCategoryTwo();
            },[message,original])
            
    return (
        <Sidebar>
            <AddCategory />
            <AddProduct/>

        </Sidebar>
    )
    

}








// function Addmenu() {
//     const { id } = useParams();
//     const [cat, setCat] = React.useState('');
    // const [message, setmessage] = useState([]);
    // const [original, setOriginal] = useState([]);

    // const getCategory = () => {

    //     try {
    //         const ref = query(doc(db, 'user', id));
    //         onSnapshot(ref, (doc) => {
    //             setmessage(doc.data());
    //         });
    //         const ref2 = query(doc(db, 'user', id, 'category', message.cid));
    //         onSnapshot(ref2, (doc) => {
    //             setOriginal(doc.data())
    //             console.log(original)
    //         });
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }

    // const AddCategory = () => {
    //     const [addedIt, setAddedIt] = React.useState(false);
    //     const handleCat = (event) => {
    //         setCat(event.target.value);
    //     };

    //     const disabled = cat === '';

        // const handleSubmit = async (e) => {
        //     console.log(message.cid);


        //     try {
        //         await updateDoc(doc(db, "user", id, "category", message.cid), {
        //             category: FieldValue.arrayUnion('add')

        //         },);
        //         setAddedIt(true);
        //     }

        //     catch (e) {
        //         console.log(e);
        //     }



        //     setTimeout(() => {
        //         setAddedIt(false);
        //     }, 3000);
        // }





    //     return (
    //         <>
    //             <form onSubmit={handleSubmit} className='mt-5 gap-2 flex flex-col items-center justify-center border dark:border-white-rgba-1 rounded p-5 mb-5'>

    //             <label className='text-sm font-bold dark:text-white-rgba-7'>Category</label>
    //                 <input maxLength={50} className='w-2/4 lg:w-1/4 p-2 border border-linkblue dark:border-white-rgba-2 dark:bg-grayer rounded dark:text-white-rgba-6 cont' type='text' value={cat} onChange={handleCat} placeholder="Eg. Lustu" />


    //                 {addedIt && <Alert variant='outlined' className='text-green-500 text-sm my-3'>user added successfully</Alert>}

    //                 <div className='flex gap-2'>
    //                     <Button

    //                         className={`${'bg-opacity-40 dark:bg-white-rgba-1 dark:text-white-rgba-2'} p-2 border rounded bg-linkblue hover:bg-linkbluer text-white uppercase w-1/8 dark:bg-white-rgba-3 dark:hover:bg-white-rgba-2`}
    //                         type='submit'
    //                     >
    //                         Add
    //                     </Button>


    //                 </div>
    //             </form>
    //         </>
    //     )
    // }

//     useEffect(() => {
//         getCategory();
//     }, [])

    // return (
    //     <div><Sidebar>
    //         <AddCategory />
            

    //     </Sidebar></div>
    // )
// }





export default Addmenu