import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ProductListing = () => {
const router = useRouter();
const [product, setProduct] = useState<any>();
const [productTwo, setProductTwo] = useState<any>();
useEffect(() => {
    const getProductData = async () => {
        const response = await fetch(
            'https://fakestoreapi.com/products'
          );
          const data = await response.json();
          setProduct(data)
    }
    getProductData();

    const getProductfromDB = async () => {
        const response = await fetch(
            'http://localhost:3200/getProducts'
          );
          const data = await response.json();
          setProductTwo(data)
          console.log('djhuhfs',data);
    }
    getProductfromDB();
}, [])

console.log(productTwo);

const goToDetails = (id: any) => {
    router.push(`/productDetails/${id}`);
}

console.log(product);
  return (
      <div className='productListingContainer'>
          {product && product.map((item: any, k: any) => (
              <div className="card" style={{ width: "18rem", display: "inline-block", margin: "10px" }} key={"k"}>
                  <img src={item.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                      <a href="#" className="btn btn-primary"onClick={() => goToDetails(item.id)} >Product Details</a>
                  </div>
              </div>
          ))}
          {productTwo && productTwo.map((item: any, k: any) => (
              <div className="card" style={{ width: "18rem", display: "inline-block", margin: "10px" }} key={"k"}>
                  <img src={item.product_image} className="card-img-top" alt="..." />
                  <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                      <a href="#" className="btn btn-primary"onClick={() => goToDetails(item._id)} >Product Details</a>
                  </div>
              </div>
          ))}
      </div>
  )
}

export default ProductListing
