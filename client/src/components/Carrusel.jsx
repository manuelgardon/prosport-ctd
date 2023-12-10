import React, { useEffect, useRef, useState } from 'react';
import { data } from '../assets/data';

const Carrusel = () => {
    const listRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelector("li > img");

    if (imgNode) {
        imgNode.scrollIntoView({
        behavior: "smooth"
        });
    }

    const intervalId = setInterval(() => {
        scrollToImage('next');
    }, 5000);

    return () => clearInterval(intervalId);
    }, [currentIndex]);

    const scrollToImage = (direction) => {
    setCurrentIndex((curr) => {
        const isFirstSlide = currentIndex === 0;
        const isLastSlide = currentIndex === data.length - 1;

        let nextIndex;

        if (direction === 'prev') {
        nextIndex = isFirstSlide ? data.length - 1 : curr - 1;
        } else {
        nextIndex = isLastSlide ? 0 : curr + 1;
        }

        return nextIndex;
    });
    };

    const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    };

    const handlePrevClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    scrollToImage('prev');
    };

    const handleNextClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    scrollToImage('next');
    };

    return (
    <div className='w-[95%] mx-auto h-full'>
        <div className='relative h-full'>

        <a href="#" className='absolute top-1/2 transform -translate-y-1/2 left-5 text-4xl font-semibold text-white z-10 cursor-pointer' onClick={handlePrevClick}>&#10092;</a>
        <a href="#" className="absolute top-1/2 transform -translate-y-1/2 right-5 text-4xl font-semibold text-white z-10 cursor-pointer" onClick={handleNextClick}>&#10093;</a>

        <div className='w-full overflow-hidden'>
            <ul ref={listRef} className='list-none p-0 m-0 transition-opacity duration-1000'>
            {data.map((item, idx) => (
                <li key={item.id} className={`flex-shrink-0 ${idx === currentIndex ? 'opacity-100' : 'opacity-0 hidden'}`}>
                <img src={item.imgUrl} className='w-[100%]' alt={`Slide ${idx + 1}`} />
                </li>
            ))}
            </ul>
        </div>

        <div className='flex justify-center'>
            {data.map((_, idx) => (
            <div key={idx} className={`m-2 mt-2 cursor-pointer text-xs text-center text-[#2C4A42] ${idx === currentIndex ? "bg-[#2C4A42] w-3 h-3 rounded-full" : ""}`} onClick={() => goToSlide(idx)}>
                &#9865;
            </div>
            ))}
        </div>

        </div>
    </div>
    );
};

export default Carrusel;



