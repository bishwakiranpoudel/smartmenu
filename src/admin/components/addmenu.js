import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Sidebar from '../Sidebar';
import { collection, query, onSnapshot, doc, setDoc, addDoc, getDoc, getDocs, deleteDoc, updateDoc, where, FieldValue, Firestore, arrayUnion } from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from '../../firebase'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Snackbar, Alert, Stack, Modal } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

//Algorithm:
// category halne agadi add user ma auta N/A halera initialize gareko cha aba chiyeko update
// product halne -> name, image, price, category (select garne mathi ko category bata) -> Reason sab ko aafno category haru huna milo 
//product sab hali sake pachi auto view menu page ko qr generate garne yaha batai downloadable 
//scalability user haru ko user emai pw dine user create garda tyo uid halne ani tei anusar sab display 

//original i.e category aakai chaian line no 38



function Addmenu() {
    const { id } = useParams(); //user ko id 
    const [message, setmessage] = useState([]);
    const [original, setOriginal] = useState([]);
    const [addedIt, setAddedIt] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [fetched, setFetched] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [row, setRow] = React.useState([]);
    const [openSelDelete, setOpenSelDelete] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);
    const [updated, setUpdated] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [done,setDone] = React.useState(false);
    var array;


    const getCategoryTwo = async() => {
        try {
            const ref2 = await getDoc(doc(db, 'user', id, 'category', message.cid))
            
                setOriginal(ref2.data())
                console.log(original)
           
        }
        catch (e) {
            console.log(e)
        }
        array = original.category;
        setDone(true);
        setTimeout(()=>setDone(false),300);
    }

    const getCategory = async () => {
        try {
            const ref = await getDoc(doc(db, 'user', id));
        
                setmessage(ref.data());
                console.log(message)
           
        }
        catch (e) {
            console.log(e)
        }
        setDone(true);
        setTimeout(()=>setDone(false),300);
        getCategoryTwo();

    }

   

    const AddCategory = () => {
        const [cat, setCat] = React.useState('');

        const handleCat = (event) => {
            setCat(event.target.value);
        }
        const disabled = cat === '';
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            var cid = message.cid
            try {
                const catref = doc(db, "user", id, "category", cid);

                await updateDoc(catref, {
                    category: arrayUnion(cat)

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
        const [pro, setPro] = React.useState('');//name
        const [pri, setPri] = React.useState('');//price

        const handlePro = (event) => {
            setPro(event.target.value);
        }
        const handlePri = (event) => {
            setPri(event.target.value);
        }
        const disabled = pro === '' || pri === '';

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

    const GetProduct = () => {
        const handleClose = () => {
            setOpenDelete(false);
            setOpenSelDelete(false);
        }

        const editContact = async (e) => {
            const field = e.field;
            const value = e.value;
            try {
                await setDoc(doc(db, "user", id, 'product', e.id), {
                    [field]: value,

                },
                    { merge: true }
                );
                setUpdated(true);

            } catch (error) {
                console.log(error);
            }
        }

        function finalDeletion(id) {
            const finalDelete = async (e) => {
                try {
                    const documentRef = e;
                    const contactRef = doc(db, "user", id, 'product', e);
                    await deleteDoc(contactRef);


                    setDeleted(true);

                } catch (e) {
                    console.log(e)
                }
                setTimeout(() => {
                    setDeleted(false);
                }, 3000);
            }
            finalDelete(id);
            setRow([]);
            getData();
        }

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            height: 110,
            p: 2,
        };

        const columns = [
            { field: 'name', headerName: 'Name', width: 299, align: 'left', editable: true, cellClassName: `${openDelete && 'animate-pulse'}`, headerClassName: 'dark:text-white-rgba-6' },
            { field: 'price', headerName: 'Price', type: 'string', width: 200, align: 'left', headerAlign: 'left', editable: true, cellClassName: `${openDelete && 'animate-pulse'}`, sortable: false, headerClassName: 'dark:text-white-rgba-6' },
            {
                field: 'actions', headerName: 'Actions', width: 200, align: 'left', headerAlign: 'left', align: 'left', sortable: false, headerClassName: 'dark:text-white-rgba-6',
                renderCell: (cellValues) => {
                    return (
                        <>
                            {/* <div className="px-3 py-1 text-white bg-slate-700 rounded hover:bg-slate-900 mr-1 cursor-pointer"><Link to={`/admin/addmenu/${cellValues.row.id}`}>Add</Link></div>
                            <div className="px-3 py-1  text-white bg-slate-700 rounded hover:bg-slate-900 m-1 cursor-pointer "><Link to={`/admin/menu/view/${cellValues.row.id}`}>View</Link></div>
                            <div>
                                <div className="px-3 py-1  text-white bg-red-700 rounded hover:bg-red-900 m-1 cursor-pointer" onClick={handleOpn}>Delete</div>
    
                                <Modal
    
                                    open={opn}
                                    onClose={handleClse}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style} className='cont rounded'>
                                        <Typography id="modal-modal-title" className='text-sm text-black dark:text-white-rgba-6 italic text-opacity-80 mb-3'>
                                            Confirm Delete
                                        </Typography>
                                        <div className="flex"><div className="px-2 py-1 w-2/4 rounded text-center text-white bg-red-700  hover:bg-red-900 m-1 cursor-pointer " onClick={() => finalDeletion(cellValues.row.id)}>Delete</div>
                                            <div className="px-2 py-1 w-2/4 rounded text-center text-white bg-slate-700  hover:bg-slate-900 m-1 cursor-pointer" onClick={handleClse}>Close</div></div>
                                    </Box>
                                </Modal>
                            </div> */}
                        </>
                    );
                }
            },
        ]

        return (
            <>
                <div className="text-black text-xl bold">users</div>
                {deleted && <Alert variant='outlined' className='text-green-500 text-sm my-3'>user deleted successfully</Alert>}
                <div className='max-h-[80%] h-full items-left'>
                    <DataGrid
                        autoHeight

                        headerHeight={20}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'id', sort: 'desc' }],
                            },
                        }}

                        rowsPerPageOptions={[20, 50, 100]}
                        rowHeight={35}
                        rows={row}
                        columns={columns}


                        disableSelectionOnClick={true}
                        className={`mb-2 ${openDelete && 'border-red-500 border-1'}`}
                        loading={loading}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        components={{
                            Toolbar: GridToolbar,
                            NoRowsOverlay: () => (
                                <Stack className='text-center' height="100%" alignItems="center" justifyContent="center">

                                    <p className='text-sm text-gray-600 mt-10'>No contacts found. Refresh or add new contact.</p>
                                </Stack>
                            ),

                        }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            }
                        }}
                        onCellEditCommit={(e) => {
                            editContact(e);
                        }}

                        getRowClassName={(e) =>
                            e.indexRelativeToCurrentPage % 2 === 0 ? 'bg-black bg-opacity-[0.025] dark:bg-grayer dark:text-white-rgba-9' : 'bg-white bg-opacity-[0.02]  dark:bg-white dark:bg-opacity-5 dark:text-white-rgba-9'
                        }
                        sx={{
                            boxShadow: 0,
                            border: 0,
                            padding: 0,
                            margin: 0,
                            textDecorationColor: 'black',
                            color: 'black',
                            menuDecorationColor: "black",
                        }}
                    />
                </div>
            </>
        )
    }

    const getData = () => {
        setLoading(true);
        setFetched(false);
        const q = query(collection(db, "user", id, 'product'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            var data = [];
            var elements = {};

            querySnapshot.forEach((doc) => {
                elements = {
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price,
                }
                data.push(elements);
                setRow(data);
            });
        })
        setLoading(false);
        setFetched(true);
    }

    useEffect(() => {
        getCategory();
        
        getData();
       
        
    }, [])

    return (
        <Sidebar>
            <AddCategory />
            <AddProduct />
            <GetProduct />

        </Sidebar>
    )
}


export default Addmenu