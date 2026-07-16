import React from 'react'

const NoAccess = () => {
  return (
    <section className="bg-cream min-h-screen flex flex-col justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-ink">ACCESS DENIED</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-ink md:text-4xl">You are not allowed to view this page.</p>
            <p className="mb-4 text-lg font-light text-ink/70">Sorry, you are not allowed to view this page. LogIn Again. </p>
            <a href="/login" className="inline-flex text-ink bg-sun hover:bg-sun/80 focus:ring-4 focus:outline-none focus:ring-ink font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to LogIn</a>
          </div>   
        </div>
      </section>
  )
}

export default NoAccess;