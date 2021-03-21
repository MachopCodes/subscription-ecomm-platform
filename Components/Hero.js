import React, { useState } from "react";
import { Typography, makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";
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
    heading: {
      fontFamily: "Courier New, monospace",
      fontSize: "44px",
      textAlign: "center",
      fontWeight: 600
    },
    subHeading: {
      fontFamily: "Courier New, monospace",
      fontSize: "18px",
      textAlign: "center",
      fontWeight: 600
    },
  }));

  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <main className={classes.foreground}>
      <br></br>
      <Typography variant="h1" component="h1" className={classes.heading}>
        Welcome to Catporium
      </Typography>
      <Typography variant="h2" component="h2" className={classes.subHeading}>
        The online cat subscribscription store
      </Typography>
      <Typography variant="h3" component="h3" className={classes.subHeading}>
        Sign in to get started
      </Typography>
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
            Select a subscription
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
    </main>
  );
}
