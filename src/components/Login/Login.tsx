// src/components/Login.tsx
import { React, useState , FunctionComponent} from 'react';
import { Auth } from 'aws-amplify'; // Import Auth from Amplify
import { useAuth } from '../../AuthContext';

import styles from './login.module.scss';


export const Login: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null); // Add state for login error
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(username, password);
    } catch (error) {
      alert('Invalid username or password');
      setLoginError('Invalid username or password'); // Set error message
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginFont}>Login</h2>
       {/* Display error message */}
       {loginError && <p className={styles.errorMessage}>{loginError}</p>}
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Username</label>
        <input
          type="text"
          className={styles.inputField}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Password</label>
        <input
          type="password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.loginButton} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};