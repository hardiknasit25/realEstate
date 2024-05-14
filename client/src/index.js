import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Signin from './components/Login/Signin';
import Properties from './components/Properties/Properties';
import AddProperty from './components/AddProperty/AddProperty';
import Residency from './components/Residency/Residency';
import Favorite from './components/Favorite/Favorite';
import { persistor, store } from './app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import Profile from './components/Profile/Profile';
import Contact from './components/About/About';
import UpdateProperty from './components/UpdateProperty/UpdateProperty';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/properties' element={<Properties />} />
      <Route path='/addproperty' element={<AddProperty />} />
      <Route path='/update-property/:Id' element={<UpdateProperty />} />
      <Route path="/residency/:Id" element={<Residency />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/aboutus' element={<Contact />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loadidng={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
