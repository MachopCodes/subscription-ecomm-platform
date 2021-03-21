import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import axios from 'axios'
import { getSession } from 'next-auth/client';
import { Card, CardContent, CardActionArea, CardActions } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import Header from "../../Components/Header"

export default function SubscriptionId() {
    const router = useRouter()
    const [user, setUser] = useState();
    const [subscription, setSubscription] = useState()
    const id = router.query.subscription_id
    const fetchSubscriptions = async () => {
        const session = await getSession()
        const subscription = await axios.get(`/api/subscription/${id}`)
        if (subscription.data.user === session.user.email) {
          setSubscription(subscription.data)
        }
      };
      
    useEffect(() => {
      id && fetchSubscriptions(id)  
    }, [id])

    const jsx = !subscription 
      ? (
      <p>loading...</p>
      ) : (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {subscription.user}'s Subscription
            </Typography>
            <Typography>
              {subscription.subscription} Plan
            </Typography>
            <Typography>
              items:
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Change Plan
          </Button> 
        </CardActions>
      </Card>
      )
  return (
    <>
    <Header user={user} setUser={setUser} />
      <h1 style={{ textAlign: "center" }}>
        Your subscription is! {jsx}
      </h1>
    </>
  );
}
