import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function SupplyList() {
  const [supplies, setSupplies] = useState([]);
  const [modifyName, setModifyName] = useState("");
  const [modifyType, setModifyType] = useState("");

  useEffect(() => {
    const socket = io();

    fetchSupplies();

    socket.on("updateSupplies", () => {
      fetchSupplies();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchSupplies = () => {
    fetch("/api/getSupplies")
      .then((response) => response.json())
      .then((data) => setSupplies(data))
      .catch((error) => console.error("Error fetching supplies:", error));
  };

  const handleModify = (supply) => {
    // Define the updated data (name and type) for the supply
    const updatedData = {
      name: modifyName,
      type: modifyType,
    };

    fetch(`/api/updateSupply/${supply.supply_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          fetchSupplies();
        } else {
          console.error("Error updating supply");
        }
      })
      .catch((error) => console.error("Error updating supply:", error));
  };

  const handleDelete = (supply) => {
    fetch(`/api/deleteSupply/${supply.supply_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchSupplies();
        } else {
          console.error("Error deleting supply");
        }
      })
      .catch((error) => console.error("Error deleting supply:", error));
  };

  return (
    <>
      <h2>What we have : </h2>
      <div className="supply-wrapper">
        {supplies.map((supply) => (
          <div key={supply.supply_id} className="supply">
            <span className="supply__name">{supply.name}</span>

            <span className="supply__type">Type: {supply.type}</span>
            <a href="/" onClick={() => handleDelete(supply)}>Delete</a>
          </div>
        ))}
      </div>
    </>
  );
}

export default SupplyList;
