import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import api from "./api/contacts";
import Header from "./components/Header/Header";
import AddContact from "./components/AddContacts/AddContact";
import { ContactList } from "./components/ContactList/ContactList";
import ContactDetail from "./components/ContactDetail/ContactDetail";
import EditContact from "./components/EditContact/EditContact";

const LOCAL_STORAGE_KEY = "contacts";
function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  async function addNewContact(name, email) {
    const req = {
      id: uuid(),
      name,
      email,
    };
    const response = await api.post("/contacts", req);
    console.log(response.data);
    setContacts([...contacts, response.data]);
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const updateNewContact = (id, name, email) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, name, email };
      }
      return contact;
    });

    setContacts(updatedContacts);
  };

  const searchHandler=(searchTerm)=>{
     setSearchTerm(searchTerm);
    //  console.log(searchTerm)
    if(searchTerm !==""){
      const newContacList=contacts.filter((contact)=>{
        // console.log(Object.values(contact))
        return  Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(newContacList);
    }
    else{
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    // try {
    //   const retrieveContacts = JSON.parse(
    //     window.localStorage.getItem(LOCAL_STORAGE_KEY)
    //   );
    //   if (retrieveContacts) {
    //     setContacts(retrieveContacts);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    // window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY); //cleanup To ensure that the state is saved and retrieved from the localStorage correctly, you can modify the useEffect hook that saves the contacts to localStorage to include a cleanup function. This function will be called before the component is unmounted and can be used to cleanup any resources, in this case, to remove the saved data from localStorage when the component is unmounted:
      //This ensures that the data is saved to the localStorage when the component unmounts and removed from localStorage when the component is mounted again.
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm <1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyWord={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addNewContact} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateNewContact} />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
