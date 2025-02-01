import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
    { title: "Home", link: "/" },
    {
        title: "Shop", link: "/shop", subMenu: [
            { title: "New Arrivals", link: "/shop/new-arrivals" },
            { title: "Best Sellers", link: "/shop/best-sellers" },
            { title: "On Sale", link: "/shop/sale" }
        ]
    },
    { title: "Cart", link: "/cart" },
    {
        title: "My Account", link: "/account", subMenu: [
            { title: "Orders", link: "/account/orders" },
            { title: "Wishlist", link: "/account/wishlist" }
        ]
    },
    { title: "Help", link: "/help" }
];

const menu = [
    {
        "title": "Home",
        "link": "/",
        "icon": "home"
    },
    {
        "title": "Shop",
        "link": "/shop",
        "icon": "shopping-cart",
        "subMenu": [
            {
                "title": "New Arrivals",
                "link": "/shop/new-arrivals"
            },
            {
                "title": "Best Sellers",
                "link": "/shop/best-sellers"
            },
            {
                "title": "On Sale",
                "link": "/shop/sale"
            },
            {
                "title": "Categories",
                "subMenu": [
                    {
                        "title": "Electronics",
                        "link": "/shop/electronics"
                    },
                    {
                        "title": "Fashion",
                        "link": "/shop/fashion"
                    },
                    {
                        "title": "Home & Kitchen",
                        "link": "/shop/home-kitchen"
                    }
                ]
            }
        ]
    },
    {
        "title": "Brands",
        "link": "/brands",
        "icon": "tag"
    },
    {
        "title": "Offers",
        "link": "/offers",
        "icon": "percent"
    },
    {
        "title": "My Account",
        "link": "/account",
        "icon": "user",
        "subMenu": [
            {
                "title": "Orders",
                "link": "/account/orders"
            },
            {
                "title": "Wishlist",
                "link": "/account/wishlist"
            },
            {
                "title": "Addresses",
                "link": "/account/addresses"
            },
            {
                "title": "Logout",
                "link": "/logout"
            }
        ]
    },
    {
        "title": "Cart",
        "link": "/cart",
        "icon": "shopping-bag"
    },
    {
        "title": "Help",
        "link": "/help",
        "icon": "info-circle",
        "subMenu": [
            {
                "title": "Customer Support",
                "link": "/help/support"
            },
            {
                "title": "Returns & Refunds",
                "link": "/help/returns"
            },
            {
                "title": "Shipping Information",
                "link": "/help/shipping"
            },
            {
                "title": "FAQs",
                "link": "/help/faqs"
            }
        ]
    }
]


const SidebarMenu = () => {
    return (
        <nav>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.link}>{item.title}</Link>
                        {item.subMenu && (
                            <ul>
                                {item.subMenu.map((sub, i) => (
                                    <li key={i}>
                                        <Link to={sub.link}>{sub.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SidebarMenu;
