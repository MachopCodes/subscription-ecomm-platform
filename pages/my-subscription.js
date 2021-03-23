import React, { useState, useEffect } from "react";
import axios from 'axios'
import { makeStyles, Grid } from "@material-ui/core";
import { useSession } from 'next-auth/client';
import Header from "../Components/Header"
import SubscriptionCard from "../Components/SubscriptionCard"

export default function Subscription() {
  const useStyles = makeStyles((theme) => ({
    background: {
      backgroundImage: "url(https://wallpaperaccess.com/full/621568.jpg)",
      backgroundSize: "cover",
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '2000px'
    },
    subGrid: {
      paddingTop: '100px',
      display: "flex",
      justifyContent: "center"
    }
  }));
  const classes = useStyles();
  
    const [subscription, setSubscription] = useState()
    const [user, setUser] = useState();
    const [total, setTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [session, loading] = useSession()
  
    const fetchSubscriptions = async () => {
      const result = await axios.get(`/api/subscription/${user}`);
      setSubscription(result.data)
    }
    useEffect(() => user && fetchSubscriptions(), [user])
    useEffect(() => session && setUser(session.user.email), [session])
    useEffect(() => {
      if(subscription) {
        let t = 0, d = 0
        subscription.items.map(item => t+=Number(item.cost))
        if(subscription.subscription === 'Basic') {
          setTotal(t)
        } else {
          setDiscount((t*.1).toFixed(2))
          setTotal((t*.9).toFixed(2))
        }
      }
  },[subscription])

  return (
    <div className={classes.background}>
      <Header user={user} subscription={subscription} />
        <Grid className={classes.subGrid} alignItems="center" spacing={10} container>
          <Grid item xs={12} sm={10} md={6}>
            <SubscriptionCard 
              user={user} 
              subscription={subscription} 
              total={total} 
              discount={discount} />
          </Grid>
        </Grid>
    </div>
  );
}