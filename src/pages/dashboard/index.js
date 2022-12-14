import Dashboard from "../../layout/dashboard"


export async function getServerSideProps (context)  {
  const details = await fetch(`${process.env.NEXT_PUBLIC_URL_BE}/api/v1/product/`)
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