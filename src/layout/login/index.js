import React from "react";
import Layout from "../../components/Layout"
import Link from "next/link";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from "../../redux/action/auth"
import { useRouter } from 'next/router'
import Swal from "sweetalert2";

const LoginForm = () => {
  const { data, error, loading, isLogin} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  })

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(Login(formLogin))
  }

  useEffect(() => {
    if (isLogin === true && data?.role === 'admin' ) {
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'Login Success',
      })
      router.push(`/dashboard`)
    }
    else {
      router.push('/')
    }
  }, [isLogin])

  useEffect (() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
  }, [error])

  return (
    <>
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-3/6">
          <img className="absolute h-full w-3/6" src="/img/login-left.jpg"/>
          <div className="relative justify-center items-center h-full px-20 bg-gray-900 bg-opacity-40 z-50">
          </div>
        </div>
        {/* // Right Login */}
        <div className="flex w-full max-w-md px-6 mx-auto h-5/6 my-auto lg:w-3/5">
          <div className="flex-1">
            <div className="flex flex-row items-center ">
            </div>
            <div>
              <h2 className="text-4xl text-center text-[#6A4029] mt-12" style={{fontWeight: 900}}>Coffee Shop</h2>
              <p className="mt-2 text-gray-500 text-center font-semibold">This is the admin page</p>
            </div>
            <div className="mt-10">
              <form onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email"
                    className="block mb-2 text-sm text-[#4F5665] font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email adress"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-sm bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setFormLogin ((prevData) => ({
                      ...prevData,
                      email: e.target.value
                    }))}
                  />
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-[#4F5665] font-bold"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-sm bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setFormLogin ((prevData) => ({
                      ...prevData,
                      password: e.target.value
                    }))}
                  />
                </div>
                <div className="my-10 ">
                  <button 
                    className="w-full px-4 py-3 tracking-wide text-[#6A4029] hover:text-[#FFBA33] font-bold transition-colors duration-200 transform bg-[#FFBA33] rounded-md hover:bg-[#6A4029] focus:outline-none focus:bg-[#FFBA33] focus:ring focus:ring-[#FFBA33] focus:ring-opacity-50"
                    onClick={handleLogin}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
