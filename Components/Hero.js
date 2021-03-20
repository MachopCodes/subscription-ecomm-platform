import React, { useState } from "react";
import { makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";
import { signin } from "next-auth/client";
import SubscriptionForm from "./SubscriptionForm"

export default function Hero({ user }) {
  const useStyles = makeStyles((theme) => ({
    signIn: {
      backgroundColor: "#1eb1fc",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    subutton: {
      backgroundColor: "#8bc34a",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to the Catporium!</h1>
      <h2 style={{ textAlign: "center" }}>
        The online store where you can subscribe to have cats send to you
        weekly!
      </h2>
      <h3 style={{ textAlign: "center" }}>
        To get started and pick your subscription, sign in!
      </h3>
      <br></br>
      <p className={classes.buttonContainer}>
        {!user ? (
          <a
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault();
              signin();
            }}
          >
            <button className={classes.signIn}>Sign in with Google</button>
          </a>
        ) : (
          <button className={classes.subutton} onClick={() => setOpen(true)}>
            Start My Cat Subscription!
          </button>
        )}
      </p>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 className={classes.textCenter}>Please Select Your Subscription</h2>
              <SubscriptionForm user={user} />
          </div>
        </Fade>
      </Modal>
    </>
  );
}
