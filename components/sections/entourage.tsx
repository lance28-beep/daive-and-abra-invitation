"use client";

import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Loader2, Users } from "lucide-react";

interface EntourageMember {
  Name: string;
  RoleCategory: string;
  RoleTitle: string;
  Email: string;
}

const ROLE_CATEGORY_ORDER = [
  "The Couple",
  "Parents of the Groom",
  "Parents of the Bride",
  "Best Man",
  "Maid of Honor",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Groomsmen",
  "Bridesmaids",
  "Flower Girls",
  "Flower Girl & Boy",
  "Ring Bearer",
  "Ring/Coin Bearers",
];

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const renderTwoColumnRows = (members: EntourageMember[]) => {
    const half = Math.ceil(members.length / 2);
    const left = members.slice(0, half);
    const right = members.slice(half);
    const maxLen = Math.max(left.length, right.length);
    const rows: React.ReactNode[] = [];

    for (let i = 0; i < maxLen; i++) {
      const l = left[i];
      const r = right[i];
      rows.push(
        <React.Fragment key={`two-col-row-${i}`}>
          <div className="px-2 sm:px-3 md:px-4">
            {l ? (
              <NameItem member={l} align="right" />
            ) : (
              <div className="py-0.5 sm:py-1 md:py-1.5" />
            )}
          </div>
          <div className="px-2 sm:px-3 md:px-4">
            {r ? (
              <NameItem member={r} align="left" />
            ) : (
              <div className="py-0.5 sm:py-1 md:py-1.5" />
            )}
          </div>
        </React.Fragment>,
      );
    }

    return rows;
  };

  const fetchEntourage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch entourage");
      }
      const data: EntourageMember[] = await response.json();
      setEntourage(data);
    } catch (error: any) {
      console.error("Failed to load entourage:", error);
      setError(error?.message || "Failed to load entourage");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntourage();

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage();
      }, 1000);
    };

    window.addEventListener("entourageUpdated", handleEntourageUpdate);

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate);
    };
  }, []);

  // Group entourage by role category
  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {};

    entourage.forEach((member) => {
      const category = member.RoleCategory || "Other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(member);
    });

    return grouped;
  }, [entourage]);

  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
  }) => {
    const textAlign =
      align === "right"
        ? "text-right"
        : align === "left"
          ? "text-left"
          : "text-center";
    return (
      <h3
        className={`text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-normal uppercase mb-2 sm:mb-3 md:mb-4 tracking-[0.1em] sm:tracking-[0.12em] ${textAlign} ${className}`}
        style={{ color: "#7A4E2E" }}
      >
        {children}
      </h3>
    );
  };

  // Helper component for name items with role title (supports alignment)
  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember;
    align?: "left" | "center" | "right";
    showRole?: boolean;
  }) => {
    const containerAlign =
      align === "right"
        ? "items-end"
        : align === "left"
          ? "items-start"
          : "items-center";
    const textAlign =
      align === "right"
        ? "text-right"
        : align === "left"
          ? "text-left"
          : "text-center";
    return (
      <div
        className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 md:py-1.5 leading-tight sm:leading-relaxed`}
      >
        <p
          className={`text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-normal ${textAlign}`}
          style={{ color: "#7A4E2E" }}
        >
          {member.Name}
        </p>
        {showRole && member.RoleTitle && (
          <p
            className={`text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-normal mt-0.5 sm:mt-1 leading-tight sm:leading-snug ${textAlign}`}
            style={{ color: "#A2976A" }}
          >
            {member.RoleTitle}
          </p>
        )}
      </div>
    );
  };

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({
    children,
    leftTitle,
    rightTitle,
    singleTitle,
    centerContent = false,
  }: {
    children: React.ReactNode;
    leftTitle?: string;
    rightTitle?: string;
    singleTitle?: string;
    centerContent?: boolean;
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-9">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div
            className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-9">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 mb-2 sm:mb-2.5 md:mb-3.5">
          {leftTitle && (
            <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4">
              {leftTitle}
            </SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4">
              {rightTitle}
            </SectionTitle>
          )}
        </div>
        <div
          className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <section
      id="entourage"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Section Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]" style={{ color: "#F5E7D3" }}>
          Wedding Entourage
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal max-w-xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4" style={{ color: "#F5E7D3" }}>
          Our cherished family and friends
        </p>
      </div>

      {/* Central Card Container — same as timeline/hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative group">
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FDF8F1 0%, #F5E7D3 40%, #FDF8F1 100%)",
              boxShadow: "0 0 0 1px rgba(166,124,82,0.22), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <div className="absolute inset-0 opacity-50 z-0" style={{ background: "radial-gradient(circle at center, rgba(122,78,46,0.06) 0%, transparent 70%)" }} />
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl z-0"
              style={{
                padding: "1px",
                background: "linear-gradient(135deg, rgba(122,78,46,0.22) 0%, rgba(166,124,82,0.18) 50%, rgba(122,78,46,0.18) 100%)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-[rgba(166,124,82,0.3)] z-0" />
            {/* Card content */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
              {isLoading ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin" style={{ color: "#A67C52" }} />
                    <span className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg" style={{ color: "#A67C52" }}>
                      Loading entourage...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="text-center">
                    <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4" style={{ color: "#7A4E2E" }}>
                      {error}
                    </p>
                    <button
                      onClick={fetchEntourage}
                      className="font-[family-name:var(--font-crimson)] underline transition-colors duration-300 text-sm sm:text-base hover:opacity-90"
                      style={{ color: "#7A4E2E" }}
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : entourage.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-24">
                  <Users className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mx-auto mb-3 sm:mb-4" style={{ color: "#A67C52" }} />
                  <p className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg" style={{ color: "#A67C52" }}>
                    No entourage members yet
                  </p>
                </div>
              ) : (
                <>
                  {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                    const members = grouped[category] || [];

                    if (members.length === 0) return null;

                    // Special handling for The Couple - display Bride and Groom side by side
                    if (category === "The Couple") {
                      const groom = members.find((m) =>
                        m.RoleTitle?.toLowerCase().includes("groom"),
                      );
                      const bride = members.find((m) =>
                        m.RoleTitle?.toLowerCase().includes("bride"),
                      );

                      return (
                        <div key={category}>
                          {categoryIndex > 0 && (
                            <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                              <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A2976A]/50" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#A2976A]" />
                              <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A2976A]/50" />
                            </div>
                          )}
                          <TwoColumnLayout
                            singleTitle="The Couple"
                            centerContent={true}
                          >
                            <div className="px-2 sm:px-3 md:px-4">
                              {groom && (
                                <NameItem member={groom} align="right" />
                              )}
                            </div>
                            <div className="px-2 sm:px-3 md:px-4">
                              {bride && (
                                <NameItem member={bride} align="left" />
                              )}
                            </div>
                          </TwoColumnLayout>
                        </div>
                      );
                    }

                    // Special handling for Parents sections - combine into single two-column layout
                    if (
                      category === "Parents of the Bride" ||
                      category === "Parents of the Groom"
                    ) {
                      // Get both parent groups
                      const parentsBride =
                        grouped["Parents of the Bride"] || [];
                      const parentsGroom =
                        grouped["Parents of the Groom"] || [];

                      // Helper function to sort parents: father first, then mother
                      const sortParents = (members: EntourageMember[]) => {
                        return [...members].sort((a, b) => {
                          const aIsFather =
                            a.RoleTitle?.toLowerCase().includes("father") ??
                            false;
                          const bIsFather =
                            b.RoleTitle?.toLowerCase().includes("father") ??
                            false;

                          // Father comes first
                          if (aIsFather && !bIsFather) return -1;
                          if (!aIsFather && bIsFather) return 1;
                          return 0;
                        });
                      };

                      // Only render once (when processing "Parents of the Groom")
                      if (category === "Parents of the Groom") {
                        return (
                          <div key="Parents">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A67C52]/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A67C52]/50" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Parents of the Groom"
                              rightTitle="Parents of the Bride"
                            >
                              {(() => {
                                const leftArr = sortParents(parentsGroom);
                                const rightArr = sortParents(parentsBride);
                                const maxLen = Math.max(
                                  leftArr.length,
                                  rightArr.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const left = leftArr[i];
                                  const right = rightArr[i];
                                  rows.push(
                                    <React.Fragment key={`parents-row-${i}`}>
                                      <div
                                        key={`parent-groom-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {left ? (
                                          <NameItem
                                            member={left}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                      <div
                                        key={`parent-bride-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {right ? (
                                          <NameItem
                                            member={right}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Parents of the Bride" since it's already rendered above
                      return null;
                    }

                    // Special handling for Maid of Honor and Best Man - combine into single two-column layout
                    if (
                      category === "Maid of Honor" ||
                      category === "Best Man"
                    ) {
                      // Get both honor attendant groups
                      const maidOfHonor = grouped["Maid of Honor"] || [];
                      const bestMan = grouped["Best Man"] || [];

                      // Only render once (when processing "Best Man")
                      if (category === "Best Man") {
                        return (
                          <div key="HonorAttendants">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A67C52]/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A67C52]/50" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Best Man"
                              rightTitle="Maid of Honor"
                            >
                              {(() => {
                                const maxLen = Math.max(
                                  bestMan.length,
                                  maidOfHonor.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const left = bestMan[i];
                                  const right = maidOfHonor[i];
                                  rows.push(
                                    <React.Fragment key={`honor-row-${i}`}>
                                      <div
                                        key={`bestman-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {left ? (
                                          <NameItem
                                            member={left}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                      <div
                                        key={`maid-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {right ? (
                                          <NameItem
                                            member={right}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Maid of Honor" since it's already rendered above
                      return null;
                    }

                    // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                    if (
                      category === "Bridesmaids" ||
                      category === "Groomsmen"
                    ) {
                      // Get both bridal party groups
                      const bridesmaids = grouped["Bridesmaids"] || [];
                      const groomsmen = grouped["Groomsmen"] || [];

                      // Only render once (when processing "Bridesmaids")
                      if (category === "Bridesmaids") {
                        return (
                          <div key="BridalParty">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A67C52]/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A67C52]/50" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Groomsmen"
                              rightTitle="Bridesmaids"
                            >
                              {(() => {
                                const maxLen = Math.max(
                                  bridesmaids.length,
                                  groomsmen.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const groomsman = groomsmen[i];
                                  const bridesmaid = bridesmaids[i];
                                  rows.push(
                                    <React.Fragment key={`bridal-row-${i}`}>
                                      <div
                                        key={`groomsman-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {groomsman ? (
                                          <NameItem
                                            member={groomsman}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                      <div
                                        key={`bridesmaid-cell-${i}`}
                                        className="px-2 sm:px-3 md:px-4"
                                      >
                                        {bridesmaid ? (
                                          <NameItem
                                            member={bridesmaid}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-0.5 sm:py-1 md:py-1.5" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Groomsmen" since it's already rendered above
                      return null;
                    }

                    // Candle / Veil / Cord Sponsors:
                    // Centered category label, then two-column names.
                    if (
                      category === "Candle Sponsors" ||
                      category === "Veil Sponsors" ||
                      category === "Cord Sponsors"
                    ) {
                      return (
                        <div key={category}>
                          {categoryIndex > 0 && (
                            <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                              <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A2976A]/50" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#A2976A]" />
                              <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A2976A]/50" />
                            </div>
                          )}
                          <TwoColumnLayout
                            singleTitle={category}
                            centerContent={true}
                          >
                            {renderTwoColumnRows(members)}
                          </TwoColumnLayout>
                        </div>
                      );
                    }

                    // Default: single title, centered content
                    return (
                      <div key={category}>
                        {categoryIndex > 0 && (
                          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3 md:py-4 mb-3 sm:mb-5 md:mb-7">
                            <div className="h-px w-8 sm:w-12 md:w-16 bg-[#A67C52]/50" />
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#A67C52]" />
                            <div className="h-px w-8 sm:w-12 md:w-16 bg-[#A67C52]/50" />
                          </div>
                        )}
                        <TwoColumnLayout
                          singleTitle={category}
                          centerContent={true}
                        >
                          {(() => {
                            const SINGLE_COLUMN_SECTIONS = new Set([
                              "Best Man",
                              "Maid of Honor",
                              "Ring Bearer",
                              "Coin Bearer",
                              "Bible Bearer",
                              "Presider",
                            ]);
                            if (
                              SINGLE_COLUMN_SECTIONS.has(category) ||
                              members.length <= 2
                            ) {
                              return (
                                <div className="col-span-full">
                                  <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                                    {members.map((member, idx) => (
                                      <NameItem
                                        key={`${category}-${idx}-${member.Name}`}
                                        member={member}
                                        align="center"
                                      />
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            // Default two-column sections: render row-by-row pairs to keep alignment on small screens
                            const half = Math.ceil(members.length / 2);
                            const left = members.slice(0, half);
                            const right = members.slice(half);
                            const maxLen = Math.max(left.length, right.length);
                            const rows = [];
                            for (let i = 0; i < maxLen; i++) {
                              const l = left[i];
                              const r = right[i];
                              rows.push(
                                <React.Fragment key={`${category}-row-${i}`}>
                                  <div
                                    key={`${category}-cell-left-${i}`}
                                    className="px-2 sm:px-3 md:px-4"
                                  >
                                    {l ? (
                                      <NameItem member={l} align="right" />
                                    ) : (
                                      <div className="py-0.5 sm:py-1 md:py-1.5" />
                                    )}
                                  </div>
                                  <div
                                    key={`${category}-cell-right-${i}`}
                                    className="px-2 sm:px-3 md:px-4"
                                  >
                                    {r ? (
                                      <NameItem member={r} align="left" />
                                    ) : (
                                      <div className="py-0.5 sm:py-1 md:py-1.5" />
                                    )}
                                  </div>
                                </React.Fragment>,
                              );
                            }
                            return rows;
                          })()}
                        </TwoColumnLayout>
                      </div>
                    );
                  })}

                  {/* Display any other categories not in the ordered list */}
                  {Object.keys(grouped)
                    .filter((cat) => !ROLE_CATEGORY_ORDER.includes(cat))
                    .map((category) => {
                      const members = grouped[category];
                      return (
                        <div key={category}>
                          <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                            <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A67C52]/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
                            <div className="h-px w-12 sm:w-16 md:w-20 bg-[#A67C52]/50" />
                          </div>
                          <TwoColumnLayout
                            singleTitle={category}
                            centerContent={true}
                          >
                            {(() => {
                              if (members.length <= 2) {
                                return (
                                  <div className="col-span-full">
                                    <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                                      {members.map((member, idx) => (
                                        <NameItem
                                          key={`${category}-${idx}-${member.Name}`}
                                          member={member}
                                          align="center"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                );
                              }
                              // Pair row-by-row for other categories as well
                              const half = Math.ceil(members.length / 2);
                              const left = members.slice(0, half);
                              const right = members.slice(half);
                              const maxLen = Math.max(
                                left.length,
                                right.length,
                              );
                              const rows = [];
                              for (let i = 0; i < maxLen; i++) {
                                const l = left[i];
                                const r = right[i];
                                rows.push(
                                  <React.Fragment key={`${category}-row-${i}`}>
                                    <div
                                      key={`${category}-cell-left-${i}`}
                                      className="px-2 sm:px-3 md:px-4"
                                    >
                                      {l ? (
                                        <NameItem member={l} align="right" />
                                      ) : (
                                        <div className="py-0.5 sm:py-1 md:py-1.5" />
                                      )}
                                    </div>
                                    <div
                                      key={`${category}-cell-right-${i}`}
                                      className="px-2 sm:px-3 md:px-4"
                                    >
                                      {r ? (
                                        <NameItem member={r} align="left" />
                                      ) : (
                                        <div className="py-0.5 sm:py-1 md:py-1.5" />
                                      )}
                                    </div>
                                  </React.Fragment>,
                                );
                              }
                              return rows;
                            })()}
                          </TwoColumnLayout>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
