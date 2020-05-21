import React, { useState, useRef, useCallback } from "react";
import moment from "moment";

import { db } from "../../index";
import { Modal, Button, Icon, Form, Dropdown } from "semantic-ui-react";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./editarRefaccion.scss";

const EditarRefaccion = (props) => {
  console.log(props);
  const fp = useRef(null);

  const [fechaArribo, setFechaArribo] = useState(
    props.refaccion["Fecha Arribo"]
  );
  const [guiaLocal, setGuiaLocal] = useState(props.refaccion["Guia local"]);
  const [shipDate, setShipDate] = useState(props.refaccion["Ship Date"]);
  const [deliveryDate, setDeliveryDate] = useState(
    props.refaccion["Delivery date"]
  );
  const [deliveryTime, setDeliveryTime] = useState(
    props.refaccion["Delivery Time"]
  );
  const [receipt, setReceipt] = useState(props.refaccion["Receipt"]);
  const [checkpoint, setCheckpoint] = useState(
    props.refaccion["Último Checkpoint"]
  );
  const [comentarios, setComentarios] = useState(
    props.refaccion["Comentarios"]
  );
  const [fechaDeIngresoCC, setFechaDeIngresoCC] = useState(
    props.refaccion["Fecha de Ingreso a CC"]
  );

  const statusOptions = [
    { key: 0, text: "Backorder", value: "Backorder" },
    { key: 1, text: "En_Transito_a_MX", value: "En_Transito_a_MX" },
    { key: 2, text: "Entregado", value: "Entregado" },
    { key: 3, text: "Dirección incorrecta", value: "Dirección incorrecta" },
    { key: 4, text: "En ruta de entrega", value: "En ruta de entrega" },
  ];

  const handleDateChange = (value, fecha) => {
    console.log(value[0]);
    console.log(fecha);
    switch (fecha) {
      case "fechaArribo":
        value[0] !== undefined
          ? setFechaArribo(value[0].getTime())
          : setFechaArribo("");
        break;
      case "shipDate":
        value[0] !== undefined
          ? setShipDate(value[0].getTime())
          : setShipDate("");
        break;
      case "deliveryDate":
        value[0] !== undefined
          ? setDeliveryDate(value[0].getTime())
          : setDeliveryDate("");
        break;
      case "fechaDeIngresoCC":
        value[0] !== undefined
          ? setFechaDeIngresoCC(value[0].getTime())
          : setFechaDeIngresoCC("");
        break;
      case "deliveryTime":
        value[0] !== undefined
          ? setDeliveryTime(moment(value[0]).format("HH:mm"))
          : setDeliveryTime("");
        break;
      default:
        console.log("ninguna fecha correcta");
    }
  };

  const clearTime = useCallback(() => {
    if (fp.current) {
      fp.current.flatpickr.clear();
    }
  }, [fp]);

  const handleSubmit = () => {
    // copiar objeto y eliminar periodo y uid
    let objTemp = { ...props.refaccion };
    delete objTemp.uid;
    delete objTemp.periodo;
    // Actualizar el objeto con los nuevos valores
    let objFinal = {
      ...objTemp,
      "Fecha Arribo": fechaArribo,
      "Guia local": guiaLocal,
      "Ship Date": shipDate,
      "Delivery date": deliveryDate,
      "Delivery Time": deliveryTime,
      Receipt: receipt,
      "Último Checkpoint": checkpoint,
      Comentarios: comentarios,
      "Fecha de Ingreso a CC": fechaDeIngresoCC,
    };
    console.log(objFinal);
    //Actualizar DB
    db.collection("refas2")
      .doc(props.refaccion.uid)
      .update(objFinal)
      .then((docRef) => console.log("Doc updated with ID: ", docRef.id))
      .catch((err) => console.log("Error addign doc: ", err));
    props.closeModal();
  };
  const handleClose = () => {
    console.log(props.refaccion);
    props.closeModal();
  };

  return (
    <Modal open={props.open} closeIcon onClose={() => handleClose()}>
      <Modal.Header> Actualizar </Modal.Header>
      <Modal.Content scrolling>
        <div className="contentActualizar">
          <div className="metadata">
            <p>
              <b>LINE ID: </b>
              {props.refaccion["LINE_ID"]}
            </p>
            <p>
              <b>Order Number: </b> {props.refaccion["Order_ Number"]}
            </p>
            <p>
              <b>Return Reference: </b>
              {props.refaccion["Return Reference"]}
            </p>
            <p>
              <b>Creation date: </b>
              {props.refaccion["Creation_date"] === ""
                ? ""
                : moment(props.refaccion["Creation_date"]).format(
                    "DD MMM YY HH:mm"
                  )}
            </p>
            <p>
              <b>Carrier: </b>
              {props.refaccion["Carrier"]}
            </p>
            <p>
              <b>Waybill: </b>
              {props.refaccion["Waybill"]}
            </p>
            <p>
              <b>Source WH: </b>
              {props.refaccion["Source WH"]}
            </p>
            <p>
              <b>Item #: </b>
              {props.refaccion["Item #"]}
            </p>
            <p>
              <b>Part description: </b>
              {props.refaccion["Part description"]}
            </p>
            <p>
              <b>Shipped Quantity: </b>
              {props.refaccion["Shipped Quantity"]}
            </p>
            <p>
              <b>TP: </b>
              {props.refaccion["TP"]}
            </p>
            <p>
              <b>FE Name: </b>
              {props.refaccion["FE Name"]}
            </p>
            <p>
              <b>Shipping Instructions: </b>
              {props.refaccion["Shipping Instructions"]}
            </p>
            <p>
              <b>SHIP TO Address: </b>
              {props.refaccion["SHIP_TO_Address"]}
            </p>
          </div>
          <Form className="contentForm">
            <Form.Field>
              <label>Fecha Arribo</label>
              <Flatpickr
                value={fechaArribo}
                options={{ dateFormat: "d-M" }}
                onChange={(date) => handleDateChange(date, "fechaArribo")}
              />
            </Form.Field>
            <Form.Field>
              <label>Guia local</label>
              <input
                placeholder="Guia local"
                value={guiaLocal}
                onChange={(e) => setGuiaLocal(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Ship Date</label>
              <Flatpickr
                value={shipDate}
                options={{ dateFormat: "d-M" }}
                onChange={(date) => handleDateChange(date, "shipDate")}
              />
            </Form.Field>
            <Form.Field>
              <label>Delivery date</label>
              <Flatpickr
                value={deliveryDate}
                options={{ dateFormat: "d-M" }}
                onChange={(date) => handleDateChange(date, "deliveryDate")}
              />
            </Form.Field>
            <Form.Field className="timeField">
              <label>Delivery Time</label>
              <Flatpickr
                value={deliveryTime}
                ref={fp}
                options={{
                  dateFormat: "H:i",
                  enableTime: true,
                  noCalendar: true,
                }}
                onChange={(date) => handleDateChange(date, "deliveryTime")}
              />
              {deliveryTime !== "" ? (
                <i onClick={clearTime} className="icon clear"></i>
              ) : null}
            </Form.Field>
            <Form.Field>
              <label>Receipt</label>
              <input
                placeholder="Receipt"
                value={receipt}
                onChange={(e) => setReceipt(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Último Checkpoint</label>
              <Dropdown
                className="dropdownOpts"
                placeholder="Último Checkpoint"
                clearable
                selection
                upward
                value={checkpoint}
                options={statusOptions}
                onChange={(e, { value }) => setCheckpoint(value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Comentarios</label>
              <textarea
                placeholder="Comentarios"
                value={comentarios}
                rows={3}
                onChange={(e) => setComentarios(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Fecha de Ingreso a CC</label>
              <Flatpickr
                value={fechaDeIngresoCC}
                options={{ dateFormat: "d-M" }}
                onChange={(date) => handleDateChange(date, "fechaDeIngresoCC")}
              />
            </Form.Field>
          </Form>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => handleSubmit()} primary>
          OK <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditarRefaccion;
