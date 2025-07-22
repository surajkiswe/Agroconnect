import React, { useState } from 'react';

export default function FarmerLogin() {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log('UID:', uid);
    console.log('Password:', password);

    // Later: call backend API here using axios
  };

  return (
    <div>
      <h1>Farmer Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter UID:</label><br />
        <input
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          required
        /><br /><br />

        <label>Enter Password:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
