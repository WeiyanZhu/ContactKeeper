import React, {useState, useContext, useEffect} from 'react'
import ContactContext from "../../context/contact/contactContext"

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const {current} = contactContext;
    const [contact, setContact] = useState({name:"", email:"", phone:"", type:"personal"})
    const {name, email, phone, type} = contact;

    useEffect(()=>{
        if(current!==null)
        {
            setContact(current);
        }else{
            setContact({name:"", email:"", phone:"", type:"personal"});
        }
    }, [current, contactContext])

    const onChange = (event)=>{
        setContact({...contact, [event.target.name]:event.target.value})
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        if(current === null)
        {
            contactContext.addContact(contact);
        }else{
            contactContext.updateContact(contact);
            clearEdit();
        }
        setContact({name:"", email:"", phone:"", type:"personal"});
    }

    const clearEdit=()=>{
        contactContext.clearCurrent();

    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current?"Edit Contact":"Add Contact"}</h2>
            <input type="text" placeholder="name" name = "name" value = {name} onChange = {onChange}/>
            <input type="email" placeholder="email" name = "email" value = {email} onChange = {onChange}/>
            <input type="text" placeholder="phone" name = "phone" value = {phone} onChange = {onChange}/>
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type==="personal"} onChange = {onChange}/>Personal{" "}
            <input type="radio" name="type" value="professional" checked={type==="professional"} onChange = {onChange}/>Professional{" "}
            <div>
                <input type="submit" value={current?"Update Contact":"Add Contact"} className="btn btn-primary btn-block"></input>
            </div>
            {current&&<div>
                <input type="submit" value="Clear" className="btn btn-light btn-block" onClick={clearEdit}></input>
            </div>
            }
        </form>
    )
}

export default ContactForm