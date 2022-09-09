import Footer from "./Footer";
import Meta from "./Meta";
import Navbar from "./Navbar";


export default function Layout({children, auth, meta}) {

  return(
    <>
      <Meta meta={meta}/>
      {auth ?  null : <Navbar /> }
      {children}
      {auth ? null : <Footer />}   
  </>
  )
}