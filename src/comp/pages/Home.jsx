import heroImg from "../../assets/imgs/HeroImg/hero.png";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div>
      {/* hero section */}
      <div className="my-4 py-4 flex flex-col lg:flex-row items-center">
        <div className=" flex flex-col items-center space-y-6">
          <h1 className="text-5xl font-bold text-center">
            Elevate Daily Step, Uniquely Yours.
          </h1>
          <div>
            <p className="text-center text-gray-500">
              Step into a world where every pair is crafted with a perfect blend
              of comfort and style, transforming your daily stride into a
              statement
            </p>
          </div>
          <Button className="py-2 px-8 bg-[#e63946] hover:bg-[#DA1B2B]">
            Button
          </Button>
        </div>
        <div className="hidden lg:inline w-2/4">
          <img src={heroImg} className="w-4/5" />
        </div>
      </div>
      {/* features section */}
    </div>
  );
}

export default Home;
