/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import axios from '../config/axiosConfig';
import { backendURIs, frontendURIs } from "../config/routes";
import { imageSRCHandler } from "../config/imageResolver";
import { Link } from "react-router-dom";

const ImageHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [autoplayInterval, setAutoplayInterval] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useRef(new Audio("/songing.mp3")).current;

  const token = localStorage.getItem('token');

  const [images, setImages] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(backendURIs.gallery.getGuestPhotos)
      .then(response => {
        setImages(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error fetching images:', error);
      });
  }, []);

  const goToNext = useCallback(() => {
    setSelectedIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  });

  const goToPrev = useCallback(() => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        goToPrev();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrev]);

  const openImage = (index) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setIsPlaying(false);
    setSelectedIndex(null);
    stopAutoplay();
    stopAudio();
  };


  // Function to start autoplay
  const startAutoplay = () => {
    const intervalId = setInterval(goToNext, 2000);
    setAutoplayInterval(intervalId);
  };

  // Function to stop autoplay
  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
    setAutoplayInterval(null);
  };

  // Function to handle play button click
  const playImages = () => {
    setIsPlaying(true);
    audio.play();
    startAutoplay();
  };

  // Function to handle stop button click
  const stopImages = () => {
    setIsPlaying(false);
    stopAutoplay();
    stopAudio();
  };

  const stopAudio = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (touchStartX === null) return;

    const touchEndX = event.touches[0].clientX;
    const touchDiffX = touchEndX - touchStartX;

    if (touchDiffX > 100) {
      goToPrev();
    } else if (touchDiffX < -100) {
      goToNext();
    }

    setTouchStartX(null);
  };

  return (
    <div
      className={`${isLoading && 'opacity-15'} bg-white-wine flex flex-col justify-center items-center`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <h1 className="text-2xl md:text-4xl text-[#d3a755] text-center mx-auto font-bold mb-10 shadow-lg p-2">
        Image Gallery ({images.length})
      </h1>
      {token !== null && <Link className="text-[#d3a755] underline hover:text-red-800" to={frontendURIs.admin}>Admin</Link>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative cursor-pointer">
            <img
              src={imageSRCHandler(image.image)}
              alt={`Image ${index}`}
              className="w-full h-[12rem] md:h-[20rem] rounded-md hover:grayscale"
              onClick={() => openImage(index)}
            />
          </div>
        ))}
      </div>
      {selectedIndex !== null && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-95 bg-[#d3a755] p-2 flex flex-col justify-center items-center md:p-8 z-50"
          onClick={closeImage}
        >
          <button
            className="absolute bottom-0 left-0 text-red-800 font-semibold text-2xl px-4 py-2 bg-white rounded-full m-2 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
          >
            {"<"}
          </button>
          <div className="flex flex-col w-full items-center justify-center md:w-2/3 h-[95vh] overflow-hidden md:p-2">
            <img
              src={imageSRCHandler(images[selectedIndex].image)}
              alt={`Selected Image ${selectedIndex}`}
              className="max-w-full w-full md:w-auto max-h-[70%] h-auto rounded-lg"
            />
            <div className="flex justify-between items-center w-full mt-5 md:mt-10">
              {selectedIndex > 0 && (
                <img
                  src={imageSRCHandler(images[selectedIndex - 1].image)}
                  alt={`Image ${selectedIndex - 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openImage(selectedIndex - 1);
                  }}
                  className="w-[5rem] md:w-1/4 h-[5rem] md:h-[15rem] rounded-lg cursor-pointer"
                />
              )}
              <img
                src={imageSRCHandler(images[selectedIndex].image)}
                alt={`Selected Image ${selectedIndex}`}
                className="w-[5rem] md:w-1/4 h-[5rem] md:h-[15rem] rounded-lg cursor-pointer"
              />
              {selectedIndex < images.length - 1 && (
                <img
                  src={imageSRCHandler(images[selectedIndex + 1].image)}
                  alt={`Image ${selectedIndex + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openImage(selectedIndex + 1);
                  }}
                  className="w-[5rem] md:w-1/4 h-[5rem] md:h-[15rem] rounded-lg cursor-pointer"
                />
              )}
            </div>
          </div>
          <button
            className="absolute bottom-0 right-0 text-red-800 font-semibold text-2xl px-4 py-2 bg-white rounded-full m-2 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            {">"}
          </button>
          {/* Play and stop buttons */}
          <div className="-mt-8 md:mt-2 flex items-center gap-2">
            {isPlaying ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stopImages();
                }}
                className="bg-red-900 text-white rounded-md p-2"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playImages();
                }}
                className="bg-red-900 text-white rounded-md p-2"
              >
                Play
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default ImageHandler;
