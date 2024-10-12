import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import FormikContainerLevel from "../components/FormikContainerLevel";

function PatientsDetail () {
    let navigate = useNavigate(); 
    let { id } = useParams();
    const [patientObject, setPatientObject] = useState({});
    const [levels, setlevels] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/patientsinfo/byId/${id}`).then((response) => {
            setPatientObject(response.data);
            console.log(response.data);
    }); 
        axios.get(`http://localhost:3001/levels/${id}`).then((response) => {
            setlevels(response.data);
            console.log(response.data);
    }); 
}, []);

    const deletePatient = (id) => {
        axios.delete(`http://localhost:3001/patientsinfo/${id}`)
        .then(() => {
            console.log(`Deleted post with ID ${patientObject.id}`);
            navigate(`/searchPatients/`)
        })
    }

    const deleteLevel = (id) => {
        axios.delete(`http://localhost:3001/levels/${id}`)
        .then(()=>{
            console.log(`Deleted post with ID ${patientObject.id}`);
        })
    }
    return(
        <section className="flex flex-col h-dvh">
            <div className="pt-10 pb-10">
                 <div className="uppercase font-bold place-content-evenly ">
                    {patientObject.id} | {patientObject.firstName} {patientObject.lastName}
                </div>
                <div className=" uppercase">
                    <p>
                        Sex:{patientObject.sex}
                    </p>  
                    <p>
                        Location: {patientObject.location}
                    </p>
                    <p>
                        Phone #: {patientObject.phoneNumber}
                    </p>
                    <p>
                        Date of Entry: {patientObject.date}
                    </p>
                </div>
            </div>
            <div className="flex flex-row overflow-auto border-2 border-slate-600 rounded-lg w-4/5 mb-10">   
                <div className="m-5">
                <FormikContainerLevel/>
                </div>
                <div className="flex flex-row m-5 flex-wrap overflow-auto">
                    {levels.map((level, key) => {
                        return(
                        <div className="flex pl-10 pb-10  ">
                            <div className=" h-1/2">
                                <p className="" key={key}>{level.id}</p>
                                {/* <p>{level.createdAt}</p> */}
                                <div className="">    
                                    <p>
                                        {level.bloodSugarLevel} | Blood Sugar Level
                                    </p>
                                    <p>
                                        {level.hba1c} | Hba1c
                                    </p>
                                    <p>
                                        {level.weight} | Weight
                                    </p>
                                    <p>
                                        {level.cholesterol} | Cholesterol Level
                                    </p>
                                    <p>
                                        {level.hemoglobin} | Hemoglobin Level
                                    </p>
                                    <p>
                                        {level.systolicBloodPressure} / {level.diastolicBloodPressure} | Blood Pressure
                                    </p>
                                    <button 
                                    className="hover:text-red-600"
                                    onClick={() => deleteLevel(level.id)}>
                                        x
                                    </button>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default PatientsDetail