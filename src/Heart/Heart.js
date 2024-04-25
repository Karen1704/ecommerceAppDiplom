import { useSelector } from "react-redux";
import s from "./Heart.module.scss";
function Heart() {
	const heartSelect = useSelector(state => state.heart);
	return (
		<div className={s.par}>
			{heartSelect.length === 0 ? (
				<p className={s.tot}>is empty</p>
			) : (
				<div>
					{heartSelect.map(item => {
						return (
							<div
								className={s.heartGeneralDiv}
								key={item.id}
							>
								<img
									src={item.image_url[0]}
									alt={item.name}
								/>
								<div>
									<p>{item.name}</p>
									<p>{item.price} Դ</p>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
export default Heart;
