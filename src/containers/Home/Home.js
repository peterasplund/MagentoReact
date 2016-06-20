import React from 'react';
import { Link } from 'react-router';

export default () =>
  <div>
    <h1>Home</h1>
    <br />
    <h2>CMS-sidor</h2>
    <ol>
      <li><Link to="/cms/company">Company</Link></li>
      <li><Link to="/cms/customer-service">Customer Service</Link></li>
      <li><Link to="/cms/about-magento-demo-store">About Us</Link></li>
      <li><Link to="/cms/reward-points">Reward Points</Link></li>
    </ol>
  </div>;
