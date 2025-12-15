import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Định nghĩa Schema
const registerSchema = z.object({
  username: z.string().min(3, "Username tối thiểu 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  phone: z.string().regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số").min(10, "SĐT tối thiểu 10 số"),
  dob: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', "Vui lòng chọn ngày sinh"),
});

const RegisterPage = () => {
  const [serverError, setServerError] = useState('');
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setServerError('');
    const result = await registerAuth(data);

    if (result.success) {
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate('/login');
    } else {
      setServerError(result.message);
    }
  };

  // Helper class cho input để đỡ lặp code
  const inputClass = (error) => `w-full bg-gray-900 border ${error ? 'border-red-500' : 'border-gray-600'} text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 transition`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center flex justify-center items-center gap-2">
          <UserPlus className="text-blue-500" /> Đăng ký
        </h2>

        {serverError && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* USERNAME */}
            <div>
              <label className="block text-gray-400 text-sm mb-1">Username</label>
              <input {...register("username")} type="text" className={inputClass(errors.username)} />
              {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input {...register("email")} type="email" className={inputClass(errors.email)} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input {...register("password")} type="password" className={inputClass(errors.password)} />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PHONE */}
             <div>
              <label className="block text-gray-400 text-sm mb-1">Phone</label>
              <input {...register("phone")} type="tel" className={inputClass(errors.phone)} />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* DOB */}
            <div>
              <label className="block text-gray-400 text-sm mb-1">Date of Birth</label>
              <input {...register("dob")} type="date" className={inputClass(errors.dob)} />
              {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob.message}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang tạo tài khoản...' : 'Đăng ký'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;