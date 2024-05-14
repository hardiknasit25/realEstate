// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   country: "",
//   city: "",
//   address: "",
//   imageUrls: [],
//   title: "",
//   description: "",
//   type: "sale",
//   furnished: false,
//   price: 0,
//   bedrooms: 0,
//   parkings: 0,
//   bathrooms: 0,
//   userRef: ""
// }

// const residencySlice = createSlice({
//   name: 'residency',
//   initialState,
//   reducers: {

//     propertie: (state, action) => {
//       state.country = action.payload.country;
//       state.city = action.payload.city;
//       state.address = action.address;
//       state.imageUrls = action.imageUrls;
//       state.title = action.payload.title;
//       state.description = action.payload.description;
//       state.type = action.payload.type;
//       state.furnished = action.payload.furnished;
//       state.price = action.payload.price;
//       state.bedrooms = action.payload.bedrooms;
//       state.parkings = action.payload.parkings;
//       state.bathrooms = action.payload.bathrooms;
//       state.userRef = action.payload.userRef
//     }
//   }
// })

// export const { propertie } = residencySlice.actions;

// export default residencySlice.reducer;

// residencySlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProperty: null,
};

const residencySlice = createSlice({
  name: 'residency',
  initialState,
  reducers: {
    setProperty(state, action) {
      state.selectedProperty = action.payload;
    },
    clearProperty(state) {
      state.selectedProperty = null;
    },
  },
});

export const { setProperty, clearProperty } = residencySlice.actions;

export default residencySlice.reducer;
