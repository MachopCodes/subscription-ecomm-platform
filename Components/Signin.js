import { signin } from 'next-auth/client';
import React from 'react';

const SignIn = () => {
  return (
        <>
            <a
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signin();
              }}
            >
              <button className="signInButton">Sign in with Google</button>
            </a>
               <style jsx>{`
               .signInButton {
                 background-color: #1eb1fc;
                 color: #fff;
                 border: none;
                 border-radius: 4px;
                 cursor: pointer;
                 font-size: 1rem;
                 padding: 0.5rem 1rem;
               }
               .signInButton:hover {
                 background-color: #1b9fe2;
               }
             `}</style>
             </>
          )
};

export default SignIn;