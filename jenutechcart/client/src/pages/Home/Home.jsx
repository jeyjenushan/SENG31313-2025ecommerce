import Categories from "../../components/Layout/Categories";
import Hero from "../../components/Layout/Hero";
import ProductCarousel from "../../components/Layout/ProductCarousel";

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <ProductCarousel />
    </div>
  );
};

export default Home;
