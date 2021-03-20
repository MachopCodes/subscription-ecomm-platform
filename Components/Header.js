import Link from 'next/link';
import axios from 'axios'
import { signin, signout, useSession } from 'next-auth/client';
import React, { useState, useEffect } from 'react';

const Header = ({ user, setUser }) => {
  const [session, loading] = useSession();
  const [subscription, setSubscription] = useState()

  const fetchSubscriptions = async () => {
    const result = await axios.get(`/api/subscription/${user}`);
    setSubscription(result.data)
  };

  useEffect(() => session && setUser(session.user.email), [session])
  useEffect(() => user && fetchSubscriptions(), [user])
  console.log('sub', subscription)

  return (
    <header>
      <nav>
      <Link href="/">
          <a className="logo">
            <span style={{ color: '#f06292' }}>C</span>
            <span style={{ color: '#29b6f6' }}>A</span>
            <span style={{ color: '#8bc34a' }}>T</span>
            <span style={{ color: '#f06292' }}>P</span>
            <span style={{ color: '#29b6f6' }}>O</span>
            <span style={{ color: '#f06292' }}>R</span>
            <span style={{ color: '#29b6f6' }}>I</span>
            <span style={{ color: '#8bc34a' }}>U</span>
            <span style={{ color: '#f06292' }}>M</span>
          </a>
        </Link>
        <p>
          {!session && (
            <a
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signin();
              }}
            >
              <button className="signInButton">Sign in</button>
            </a>
          )}
          {session && (
            <>
              <Link href="/profile">
                <a>
                  <span
                    style={{ backgroundImage: `url(${session.user.image})` }}
                    className="avatar"
                  />
                </a>
              </Link>
              <span className="email">Hi {session.user.name}!</span>
              {subscription && (
                <Link href={`/subscription/${subscription._id}`} >
                  <button className="cartButton">My Subscription</button>
                </Link>
              )}
              <a
                href="/api/auth/signout"
                onClick={(e) => {
                  e.preventDefault();
                  signout();
                }}
              >
                <button className="signOutButton">Sign out</button>
              </a>
            </>
          )}
        </p>
      </nav>
      <style jsx>{`
        header {
          border-bottom: 1px solid #ccc;
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        .logo {
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 600;
        }
        .avatar {
          border-radius: 2rem;
          float: left;
          height: 2.2rem;
          width: 2.2rem;
          background-color: white;
          background-size: cover;
          border: 2px solid #ddd;
        }
        .email {
          margin-right: 1rem;
          margin-left: 0.25rem;
          font-weight: 600;
        }
        .signInButton {
          background-color: #1eb1fc;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.5rem 1rem;
        }
        .signOutButton {
            background-color: #8bc34a;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            padding: 0.5rem 1rem;
          }
          .cartButton {
            background-color: #f06292;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            padding: 0.5rem 1rem;
          }
        .signInButton {
          background-color: #1eb1fc;
        }
        .signInButton:hover {
          background-color: #1b9fe2;
        }
        .signOutButton {
          background-color: #333;
        }
        .signOutButton:hover {
          background-color: #555;
        }
      `}</style>
    </header>
  );
};

export default Header;