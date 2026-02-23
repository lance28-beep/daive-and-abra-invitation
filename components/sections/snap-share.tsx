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
import Image from "next/image";

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
    "https://drive.google.com/drive/folders/1XRDjgUPKZy8bszFhYORGejyeEzTpKORM?usp=sharing";
  const hashtags = ["#AbracaDaiveEra", "#ABRAsavedDAIVEstForLast", "#AbrafoundDaivest"];
  const shareText = `Join us in celebrating Daive & Abra's special day! Check out their wedding website: ${websiteUrl} ${hashtags.join(" ")} 💕`;

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

  const cardStyle = {
    background: "linear-gradient(135deg, #FDF8F1 0%, #F5E7D3 40%, #FDF8F1 100%)",
    boxShadow: "0 0 0 1px rgba(166,124,82,0.22), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
  };

  return (
    <Section
      id="snap-share"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-6 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ color: "#F5E7D3" }}>
            Snap & Share!
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ color: "#F5E7D3" }}>
            Share your photos and memories with us by uploading them via the QR code above and don&apos;t forget to tag us with #AbracaDaiveEra #ABRAsavedDAIVEstForLast #AbrafoundDaivest so we can cherish them too!
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
              <div
                className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden border transition-all duration-300"
                style={{ ...cardStyle, border: "1px solid rgba(163,151,106,0.3)" }}
              >
                <div className="absolute inset-0 opacity-50 rounded-xl sm:rounded-2xl z-0" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
                <div className="relative z-10 text-center space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="p-2.5 sm:p-3 rounded-full shadow-lg border w-fit mx-auto" style={{ backgroundColor: "rgba(122,78,46,0.1)", borderColor: "rgba(166,124,82,0.4)" }}>
                    <Camera className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" style={{ color: "#7A4E2E" }} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-normal mb-2 sm:mb-3" style={{ color: "#7A4E2E" }}>
                      Official Hashtags
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] mb-4 sm:mb-5 md:mb-6" style={{ color: "#A67C52" }}>
                      Tag your photos and videos with our hashtags to share your
                      memories
                    </p>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {hashtags.map((hashtag) => (
                      <div
                        key={hashtag}
                        className="flex items-center justify-center gap-2.5 sm:gap-3 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl border transition-all duration-300"
                        style={{ backgroundColor: "rgba(255,255,255,0.9)", borderColor: "rgba(166,124,82,0.35)" }}
                      >
                        <span className="text-sm sm:text-base md:text-xl font-[family-name:var(--font-crimson)] font-normal break-all sm:break-normal tracking-wide" style={{ color: "#7A4E2E" }}>
                          {hashtag}
                        </span>
                        <button
                          onClick={() => copyToClipboard(hashtag)}
                          className="p-1.5 sm:p-2 rounded-full border transition-colors duration-200 flex-shrink-0"
                          style={{ backgroundColor: "rgba(245,231,211,0.95)", borderColor: "rgba(166,124,82,0.45)" }}
                          title="Copy hashtag"
                        >
                          {copiedHashtag ? (
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: "#7A4E2E" }} />
                          ) : (
                            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: "#A67C52" }} />
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
              <div
                className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden border transition-all duration-300"
                style={{ ...cardStyle, border: "1px solid rgba(163,151,106,0.3)" }}
              >
                <div className="absolute inset-0 opacity-50 rounded-xl sm:rounded-2xl z-0" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
                <div className="relative z-10 text-center space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-normal mb-2 sm:mb-3" style={{ color: "#7A4E2E" }}>
                      Upload Your Photos & Videos
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)]" style={{ color: "#A67C52" }}>
                      Help us capture our special day! Scan the QR or use the actions below to drop your clips into our shared Drive.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="inline-flex flex-col items-center p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border" style={{ backgroundColor: "rgba(255,255,255,0.95)", borderColor: "rgba(166,124,82,0.35)" }}>
                      <div className="relative mb-3 sm:mb-4 w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] rounded-lg sm:rounded-xl overflow-hidden bg-white">
                        <Image
                          src="/QR/googleshare.png"
                          alt="Scan to upload photos and videos to Google Drive"
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
                        />
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)]" style={{ color: "#A67C52" }}>
                        📱 Scan with your camera app
                      </p>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                      <button
                        onClick={copyDriveLink}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 border rounded-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        style={{ backgroundColor: "#7A4E2E", color: "#F5E7D3", borderColor: "rgba(166,124,82,0.6)" }}
                      >
                        {copiedDriveLink ? (
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        )}
                        <span>{copiedDriveLink ? "Copied!" : "Copy Link"}</span>
                      </button>
                      <a
                        href="/QR/googleshare.png"
                        download="googleshare.png"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 border rounded-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        style={{ backgroundColor: "rgba(245,231,211,0.95)", color: "#7A4E2E", borderColor: "rgba(166,124,82,0.6)" }}
                      >
                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        <span>Download QR</span>
                      </a>
                      <button
                        onClick={openDrive}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 border rounded-lg text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        style={{ backgroundColor: "#7A4E2E", color: "#F5E7D3", borderColor: "rgba(166,124,82,0.6)" }}
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
              <div
                className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden border text-center transition-all duration-300"
                style={{ ...cardStyle, border: "1px solid rgba(163,151,106,0.3)" }}
              >
                <div className="absolute inset-0 opacity-50 rounded-xl sm:rounded-2xl z-0" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
                <h4 className="relative z-10 text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-5 md:mb-6" style={{ color: "#7A4E2E" }}>
                  Share Our Website
                </h4>
                <div className="relative z-10 inline-flex flex-col items-center p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border mb-3 sm:mb-4" style={{ backgroundColor: "rgba(255,255,255,0.95)", borderColor: "rgba(166,124,82,0.35)" }}>
                  <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white border" style={{ borderColor: "rgba(166,124,82,0.4)" }}>
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
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border rounded-lg transition-all duration-200 text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal"
                    style={{ backgroundColor: "#7A4E2E", color: "#F5E7D3", borderColor: "rgba(166,124,82,0.6)" }}
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Download QR Code</span>
                  </button>
                </div>
                <p className="relative z-10 text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)]" style={{ color: "#A67C52" }}>
                  Scan with any camera app to visit our website
                </p>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="relative group">
              <div
                className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden border transition-all duration-300"
                style={{ ...cardStyle, border: "1px solid rgba(163,151,106,0.3)" }}
              >
                <div className="absolute inset-0 opacity-50 rounded-xl sm:rounded-2xl z-0" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
                <h5 className="relative z-10 text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-normal mb-4 sm:mb-5 md:mb-6 text-center" style={{ color: "#7A4E2E" }}>
                  Share on Social Media
                </h5>

                <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  <button
                    onClick={() => shareOnSocial("instagram")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl border"
                    style={{ borderColor: "rgba(163,151,106,0.3)" }}
                  >
                    <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform text-white" />
                    <span className="font-[family-name:var(--font-crimson)] font-normal text-[10px] sm:text-xs md:text-sm">
                      Instagram
                    </span>
                  </button>
                  <button
                    onClick={() => shareOnSocial("facebook")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl border"
                    style={{ borderColor: "rgba(163,151,106,0.3)" }}
                  >
                    <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform text-white" />
                    <span className="font-[family-name:var(--font-crimson)] font-normal text-[10px] sm:text-xs md:text-sm">
                      Facebook
                    </span>
                  </button>
                  <button
                    onClick={() => shareOnSocial("tiktok")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl border"
                    style={{ backgroundColor: "rgba(69,48,31,0.8)", borderColor: "rgba(163,151,106,0.3)", color: "#F5D8B0" }}
                  >
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" style={{ color: "#F5D8B0" }} />
                    <span className="font-[family-name:var(--font-crimson)] font-normal text-[10px] sm:text-xs md:text-sm">
                      TikTok
                    </span>
                  </button>
                  <button
                    onClick={() => shareOnSocial("twitter")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-2.5 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl border"
                    style={{ borderColor: "rgba(163,151,106,0.3)" }}
                  >
                    <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform text-white" />
                    <span className="font-[family-name:var(--font-crimson)] font-normal text-[10px] sm:text-xs md:text-sm">
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
          <div className="relative max-w-3xl mx-auto">
            <div
              className="relative rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-9 lg:p-10 overflow-hidden border transition-all duration-300"
              style={{ ...cardStyle, border: "1px solid rgba(166,124,82,0.3)" }}
            >
              <div className="absolute inset-0 opacity-50 rounded-xl sm:rounded-2xl z-0" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
              <p className="relative z-10 text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] leading-relaxed mb-4 sm:mb-5 md:mb-6" style={{ color: "#7A4E2E" }}>
                We are so excited to celebrate our love with you! See you on our
                special day!
              </p>
              <div className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 my-4 sm:my-5 md:my-6">
                <div className="h-px w-10 sm:w-12 md:w-16" style={{ backgroundColor: "rgba(166,124,82,0.35)" }} />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ backgroundColor: "#A67C52" }} />
                <div className="h-px w-10 sm:w-12 md:w-16" style={{ backgroundColor: "rgba(166,124,82,0.35)" }} />
              </div>
              <div className="relative z-10 text-center">
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal" style={{ color: "#7A4E2E" }}>
                  – Daive & Abra –
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
