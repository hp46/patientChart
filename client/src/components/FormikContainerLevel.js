import React from 'react'
import FormikControl from "./FormikControl";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Formik, Form} from "formik"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function FormikContainerLevel() {
let navigate = useNavigate(); 
let { id } = useParams();
const [patientObject, setPatientObject] = useState({});
const [levels, setlevels] = useState([]);

const initialValues = { 
    bloodSugarLevel: 0,
    hba1c:0,
    weight: 0,
    cholesterol: 0,
    hemoglobin: 0,
    systolicBloodPressure: 0,
    diastolicBloodPressure: 0,
    InfoId:parseInt(id)
    
}


const onSubmit = (data) => {
    axios.post("http://localhost:3001/levels", data).then((response) => {
        console.log(response.data)
        console.log(initialValues)
        console.log("it worked")
        navigate(`/patientsinfo/${id}`)
    })
}

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

  return (
    <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
             {
        formik => 
        <Form className="flex flex-col w-5/6">
            <FormikControl control='input' type='bloodSugarLevel' label='Blood Sugar' name="bloodSugarLevel"/>
            <FormikControl control='input' type='hba1c' label='HBA1C' name="hba1c"/>
            <FormikControl control='input' type='weight' label='Weight' name="weight"/>
            <FormikControl control='input' type='cholesterol' label='Cholesterol' name="cholesterol"/>
            <FormikControl control='input' type='hemoglobin' label='Hemoglobin' name="hemoglobin"/>
            <FormikControl control='input' type='systolicBloodPressure' label='Systolic Blood Pressure' name="systolicBloodPressure"/>
            <FormikControl control='input' type='diastolicBloodPressure' label='DisatolicBloodPressure' name="diastolicBloodPressure"/>
            <button type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl hover:border-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-5 float-left"
            >
                Add Level
            </button>
        </Form>
        }
     </Formik>
  )
}

export default FormikContainerLevel