const ContentPost = ({ children }) => {
  return (
    <section className="max-w-6xl m-auto">
      <div className="max-w-none prose prose-xl prose-blue">{children}</div>
    </section>
  );
};

export default ContentPost;
