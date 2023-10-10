import React, { useEffect, useState } from 'react'
import './Home.css'
import ContactCard from '../../components/ContactCard/ContactCard'

import showToast from 'crunchy-toast';


function Home() {
  const [contacts, setContacts] = useState([
    {
      name: 'Ajinkya Daf',
      mobile: 8767079526,
      email: 'ajankya@gmail.com'
    },
    {
      name: 'OM Roy',
      mobile: 6584265912,
      email: 'om@gmail.com'
    },
    {
      name: 'Ram Prakash',
      mobile: 5847625912,
      email: 'Ram@gmail.com'
    },
    {
      name: 'Sumit PT',
      mobile: 5846297854,
      email: 'sumit@gmail.com'
    },
   

  ])

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [editIndex, setEditIndex] = useState('-1 ');
  const [isEditMode, setIsEditMode] = useState(false);

  const addContact = ()=>{
    if(!name){
      showToast('Name is required', 'warning', 3000);
      return;
    }
    if(!mobile){
      showToast('Mobile No is required', 'warning', 3000);
      return;
    }
    if(!email){
      showToast('Email is required', 'warning', 3000);
      return;
    }



    const obj ={
      name: name,
      mobile: mobile,
      email: email
     
    }

    const newContact = [...contacts, obj];

    setContacts(newContact);
    saveToLocalStorage(newContact); 

    showToast('Contact has been Saved Successfully', 'success', 3000);

    setName('');
    setMobile('');
    setEmail('');

    
  };

  const deleteContact = (mobileNumber) => {
    let indexToDelete = -1 ;

    contacts.forEach((contactDetail, index )=> {
      if(contactDetail.mobile === mobileNumber){
        indexToDelete = index;
      }
    })

    contacts.splice(indexToDelete, 1);
    saveToLocalStorage(contacts);

    setContacts([...contacts]);
    showToast('Contact Deleted Successfully', 'success', 3000);

  };

  const saveToLocalStorage = (contactsData) => {
    localStorage.setItem('contacts', JSON.stringify(contactsData));
  };

  const loadFromLocalStorage = (contactsData) => {
     contactsData = JSON.parse(localStorage.getItem('contacts'));

    if(contactsData){
      setContacts(contactsData);
    }
  };

  const enableEditMode = (index) => {
    const contactsData = contacts[index];

    setName(contactsData.name);
    setMobile(contactsData.mobile);
    setEmail(contactsData.email);

    setEditIndex(index);
    setIsEditMode(true);
  };

  const editContact = () => {
    const obj = {
      name: name,
      mobile : mobile,
      email : email
    }

    contacts[editIndex] = obj;

    setContacts([...contacts]);

    saveToLocalStorage(contacts);

    showToast('Contact Edited Successfully', 'success', 3000);

    setName('');
    setMobile('');
    setEmail('');

    setIsEditMode(false);
  };

  useEffect(()=>{
    loadFromLocalStorage();
  },[])


  return (
    <div>

      <h1 className='app-title'>☎️ Contact App</h1>
      
      <div className='app-body'>
        <div className='add-contact'>
          <h3 className='add-contact-heading'>
            { isEditMode ? 'Edit Contact' : 'Add New Contact'}
          </h3>

          <form className='add-contact-form'>
            <input 
              type='text' 
              placeholder='Name' 
              className='user-input'
              onChange={(e)=>{
                setName(e.target.value);
              }}
              value={name}/>

            <input
              type='tel' 
              placeholder='Mobile No' 
              className='user-input'
              onChange={(e)=>{
                setMobile(e.target.value);
              }}
              value={mobile}/>

            <input 
              type='email' 
              placeholder='Email' 
              className='user-input'
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
              value={email}/>

          </form>
          <button 
            className='add-btn' 
            type='button'
            onClick={()=>{
              isEditMode ? editContact() : addContact()
            }}
            >
            { isEditMode ? 'SAVE' : 'SAVE'}

          </button>
        </div>

        <hr/>

        <div className='show-contact'>
          <h3 className='show-contact-heading'>All Contacts</h3>
          <form className='search-input'>
          <input type='text' placeholder='Search Contacts..' className='search-bar' />
          </form>
         
          
          <div className='card-container'>
            {
              contacts.map((contact, index) => {
                const { name, mobile, email } = contact;
                return (
                <ContactCard key={index}
                name={contact.name} 
                mobile={contact.mobile} 
                email={contact.email}
                deleteContact={deleteContact} 
                enableEditMode={enableEditMode}
                index={index} />
                )
              })
            }

          </div>

        </div>
      </div>

      <hr/>
      <p className='app-desc'>&copy; 2023 MY CONTACT APP</p>
    </div>

  )
}

export default Home