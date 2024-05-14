import { useEffect, useState } from "react";
import PropertyContext from "./PropertyContext"

function PropertyProvider ({childen} ) {

  const [data, setdata] = useState()

  async function getData() {
    const responce = await fetch("http://localhost:4000/add");
    const result = await responce.json();

    if (!responce.ok) {
      console.log(result.error);
    }

    if (responce.ok) {
      console.log("result is ", result);
      setdata(result);
    }
  }

  useEffect(() => {
    getData();
  }, [])
  console.log(data);

  return (
    <PropertyContext.Provider value={{ data }}>
      {childen}
    </PropertyContext.Provider>
  )
}

export default PropertyProvider