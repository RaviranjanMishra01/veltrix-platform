import "./Home.css";
import Nav from "./Veltrixnavbar";
function Home() {
  return (
    <>
      <div className="Homepage">
        <Nav className="nav" />
        <div className="home-container">
          <h1>Welcome to the Home Page</h1>
          <p>This is the home page of Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita modi iusto maiores, dicta ipsum recusandae obcaecati at nisi iure eum voluptates possimus excepturi tempora reiciendis repudiandae, vitae, harum nemo quisquam! lorem*584 our application.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
