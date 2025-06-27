import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import IeltsLogo from '../assets/ielts.png';

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  // Xử lý đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/userpage');
    } else {
      setError('Sai tài khoản hoặc mật khẩu!');
    }
  };

  // Xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      alert('Đăng ký thành công! Bạn có thể đăng nhập.');
      setIsRegister(false);
      setUsername('');
      setPassword('');
    } else {
      setError(data.message || 'Đăng ký thất bại!');
    }
  };

  return (
    <div className="bg-gray-100 flex fixed m-0 p-0 top-0 left-0 w-[100%] h-[100%]">
      <div className="w-[50%] h-screen ">
        <img src={IeltsLogo} alt="Placeholder Image" className="object-cover w-full h-full"/>
      </div>
      <div className=" w-[50%] ">
        <h1 className="text-2xl font-semibold mb-4 text-red-600">{isRegister ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={isRegister ? handleRegister : handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-[50%] border border-gray-300 rounded-md py-2 px-3 text-black focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 ">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-[50%] border border-gray-300 text-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          {isRegister ? (
            <span>
              Đã có tài khoản?{' '}
              <button className="hover:underline" onClick={() => { setIsRegister(false); setError(''); }}>
                Đăng nhập tại đây
              </button>
            </span>
          ) : (
            <span>
              Chưa có tài khoản?{' '}
              <button className="hover:underline" onClick={() => { setIsRegister(true); setError(''); }}>
                Đăng ký tại đây
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;