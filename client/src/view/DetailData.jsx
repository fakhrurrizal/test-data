import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery  } from 'react-query';
import { API } from '../config/api'

function DetailData() {

    const { id } = useParams()

    let { data: product } = useQuery("productsCache", async () => {
        const response = await API.get("/motor/" + id)
    
        return response.data.data
    })

  return (
    <div className="w-4/5 m-auto">
        <div className='lg:flex mt-20 lg:justify-between'>
            <h2 className="font-bold font-avanir lg:text-2xl sm:text-xl sm:mb-2">Detail Data Kendaraan</h2>
            <div>
                <Link to="/add-data">
                    <span className='bg-sky-300 lg:mx-5 rounded-md lg:p-2 lg:mt-2  font-bold font-avanir hover:bg-sky-400 lg:text-md align-end sm:text-sm '
                    >Tambah Data</span>
                </Link>
                <Link to="/">
                    <span className='bg-sky-300 rounded-md p-2 mt-2 font-bold hover:bg-sky-400  font-avanir lg:text-md sm:text-sm'
                    >Kembali</span>
                </Link>
            </div>
        </div>
        <div className=' border border-orange-400 rounded-sm p-8 mt-10 mb-10'>
            <div className="lg:flex">
                <div className='lg:w-[30%]'>
                    <span className='font-bold font-avanir'>No. Registrasi Kendaraan : </span>
                    <div className="relative mt-1 rounded-xl sm:mb-4">
                        <span className='font-avanir sm:text-sm'>{product?.id_register}</span>
                    </div>
                </div>
                <div >
                    <span className='font-bold font-avanir sm:mt-5'>Tahun Pembuatan : </span>
                    <div className="relative mt-1 rounded-xl ">
                        <span className='font-avanir sm:text-sm'>{product?.production_year}</span>
                    </div>
                </div>
            </div>

            <div className="lg:flex lg:mt-8 sm:mt-4">
                <div className='lg:w-[30%]'>
                    <span className='font-bold font-avanir'>Nama Pemilik : </span>
                    <div className="relative  mt-1 rounded-xl sm:mb-4">
                        <span className='font-avanir sm:text-sm'>{product?.name}</span>
                    </div>
                </div>
                <div >
                 <span className='font-bold font-avanir'>Kapasitas Silinder :</span>
                    <div className="relative mt-1 rounded-xl ">
                        <span className='font-avanir sm:text-sm'>{product?.cylinder_capacity} CC</span>
                    </div>
                </div>
            </div>
          

            <div className="lg:flex lg:mt-8 sm:mt-3">
                <div className='lg:w-[30%]'>
                    <span className='font-bold font-avanir'>Merk Kendaraan :</span>
                    <div className="relative mt-1 rounded-xl sm:mb-3 ">
                        <span className='font-avanir sm:text-sm'>{product?.brand}</span>
                    </div>
                </div>
                <div >
                    <span className='font-bold font-avanir'>Warna Kendaraan :</span>
                    <div className="relative mt-1 rounded-xl ">
                        <span className='font-avanir sm:text-sm'>{product?.color}</span>
                    </div>
                </div>
            </div>

            <div className="lg:flex lg:mt-8 sm:mt-3">
                <div className='lg:w-[30%]'>
                    <span className='font-bold font-avanir'>Alamat Pemilik Kendaraan :</span>
                    <div className="relative mt-1 rounded-xl sm:mb-3 ">
                        <span className='font-avanir sm:text-sm'>{product?.address}</span>
                    </div>
                </div>
                <div >
                    <span className='font-bold font-avanir'>Bahan Bakar :</span>
                    <div className="relative mt-1 rounded-xl ">
                        <span className='font-avanir sm:text-sm'>{product?.fuel}</span>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
  )
}

export default DetailData