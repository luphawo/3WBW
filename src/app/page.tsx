import { Hero } from "@/components/home/Hero";
import { SecurityUpdates } from "@/components/home/SecurityUpdates";
import { CommunityNotices } from "@/components/home/CommunityNotices";
import { MeetNeighbours } from "@/components/home/MeetNeighbours";
import { LocalRecommendations } from "@/components/home/LocalRecommendations";
import { SmartWidgets } from "@/components/home/SmartWidgets";
import { CommunityGallery } from "@/components/home/CommunityGallery";
import { residents, businesses } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <CommunityNotices />
      <SmartWidgets />
      <SecurityUpdates />
      <MeetNeighbours residents={residents} />
      <LocalRecommendations businesses={businesses} />
      <CommunityGallery />
    </>
  );
}
