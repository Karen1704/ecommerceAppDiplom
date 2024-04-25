import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import s from "../Main/Main.module.scss";
import { setSearchValue } from "../redux/slices/searchSlice";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { setCart } from "../redux/slices/cartSlice";
import { setHeart } from "../redux/slices/heartSlice";
import axios from "axios";
import { sortingData } from "./constants";

function Main() {
	const dispatch = useDispatch();
	const category = useSelector(state => state.searchValue.category);
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [categories, setSetCategories] = useState([]);
	const [sort, setSetSort] = useState("");
	const [sortByPrice, setSortByPrice] = useState("");
	const cart = useSelector(state => state.cart);
	const heart = useSelector(state => state.heart);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(
				`https://payl.10web.cloud/wp-json/get/products?order=${sort}&orderby=${sortByPrice}`
			);
			setFilteredData(data.products);
			setData(data.products);
		})();
	}, [sort, sortByPrice]);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(
				"https://payl.10web.cloud/wp-json/product/categories"
			);
			setSetCategories(data);
		})();
	}, []);

	useEffect(() => {
		if (!category) {
			setFilteredData(filteredData);
		}
		const newData = data.filter(
			item => item.categories[0].slug.toLowerCase() === category.toLowerCase()
		);
		setFilteredData(newData);
	}, [category]);

	function addItemToCard(product) {
		const currentProduct = cart.filter(item => item.id === product.id);
		return !currentProduct.length && dispatch(setCart(product));
	}
	function addToHeart(product) {
		const currentProduct2 = heart.filter(item => item.id === product.id);
		return !currentProduct2.length && dispatch(setHeart(product));
	}
	return (
		<>
			<div className={s.searchFilter}>
				<Swiper
					breakpoints={{
						0: {
							slidesPerView: 1,
						},
						550: {
							slidesPerView: 2,
						},
						653: {
							slidesPerView: 3,
						},

						800: {
							slidesPerView: 4,
						},

						900: {
							slidesPerView: 5,
						},
					}}
					className={s.mySwiper}
				>
					{categories.map(({ name, slug }) => (
						<SwiperSlide>
							<div
								onClick={() =>
									dispatch(
										setSearchValue({
											category: slug,
										})
									)
								}
							>
								{name}
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				{/* <div className={s.search}>
					<form
						onSubmit={e => {
							e.preventDefault();
							inputRef.current.value = "";
						}}
					>
						<input
							type="text"
							ref={inputRef}
							placeholder="search"
						/>
						<button
							onClick={() =>
								dispatch(
									setSearchValue({
										value: inputRef.current.value,
										category,
									})
								)
							}
						>
							<FaSearch />
						</button>
					</form>
				</div> */}
			</div>
			{filteredData && filteredData.length ? (
				<div className={s.sort}>
					{sortingData.map(({ name, sort }, index) => (
						<button
							key={sort}
							onClick={() => {
								if (index < 1) {
									setSetSort(sort);
								}
								setSortByPrice(sort);
							}}
						>
							{name}
						</button>
					))}
				</div>
			) : null}
			<div className={s.products}>
				{filteredData && filteredData.length > 0 ? (
					filteredData.map((product, index) => {
						return (
							<div
								key={product.id}
								className={s.product}
							>
								<Link
									to={`/${product.id}`}
									key={product.id}
									className={s.image}
								>
									<img
										src={product.image_url[0]}
										alt={index}
									/>
								</Link>
								<div className={s.iconsBox}>
									<p>{product.name}</p>
									<p>{product.price} Դ</p>
									<div>
										<div onClick={() => addItemToCard(product)}>
											<FaCartPlus className={s.cardPlus} />
										</div>
										<div onClick={() => addToHeart(product)}>
											<FaHeart className={s.Heart} />
										</div>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className={s.empty}>No product of this category</div>
				)}
			</div>
		</>
	);
}
export default Main;
