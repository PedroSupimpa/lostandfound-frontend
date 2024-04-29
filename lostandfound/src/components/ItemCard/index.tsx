import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ItemCard = () => {
  //const isMobile = window.innerWidth < 640;
  
  return (
    <div>
      <Card className="m-6 flex md:container md:mx-auto">
      <CardContent className="relative bg-green-500 w-full  md:w-[15vw]  md:pb-[10vw] overflow-hidden">
    <img src="https://img.olx.com.br/images/47/474498270049169.jpg" alt="" className="absolute top-0 left-0 h-full w-full object-cover" />
  </CardContent>
        <div className="m-2">
          <CardHeader className="h-1/3">
            <CardTitle>Item Title</CardTitle>
          </CardHeader>
          <CardDescription className="overflow-hidden h-1/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            minus officiis illum ab rerum, voluptas cumque ex eos culpa hic?
            Omnis, ad voluptatibus est saepe nulla quidem adipisci accusamus
            ipsam.
          </CardDescription>
          <div className="px-5 flex items-baseline justify-end gap-4 h-1/3">
            <p>category</p>
            <p>City-State</p>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default ItemCard;
