import FeatureHome from "@/components/blog/FeatureHome";
import Banner from "@/components/home/Banner";
import Home from "@/components/home/Home";

const fetchHomeData = async () => {
  const response = await fetch(
    "http://blog-api.rimdasilva.com/api/post/home?api-version=1.0",
    { cache: "no-store" } // Tùy chọn cache: "no-store" để đảm bảo dữ liệu luôn mới.
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await response.json();
  return result.data;
};

const HomePage = async () => {
  const data = await fetchHomeData();

  return (
    <div className="container-rds">
      {/* <FeatureHome data={data} /> */}
      <Banner />
      <Home data={data} />
    </div>
  );
};

export default HomePage;
