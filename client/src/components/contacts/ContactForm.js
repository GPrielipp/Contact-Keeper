import React, { useState, useContext, useEffect, useMemo } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';

const ContactForm = () => {
  const DEFAULT_CONTACT = useMemo(() => {
    return {
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    };
  }, []);

  const contactContext = useContext(ContactContext);
  const {
    current,
    addContact,
    clearCurrent,
    updateContact,
    error,
  } = contactContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  useEffect(() => {
    if (error !== null && error !== undefined) {
      setAlert(error, 'danger');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(DEFAULT_CONTACT);
    }
  }, [contactContext, current, DEFAULT_CONTACT]);

  const [contact, setContact] = useState(DEFAULT_CONTACT);

  const { _id, name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
      clearCurrent(_id);
    } else {
      addContact(contact);
    }

    setContact(DEFAULT_CONTACT);
  };

  const clearAllFields = (e) => {
    clearCurrent(_id);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
        {current && (
          <div>
            <button
              className='btn btn-white btn-block'
              onClick={clearAllFields}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
