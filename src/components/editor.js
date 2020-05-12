import React, {useState} from "react";
import moment, { months } from 'moment'
import 'moment/locale/es' 

import "./editor.scss";
import { db } from "../index";
import { CSVToArray } from "./csvToArray";
import Tabla from "./tabla";

const Edit = () => {

  let d = new Date();
  let mes = d.getMonth();
  let year = d.getFullYear();
  const [miPeriodo, setMiPeriodo] = useState(moment(mes, 'DD/MM/YYYY').format('MMMM') + " " + year);
  const [filtro, setFiltro] = useState('');

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
          db.collection("refas2")
            .add(parentO[i])
            .then(docRef => console.log("Doc written with ID: ", docRef.id))
            .catch(err => console.log("Error addign doc: ", err));
        }
      };
      reader.readAsText(e.target.files[0]);
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
            <button onClick={()=>{mesAdelante()}}  > {'>'} </button>
          </div>
        </div>
        <div>
          <select onFocus={() =>{ read ? setRead(false) : setRead(true)}} onChange={e => (e.target.value === '' ? null : setFiltro(e.target.value))} >
            {
              optionsOnSelect.length>0 ? (
                <>
                  <option value='' >Filtrar Checkpoint</option>
                  {
                    optionsOnSelect &&
                      optionsOnSelect.map((opt, i) => (
                        <option value={opt} key={i}> {opt} </option>
                      )) 
                  }
                </>
              ) :
              <option value='' >Filtrar Checkpoint</option>
            }
          </select> 
          <div className="input">
            <input
              className="inputFile"
              type="file"
              id="file-input"
              onChange={async e => uploadData(e)}
            />
            <label className="file-input__label" htmlFor="file-input">
              <span>Subir CSV</span>
            </label>
          </div>
        </div>
      </div>
      <Tabla periodo={miPeriodo} filtro={filtro} read={read} datosfiltro={data => setOptionsOnSelect(data)} />
    </div>
  );
};

export default Edit;
