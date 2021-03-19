import { makeStyles, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    background: theme.palette.mint,
    borderRadius: "5px",
    fontFamily: theme.typography.bodyFontFamily,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "16px",
    padding: "10px",
    margin: "5px 5px 0 0",
    color: theme.palette.lightGreen,
    border: "none",
  },
  buttonDanger: {
    background: theme.palette.brown,
    borderRadius: "5px",
    fontFamily: theme.typography.bodyFontFamily,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "16px",
    padding: "10px",
    margin: "5px 5px 0 0",
    color: theme.palette.lightGreen,
    border: "none",
  },
  userButtons: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.lightGreen,
  },
}));

export default function AddToCart({ route, data }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const apiUrl = "/api/" + route;

  const handleSubmit = async (event) => {
    console.log("click data is", data, "apiurl is", apiUrl);
    event.preventDefault();
    try {
      await axios.post(apiUrl, { data });
      setOpen(true);
      router.push("/");
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    const alert = confirm(
      "Are you sure you want to cancel? All unsaved data will be lost"
    );
    if (alert === true) router.push("/" + route);
  };

  const classes = useStyles();

  return (
    <div className={classes.userButtons}>
      <button className={classes.button} type="button" onClick={handleSubmit}>
        Submit
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className={classes.buttonDanger}
      >
        Cancel
      </button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          {route} successfully added
        </Alert>
      </Snackbar>
    </div>
  );
}
