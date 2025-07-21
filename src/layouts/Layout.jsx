import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white px-6 py-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Paisley</h1>
          <nav className="space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:underline ${isActive ? 'underline font-semibold' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/members"
              className={({ isActive }) =>
                `hover:underline ${isActive ? 'underline font-semibold' : ''}`
              }
            >
              Members
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>

      <footer className="bg-primary text-white text-sm py-4 text-center">
        &copy; {new Date().getFullYear()} Paisley Cooperative
      </footer>
    </div>
  );
};

export default Layout;
