import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    dob: '' // YYYY-MM-DD
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await register(formData);

    if (result.success) {
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate('/login');
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1014] px-4 py-10">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center flex justify-center items-center gap-2">
          <UserPlus className="text-blue-500" /> Đăng ký
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Username</label>
              <input name="username" type="text" required onChange={handleChange} className="input-dark" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input name="email" type="email" required onChange={handleChange} className="input-dark" />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input name="password" type="password" required onChange={handleChange} className="input-dark" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="block text-gray-400 text-sm mb-1">Phone</label>
              <input name="phone" type="tel" required onChange={handleChange} className="input-dark" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Date of Birth</label>
              <input name="dob" type="date" required onChange={handleChange} className="input-dark" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mt-4 disabled:opacity-50"
          >
            {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
      
      {/* Helper style */}
      <style>{`
        .input-dark {
          width: 100%;
          background-color: #111827;
          border: 1px solid #4b5563;
          color: white;
          padding: 0.75rem;
          border-radius: 0.5rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-dark:focus {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;