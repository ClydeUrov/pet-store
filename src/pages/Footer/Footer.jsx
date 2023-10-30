import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
import Logo from '../../icons/logo'
import { AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { LiaTwitterSquare } from 'react-icons/lia';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-all">
        <div className="footer-info">
          <div className="logo-column">
            <Link className="logo-container" to="/">
              <Logo />
            </Link>
            <ul>
              <li>Kyiv, Illienko Street, 36</li>
              <li>+ 38 (044) 342-12-12</li>
              <li>+ 38 (044) 342-12-22</li>
            </ul>
          </div>
          <div className="footer-column">
            {/* Навігація */}
            <h4>Navigation</h4>
            <ul className="footer-navigation">
              <li>
                <Link to="/catalogue">Catalogue</Link>
              </li>
              <li>
                <Link to="/signup">Account</Link>
              </li>
              <li>
                <Link to="/favourites">WishList</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              {/* Додайте більше посилань, які потрібні */}
            </ul>
          </div>
          <div className="footer-column">
            {/* Legal */}
            <h4>Legal</h4>
            <ul className="footer-navigation">
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Cookies</a>
              </li>
              <li>
                <a href="/">Terms of use</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <ul className="footer-social">
              {/* Додайте посилання на соцмережі */}
              <li className="footer-social-item"><a className="footer-social-link"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineFacebook size={24} />
              </a></li>
              <li className="footer-social-item"><a className="footer-social-link"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              ><AiOutlineInstagram size={24} />
              </a></li>
              <li className="footer-social-item"><a className="footer-social-link"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiaTwitterSquare size={26} />
              </a></li>

              {/* Додайте більше посилань на соцмережі */}
            </ul>
          </div>
        </div>
        <p className="reserved">ALL RIGHTS RESERVED (C) PAWSOME 2023</p>
      </div>
    </footer>
  )
}

export default Footer
