import ItemsListContainer from "@/components/ItemsListContainer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Lost & Found</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with people who found your lost items or help others find
            their belongings.
          </p>
        </div>

        <ItemsListContainer />
      </div>
    </div>
  );
};

export default Home;
