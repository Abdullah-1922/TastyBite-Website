//packages
import Image from "next/image";
import Link from "next/link";
import React from "react";
// components
import { FaComments, FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";

const Blog_data = () => {
  const posts = [1, 2, 3];

  return (
    <div className="flex flex-col  gap-y-10">
      {posts.map((item) => (
        <div key={item}>
          <div className="space-y-6">
            {/* image */}
            <Image
              src={
                "https://utfs.io/f/oI7Ou0bdQ6rjhoyJeZcqQY8f2PI561raKgo4j7ZeTtuXiNAk"
              }
              alt="Description of image"
              width={500}
              height={500}
              className="object-cover w-full rounded-lg" // Options: 'cover', 'contain', etc.
            />
            {/*author name, date ,commonet */}
            <div className="flex items-center flex-wrap gap-y-2 justify-start font-semibold gap-x-6">
              <h2 className="text-[15px] leading-[1px] md:text-[18px] flex items-center gap-1 text-black">
                <FaUser className="text-xl text-green-700" />
                Prosanta Roy
              </h2>
              {/*comment  */}
              <h2 className="text-[15px] leading-[1px] md:text-[18px] flex items-center gap-1 text-black">
                <FaComments className="text-xl text-green-700" />
                35 Comments
              </h2>
              {/* date */}
              <h2 className="text-[15px] leading-[1px] md:text-[18px] flex items-center gap-1 text-black">
                <MdOutlineDateRange className="text-xl text-green-700" />
                24th March 2024
              </h2>
            </div>
            {/* title ,details */}
            <div className="space-y-6">
              {/* title */}
              <h1 className="text-[30px] md:text-[44px] leading-[1.4] text-black hover:text-green-700 font-extrabold">
                QUICK CRAVINGS: UNRAVELING FAST FOOD DELIGHTS
              </h1>
              <p className="text-[18px] leading-[28px]  text-[#5c5c5b] primary-gray font-normal">
                There are many variations of passages of Lorem Ipsum available,
                but majority have suffered Lorem haca ullamcorper donec ante
                habi believable. If you are going to use a passage of Lorem
                Ipsum cibo mundi ea duo donec imperdiet eturpis varius per a
                augue magna hac. dolor sit amet, teration in some form, by
                injected humour, or randomised words which dont look ev
              </p>
              {/* blog details link */}
              <div>
                <p className="text-xl text-black w-fit hover:text-green-700 font-bold flex items-center gap-">
                  <Link
                    className="w-fit flex gap-2 items-center"
                    href="/blog/Id"
                  >
                    <GoArrowRight
                      scale={"1.2"}
                      className="text-2xl font-black"
                    />
                    Read More
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog_data;