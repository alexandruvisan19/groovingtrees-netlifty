import Link from 'next/link';

import { authorPathByName } from 'lib/users';
import { formatDate } from 'lib/datetime';

import { FcClock, FcCalendar } from 'react-icons/fc';

const Metadata = ({ author, date, readingTime }) => {
  return (
    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
      <div className="flex items-center">
        {author && (
          <>
            <div>
              <address className="flex items-center">
                {author.avatar && (
                  <img
                    className="rounded-md shadow-sm shadow-slate-300 h-6 w-6 !mt-0 !mb-0 mr-2 "
                    width={author.avatar.width}
                    height={author.avatar.height}
                    src={author.avatar.url}
                    alt="Author Avatar"
                  />
                )}
                <Link href={authorPathByName(author.name)}>
                  <a className="text-blue-600 hover:text-blue-800 hover:no-underline" rel="author">
                    {author.name}
                  </a>
                </Link>
              </address>
            </div>
          </>
        )}
        {date && (
          <div>
            <time className="flex items-center" pubdate="pubdate" dateTime={date}>
              <span className="p-1 font-semibold">|</span>
              {formatDate(date)}&nbsp;
              <FcCalendar className="text-xl" />
            </time>
          </div>
        )}
      </div>

      <div>
        {readingTime && (
          <>
            <div className="flex items-center">
              <FcClock className="text-xl" />
              &nbsp;
              {readingTime} min read
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Metadata;
