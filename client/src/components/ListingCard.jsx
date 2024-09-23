import React, { useState } from "react";
import "../styles/ListingCard.scss";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  // slider for images
  const [currentIndex, setCurrentIndex] = useState(0);

  const gotoPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const gotoNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();

  // add wish list
  const user = useSelector((state) => state.user);
  const wishList = useSelector((state) => state.wishList);

  const isLiked = wishList.find((item) => item._id === listingId);

  const patchWishList = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user._id}/${listingId}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "appliction/json",
        },
      }
    );

    const data = await response.json();
  };

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div
          className="prev-button"
          onClick={(e) => {
            e.stopPropagation();
            gotoPrevSlide(e);
          }}
        >
          <ArrowBackIosNew sx={{ fontSize: "15px" }} />
        </div>

        <div
          className="next-button"
          onClick={(e) => {
            e.stopPropagation();
            gotoNextSlide(e);
          }}
        >
          <ArrowForwardIosNew sx={{ fontSize: "15px" }} />
        </div>
      </div>

      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>$ {price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>$ {totalPrice}</span> total
          </p>
        </>
      )}
    </div>
  );
};

export default ListingCard;
