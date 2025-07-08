
import { LogOut, Trash2 } from 'lucide-react'; // Icons for the menu

// Define the component's props using PropTypes for type checking in JavaScript.
import PropTypes from 'prop-types';

type NavbarProps = {
  storeName?: string;
  email?: string;
  onLogout?: () => void;
  onClearChat?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ storeName, email, onLogout, onClearChat }) => {
  // Get the first letter of the store name for the avatar, or a default 'U' if not available.
  const avatarLetter = storeName && storeName.length > 0 ? storeName.charAt(0).toUpperCase() : 'U';

  return (
    // The main daisyUI navbar container
    <div className="navbar bg-[#000000] px-4">
      <div className="navbar-start">
        <div className="flex items-center">
          <img
            src="/src/assets/Logo.png" // Make sure this path to your logo is correct
            alt="Chat Assistant Logo"
            className="w-8 h-8 object-contain mr-2"
          />
          <h1 className="text-xl font-semibold text-white">Danfe Tea</h1>
        </div>
      </div>
      
      {/* Center section (can be used for other links if needed later) */}
      <div className="navbar-center"></div>
      
      {/* Right side of the navbar: User Profile Dropdown */}
      <div className="navbar-end">
        
        {/* Conditional Rendering: Only show the dropdown if the user is logged in (props are provided) */}
        {storeName && email && onLogout && (
          <div className="dropdown dropdown-end">

            {/* The avatar that triggers the dropdown menu to open */}
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span>{avatarLetter}</span>
              </div>
            </label>
            
            {/* The dropdown menu content itself */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 text-base-content">
              
              {/* Section 1: User Info (not clickable) */}
              <li className="p-2 border-b border-base-300 pointer-events-none">
                <div className="font-bold text-lg">{storeName}</div>
                <div className="text-sm text-gray-500">{email}</div>
              </li>
              
              {/* Section 2: Actions */}
              {/* "Clear Chat" button */}
              <li>
                <a onClick={onClearChat} className="mt-1 flex items-center">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Chat
                </a>
              </li>

              {/* "Logout" button */}
              <li>
                <a onClick={onLogout} className="text-red-500 hover:bg-red-100 font-semibold flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

Navbar.propTypes = {
  storeName: PropTypes.string,
  email: PropTypes.string,
  onLogout: PropTypes.func,
  onClearChat: PropTypes.func,
};

export default Navbar;