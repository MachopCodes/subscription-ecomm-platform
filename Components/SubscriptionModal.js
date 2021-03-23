import React, { useState } from "react";
import { Typography, makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";
import SubscriptionForm from "./SubscriptionForm"

export default function SubscriptionModal({ user }) {
  const useStyles = makeStyles((theme) => ({
    subutton: {
      backgroundColor: "#8bc34a",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      padding: "0.5rem 1rem",
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
      <>
        <button className={classes.subutton} onClick={() => setOpen(true)}>
        Select a subscription
        </button>
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
                <Typography variant="h2" component="h2" className={classes.subHeading}>
                    Please Select Your Subscription
                </Typography>
                <SubscriptionForm user={user} />
            </div>
            </Fade>
        </Modal>
      </>
  );
}