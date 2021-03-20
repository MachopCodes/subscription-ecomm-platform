import React, { useState } from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero"

export default function Index() {
  const [user, setUser] = useState();
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Hero user={user} />
    </>
  );
}
