import Image from 'next/image';

const ImagePost = ({ width, height, src, alt, srcSet }) => {
  return (
    <div className="mb-6 mt-2">
      <Image
        src={src}
        alt={alt || 'Blog Post Main Image'}
        className="rounded-2xl"
        width={width || '1024'}
        height={height || '685'}
        srcSet={srcSet}
        // placeholder="blur"
        // blurDataURL={src}
        loading="eager"
        layout="intrinsic"
      />
    </div>
  );
};

export default ImagePost;
