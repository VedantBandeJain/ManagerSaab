import React from 'react'
import { Link } from 'react-router-dom'
import  ContactCard  from '../ContactCard/ContactCard'
import './ContactList.css'

export const ContactList = (props) => {
  // console.log(props);
  const deleteContactHandler=(id)=>{
      props.getContactId(id);
  }
  const renderContactList=props.contacts.map((contact)=>{
    return (
        <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>
    );
  });
  return (
    <div>
      <h1>Contact List</h1>
      <div className='ui search'>
        <div className='ui icon input'>
          <input className='prompt' type='text' placeholder='Search Contacts' value={props.term} onChange={(e)=>props.searchKeyWord(e.target.value)} />
          <i className='search icon'></i>
          </div>
      </div>
      <Link to='/add'>
      <button className='add-contact-btn'>Add Contact</button>
      </Link>
       {renderContactList.length>0 ? renderContactList : "No Contacts available"} 
    </div>
  )
}
