import React, { SyntheticEvent } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { XIcon } from '@heroicons/react/solid';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface IImageCarousel {
  onClose: () => void;
  images: { src: string }[];
}

/**
 * 여러 이미지를 보여주는 캐러셀
 * @param param0
 * @returns
 */
function ImageCarousel({ onClose, images }: IImageCarousel) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="fixed inset-0 bg-black bg-opacity-90" onClick={onClose} />
      <Carousel
        className="md:w-2/3"
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        swipeable
      >
        {images.map((image, index) => (
          <Image
            key={`carousel-image-${index}`}
            loading="lazy"
            src={image.src}
            alt={`carousel-image-${index}`}
            width={1100}
            height={600}
            objectFit="cover"
          />
        ))}
      </Carousel>

      <XIcon
        aria-label="Close Button"
        className="absolute text-gray-200 transition ease-out cursor-pointer h-7 top-4 right-6 hover:text-red-500"
        onClick={onClose}
      />
    </div>
  );
}

export default ImageCarousel;
