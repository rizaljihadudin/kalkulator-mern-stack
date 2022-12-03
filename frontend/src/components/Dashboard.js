import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Dashboard = () => {
  
    const  [name, setName ]                     = useState('');
    const  [token, setToken ]                   = useState('');
    const  [expired, setExpired ]               = useState('');
    const  [firstValue, setFirstValue ]         = useState(0);
    const  [secondValue, setSecondValue]        = useState(0);
    const  [numerator, setNumerator]            = useState('+');
    const  [showResult, setShowResult]          = useState(0);
    const  [resultConvert, setResultConvert]    = useState('');
    const navigate                              = useNavigate();
    const numberToText                          = require('number-to-text/converters/id')

    useEffect( () => {
        refreshToken();
    }, [])


    const refreshToken = async() => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpired(decoded.exp);
        } catch (error) {
            if(error.response){
                navigate("/");
            }
        }
    }


    const getValueKalkulator = (e) => {
        e.preventDefault();
        let result;

        switch(numerator){
            case '+':
                result = parseInt(firstValue) + parseInt(secondValue);
                break;
            case '-':
                result = parseInt(firstValue) - parseInt(secondValue);
                break;
            case '*':
                result = parseInt(firstValue) * parseInt(secondValue);
                break;
            case '/':
                result = parseInt(firstValue) / parseInt(secondValue); 
        }

        setShowResult(result);
    }

    const Converter = (e) => {
        let text = numberToText.convertToText(showResult);  
        setResultConvert(text);
    }

  return (
    <div>
        <Navbar/>
        <div className='container mt-5'>
            <h1>Welcome Back : { name }</h1>
            <div className='container'>
                <h4 className="subtitle is-4">Kalkulator</h4>
                <form onSubmit={ getValueKalkulator }>
                    <h1></h1>
                    <div className="field mt-5">
                        <label>Nilai :</label>
                        <input type="number" className='input' placeholder='Masukkan nilai 1' value={ firstValue } onChange={ (e)=>setFirstValue(e.target.value) }/>
                        <input type="number" className='input mt-2' placeholder='Masukkan nilai 2' value={ secondValue } onChange={ (e)=>setSecondValue(e.target.value) }/>
                    </div>
                    <div className="field mt-5 select is-danger">
                        <select className='select' value={ numerator } defaultValue={'+'} onChange={ (e)=>setNumerator(e.target.value) }>
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">*</option>
                            <option value="/">/</option>
                        </select>
                    </div>
                    <div className="field mt-5">
                        <button className='button is-success is-fullwidth'>Lihat hasil</button>
                    </div>
                </form>
                <div className="field mt-5">
                    { showResult &&
                        <h1 className='is-success'>{ showResult }</h1>

                    }
                        <div className="field mt-5">
                            <button className='button is-success is-fullwidth' onClick={ Converter }>Pembilang</button>
                        </div>
                    { resultConvert != '' &&
                        <h1 className='is-success'>{ resultConvert }</h1>

                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
