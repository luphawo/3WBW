"use client";

import { Hero } from "@/components/home/Hero";
import { CommunityNews } from "@/components/home/CommunityNews";
import { SecurityUpdates } from "@/components/home/SecurityUpdates";
import { CommunityNotices } from "@/components/home/CommunityNotices";
import { MeetNeighbours } from "@/components/home/MeetNeighbours";
import { LocalRecommendations } from "@/components/home/LocalRecommendations";
import { WhatsAppAccess } from "@/components/home/WhatsAppAccess";
import { SmartWidgets } from "@/components/home/SmartWidgets";
import { CommunityGallery } from "@/components/home/CommunityGallery";
import { articles, alerts, incidents, notices, residents, businesses, galleryImages } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <SmartWidgets />
      <CommunityNews articles={articles} />
      <SecurityUpdates alerts={alerts} incidents={incidents} />
      <CommunityNotices notices={notices} />
      <MeetNeighbours residents={residents} />
      <LocalRecommendations businesses={businesses} />
      <WhatsAppAccess />
      <CommunityGallery images={galleryImages} />
    </>
  );
}
