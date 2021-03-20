import React from "react";
import { useRouter } from "next/router";

export default function SubscriptionForm({ user}) {
    const router = useRouter()
    return (
        <Formik
        initialValues={{ subscription }}
          onSubmit={async (values) => {
            const data = { subscription: values.subscription, user }
            try {
              await axios.post(`/api/subscription/${user}` , { data });
              router.push("/select-your-cats");
            } catch (errors) {
              console.log(errors);
            }
          }
        }
      >
        {({ values }) => (
          <Form>
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className={classes.radio}
            >
              <label>
                <Field type="radio" name="subscription" value="Basic" />
                Basic (5 cats per month)
              </label>
              <label>
                <Field
                  type="radio"
                  name="subscription"
                  value="Purrrfect"
                />
                Purrfect (10 cats per month with a 10% discount)
              </label>
            </div>
            <br></br>
            <div className={classes.buttonContainer}>
              <button type="submit" className={classes.subutton}>
                Pick my cats!
              </button>
            </div>
          </Form>
        )}
      </Formik> 
    )       
}