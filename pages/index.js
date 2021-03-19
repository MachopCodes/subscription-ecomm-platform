import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Header from "../Components/Header"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
});

export default function Index() {
  const [cats, setCats] = useState("");
  const apiUrl = "https://api.thecatapi.com/v1/images/search?mime_types=gif";
  const apiKey = "a0769af0-040e-4860-855b-912d506455e6";
  const classes = useStyles();

  const catNames = [
    "Bella",
    "Kitty",
    "Lily",
    "Charlie",
    "Lucy",
    "Leo",
    "Milo",
    "Jack",
    "Nala",
    "Sam",
    "Simba",
    "Chloe",
    "Baby",
    "Sadie",
    "Ziggy",
    "Princess",
    "Salem",
    "Sophie",
    "Shadow",
    "Izzy",
    "Cleo",
    "Boots",
    "Loki",
    "Daisy",
    "Cooper",
    "Missy",
    "Oreo",
    "Tiger",
    "Lulu",
    "Tucker",
    "Jasmine",
    "Jackson",
    "Murphy",
    "Pepper",
    "Fiona",
    "Jax",
    "Frank",
    "Romeo",
    "Millie",
    "Abby",
    "Minnie",
    "Olivia",
    "Lola",
    "Athena",
    "Teddy",
    "Ruby",
    "Oscar",
    "Bear",
    "Moose",
    "Pumpkin",
    "Willow",
    "Mittens",
    "Coco",
    "Penny",
    "Sammie",
    "Theo",
    "Kali",
    "Bob",
    "Clyde",
    "Tigger",
    "Buddy",
    "Joey",
    "Emma",
    "Ollie",
    "Toby",
    "George",
    "Marley",
    "Bagheera",
    "Belle",
    "Binx",
    "Boo",
    "Ash",
    "Scout",
    "Gizmo",
    "Louie",
    "Ginger",
    "Midnight",
    "Mochi",
    "Blu",
    "Frankie",
    "Rosie",
    "Ella",
    "Calvin",
    "Lucky",
    "Hazel",
    "Thor",
    "Gus",
    "Maggie",
    "Piper",
    "Harley",
    "Rocky",
    "Peanut",
    "Mimi",
    "Kitten",
    "Remi",
    "Annie",
    "Sunny",
    "Layla",
    "Riley",
    "Walter"
]
const cost = Math.random()*100

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get(
        apiUrl + "&limit=20"
      );
      setCats(res.data);
    };
    fetchCats();
  }, []);

  // cats.map(cat => {
  //     console.log(cat)
  // })
  return (
    <>
    <Header/>
      <h1 style={{textAlign: 'center'}}>Welcome to the Catporium!</h1>
      <h2 style={{textAlign: 'center'}}>Select a cat you would like to buy!</h2>
      <br></br>
      <Container>
      <Grid alignItems="center" spacing={10} container>
        {cats &&
          cats.map((cat) => (
            <Grid item xs={4} key={cat.id}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={cat.url}
                    title={cat.id}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {catNames[(Math.floor(Math.random()*100))]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >${((Math.random()*100) + 80).toFixed(2)}
                  </Typography>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      </Container>
    </>
  );
}
