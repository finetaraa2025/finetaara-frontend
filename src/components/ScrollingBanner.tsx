import { useEffect, useRef, useState } from "react";

const DEFAULT_ANNOUNCEMENTS = [
  "✨ New Arrivals Every Week!",
  "💎 Special Festive offers",
  "🎁 Special Discounts for First-Time Buyers",
  "📞 WhatsApp Support: +91 7981244452",
];

export const ScrollingBanner = () => {
  const [announcements, setAnnouncements] = useState<string[]>(
    DEFAULT_ANNOUNCEMENTS
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const speed = 50; // pixels per second

  // Fetch announcements from backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/announcements/`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        // Assumes backend returns list of objects: [{ id: 1, text: "Promo" }, ...]
        if (data && data.length > 0) {
          const texts = data.map((item: any) => item.text);
          setAnnouncements(texts);
        }
      } catch (error) {
        console.warn(
          "Using default announcements. Backend fetch failed:",
          error
        );
        // State remains as DEFAULT_ANNOUNCEMENTS
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setOffset((prev) => {
        const newOffset = prev + speed * deltaTime;
        const contentWidth = scrollRef.current?.scrollWidth || 0;
        const halfWidth = contentWidth / 2;
        return newOffset >= halfWidth ? newOffset - halfWidth : newOffset;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    //<div className="fixed top-0 left-0 right-0 bg-primary text-primary-foreground py-2.5 overflow-hidden z-[60]">
    <div className="fixed top-0 left-0 right-0 h-[42px] bg-primary text-primary-foreground overflow-hidden z-[60] flex items-center">
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap"
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {[
          ...announcements,
          ...announcements,
          ...announcements,
          ...announcements,
        ].map((text, index) => (
          <span key={index} className="mx-8 text-sm font-medium tracking-wide">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
