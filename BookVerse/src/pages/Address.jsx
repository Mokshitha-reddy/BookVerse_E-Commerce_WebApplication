import React, { useState } from "react";
import "../styles/address.css";

const Address = () => {
  const [addresses, setAddresses] = useState(
    JSON.parse(localStorage.getItem("addresses")) || []
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      // Update existing address
      const updatedAddresses = addresses.map((item) =>
        item.id === editId
          ? {
              ...item,
              name,
              phone,
              address,
              city,
              state,
              pincode,
            }
          : item
      );

      setAddresses(updatedAddresses);

      localStorage.setItem(
        "addresses",
        JSON.stringify(updatedAddresses)
      );

      alert("Address updated successfully!");

      setEditId(null);
    } else {
      // Add new address
      const newAddress = {
        id: Date.now(),
        name,
        phone,
        address,
        city,
        state,
        pincode,
      };

      const updatedAddresses = [
        ...addresses,
        newAddress,
      ];

      setAddresses(updatedAddresses);

      localStorage.setItem(
        "addresses",
        JSON.stringify(updatedAddresses)
      );

      alert("Address added successfully!");
    }

    // Clear form
    setName("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
  };

  const handleEdit = (item) => {
    setEditId(item.id);

    setName(item.name);
    setPhone(item.phone);
    setAddress(item.address);
    setCity(item.city);
    setState(item.state);
    setPincode(item.pincode);
  };

  const handleDelete = (id) => {
    const updatedAddresses = addresses.filter(
      (item) => item.id !== id
    );

    setAddresses(updatedAddresses);

    localStorage.setItem(
      "addresses",
      JSON.stringify(updatedAddresses)
    );

    alert("Address deleted successfully!");
  };

  return (
    <div className="address-container">

      <h1>📍 My Addresses</h1>

      <div className="address-form">

        <h2>
          {editId ? "Edit Address" : "Add New Address"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />

          <button type="submit">
            {editId ? "Update Address" : "Add Address"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);

                setName("");
                setPhone("");
                setAddress("");
                setCity("");
                setState("");
                setPincode("");
              }}
            >
              Cancel
            </button>
          )}

        </form>

      </div>

      <div className="saved-addresses">

        <h2>Saved Addresses</h2>

        {addresses.length === 0 ? (
          <p>No saved addresses yet.</p>
        ) : (
          addresses.map((item) => (
            <div
              className="address-card"
              key={item.id}
            >

              <h3>{item.name}</h3>

              <p>📞 {item.phone}</p>

              <p>{item.address}</p>

              <p>
                {item.city}, {item.state} -{" "}
                {item.pincode}
              </p>

              <button
                onClick={() => handleEdit(item)}
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
              >
                🗑️ Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Address;