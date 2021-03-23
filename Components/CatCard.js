import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles, CardMedia, CardContent } from "@material-ui/core";
import { Card, CardActionArea, CardActions } from "@material-ui/core";

const useStyles = makeStyles({
  media: { height: 240 },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  img: {
    marginTop: "-15px",
    height: "60px"
  }
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

const CatCard = ({ cat, subscription }) => {
  const [selected, setSelected] = useState(false)
  const [catname, setcatname] = useState()
  const [cost, setCost] = useState()
  const classes = useStyles();

  useEffect(() => {
    setcatname(catnames[(Math.floor(Math.random()*100))])
    setCost(((Math.random()*100) + 80).toFixed(2))
  }, [])
  
  const handleClick = async (event) => {
    event.preventDefault()
    const item = { catname, cost }
    try {
      await axios.post(`/api/subscription/${subscription._id}`, { item });
        setSelected(!selected)
        setCount(count -1)
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
        <CardContent className={classes.content}>
          <Typography variant="h5" component="span">{catname}</Typography>
          <Typography variant="h5" component="span">${cost}</Typography>
            <img
              className={classes.img}
              onClick={handleClick}
              src={selected ? "/img/catgreen.png" : "/img/catblank.png"}
            />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CatCard