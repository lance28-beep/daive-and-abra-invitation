import { siteConfig } from "@/content/site"

export function Footer() {
  return (
    <footer className="mt-20" style={{ backgroundColor: "#F5E7D3", borderTop: "1px solid rgba(166,124,82,0.35)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className="font-serif font-bold text-lg mb-2"
              style={{ color: "#7A4E2E" }}
            >
              {siteConfig.couple.groom} & {siteConfig.couple.bride}
            </h3>
            <p
              className="text-sm"
              style={{ color: "#A67C52" }}
            >
              {siteConfig.wedding.date}
            </p>
          </div>
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "#7A4E2E" }}
            >
              Ceremony
            </h4>
            <p
              className="text-sm"
              style={{ color: "#A67C52" }}
            >
              {siteConfig.ceremony.location}
            </p>
          </div>
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "#7A4E2E" }}
            >
              Reception
            </h4>
            <p
              className="text-sm"
              style={{ color: "#A67C52" }}
            >
              {siteConfig.reception.location}
            </p>
          </div>
        </div>
        <div
          className="mt-8 pt-8 text-center text-sm"
          style={{ borderTop: "1px solid rgba(166,124,82,0.35)", color: "#A67C52" }}
        >
          <p>With love and gratitude • {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
