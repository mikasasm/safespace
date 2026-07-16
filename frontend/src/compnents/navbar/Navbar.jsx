import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from "react-js-loader";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('tokenUser');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenUser');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };
  const handleDelete = () => {
    // Show delete modal
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Call the backend route to delete the user
      await fetch(`http://localhost:8000/delete-user/${user}`, {
        method: 'DELETE',
      });
      // Perform logout after deletion
      localStorage.removeItem('token');
      localStorage.removeItem('tokenUser');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const closeModal = () => {
    // Close the delete modal
    setShowDeleteModal(false);
  };

  return (
    
    <div className="bg-cream w-full z-50 shadow-lg">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQZrRgwuKA5JrFS4glBVgzvmPDhhPjWrObr-D01xeKZQ&s" alt="Your Company" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-ink"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href={`/${user}/mood`} className="text-sm font-semibold leading-6 text-ink">Mood Tracker</a>
            <a href={`/${user}/therapist`} className="text-sm font-semibold leading-6 text-ink">AI Therapist</a>
            <a href={`/${user}/quiz`} className="text-sm font-semibold leading-6 text-ink">Quiz</a>
            <a href={`/${user}/anonymoussharing`} className="text-sm font-semibold leading-6 text-ink">Anonymous Sharing</a>
            <a href="/aboutus" className="text-sm font-semibold leading-6 text-ink">About Us</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-ink text-sm focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-cream"
                    id="user-menu-button"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716336000&semt=ais_user" alt="Profile" />
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-cream py-1 shadow-lg ring-1 ring-ink/15 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                    <a href={`/${user}/profile`} className="block px-4 py-2 text-sm text-ink" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                    <a onClick={(e) => handleLogout(e)} href="#" className="block px-4 py-2 text-sm text-ink" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                    <a onClick={handleDelete} href="#" className="block px-4 py-2 text-sm text-ink" role="menuitem" tabIndex="-1" id="user-menu-item-2">Delete Profile</a>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="text-sm font-semibold leading-6 text-ink">
                Login <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-cream px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-ink/15">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQZrRgwuKA5JrFS4glBVgzvmPDhhPjWrObr-D01xeKZQ&s" alt="Your Company" />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-ink"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-ink/15">
                  <div className="space-y-2 py-6">

                    <a href={`/${user}/mood`} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-ink hover:bg-ink/5">Mood Tracker</a>
                    <a href={`/${user}/therapist`} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-ink hover:bg-ink/5">AI Therapist</a>
                    <a href={`/${user}/quiz`} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-ink hover:bg-ink/5">Quiz</a>
                    <a href={`/${user}/anonymoussharing`} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-ink hover:bg-ink/5">Anonymous Sharing</a>
                    <a href="/aboutus" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-ink hover:bg-ink/5">About Us</a>
                  </div>
                  <div className="py-6">
                    {isLoggedIn ? (
                      <div className="relative">
                        <button
                          type="button"
                          className="relative flex rounded-full bg-ink text-sm focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-cream"
                          id="user-menu-button-mobile"
                          aria-expanded={dropdownOpen}
                          aria-haspopup="true"
                          onClick={toggleDropdown}
                        >
                          <span className="absolute -inset-1.5"></span>
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716336000&semt=ais_user" alt="Profile" />
                        </button>
                        {dropdownOpen && (
                          <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-cream py-1 shadow-lg ring-1 ring-ink/15 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button-mobile" tabIndex="-1">
                            <a href={`/${user}/profile`} className="block px-4 py-2 text-sm text-ink" role="menuitem" tabIndex="-1" id="user-menu-item-0-mobile">Your Profile</a>
                            <a onClick={(e) => handleLogout(e)} href="#" className="block px-4 py-2 text-sm text-ink" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                    <a onClick={handleDelete} href="#" className="block px-4 py-2 text-sm text-ink" role="menuitem" tabIndex="-1" id="user-menu-item-2">Delete Profile</a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <a href="/login" className="text-sm font-semibold leading-6 text-ink">
                        Login <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Delete Profile Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-ink/75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-cream rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <div className="bg-cream px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-ink" id="modal-title">
                      Delete Profile
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-ink/70">
                        Are you sure you want to delete your profile? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-cream px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={confirmDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-ink text-base font-medium text-cream hover:bg-ink/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink sm:ml-3 sm:w-auto sm:text-sm">
                  Delete
                </button>
                <button onClick={closeModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-ink/15 shadow-sm px-4 py-2 bg-cream text-base font-medium text-ink hover:bg-ink/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Navbar;
