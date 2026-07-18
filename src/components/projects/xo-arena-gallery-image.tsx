"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { xoArenaGalleryImageClassNames as styles } from "./xo-arena-gallery-image.class-names";
import artwork from "./xo-arena-gallery-image.module.css";

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
    <figure className={styles.root} data-loaded={loaded}>
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 54rem) 92vw, 44vw"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        <Skeleton className={cn(styles.skeleton, artwork.skeleton)} />
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.index}>{index}</span>
        <div className={styles.copy}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </figcaption>
    </figure>
  );
}
