import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import searchimage from "../images/computer-01.png"

export default function SearchPatients() {
    const [listOfPatients, setListofPatients] = useState([]);
    const [search, setSearch] = useState("")
     let navigate = useNavigate(); 

    useEffect(() => {
      axios.get("http://localhost:3001/patientsinfo").then((response) => {
        setListofPatients(response.data);
        console.log("this is List of Patient Result")
        console.log(response.data)
        console.log(listOfPatients)
      })
    }, []);

    return(
      <section className=''>
        <div class="pt-10 pb-10 flex">
          <img className="h-48 w-50" src={searchimage} alt="image" />
          <div>
            <h1 className='uppercase  decoration-4 text-5xl  font-bold pb-2 pt-10font-header pt-10 text-slate-600'>SEARCH PATIENT</h1>
            <p> Search Patient through ID </p>
          </div>
        </div>
        <input className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 mb-10" type="text" placeholder='search here' onChange={(e)=>setSearch(e.target.value)} />
        <table className='block flex-col odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-000 dark:even:bg-gray-300 w-3/4 h-20 rounded-lg place-content-evenly items-center '>
          <thead className='block w-full'>
            <tr className="flex h-20 place-content-evenly items-center border-2 border-gray-300 pl-10  ">
              <th className='w-1/5 flex'>Id</th>
              <th className='w-1/5 flex'>Name</th>
              <th className='w-1/5 flex'>Sex</th>
              <th className='w-1/5 flex'>Location</th>
              <th className='w-1/5 flex'>PhoneNumber</th>
            </tr>
          </thead>
          <div className='block w-screen'>
            {listOfPatients.filter((value)=>{
              if(search===""){
                return value
              }
              else if(value.firstName.toLowerCase().includes(search.toLowerCase())){
                return value
              }
            })
            
            .map((value, key) => {
            return(
                <tr onClick={() => navigate(`/patientsinfo/${value.id}`)}
                  className='flex dark:odd:bg-neutral-000 dark:even:bg-gray-300 w-3/4 h-20  place-content-evenly items-center border-2 border-gray-300 pl-10 '
                >
                  <td className='w-1/5 'key={key}>{value.id}</td>
                  <td className='w-1/5 '>{value.firstName} {value.lastName}</td>
                  <td className='w-1/5 '>{value.sex}</td>
                  <td className='w-1/5 '>{value.location}</td>
                  <td className='w-1/5 '>{value.phoneNumber}</td>
                </tr>
            )
            })}
          </div>
        </table>
      </section>
     
    )
}