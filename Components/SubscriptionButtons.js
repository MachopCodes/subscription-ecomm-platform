import React from "react";
import { useRouter } from 'next/router'
import axios from 'axios'
import { makeStyles } from "@material-ui/core";
import PaymentModal from "./PaymentModal"

export default function SubscriptionCard({ subscription }) {
  const useStyles = makeStyles((theme) => ({
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      backgroundColor: '#f06292',
      color:' #fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '0.5rem 1rem',
    }
  }));
    const router = useRouter()
    const classes = useStyles();
    const apiUrl = `/api/subscription/${subscription._id}`

    const handleDelete = async () => {
      const alert = confirm(
        "Are you sure you want to delete your subscription?"
      );
      if (alert) {
        try {
          axios.delete(apiUrl);
          router.push("/");
        } catch (err) {
          console.log(err.request);
        }
      }
    };

    const handleNewCats = async () => {
      const alert = confirm(
        "Are you sure you want to pick new cats?"
      );
      if (alert) {
        try {
          await axios.put(apiUrl);
          router.push("/select-your-cats");
        } catch (err) {
          console.log(err.request);
        }
      }
    };

  return ( 
      <td className={classes.buttonContainer}>
        <button className={classes.button} onClick={handleDelete}>
          Cancel Subsscription
        </button>
        <button className={classes.button} onClick={handleNewCats}>
          Pick New Cats
        </button>
        <PaymentModal />
      </td>
    )
}
