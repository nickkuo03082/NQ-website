import { IPost } from "@/services/interface";
import { blurPlaceholder, formatDate, truncateText } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Post({
  post,
  isInterview = false,
}: {
  post: IPost;
  isInterview?: boolean;
}) {
  const router = useRouter();

  return (
    <Link
      href={`/${router.query.lang}/post/${post.post_name}`}
      className={` ${
        isInterview
          ? "flex-col w-full md:w-[49%]"
          : "flex-row w-full h-[170px] md:h-[200px] border-b-2 border-solid border-[#CECECE] pb-[20px] my-[20px] hover:border-[#424242] transition-all duration-300"
      } flex group`}
    >
      <div
        className={`${
          isInterview ? "w-full h-[205px]" : "w-1/3 mr-[10px] md:mr-[20px] "
        } relative cursor-pointer overflow-hidden`}
      >
        <Image
          className="w-full h-full group-hover:scale-[1.3] transition-all duration-300"
          src={post.thumbnail || "../../static/img/no-image.svg"}
          fill={true}
          alt="image"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={blurPlaceholder()}
        />
      </div>
      <div className="w-full flex flex-col justify-between gap-[0.5rem]">
        <span
          className={` ${isInterview && "order-2 mb-[5px]"} ${
            post.categories[1]?.cat_name === "Meeting Reports" ||
            post.categories[0]?.cat_name === "Meeting Reports"
              ? "text-[#f05022]"
              : "text-[#0071BC]"
          } font-light text-base leading-5 flex items-center font-Din`}
        >
          {post.categories[0]?.cat_name || post.categories[1]?.cat_name}
        </span>

        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          className={` ${
            isInterview ? "order-1 mt-[15px]" : ""
          } cursor-pointer font-bold text-lg leading-5 flex items-center text-[#002c47] font-Din transition-all duration-300`}
        >
          {post.post_title}
        </div>
        {!isInterview && (
          <div
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="font-light text-[14px] md:text-[18px] leading-[1.2rem] md:leading-6 font-Din text-[#002c47]"
            dangerouslySetInnerHTML={{
              __html: truncateText(post.post_content, 240),
            }}
          />
        )}
        <div
          className={` ${
            isInterview ? "order-3" : ""
          } font-light text-[12px] md:text-sm flex items-center font-Din text-[#33566c] gap-[4px] md:gap-[8px]`}
        >
          <span>{formatDate(post.post_date)}</span>
          {post?.reporter && post.reporter.length > 0 && (
            <>
              <span>|</span>
              <span>{post.reporter}</span>
            </>
          )}
          {post?.author_name && post.author_name.length > 0 && (
            <>
              <span>|</span>
              <span>{post.author_name}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Post;
