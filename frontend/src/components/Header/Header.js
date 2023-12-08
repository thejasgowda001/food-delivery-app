import React from 'react';
import classes from './header.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../Hooks/useCart';

export default function Header() {
    const user = {
        name: 'Robert',
    };
    const { cart } = useCart();

    const logout = () => {
        // Add the logic to handle logout
        // For example: perform logout actions and redirect to the login page
    };

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to="/" className={classes.logo}>
                    FOOD CART!
                </Link>
                <nav>
                    <ul>
                        {user ? (
                            <li className={classes.menucontainer}>
                                <Link to="/profile">{user.name}</Link>
                                <div className={classes.menu}>
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/orders">Orders</Link>
                                    <a onClick={logout}>LogOut</a>
                                </div>
                            </li>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}

                        <li>
                            <Link to="/cart">
                                Cart{cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
