import Link from "next/link";


const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-around py-4 mx-auto">
        <div className="h-8 flex items-center">
          <Link href='/'>
						<img
            className="mt-2 mr-4"
            src="/icons/coffeLogo.svg"
						/>
					</Link>
          Coffee Shop
        </div>
        <div className="flex items-center">
					<div className="text-orange-900 px-3 py-2 text-md font-semibold ">
						<Link href='/'aria-current="page">Dashboard</Link>
					</div>
        </div>
        <div className="space-x-5 flex">
          <div className="">
            <Link href='/'>
              <button>Logout</button>
            </Link>
          </div>          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
