import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function GetRoute() {
  const router = useRouter();
  const [id, setId] = useState<any>("");
  const [product, setProduct] = useState<any>("");
  const [productTwo, setProductTwo] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const [updatedProductName, setUpdatedProductName] = useState('');
  const [updatedProductQuantity, setUpdatedProductQuantity] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedProductImage, setUpdatedProductImage] = useState('');
  
  var productid = router.query.id;


  const get = () => {
    setLoading(true);
    console.log(productid);
    fetch(`https://fakestoreapi.com/products/${productid}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json); setProduct(json)
        setLoading(false);
      })
      .catch((error) => console.error('Error:', error));


    fetch(`http://localhost:3200/getProduct/${productid}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data); setProductTwo(json.data)
        setLoading(false);
      })
      .catch((error) => console.error('Error:', error));


  };

  useEffect(() => {
    get()
  }, [productid])

  const handleDelete = () => {
    fetch(`http://localhost:3200/deleteProduct/${productid}`, {
      method: 'DELETE',
    })
      .then((res) => {
        router.push('/');
      })
      .catch((error) => console.error('Error:', error));
  };


  const handleUpdate = () => {
    fetch(`http://localhost:3200/updateProduct/${productid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName: updatedProductName,
        quantity: updatedProductQuantity,
        description: updatedDescription,
        productImage: updatedProductImage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Updated product:', data);
        setProduct({ ...product, title: updatedProductName });
        setProduct({ ...product, title: updatedProductQuantity});
        setProduct({ ...product, title: updatedDescription });
        setProduct({ ...product, title: updatedProductImage });
      })
      .catch((error) => console.error('Error:', error));
  };







  return (
    <div>
      {!loading ?
        <>
          <h2>Product Details</h2>
          <div className="card" style={{ width: "18rem", display: "inline-block", margin: "10px" }}>
            <img src={productTwo ?
              productTwo.product_image
              :
              product.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.price}</p>
              <a href="#" className="btn btn-primary" >Product Details</a>
              <button onClick={handleDelete} className="btn btn-danger">Delete Product</button>
              <button onClick={handleUpdate} className="btn btn-primary">Update Product</button>
              <input 
              type="text" 
              placeholder="Product Name"
              value={updatedProductName} 
              onChange={(e) => setUpdatedProductName(e.target.value)} />
              <input
                type="number"
                placeholder="Product Quantity"
                value={updatedProductQuantity}
                onChange={(e) => setUpdatedProductQuantity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Product Description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Product Image"
                value={updatedProductImage}
                onChange={(e) => setUpdatedProductImage(e.target.value)}
              />
            </div>
          </div>
        </>

        : <div className="spinner"></div>}
    </div>
  )
} 