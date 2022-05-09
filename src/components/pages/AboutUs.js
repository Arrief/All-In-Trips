const AboutUs = () => {
    return (
      <section className='about-text'>
        <br />
        <h1 style={{color: "#24464b"}}>The team behind the project</h1>
        <div className="card-about-text">
          <h1>Arne Rief</h1>
          <h4>Regensburg, Germany</h4>
          <p className="card-about-links"><a href= "https://www.linkedin.com/in/arne-rief/"> Linkedin</a></p>
          <a href= "https://github.com/Arrief"> Github</a>
        </div>
  
        <div className="card-about-text">
          <h1>Julia Feller</h1>
          <h4>Berlin, Germany</h4>
          <p><a href= "http://www.linkedin.com"> Linkedin</a></p>
          <a href= "https://github.com/fejul"> Github</a>
        </div>
  
        <div className="card-about-text">
          <h1>Jessica Povoa</h1>
          <h4>Berlin, Germany</h4>
          <p><a href= "http://www.linkedin.com/in/jessspo"> Linkedin</a></p>
          <a href= "https://github.com/jessspo/"> Github</a>
        </div>
      </section>
    )
  }
  
  export default AboutUs;
  