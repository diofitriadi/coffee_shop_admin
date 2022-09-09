const Footer = () => {
  return (
    <>
      <div className=" flex flex-row p-5 my-20 mx-24 w-11/12">
        <div className="w-3/5">
          <div className="flex flex-row mb-7">
            <img className="mr-4" src="/icons/coffeLogo.svg" />
            <div className="flex flex-row w-full items-center ">
              <h1>Coffee Shop</h1>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <p className="">
                Coffee Shop is a store that sells some
                <br /> good meals, and especially coffee. We provide
                <br /> high quality beans
              </p>
              <div className="flex flex-row mt-5 ">
                <img className="mt-1" src="/icons/facebook.svg" />
                <img className="mt-1" src="/icons/twitter.svg" />
                <img className="mt-1" src="/icons/instagram.svg" />
              </div>
            </div>
            <div>©2020 CoffeeStore</div>
          </div>
        </div>
        <div className="w-1/5">
          <div className="flex flex-row">
            <p className="">Product</p>
          </div>
          <div className="flex flex-col leading-7 mt-9">
            <div>
              <p className="">Download</p>
              <p>Pricing</p>
              <p>Locations</p>
              <p>Countries</p>
              <p>Blog</p>
            </div>
          </div>
        </div>
        <div className="w-1/5">
          <div className="flex flex-row">
            <p className="">Engage</p>
          </div>
          <div className="flex flex-col leading-7 mt-9">
            <div>
              <p className="">Coffee Shop ?</p>
              <p className="">FAQ</p>
              <p className="">About Us</p>
              <p className="">Privacy Policy</p>
              <p className="">Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer
