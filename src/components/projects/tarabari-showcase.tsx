import Image from "next/image";
import { TarabariClip } from "./tarabari-clip";
import styles from "./tarabari-showcase.module.css";

const frames = {
  pickup: "/assets/projects/tarabari-nima/container-pickup.webp",
  port: "/assets/projects/tarabari-nima/port-loading.webp",
  sea: "/assets/projects/tarabari-nima/ship-passage.webp",
  air: "/assets/projects/tarabari-nima/aircraft-takeoff.webp",
} as const;

type GalleryItem = {
  id: string;
  title: string;
  alt: string;
};

type TarabariShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  videoTitle: string;
  videoDescription: string;
  videoAria: string;
  galleryTitle: string;
  galleryDescription: string;
  gallery: GalleryItem[];
};

export function TarabariShowcase({
  eyebrow,
  title,
  description,
  videoTitle,
  videoDescription,
  videoAria,
  galleryTitle,
  galleryDescription,
  gallery,
}: TarabariShowcaseProps) {
  return (
    <section className={styles.root} aria-labelledby="tarabari-media-title">
      <div className={styles.shell}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.title} id="tarabari-media-title">
              {title}
            </h2>
          </div>
          <p className={styles.description}>{description}</p>
        </div>

        <figure className={styles.videoFrame}>
          <TarabariClip ariaLabel={videoAria} />
          <figcaption className={styles.videoCaption}>
            <span className={styles.frameNumber}>01 / 05</span>
            <span>
              <strong>{videoTitle}</strong>
              <small>{videoDescription}</small>
            </span>
          </figcaption>
        </figure>

        <div className={styles.galleryHeading}>
          <h3>{galleryTitle}</h3>
          <p>{galleryDescription}</p>
        </div>
        <div className={styles.gallery} data-testid="tarabari-gallery">
          {gallery.map((item, index) => {
            const src = frames[item.id as keyof typeof frames];
            if (!src) return null;
            return (
              <figure className={styles.galleryCard} key={item.id}>
                <Image
                  className={styles.galleryImage}
                  src={src}
                  alt={item.alt}
                  width={1440}
                  height={900}
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
                <figcaption>
                  <span className={styles.frameNumber}>
                    {String(index + 2).padStart(2, "0")} / 05
                  </span>
                  <strong>{item.title}</strong>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
