import { useState , FunctionComponent} from 'react';
import { useAuth } from '../../AuthContext';
import styles from './login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';


export const Login: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null); // Add state for login error
  const { signIn } = useAuth();
  const navigate = useNavigate(); // Get the history object


  const handleLogin = async () => {
    let u = null;
    try {
      u = await signIn(username, password);
      navigate('/'); // Redirect to home page
      
    }
    catch (error: any) {
      if (!u) {
        setLoginError('Invalid username or password');
      }
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
      <p>Don't have an account? <Link to="/register" className={styles.backToRegister}>Register</Link></p> {/* Add link */}
    </div>
  );
};