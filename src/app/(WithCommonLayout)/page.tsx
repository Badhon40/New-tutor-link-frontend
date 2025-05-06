import ActionBanner from "@/components/homePage/ActionBanner";
import Banner from "@/components/homePage/Banner";
import BenefitsSection from "@/components/homePage/BenefitsSection";
import Category from "@/components/homePage/Category";
import Partnerships from "@/components/homePage/PartnershipSection";
import ReviewSection from "@/components/homePage/ReviewSection";
import Slider from "@/components/homePage/Slider";
import TutorSectionWrapper from "@/components/homePage/TutorSectionWrapper";
import { getAllUsers } from "@/services/auth";
import { getAllReviews } from "@/services/review";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TutorLink | Home",
  description: "TutorLink helps you to find Best tutors",
};

export default async function HomePage() {
  const users = await getAllUsers();
  const reviewData = await getAllReviews();
  const reviews = reviewData?.data
  const data = users.data;
  return (
    <div className="mt-12">
      <Banner />
      <TutorSectionWrapper />
      <Slider data={data} />
      <BenefitsSection />
      <ActionBanner />
      <Category></Category>
      <ReviewSection reviews={reviews}></ReviewSection>
      <Partnerships />

    </div>
  );
}
