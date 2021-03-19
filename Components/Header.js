import Link from 'next/link';

const Header = () => {
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
          <button className="aboutButton">About</button>
          <button className="signInButton">Sign in</button>
          <button className="cartButton">My Cart</button>
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
          max-width: 42rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        .logo {
          text-decoration: none;
          font-size: 1.5rem;
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
        .aboutButton {
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
        .signInButton:hover {
          background-color: #1b9fe2;
        }
      `}</style>
    </header>
  );
};

export default Header;