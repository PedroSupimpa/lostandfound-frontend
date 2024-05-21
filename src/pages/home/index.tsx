import ItemsListContainer from "@/components/ItemsListContainer";



const Home = () => {

  const isMobile = window.innerWidth < 640;
  return (

    <div className="flex justify-center p-6">
      <div className={`${isMobile ? "w-full" : "w-3/5"}`}>
      <ItemsListContainer/>
      </div>
    </div>
   
  );
  
};

export default Home;