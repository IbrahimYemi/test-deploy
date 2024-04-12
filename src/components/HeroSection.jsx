const HeroSection = () => {
  return (
    <div className="bg-white-wine md:py-12 md:px-24 lg:px-32 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <img
          src="https://burst.shopifycdn.com/photos/cute-couple-piggypack.jpg?width=1000&format=pjpg&exif=0&iptc=0"
          alt="Wedding Couple"
          className="rounded-lg shadow-lg md:h-[70vh] w-auto"
        />
      </div>
      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#d3a755]">
          Thank You for Being a Part of Our Special Day!
        </h1>
        <p className="text-lg mb-6">
          We are incredibly grateful for your presence at our Aqdun Nikkah. Your
          love and support mean the world to us.
        </p>
        <p className="text-lg mb-6">
          We invite you to view our Aqdun Nikkah gallery and relive the beautiful
          moments we shared on this joyous occasion...
        </p>
        <a
          href="/gallery"
          className="bg-peach text-red-800 rounded-md px-6 bg-white shadow-md py-4 inline-block hover:bg-[#d3a755] transition duration-300"
        >
          View Gallery
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
