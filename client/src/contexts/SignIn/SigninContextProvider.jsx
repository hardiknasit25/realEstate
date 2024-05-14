import React, { useState } from "react"
import SigninContext from "./SigninContext"

function SigninContextProvider({ children }) {

  const [user, setUser] = useState(null)
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  const [pdata, setPdata] = useState('');
  const [data, setdata] = useState();
  const [click, setClick] = useState(true);

  const [Address, setAddress] = useState('');
  const [City, setCity] = useState('');
  const [Counntry, setCounntry] = useState('');
  const [Description, setDescription] = useState('');
  const [Title, setTitle] = useState('');
  const [Price, setPrice] = useState(null);
  const [Bedrooms, setBedrooms] = useState(null);
  const [Parkings, setParkings] = useState(null);
  const [Bathrooms, setBathrooms] = useState(null);
  const [Images, setImages] = useState(null)
  const [file, setFile] = useState("");

  const handleSubmit = async () => {
    setOpen(false);

    const title = Title;
    const description = Description;
    const price = Price;
    const country = Counntry;
    const city = City;
    const address = Address;
    const favorite = click;
    const facilities = {
      bedrooms: Bedrooms,
      parkings: Parkings,
      bathrooms: Bathrooms
    };

    const formdata = new FormData();
    formdata.append('file', file);
    const addData = { title, description, price, address, city, country, facilities, favorite };

    const response = await fetch("http://localhost:4000/add", {
      method: "post",
      body: JSON.stringify({ addData, formdata }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
    }

    if (response.ok) {
      console.log(result);
    }
  }

  return (
    <SigninContext.Provider value={{ user, setUser, active, setActive, open, setOpen, pdata, setPdata, handleSubmit, Address, setAddress, City, setCity, Counntry, setCounntry, Description, setDescription, Title, setTitle, Price, setPrice, Bedrooms, setBedrooms, Parkings, setParkings, Bathrooms, setBathrooms, Images, setImages, file, setFile, data, setdata, click, setClick }}>
      {children}
    </SigninContext.Provider>
  )
}

export default SigninContextProvider