import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';

const Breadcrumbs = ({ slug, title }) => {
  return (
    <nav className="prose prose-hr:mt-1 prose-hr:mb-4 md:prose-hr:mt-1 md:prose-hr:mb-4 prose-a:no-underline flex items-center text-sm md:text-base mb-4 border-b sm:border-b-0 pb-2">
      <Link href="/">
        <a className="hover:text-autumn-300 flex" aria-label="Homepage">
          <span>Home</span>
        </a>
      </Link>

      <span className="mr-1">
        <AiOutlineRight className="text-xs relative top-px" />
      </span>

      <Link href={`${slug}`}>
        <a className="inline-block whitespace-nowrap overflow-hidden overflow-ellipsis hover:underline">{title}</a>
      </Link>
    </nav>
  );
};

export default Breadcrumbs;
