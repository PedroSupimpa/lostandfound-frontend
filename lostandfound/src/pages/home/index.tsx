import {  useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup'); 
  };
  return (
    <div className="flex justify-end px-3 pt-2">

  <button onClick={handleClick}
    className="bg-emerald-500 rounded font-semibold text-white h-10 w-fit p-2 hover:bg-emerald-600">
      Go to Signup
    </button>
      </div>
  );
  
};

export default Home;