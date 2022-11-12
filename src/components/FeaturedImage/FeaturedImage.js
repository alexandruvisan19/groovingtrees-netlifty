import ClassName from 'models/classname';

import ImagePost from 'components/ImagePost';

import styles from './FeaturedImage.module.scss';

const FeaturedImage = ({ className, alt, ...rest }) => {
  const featuredImageClassName = new ClassName(styles.featuredImage);

  featuredImageClassName.addIf(className, className);

  return <ImagePost className={featuredImageClassName} alt={alt} {...rest} />;
};

export default FeaturedImage;
