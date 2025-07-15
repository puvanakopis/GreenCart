import { useState } from "react"
import { Navigate, NavLink } from 'react-router-dom';
import { assets } from '../Assets/assets'
import { useAppContext } from '../Context/AppContext'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, setUser, setShowUserLogin, navigate } = useAppContext()

    // Logout handler
    const logout = async () => {
        setUser(null)
        Navigate("/")
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            {/* ---------- Logo ---------- */}
            <NavLink to='/' onClick={() => setOpen(false)}>
                <img src={assets.logo} alt="Logo" />
            </NavLink>
            

            {/* ---------- Desktop ---------- */}
            <div className="hidden sm:flex items-center gap-8">
                {/* Navigation links */}
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/contact'>Contact</NavLink>

                {/* Search bar */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
                </div>

                {/* Cart icon */}
                <div onClick={() => navigate('/card')} className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt="Cart" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        3
                    </button>
                </div>

                {/* Login / User Profile */}
                {!user ? (
                    // Login button
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    // User profile
                    <div className="relative group">
                        <img src={assets.profile_icon} alt="Profile" className="w-10" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                            <li onClick={() => navigate("/my-order")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">My Order</li>
                            <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>



            {/* ---------- Mobile Menu ---------- */}
            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Menu"
                className="sm:hidden"
            >
                <img src={assets.menu_icon} alt="Menu" />
            </button>

            {/* Mobile Menu Dropdown */}
            {open && (
                <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden">
                    <NavLink to="/" onClick={() => setOpen(false)} className="block">Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)} className="block">All Product</NavLink>
                    {user && (
                        <NavLink to="/my-order" onClick={() => setOpen(false)} className="block">My Order</NavLink>
                    )}
                    <NavLink to="/contact" onClick={() => setOpen(false)} className="block">Contact</NavLink>

                    {/* Mobile login/logout button */}
                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false)
                                setShowUserLogin(true)
                            }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar