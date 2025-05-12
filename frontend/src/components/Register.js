import React, { useState, useContext } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const res = await API.post('/auth/register', { name, email, password });
      console.log('Registration successful:', res.data);

      if (!res.data?.token) {
        throw new Error('Registration failed. No token received.');
      }

      localStorage.setItem('token', res.data.token);
      login(res.data.token, res.data.isAdmin);

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Server error during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3>Register</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn btn-success w-100" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="mt-3 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-primary text-decoration-none">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
