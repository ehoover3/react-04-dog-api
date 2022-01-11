import "./App.css";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [breedNames1, setBreedNames1] = useState([]);
  const [breedNames2, setBreedNames2] = useState([]);
  const [specificBreed, setSpecificBreed] = useState("pinscher");
  const [value, setValue] = useState("");

  function onloadAllBreedNames() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        // Object.keys() converts object to array
        let a1 = Object.keys(data.message);
        a1 = a1.slice(0, 17);
        let b1 = Object.keys(data.message);
        b1 = b1.slice(17, 36);

        // setBreedNames1(Object.keys(data.message));
        setBreedNames1(a1);
        setBreedNames2(b1);
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
      // const [value, setValue] = useState("");

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

      {/* Custom Dropdown 1*/}
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
          <Button variant='primary' onClick={() => loadRandomDog()}>
            Dog Breeds (A to B) &#x25bc;
          </Button>
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          {breedNames1.map((breed, index) => (
            <Dropdown.Item
              eventKey={index}
              key={uuid()}
              onClick={() => loadSpecificBreed(breed)}
            >
              {breed}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Custom Dropdown 2*/}
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
          <Button variant='primary' onClick={() => loadRandomDog()}>
            Dog Breeds (C to E) &#x25bc;
          </Button>
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          {breedNames2.map((breed, index) => (
            <Dropdown.Item
              eventKey={index}
              key={uuid()}
              onClick={() => loadSpecificBreed(breed)}
            >
              {breed}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

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
