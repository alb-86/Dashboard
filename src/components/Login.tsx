import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');  
    }
  }, [user, navigate]);


  return (
    <div>
      <h2>Login</h2>
    </div>
  );
};

export default Login;
