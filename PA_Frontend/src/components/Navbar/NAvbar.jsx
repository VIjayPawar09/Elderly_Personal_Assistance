import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Auth/login";
import RegisterModal from "../Auth/Register";
import { Bell, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const remembered = JSON.parse(localStorage.getItem("rememberedUser"));
    if (remembered) {
      setCurrentUser(remembered);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      // Replace with real socket or API call to fetch notifications
      setNotifications([
        { id: 1, from: "Assistant A", message: "New message", senderId: "123" },
        { id: 2, from: "User B", message: "Hi there", senderId: "456" },
      ]);
    }
  }, [currentUser]);

  const toggleNav = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("rememberedUser");
    navigate("/");
  };

  const handleNotificationClick = (senderId, senderName) => {
    navigate("/chat", {
      state: { assistant: { _id: senderId, name: senderName } },
    });
    setNotifications((prev) => prev.filter((n) => n.senderId !== senderId));
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-white text-2xl font-bold">
              Elderly Personal Assistance
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
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                    className="flex items-center gap-2 text-white font-semibold"
                  >
                    <User className="h-5 w-5" />
                    {currentUser.name || currentUser.email}
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-20">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        View Profile
                      </Link>
                      <div className="border-t"></div>
                      <div className="p-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Notifications</span>
                          <Bell className="h-5 w-5 text-indigo-600" />
                        </div>
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <button
                              key={n.id}
                              onClick={() =>
                                handleNotificationClick(n.senderId, n.from)
                              }
                              className="text-sm text-left w-full px-2 py-1 hover:bg-indigo-100 rounded"
                            >
                              💬 {n.from}: {n.message}
                            </button>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500">
                            No notifications
                          </p>
                        )}
                      </div>
                      <div className="border-t"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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

        {/* Modals */}
        <RegisterModal
          isOpen={showRegister}
          onClose={() => {
            setShowRegister(false);
            setShowLogin(true); // optional
          }}
          onRegisterSuccess={(user) => {
            setCurrentUser(user);
            localStorage.setItem("rememberedUser", JSON.stringify(user));

            if (user.role === "assistant") {
              navigate("/dashboard");
            }

            setShowRegister(false);
          }}
        />

        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            localStorage.setItem("rememberedUser", JSON.stringify(user));
            setShowLogin(false);

            // ✅ redirect only if role is customer
            if (user.role === "assistant") {
              navigate("/dashboard");
            }
          }}
        />
      </nav>
    </>
  );
};

export default Navbar;
