const HeaderPost = ({ children }) => {
  return (
    <header className="max-w-6xl m-auto">
      <div className="max-w-none prose prose-sm md:prose-lg">{children}</div>
    </header>
  );
};

export default HeaderPost;
