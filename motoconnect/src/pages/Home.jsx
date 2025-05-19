import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <main className="relative h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/stock-image.jpg')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      {/* Hero Part */}
      <section className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Trusted Mechanics Near You
        </h1>
        <p className="text-lg md:text-2xl max-w-xl mb-6">
          Verified, reviewed, and rated by real users. Get your vehicle fixed,
          fast.
        </p>

        <Link to="/mechanicslist">
          <button className="btn btn-primary px-6 py-3 rounded-full text-lg shadow-lg">
            Browse Mechanics
          </button>
        </Link>
      </section>
    </main>
  );
}

export default Home;
