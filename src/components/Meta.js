import Head from 'next/head'

const Meta = () => {
    return(
    <>
      <Head>
        <title>Coffee Shop Admin</title>
        <meta name="keyword" content="Dashboard Page"/>
        <meta name='description' content="This Page Only Available To Admin" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet='utf-8'/>
      </Head>
    </>
    )
}


export default Meta