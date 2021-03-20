import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Header from "../Components/Header"
import CatCard from "../Components/CatCard"

export default function Index() {
  const [user, setUser] = useState("")
  const [cats, setCats] = useState("");
  const apiUrl = "https://api.thecatapi.com/v1/images/search?mime_types=gif";
  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get(
        apiUrl + "&limit=20"
        );
        setCats(res.data);
      };
      fetchCats();
    }, [])
  
  return (
    <>
    <Header setUser={setUser}/>
      <h1 style={{textAlign: 'center'}}>Welcome to the Catporium!</h1>
      <h2 style={{textAlign: 'center'}}>Select a cat you would like to buy!</h2>
      <br></br>
      <Container>
      <Grid alignItems="center" spacing={10} container>
        {cats &&
          cats.map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat.id}>
              <CatCard cat={cat} user={user} />
            </Grid>
          ))}
      </Grid>
      </Container>
    </>
  );
}
