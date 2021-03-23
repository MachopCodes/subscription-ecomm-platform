import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Typography, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { useSession } from 'next-auth/client';
import Header from "../Components/Header"
import CatCard from "../Components/CatCard"

const useStyles = makeStyles({
  subHeader: {
    paddingTop: '100px',
    position: 'fixed',
    borderBottom: '1px solid #ccc',
    // backgroundColor: 'white',
    top: '0',
    width: '100%',
    zIndex: '4',
  },
  catContainer: {
    paddingTop: '200px',
  },
  background: {
    backgroundImage: "url(https://i.imgur.com/YhOPAy2.jpeg)",
    backgroundSize: "cover",
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
})
const SelectYourCat = () => {
  const [user, setUser] = useState("")
  const [cats, setCats] = useState("")
  const [count, setCount] = useState()
  const [subscription, setSubscription] = useState()
  const [session, loading] = useSession()
  const classes = useStyles();
  const apiUrl = "https://api.thecatapi.com/v1/images/search?mime_types=gif";


  
  const fetchSubscription = async () => {
    const result = await axios.get(`/api/subscription/${user}`);
    setSubscription(result.data)
  };

  const fetchCats = async () => {
    const res = await axios.get(apiUrl + "&limit=30");
    setCats(res.data);
  };

  useEffect(() => session && setUser(session.user.email), [session])
  useEffect(() => user && fetchSubscription(), [user])
  useEffect(() => fetchCats(), [])
  useEffect(() => {
    if(subscription && subscription.subscription === 'Purrrfect') setCount(10)
    if(subscription && subscription.subscription === 'Basic') setCount(5)
  }, [subscription])

  return (
    <div className={classes.background}>
    <Header user={user} subscription={subscription}/>
    <Paper className={classes.subHeader}>
      <Typography variant="h4" component="h4" style={{textAlign: 'center'}}>
        Cats Remaining: {count}
      </Typography>
    </Paper>
      <Container className={classes.catContainer}>
      <Grid alignItems="center" spacing={10} container>
        {cats &&
          cats.map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat.id}>
              <CatCard cat={cat} subscription={subscription} setCount={setCount} />
            </Grid>
          ))}
      </Grid>
      </Container>
    </div>
  );
}

export default SelectYourCat
