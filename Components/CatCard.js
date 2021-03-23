import axios from "axios";
import React, { useState, useEffect } from "react";
import { Typography, makeStyles  } from "@material-ui/core";
import { Card, CardMedia, CardContent, CardActionArea } from "@material-ui/core";

const useStyles = makeStyles({
  media: { height: 240 },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  img: {
    marginTop: "-5px",
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

const CatCard = ({ cat, subscription, count, setCount, itemArray, setItemArray }) => {
  const [catname, setcatname] = useState()
  const [cost, setCost] = useState()
  const classes = useStyles();
  const item = { catname, cost }  
  const index = itemArray.findIndex(i => i.cost === item.cost)

  const needMoreCats = () => {
    if((subscription.subscription === 'Purrrfect' && itemArray.length < 10) || (subscription.subscription === 'Basic' && itemArray.length < 5)) {
      return true
    }
  }
  
  useEffect(() => {
    setcatname(catnames[(Math.floor(Math.random()*100))])
    setCost(((Math.random()*100) + 80).toFixed(2))
    if(subscription) itemArray = subscription.items
  }, [subscription])

  const handleClick = async (event) => {
    event.preventDefault()
    // the index will return -1 if the selected cat is not in the array of cats
    // in which case, it's added to the server
    if (index === -1) {
      try {
        await axios.post(`/api/item/add/${subscription._id}`, { item });
        // needMoreCats checks if the user is at their subscription limit
        // if not at the limit, push the item into the array and just decrease the count
        if(needMoreCats()) {
          setItemArray([...itemArray, item])
          setCount(count - 1)
        } else {
          // if full, make a duplicate array that we can mutate
          // remove the last item and push the new item and set the array to the new object
          await axios.post(`/api/item/add/${subscription._id}`, { item });
          let newArray = [...itemArray]
          newArray.splice(newArray.length - 1, 1, item)
          setItemArray(newArray)
         }
        } catch (errors) {
          console.log(errors);
        }
      } else {
        // if the index is not -1, the user is selecting a cat in the array already (deselecting) 
        // send to the subtract api call and splice the object out of the array.
        try {
          await axios.post(`/api/item/subtract/${subscription._id}`, { item });
          let newArray = [...itemArray]
          newArray.splice(index, 1)
          setItemArray(newArray)
          setCount(count + 1)
        } catch (errors) {
          console.log(errors);
        }
      }
    }

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
              src={index !== -1 ? "/img/catgreen.png" : "/img/catblank.png"}
            />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CatCard