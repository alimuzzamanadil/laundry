import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { AuthForm } from '../components/AuthForm';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(form);
      navigate('/orders/new');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <AuthForm title="Create Account" subtitle="Join FreshPress for fast doorstep laundry" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
            {error}
          </div>
        )}
        <Input
          label="Full Name"
          id="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
        />
        <Input
          label="Email Address"
          id="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
        />
        <Input
          label="Phone Number"
          id="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
        />
        <Input
          label="Password"
          id="password"
          type="password"
          required
          value={form.password}
          onChange={handleChange}
          placeholder="At least 6 characters"
        />
        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </Button>
        <p className="text-center text-xs text-slate-500 mt-4">
          Already registered?{' '}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </AuthForm>
    </div>
  );
};
