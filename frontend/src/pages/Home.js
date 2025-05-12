import React from 'react';
//import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light text-center text-dark py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to TableEase</h1>
          <p className="lead">Effortless table reservations at your favorite restaurants.</p>
          <img
            src="https://images.unsplash.com/photo-1724426057815-a12b34f027c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdHVyYW50JTIwdGFibGV8ZW58MHx8MHx8fDA%3D"
            alt="Restaurant table"
            className="img-fluid w-100 my-4"
            style={{
              height: 'auto',
              objectFit: 'cover'
            }}
          />
          {/* <Link to="/register" className="btn btn-success btn-lg mt-3">Book a Table</Link> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4 text-break">
              <img
                src="https://plus.unsplash.com/premium_photo-1726711462433-9c0d83e0efa9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5zdGFudCUyMCUyMGJvb2tpbmclMjBmb3IlMjByZXN0YXVyYW50fGVufDB8fDB8fHww"
                alt="Fast service"
                className="mb-3 img-fluid "
              />
              <h5>Instant Booking</h5>
              <p>Quick and reliable table reservations in just a few clicks.</p>
            </div>
            <div className="col-md-4 mb-4">
              <img
                src="https://plus.unsplash.com/premium_photo-1700766408947-de54790afa82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fFNlY3VyZSUyMEFjY2VzcyUyMFdlJTIwcHJvdGVjdCUyMHlvdXIlMjBib29raW5nJTIwZGF0YSUyMHdpdGglMjB0b3AlMjBncmFkZSUyMGVuY3J5cHRpb24ufGVufDB8fDB8fHww"
                alt="Secure login"
                className="mb-3 img-fluid "
              />
              <h5>Secure Access</h5>
              <p>We protect your booking data with top-grade encryption.</p>
            </div>
            <div className="col-md-4 mb-4">
              <img
                src="https://media.istockphoto.com/id/1225940098/photo/food-delivery-and-stay-home-concepts-with-young-people-searching-restaurant-shop-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=91zYaGIIFcxvdrsIBGXnpKdRv-iX9mDsvjpbISEL-74="
                alt="User-friendly UI"
                className="mb-3 img-fluid "
              />
              <h5>Easy to Use</h5>
              <p>Designed for simplicity, so anyone can reserve a spot in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">About TableEase</h2>
          <p className="text-center">
            TableEase helps users find and book available tables at nearby restaurants with ease. Whether you're planning a dinner date or a business lunch, our platform offers a fast, reliable, and secure experience.
          </p>
          <div className="text-center mt-4">
            <img
              src="https://images.unsplash.com/photo-1623276527181-d6d1197f62a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRpbmluZyUyMHNldHVwfGVufDB8fDB8fHww"
              alt="Dining setup"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} TableEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
