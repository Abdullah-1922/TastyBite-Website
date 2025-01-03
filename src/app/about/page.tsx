// import AboutTastybite from "@/components/about/AboutTastybite";
// import OurStory from "@/components/about/OurStory";

import AboutExperience from "@/components/about/AboutExperience";
import AboutTastybite from "@/components/about/AboutTastybite";
import OurStory from "@/components/about/OurStory";
import AllPageBanner from "@/components/common/AllPageBanner/AllPageBanner";
import BookOnline from "@/components/home/book-online";
import CustomerReviews from "@/components/home/customer-reviews";

const Page = () => {
    return (
        <div className="">
            {/* about banner section add */}
            <div>
                <AllPageBanner
                    img="https://utfs.io/f/oI7Ou0bdQ6rjiGyuYM7CO0fsq7HAWnKhc6pERGMxZXFQizYo"
                    title="ABOUT US"
                    activelink="About us"
                />
            </div>
            {/* Tastybite about section add */}
            <div className="py-10">
                <AboutTastybite />
                <OurStory />
                <AboutExperience />
                <CustomerReviews />
                <BookOnline />
            </div>
        </div>
    );
};

export default Page;
