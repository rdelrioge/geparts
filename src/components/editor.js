import React, {useState, useRef} from "react";
import moment, { months } from 'moment'
import 'moment/locale/es' 

import "./editor.scss";
import { db } from "../index";
import { CSVToArray } from "./csvToArray";
import Tabla from "./tabla";

import { Dropdown,Button } from 'semantic-ui-react'

const Edit = () => {

  let d = new Date();
  let mes = d.getMonth();
  let year = d.getFullYear();
  let now = moment(mes, 'DD/MM/YYYY').format('MMMM') + " " + year
  const [miPeriodo, setMiPeriodo] = useState(now);
  const [filtro, setFiltro] = useState('');
  const inputCSV = useRef(null);

  const [read, setRead] = useState(false);
  const [optionsOnSelect, setOptionsOnSelect] = useState([]);

  const uploadData = e => {
    e.preventDefault();
    // detectar si es un archivo CSV

    if (
      e.target.files[0].name
        .split(".")
        .pop()
        .toLowerCase() === "csv"
    ) {
      // Leer archivo en CSV y convertirlo en Array
      const reader = new FileReader();
      reader.onload = function() {
        let arr = CSVToArray(reader.result, ",");
        // convertir array de arrays en objeto de objetos
        let parentO = {};
        let childO = {};
        for (let i = 1; i < arr.length - 1; i++) {
          let periodo="";
          for (let j = 0; j < arr[0].length; j++) {
            // si algun dato es undefined, cambiarlo para que no mande error
            if (arr[i][j] === undefined) {
              childO[arr[0][j]] = "";
            } else {
              // guardar periodo
              if(j===3){
                periodo= moment(arr[i][j], "DD/MM/YYYY").format('MMMM') + " " + moment(arr[i][j], "DD/MM/YYYY").year()
              }
              // Si es fecha... cabiarla a timestamp
              if (j === 3 || j === 14 || j === 16 || j === 17) {
                let creationdate = "";
                if(arr[i][j] !==""){
                  creationdate = moment(arr[i][j], "DD/MM/YYYY HH:mm").valueOf();
                }
                childO[arr[0][j]] = creationdate;
              }else{
                childO[arr[0][j]] = arr[i][j];
              }
            }
          }
          parentO[i] = { ...childO, periodo};
          console.log(parentO[i]);
          
          // subir objeto a base de datos con autoID
          // db.collection("refas2")
          //   .add(parentO[i])
          //   .then(docRef => console.log("Doc written with ID: ", docRef.id))
          //   .catch(err => console.log("Error addign doc: ", err));
        }
      };
      reader.readAsText(e.target.files[0]);
      e.target.value="";
    } else {
      alert("Please provide a valid CSV file");
    }
  };

  const mesAtras = () =>{
    let miNewPeriodo = moment(miPeriodo, "MMMM/YYYY").subtract(1,'months').format('MMMM YYYY')
    setMiPeriodo(miNewPeriodo);
  }

  const mesAdelante = () => {
    let miNewPeriodo = moment(miPeriodo, "MMMM/YYYY").add(1,'months').format('MMMM YYYY')
    setMiPeriodo(miNewPeriodo);
  }

  const setOptions = (arr) => {
    let stateOptions = arr.map((state, index) => ({
      key: index,
      text: state,
      value: state,
    }))
    console.log(stateOptions);
    
    setOptionsOnSelect(stateOptions)
  }

  return (
    <div>
      <div className="editorHeader" >
        <div>Ya funciona el select, falta CSS en el, y filtrar la data</div>
        <div className="periodoClass">
          <h2>
            {miPeriodo}
          </h2>
          <div className="buttonsPeriodo">
            <button onClick={()=>{mesAtras()}}  > {'<'} </button>
            <button className="hoyBtn" onClick={()=>{setMiPeriodo(now)}}  > hoy </button>
            <button onClick={()=>{mesAdelante()}}  > {'>'} </button>
          </div>
        </div>
        <div className="actions">
          <Dropdown className="dropdownOpts" placeholder='Filtrar Checkpoint' clearable multiple selection options={optionsOnSelect} />
          {/* <div className="input">
            <input
              className="inputFile"
              type="file"
              id="file-input"
              onChange={async e => uploadData(e)}
            />
            <label className="file-input__label" htmlFor="file-input">
              <span>Subir CSV</span>
            </label>
          </div> */}
           <Button className="buttonCSV" inverted color="blue" onClick={() => inputCSV.current.click()} >
             <input
              className="inputFile"
              type="file"
              ref={inputCSV}
              onChange={async e => uploadData(e)}
            />
            Subir CSV</Button>
        </div>
      </div>
      <Tabla periodo={miPeriodo} filtro={filtro} read={read} datosfiltro={data => setOptions(data)} />
    </div>
  );
};

export default Edit;
