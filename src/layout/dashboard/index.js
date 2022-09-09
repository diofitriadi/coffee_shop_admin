import React from 'react'
import Layout from '../../components/Layout'



const Dashboard = ({product}) => {
  const productGet = product.data
  return (
    <Layout>
      <div className="w-4/6 mx-auto my-10">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {productGet.map((product, index)=> {
              return (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.categories_name}</td>
                  <td>{product.product_name}</td>
                  <td>
                    <img 
                      src={`http://localhost:3001/uploads/${product.product_image}`}
                      style={{
                        width: "190px",
                        height: "110px"
                      }}
                    />
                  </td>
                  <td>{product.product_desc}</td>
                  <td>{product.product_price}</td>
                </tr>                
              )
            })}
          </tbody>
        </table>
      </div>

    </Layout>
    
  )
}

export default Dashboard