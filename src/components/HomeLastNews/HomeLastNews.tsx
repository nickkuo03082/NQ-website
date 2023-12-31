import Image from "next/image";
import Link from "next/link";
import shevron from "static/img/shevron.svg";
import whiteShevron from "static/img/shevron-white.svg";
import SmallPostCard from "@/components/SmallPostCard/SmallPostCard";
import { t } from "i18next";
import { FirstBlock } from "@/services/interface";
import { findFirstCategory, formatDate, generateUniqueId } from "@/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function HomeLastNews({ data }: { data: FirstBlock }) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();

  const currentLanguage = router.query.lang as string;

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const slicedNews = isMobile
    ? data.latestNews.slice(0, 4)
    : data.latestNews.slice(1, 5);

  return (
    <div className="container pb-[70px]">
      <div className="flex justify-between items-center py-10">
        <div className="font-light text-2xl leading-7 flex items-center text-[#002c47] font-Din">
          {data.title}
        </div>
        <Link
          href={`/${router.query.lang}/category/all`}
          className="flex items-center leading-0 font-light text-base leading-5 text-[#002c47] font-Din group hover:scale-[1.1] transition-all duration-300"
        >
          {t("More")}{" "}
          <Image
            src={shevron}
            className="ml-4 group-hover:rotate-[360deg] transition-all duration-300 group-hover:scale-[2]"
            alt="arrow"
            width="5"
            height="10"
          />
        </Link>
      </div>
      <div className="flex gap-[30px] tb:h-[450px] w-full">
        <Link
          href={`/${router.query.lang}/post/${data?.latestNews[0]?.post_name}`}
          className={`${
            data?.latestNews[0]?.categories.some((obj) => obj.cat_ID === 2)
              ? "border-b-2 border-orange-600 border-solid"
              : ""
          } group hidden md:flex md:w-1/2 tb:w-2/3 tb:h-full px-[17px] py-[28px] items-end justify-start relative lazy-background bg-cover transition-all duration-300 hover:scale-[1.02]`}
          style={{
            backgroundImage: `url(${data?.latestNews[0]?.thumbnail})`,
            backgroundPosition: "center",
          }}
        >
          <div className="gradient-background w-full h-1/2 bottom-0 left-0 !absolute" />
          <div className="gradient-background opacity-0 w-full h-full bottom-0 left-0 !absolute bg-[#4e4e4e33] group-hover:opacity-100 group-hover:h-full transition-all duration-300" />
          <div className="z-1 relative">
            {data?.latestNews[0]?.categories.some((obj) => obj.cat_ID === 2) ? (
              <div className="font-normal text-lg leading-5 text-orange-600 font-Din">
                {t("Meeting Reports")}:
              </div>
            ) : (
              <div className="font-normal text-lg leading-5 text-white font-Din transition-all duration-300">
                {findFirstCategory(data?.latestNews[0]?.categories)}
              </div>
            )}
            <h5 className="text-lg leading-5 flex items-center text-white font-Din font-bold mt-1  transition-all duration-300">
              {data?.latestNews[0]?.post_title}
            </h5>
            <span className="block font-light text-sm leading-4 text-white font-Din mt-1 transition-all duration-300">
              {formatDate(data?.latestNews[0]?.post_date, currentLanguage)}
            </span>
            {data?.latestNews[0]?.categories.some(
              (obj) => obj.cat_ID === 2
            ) && (
              <div className="font-normal text-lg flex items-center text-white font-Din mt-2 transition-all duration-300">
                {t("Read the Report")}{" "}
                <Image
                  src={whiteShevron}
                  className="ml-4 group-hover:rotate-[360deg] transition-all duration-300 group-hover:scale-[2]"
                  alt="arrow"
                  width="5"
                  height="10"
                />
              </div>
            )}
          </div>
        </Link>
        <div className="w-full md:w-1/2 tb:w-1/3 tb:max-w-[430px] h-full flex flex-col justify-between">
          {slicedNews.map((post, index) => (
            <SmallPostCard
              post={post}
              key={generateUniqueId()}
              isHiddenLine={index === slicedNews.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeLastNews;
