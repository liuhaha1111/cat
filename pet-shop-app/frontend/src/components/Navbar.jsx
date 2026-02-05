import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">萌宠之家</Link>
        <ul className="nav-links">
          <li><Link to="/">首页</Link></li>
          <li><Link to="/appointment">预约服务</Link></li>
          <li><Link to="/pet-shop">宠物购买</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;