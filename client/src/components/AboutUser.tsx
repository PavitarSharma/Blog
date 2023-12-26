import { getFullDay } from "../common/date";

type TSocialLink = {
  facebook: string;
  github: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
};

type TAbloutUserProps = {
  bio: string;
  social_links: TSocialLink;
  createdAt: string;
  className?: string;
};

const AboutUser = ({
  bio,
  social_links,
  createdAt,
  className,
}: TAbloutUserProps) => {
  return (
    <div className={`md:w-[90%] md:mt-7 ${className}`}>
      <p className="text-xl leading-7">
        {bio?.length ? bio : "Nothing to read here"}
      </p>

      <div className="flex items-center gap-x-7 gap-y-2 flex-wrap my-7 text-dark-grey">
        {(Object.keys(social_links) as Array<keyof TSocialLink>).map(
          (key: keyof TSocialLink) => {
            const link = social_links[key];

            return link ? (
              <a key={key} href={link} target="_blank">
                <i
                  className={`fi ${
                    key === "website" ? "fi-rr-globe" : `fi-brands-${key}`
                  } text-2xl hover:text-black`}
                ></i>
              </a>
            ) : null;
          }
        )}
      </div>

      <p className="text-xl leading-7 text-dark-grey">
        Joined on {getFullDay(createdAt)}
      </p>
    </div>
  );
};

export default AboutUser;
