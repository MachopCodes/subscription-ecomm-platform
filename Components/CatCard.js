import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles, CardMedia, CardContent } from "@material-ui/core";
import { Card, CardActionArea, CardActions } from "@material-ui/core";
import { useSession } from 'next-auth/client';

const useStyles = makeStyles({
  media: { height: 240 },
});

const catnames = [
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

const CatCard = ({ cat, user }) => {
  const [ session, loading ] = useSession();
  const classes = useStyles();
  const cost = ((Math.random()*100) + 80).toFixed(2)
  const catname = catnames[(Math.floor(Math.random()*100))]

  const handleClick = async (event) => {
    event.preventDefault()
    const data = { user, catname, cost }
    try {
        await axios.post("/api/cart", { data });
        router.push("/");
      } catch (errors) {
        console.log(errors);
      }
    };

  return (
      <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={cat.url}
          title={cat.id}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {catname}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        >${cost}
        </Typography>
        <Button size="small" color="primary" onClick={handleClick}>
          Add to Cart
        </Button> 
      </CardActions>
    </Card>
  )
}

export default CatCard