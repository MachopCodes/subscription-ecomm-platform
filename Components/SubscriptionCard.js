import React from "react";
import SubscriptionButtons from './SubscriptionButtons'
import { makeStyles } from "@material-ui/core";

export default function SubscriptionCard({ subscription, total, discount }) {
  const useStyles = makeStyles((theme) => ({
    lineItems: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottom: '1px dotted grey',
    },
    subHeading: {
      fontFamily: "Courier New, monospace",
      fontSize: "18px",
      textAlign: "center",
      fontWeight: 600,
      color: 'white',
      backgroundColor: 'black'
    },
    table: {
      backgroundColor: 'black',
      opacity: '0.75',
      color: 'white',
      fontSize: '27px',
      fontFamily: "Courier New, monospace",
      borderRadius: '25px'
    },
    tableContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }));
  const classes = useStyles();
  const jsx = !subscription 
    ? <p>loading...</p> : (
    <div className={classes.tableContainer}>
        <table className={classes.table}>
          <tbody>
          <tr>
            <th>
              {subscription.user}'s {subscription.subscription} Plan
            </th>
          </tr>
          {subscription.items.map(item => (
            <tr key={item._id} className={classes.lineItems}>
              <th>{item.catname} . </th>
              <th> . ${item.cost}</th>
            </tr>
          ))}
            {discount > 0 
            ? (
              <tr className={classes.lineItems}>
                <th>discount  .</th>
                <th> .  ${discount}</th>
             </tr>
            ) : null}
            <tr className={classes.lineItems}>
            <th>total  .</th>
            <th>.  ${total}</th>
          </tr>
          </tbody>
        </table>
          <SubscriptionButtons subscription={subscription} />
    </div>
    )
  return <div style={{ paddingTop: "80px" }}>{jsx}</div>
}
