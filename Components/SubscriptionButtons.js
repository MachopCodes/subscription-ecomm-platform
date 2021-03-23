import React from "react";
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios'

export default function SubscriptionCard({ id }) {
    const router = useRouter()
    const handleDelete = async () => {
      console.log('inside delete: ', id)
      const alert = confirm(
        "Are you sure you want to delete your subscription?"
      );
      if (alert) {
        try {
          axios.delete(`/api/subscription/${id}`);
          router.push("/");
        } catch (err) {
          console.log(err.request);
        }
      }
    };

  return ( 
      <>
        <button size="small" color="primary">
            Change Plan
        </button> 
        <button size="small" color="primary" onClick={handleDelete}>
            Delete Plan
        </button>
        <Link href={`/select-your-cats`} >
            <button size="small" color="primary">
                Pick New Cats
            </button>
        </Link>
    </>
    )
}
