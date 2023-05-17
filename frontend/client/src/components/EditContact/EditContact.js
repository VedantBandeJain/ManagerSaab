import React, { useState, useEffect } from "react";
// import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

const EditContact = ({ updateContactHandler, location }) => {
  const [form, setForm] = useState({ id: "", name: "", email: "" });
  const history = useHistory();

  useEffect(() => {
    if (location.state && location.state.contact) {
      const { id, name, email } = location.state.contact;
      setForm({ id, name, email });
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name === "" || form.email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    updateContactHandler(form.id, form.name, form.email);
    history.push("/");
  };

  return (
    <div className="container">
      <h1>Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email id"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button className="add-btn" type="submit">
          Update
        </button>
      </form>
      <div className="underline"></div>
    </div>
  );
};

export default EditContact;
