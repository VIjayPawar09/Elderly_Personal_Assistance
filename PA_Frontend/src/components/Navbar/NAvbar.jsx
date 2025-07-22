import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Auth/login";
import RegisterModal from "../Auth/Register";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const remembered = JSON.parse(localStorage.getItem("rememberedUser"));
    if (remembered) {
      setCurrentUser(remembered);
    }
  }, []);

  const toggleNav = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("rememberedUser");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-white text-2xl font-bold">
              Elderly Personal Assistance
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleNav}
                className="text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-4 items-center">
              <a
                href="#Main"
                className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg"
              >
                About
              </a>
              <a
                href="#Contact"
                className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg"
              >
                Contact
              </a>
              <Link
                to="/Dashboard"
                className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg"
              >
                Book Appointment
              </Link>

              {currentUser ? (
                <>
                  <span className="text-white font-semibold">
                    Hello, {currentUser.name || currentUser.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <a href="#Main" className="block text-white">
              Home
            </a>
            <a href="#services" className="block text-white">
              Services
            </a>
            <a href="#about" className="block text-white">
              About
            </a>
            <a href="#Contact" className="block text-white">
              Contact
            </a>
            <Link to="/Dashboard" className="block text-white">
              Book Appointment
            </Link>

            {currentUser ? (
              <>
                <span className="block text-white font-semibold">
                  Hello, {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block bg-white text-indigo-600 px-4 py-2 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-indigo-600 px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
        <RegisterModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
        />
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </nav>
    </>
  );
};

export default Navbar;
