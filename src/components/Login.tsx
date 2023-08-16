import React, { useState } from 'react';
import { Auth } from 'aws-amplify'; // Import Auth from Amplify
import { useAuth } from '../AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await Auth.signIn(username, password); // Use Auth.signIn from Amplify
      signIn(username, password); // Update authentication context
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;