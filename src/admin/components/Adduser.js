import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'
import { collection, query, onSnapshot, doc, setDoc, addDoc, getDoc, getDocs, deleteDoc, updateDoc, FieldValue, arrayUnion } from 'firebase/firestore';
import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Alert, Stack, Modal } from '@mui/material';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';



function Adduser() {
    const [error, setError] = React.useState(null);
    const [opn, setOpn] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [addedIt, setAddedIt] = useState(false);
    const [deleted, setDeleted] = React.useState(false);
    const [updated, setUpdated] = React.useState(false);
    const [fetched, setFetched] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [row, setRow] = React.useState([]);

    const [openSelDelete, setOpenSelDelete] = React.useState(false);

    const handleOpn = () => setOpn(true);
    const handleClse = () => setOpn(false);

    // END SELECTION HANDLING

    const [showEdit, setShowEdit] = React.useState(false);
    // ADD CONTACT VARIABLES

    const [openDelete, setOpenDelete] = React.useState(false);


    const handleClose = () => {
        setOpenDelete(false);
        setOpenSelDelete(false);
    }

    function Addnew() {

        var id; //user ko id
        var cid; //category ko id
        const [count, setCount] = React.useState(0);
        const [name, setName] = React.useState('');
        const [contact, setContact] = React.useState('');
        const [address, setAddress] = React.useState('');
        const retrive = async () => {
            const q = query(collection(db, "user"));
            const c = await getDocs(q);
            setCount(c.docs.length + 1);

        }
        useEffect(() => {
            retrive();
        }, [])


        const handleName = (event) => {
            setName(event.target.value);
            setAddedIt(false);
        }

        const handleContact = (event) => {
            setContact(event.target.value);
        }
        const handleAddress = (event) => {
            setAddress(event.target.value);
        }
        const disabled = name === '' || contact === '';

        const validatePhone = (phone) => {
            var re = /^\d{10}$/;
            return re.test(phone);
        }

        const handleUpload = async (e) => {
            e.preventDefault();
            setError('');

            const phoneOkay = validatePhone(contact);


            // check if the number is already in the database



            if (phoneOkay === false) {
                setError('Please enter a valid phone number.');
            } else {
                setError('');

                await addDoc(collection(db, "user"), { // user banako 
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    contact: contact,
                    address: address,
                    count: count,
                    dateadded: new Date().toLocaleString(),

                }).then(function (docRef) {
                    id = docRef.id; // user ko id nikaleko 
                });


                await addDoc(collection(db, "user", id, "category"), {
                    category: ["N/A"]  //tyo user ma auta category bhanne subdoc banako ra tes bhitra category bhanne array haleko 
                                        // reason aba arko ma update matra garnu paros
                }).then(function (docRef) {
                    cid = docRef.id;
                });

                await setDoc(doc(db, "user", id), {
                    cid: cid, //agi ko user ma cid bhanne para meter banara tesko category ko id haleko 

                },
                    { merge: true }
                );
               


                setAddedIt(true);
                setName('');
                setContact('');
                setAddress('');
                setTimeout(() => {
                    setAddedIt(false);
                }, 3000);
                setOpen(false);
                setName('');
                setContact('');
            }
        }
        const handleClose = () => {
            setOpen(false);
            setName('');
            setContact('');
        };

        return (

            <>
                <form onSubmit={handleUpload} className='mt-5 gap-2 flex flex-col items-center justify-center border dark:border-white-rgba-1 rounded p-5 mb-5'>

                    <label className='text-sm font-bold dark:text-white-rgba-7'>Name</label>
                    <input maxLength={50} className='w-2/4 lg:w-1/4 p-2 border border-linkblue dark:border-white-rgba-2 dark:bg-grayer rounded dark:text-white-rgba-6 cont' type='text' value={name} onChange={handleName} placeholder="Eg. Lustu" />

                    <label className='text-sm font-bold dark:text-white-rgba-7'>Contact</label>
                    <input maxLength={10} className='w-2/4 p-2 lg:w-1/4  border border-linkblue rounded dark:border-white-rgba-2 dark:bg-grayer dark:text-white-rgba-6 cont' type='text' value={contact} onChange={handleContact} placeholder="Eg. 9696969696" />

                    <label className='text-sm font-bold dark:text-white-rgba-7'>Address</label>
                    <input className='dark:text-white-rgba-6 w-2/4 lg:w-1/4   p-2 border border-linkblue rounded dark:border-white-rgba-2 dark:bg-grayer cont' type='text' value={address} onChange={handleAddress} placeholder="Eg. damak,jhapa" />

                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    {addedIt && <Alert variant='outlined' className='text-green-500 text-sm my-3'>user added successfully</Alert>}

                    <div className='flex gap-2'>
                        <Button
                            disabled={disabled}
                            className={`${disabled === true && 'bg-opacity-40 dark:bg-white-rgba-1 dark:text-white-rgba-2'} p-2 border rounded bg-linkblue hover:bg-linkbluer text-white uppercase w-1/8 dark:bg-white-rgba-3 dark:hover:bg-white-rgba-2`}
                            type='submit'
                        >
                            Add
                        </Button>

                        <Button className='p-2 border rounded bg-linkred hover:bg-linkredder text-white uppercase w-1/8' onClick={handleClose}>Cancel</Button>
                    </div>
                </form>
            </>
        )
    }
    const getData = async () => {
        setLoading(true);
        setFetched(false);
        const q = query(collection(db, "user"));
        // const querySnapshot = await getDocs(q);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            var data = [];
            var elements = {};

            querySnapshot.forEach((doc) => {
                elements = {
                    id: doc.id,
                    name: doc.data().name,
                    contact: doc.data().contact,
                    address: doc.data().address,

                }
                data.push(elements);
                setRow(data);
            });
        })
        setLoading(false);
        setFetched(true);
    }
    const editContact = async (e) => {
        const field = e.field;
        const value = e.value;
        try {
            await setDoc(doc(db, "user", e.id), {
                [field]: value,

            },
                { merge: true }
            );
            setUpdated(true);

        } catch (error) {
            console.log(error);
        }
    }
    const updateData = async () => {
        setLoading(true);
        setFetched(false);
        const q = query(collection(db, "user"));
        const querySnapshot = await getDocs(q);
        var data = [];
        var elements = {};
        querySnapshot.forEach((doc) => {
            elements = {
                id: doc.id,
                name: doc.data().name,
                contact: doc.data().contact,
                address: doc.data().address,

            }
            data.push(elements);
            setRow(data);
        });
        setLoading(false);
        setFetched(true);
    }
    function finalDeletion(id) {
        const finalDelete = async (e) => {
            try {
                const documentRef = e;
                const contactRef = doc(db, "user", documentRef);
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
        handleClse();



    }





    useEffect(() => {
        getData();
    }, [])

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
        { field: 'contact', headerName: 'Contact', type: 'string', width: 200, align: 'left', headerAlign: 'left', editable: true, cellClassName: `${openDelete && 'animate-pulse'}`, sortable: false, headerClassName: 'dark:text-white-rgba-6' },
        { field: 'address', headerName: 'Address', type: 'string', width: 200, align: 'left', headerAlign: 'left', editable: true, cellClassName: `${openDelete && 'animate-pulse'}`, sortable: false, headerClassName: 'dark:text-white-rgba-6' },
        {
            field: 'actions', headerName: 'Actions', width: 200, align: 'left', headerAlign: 'left', align: 'left', sortable: false, headerClassName: 'dark:text-white-rgba-6',
            renderCell: (cellValues) => {
                return (
                    <>
                        <div className="px-3 py-1 text-white bg-slate-700 rounded hover:bg-slate-900 mr-1 cursor-pointer"><Link to={`/admin/addmenu/${cellValues.row.id}`}>Add</Link></div>
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
                        </div>
                    </>
                );
            }
        },

    ]
    return (
        <>

            <Sidebar>
                <div className="text-black text-xl bold">users</div>
                <p className='text-sm text-black dark:text-white-rgba-6 italic text-opacity-40 mb-3'>
                    Double click on a contact to edit it.
                </p>
                <div

                    onClick={() => setOpen(true)}
                    className='bg-slate-700 text-white  hover:bg-slate-900  mt-30 rounded-sm w-fit px-2 py-1 cursor-pointer text-sm '
                >

                    NEW user
                </div>
                {open === true ? <Addnew /> : <>
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
                </>}
            </Sidebar>

        </>
    )
}

export default Adduser