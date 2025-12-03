"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Instagram,
  Facebook,
  Twitter,
  Share2,
  Copy,
  Check,
  Download,
  Camera,
} from "lucide-react";
import { Section } from "@/components/section";
import { QRCodeCanvas } from "qrcode.react";

export function SnapShare() {
  const [copiedHashtag, setCopiedHashtag] = useState(false);
  const [copiedDriveLink, setCopiedDriveLink] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const websiteUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://example.com";
  const driveLink =
    "https://drive.google.com/drive/folders/1SRO7vmE4OwSqQadbyp62iaqrs-TPDGGH?usp=sharing";
  const hashtags = ["#AnJENaAngForeverNiJAYR"];  
  const shareText = `Join us in celebrating Jay-R & Jen's special day! Check out their wedding website: ${websiteUrl} ${hashtags.join(" ")} 💕`;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHashtag(true);
      setTimeout(() => setCopiedHashtag(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const copyDriveLink = async () => {
    try {
      await navigator.clipboard.writeText(driveLink);
      setCopiedDriveLink(true);
      setTimeout(() => setCopiedDriveLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy Drive link: ", err);
    }
  };

  const shareOnSocial = (
    platform: "instagram" | "facebook" | "twitter" | "tiktok",
  ) => {
    const encodedUrl = encodeURIComponent(websiteUrl);
    const encodedText = encodeURIComponent(shareText);

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    };

    const target = urls[platform];
    if (target) {
      window.open(target, "_blank", "width=600,height=400");
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById(
      "snapshare-qr",
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "wedding-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadDriveQRCode = () => {
    const canvas = document.getElementById(
      "drive-qr",
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "wedding-drive-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const openDrive = () => {
    window.open(driveLink, "_blank", "noopener,noreferrer");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Section
      id="snap-share"
      className="relative bg-transparent py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-white mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]"
            style={{
              textShadow:
                "0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Snap & Share
          </h2>

          <p
            className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4"
            style={{
              textShadow:
                "0 0 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Help us capture and share the magic of our special day
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Left Column: Hashtags + Drive Upload */}
          <motion.div
            className="space-y-4 sm:space-y-6 md:space-y-8"
            variants={fadeInUp}
          >
            {/* Hashtags Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#0A3629]/20 to-[#126555]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

              <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#0A3629]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#0A3629]/50">
                <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
                  {/* Camera Icon */}
                  <div className="relative inline-flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#0A3629]/10 rounded-full blur-xl scale-150 animate-pulse"></div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#0A3629] rounded-full flex items-center justify-center shadow-lg">
                      <Camera className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] mb-2 sm:mb-3">
                      Official Hashtags
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-[#1A1A1A]/70 mb-4 sm:mb-5 md:mb-6">
                      Tag your photos and videos with our hashtags to share your
                      memories
                    </p>
                  </div>

                  {/* Hashtags */}
                  <div className="space-y-3 sm:space-y-4">
                    {hashtags.map((hashtag) => (
                      <div
                        key={hashtag}
                        className="flex items-center justify-center gap-2.5 sm:gap-3 bg-[#F9F8F4]/20 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl border border-[#0A3629]/20 hover:border-[#0A3629]/40 transition-all duration-300 hover:shadow-md"
                      >
                        <span className="text-sm sm:text-base md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] break-all sm:break-normal tracking-wide">
                          {hashtag}
                        </span>
                        <button
                          onClick={() => copyToClipboard(hashtag)}
                          className="p-1.5 sm:p-2 rounded-full bg-white hover:bg-[#0A3629]/10 transition-colors duration-200 shadow-sm flex-shrink-0 border border-[#0A3629]/20"
                          title="Copy hashtag"
                        >
                          {copiedHashtag ? (
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#0A3629]" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Drive Upload Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#0A3629]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

              <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#1A1A1A]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#0A3629]/50">
                <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] mb-2 sm:mb-3">
                      Upload Your Photos & Videos
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-[#1A1A1A]/70">
                      Help us capture our special day! Scan the QR or use the actions below to drop your clips into our shared Drive.
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="inline-flex flex-col items-center bg-[#F9F8F4]/20 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-[#0A3629]/20">
                      <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white shadow-md border border-[#0A3629]/10">
                        <QRCodeCanvas
                          id="drive-qr"
                          value={driveLink}
                          size={isMobile ? 112 : 160}
                          includeMargin
                          className="bg-white"
                        />
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#1A1A1A]/70">
                        📱 Scan with your camera app
                      </p>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                      <button
                        onClick={copyDriveLink}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-white border-2 border-[#0A3629]/30 hover:border-[#0A3629]/50 hover:bg-[#F9F8F4]/40 rounded-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#0A3629] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {copiedDriveLink ? (
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        )}
                        <span>{copiedDriveLink ? "Copied!" : "Copy Link"}</span>
                      </button>

                      <button
                        onClick={downloadDriveQRCode}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-[#0A3629] hover:bg-[#126555] rounded-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                      >
                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        <span>Download QR</span>
                      </button>

                      <button
                        onClick={openDrive}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-[#126555] hover:bg-[#0A3629] rounded-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                      >
                        <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        <span>Open Drive</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QR Code & Social Media */}
          <motion.div className="space-y-4 sm:space-y-6 md:space-y-8" variants={fadeInUp}>
            {/* QR Code Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

              <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#1A1A1A]/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60 text-center">
                <h4 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] mb-4 sm:mb-5 md:mb-6">
                  Share Our Website
                </h4>

                <div className="inline-flex flex-col items-center bg-[#F9F8F4]/10 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-[#0A3629]/20 mb-3 sm:mb-4">
                  <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white shadow-md border border-[#0A3629]/10">
                    <QRCodeCanvas
                      id="snapshare-qr"
                      value={websiteUrl}
                      size={isMobile ? 112 : 160}
                      includeMargin
                      className="bg-white"
                    />
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#0A3629] hover:bg-[#126555] text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    <span>Download QR Code</span>
                  </button>
                </div>

                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#1A1A1A]/70">
                  Scan with any camera app to visit our website
                </p>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#0A3629]/20 to-[#126555]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

              <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#0A3629]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#0A3629]/50">
                <h5 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] mb-4 sm:mb-5 md:mb-6 text-center">
                  Share on Social Media
                </h5>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  <button
                    onClick={() => shareOnSocial("instagram")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform text-white" />
                    <span className="font-[family-name:var(--font-crimson)] font-semibold text-[10px] sm:text-xs md:text-sm">
                      Instagram
                    </span>
                  </button>

                  <button
                    onClick={() => shareOnSocial("facebook")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform text-white" />
                    <span className="font-[family-name:var(--font-crimson)] font-semibold text-[10px] sm:text-xs md:text-sm">
                      Facebook
                    </span>
                  </button>

                  <button
                    onClick={() => shareOnSocial("tiktok")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-black via-gray-800 to-black text-white px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform text-white" />
                    <span className="font-[family-name:var(--font-crimson)] font-semibold text-[10px] sm:text-xs md:text-sm">
                      TikTok
                    </span>
                  </button>

                  <button
                    onClick={() => shareOnSocial("twitter")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform text-white" />
                    <span className="font-[family-name:var(--font-crimson)] font-semibold text-[10px] sm:text-xs md:text-sm">
                      Twitter
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          className="text-center mt-8 sm:mt-12 md:mt-16"
          variants={fadeInUp}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#0A3629]/20 to-[#126555]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

            <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-9 lg:p-10 border-2 border-[#0A3629]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#0A3629]/50">
              <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#1A1A1A] leading-relaxed mb-4 sm:mb-5 md:mb-6">
                We are so excited to celebrate our love with you! See you on our
                special day!
              </p>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 my-4 sm:my-5 md:my-6">
                <div className="h-px w-10 sm:w-12 md:w-16 bg-[#0A3629]/50" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#0A3629]/60 rounded-full" />
                <div className="h-px w-10 sm:w-12 md:w-16 bg-[#0A3629]/50" />
              </div>

              <div className="text-center">
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-ephesis)] text-[#1A1A1A] font-normal">
                  – Jay-R & Jen –
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
