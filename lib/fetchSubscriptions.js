import axios from "axios";

const fetchSubscriptions = async (user) => {
    const subscription = await axios.get(`/api/subscription/${user}`)
    console.log('new function', subscription)
    return subscription.data
  };

  export default fetchSubscriptions