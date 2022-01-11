import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";

export default function NavigationBar() {
  return (
    <Navbar
      bg='light'
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>
        <Navbar.Brand href='/'>Pet Finder</Navbar.Brand>
        <Button variant='outline-primary' href='/'>
          All Breeds
        </Button>
      </div>
      <Form className='d-flex'>
        <FormControl
          type='search'
          placeholder='Search'
          className='me-2'
          aria-label='Search'
        />
        <Button variant='outline-success'>Search</Button>
      </Form>
    </Navbar>
  );
}
