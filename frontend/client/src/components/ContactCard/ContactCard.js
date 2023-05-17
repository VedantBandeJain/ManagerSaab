import React from 'react'
import './ContactCard.css'
import user from '../../images/user.png'
import { Link } from 'react-router-dom';

const ContactCard = (props) => {
    const {id,name,email} = props.contact; 
  return (
    <div className='listItems'>
        <div className='listItem'>
            <img className='listItemImg' src={user} alt='user' />
          <div className='listItemContent'>
            <Link to={{pathname:`/contact/${id}`,state:{contact:props.contact}}}>
            <div className='listItemName'>{name}</div>
            <div className='listItemName-mail'>{email}</div>
            </Link>
          </div>
          <div className='listItemLogo'>
            <Link to={{pathname:`/edit`,state:{contact:props.contact}}}>
            <i className='edit alternate outline blue icon ' ></i>
            </Link>
            <i className='trash alternate outline icon ' onClick={()=> props.clickHandler(id) }></i>
          </div>
        </div>
    </div>
  )
}

export default ContactCard
