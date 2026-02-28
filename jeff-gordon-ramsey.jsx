import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// JEFF GORDON RAMSEY'S — MOTORSPORT STEAKHOUSE
// Full React Single-Page App with Animations & Real Imagery
// ═══════════════════════════════════════════════════════════════

// ── Image Sources (Unsplash – all verified 200 OK) ──
const IMAGES = {
  // Hero & Background
  hero: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80",         // Beautiful food spread
  heroGrill: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=1920&q=80",     // Dramatic grill flames
  flames: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",            // Fire texture

  // Steaks & Mains
  ribeye: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",             // BBQ ribs/prime meat
  steakPlated: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",     // Steak on dark plate
  steakCut: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",           // Grilled steak close-up
  steakDark: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&q=80",          // Steak dark plating
  filet: "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=800&q=80",           // Steak filet
  grilling: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80",        // Grilling action

  // Appetizers & Sides
  porkBelly: "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=800&q=80",       // Pork belly bites
  tartare: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",         // Beef tartare / plating
  tunaCrudo: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80",       // Tuna sashimi
  lobster: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80",            // Lobster dish
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",          // Gourmet burger
  burrata: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",         // Fresh food plating
  seafood: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",         // Seafood plating
  macCheese: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80",       // Mac and cheese
  veganBowl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",       // Vegan food bowl
  sideDish: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",        // Side dish plating
  appetizer: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80",       // Appetizer plating
  bbqPlatter: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",         // BBQ platter
  finePlating: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",     // Fine dining plate

  // Desserts
  chocolateCake: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",      // Chocolate dessert
  cremeBrulee: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800&q=80",        // Pastry/dessert
  dessertLight: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",       // Light dessert
  tiramisu: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",        // Tiramisu/dessert

  // Cocktails (each matched to a specific drink)
  fieryDrink: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",       // Fiery cocktail
  colorfulCocktails: "https://images.unsplash.com/photo-1560963805-6c64417e3413?w=800&q=80",   // Colorful cocktail array
  oldFashioned: "https://images.unsplash.com/photo-1597290282695-edc43d0e7129?w=800&q=80",     // Old fashioned
  ginCocktail: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&q=80",         // Elegant gin cocktail
  creamyCocktail: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80",   // Creamy cocktail
  smokyCocktail: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&q=80",    // Smoky cocktail
  champagne: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",        // Champagne/bubbly
  darkCocktail: "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=800&q=80",     // Dark cocktail
  martini: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=800&q=80",             // Martini / bar drink

  // Restaurant Interiors & Gallery
  interior1: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",        // Restaurant interior
  interior2: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",           // Restaurant interior 2
  kitchen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",             // Chef in kitchen
  wineCellar: "https://images.unsplash.com/photo-1486947799489-3fabdd7d32a6?w=800&q=80",       // Wine cellar
  bar: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",              // Bar counter
  barMoody: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&q=80",         // Moody bar interior
  patio: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80",               // Rooftop patio
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",             // Wine glasses

  // Racing
  raceCar: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",          // Sports car
};

// ── Color Palette ──
const C = {
  red: "#E31937", orange: "#FF6B2B", yellow: "#FFD700", blue: "#1E3A8A",
  dark: "#0A0A0F", darker: "#050508", cream: "#FAF5E8", gold: "#C9A84C",
  smoke: "#1A1A2E", asphalt: "#12121F", tire: "#0D0D15",
  textSec: "#A9A295",
};

// ═══════════════════════════════════════════
// HOOK: useScrollY
// ═══════════════════════════════════════════
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

