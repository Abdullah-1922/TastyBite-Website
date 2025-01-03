// Packages
import dynamic from "next/dynamic";
import Link from "next/link";

// Local imports
import SectionHeader from "../common/sectionHeader/sectionHeader";
import BlackRubBG from "../ui/black-rub-bg";
const MenusContaner = dynamic(() => import("./menus-container"), {
  ssr: false,
});

const OurSpecialMenus = () => {
  return (
    <BlackRubBG placeholderImg={false}>
      <SectionHeader
        heading="Fresh from TastyBite"
        title="Our Special Menu"
        headingTextColor="text-white"
      />
      <MenusContaner />

      <div className="mt-16 flex justify-center">
        <Link
          href={"/foods"}
          className="text-primary-orange hover:text-white underline duration-300 text-xl"
        >
          Find All Foods
        </Link>
      </div>
    </BlackRubBG>
  );
};

export default OurSpecialMenus;
