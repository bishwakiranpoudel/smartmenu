//user wise menu display garne i.e qr ma lane page 

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Viewmenu() {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [fetched, setFetched] = React.useState();
    const [product, setProduct] = React.useState([]);
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
                setProduct(data);
                
            });
        })
        setLoading(false);
        setFetched(true);
    }
    useEffect(() => {
      
        
        getData();
       
        
    }, [])
    
  return (
    <>
    {product.map((p, index) => {
    return (
        <p key={`${p.name}`}>
            {p.name} - {p.price}
        </p>
    );
})}
    </>
  )
}

export default Viewmenu