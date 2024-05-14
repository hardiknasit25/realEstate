import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  console.log(sidebardata);

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`http://localhost:4000/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [window.location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/properties?${searchQuery}`);
  };

  return (
    <div className='bg-slate-100 rounded-[40px] w-[30%] h-[20rem] p-4 shadow-lg flex flex-col'>
      <div className='w-full'>
        <form onSubmit={handleSubmit} className='w-full flex justify-between items-center py-[0.5rem] border-2 border-slate-400 rounded-full shadow-md'>
          <input type='text' placeholder='Enter an title/city/country' className=' w-full mx-2 text-start outline-none px-2 py-2 font-light bg-transparent' value={sidebardata.searchTerm}
            onChange={handleChange}></input>
          <button className='px-3 py-2 mr-3 rounded-md bg-[#1e63b5] text-sm text-white font-medium hover:scale-110 transition-all ease-in duration-[0.3s]' type='Submit'>Search</button>
        </form>
      </div>
      <div className='mt-2'>
        <h1 className='p-2'>Search By</h1>
      </div>
      <div className='flex gap-2 flex-wrap justify- p-1'>
        <div className='flex h-9 gap-2 justify-center items-center rounded-xl py-1 px-3 bg-white cursor-pointer'>
          <input
            type='checkbox'
            id='rent'
            className='w-5'
            onChange={handleChange}
            checked={sidebardata.type === 'rent'}
          />
          <h1>Rent</h1>
        </div>
        <div className='flex h-9 gap-2 justify-center items-center rounded-xl py-1 px-3 bg-white cursor-pointer'>
          <input
            type='checkbox'
            id='sale'
            className='w-5'
            onChange={handleChange}
            checked={sidebardata.type === 'sale'}
          />
          <h1>Sale</h1>
        </div>

        <div className='flex h-9 gap-2 justify-center items-center rounded-xl py-1 px-3 bg-white cursor-pointer'>
          <input
            type='checkbox'
            id='parking'
            className='w-5'
            onChange={handleChange}
            checked={sidebardata.parking}
          />
          <h1>Parking</h1>
        </div>

        <div className='flex h-9 gap-2 justify-center items-center rounded-xl py-1 px-3 bg-white cursor-pointer'>
          <input
            type='checkbox'
            id='furnished'
            className='w-5'
            onChange={handleChange}
            checked={sidebardata.furnished}
          />
          <h1>Furnishhed</h1>
        </div>

        <div className='flex items-center gap-2'>
          <label className='font-semibold'>Sort:</label>
          <select
            onChange={handleChange}
            defaultValue={'created_at_desc'}
            id='sort_order'
            className='border rounded-lg p-3'
          >
            <option value='regularPrice_desc'>Price high to low</option>
            <option value='regularPrice_asc'>Price low to hight</option>
            <option value='createdAt_desc'>Latest</option>
            <option value='createdAt_asc'>Oldest</option>
          </select>
        </div>

        {/* <div className='flex h-9 gap-2 justify-center items-center rounded-xl py-1 px-3 bg-white cursor-pointer'>
          <h1>Rooms :</h1>
          <div className='flex justify-center items-center gap-1 p-2'>
            <div className='h-7 w-7 cursor-pointer flex justify-center items-center bg-blue-100 text-black rounded-md'>
              <h1 className='text-black'>1</h1>
            </div>
            <div className='h-7 w-7 cursor-pointer flex justify-center items-center bg-blue-100 text-black rounded-md'>
              <h1 className='text-black'>2</h1>
            </div>
            <div className='h-7 w-7 cursor-pointer flex justify-center items-center bg-[#e6d081] text-black rounded-md'>
              <h1 className='text-black'>3</h1>
            </div>
            <div className='h-7 w-7 cursor-pointer flex justify-center items-center bg-[#e4cd79] text-black rounded-md'>
              <h1 className='text-black'>4</h1>
            </div>
            <div className='h-7 w-7 cursor-pointer flex justify-center items-center bg-[#eace6c] text-black rounded-md'>
              <h1 className='text-black'>5</h1>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Search