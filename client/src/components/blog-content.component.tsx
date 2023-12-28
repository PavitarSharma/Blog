/* eslint-disable @typescript-eslint/no-explicit-any */

const Img = ({ url, caption }: { url: string; caption: string }) => {
  return (
    <div>
      <img src={url} />
      {caption.length && (
        <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey">
          {caption}
        </p>
      )}
    </div>
  );
};

const Quote = ({ quote, caption }: { quote: string; caption: string }) => {
  return (
    <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple">
      <p className="text-xl leading-10 md:text-2xl">{quote}</p>
      {caption.length && (
        <p className="w-full text-purple my-3  text-base ">{caption}</p>
      )}
    </div>
  );
};

const List = ({ style, items }: { style: string; items: any }) => {
  return (
    <ol
      className={`pl-5 ${style === "ordered" ? "list-decimal" : "list-disc"}`}
    >
      {items.map((listItem: any, i: number) => (
        <li
          key={i}
          className="my-4"
          dangerouslySetInnerHTML={{ __html: listItem }}
        ></li>
      ))}
    </ol>
  );
};

const BlogContent = ({ block }: { block: any }) => {
  const { type, data } = block;

  if (type === "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data?.text }}></p>;
  } else if (type === "header") {
    if (data?.level === 3) {
      return (
        <h3
          dangerouslySetInnerHTML={{ __html: data?.text }}
          className="text-3xl font-bold"
        ></h3>
      );
    }
    return (
      <h2
        dangerouslySetInnerHTML={{ __html: data?.text }}
        className="text-4xl font-bold"
      ></h2>
    );
  } else if (type === "image") {
    return <Img url={data.file.url} caption={data.caption} />;
  } else if (type === "quote") {
    return <Quote quote={data.text} caption={data.caption} />;
  } else if (type === "list") {
    return <List style={data.style} items={data.items} />;
  }
};

export default BlogContent;
