import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import Delete from '../components/Delete';
import { API } from '../config/api';

function Monitoring() {
  const [idDelete, setIdDelete] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [register, setRegister] = useState(null)


  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [result, setResult] = useState([]);

  // Menampilkan modal delete 
  const handleDelete = (id, id_register) => {
    setIdDelete(id)
    setRegister(id_register)
    handleShow()
  }

  const [form, setForm] = useState({
    id_register: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const navigate = useNavigate()
  
  const handleSearch = async (e) => {
    e.preventDefault();
    const request = form;
    const respone = await API.post("/filter", request);
    const data = respone.data.data
    setResult({...result, data})
  };
  
    // Fetching data motor
    let { data: motors, refetch } = useQuery("motorCaches",
      async() => {
        const response = await API.get("/motors")
        return response.data.data
      })

    // Mengahapus data berdasarkan ID
    const deleteById = useMutation(async (id) => {
      try {
        await API.delete(`/motor/${id}`)
        refetch()
      } catch (error) {
        console.log(error)
      }
    })

    useEffect(() => {
      if (confirmDelete) {
        handleClose()
        deleteById.mutate(idDelete)
        setConfirmDelete(null)
      }
    }, [confirmDelete])

  
  return (
    <>
    <form className="w-4/5 m-auto ">
      <h2 className="mt-14 font-bold font-avanir mb-8 sm:text-[18px] lg:text-2xl">Data Kendaraan</h2>
      <div className='bg-orange-200 border border-orange-400 rounded-md p-10 sm:p-3 sm:w-68 md:p-8 md:w-90 lg'>
        <div>
          <span className='font-bold font-avanir mt-5 lg:text-[20px] sm:text-[14px]'>No. Registrasi</span>
          <div className="relative lg:mt-1 rounded-md ">
            <input
              type="text"
              className="w-80  shadow-sm font-avanir outline-orange-400 rounded-md  pl-2 py-2 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-[12px] sm:w-56 md:w-80 lg:text-[15px]"  
              name="id_register"
              onChange={handleChange}
              placeholder="ID Register Terdaftar"
            />
          </div>
        </div>
        <div className='lg:mt-10 lg:mb-5 sm:mt-3'>
          <span className='font-bold font-avanir lg:text-[20px] sm:text-[14px]'>Nama Pemilik</span>
          <div className="relative mt-1 rounded-md ">
            <input
              type="text"
              className="w-80  shadow-sm font-avanir outline-orange-400 rounded-md  pl-2 py-2 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-[12px] sm:w-56 md:w-80 lg:text-[15px]"  
              name="name"
              placeholder='Nama Terdaftar'
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className=' float-right flex mt-6'>
          <button onClick={(e)=> handleSearch(e)} className='bg-blue-400 lg:py-2 p-2 lg:mx-4 px-6 text-white font-avanir rounded-md lg:w-36 hover:bg-blue-500 text-center sm:w-20 sm:px-2 sm:py-2 sm:mx-2'
          >Search</button>
        <Link to="/add-data">
          <button className='bg-blue-400 lg:py-2 p-2 lg:mx-0 px-6 text-white font-avanir rounded-md lg:w-36 hover:bg-blue-500 text-center sm:w-20 sm:px-2 sm:py-2 sm:mx-2'>Add</button>
        </Link>
      </div>
    </form>
    
    {/* ------------------------------------------------Table------------------------------------------------ */}
    
    <div className="overflow-auto rounded-lg mb-32 mt-32 w-4/5 m-auto shadow hidden md:block">
      <table className="w-full">
        <thead className="font-avanir bg-blue-400 border-b-2 border-gray-200 text-left">
        <tr>
          <th className="w-10 p-3 text-sm font-semibold tracking-wide ">No</th>
          <th className="w-26 p-3 text-sm font-semibold tracking-wide ">No Registrasi</th>
          <th className="w-28 p-3 text-sm font-semibold tracking-wide ">Nama Pemilik</th>
          <th className="w-40 p-3 text-sm font-semibold tracking-wide ">Merk Kendaraan</th>
          <th className="w-44 p-3 text-sm font-semibold tracking-wide ">Tahun Pembuatan</th>
          <th className="w-26 p-3 text-sm font-semibold tracking-wide ">Kapasitas</th>
          <th className="w-26 p-3 text-sm font-semibold tracking-wide ">Warna</th>
          <th className="w-32 p-3 text-sm font-semibold tracking-wide ">Bahan Bakar</th>
          <th className="w-40 p-3 text-sm font-semibold tracking-wide ">Action</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-left">
         {
         result?.length === 0 ?
         motors?.map((e, index) => (
            <tr className="bg-slate-200 delay-75 font-avanir ">
              <td key={index} className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {index + 1}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.id_register}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.name}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{e.brand}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{e.production_year}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{e.cylinder_capacity} CC</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{e.color}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{e.fuel}</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <button className='mx-1 text-orange-500 font-bold hover:text-orange-800'
                  onClick={() => {navigate(`/detail-motor/${e.id}`)}}
                >Detail</button>
                <button className='mx-1 text-sky-500 font-bold hover:text-sky-800'
                  onClick={() => {navigate(`/update-motor/${e.id}`)}}
                >Edit</button>
                <button className='mx-1 text-red-600 font-bold hover:text-red-800'
                 onClick={() => {
                  handleDelete(e?.id, e?.id_register)
                }}
                >Delete</button>
              </td>
            </tr>
          )
         ):result?.data.map((e, index)=>(
          <tr key={index} class="bg-white">
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.id}
              </td>
              <td class="uppercase p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.id_register}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.name}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.brand}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.production_year}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.cylinder_capacity} CC</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.color}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.fuel}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                <button className='mx-1 text-orange-500 font-bold hover:text-orange-600'
                  onClick={() => {navigate(`/detail-motor/${e.id}`)}}
                >Detail</button>
                <button className='mx-1 text-sky-500 font-bold hover:text-sky-600'
                  onClick={() => {navigate(`/update-motor/${e.id}`)}}
                >Edit</button>
                <button className='mx-1 text-red-600 font-bold hover:text-red-700'
                 onClick={() => {
                  handleDelete(e?.id, e?.id_register)
                }}
                >Delete</button>
              </td>
            </tr>
         ))}
        </tbody>
      </table>
      
      <Delete
       setConfirmDelete={setConfirmDelete}
       show={show}
       handleClose={handleClose}
       data={register} 
      />
      
    </div>
    </>
  )
}

export default Monitoring