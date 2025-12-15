import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Schema Validation
const loginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập Username"),
  password: z.string().min(1, "Vui lòng nhập Password"),
});

const LoginPage = () => {
  const [serverError, setServerError] = useState(''); // Lỗi từ API (sai pass, user k tồn tại)
  const { login } = useAuth();
  const navigate = useNavigate();

  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // isSubmitting tự động true khi đang chạy onSubmit
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Validation đã OK
  const onSubmit = async (data) => {
    setServerError('');
    
    // Gọi login từ AuthContext
    const result = await login(data.username, data.password);
    
    if (result.success) {
      navigate('/');
    } else {
      if (result.message.includes('Invalid credentials') || result.message.includes('Invalid')) {
        setServerError("Tên đăng nhập hoặc mật khẩu không đúng!");
      } else {
        const cleanMessage = result.message.replace(/[{}"']/g, ''); 
        setServerError(cleanMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center flex justify-center items-center gap-2">
          <LogIn className="text-blue-500" /> Đăng nhập
        </h2>

        {serverError && (
          <div className="bg-blue-500/20 border border-blue-500 text-blue-200 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* USERNAME */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">Username</label>
            <input 
              {...register("username")} // Đăng ký input với hook form
              type="text" 
              className={`w-full bg-gray-900 border ${errors.username ? 'border-blue-500' : 'border-gray-600'} text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 transition`}
              placeholder="Nhập username"
            />
            {errors.username && <p className="text-blue-400 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input 
              {...register("password")}
              type="password" 
              className={`w-full bg-gray-900 border ${errors.password ? 'border-blue-500' : 'border-gray-600'} text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 transition`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-blue-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} // Disable khi đang submit
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;