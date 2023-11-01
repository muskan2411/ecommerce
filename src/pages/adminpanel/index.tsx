import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function AdminPanel() {
  const [descrip, setDescrip] = useState('');
  const [qty, setQty] = useState('');
  const [prImage, setPrImage] = useState({
    myFile: null,
  });
  const [imagePreview, setImagePreview] = useState(null); 
  const[prname,setPrname]=useState('');
  const[image, setImage]=useState<any>('');

  const handleAdd = async () => {
    if (prImage.myFile) {
      const base64Image = await getBase64(prImage.myFile);
      setImage(base64Image); // Set the image state after getting the base64 data
  
      const productData = {
        productName: prname,
        description: descrip,
        quantity: qty,
        productImage: base64Image, // Use base64Image in the request body
      };
  
      console.log('Base64 Image:', typeof base64Image);
      console.log('Product Data:', productData);
  
      const response = await fetch('http://localhost:3200/productadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Product added successfully:', responseData);
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } else {
      // Handle the case where no file is selected
    }
  };
  
  
//uploading file
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setPrImage({ myFile: file });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
//converting image in base64 code
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  console.log();

  return (
    <form>
            <input
        type="file"
        name="myFile"
        accept=".jpeg, .png, .jpg"
        onChange={handleFileUpload}
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      )}
      <input
        type="text"
        placeholder="Product Name"
        className="form-control"
        onChange={(e) => setPrname(e.target.value)}
      />
      <input
        type="text"
        placeholder="   cription"
        className="form-control"
        onChange={(e) => setDescrip(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        className="form-control"
        onChange={(e) => setQty(e.target.value)}
      />
  
      <button type="button" onClick={handleAdd}>
        Add Product
      </button>
    </form>
  );
}
