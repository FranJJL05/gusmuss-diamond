import { useState, useEffect } from 'react';

// Galería de imágenes con autoplay y transición fade
// BEM: .image-gallery / .image-gallery__slide / .image-gallery__dots
export default function ImageGallery({ images = [], autoPlay = true, interval = 3000 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, autoPlay, interval]);

  if (!images.length) return null;

  return (
    <div className="image-gallery relative w-full overflow-hidden rounded-sm">
      {/* Slides */}
      {images.map((src, i) => (
        <div
          key={i}
          className={`image-gallery__slide absolute inset-0 transition-opacity duration-700 ease-in-out
            ${i === current ? 'opacity-100 relative' : 'opacity-0 absolute'}`}
        >
          <img
            src={src}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dots indicadores */}
      {images.length > 1 && (
        <div className="image-gallery__dots absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300
                ${i === current ? 'bg-gus-gold w-4' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}

      {/* Flechas */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(c => (c - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center z-10 hover:bg-black/70 transition-colors"
          >‹</button>
          <button
            onClick={() => setCurrent(c => (c + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center z-10 hover:bg-black/70 transition-colors"
          >›</button>
        </>
      )}
    </div>
  );
}
