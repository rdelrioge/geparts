import React, { useState, useEffect } from "react";
import moment from "moment";

import "./tabla.scss";
import { db } from "../index";

const Tabla = (props) => {
  const [refacciones, setRefacciones] = useState([]);
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
  const [open, setOpen] = useState(false);

  // READ FOR refacciones IN DB at begining
  useEffect(()=>{
    db.collection("refas2").orderBy("Creation_date", "desc").onSnapshot(data => {
      console.log('read BD');
      let misRefacciones = [];
      data.forEach(refa => {
        let serv = { ...refa.data(), uid: refa.id };
        misRefacciones.push(serv);
      });
      setRefacciones(misRefacciones);
      let delmes = filterByProperty(
        [...misRefacciones],
        "periodo",
        props.periodo
        );
        setData(delmes);
      });
  },[])
  // Filtrar por periodo
  useEffect(() => {
      let delmes = filterByProperty(
        [...refacciones],
        "periodo",
        props.periodo
      );
      setData(delmes);
      // reset select filtrado
      props.datosfiltro([]);
  }, [props.periodo]);

  // Leer las opciones a poner en el Select
  useEffect(() =>{
    let newArrfull=[];
    for(let i=0; i<data.length; i++){
      newArrfull.push(data[i]["Último Checkpoint"])
    }
    // eliminar duplicados
    let newArr = [...new Set(newArrfull)];
    // enviar las opciones al Select en ParentComponent
    props.datosfiltro(newArr)
  },[data])

  // 
  useEffect(()=>{
    console.log(props.filtro);
  },[props.filtro])

  const filterByProperty = (array, prop, value) => {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (obj[prop].indexOf(value) >= 0) {
        filtered.push(obj);
      }
    }
    return filtered;
  };

  const toogle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  return (
    <div>
      {data.length > 0 ? (
        <>
        <ul className="tablaHeader">
          <li>LINE ID</li>
          <li>Order Number</li>
          <li>Return Reference</li>
          <li>Creation_date</li>
          <li>Carrier</li>
          <li>Waybill</li>
          <li>Source WH</li>
          <li>Item #</li>
          <li>Part description</li>
          <li>Shipped Quantity</li>
          <li>TP</li>
          <li>FE Name</li>
          <li>Shipping Instructions</li>
          <li>SHIP TO Address</li>
          <li>Fecha Arribo</li>
          <li>Guia local</li>
          <li>Ship Date</li>
          <li>Delivery date</li>
          <li>Delivery Time</li>
          <li>Receipt</li>
          <li>Último Checkpoint</li>
          <li>Comentarios</li>
          <li>Fecha de Ingreso a CC</li>
          <li>Editar</li>
        </ul>
      <div className="tabla">
        {data &&
          data.map((line, i) => (
            <ul
              key={i}
              className={
                i === item && i % 2 && open
                  ? "even abierto"
                  : i === item && open
                  ? "odd abierto"
                  : i % 2 && i === item && !open
                  ? "even cerrado"
                  : i === item && !open
                  ? "odd cerrado"
                  : i % 2
                  ? "even cerrado"
                  : "odd cerrado"
              }
              onDoubleClick={() => {
                setItem(i);
                toogle();
              }}
              onContextMenu={e => {
                // e.preventDefault();
                // console.log(line);
                // return false;
              }}
            >
              <li>{line.LINE_ID}</li>
              <li>{line["Order_ Number"]}</li>
              <li>{line["Return Reference"]}</li>
              <li>{line["Creation_date"] === '' ? '' : moment(line["Creation_date"]).format("DD MMM YY HH:mm")}</li>
              <li>{line["Carrier"]}</li>
              <li>{line["Waybill"]}</li>
              <li>{line["Source WH"]}</li>
              <li>{line["Item #"]}</li>
              <li>{line["Part description"]}</li>
              <li>{line["Shipped Quantity"]}</li>
              <li>{line["TP"]}</li>
              <li>{line["FE Name"]}</li>
              <li>{line["Shipping Instructions"]}</li>
              <li>{line["SHIP_TO_Address"]}</li>
              <li>{line["Fecha Arribo"] === '' ? '' : moment(line["Fecha Arribo"]).format("DD MMM")}</li>
              <li>{line["Guia local"]}</li>
              <li>{line["Ship Date"] === '' ? '' :  moment(line["Ship Date"]).format("DD MMM")}</li>
              <li>{line["Delivery date"] === '' ? '' :  moment(line["Delivery date"]).format("DD MMM")}</li>
              <li>{line["Delivery Time"]}</li>
              <li>{line["Receipt"]}</li>
              <li>{line["Último Checkpoint"]}</li>
              <li>{line["Comentarios"]}</li>
              <li>{line["Fecha de Ingreso a CC"]}</li>
              <li><button onClick={()=>{
                console.log(line);                
              }}  ><svg><g><path d="M3 17.25v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06zm17.71-10.21c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g></svg></button></li>
            </ul>
          ))}
      </div>
      </>
      ) : (
        <p className="sinDatos" >No hay datos para este periodo</p>
      )}
    </div>
  );
};

export default Tabla;
