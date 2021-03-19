import Link from "next/link";
import { makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { FormControl, FormLabel } from '@material-ui/core';
import React, { useState } from "react";
import Header from "../Components/Header"
import { signin } from 'next-auth/client';

export default function Index() {

  const useStyles = makeStyles((theme) => ({
    signInButton: {
      backgroundColor: '#1eb1fc',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      padding: '0.5rem 1rem'
  },
  subutton: {
      backgroundColor: '#8bc34a',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      padding: '0.5rem 1rem'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }))

  const [user, setUser] = useState("")
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("A")
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  return (
    <>
    <Header setUser={setUser}/>
      <h1 style={{textAlign: 'center'}}>Welcome to the Catporium!</h1>
      <h2 style={{textAlign: 'center'}}>The online store where you can subscribe to have cats send to you weekly!</h2>
      <h3 style={{textAlign: 'center'}}>To get started and pick your subscription, sign in!</h3>
      <br></br>
      <p className={classes.buttonContainer}>
      {!user ? (
            <a href="/api/auth/signin" onClick={(e) => {
                e.preventDefault(); signin();
              }}
            >
              <button className={classes.signInButton}>Sign in with Google</button>
            </a>
          ) : (
              <button 
                className={classes.subutton} onClick={()=>setOpen(true)}>
                  Start My Cat Subscription!
              </button>
          )}
      </p>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={()=>setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Select Your Subscription</h2>
            <p id="transition-modal-description">Please select the duration and quantity of your cat subscription.</p>
            <FormControl component="fieldset">
              <FormLabel component="legend">Plans</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="A" control={<Radio />} label="Standard" />
                <FormControlLabel value="B" control={<Radio />} label="Deluxe" />
                <FormControlLabel value="C" control={<Radio />} label="Purrrfect" />
              </RadioGroup>
            </FormControl>
          </div>
        </Fade>
      </Modal>
    </>
  );
}


    