import React, { FunctionComponent, useState } from 'react';
import styles from './register.module.scss';
import { Auth } from 'aws-amplify'; // Import Auth from Amplify
import { Link } from 'react-router-dom';


export const Register: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState<string | null>(null); // State for registration error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setRegistrationError("Passwords don't match");
      return;
    }

    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log('User registration successful');
      // Redirect or show success message
    } catch (error: any) {
      console.error('Error registering user', error);
      setRegistrationError(error.message); // Set error message
      console.log(registrationError);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      {registrationError && <p className="error-message">{registrationError}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login" className={styles.backToLogin}>Back to Login</Link></p>
    </div>
  );
};