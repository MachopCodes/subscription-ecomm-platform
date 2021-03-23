import React from "react";
import Link from 'next/link';
import { Typography, makeStyles } from "@material-ui/core";
import SubscriptionModal from "./SubscriptionModal"
import SignIn from "./Signin"

export default function Hero({ user, subscription }) {
  const useStyles = makeStyles((theme) => ({
    foreground: {
      paddingTop: '60px'
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
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
    cartButton: {
      backgroundColor: '#f06292',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      padding: '0.5rem 1rem'
    }
  }));
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
        {!user 
          ? <SignIn/> 
          : (
            !subscription 
              ?<SubscriptionModal user={user} />
              : <Link href={`/my-subscription`} >
              <button className={classes.cartButton}>
                Check my subscription
              </button>
            </Link>
              )
          }
      </p>  
    </main>
  );
}
