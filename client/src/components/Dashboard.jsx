import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <Link to="/create">Create event</Link>
    <ul>
      <li><Link to="/event/1">Event 1</Link></li>
      <li><Link to="/event/2">Event 2</Link></li>
      <li><Link to="/event/3">Event 3</Link></li>
    </ul>
  </div>
);

export default Dashboard;
