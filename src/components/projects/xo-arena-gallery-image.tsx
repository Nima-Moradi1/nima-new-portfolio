"use client";

import Image from "next/image";
import { useState } from "react";

type XoArenaGalleryImageProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
  width: number;
  height: number;
  index: string;
};

export function XoArenaGalleryImage({
  src,
  alt,
  title,
  description,
  width,
  height,
  index,
}: XoArenaGalleryImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className="xo-gallery-card" data-loaded={loaded}>
      <div className="xo-gallery-card__media">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 54rem) 92vw, 44vw"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        <span className="xo-gallery-card__skeleton" aria-hidden="true" />
      </div>
      <figcaption>
        <span>{index}</span>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </figcaption>
    </figure>
  );
}
