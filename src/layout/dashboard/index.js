import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct } from "../../redux/action/addProduct";
import Layout from "../../components/Layout";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { sendError } from "next/dist/server/api-utils";

const Dashboard = () => {
  const { data: auth } = useSelector((state) => state.auth);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [refetch, setRefetch] = useState(false);

  const [query, setQuery] = useState({});
  const [search, setSearch] = useState("product_name");

  const { data: add } = useSelector((state) => state.addProduct);

  // Search
  const [getProduct, setGetProduct] = useState({
    loading: "false",
    results: {
      data: [],
    },
  });

  // Get
  useEffect(() => {
    const {
      product_name = "",
      categories_name = "",
      order = "product_name",
      sortBy = "ASC",
    } = query;
    setGetProduct((prevState) => ({
      ...prevState,
      loading: true,
    }));
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_URL_BE}/api/v1/product/?product_name=${product_name}&categories_name=${categories_name}&order=${order}&sortBy=${sortBy}`,
    }).then((res) => {
      setGetProduct({
        loading: false,
        results: res.data,
      });
    });
  }, [refetch, query, add]);

  // Add Product
  const { data, error, loading } = useSelector((state) => state.addProduct);
  const dispatch = useDispatch();
  const [formAdd, setFormAdd] = useState({});
  const [formEdit, setFormEdit] = useState({});

  const formData = new FormData();
  formData.append(
    "categories_id",
    formAdd.categories_id || formEdit.categories_id
  );
  formData.append(
    "product_name",
    formAdd.product_name || formEdit.product_name
  );
  formData.append(
    "product_price",
    formAdd.product_price || formEdit.product_price
  );
  formData.append(
    "product_desc",
    formAdd.product_desc || formEdit.product_desc
  );
  formData.append(
    "product_image",
    formAdd.product_image || formEdit.product_image
  );

  const handleAdd = (e) => {
    console.log(auth.token, "xixixi");
    e.preventDefault();
    setRefetch(!refetch);
    dispatch(AddProduct(formData, auth.token));
  };

  useEffect(() => {
    if (data) {
      console.log(data, "Data running");
      Swal.fire({
        icon: "success",
        text: "Data Successfully Added",
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Add Product Failed",
        text: "Please Try Again",
      });
    }
  }, [data, error]);

  // Update
  const handleUpdate = async (id) => {
    // console.log(formData.get("product_image"))
    // console.log(id, "tessss")
    try {
      const result = await axios({
        method: "PATCH",
        data: formData,
        url: `${process.env.NEXT_PUBLIC_URL_BE}/api/v1/product/${id}`,
        headers: {
          authorization: auth.token,
        },
      });
      if (result.data.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Data Successfully Updated",
        });
        setRefetch(!refetch); //refetch data
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Product Failed",
          text: "Please Try Again",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Product Failed",
        text: "Please Try Again",
      });
      console.log(err);
    }
  };

  // Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "DELETE",
          url: `${process.env.NEXT_PUBLIC_URL_BE}/api/v1/product/${id}`,
          headers: {
            authorization: auth.token,
          },
        }) 
        Swal.fire(
          'Deleted!', 
          'Your file has been deleted', 
          'success'
        )
        setRefetch(!refetch)
      }
    })
  }

  // Handle Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const detailsPerPage = 5;
  const pageVisited = pageNumber * detailsPerPage;

  const display = getProduct.results.data;
  const displayProduct = display
    .slice(pageVisited, pageVisited + detailsPerPage)
    .map((product, index) => {
      return (
        <tbody className="border-2 text-center bg-white" key={index}>
          <tr key={index} className="border-2">
            <td className="border-2 font-bold">{index + 1}</td>
            <td className="border-2">{product.categories_name}</td>
            <td className="border-2">
              <img
                src={`${process.env.NEXT_PUBLIC_URL_BE}/uploads/${product.product_image}`}
                className="w-[130px] h-[110px]"
              />
            </td>
            <td className="border-2">{product.product_name}</td>
            <td className="border-2">{product.product_desc}</td>
            <td className="border-2">Rp. {product.product_price}</td>
            <td className="flex flex-row justify-evenly items-center text-white h-20">
              <button
                className="w-13 py-2 px-3 bg-yellow-400 rounded-lg"
                onClick={() => {
                  setEditModal(true);
                  setFormEdit((prevData) => ({
                    ...prevData,
                    ...product,
                  }));
                }}
              >
                <FaEdit />
              </button>
              <button
                className="w-13 py-2 px-3 bg-red-600 rounded-lg"
                onClick={() => handleDelete(product.id)}
              >
                <RiDeleteBin6Line />
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
  const pageCount = Math.ceil(display.length / detailsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Layout>
      <div className="min-w-full mx-auto text-sm py-6 px-24 bg-gray-100 h-[1500px]">
        <div className="flex justify-between my-5 align-end">
          <div className="flex flex-col justify-center w-1/5">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6A4029] focus:border-[#6A4029] block w-full p-2.5 placeholder-gray-400"
              placeholder="Search Product"
              onChange={(e) => {
                setRefetch(!refetch);
                if (search === "product_name") {
                  setQuery({
                    product_name: e.target.value,
                    order: "product_name",
                  });
                } else if (search === "categories_name") {
                  setQuery({
                    categories_name: e.target.value,
                    order: "categories_name",
                  });
                }
              }}
            />
            <div className="col-4">
              <label
                htmlFor="sort"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                Sort by :
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6A4029] focus:border-[#6A4029] block w-full p-2.5 placeholder-gray-400 "
                aria-label="Default select example"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              >
                <option defaultValue="product_name">Product</option>
                <option value="categories_name">Categories</option>
              </select>
            </div>
            <div className="col-4">
              <label
                htmlFor="order"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                Order By :
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6A4029] focus:border-[#6A4029] block w-full p-2.5"
                aria-label="Default select example"
                onChange={(e) => {
                  setQuery((prevData) => ({
                    ...prevData,
                    sortBy: e.target.value,
                  }));
                  setRefetch(!refetch);
                  console.log("haloooo");
                }}
              >
                <option defaultValue="ASC">ASC</option>
                <option value="DESC">DSC</option>
              </select>
            </div>
          </div>
          <div className="flex flex-end justify-end items-end">
            <button
              className="w-full h-12 py-2 px-4 rounded-xl bg-yellow-900 text-yellow-400 font-bold"
              onClick={() => setAddModal(true)}
            >
              Add New Product
            </button>
          </div>
        </div>
        <div className="cards-movie d-flex flex-wrap justify-content-between movie-details">
          <table className="border-2 table-auto">
            <thead className="border-2 ">
              <tr className="border-2 bg-yellow-900 text-white">
                <th className="border-2 w-[5%] p-3">No</th>
                <th className="border-2 w-[10%]">Category</th>
                <th className="border-2 w-[10%]">Image</th>
                <th className="border-2 w-[15%]">Name</th>
                <th className="border-2 w-[40%]">Description</th>
                <th className="border-2 w-[10%]">Price</th>
                <th className="border-2 w-[25%]"></th>
              </tr>
            </thead>
            {displayProduct}
          </table>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination-btn"}
            previousLinkClassName={"previous-btn"}
            nextLinkClassName={"next-btn"}
            disabledClassName={"pagination-disable"}
            activeClassName={"pagination-active"}
          />
        </div>
      </div>
      {/*Add Modal toggle */}
      {addModal ? (
        <>
          <div className="flex justify-center items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-zinc-200/80">
            <div className="relative w-[50%] my-6 mx-auto">
              <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-[80%] mx-auto bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 border-b border-solid border-gray-300 bg-yellow-900 rounded-t">
                  <h3 className="text-3xl font-semibold text-white">
                    Add New Products
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setAddModal(false)}
                  >
                    <span className="text-white opacity-7 h-6 w-6 text-xl block bg-yellow-900 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto ">
                  <form
                    className="shadow-md rounded p-5 w-full mx-auto border"
                    encType="multipart/form-data"
                    onSubmit={(e) => handleAdd(e)}
                  >
                    <label className="block text-black text-sm font-bold mb-1">
                      Categories
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-1"
                      onChange={(e) => {
                        setFormAdd((prevData) => ({
                          ...prevData,
                          categories_id: e.target.value,
                        }));
                      }}
                    />
                    <label className="block text-black text-sm font-bold my-2">
                      Product Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-2"
                      onChange={(e) => {
                        setFormAdd((prevData) => ({
                          ...prevData,
                          product_name: e.target.value,
                        }));
                      }}
                    />
                    <label className="block text-black text-sm font-bold my-2">
                      Description
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-1"
                      onChange={(e) => {
                        setFormAdd((prevData) => ({
                          ...prevData,
                          product_desc: e.target.value,
                        }));
                      }}
                    />
                    <label className="block text-black text-sm font-bold my-2">
                      Price
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-1"
                      onChange={(e) => {
                        setFormAdd((prevData) => ({
                          ...prevData,
                          product_price: e.target.value,
                        }));
                      }}
                    />
                    <label className="block text-black text-sm font-bold my-2">
                      Image
                    </label>
                    <input
                      type="file"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-1"
                      onChange={(e) => {
                        setFormAdd((prevData) => ({
                          ...prevData,
                          product_image: e.target.files[0],
                        }));
                      }}
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setAddModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={(e) => {
                      handleAdd(e)
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {editModal ? (
        <>
          <div className="flex justify-center items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-zinc-200/80">
            <div className="relative w-[50%] my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[80%] mx-auto bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 border-b border-solid border-gray-300 bg-yellow-900 rounded-t">
                  <h3 className="text-3xl font-semibold text-white">
                    Edit Products
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setEditModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto ">
                  <form
                    className="shadow-md rounded p-5 w-full mx-auto border"
                    onSubmit={() => handleUpdate(formEdit.id)}
                  >
                    <label className="block text-black text-sm font-bold mb-1">
                      Categories
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-1"
                      onChange={(e) => {
                        setFormEdit((prevData) => ({
                          ...prevData,
                          categories_id: e.target.value,
                        }));
                      }}
                      defaultValue={formEdit.categories_id}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Product Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-1"
                      onChange={(e) => {
                        setFormEdit((prevData) => ({
                          ...prevData,
                          product_name: e.target.value,
                        }));
                      }}
                      defaultValue={formEdit.product_name}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Description
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-1"
                      onChange={(e) => {
                        setFormEdit((prevData) => ({
                          ...prevData,
                          product_desc: e.target.value,
                        }));
                      }}
                      defaultValue={formEdit.product_desc}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Price
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-1"
                      onChange={(e) => {
                        setFormEdit((prevData) => ({
                          ...prevData,
                          product_price: e.target.value,
                        }));
                      }}
                      defaultValue={formEdit.product_price}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      encType="multipart/form-data"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black my-1"
                      onChange={(e) => {
                        setFormEdit((prevData) => ({
                          ...prevData,
                          product_image: e.target.files[0],
                        }));
                      }}
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {
                      handleUpdate(formEdit.id)
                      setEditModal(false) 
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export default Dashboard;
