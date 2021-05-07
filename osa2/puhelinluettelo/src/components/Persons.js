import React from 'react';

const Person = ({ person, removePerson }) => (
    <div>
      {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
    </div>
  )

const Persons = ({ personsToShow, removePerson }) => {
    return (
        <div>
            {personsToShow.map(person =>
                <Person key={person.name} person={person} removePerson={removePerson} />
            )}
        </div>
    );
};

export default Persons;