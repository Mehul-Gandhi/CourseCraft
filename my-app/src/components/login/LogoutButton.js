function LogoutButton({ onLogout }) {
    return <button 
    className="bg-[#FFB81C] text-white rounded-full py-2 px-6 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

    onClick={onLogout}>Logout</button>;
  }
  
export default LogoutButton;