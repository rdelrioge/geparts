import React from "react";
import moment from "moment";

import { Modal, Button, Icon, Form } from "semantic-ui-react";
import "./editarRefaccion.scss";

function editarRefaccion(props) {
  const handleClose = () => {
    console.log(props.refaccion);
    props.closeModal();
  };
  return (
    <Modal open={props.open} closeIcon onClose={() => handleClose()}>
      <Modal.Header> Actualizar </Modal.Header>
      <Modal.Content scrolling>
        <Form className="content">
          <Form.Field>
            <label>LINE ID</label>
            <input placeholder="LINE_ID" value={props.refaccion.LINE_ID} />
          </Form.Field>
          <Form.Field>
            <label>Order Number</label>
            <input
              placeholder="Order Number"
              value={props.refaccion["Order_ Number"]}
            />
          </Form.Field>
          <Form.Field>
            <label>Return Reference</label>
            <input
              placeholder="Return Reference"
              value={props.refaccion["Return Reference"]}
            />
          </Form.Field>
          <Form.Field>
            <label>Creation date</label>
            <input
              placeholder="Creation_date"
              value={
                props.refaccion["Creation_date"] === ""
                  ? ""
                  : moment(props.refaccion["Creation_date"]).format(
                      "DD MMM YY HH:mm"
                    )
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Carrier</label>
            <input placeholder="Carrier" value={props.refaccion["Carrier"]} />
          </Form.Field>
          <Form.Field>
            <label>Waybill</label>
            <input placeholder="Waybill" value={props.refaccion["Waybill"]} />
          </Form.Field>
          <Form.Field>
            <label>Source WH</label>
            <input
              placeholder="Source WH"
              value={props.refaccion["Source WH"]}
            />
          </Form.Field>
          <Form.Field>
            <label>Item #</label>
            <input placeholder="Item #" value={props.refaccion["Item #"]} />
          </Form.Field>
          <Form.Field>
            <label>Part description</label>
            <textarea
              placeholder="Part description"
              value={props.refaccion["Part description"]}
            />
          </Form.Field>
          <Form.Field>
            <label>Shipped Quantity</label>
            <input
              placeholder="Shipped Quantity"
              value={props.refaccion["Shipped Quantity"]}
            />
          </Form.Field>
          <Form.Field>
            <label>TP</label>
            <input placeholder="TP" value={props.refaccion["TP"]} />
          </Form.Field>
          <Form.Field>
            <label>FE Name</label>
            <input placeholder="FE Name" value={props.refaccion["FE Name"]} />
          </Form.Field>
          <Form.Field>
            <label>Shipping Instructions</label>
            <textarea
              placeholder="Shipping Instructions"
              value={props.refaccion["Shipping Instructions"]}
            />
          </Form.Field>
          <Form.Field>
            <label>SHIP TO Address</label>
            <input
              placeholder="SHIP_TO_Address"
              value={props.refaccion["SHIP_TO_Address"]}
            />
          </Form.Field>
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
            <input
              placeholder="Último Checkpoint"
              value={props.refaccion["Último Checkpoint"]}
            />
          </Form.Field>
          <Form.Field>
            <label>Comentarios</label>
            <input
              placeholder="Comentarios"
              value={props.refaccion["Comentarios"]}
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
      </Modal.Content>
      <Modal.Actions>
        <Button primary>
          OK <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default editarRefaccion;
