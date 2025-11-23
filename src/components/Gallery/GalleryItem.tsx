import React from "react";
import { ImageWithDimensions } from "@/types/types";
import ExtraInfo from "./ExtraInfo";
import { Image } from "@unpic/react";

type Props = {
  img: ImageWithDimensions;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<ImageWithDimensions | null>
  >;
  hasPriority?: boolean;
  isLCP?: boolean;
};

const GalleryItem = (props: Props) => {
  const { img, setSelectedImage, hasPriority, isLCP } = props;

  const handleImageClick = () => {
    React.startTransition(() => {
      //disable view transition for the bio content to prevent it from animating
      document
        .getElementById("bio-content")
        ?.classList.add("disable-viewtransition");
      setSelectedImage(img);
    });
  };

  //only show age at takenAt date if image has takenAt property and there is only one cat in the image
  const hasExtraInfo = Boolean(img.takenAt);
  const hasMultipleCats = img.cats.length > 1;

  return (
    <div className="relative cursor-pointer hover:opacity-95 hover:scale-105 transition-all duration-300">
      {hasExtraInfo && (
        <ExtraInfo
          birthDate={hasMultipleCats ? undefined : img.cats[0].birthDate}
          takenAt={img.takenAt as string}
        />
      )}

      <button onClick={handleImageClick}>
        <Image
          src={img.url}
          width={img.width / 2}
          height={img.height / 2}
          alt="kat"
          className="rounded-xl"
          priority={hasPriority}
          fetchPriority={isLCP ? "high" : "auto"}
        />
      </button>
    </div>
  );
};

export default GalleryItem;
