import React from "react";
import "./editor.scss";
import { CSVToArray } from "./csvToArray";
import { db } from "../index";
import Tabla from "./tabla";

const Edit = () => {
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
        for (let i = 1; i < arr.length; i++) {
          for (let j = 1; j <= arr[0].length; j++) {
            // si algun dato es undefined, cambiarlo para que no mande error
            if (arr[i][j - 1] === undefined) {
              childO[arr[0][j - 1]] = "";
            } else {
              childO[arr[0][j - 1]] = arr[i][j - 1];
            }
          }
          parentO[i] = { ...childO };
          // subir objeto a base de datos con autoID
          db.collection("refas1")
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

  return (
    <div>
      <div className="input">
        <input
          className="inputFile"
          type="file"
          id="file-input"
          onChange={async e => uploadData(e)}
        />
        <label className="file-input__label" htmlFor="file-input">
          <span>Upload csv file</span>
        </label>
      </div>
      <Tabla />
    </div>
  );
};

export default Edit;
