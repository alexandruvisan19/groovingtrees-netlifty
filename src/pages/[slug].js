import { Helmet } from 'react-helmet';

import { getPostBySlug, getRecentPosts } from 'lib/posts';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Post.module.scss';
import Breadcrumbs from 'components/Breadcrumbs';
import HeaderPost from 'components/HeaderPost/HeaderPost';
import ContentPost from 'components/ContentPost/ContentPost';
import RecentPosts from 'components/RecentPosts';

export default function Post({ post, socialImage }) {
  const {
    title,
    metaTitle,
    metaDescription,
    content,
    date,
    author,
    categories,
    // modified,
    featuredImage,
    slug,
    readingTime,
  } = post;

  console.log(post);

  const { metadata: siteMetadata = {}, homepage, recentPosts = [] } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = `${homepage}${socialImage}`;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: metaDescription || post.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const metadataOptions = {
    compactCategories: false,
  };

  // const { posts: relatedPostsList, title: relatedPostsTitle } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <div className="m-auto block lg:flex pt-0 md:pt-8 max-w-6xl">
        <div className="prose prose-w-md prose-img:rounded-xl prose-figcaption:text-center hover:prose-img:shadow-lg max-w-none pl-2 pr-2">
          <HeaderPost>
            <Breadcrumbs categories={categories} options={metadataOptions} slug={slug} title={title} />
            {featuredImage && (
              <FeaturedImage
                {...featuredImage}
                src={featuredImage.sourceUrl}
                dangerouslySetInnerHTML={featuredImage.caption}
              />
            )}
            <h1
              className="font-bold"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
            <Metadata
              className={styles.postMetadata}
              date={date}
              author={author}
              categories={categories}
              options={metadataOptions}
              readingTime={readingTime}
            />
          </HeaderPost>
          <ContentPost>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </ContentPost>
        </div>

        <aside className="hidden lg:block pr-6 pl-6 w-2/4">
          {recentPosts.length > 0 && <RecentPosts recentPosts={recentPosts} />}
        </aside>
      </div>

      {/* <section className="prose max-w-6xl m-auto">
        <p>Last updated on {formatDate(modified)}.</p>
        {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 && (
          <div>
            {relatedPostsTitle.name ? (
              <span>
                More from{' '}
                <Link href={relatedPostsTitle.link}>
                  <a>{relatedPostsTitle.name}</a>
                </Link>
              </span>
            ) : (
              <span>More Posts</span>
            )}
            <ul>
              {relatedPostsList.map((post) => (
                <li key={post.title}>
                  <Link href={postPathBySlug(post.slug)}>
                    <a>{post.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section> */}
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      props: {},
      notFound: true,
    };
  }

  const props = {
    post,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`,
  };

  // const { categories, databaseId: postId } = post;

  // const { category: relatedCategory, posts: relatedPosts } = (await getRelatedPosts(categories, postId)) || {};
  // const hasRelated = relatedCategory && Array.isArray(relatedPosts) && relatedPosts.length;

  // if (hasRelated) {
  //   props.related = {
  //     posts: relatedPosts,
  //     title: {
  //       name: relatedCategory.name || null,
  //       link: categoryPathBySlug(relatedCategory.slug),
  //     },
  //   };
  // }

  return {
    props,
  };
}

export async function getStaticPaths() {
  // Only render the most recent posts to avoid spending unecessary time
  // querying every single post from WordPress

  // Tip: this can be customized to use data or analytitcs to determine the
  // most popular posts and render those instead

  const { posts } = await getRecentPosts({
    count: process.env.POSTS_PRERENDER_COUNT, // Update this value in next.config.js!
    queryIncludes: 'index',
  });

  const paths = posts
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      params: {
        slug,
      },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
}
