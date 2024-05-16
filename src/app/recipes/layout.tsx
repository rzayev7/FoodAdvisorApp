import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { RecipesHeader } from "@/components/RecipesHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipes",
};

export default function Layout({ children }: any) {
  return (
    <>
      <Navigation />
      <RecipesHeader />
      {children}
      <Footer />
    </>
  );
}