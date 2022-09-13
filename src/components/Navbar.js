import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import {Logout} from "../redux/action/auth";
import Swal from "sweetalert2";

const Navbar = () => {
  const {isLogin} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <>
      <nav className="flex w-full shadow-3xl shadow-3xl shadow-black items-center justify-between py-6 px-16 mx-auto">
        <div className="flex-1">
          <div className="flex flex-row items-center ">
            <img className="mt-2 mr-4" src="/icons/coffeeLogo.svg"/>
            <p className="text-[#0B132A] font-bold text-md">Coffee Shop Admin</p>
          </div>
        </div>
        <div className="space-x-5 flex">
          <div className="">
            <Link href='/'>
                {isLogin ? (
                  <button
                    className="w-full px-6 py-2 tracking-wide text-[#6A4029] hover:text-[#FFBA33] font-bold transition-colors duration-200 transform bg-[#FFBA33] rounded-md hover:bg-[#6A4029] focus:outline-none focus:bg-[#FFBA33] focus:ring focus:ring-[#FFBA33] focus:ring-opacity-50" 
                    onClick={()=> {
                    dispatch(Logout())
                    Swal.fire({
                      icon: 'success',
                      text:'Logout Success!'
                    })
                  }}>Logout</button>
                ) : (
                   ""
                )}
            </Link>
          </div>          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
