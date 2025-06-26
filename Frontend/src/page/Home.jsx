import { useNavigate } from 'react-router-dom';
import IeltsLogo from '../assets/ielts.png';
import SideContainer from '../component/SideContainer';
function Home() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trang reload
    navigate('/userpage'); // Chuyển trang sang /SearchBar
  };

    return (
        <div className="bg-gray-100 flex fixed m-0 p-0 top-0 left-0 w-[100%] h-[100%]">
   
<div className="w-[50%] h-screen ">
  <img src={IeltsLogo} alt="Placeholder Image" className="object-cover w-full h-full"/>
</div>

<div className=" w-[50%] ">
  <h1 className="text-2xl font-semibold mb-4 text-red-600">Login</h1>
  <form onSubmit={handleSubmit}>
    
    <div className="mb-4">
      <label for="username" className="block text-gray-600">Username</label>
      <input type="text" id="username" name="username" className="w-[50%] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
    </div>
    
    <div className="mb-4">
      <label for="password" className="block text-gray-600 ">Password</label>
      <input type="password" id="password" name="password" className="w-[50%] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
    </div>
    
    <div className="mb-4 flex items-center">
      <input type="checkbox" id="remember" name="remember" className="text-blue-500"/>
      <label for="remember" className="text-gray-600  ml-2">Remember Me</label>
    </div>
    
    <div className="mb-6 text-blue-500">
      <a href="#" className="hover:underline">Forgot Password?</a>
    </div>
    
    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
  </form>
  
  <div className="mt-6 text-blue-500 text-center">
    <a href="#" className="hover:underline">Sign up Here</a>
  </div>
</div>
</div>
    )
}

export default Home;