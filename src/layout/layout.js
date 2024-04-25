import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { LOCAL_STORAGE_KEYS } from "../constants/constatns";

const Layout = () => {
	const { pathname } = useLocation();
	const jwt_cookie = localStorage.getItem(LOCAL_STORAGE_KEYS.JWT_COOKIE);
	const navigate = useNavigate();
	return (
		<div>
			{pathname !== "/login" ? <Header /> : null}
		 <Outlet />
			{pathname !== "/login" ? <Footer /> : null}
		</div>
	);
};

export default Layout;
