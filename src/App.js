import "./App.css";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [breedNames, setBreedNames] = useState([]);
  const [specificBreed, setSpecificBreed] = useState("pinscher");

  function onloadAllBreedNames() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        // Object.keys() converts object to array
        setBreedNames(Object.keys(data.message));
      });
  }

  function loadRandomDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        setDogs([data.message]);
      });
  }

  function loadSpecificBreed(breedName) {
    fetch(`https://dog.ceo/api/breed/${breedName}/images`)
      .then((response) => response.json())
      .then((data) => {
        setDogs([...data.message]);
      });
  }

  useEffect(() => {
    loadRandomDog();
    onloadAllBreedNames();
  }, []);

  // Dropdown Menu, Part 1/2
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=''
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  // Dropdown Menu, Part 2/2
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className='mx-3 my-2 w-auto'
            placeholder='Type to filter...'
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className='list-unstyled'>
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Dog World</h1>
      <Button variant='primary' onClick={() => loadRandomDog()}>
        Load Random Dog
      </Button>
      {/* Dropdown Button */}
      <DropdownButton id='dropdown-basic-button' title='Choose Breed'>
        {breedNames.map((breed) => (
          <Dropdown.Item
            href='#/action-1'
            key={uuid()}
            onClick={() => loadSpecificBreed(breed)}
          >
            {breed}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      {/* Custom Dropdown */}
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
          <Button variant='primary' onClick={() => loadRandomDog()}>
            Custom toggle &#x25bc;
          </Button>
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey='1'>Red</Dropdown.Item>
          <Dropdown.Item eventKey='2'>Blue</Dropdown.Item>

          {breedNames.map((breed, index) => (
            <Dropdown.Item
              // eventKey={index}
              key={uuid()}
              onClick={() => loadSpecificBreed(breed)}
            >
              {" "}
              {breed}
            </Dropdown.Item>
          ))}

          <Dropdown.Item eventKey='3' active>
            Orange
          </Dropdown.Item>
          <Dropdown.Item eventKey='1'>Red-Orange</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Breed Names */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {breedNames.map((breed) => (
          <Button
            variant='success'
            key={uuid()}
            onClick={() => loadSpecificBreed(breed)}
            style={{
              width: "250px",
              outline: "1px solid black",
            }}
          >
            {breed}
          </Button>
        ))}
      </div>

      {/* Images */}
      {dogs.map((dogUrl) => (
        <img
          src={dogUrl}
          key={uuid()}
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            outline: "1px solid black",
          }}
        />
      ))}
    </div>
  );
}
