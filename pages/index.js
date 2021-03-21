import React, { useState } from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero"
import { makeStyles } from "@material-ui/core";

export default function Index() {
  const useStyles = makeStyles((theme) => ({
    background: {
      backgroundImage: "url(https://fsb.zobj.net/crop.php?r=lcH6WsBNq_DsVqxgauVr2rgbho_Kx7v3_rK9jMovrdIcV01qOrU2x-ypfh4whSbi7XQ8rPPAdRl2VeoZJkYq31fiC1F5yMab7Av1pyrApZ5Pukg1SCmSrmNCq9wOcf0YB7yvrWR-t3pD1uAw)",
      backgroundSize: "425px",
      height: "600px"
    },
  }));
  const classes = useStyles();
  const [user, setUser] = useState();
  return (
    <div className={classes.background}>
      <Header user={user} setUser={setUser} />
      <Hero user={user} />
    </div>
  );
}
