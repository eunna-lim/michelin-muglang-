import "../../reset.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faPhone,
  faUpRightFromSquare,
  faStar,
  faMoneyBill1Wave,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./RestaurantCard.module.css";

const RestaurantCard = ({ restaurant, handleClick, clicked, setClicked }) => {
  return (
    <div className={!clicked ? styles.restaurant : styles.restaurant_clicked}>
      {!clicked && (
        <div
          className={styles.detailBtn}
          onClick={() => handleClick(restaurant._id)}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} size="2x" />
        </div>
      )}

      <div className={styles.restaurant_box}>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <span className={styles.cuisine}>
          {restaurant.cuisine.map((cuisineName) => (
            <span>{cuisineName}</span>
          ))}
        </span>
        {clicked && (
          <div className={styles.detailPageBtn}>
            <a>상세 정보 바로가기</a>
          </div>
        )}
      </div>
      {clicked && (
        <>
          <div className={styles.restaurant_box}>
            <FontAwesomeIcon icon={faStar} />
            <span style={{ marginLeft: "5px" }}>{restaurant.award}</span>
          </div>
          <div className={styles.restaurant_box}>
            <FontAwesomeIcon icon={faMoneyBill1Wave} />
            <span
              style={{ marginLeft: "5px" }}
            >{`${restaurant.minPrice} ~ ${restaurant.maxPrice} ${restaurant.currency}`}</span>
          </div>
        </>
      )}

      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faLocationArrow} />
        <span style={{ marginLeft: "5px" }}>{restaurant.address}</span>
      </div>
      <div className={styles.restaurant_box}>
        <FontAwesomeIcon icon={faPhone} />
        <span style={{ marginLeft: "5px" }}>{restaurant.phoneNumber}</span>
      </div>

      {clicked && (
        <div className={styles.restaurant_box}>
          <FontAwesomeIcon icon={faLink} />
          <a
            style={{ marginLeft: "5px" }}
            href={restaurant.websiteUrl}
            target="_blank"
          >
            {restaurant.websiteUrl}
          </a>
        </div>
      )}

      <p style={{ color: "green" }}>영업 중</p>
    </div>
  );
};

export default RestaurantCard;
