import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Hello FE</h1>
      <Link to="/fe/historial">Historial</Link>
    </div>
  );
}

export default Dashboard;
