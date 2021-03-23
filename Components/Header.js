import Link from 'next/link';
import { signout, useSession } from 'next-auth/client';
import React from 'react';
import SignIn from './Signin'
import SubscriptionModal from './SubscriptionModal'

const Header = ({ user, subscription }) => {
  const [session, loading] = useSession();
  return (
    <header>
      <nav>
      <Link href="/">
          <a className="logo">
            <span style={{ color: '#f06292' }}>C</span>
            <span style={{ color: '#f06292' }}>P</span>
          </a>
        </Link>
        <p>
          {!session && <SignIn />}
          {session && (
            <>
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className="avatar"
              />
              {subscription 
              ? (
                <Link href={`/my-subscription`} >
                  <button className="cartButton">
                    {subscription.subscription} Plan</button>
                </Link>
              ) : <SubscriptionModal user={user} />}
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
          background-color: white;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 5;
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
        .signOutButton {
            background-color: #333;
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
        .signOutButton:hover {
          background-color: #555;
        }
      `}</style>
    </header>
  );
};

export default Header;