// ═══════════════════════════════════════════
// HOOK: useInView (Intersection Observer)
// ═══════════════════════════════════════════
function useInView(opts = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: opts.threshold || 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ═══════════════════════════════════════════
// COMPONENT: AnimatedCounter
// ═══════════════════════════════════════════
function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ═══════════════════════════════════════════
// COMPONENT: CheckeredDivider
// ═══════════════════════════════════════════
function CheckeredDivider({ thin }) {
  return (
    <div style={{
      width: "100%", height: thin ? 12 : 24,
      background: `repeating-conic-gradient(#fff 0% 25%, #111 0% 50%) 0 0 / 20px 20px`,
      opacity: thin ? 0.35 : 0.65,
    }} />
  );
}

// ═══════════════════════════════════════════
// COMPONENT: SectionHeader
// ═══════════════════════════════════════════
function SectionHeader({ number, title, accent, subtitle }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      textAlign: "center", marginBottom: 48,
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 4, color: C.red }}>— {number} —</div>
      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,5vw,3.2rem)", textTransform: "uppercase", letterSpacing: 3, margin: "8px 0 12px" }}>
        {title} <span style={{ background: `linear-gradient(135deg,${C.red},${C.orange},${C.yellow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{accent}</span>
      </h2>
      <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: C.textSec, fontSize: "1.05rem", maxWidth: 550, margin: "0 auto" }}>{subtitle}</p>
    </div>
  );
}

// ═══════════════════════════════════════════
// COMPONENT: Navigation
// ═══════════════════════════════════════════
function Navigation() {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const links = [
    ["#about", "About"], ["#menu", "Menu"], ["#cocktails", "Pit Lane Bar"],
    ["#gallery", "Gallery"], ["#merch", "Merch"], ["#contact", "Contact"],
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
      background: "rgba(5,5,8,0.95)", backdropFilter: "blur(20px)",
      borderBottom: `2px solid ${C.red}`,
      boxShadow: scrollY > 50 ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      transition: "box-shadow 0.3s",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" }}>
        <a href="#top" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "1.3rem", letterSpacing: 3, textTransform: "uppercase", background: `linear-gradient(135deg,${C.red},${C.orange},${C.yellow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Jeff Gordon Ramsey's
            <span style={{ display: "block", fontSize: "0.55rem", fontWeight: 300, letterSpacing: 5, WebkitTextFillColor: C.textSec }}>Motorsport Steakhouse</span>
          </div>
        </a>
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: C.cream, fontSize: 24, cursor: "pointer", "@media(maxWidth:768px)": { display: "block" } }} className="mobile-toggle">☰</button>
        <ul style={{ display: "flex", listStyle: "none", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          {links.map(([href, label]) => (
            <li key={href}><a href={href} style={{ color: C.textSec, textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = C.cream} onMouseLeave={e => e.target.style.color = C.textSec}>{label}</a></li>
          ))}
          <li>
            <a href="#reservations" style={{ color: "white", textDecoration: "none", fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", background: `linear-gradient(135deg,${C.red},${C.orange})`, padding: "8px 18px", borderRadius: 2 }}>Reserve</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════
// COMPONENT: Hero (Parallax)
// ═══════════════════════════════════════════
function Hero() {
  const scrollY = useScrollY();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 300); }, []);

  return (
    <section id="top" style={{ position: "relative", height: "100vh", minHeight: 700, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden" }}>
      {/* Parallax BG */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${IMAGES.hero})`,
        backgroundSize: "cover", backgroundPosition: "center",
        transform: `translateY(${scrollY * 0.4}px) scale(1.1)`,
        filter: "brightness(0.25)",
        transition: "transform 0.1s linear",
      }} />
      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 20% 50%, rgba(227,25,55,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(255,107,43,0.15) 0%, transparent 50%), linear-gradient(180deg, rgba(5,5,8,0.4) 0%, rgba(10,10,15,0.7) 100%)` }} />
      {/* Giant 24 */}
      <div style={{ position: "absolute", fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "35vw", color: "rgba(255,255,255,0.03)", top: "50%", left: "50%", transform: `translate(-50%, ${-50 + scrollY * 0.1}%) scale(${1 + scrollY * 0.0002})`, userSelect: "none", lineHeight: 1 }}>24</div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 24px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "'Oswald',sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 4, textTransform: "uppercase",
          color: C.yellow, padding: "8px 20px", border: `1px solid rgba(255,215,0,0.25)`, background: "rgba(255,215,0,0.06)",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s 0.3s",
        }}>★ Est. 2024 · Charlotte, NC ★</div>

        <h1 style={{
          fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(3rem,8vw,7rem)", textTransform: "uppercase",
          lineHeight: 0.95, letterSpacing: 4, margin: "24px 0 8px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "all 1s 0.5s",
        }}>
          <span style={{ color: C.cream }}>Jeff</span><br />
          <span style={{ background: `linear-gradient(135deg,${C.red},${C.orange},${C.yellow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gordon</span><br />
          <span style={{ color: C.cream }}>Ramsey's</span>
        </h1>

        <p style={{
          fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1rem,2.5vw,1.4rem)", color: C.textSec, marginBottom: 36,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s 0.8s",
        }}>Where four-time champions meet Michelin-starred flames.</p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s 1s",
        }}>
          <a href="#reservations" style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: 3, textTransform: "uppercase", textDecoration: "none", padding: "14px 32px", background: `linear-gradient(135deg,${C.red},${C.orange})`, color: "white", clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))", transition: "all 0.3s" }}>Book a Table</a>
          <a href="#menu" style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: 3, textTransform: "uppercase", textDecoration: "none", padding: "14px 32px", background: "transparent", color: C.cream, border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.3s" }}>View Menu</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: C.textSec, fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", animation: "pulse 2s infinite" }}>
        <span>Scroll</span>
        <div style={{ width: 16, height: 16, borderRight: `1px solid ${C.textSec}`, borderBottom: `1px solid ${C.textSec}`, transform: "rotate(45deg)" }} />
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════
// COMPONENT: About
// ═══════════════════════════════════════════
function About() {
  const [ref, vis] = useInView();
  return (
    <section id="about" style={{ padding: "96px 24px", background: C.asphalt }}>
      <SectionHeader number="01" title="The" accent="Origin Story" subtitle="Two legends. One impossible restaurant. Zero donkeys allowed." />
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        {/* Image */}
        <div style={{
          position: "relative", aspectRatio: "3/4", overflow: "hidden", border: `1px solid rgba(255,255,255,0.05)`,
          opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-50px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <img src={IMAGES.kitchen} alt="Restaurant kitchen" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) contrast(1.1)" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(227,25,55,0.15), rgba(30,58,138,0.1))` }} />
          <div style={{ position: "absolute", top: 12, left: 12, width: 40, height: 40, borderTop: `2px solid ${C.red}`, borderLeft: `2px solid ${C.red}` }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 40, height: 40, borderBottom: `2px solid ${C.red}`, borderRight: `2px solid ${C.red}` }} />
          <div style={{ position: "absolute", bottom: 24, left: 24, fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "6rem", color: "rgba(255,255,255,0.08)" }}>24</div>
        </div>
        {/* Text */}
        <div style={{
          opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(50px)", transition: "all 1s 0.2s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.7rem", fontWeight: 400, marginBottom: 24, lineHeight: 1.4 }}>
            What happens when a four-time NASCAR champion decides <em style={{ color: C.orange }}>he's also a bloody brilliant chef?</em>
          </h3>
          <p style={{ color: C.textSec, lineHeight: 1.8, marginBottom: 16, fontSize: "0.95rem" }}>Born from the audacious fever dream that racing and fine dining are essentially the same thing — precision, timing, fire, and knowing when to turn left — Jeff Gordon Ramsey's opened its doors in the heart of Charlotte, North Carolina in 2024.</p>
          <p style={{ color: C.textSec, lineHeight: 1.8, marginBottom: 16, fontSize: "0.95rem" }}>Our kitchen operates like a pit crew: every second counts, every plate is engineered for perfection, and if your steak comes out wrong, someone <em>will</em> hear about it. Loudly.</p>
          <p style={{ color: C.textSec, lineHeight: 1.8, fontSize: "0.95rem" }}>The 12,000-square-foot space features authentic racing memorabilia, a show kitchen with a custom-built wood-fire grill modeled after a V8 engine, and leather booths from retired stock cars. The wine cellar? It's in a decommissioned hauler.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 32, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              [93, "Race Wins on the Wall"],
              [4, "Championship Titles"],
              [0, "Idiot Sandwiches"],
            ].map(([n, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "2rem", background: `linear-gradient(135deg,${C.yellow},${C.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <AnimatedCounter end={n} />
                </div>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.textSec, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// MENU DATA
// ═══════════════════════════════════════════
const MENU_DATA = {
  starters: [
    { name: "Pit Stop Pork Belly Bites", desc: "Slow-braised, flash-seared. Bourbon-maple glaze, pickled mustard seeds, microgreens", price: 19, badge: "Fan Favorite", tags: ["gf"], img: IMAGES.porkBelly },
    { name: "Beef Tartare à la Daytona", desc: "Hand-cut prime tenderloin, smoked egg yolk, capers, Dijon, gaufrette crisps", price: 24, tags: ["gf"], img: IMAGES.tartare },
    { name: "Tuna Crudo, Turn Four", desc: "Yellowfin tuna, yuzu, avocado mousse, crispy shallots, chili oil, sesame", price: 22, tags: ["gf", "df"], img: IMAGES.tunaCrudo },
    { name: "Lobster Bisque Under Caution", desc: "Cognac-flambéed Maine lobster, crème fraîche, chive oil, truffle crouton", price: 18, tags: [], img: IMAGES.lobster },
    { name: "The Idiot Sandwich", desc: "Wagyu sliders, caramelized onion jam, gruyère, brioche — hold the insults", price: 21, tags: [], img: IMAGES.burger },
    { name: "Burrata on Pole Position", desc: "Creamy burrata, heirloom tomatoes, aged balsamic, basil oil, flaky sea salt", price: 17, tags: ["v", "gf"], img: IMAGES.burrata },
  ],
  mains: [
    { name: "The Lap 500 Ribeye", desc: "32oz bone-in prime ribeye, dry-aged 45 days. Bone marrow butter, charred cipollini, red wine jus", price: 89, badge: "Signature", tags: ["gf"], img: IMAGES.ribeye },
    { name: "Wellington Under the Hood", desc: "Beef Wellington, wild mushroom duxelles, prosciutto, puff pastry — carved tableside", price: 72, tags: [], img: IMAGES.steakPlated },
    { name: "DuPont Rack of Lamb", desc: "Colorado lamb, herb-crusted, rainbow peppercorn sauce, roasted root vegetables", price: 65, tags: ["gf"], img: IMAGES.steakDark },
    { name: "Pan-Seared Branzino, Green Flag", desc: "Mediterranean sea bass, saffron risotto, beurre blanc, crispy capers", price: 52, tags: ["gf"], img: IMAGES.seafood },
    { name: 'Filet Mignon — It\'s RAW!', desc: "Just kidding. 10oz center-cut tenderloin, cooked to your specs. Truffle pomme purée, asparagus", price: 68, tags: ["gf"], img: IMAGES.filet },
    { name: "NASCAR Mac & Cheese Royale", desc: "Lobster tail, four-cheese béchamel, black truffle, herbed breadcrumb crust", price: 42, tags: ["v option"], img: IMAGES.macCheese },
    { name: "The Vegan Chicane", desc: "Roasted cauliflower steak, romesco, quinoa tabbouleh, crispy chickpeas, tahini", price: 34, tags: ["v", "gf", "df"], img: IMAGES.veganBowl },
  ],
  sides: [
    { name: "Truffle Fries at 200 MPH", desc: "Triple-cooked frites, parmesan, truffle oil, fresh herbs", price: 14, tags: ["v"], img: IMAGES.bbqPlatter },
    { name: "Creamed Spinach on the Straightaway", desc: "Baby spinach, nutmeg cream, crispy garlic chips", price: 12, tags: ["v", "gf"], img: IMAGES.sideDish },
    { name: "Grilled Broccolini, Pace Car", desc: "Charred broccolini, chili flakes, lemon, toasted almonds", price: 13, tags: ["v", "gf", "df"], img: IMAGES.veganBowl },
    { name: "Loaded Potato — Full Tank", desc: "Twice-baked, sour cream, chives, applewood bacon, aged cheddar", price: 15, tags: ["gf"], img: IMAGES.appetizer },
    { name: "Charred Brussels, Drafting Style", desc: "Crispy Brussels sprouts, honey-sriracha glaze, sesame, fried shallots", price: 13, tags: ["v", "gf", "df"], img: IMAGES.finePlating },
  ],
  desserts: [
    { name: "Sticky Toffee Burnout", desc: "Warm date sponge, butterscotch sauce, vanilla bean ice cream — torched tableside", price: 16, badge: "Signature", tags: ["v"], img: IMAGES.chocolateCake },
    { name: "Checkered Flag Crème Brûlée", desc: "Classic vanilla custard, caramelized sugar, black & white chocolate shards", price: 14, tags: ["v", "gf"], img: IMAGES.cremeBrulee },
    { name: "Chocolate Lava Cake, Full Throttle", desc: "Valrhona dark chocolate, molten center, espresso gelato, gold leaf", price: 17, tags: ["v"], img: IMAGES.dessertLight },
    { name: "The Cool-Down Lap", desc: "Trio of sorbets — passion fruit, blood orange, champagne. Light, victorious.", price: 12, tags: ["v", "gf", "df"], img: IMAGES.cremeBrulee },
    { name: "Tiramisu à la Talladega", desc: "Espresso ladyfingers, mascarpone, cocoa dust, amaretto cream", price: 15, tags: ["v"], img: IMAGES.tiramisu },
  ],
};

const TAG_LABELS = { v: "Vegetarian", gf: "Gluten-Free", df: "Dairy-Free", "v option": "Veg Option" };
const TAG_COLORS = { v: "#4CAF50", gf: "#FF9800", df: "#2196F3", "v option": "#8BC34A" };

// ═══════════════════════════════════════════
// COMPONENT: Menu
// ═══════════════════════════════════════════
function Menu() {
  const [tab, setTab] = useState("starters");
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState("");
  const tabs = [["starters", "Starters"], ["mains", "Mains"], ["sides", "Sides & Pit Stops"], ["desserts", "Victory Lap"]];

  const items = MENU_DATA[tab].filter(item => {
    if (filter && !item.tags.includes(filter)) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <section id="menu" style={{ padding: "96px 24px", background: C.dark }}>
      <SectionHeader number="02" title="The" accent="Menu" subtitle="Fuel for champions. Every dish clocked to perfection." />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 16, flexWrap: "wrap" }}>
          {tabs.map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              fontFamily: "'Oswald',sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: 3, textTransform: "uppercase",
              color: tab === key ? C.cream : C.textSec, background: "none", border: "none", padding: "14px 24px", cursor: "pointer",
              borderBottom: tab === key ? `2px solid ${C.red}` : "2px solid transparent", transition: "all 0.3s",
            }}>{label}</button>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {Object.entries(TAG_LABELS).map(([key, label]) => (
            <button key={key} onClick={() => setFilter(filter === key ? null : key)} style={{
              fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
              padding: "6px 14px", borderRadius: 20, cursor: "pointer", transition: "all 0.3s",
              background: filter === key ? TAG_COLORS[key] : "rgba(255,255,255,0.04)",
              color: filter === key ? "white" : C.textSec,
              border: `1px solid ${filter === key ? TAG_COLORS[key] : "rgba(255,255,255,0.1)"}`,
            }}>{label}</button>
          ))}
        </div>

        {/* Search */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu items..."
            style={{ width: "100%", maxWidth: 400, padding: "10px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: C.cream, fontFamily: "'Inter',sans-serif", fontSize: 14, outline: "none", borderRadius: 2, transition: "border 0.3s" }}
            onFocus={e => e.target.style.borderColor = C.red} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
        </div>

        {/* Items */}
        <div style={{ minHeight: 200 }}>
          {items.length === 0 && <p style={{ textAlign: "center", color: C.textSec, fontStyle: "italic", padding: 40 }}>No items match your filters. Try adjusting your search.</p>}
          {items.map((item, i) => (
            <MenuItem key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuItem({ item, index }) {
  const [ref, vis] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      display: "flex", alignItems: "center", gap: 16, padding: "16px 12px", borderBottom: "1px solid rgba(255,255,255,0.03)",
      opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-20px)", transition: `all 0.5s ${index * 0.08}s cubic-bezier(0.16,1,0.3,1)`,
      background: hovered ? "rgba(255,255,255,0.02)" : "transparent", cursor: "default", borderRadius: 4,
    }}>
      <div style={{ width: 56, height: 56, borderRadius: 4, overflow: "hidden", flexShrink: 0, border: `1px solid rgba(255,255,255,0.05)` }}>
        <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8)", transition: "transform 0.3s", transform: hovered ? "scale(1.1)" : "scale(1)" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", marginBottom: 4 }}>
          {item.name}
          {item.badge && <span style={{ display: "inline-block", fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", background: `linear-gradient(135deg,${C.red},${C.orange})`, color: "white", padding: "2px 8px", marginLeft: 8, verticalAlign: "middle" }}>{item.badge}</span>}
        </div>
        <div style={{ fontSize: 13, color: C.textSec, fontStyle: "italic", lineHeight: 1.5 }}>{item.desc}</div>
        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
          {item.tags.map(t => <span key={t} style={{ fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: TAG_COLORS[t] || C.textSec, border: `1px solid ${TAG_COLORS[t] || C.textSec}40`, padding: "1px 6px", borderRadius: 10 }}>{TAG_LABELS[t]}</span>)}
        </div>
      </div>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: "1.1rem", color: C.yellow, whiteSpace: "nowrap" }}>${item.price}</div>
    </div>
  );
}

// ═══════════════════════════════════════════
// COCKTAIL DATA
// ═══════════════════════════════════════════
const COCKTAILS = [
  { name: "The Donkey Kick", sub: '"Move your arse!"', desc: "Reposado tequila, ginger beer, fresh lime, habanero syrup, candied chili.", price: 18, icon: "🔥", img: IMAGES.fieryDrink },
  { name: "Rainbow Warrior", sub: "The Jeff Gordon #24 Special", desc: "Seven-layer pousse-café — crème de menthe, blue curaçao, grenadine, Galliano, violet liqueur, cream.", price: 22, icon: "🏁", img: IMAGES.colorfulCocktails },
  { name: "The Pit Stop Old Fashioned", sub: "Under 4 seconds. Usually.", desc: "Woodford Reserve bourbon, smoked demerara, Angostura, flamed orange peel.", price: 19, icon: "🥃", img: IMAGES.oldFashioned },
  { name: "Hell's Kitchen Sink", sub: "Everything but your dignity", desc: "Hendrick's gin, elderflower, cucumber, basil, champagne float.", price: 20, icon: "🍸", img: IMAGES.ginCocktail },
  { name: "The Victory Milk", sub: "Inspired by Indy tradition", desc: "Rum horchata, vanilla vodka, white chocolate liqueur, cinnamon. Winners drink spiked milk.", price: 17, icon: "🏆", img: IMAGES.creamyCocktail },
  { name: "Smoke & Mirrors Negroni", sub: "Served under a cloche of hickory smoke", desc: "Mezcal-washed Campari, sweet vermouth, barrel-aged gin. Unveiled tableside.", price: 21, icon: "💨", img: IMAGES.smokyCocktail },
  { name: "The Champagne Burnout", sub: "Pop. Pour. Celebrate.", desc: "Dom Pérignon, St-Germain, muddled strawberry, edible gold. For when you've earned it.", price: 32, icon: "🍾", img: IMAGES.champagne },
  { name: "The Black Flag", sub: "Disqualified from sobriety", desc: "Activated charcoal, vodka, blackberry liqueur, lemon, lavender syrup. Jet black.", price: 19, icon: "🧊", img: IMAGES.darkCocktail },
  { name: "The Dirty Draft", sub: "Shaken harder than Turn 3", desc: "Grey Goose, extra dirty olive brine, vermouth mist, blue cheese olives.", price: 18, icon: "🫒", img: IMAGES.martini },
];

// ═══════════════════════════════════════════
// COMPONENT: CocktailCard (Flip Animation)
// ═══════════════════════════════════════════
function CocktailCard({ cocktail, index }) {
  const [flipped, setFlipped] = useState(false);
  const [ref, vis] = useInView();

  return (
    <div ref={ref} onClick={() => setFlipped(!flipped)} style={{
      perspective: 1000, cursor: "pointer", height: 380,
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.6s ${index * 0.1}s, transform 0.6s ${index * 0.1}s`,
    }}>
      <div style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d", transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
          border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden",
        }}>
          <div style={{ height: "45%", overflow: "hidden", position: "relative" }}>
            <img src={cocktail.img} alt={cocktail.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) contrast(1.2)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,10,15,0.9) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: 12, left: 16, fontSize: 32 }}>{cocktail.icon}</div>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "1.1rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, background: `linear-gradient(135deg,${C.cream},${C.yellow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{cocktail.name}</h3>
            <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 13, color: C.orange, marginBottom: 10 }}>{cocktail.sub}</div>
            <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5, marginBottom: 12 }}>{cocktail.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, color: C.yellow, fontSize: "1rem" }}>${cocktail.price}</div>
              <div style={{ fontSize: 10, color: C.textSec, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Oswald',sans-serif" }}>Tap to flip →</div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)",
          background: `linear-gradient(135deg, ${C.smoke}, ${C.dark})`,
          border: `1px solid ${C.red}40`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: 24, textAlign: "center",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{cocktail.icon}</div>
          <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "1.3rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, color: C.cream }}>{cocktail.name}</h3>
          <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 15, color: C.orange, marginBottom: 16 }}>{cocktail.sub}</div>
          <div style={{ width: 40, height: 1, background: `linear-gradient(90deg,${C.red},${C.orange})`, marginBottom: 16 }} />
          <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7, marginBottom: 20 }}>{cocktail.desc}</p>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "1.5rem", background: `linear-gradient(135deg,${C.yellow},${C.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>${cocktail.price}</div>
        </div>
      </div>
    </div>
  );
}

function Cocktails() {
  return (
    <section id="cocktails" style={{ padding: "96px 24px", background: C.asphalt }}>
      <SectionHeader number="03" title="The" accent="Pit Lane Bar" subtitle="Cheeky cocktails engineered for speed and served with attitude." />
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
        {COCKTAILS.map((c, i) => <CocktailCard key={c.name} cocktail={c} index={i} />)}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// COMPONENT: Gallery
// ═══════════════════════════════════════════
function Gallery() {
  const galleryItems = [
    { img: IMAGES.interior1, label: "The Main Dining Room", sub: "Retired stock car leather booths & trophy wall", span: true },
    { img: IMAGES.kitchen, label: "The V8 Show Kitchen" },
    { img: IMAGES.barMoody, label: "Pit Lane Bar" },
    { img: IMAGES.wineCellar, label: "The Hauler Wine Cellar" },
    { img: IMAGES.interior2, label: "The Winner's Circle", sub: "Private Dining" },
    { img: IMAGES.patio, label: "Rooftop Terrace" },
  ];

  return (
    <section id="gallery" style={{ padding: "96px 24px 72px", background: C.dark }}>
      <SectionHeader number="04" title="The" accent="Paddock" subtitle="Step inside the most thrilling steakhouse on the East Coast." />
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: 220, gap: 8 }}>
        {galleryItems.map((item, i) => (
          <GalleryItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function GalleryItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, vis] = useInView();
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      position: "relative", overflow: "hidden", cursor: "pointer",
      gridColumn: item.span ? "span 2" : "span 1", gridRow: item.span ? "span 2" : "span 1",
      opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.95)", transition: `all 0.6s ${index * 0.1}s`,
    }}>
      <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s, filter 0.6s", transform: hovered ? "scale(1.08)" : "scale(1)", filter: hovered ? "brightness(0.5)" : "brightness(0.35)" }} />
      <div style={{ position: "absolute", inset: 0, background: hovered ? `linear-gradient(135deg, rgba(227,25,55,0.2), rgba(255,107,43,0.15))` : "transparent", transition: "all 0.4s" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, textAlign: "center", transition: "all 0.4s", transform: hovered ? "translateY(0)" : "translateY(8px)" }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", fontSize: item.span ? 16 : 13, color: C.cream }}>{item.label}</div>
        {item.sub && <div style={{ fontSize: 12, color: C.textSec, fontStyle: "italic", marginTop: 4 }}>{item.sub}</div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// COMPONENT: Reservations
// ═══════════════════════════════════════════
function Reservations() {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", party: "", seating: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.date) e.date = "Required";
    if (!form.time) e.time = "Required";
    if (!form.party) e.party = "Required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  const inputStyle = (field) => ({
    background: "rgba(255,255,255,0.03)", border: `1px solid ${errors[field] ? C.red : "rgba(255,255,255,0.1)"}`,
    color: C.cream, padding: "12px 14px", fontFamily: "'Inter',sans-serif", fontSize: 14, outline: "none", transition: "border 0.3s", width: "100%", boxSizing: "border-box",
  });

  if (submitted) {
    return (
      <section id="reservations" style={{ padding: "96px 24px", background: C.asphalt, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 48 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🏁</div>
          <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "2rem", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>
            Reservation <span style={{ color: C.yellow }}>Confirmed!</span>
          </h2>
          <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: C.textSec, fontSize: "1.1rem", marginBottom: 24 }}>See you at the grid, champion.</p>
          <p style={{ color: C.textSec, fontSize: 14, lineHeight: 1.8 }}>
            {form.name} · {form.date} at {form.time} · Party of {form.party}
          </p>
          <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", date: "", time: "", party: "", seating: "", notes: "" }); }} style={{ marginTop: 24, fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", padding: "12px 32px", background: "transparent", color: C.cream, border: `1px solid rgba(255,255,255,0.2)`, cursor: "pointer" }}>Make Another</button>
        </div>
      </section>
    );
  }

  return (
    <section id="reservations" style={{ padding: "96px 24px", background: C.asphalt }}>
      <SectionHeader number="05" title="Book Your" accent="Grid Position" subtitle="Secure your seat before the green flag drops." />
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            ["name", "Full Name", "text", "Dale Earnhardt III"],
            ["email", "Email", "email", "speed@champion.com"],
            ["date", "Date", "date", ""],
          ].map(([field, label, type, ph]) => (
            <div key={field}>
              <label style={{ display: "block", fontFamily: "'Oswald',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: C.textSec, marginBottom: 6 }}>{label}</label>
              <input type={type} placeholder={ph} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={inputStyle(field)} />
              {errors[field] && <span style={{ fontSize: 11, color: C.red, marginTop: 4, display: "block" }}>{errors[field]}</span>}
            </div>
          ))}
          <div>
            <label style={{ display: "block", fontFamily: "'Oswald',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: C.textSec, marginBottom: 6 }}>Time</label>
            <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} style={{ ...inputStyle("time"), appearance: "auto" }}>
              <option value="">Select a time</option>
              {["5:00 PM — Early Bird Lap", "6:00 PM", "6:30 PM", "7:00 PM — Prime Time", "7:30 PM", "8:00 PM", "8:30 PM — Late Lap", "9:00 PM", "9:30 PM — Final Stint"].map(t => <option key={t} value={t} style={{ background: C.smoke }}>{t}</option>)}
            </select>
            {errors.time && <span style={{ fontSize: 11, color: C.red, marginTop: 4, display: "block" }}>{errors.time}</span>}
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "'Oswald',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: C.textSec, marginBottom: 6 }}>Party Size</label>
            <select value={form.party} onChange={e => setForm({ ...form, party: e.target.value })} style={{ ...inputStyle("party"), appearance: "auto" }}>
              <option value="">How many in your crew?</option>
              {["1 — Solo Driver", "2 — Tandem", "3-4 — Crew Chief + Team", "5-6 — Full Pit Crew", "7-10 — VIP Suite", "10+ — Winner's Circle"].map(t => <option key={t} value={t} style={{ background: C.smoke }}>{t}</option>)}
            </select>
            {errors.party && <span style={{ fontSize: 11, color: C.red, marginTop: 4, display: "block" }}>{errors.party}</span>}
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "'Oswald',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: C.textSec, marginBottom: 6 }}>Seating Preference</label>
            <select value={form.seating} onChange={e => setForm({ ...form, seating: e.target.value })} style={{ ...inputStyle("seating"), appearance: "auto" }}>
              <option value="">No preference</option>
              {["Main Dining Room", "Pit Lane Bar", "The Winner's Circle (Private)", "Rooftop Terrace", "Chef's Counter (V8 Kitchen)"].map(t => <option key={t} value={t} style={{ background: C.smoke }}>{t}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontFamily: "'Oswald',sans-serif", fontWeight: 400, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: C.textSec, marginBottom: 6 }}>Special Requests</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Allergies, celebrations, or 'Please don't yell at me like Gordon Ramsay'..." rows={4} style={{ ...inputStyle("notes"), resize: "vertical" }} />
          </div>
          <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: C.textSec, fontStyle: "italic", marginBottom: 16 }}>For parties of 10+, please call us directly. Walk-ins welcome at the Pit Lane Bar.</p>
            <button type="submit" style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: 3, textTransform: "uppercase", padding: "14px 40px", background: `linear-gradient(135deg,${C.red},${C.orange})`, color: "white", border: "none", cursor: "pointer", clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))", transition: "all 0.3s" }}>Confirm Reservation</button>
          </div>
        </form>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// COMPONENT: Merch
// ═══════════════════════════════════════════
const MERCH_ITEMS = [
  { name: "Fire Suit Apron", desc: "Nomex-inspired chef's apron in DuPont rainbow colors. Heat-resistant (metaphorically).", price: 65, emoji: "👕" },
  { name: "#24 Trucker Cap", desc: 'Vintage-wash snapback with embroidered flame logo and "It\'s RAW!" on the back.', price: 38, emoji: "🧢" },
  { name: "Signature Steak Knife Set", desc: "Japanese steel, rainbow titanium coating, walnut handles. Set of 4 in a checkered flag box.", price: 185, emoji: "🔪" },
  { name: '"Lap 500" Hot Sauce', desc: "House-made Carolina Reaper blend. 500,000 Scoville units. Signed bottle.", price: 24, emoji: "🌶️" },
];

function Merch() {
  return (
    <section id="merch" style={{ padding: "96px 24px", background: C.dark }}>
      <SectionHeader number="06" title="The" accent="Merch Pit" subtitle="Take a piece of the track home with you." />
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
        {MERCH_ITEMS.map((item, i) => <MerchCard key={item.name} item={item} index={i} />)}
      </div>
    </section>
  );
}

function MerchCard({ item, index }) {
  const [ref, vis] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
      border: `1px solid ${hov ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.05)"}`,
      overflow: "hidden", transition: "all 0.3s", transform: hov ? "translateY(-6px)" : "translateY(0)",
      boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.3)" : "none",
      opacity: vis ? 1 : 0,
    }}>
      <div style={{ aspectRatio: "1", background: `linear-gradient(135deg, ${C.smoke}, ${C.asphalt})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 56, transition: "transform 0.3s", transform: hov ? "scale(1.2) rotate(-5deg)" : "scale(1)" }}>{item.emoji}</span>
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{item.name}</h3>
        <p style={{ fontSize: 13, color: C.textSec, marginBottom: 12, lineHeight: 1.5 }}>{item.desc}</p>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, color: C.yellow, fontSize: "1.1rem" }}>${item.price}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// COMPONENT: Contact & Footer
// ═══════════════════════════════════════════
function Contact() {
  return (
    <section id="contact" style={{ padding: "96px 24px 48px", background: C.asphalt }}>
      <SectionHeader number="07" title="Find" accent="The Track" subtitle="We're right where the action is." />
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, textAlign: "center" }}>
        <div>
          <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: C.orange, marginBottom: 12 }}>Location</h3>
          <p style={{ color: C.textSec, fontSize: 14, lineHeight: 1.8 }}>2400 Victory Lane<br />Charlotte, NC 28202<br /><em style={{ fontSize: 12, color: C.orange }}>Adjacent to Charlotte Motor Speedway</em></p>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: C.orange, marginBottom: 12 }}>Hours</h3>
          <p style={{ color: C.textSec, fontSize: 14, lineHeight: 1.8 }}>Tue – Thu: 5pm – 10pm<br />Fri – Sat: 5pm – 12am<br />Sun Brunch: 11am – 3pm<br />Monday: Closed (Rest Day)</p>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: C.orange, marginBottom: 12 }}>Get in Touch</h3>
          <p style={{ color: C.textSec, fontSize: 14, lineHeight: 1.8 }}>(704) 240-0024<br />reservations@jeffgordonramseys.com<br />@JeffGordonRamseys</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: C.tire, padding: "40px 24px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "1.2rem", letterSpacing: 4, textTransform: "uppercase", background: `linear-gradient(135deg,${C.red},${C.orange},${C.yellow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 16 }}>Jeff Gordon Ramsey's</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20 }}>
        {["Instagram", "TikTok", "X / Twitter", "Facebook", "Yelp"].map(s => (
          <span key={s} style={{ color: C.textSec, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Oswald',sans-serif", cursor: "pointer" }}>{s}</span>
        ))}
      </div>
      <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, letterSpacing: 1 }}>
        © 2024–2026 Jeff Gordon Ramsey's Motorsport Steakhouse
        <span style={{ display: "block", marginTop: 6, fontSize: 11, fontStyle: "italic", color: "rgba(255,107,43,0.3)" }}>"If you can't stand the heat, get out of the pits."</span>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App() {
  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: C.dark, color: C.cream, overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.dark}; }
        ::selection { background: ${C.red}; color: white; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${C.tire}; }
        ::-webkit-scrollbar-thumb { background: ${C.red}; border-radius: 4px; }
      `}</style>

      <Navigation />
      <Hero />
      <CheckeredDivider />
      <About />
      <CheckeredDivider thin />
      <Menu />
      <CheckeredDivider thin />
      <Cocktails />
      <CheckeredDivider thin />
      <Gallery />
      <Reservations />
      <CheckeredDivider thin />
      <Merch />
      <CheckeredDivider thin />
      <Contact />
      <CheckeredDivider />
      <Footer />
    </div>
  );
}
