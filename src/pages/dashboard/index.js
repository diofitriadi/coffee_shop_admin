import Dashboard from "../../layout/dashboard"


export async function getServerSideProps (context)  {
  const details = await fetch(`https://coffee-shop-be-dio.herokuapp.com/api/v1/product/`)
  const dataDetails = await details.json()
  return {
    props: { product: dataDetails }
  }
}


const DashboardPage = ({product}) => {
  return (
    <Dashboard product={product}/>
  )
}

export default DashboardPage