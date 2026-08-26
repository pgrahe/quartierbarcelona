import { jsx, jsxs } from "react/jsx-runtime";
import { L as LOCATION, u as useLanguage, a as addressLines, m as mapDirectionsUrl } from "../entry-server.js";
import { useRef, useEffect } from "react";
import "react-dom/server";
function VenueMap({ title }) {
  const hostRef = useRef(null);
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    let cancelled = false;
    let map;
    let ro;
    let kick;
    (async () => {
      await Promise.resolve({            });
      const mod = await import("leaflet");
      const L = mod.default ?? mod;
      if (cancelled || !hostRef.current) return;
      map = L.map(hostRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true
      }).setView([LOCATION.lat, LOCATION.lng], LOCATION.zoom);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20
      }).addTo(map);
      const pin = L.divIcon({
        className: "loc__pin",
        html: '<span class="loc__pin-dot" aria-hidden="true"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      L.marker([LOCATION.lat, LOCATION.lng], {
        icon: pin,
        title: title || "Quartier Barcelona"
      }).addTo(map);
      ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => map.invalidateSize()) : null;
      ro == null ? void 0 : ro.observe(hostRef.current);
      kick = window.setTimeout(() => map.invalidateSize(), 400);
    })().catch((err) => {
      console.error("VenueMap failed to load Leaflet", err);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(kick);
      ro == null ? void 0 : ro.disconnect();
      map == null ? void 0 : map.remove();
    };
  }, [title]);
  return /* @__PURE__ */ jsx("div", { ref: hostRef, className: "loc__leaflet", role: "img", "aria-label": title });
}
function LocationMap() {
  const { t } = useLanguage();
  const [line1, line2] = t.location.title.split("\n");
  return /* @__PURE__ */ jsx("section", { className: "loc", "aria-label": t.location.eyebrow, children: /* @__PURE__ */ jsxs("div", { className: "loc__grid", children: [
    /* @__PURE__ */ jsx("div", { className: "loc__panel on-stone", children: /* @__PURE__ */ jsxs("div", { className: "loc__panel-inner", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow loc__eyebrow", "data-reveal": true, children: t.location.eyebrow }),
      /* @__PURE__ */ jsxs("h2", { className: "loc__title", "data-reveal": true, style: { "--reveal-delay": "80ms" }, children: [
        /* @__PURE__ */ jsx("span", { children: line1 }),
        line2 && /* @__PURE__ */ jsx("span", { children: line2 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "loc__meta", "data-reveal": true, style: { "--reveal-delay": "160ms" }, children: [
        /* @__PURE__ */ jsx("hr", { className: "rule" }),
        /* @__PURE__ */ jsx("address", { className: "loc__address", children: addressLines().map((line) => /* @__PURE__ */ jsx("span", { children: line }, line)) }),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "loc__directions",
            href: mapDirectionsUrl(),
            target: "_blank",
            rel: "noopener noreferrer",
            children: t.location.directions
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "loc__map", "data-reveal": "mask", style: { "--reveal-delay": "120ms" }, children: /* @__PURE__ */ jsx(VenueMap, { title: t.location.mapLabel }) })
  ] }) });
}
export {
  LocationMap as default
};
