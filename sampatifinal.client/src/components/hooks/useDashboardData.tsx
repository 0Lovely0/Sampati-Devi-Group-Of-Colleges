import { useState, useEffect } from "react";
import { getAllBanners } from "../../services/bannerService";
import { getAllEvents } from "../../services/eventService";
import {getAllToppers} from "../../services/toppersService";
import {getAllCommitteeMembers} from "../../services/committeeService";
import {getAllGalleries} from "../../services/galleryService";
import {getAllVideos} from "../../services/videoService";
import {getAllNotifications} from "../../services/notificationService";
import {getAllNews} from "../../services/newsService";

export const useDashboardData = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [toppers, setToppers] = useState<any[]>([]);
  const [committee, setCommittee] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [video, setVideo] = useState<any[]>([]);
  const [notice, setNotice] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const [bannerData, eventData, topperData, committeeData, galleryData, videoData, noticeData, newsData] = await Promise.all([
        getAllBanners(),
        getAllEvents(),
        getAllToppers(),
        getAllCommitteeMembers(),
        getAllGalleries(),
        getAllVideos(),
        getAllNotifications(),
        getAllNews(),
      ]);
      setBanners(bannerData || []);
      setEvents(eventData || []);
      setToppers(topperData || []);
      setCommittee(committeeData || []);
      setGallery(galleryData || []);
      setVideo(videoData || []);
      setNotice(noticeData || []);
      setNews(newsData || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return {toppers, banners, events, loading, committee, gallery, video, notice, news, refresh };
};