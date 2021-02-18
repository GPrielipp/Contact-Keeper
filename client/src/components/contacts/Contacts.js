import React, { useContext, Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { loading, getContacts, contacts, filtered, error } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  useEffect(() => {
    if (error !== null && error !== undefined) {
      setAlert(error, 'danger');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
