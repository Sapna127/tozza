
const Navbar = () => {

  return (
<nav className="bg-gray-50 p-2 shadow-md fixed w-[600px] top-3 left-1/2 transform -translate-x-1/2 flex rounded-lg justify-center align-middle">
<div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
            <svg width="30" height="30" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.3333 5.83337H42.6666C46.91 5.83337 50.9797 7.51908 53.9803 10.5197C56.9809 13.5202 58.6666 17.5899 58.6666 21.8334V43.1667C58.6666 47.4102 56.9809 51.4798 53.9803 54.4804C50.9797 57.481 46.91 59.1667 42.6666 59.1667H21.3333C17.0898 59.1667 13.0201 57.481 10.0195 54.4804C7.01896 51.4798 5.33325 47.4102 5.33325 43.1667L5.33325 21.8334C5.33325 17.5899 7.01896 13.5202 10.0195 10.5197C13.0201 7.51908 17.0898 5.83337 21.3333 5.83337ZM37.3333 29.8334C36.626 29.8334 35.9477 30.1143 35.4476 30.6144C34.9475 31.1145 34.6666 31.7928 34.6666 32.5C34.6666 33.2073 34.9475 33.8856 35.4476 34.3857C35.9477 34.8858 36.626 35.1667 37.3333 35.1667H45.3333C46.0405 35.1667 46.7188 34.8858 47.2189 34.3857C47.719 33.8856 47.9999 33.2073 47.9999 32.5C47.9999 31.7928 47.719 31.1145 47.2189 30.6144C46.7188 30.1143 46.0405 29.8334 45.3333 29.8334H37.3333ZM31.9999 40.5C31.2927 40.5 30.6144 40.781 30.1143 41.2811C29.6142 41.7812 29.3333 42.4595 29.3333 43.1667C29.3333 43.874 29.6142 44.5522 30.1143 45.0523C30.6144 45.5524 31.2927 45.8334 31.9999 45.8334H45.3333C46.0405 45.8334 46.7188 45.5524 47.2189 45.0523C47.719 44.5522 47.9999 43.874 47.9999 43.1667C47.9999 42.4595 47.719 41.7812 47.2189 41.2811C46.7188 40.781 46.0405 40.5 45.3333 40.5H31.9999ZM31.9999 19.1667C31.2927 19.1667 30.6144 19.4477 30.1143 19.9478C29.6142 20.4479 29.3333 21.1261 29.3333 21.8334C29.3333 22.5406 29.6142 23.2189 30.1143 23.719C30.6144 24.2191 31.2927 24.5 31.9999 24.5H45.3333C46.0405 24.5 46.7188 24.2191 47.2189 23.719C47.719 23.2189 47.9999 22.5406 47.9999 21.8334C47.9999 21.1261 47.719 20.4479 47.2189 19.9478C46.7188 19.4477 46.0405 19.1667 45.3333 19.1667H31.9999ZM20.8746 33.148L18.9893 31.2627C18.7433 31.008 18.449 30.8049 18.1237 30.6651C17.7983 30.5253 17.4484 30.4518 17.0943 30.4487C16.7402 30.4456 16.3891 30.5131 16.0614 30.6472C15.7337 30.7813 15.4359 30.9793 15.1855 31.2297C14.9352 31.48 14.7371 31.7778 14.6031 32.1055C14.469 32.4332 14.4015 32.7844 14.4046 33.1384C14.4077 33.4925 14.4812 33.8424 14.621 34.1678C14.7607 34.4931 14.9639 34.7874 15.2186 35.0334L18.9893 38.804C19.2369 39.052 19.531 39.2487 19.8547 39.3829C20.1785 39.5171 20.5255 39.5861 20.8759 39.5861C21.2264 39.5861 21.5734 39.5171 21.8971 39.3829C22.2208 39.2487 22.5149 39.052 22.7626 38.804L30.3039 31.2627C30.8046 30.7627 31.0862 30.0842 31.0867 29.3766C31.0872 28.669 30.8066 27.9901 30.3066 27.4894C29.8066 26.9886 29.1281 26.7071 28.4205 26.7066C27.7128 26.7061 27.034 26.9867 26.5333 27.4867L20.8746 33.1454V33.148Z" fill="black"/>
            </svg>
        </div>

        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold text-gray-700">Tozza</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="text-black focus:outline-none"
          >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8-9h1M4 12H3m15.364 6.364l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707"
                />
              </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
