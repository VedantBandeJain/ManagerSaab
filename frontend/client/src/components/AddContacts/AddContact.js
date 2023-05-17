import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import "./AddContact.css";

const AddContact = ({ addContactHandler }) => {
  const [form, setForm] = useState({ id:0,name: "", email: "" });
  
 const handleSubmit=(e)=>{
    e.preventDefault();
    if(form.name === "" || form.email === ""){
      alert("All the fields are mandatory!");
      return;
    }
    setForm({ name: "", email: "" });
    addContactHandler(form.name, form.email);
    //  this.props.history.push("/");
    window.location.href = '/'; //we must use here history push instead of window.location.href but could not do it here because of some error
   console.log(this.form);
  
 }

  
  return (
    <div className="container">
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit} >
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
      <button
        className="add-btn"
        // onClick={(e) => {
        //   e.preventDefault();
        //   if(form.name === "" || form.email === ""){
        //     alert("All the fields are mandatory!");
        //     return;
        //   }
        //   setForm({ name: "", email: "" });
        //   addContactHandler(form.name, form.email);
        //   window.location.href = '/'; //we must use here history push instead of window.location.href but could not do it here because of some error
        // //  console.log(this.form);
        // }}
      >
        Add
      </button>
      </form>
      <div className="underline"></div>
    </div>
  );
};

export default AddContact;
