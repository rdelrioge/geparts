import React, { useState, useEffect } from "react";
import "./tabla.scss";
import { db } from "../index";

const Tabla = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState();
  const [open, setOpen] = useState(false);

  // READ FOR refacciones IN DB
  useEffect(() => {
    db.collection("refas1").onSnapshot(data => {
      let misRefacciones = [];
      data.forEach(refa => {
        let serv = { ...refa.data(), uid: refa.id };
        misRefacciones.push(serv);
      });
      setData(misRefacciones);
    });
  }, []);

  const toogle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  return (
    <div>
      <div className="tabla">
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
        </ul>
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
              onClick={() => {
                setItem(i);
                toogle();
              }}
              onContextMenu={e => {
                e.preventDefault();
                console.log(line);
                return false;
              }}
            >
              <li>{line.LINE_ID}</li>
              <li>{line["Order_ Number"]}</li>
              <li>{line["Return Reference"]}</li>
              <li>{line["Creation_date"]}</li>
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
              <li>{line["Fecha Arribo"]}</li>
              <li>{line["Guia local"]}</li>
              <li>{line["Ship Date"]}</li>
              <li>{line["Delivery date"]}</li>
              <li>{line["Delivery Time"]}</li>
              <li>{line["Receipt"]}</li>
              <li>{line["Último Checkpoint"]}</li>
              <li>{line["Comentarios"]}</li>
              <li>{line["Fecha de Ingreso a CC"]}</li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Tabla;
