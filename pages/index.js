import Link from "next/link";
import axios from 'axios'
import { makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import Header from "../Components/Header";
import { signin } from "next-auth/client";
import { useRouter } from "next/router";

export default function Index() {
  const useStyles = makeStyles((theme) => ({
    signInButton: {
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
    radio: {
      display: "flex",
      flexDirection: "column",
    },
    textCenter: {
      textAlign: "center",
    },
  }));

  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [subscription, setSubscription] = useState();
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Header user={user} setUser={setUser} />
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
            <button className={classes.signInButton}>
              Sign in with Google
            </button>
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
            <div>
              <Formik
                initialValues={{ subscription }}
                // onSubmit={(values) => {
                //   setSubscription(values)
                //   console.log('subscription: ', values.subscription, 'user', user)
                  onSubmit={async (values) => {
                    const data = { subscription: values.subscription, user }
                    // await new Promise((r) => setTimeout(r, 500));
                    // alert(JSON.stringify(values, null, 2));
                    try {
                      await axios.post('/api/subscription', { data });
                      router.push("/select-your-cats");
                    } catch (errors) {
                      console.log(errors);
                    }
                  }
                }
              >
                {({ values }) => (
                  <Form>
                    <div
                      role="group"
                      aria-labelledby="my-radio-group"
                      className={classes.radio}
                    >
                      <label>
                        <Field type="radio" name="subscription" value="Basic" />
                        Basic (5 cats per month)
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="subscription"
                          value="Purrrfect"
                        />
                        Purrfect (10 cats per month with a 10% discount)
                      </label>
                    </div>
                    <br></br>
                    <div className={classes.buttonContainer}>
                      <button type="submit" className={classes.subutton}>
                        Pick my cats!
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
