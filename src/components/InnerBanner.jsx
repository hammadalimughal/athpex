import React from 'react'

const InnerBanner = ({title}) => {
  return (
    <section className="inner-banner" style={{ backgroundImage: 'url(/images/inner-banner-bg.png)' }}>
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  )
}

export default InnerBanner
