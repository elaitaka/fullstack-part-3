import { useState, useEffect } from "react";

import "./App.css";
import personService from "./components/Model.js";
import { Notification} from "./components/Notification.jsx";
import { FailedNotification } from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [failedMessage, setFailedMessage] = useState(null);

  const hook = () => {
    personService.getAll().then((data) => setPersons(data)).catch((error) => {
      console.error("Error fetching data in App component:", error);
      setFailedMessage("Failed to fetch data. Please try again later.");
      setTimeout(() => {
        setFailedMessage(null);
      }, 5000);
    });
  };

  useEffect(hook, []);

  /* 
  Add new person into person-array object
  */
  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.some((person) => person.name === newPerson);

    const number = event.target.number.value;
    const isnumberExists = persons.some((person) => person.number === number);
    if (isnumberExists) {
      alert(
        `Phone number '${event.target.number.value}' is already in use / reserved`,
      );
      return;
    }

    if (personExists) {
      /* henkilö on jo luettelossa */
      updatePerson(newPerson, number);
    } else {
      /*  henkilöä ei löydy, joten voidaan lisätä uusi */
      personService
        .createNewPerson(newPerson, event.target.number.value)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewPerson("");
          showSuccess({ name: newPerson, number });
        }).catch((error) => {
          console.error("Error adding new person:", error);
          showError({ name: newPerson, number });
        });
    }
  };

  /* 
  Feed new person
  */
  const addNewPerson = (event) => {
    setNewPerson(event.target.value);
  };

  /* 
  Update existing person's phone number
  */
  const updatePerson = (name, number) => {
    if (window.confirm("Do you want to replace the existing phone number?") === true) {
      
      console.log("HERE Person update confirmed...");
      
      const person = persons.find((p) => p.name === name);
      const changedPerson = {
        ...person,
        number,
      };

      personService
        .updatePersonById(changedPerson)
        .then((returnedPerson) => {
          if (returnedPerson !== null && returnedPerson !== undefined) {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson,
              ),
            );
            showSuccess({ name: returnedPerson.name, number: returnedPerson.number });
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          showError({ name: changedPerson.name, number: changedPerson.number });
        });
    } else {
      console.log("Person update cancelled");
    }
    return null;
  };

  /* 
  Feed printout persons component
  */
  const PrintoutPersons = ({ persons }) => {
    return (
      <>
        {persons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
            <button
              className="remove"
              type="button"
              onClick={() => deletePerson(person.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </>
    );
  };

  /* 
  Feed person deletion
  */
  const deletePerson = async (id) => {
    const personToDelete = persons.find((p) => p.id === id);
    const response = await personService.deletePersonById(id).catch((err) => {
      console.error("Error deleting person:", err);
      showError({ name: personToDelete?.name, number: personToDelete?.number });
    });

    if (response && (response.status === 200 || response.status === 204)) {
      setPersons(persons.filter((person) => person.id !== id));
      showSuccess({ name: personToDelete?.name, number: personToDelete?.number });
    }
  };

  /* 
  Printout success notification
  */
  function showSuccess(props) {
    setSuccessMessage(
      `Successfully executed with '${props.name}' with phone number '${props.number}'`,
    );
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  }


  /* 
  Printout error notification
  */
  function showError(props) {
    setFailedMessage(
      `Execution FAILED with Person '${props.name}' with phone number '${props.number}'. Please try again.`,
    );
    setTimeout(() => {
      setFailedMessage(null);
    }, 5000);
  }

 
  /*
  Filter persons based on search input
  */
  const filteredPerson =
    searchPerson === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchPerson.toLowerCase()),
        );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <FailedNotification message={failedMessage} />
      <div>
        <label htmlFor="searchPerson">Search person </label>
        <input
          value={searchPerson}
          onChange={(e) => setSearchPerson(e.target.value)}
          type="text"
          placeholder="Search person's name"
          id="searchPerson"
          name="searchPerson"
        />
      </div>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="filterPersons">Name of person to be added </label>
          <input
            id="filterPersons"
            type="text"
            placeholder="Person's name to be added"
            pattern="[A-Za-z ']+"
            value={newPerson}
            onChange={addNewPerson}
          />
        </div>
        <div>
          <label htmlFor="number">number </label>
          <input
            type="tel"
            id="number"
            name="number"
            placeholder="+358 40 123 4567"
            pattern="[+][0-9]{1,4}[0-9]{1,10}"
          />
        </div>
        <div>
          <button type="submit">Add new name</button>
        </div>
      </form>
      <h2>Persons's numbers</h2>
      <div>
        <PrintoutPersons persons={filteredPerson} />
      </div>
    </div>
  );
};

export default App;
