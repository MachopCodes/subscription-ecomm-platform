import React, { useState } from "react";
import { Typography, makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";

export default function PaymentModal({ user }) {
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
          Pay for Subscription
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
                    This is the part where we would ask you to pay and enter your address so we could send you all these awesome cats you just bought but we haven't gotten there yet. Thanks for using this demo!
                </Typography>
            </div>
            </Fade>
        </Modal>
      </>
  );
}