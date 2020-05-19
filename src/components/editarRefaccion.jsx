import React, { useState } from "react";
import moment from "moment";

import {
  Modal,
  Button,
  Icon,
  Form,
  Dropdown,
  Message,
} from "semantic-ui-react";
import "./editarRefaccion.scss";

const EditarRefaccion = (props) => {
  const [checkpoint, setCheckpoint] = useState(
    props.refaccion["Último Checkpoint"]
  );

  const statusOptions = [
    { key: 0, text: "Backorder", value: "Backorder" },
    { key: 1, text: "En_Transito_a_MX", value: "En_Transito_a_MX" },
    { key: 2, text: "Entregado", value: "Entregado" },
    { key: 3, text: "Dirección incorrecta", value: "Dirección incorrecta" },
    { key: 4, text: "En ruta de entrega", value: "En ruta de entrega" },
  ];

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
              {" "}
              <b>LINE ID:</b> {props.refaccion["LINE_ID"]}{" "}
            </p>
            <p>
              {" "}
              <b>Order Number:</b> {props.refaccion["Order_ Number"]}{" "}
            </p>
            <p>
              {" "}
              <b>Return Reference:</b> {props.refaccion["Return Reference"]}{" "}
            </p>
            <p>
              {" "}
              <b>Creation date:</b>{" "}
              {props.refaccion["Creation_date"] === ""
                ? ""
                : moment(props.refaccion["Creation_date"]).format(
                    "DD MMM YY HH:mm"
                  )}{" "}
            </p>
            <p>
              {" "}
              <b>Carrier:</b> {props.refaccion["Carrier"]}{" "}
            </p>
            <p>
              {" "}
              <b>Waybill:</b> {props.refaccion["Waybill"]}{" "}
            </p>
            <p>
              {" "}
              <b>Source WH:</b> {props.refaccion["Source WH"]}{" "}
            </p>
            <p>
              {" "}
              <b>Item #:</b> {props.refaccion["Item #"]}{" "}
            </p>
            <p>
              {" "}
              <b>Part description:</b> {props.refaccion["Part description"]}{" "}
            </p>
            <p>
              {" "}
              <b>Shipped Quantity:</b> {props.refaccion["Shipped Quantity"]}{" "}
            </p>
            <p>
              {" "}
              <b>TP:</b> {props.refaccion["TP"]}{" "}
            </p>
            <p>
              {" "}
              <b>FE Name:</b> {props.refaccion["FE Name"]}{" "}
            </p>
            <p>
              {" "}
              <b>Shipping Instructions:</b>{" "}
              {props.refaccion["Shipping Instructions"]}{" "}
            </p>
            <p>
              {" "}
              <b>SHIP TO Address:</b> {props.refaccion["SHIP_TO_Address"]}{" "}
            </p>
          </div>
          <Form className="contentForm">
            <Form.Field>
              <label>Fecha Arribo</label>
              <input
                placeholder="Fecha Arribo"
                value={
                  props.refaccion["Fecha Arribo"] === ""
                    ? ""
                    : moment(props.refaccion["Fecha Arribo"]).format("DD MMM")
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Guia local</label>
              <input
                placeholder="Guia local"
                value={props.refaccion["Guia local"]}
              />
            </Form.Field>
            <Form.Field>
              <label>Ship Date</label>
              <input
                placeholder="Ship Date"
                value={
                  props.refaccion["Ship Date"] === ""
                    ? ""
                    : moment(props.refaccion["Ship Date"]).format("DD MMM")
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Delivery date</label>
              <input
                placeholder="Delivery date"
                value={
                  props.refaccion["Delivery date"] === ""
                    ? ""
                    : moment(props.refaccion["Delivery date"]).format("DD MMM")
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Delivery Time</label>
              <input
                placeholder="Delivery Time"
                value={props.refaccion["Delivery Time"]}
              />
            </Form.Field>
            <Form.Field>
              <label>Receipt</label>
              <input placeholder="Receipt" value={props.refaccion["Receipt"]} />
            </Form.Field>
            <Form.Field>
              <label>Último Checkpoint</label>
              <Dropdown
                className="dropdownOpts"
                placeholder="Último Checkpoint"
                clearable
                selection
                value={props.refaccion["Último Checkpoint"]}
                options={statusOptions}
                onChange={(e, { value }) => setCheckpoint(value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Comentarios</label>
              <textarea
                placeholder="Comentarios"
                value={props.refaccion["Comentarios"]}
                rows={3}
              />
            </Form.Field>
            <Form.Field>
              <label>Fecha de Ingreso a CC</label>
              <input
                placeholder="Fecha de Ingreso a CC"
                value={props.refaccion["Fecha de Ingreso a CC"]}
              />
            </Form.Field>
          </Form>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button primary>
          OK <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditarRefaccion;
