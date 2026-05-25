import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search, Heart, GitCompare, Monitor, Laptop, Gamepad2, X,
  ExternalLink, Filter, Bot, Globe, Trophy, Award,
  Flame, Menu, Check, SortAsc, Trash2, BarChart3, ArrowLeft,
  Cpu, HardDrive, Zap, Star, ChevronDown, ChevronUp, Send,
  Bookmark, BookmarkCheck, RotateCcw, Shield, TrendingUp, Play
} from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#080810;color:#dde4ff;font-family:'Rajdhani',sans-serif;overflow-x:hidden}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#080810}
::-webkit-scrollbar-thumb{background:#00e5ff33;border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:#00e5ff66}
.orb{font-family:'Orbitron',monospace}
.raj{font-family:'Rajdhani',sans-serif}

@keyframes glow{0%,100%{box-shadow:0 0 15px #00e5ff22,0 0 30px #00e5ff0a}50%{box-shadow:0 0 25px #00e5ff44,0 0 50px #00e5ff15}}
@keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes borderGlow{0%,100%{border-color:#00e5ff33}50%{border-color:#00e5ff88}}
@keyframes skeletonPulse{0%,100%{opacity:.4}50%{opacity:.8}}

.anim-up{animation:slideUp 0.45s cubic-bezier(.22,1,.36,1) both}
.anim-in{animation:slideIn 0.35s cubic-bezier(.22,1,.36,1) both}
.anim-fade{animation:fadeIn 0.3s ease both}
.anim-float{animation:float 4s ease-in-out infinite}
.skeleton{animation:skeletonPulse 1.5s ease-in-out infinite;background:rgba(255,255,255,0.06);border-radius:6px}

.card-hover{transition:transform .3s cubic-bezier(.4,0,.2,1),box-shadow .3s}
.card-hover:hover{transform:translateY(-6px);box-shadow:0 24px 64px rgba(0,229,255,0.15),0 0 0 1px rgba(0,229,255,0.25)}

.glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.07)}
.glass-card{background:rgba(14,14,28,0.85);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.07)}
.glass-dark{background:rgba(0,0,0,0.5);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.06)}

.grad-cyan{background:linear-gradient(135deg,#00e5ff,#0080ff)}
.grad-gold{background:linear-gradient(135deg,#ffd700,#ff9500)}
.grad-fire{background:linear-gradient(135deg,#ff6b35,#f7931e)}
.grad-green{background:linear-gradient(135deg,#00ff88,#00c964)}

.text-cyan{background:linear-gradient(135deg,#00e5ff,#0080ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.text-gold{background:linear-gradient(135deg,#ffd700,#ff9500);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.text-fire{background:linear-gradient(135deg,#ff6b35,#f7931e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.btn{cursor:pointer;border:none;border-radius:8px;font-family:'Rajdhani',sans-serif;font-weight:600;letter-spacing:.5px;transition:all .2s}
.btn:hover{filter:brightness(1.12);transform:translateY(-1px)}
.btn:active{transform:translateY(0)}

.hero-bg{background:radial-gradient(ellipse 80% 60% at 20% 40%,rgba(0,229,255,0.07) 0%,transparent 65%),radial-gradient(ellipse 60% 50% at 80% 20%,rgba(0,128,255,0.05) 0%,transparent 55%),radial-gradient(ellipse 50% 40% at 65% 75%,rgba(255,59,48,0.03) 0%,transparent 45%),#080810}
.grid-bg{background-image:linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px);background-size:56px 56px}

.perf-fill{height:100%;border-radius:4px;transition:width .9s cubic-bezier(.4,0,.2,1)}
input,select,textarea{font-family:'Rajdhani',sans-serif}
input:focus,select:focus,textarea:focus{outline:none}

.scan-line{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00e5ff44,transparent);animation:scan 4s linear infinite;pointer-events:none}

.budget-btn{transition:all .25s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}
.budget-btn:hover{transform:scale(1.04);box-shadow:0 8px 24px rgba(0,229,255,0.2)}
.budget-btn.active{box-shadow:0 0 0 2px #00e5ff,0 8px 32px rgba(0,229,255,0.3)}

.cat-card{transition:all .3s cubic-bezier(.4,0,.2,1);cursor:pointer;overflow:hidden;position:relative}
.cat-card:hover{transform:translateY(-8px) scale(1.02)}
.cat-card:hover .cat-icon{animation:float 2s ease-in-out infinite}

.img-zoom{transition:transform .5s cubic-bezier(.4,0,.2,1)}
.img-zoom:hover{transform:scale(1.07)}

.yt-btn:hover{background:rgba(255,0,0,0.18)!important}

@media(max-width:768px){
  .hide-mob{display:none!important}
  .show-mob{display:flex!important}
  .full-mob{width:100%!important}
  .stack-mob{flex-direction:column!important}
  .p-mob{padding:16px!important}
  .grid-mob-1{grid-template-columns:1fr!important}
}
@media(min-width:769px){
  .show-mob{display:none!important}
}
`;

const fmtPrice = p => `€${p.toLocaleString()}`;
const perfColor = s => s >= 8.5 ? "#00e5ff" : s >= 6.5 ? "#a78bfa" : s >= 4.5 ? "#f59e0b" : "#6b7280";
const levelKey = l => ({ Entry: "entry", "Mid-range": "mid", "High-end": "high", Enthusiast: "enth" }[l] || "entry");

const searchURL = (store, name) => {
  const q = encodeURIComponent(name);
  const urls = {
    "Amazon": `https://www.amazon.es/s?k=${q}`,
    "Amazon (parts)": `https://www.amazon.es/s?k=${q}`,
    "eBay": `https://www.ebay.es/sch/i.html?_nkw=${q}`,
    "MediaMarkt": `https://www.mediamarkt.es/es/search.html?query=${q}`,
    "BackMarket": `https://www.backmarket.es/es-es/search?q=${q}`,
    "Lenovo Outlet": `https://www.lenovo.com/es/es/deals/`,
    "Lenovo": `https://www.lenovo.com/es/es/`,
    "ASUS Store": `https://www.asus.com/es/`,
    "Apple Store": `https://www.apple.com/es/shop/`,
    "Dell": `https://www.dell.com/es-es/`,
    "HP Store": `https://www.hp.com/es-es/`,
    "Fnac": `https://www.fnac.es/SearchResult/ResultList.aspx?Search=${q}`,
    "PCComponentes": `https://www.pccomponentes.com/buscar/?query=${q}`,
    "LDLC": `https://www.ldlc.com/es-es/recherche/${q}/`,
    "Wallapop": `https://es.wallapop.com/app/search?keywords=${q}`,
    "Razer": `https://www.razer.com/es-es/`,
    "Custom Build Service": `https://www.pccomponentes.com/buscar/?query=${q}`,
    "Custom Build": `https://www.pccomponentes.com/buscar/?query=${q}`,
    "Overclockers": `https://www.overclockers.co.uk/search?q=${q}`,
    "NZXT Build": `https://www.nzxt.com/`,
    "Maingear": `https://maingear.com/`,
    "HP Z8": `https://www.hp.com/es-es/`,
  };
  return urls[store] || `https://www.google.com/search?q=${q}+comprar`;
};

const ytSearchURL = name => `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " review")}`;

// Product-specific images using picsum with deterministic seeds + Unsplash collections
// Using direct Unsplash source URLs with specific photo IDs that reliably load
const IMG = {
  // Laptops - specific working Unsplash photos
  laptop_budget: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80",
  laptop_mid: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
  laptop_macbook: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
  laptop_gaming: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
  laptop_thin: "https://images.unsplash.com/photo-1484788984921-03950022c38b?w=500&q=80",
  laptop_pro: "https://images.unsplash.com/photo-1611186871525-46be5f8c8efb?w=500&q=80",
  laptop_dell: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
  laptop_asus: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80",
  // Desktop PCs
  pc_office: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80",
  pc_tower: "https://images.unsplash.com/photo-1593640408182-31c228f76fd7?w=500&q=80",
  pc_rgb: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&q=80",
  pc_workstation: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80",
  pc_mini: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500&q=80",
  // Gaming PCs
  gaming_rig: "https://images.unsplash.com/photo-1542549237-3de0f6f25e73?w=500&q=80",
  gaming_rgb: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80",
  gaming_setup: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500&q=80",
  gaming_ultra: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80",
};

const _make = (id, category, budget, name, price, img, description, whyGoodValue, condition, specs, performanceLevel, useCases, stores, badges, valueScore, performanceScore, colors) => ({
  id, category, budget, name, price, img,
  description, whyGoodValue, condition, specs,
  performanceLevel, useCases,
  purchaseLinks: stores.map(([store, customPrice]) => ({
    store,
    url: searchURL(store, name),
    price: customPrice ?? price
  })),
  youtubeSearch: ytSearchURL(name),
  badges, valueScore, performanceScore, colors
});

const PRODUCTS = [
  // ─── LAPTOPS ───────────────────────────────────────────
  _make("l1","laptop",100,"Lenovo IdeaPad 1 (2021)",95,IMG.laptop_budget,
    "Portátil de entrada sólido para informática básica. Navega por la web y tareas de oficina sin problema.",
    "Calidad de construcción excepcional de Lenovo a precios de saldo. RAM ampliable y buena batería.",
    "Refurbished",{cpu:"Intel Celeron N4020",gpu:"Intel UHD 600",ram:"4GB DDR4",storage:"64GB eMMC"},
    "Entry",["School","Office"],[["Amazon",95],["eBay",89]],[],8.2,2.5,["#1a237e","#283593"]),

  _make("l2","laptop",100,"HP 14s-dq (Ocasión)",110,IMG.laptop_mid,
    "HP fiable con potencia suficiente para estudiantes. Buena calidad de pantalla y teclado para uso prolongado.",
    "Calidad de construcción comercial HP a precios de segunda mano. SSD rápido incluido.",
    "Used",{cpu:"Intel Pentium Silver N5030",gpu:"Intel UHD 605",ram:"4GB DDR4",storage:"128GB SSD"},
    "Entry",["School","Office"],[["eBay",110],["BackMarket",105]],["Best Deal"],8.7,3.0,["#1b5e20","#2e7d32"]),

  _make("l3","laptop",200,"Acer Aspire 3 A315 (Ryzen 5)",199,IMG.laptop_mid,
    "El estándar de oro para portátiles económicos. El procesador Ryzen 5 ofrece un rendimiento diario excelente.",
    "Ryzen 5 moderno + SSD NVMe rápido a 199€ es casi un milagro. Nada lo supera en esta gama.",
    "New",{cpu:"AMD Ryzen 5 3500U",gpu:"AMD Radeon Vega 8",ram:"8GB DDR4",storage:"256GB NVMe"},
    "Entry",["School","Office","Streaming"],[["Amazon",199],["MediaMarkt",209]],["Best Deal","Editor Choice"],9.3,4.5,["#4a148c","#6a1b9a"]),

  _make("l4","laptop",200,"Lenovo IdeaPad 3 (Refurb i3)",185,IMG.laptop_budget,
    "IdeaPad 3 reacondicionado certificado con Intel i3. Diseño limpio, buen teclado y fiabilidad Lenovo.",
    "Garantía Lenovo en una unidad reacondicionada da tranquilidad. Intel i3 gestiona la multitarea eficientemente.",
    "Refurbished",{cpu:"Intel Core i3-10110U",gpu:"Intel UHD 620",ram:"8GB DDR4",storage:"256GB SSD"},
    "Entry",["School","Office"],[["Lenovo Outlet",185],["Amazon",195]],[],8.5,4.0,["#bf360c","#d84315"]),

  _make("l5","laptop",300,"HP Pavilion 15-eh (Ryzen 5)",299,IMG.laptop_asus,
    "Portátil de gama media completo con pantalla Full HD. Excelente para multitarea y trabajo creativo.",
    "Pantalla IPS Full HD, Ryzen 5 de 8 núcleos y SSD 512GB a 299€ es un valor increíble.",
    "New",{cpu:"AMD Ryzen 5 5500U",gpu:"AMD Radeon Graphics",ram:"8GB DDR4",storage:"512GB SSD"},
    "Mid-range",["School","Office","Streaming","Editing"],[["HP Store",299],["Amazon",289]],["Editor Choice"],9.0,5.5,["#00695c","#00796b"]),

  _make("l6","laptop",300,"Acer Aspire 5 A515 (Ryzen 5625U)",289,IMG.laptop_mid,
    "El portátil más recomendado por la comunidad. Fiabilidad probada con 8 horas de batería y construcción sólida.",
    "El portátil más recomendado en esta gama. Ryzen 5625U + 8GB RAM es raro a 289€.",
    "New",{cpu:"AMD Ryzen 5 5625U",gpu:"AMD Radeon Graphics",ram:"8GB DDR4",storage:"512GB SSD"},
    "Mid-range",["School","Editing","Office","Streaming"],[["Amazon",289],["Fnac",299]],["Best Deal"],9.1,5.8,["#01579b","#0277bd"]),

  _make("l7","laptop",500,"ASUS VivoBook 16X (Ryzen 7)",499,IMG.laptop_asus,
    "Portátil grande de 16 pulgadas con GTX 1650 dedicada. Genial para gaming ligero y creación de contenido.",
    "GPU dedicada a 499€ abre posibilidades de gaming ligero. Pantalla grande y 16GB RAM son extras.",
    "New",{cpu:"AMD Ryzen 7 5800H",gpu:"NVIDIA GTX 1650 4GB",ram:"16GB DDR4",storage:"512GB NVMe"},
    "Mid-range",["Editing","School","Streaming","Gaming"],[["ASUS Store",499],["Amazon",489]],["Best Deal"],9.2,6.5,["#880e4f","#ad1457"]),

  _make("l8","laptop",500,"Lenovo IdeaPad 5 Pro (RTX 3050)",479,IMG.laptop_gaming,
    "Pantalla 2K con GPU discreta RTX 3050. Perfecto para estudiantes que quieren probar el gaming.",
    "Pantalla 2.5K y GPU RTX 3050 por menos de 500€ es prácticamente imposible encontrarlo.",
    "New",{cpu:"AMD Ryzen 5 6600H",gpu:"NVIDIA RTX 3050 4GB",ram:"16GB DDR5",storage:"512GB NVMe"},
    "Mid-range",["Editing","Gaming","School"],[["Lenovo",479],["MediaMarkt",499]],["Editor Choice"],9.0,6.8,["#1a237e","#283593"]),

  _make("l9","laptop",800,"ASUS ZenBook 14 OLED (i7)",799,IMG.laptop_thin,
    "Ultrabook premium con pantalla OLED real. Más de 12 horas de batería y funcionamiento silencioso.",
    "Panel OLED a este precio es una ganga. Combinado con 12 horas de batería, redefine la productividad portátil.",
    "New",{cpu:"Intel Core i7-1260P",gpu:"Intel Iris Xe / RTX 2050",ram:"16GB LPDDR5",storage:"1TB NVMe"},
    "High-end",["Editing","Office","Streaming"],[["ASUS Store",799],["Amazon",779]],["Editor Choice"],8.8,7.5,["#4a148c","#6a1b9a"]),

  _make("l10","laptop",800,"Dell Inspiron 16 Plus (RTX 3050 Ti)",769,IMG.laptop_dell,
    "Potente portátil de 16 pulgadas con GPU discreta para gaming y trabajo creativo. Calidad Dell.",
    "RTX 3050 Ti en pantalla de 16 pulgadas por menos de 800€ es excepcional. Gaming ligero + edición de vídeo.",
    "New",{cpu:"Intel Core i7-12700H",gpu:"NVIDIA RTX 3050 Ti 4GB",ram:"16GB DDR5",storage:"512GB SSD"},
    "High-end",["Gaming","Editing","Streaming"],[["Dell",769],["Amazon",759]],["Best Deal"],8.9,7.8,["#006064","#00838f"]),

  _make("l11","laptop",1000,"Apple MacBook Air M2",999,IMG.laptop_macbook,
    "El mejor portátil ligero jamás fabricado. La eficiencia del chip M2 destruye a los competidores x86.",
    "Batería de 18+ horas + rendimiento M2 en 1.24kg es incomparable. El mejor portátil a 1000€.",
    "New",{cpu:"Apple M2 (8 núcleos)",gpu:"Apple M2 GPU (8 núcleos)",ram:"8GB Unificada",storage:"256GB SSD"},
    "High-end",["Editing","Office","School","Streaming"],[["Apple Store",999],["Amazon",979]],["Editor Choice"],9.0,8.5,["#1c1c1e","#424242"]),

  _make("l12","laptop",1000,"Dell XPS 13 (i7-1360P)",979,IMG.laptop_dell,
    "Ultrabook icónico con pantalla OLED 3.5K. El diseño de portátil más refinado disponible.",
    "Chasis de aluminio premium + OLED impresionante + 16GB RAM — casi imposible de superar a 979€.",
    "New",{cpu:"Intel Core i7-1360P",gpu:"Intel Iris Xe",ram:"16GB LPDDR5",storage:"512GB NVMe"},
    "High-end",["Office","School","Editing"],[["Dell",979],["Amazon",949]],[],8.5,8.0,["#37474f","#455a64"]),

  _make("l13","laptop",1500,"Apple MacBook Pro 14\" M3",1499,IMG.laptop_macbook,
    "Potencia profesional en formato de 14 pulgadas. Rendimiento nivel M3 para creativos.",
    "Rendimiento líder en la industria, pantalla Liquid Retina XDR y 22h de batería — el portátil pro definitivo.",
    "New",{cpu:"Apple M3 (8 núcleos)",gpu:"Apple M3 GPU (10 núcleos)",ram:"8GB Unificada",storage:"512GB SSD"},
    "High-end",["Editing","Streaming","Office"],[["Apple Store",1499],["Amazon",1479]],["Editor Choice"],9.2,9.3,["#1c1c1e","#2c2c2e"]),

  _make("l14","laptop",1500,"ASUS ROG Zephyrus G14 (RTX 4060)",1449,IMG.laptop_gaming,
    "El mejor portátil gaming compacto jamás fabricado. RTX 4060 + Ryzen 9 en un cuerpo de 1.65kg.",
    "Rendimiento RTX 4060 + batería de 8 horas en un ultrabook delgado. Nada compite a 1449€.",
    "New",{cpu:"AMD Ryzen 9 7940HS",gpu:"NVIDIA RTX 4060 8GB",ram:"16GB DDR5",storage:"1TB NVMe"},
    "High-end",["Gaming","Editing","Streaming"],[["ASUS Store",1449],["Amazon",1399]],["Best Deal"],9.1,9.0,["#b71c1c","#c62828"]),

  _make("l15","laptop",2000,"Apple MacBook Pro 14\" M3 Pro",1999,IMG.laptop_pro,
    "El chip M3 Pro es una revolución. Maneja edición 4K, renderizado 3D y ML con facilidad.",
    "M3 Pro supera a la mayoría de workstations de escritorio en rendimiento/vatio. 18GB de memoria unificada es transformador.",
    "New",{cpu:"Apple M3 Pro (12 núcleos)",gpu:"Apple M3 Pro GPU (18 núcleos)",ram:"18GB Unificada",storage:"512GB SSD"},
    "Enthusiast",["Editing","Streaming","Office"],[["Apple Store",1999],["Amazon",1949]],["Editor Choice"],9.3,9.6,["#1c1c1e","#2c2c2e"]),

  _make("l16","laptop",2000,"Razer Blade 14 (RTX 4070)",1949,IMG.laptop_gaming,
    "Portátil gaming premium con la construcción característica de Razer. RTX 4070 + pantalla miniLED 165Hz.",
    "Aluminio mecanizado, RTX 4070 y RGB Chroma por tecla en 1.78kg. Para gamers serios.",
    "New",{cpu:"AMD Ryzen 9 7940HX",gpu:"NVIDIA RTX 4070 8GB",ram:"32GB DDR5",storage:"1TB NVMe Gen4"},
    "Enthusiast",["Gaming","Editing","Streaming"],[["Razer",1949],["Amazon",1899]],["Best Deal"],8.9,9.4,["#1a1a1a","#2d2d2d"]),

  _make("l17","laptop",5000,"Apple MacBook Pro 16\" M3 Max",4999,IMG.laptop_pro,
    "El portátil más potente del mundo. M3 Max con 128GB de memoria unificada para profesionales absolutos.",
    "Reemplaza workstations de escritorio enteras. La GPU de 40 núcleos maneja flujos de trabajo ProRes 8K en tiempo real.",
    "New",{cpu:"Apple M3 Max (16 núcleos)",gpu:"Apple M3 Max GPU (40 núcleos)",ram:"128GB Unificada",storage:"2TB SSD"},
    "Enthusiast",["Editing","Streaming"],[["Apple Store",4999]],["Editor Choice"],9.5,10,["#1c1c1e","#3a3a3c"]),

  _make("l18","laptop",5000,"Razer Blade 18 (RTX 4090)",4799,IMG.laptop_gaming,
    "RTX 4090 de nivel desktop en un portátil de 18 pulgadas. El portátil gaming más potente jamás construido.",
    "RTX 4090 completo en pantalla 4K miniLED. Verdadero reemplazo de escritorio para gamers.",
    "New",{cpu:"Intel Core i9-13980HX",gpu:"NVIDIA RTX 4090 16GB",ram:"32GB DDR5",storage:"2TB NVMe"},
    "Enthusiast",["Gaming","Editing","Streaming"],[["Razer",4799],["Amazon",4699]],["Best Deal"],8.7,9.9,["#1a1a1a","#222222"]),

  // ─── DESKTOP PCs ─────────────────────────────────────
  _make("p1","pc",100,"HP Compaq 8300 Elite SFF",89,IMG.pc_office,
    "PC de oficina sólido de la línea comercial de HP. Maneja todas las tareas informáticas del día a día.",
    "Construcción HP de calidad comercial a 89€. Fiable, ampliable y funcionamiento silencioso.",
    "Used",{cpu:"Intel Core i5-3470",gpu:"Intel HD 2500",ram:"8GB DDR3",storage:"256GB SSD"},
    "Entry",["Office","School"],[["eBay",89],["Wallapop",75]],["Best Deal"],8.5,3.0,["#37474f","#546e7a"]),

  _make("p2","pc",100,"Dell OptiPlex 3040 Micro",99,IMG.pc_mini,
    "Pequeño pero capaz. El factor de forma micro de Dell ahorra espacio en el escritorio.",
    "La legendaria fiabilidad de Dell + i5 Skylake + SSD por menos de 100€. Compacto y potente.",
    "Refurbished",{cpu:"Intel Core i5-6500T",gpu:"Intel HD 530",ram:"8GB DDR4",storage:"256GB SSD"},
    "Entry",["Office","School"],[["BackMarket",99],["eBay",95]],[],8.2,3.5,["#263238","#37474f"]),

  _make("p3","pc",200,"Build Económico (Ryzen 3 4300G)",199,IMG.pc_tower,
    "Build moderno con GPU Vega integrada. Supera a todos los sistemas usados en esta gama de precios.",
    "Componentes nuevos + APU Ryzen 3 significa soporte a largo plazo y posibilidad de añadir GPU.",
    "New",{cpu:"AMD Ryzen 3 4300G",gpu:"AMD Radeon Vega 6 (iGPU)",ram:"8GB DDR4",storage:"480GB SSD"},
    "Entry",["Office","School","Streaming"],[["Amazon (parts)",199],["PCComponentes",189]],["Best Deal"],9.0,4.5,["#004d40","#00695c"]),

  _make("p4","pc",300,"Build (Ryzen 5 5600G + RX 6600)",299,IMG.pc_rgb,
    "Excelente PC de gama media con GPU discreta. Gaming ligero y productividad seria combinados.",
    "GPU RX 6600 dedicada a 299€ en total es un valor fenomenal. Maneja gaming 1080p a ajustes medio-altos.",
    "New",{cpu:"AMD Ryzen 5 5600G",gpu:"AMD RX 6600 8GB",ram:"16GB DDR4",storage:"500GB NVMe"},
    "Mid-range",["Gaming","Editing","Office","Streaming"],[["Amazon (parts)",299],["PCComponentes",289]],["Editor Choice","Best Deal"],9.4,6.0,["#880e4f","#ad1457"]),

  _make("p5","pc",500,"Build (i5-13400 + RTX 3060)",499,IMG.pc_tower,
    "PC todoterreno para gaming, streaming y creación de contenido. Excelente para gaming 1080p.",
    "RTX 3060 12GB VRAM + Intel de 13ª generación a 499€. Domina el gaming 1080p en todos los títulos.",
    "New",{cpu:"Intel Core i5-13400",gpu:"NVIDIA RTX 3060 12GB",ram:"16GB DDR4",storage:"1TB NVMe"},
    "Mid-range",["Gaming","Editing","Streaming"],[["Amazon",499],["PCComponentes",489]],["Best Deal"],9.2,7.0,["#1565c0","#1976d2"]),

  _make("p6","pc",800,"Build (Ryzen 7 5700X + RTX 3070)",799,IMG.pc_rgb,
    "PC de alto rendimiento para gaming 1440p y creación de contenido seria. Bestia de trabajo continuo.",
    "Gaming AAA a ultra 1440p + streaming simultáneo. El DLSS de RTX 3070 lo hace a prueba de futuro.",
    "New",{cpu:"AMD Ryzen 7 5700X",gpu:"NVIDIA RTX 3070 8GB",ram:"32GB DDR4",storage:"1TB NVMe"},
    "High-end",["Gaming","Editing","Streaming"],[["Amazon",799],["PCComponentes",789]],["Editor Choice"],9.0,8.0,["#4a148c","#6a1b9a"]),

  _make("p7","pc",1000,"Build (i7-13700K + RTX 4070)",999,IMG.pc_rgb,
    "PC casi flagship. RTX 4070 con DLSS 3 hace el gaming 1440p y 4K ligero sin esfuerzo.",
    "Frame Generation de RTX 4070 cambia el juego. Los 24 hilos del i7-13700K maneja cualquier carga de trabajo.",
    "New",{cpu:"Intel Core i7-13700K",gpu:"NVIDIA RTX 4070 12GB",ram:"32GB DDR5",storage:"2TB NVMe Gen4"},
    "High-end",["Gaming","Editing","Streaming"],[["Amazon",999],["LDLC",989]],["Best Deal","Editor Choice"],9.3,8.8,["#1a237e","#283593"]),

  _make("p8","pc",1500,"Build (Ryzen 9 7900X + RTX 4070 Ti)",1499,IMG.pc_workstation,
    "PC entusiasta para gaming 4K y creación de contenido profesional. Sin compromisos.",
    "RTX 4070 Ti ofrece gaming 4K real. Los 24 hilos del Ryzen 9 7900X domina cualquier carga de trabajo.",
    "New",{cpu:"AMD Ryzen 9 7900X",gpu:"NVIDIA RTX 4070 Ti 12GB",ram:"64GB DDR5",storage:"2TB NVMe"},
    "High-end",["Gaming","Editing","Streaming"],[["Amazon",1499],["PCComponentes",1479]],["Editor Choice"],9.1,9.3,["#1b5e20","#2e7d32"]),

  _make("p9","pc",2000,"Build (i9-13900K + RTX 4080)",1999,IMG.pc_workstation,
    "Build gaming y workstation flagship. RTX 4080 maneja 4K ultra en todos los juegos con margen.",
    "RTX 4080 domina el gaming 4K. La arquitectura híbrida del i9-13900K proporciona multi-hilo incomparable.",
    "New",{cpu:"Intel Core i9-13900K",gpu:"NVIDIA RTX 4080 16GB",ram:"64GB DDR5",storage:"4TB NVMe"},
    "Enthusiast",["Gaming","Editing","Streaming"],[["Amazon",1999],["LDLC",1979]],["Best Deal","Editor Choice"],9.2,9.7,["#b71c1c","#c62828"]),

  _make("p10","pc",5000,"Workstation Threadripper (RTX 4090)",4999,IMG.pc_workstation,
    "Workstation Threadripper profesional para renderizado 3D, IA y producción de vídeo 8K.",
    "Threadripper + RTX 4090 es lo que usan los estudios de Hollywood. Incomparable para flujos profesionales.",
    "New",{cpu:"AMD Ryzen Threadripper 7960X",gpu:"NVIDIA RTX 4090 24GB",ram:"128GB DDR5 ECC",storage:"8TB NVMe RAID"},
    "Enthusiast",["Editing","Streaming"],[["PCComponentes",4999]],["Editor Choice"],9.3,10,["#4a148c","#6a1b9a"]),

  _make("p11","pc",7000,"Workstation Doble RTX 4090",6999,IMG.pc_workstation,
    "Workstation de doble GPU para entrenamiento de IA, computación científica y etalonaje 8K.",
    "48GB VRAM en dos 4090 permite entrenar LLMs y flujos de trabajo 8K en tiempo real.",
    "New",{cpu:"AMD Threadripper PRO 7985WX",gpu:"2× NVIDIA RTX 4090 24GB",ram:"256GB DDR5 ECC",storage:"16TB NVMe RAID"},
    "Enthusiast",["Editing","Streaming"],[["Custom Build",6999]],["Editor Choice"],9.4,10,["#004d7a","#0077b6"]),

  _make("p12","pc",8000,"Mac Pro M2 Ultra (Base)",7999,IMG.pc_workstation,
    "La torre profesional de Apple. El ancho de banda de memoria unificada de 192GB del M2 Ultra es sin precedentes.",
    "192GB de memoria unificada elimina los cuellos de botella de GPU para cualquier flujo de trabajo multimedia.",
    "New",{cpu:"Apple M2 Ultra (24 núcleos)",gpu:"Apple M2 Ultra GPU (76 núcleos)",ram:"192GB Unificada",storage:"1TB SSD"},
    "Enthusiast",["Editing","Streaming"],[["Apple Store",7999]],["Editor Choice"],9.5,10,["#1c1c1e","#3a3a3c"]),

  // ─── GAMING PCs ───────────────────────────────────────
  _make("g1","gaming",100,"Gaming PC Usado (GTX 1050 Ti)",99,IMG.gaming_rig,
    "Gaming de entrada con el presupuesto más ajustado. Juega CS2, Minecraft y Valorant a 60fps sin problema.",
    "A 100€, cualquier GPU dedicada es una victoria. GTX 1050 Ti maneja la mayoría de títulos esports.",
    "Used",{cpu:"Intel Core i5-6500",gpu:"NVIDIA GTX 1050 Ti 4GB",ram:"8GB DDR4",storage:"240GB SSD"},
    "Entry",["Gaming","School"],[["eBay",99],["Wallapop",85]],["Best Deal"],7.5,2.5,["#33691e","#558b2f"]),

  _make("g2","gaming",200,"Build Gaming (GTX 1660 Super)",199,IMG.gaming_rgb,
    "PC gaming real 1080p. Maneja juegos modernos a ajustes medio-altos con frames sólidos.",
    "GTX 1660 Super a 199€ de coste total es un valor irreal. Juega cualquier juego a 1080p 60fps.",
    "Used",{cpu:"AMD Ryzen 5 2600",gpu:"NVIDIA GTX 1660 Super 6GB",ram:"16GB DDR4",storage:"480GB SSD"},
    "Entry",["Gaming","Streaming"],[["eBay",199],["Wallapop",185]],["Best Deal"],8.8,4.5,["#006064","#00838f"]),

  _make("g3","gaming",300,"PC Gaming Básico (RX 6600 8GB)",299,IMG.gaming_setup,
    "Excelente gaming 1080p con GPU AMD moderna. Todos los juegos actuales a 60+ fps en ajustes altos.",
    "Los 8GB VRAM del RX 6600 con soporte FSR 2 lo hacen rendir muy por encima de su precio.",
    "New",{cpu:"AMD Ryzen 5 4500",gpu:"AMD RX 6600 8GB",ram:"16GB DDR4",storage:"500GB NVMe"},
    "Mid-range",["Gaming","Streaming"],[["Amazon",299],["PCComponentes",289]],["Editor Choice","Best Deal"],9.3,6.0,["#b71c1c","#c62828"]),

  _make("g4","gaming",300,"Build Gaming (RTX 3060 Usado)",285,IMG.gaming_rgb,
    "Sistema RTX 3060 usado para excelente gaming 1080p/1440p con soporte de ray tracing.",
    "12GB VRAM del RTX 3060 + ray tracing + DLSS a precios de segunda mano es valor excepcional.",
    "Used",{cpu:"Intel Core i5-10400F",gpu:"NVIDIA RTX 3060 12GB",ram:"16GB DDR4",storage:"500GB NVMe"},
    "Mid-range",["Gaming","Streaming","Editing"],[["eBay",285],["Wallapop",275]],["Best Deal"],9.0,6.5,["#1a237e","#283593"]),

  _make("g5","gaming",500,"PC Gaming Medio (RTX 3060 Ti)",499,IMG.gaming_rig,
    "Gaming 1080p alto y 1440p capaz. Excelente para gaming competitivo y AAA simultáneamente.",
    "El rendimiento del RTX 3060 Ti a 499€ de build total es prácticamente una ganga. Supera al 4060.",
    "New",{cpu:"AMD Ryzen 5 5600X",gpu:"NVIDIA RTX 3060 Ti 8GB",ram:"16GB DDR4",storage:"1TB NVMe"},
    "Mid-range",["Gaming","Streaming","Editing"],[["Amazon",499],["PCComponentes",489]],["Editor Choice"],9.1,7.2,["#880e4f","#ad1457"]),

  _make("g6","gaming",800,"PC Gaming Alto (RTX 4070)",799,IMG.gaming_rgb,
    "Potencia de gaming premium 1440p. Maneja todos los juegos a máximos ajustes con excelentes frames.",
    "RTX 4070 + DLSS 3 Frame Generation hace el gaming 1440p sentirse como next-gen.",
    "New",{cpu:"AMD Ryzen 7 7700X",gpu:"NVIDIA RTX 4070 12GB",ram:"32GB DDR5",storage:"2TB NVMe"},
    "High-end",["Gaming","Streaming","Editing"],[["Amazon",799],["LDLC",789]],["Best Deal","Editor Choice"],9.2,8.5,["#4a148c","#6a1b9a"]),

  _make("g7","gaming",1000,"PC Gaming Ultra (RTX 4070 Ti)",999,IMG.gaming_ultra,
    "Sistema capaz para 4K con RTX 4070 Ti. Excepcional para títulos exigentes y juegos futuros.",
    "RTX 4070 Ti permite gaming 4K real + creación de contenido. El mejor punto dulce a 1000€.",
    "New",{cpu:"Intel Core i7-13700K",gpu:"NVIDIA RTX 4070 Ti 12GB",ram:"32GB DDR5",storage:"2TB NVMe Gen4"},
    "High-end",["Gaming","Streaming","Editing"],[["Amazon",999],["PCComponentes",979]],["Best Deal","Editor Choice"],9.4,9.2,["#006064","#00838f"]),

  _make("g8","gaming",1500,"PC Gaming Entusiasta (RTX 4080)",1499,IMG.gaming_ultra,
    "Rig 4K sin compromisos. RTX 4080 domina todos los juegos a 4K ultra.",
    "RTX 4080 + i9-13900K es imbatible a 1499€. A prueba de futuro para gaming 4K por años.",
    "New",{cpu:"Intel Core i9-13900K",gpu:"NVIDIA RTX 4080 16GB",ram:"64GB DDR5",storage:"4TB NVMe"},
    "Enthusiast",["Gaming","Streaming","Editing"],[["Amazon",1499],["LDLC",1479]],["Editor Choice"],9.2,9.7,["#1a1a2e","#16213e"]),

  _make("g9","gaming",2000,"PC Gaming Rey (RTX 4090)",1999,IMG.gaming_ultra,
    "El PC gaming definitivo. RTX 4090 maneja 4K ultra + 8K en algunos títulos. Rey indiscutible.",
    "GPU gaming más rápida jamás creada + Ryzen 9 7950X. Ningún juego puede desafiar este sistema.",
    "New",{cpu:"AMD Ryzen 9 7950X",gpu:"NVIDIA RTX 4090 24GB",ram:"64GB DDR5",storage:"4TB NVMe Gen4"},
    "Enthusiast",["Gaming","Streaming","Editing"],[["Amazon",1999],["Overclockers",1949]],["Best Deal","Editor Choice"],9.3,10,["#4a0080","#6a0dad"]),

  _make("g10","gaming",5000,"Build Gaming Refrigeración Líquida",4999,IMG.gaming_rgb,
    "Build gaming con refrigeración líquida personalizada y RTX 4090 overclockeado. Para streamers y pros.",
    "Loop de agua personalizado, RGB y componentes OC. El PC gaming con el que sueñan los creadores.",
    "New",{cpu:"Intel Core i9-14900KS (OC 6.2GHz)",gpu:"NVIDIA RTX 4090 24GB (OC)",ram:"128GB DDR5 6400MHz",storage:"8TB NVMe RAID"},
    "Enthusiast",["Gaming","Streaming","Editing"],[["NZXT Build",4999],["Overclockers",4799]],["Editor Choice"],9.0,10,["#1a0a2e","#2d0a5c"]),

  _make("g11","gaming",7000,"Rig Titán (Doble RTX 4090)",6999,IMG.gaming_ultra,
    "Sistema doble RTX 4090 NVLink para gaming 8K y streaming 4K simultáneo. El Titán absoluto.",
    "Dos RTX 4090 para 48GB VRAM. Juega en 8K en algunos títulos mientras transmites en 4K.",
    "New",{cpu:"Intel Core i9-14900KS",gpu:"2× NVIDIA RTX 4090 24GB NVLink",ram:"128GB DDR5 7200MHz",storage:"16TB NVMe"},
    "Enthusiast",["Gaming","Streaming","Editing"],[["Custom Build",6999]],["Editor Choice"],8.8,10,["#0d0d0d","#1a1a1a"]),

  _make("g12","gaming",8000,"ASUS ROG Hyperion Build Premium",7999,IMG.gaming_rgb,
    "Build gaming ASUS ROG flagship completo con refrigeración personalizada en caja Hyperion GX601.",
    "Calidad y garantía ASUS ROG de fábrica + todo premium. El santuario gaming definitivo.",
    "New",{cpu:"AMD Ryzen 9 7950X3D",gpu:"NVIDIA RTX 4090 ROG STRIX 24GB",ram:"128GB DDR5 6000MHz",storage:"16TB NVMe + SSD RAID"},
    "Enthusiast",["Gaming","Streaming","Editing"],[["ASUS Store",7999]],["Editor Choice"],9.1,10,["#1a0a0a","#2d0000"]),

  _make("g13","gaming",10000,"Maingear F131 Edición Ultimate",9999,IMG.gaming_ultra,
    "El PC gaming de consumo más exclusivo. Cada componente es lo absoluto mejor disponible.",
    "Cuando el rendimiento lo es todo y el dinero es secundario, Maingear entrega lo imposible.",
    "New",{cpu:"Intel i9-14900KS (Custom OC 6.5GHz)",gpu:"NVIDIA RTX 4090 (Custom OC)",ram:"192GB DDR5 8000MHz",storage:"32TB Custom NVMe Array"},
    "Enthusiast",["Gaming","Streaming","Editing"],[["Maingear",9999]],["Editor Choice"],9.5,10,["#120012","#240024"]),
];

// Budget lists per category — only show budgets that have products
const LAPTOP_BUDGETS = [100,200,300,500,800,1000,1500,2000,5000];
const PC_BUDGETS = [100,200,300,500,800,1000,1500,2000,5000,7000,8000];
const GAMING_BUDGETS = [100,200,300,500,800,1000,1500,2000,5000,7000,8000,10000];

const getBudgets = cat => cat === "laptop" ? LAPTOP_BUDGETS : cat === "pc" ? PC_BUDGETS : GAMING_BUDGETS;

const T = {
  en: {
    tagline: "Best Performance Per Euro", sub: "Find your perfect build within any budget. Real recommendations, real value.",
    chooseCat: "Choose Your Category", laptops: "Budget Laptops", pcs: "Desktop PCs", gaming: "Gaming PCs",
    selectBudget: "Select Your Budget", recs: "Top Picks", search: "Search devices...",
    favorites: "Saved", compare: "Compare", aiRec: "AI Advisor",
    new_: "New", used_: "Used", refurb: "Refurbished",
    bestDeal: "Best Deal", editorChoice: "Editor's Choice",
    value: "Value Score", perf: "Performance",
    specs: "Tech Specs", useCases: "Best For",
    buy: "Buy Now", watchReview: "Watch Review", save: "Save", addCompare: "Compare",
    whyGood: "Why it's great value", cond: "Condition",
    noResults: "No devices found for this filter",
    back: "Back", all: "All", gaming_: "Gaming", school_: "School",
    editing_: "Editing", streaming_: "Streaming", office_: "Office",
    entry: "Entry", mid: "Mid-Range", high: "High-End", enth: "Enthusiast",
    sv: "Best Value", sp: "Top Performance", splo: "Price ↑", sphi: "Price ↓",
    cmpTitle: "Compare Devices", cpu: "CPU", gpu: "GPU", ram: "RAM", storage: "Storage",
    askAI: "AI Recommendation",
    aiPH: "Tell me your needs… e.g. 'I need a laptop for video editing under 1500€'",
    aiLoad: "Analyzing your needs…", aiSend: "Get Recommendation",
    savedFavs: "Saved Builds", noFavs: "No saved builds yet. Click the ♥ icon on any device.",
    clearAll: "Clear All", rm: "Remove", cmpEmpty: "Add devices to compare (max 3)",
    sortBy: "Sort by", filterBy: "Filter", condition: "Condition", useCase: "Use Case",
    lang: "ES Español", resetFilters: "Reset Filters",
    catDesc: {
      laptop: "Portable, lightweight, and power-efficient laptops for every need.",
      pc: "Powerful desktop PCs for work, school, and creative use.",
      gaming: "High-performance rigs built for the ultimate gaming experience."
    }
  },
  es: {
    tagline: "El Mejor Rendimiento Por Euro", sub: "Encuentra tu build perfecto dentro de cualquier presupuesto. Recomendaciones reales, valor real.",
    chooseCat: "Elige tu Categoría", laptops: "Portátiles Económicos", pcs: "PCs de Escritorio", gaming: "PCs Gaming",
    selectBudget: "Selecciona tu Presupuesto", recs: "Mejores Opciones", search: "Buscar dispositivos...",
    favorites: "Guardados", compare: "Comparar", aiRec: "Asesor IA",
    new_: "Nuevo", used_: "Usado", refurb: "Reacondicionado",
    bestDeal: "Mejor Oferta", editorChoice: "Elección del Editor",
    value: "Puntuación Valor", perf: "Rendimiento",
    specs: "Especificaciones", useCases: "Mejor Para",
    buy: "Comprar Ahora", watchReview: "Ver Review", save: "Guardar", addCompare: "Comparar",
    whyGood: "Por qué es gran valor", cond: "Estado",
    noResults: "No se encontraron dispositivos para este filtro",
    back: "Volver", all: "Todos", gaming_: "Gaming", school_: "Estudios",
    editing_: "Edición", streaming_: "Streaming", office_: "Oficina",
    entry: "Básico", mid: "Gama Media", high: "Gama Alta", enth: "Entusiasta",
    sv: "Mejor Valor", sp: "Máx. Rendimiento", splo: "Precio ↑", sphi: "Precio ↓",
    cmpTitle: "Comparar Dispositivos", cpu: "CPU", gpu: "GPU", ram: "RAM", storage: "Almacenamiento",
    askAI: "Recomendación IA",
    aiPH: "Cuéntame tus necesidades… ej: 'Necesito un portátil para edición de vídeo por menos de 1500€'",
    aiLoad: "Analizando tus necesidades…", aiSend: "Obtener Recomendación",
    savedFavs: "Builds Guardados", noFavs: "Sin builds guardados. Haz clic en el ♥ de cualquier dispositivo.",
    clearAll: "Borrar Todo", rm: "Quitar", cmpEmpty: "Añade dispositivos para comparar (máx 3)",
    sortBy: "Ordenar por", filterBy: "Filtrar", condition: "Estado", useCase: "Uso",
    lang: "EN English", resetFilters: "Resetear Filtros",
    catDesc: {
      laptop: "Portátiles ligeros y eficientes energéticamente para cada necesidad.",
      pc: "PCs de escritorio potentes para trabajo, estudios y uso creativo.",
      gaming: "Equipos de alto rendimiento para la experiencia gaming definitiva."
    }
  }
};

function PerformanceBar({ score, label, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth((score / 10) * 100), 200); return () => clearTimeout(t); }, [score]);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'Rajdhani',sans-serif", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 11, color: color || "#00e5ff", fontFamily: "'Orbitron',monospace", fontWeight: 700 }}>{score.toFixed(1)}</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
        <div className="perf-fill" style={{ width: `${width}%`, background: `linear-gradient(90deg,${color || "#00e5ff"},${color || "#0080ff"})`, boxShadow: `0 0 8px ${color || "#00e5ff"}66` }} />
      </div>
    </div>
  );
}

function CondBadge({ condition, t }) {
  const map = {
    New: { bg: "#00ff8822", border: "#00ff8866", color: "#00ff88", label: t.new_ },
    Used: { bg: "#f59e0b22", border: "#f59e0b66", color: "#f59e0b", label: t.used_ },
    Refurbished: { bg: "#a78bfa22", border: "#a78bfa66", color: "#a78bfa", label: t.refurb }
  };
  const s = map[condition] || map.Used;
  return <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontFamily: "'Orbitron',monospace", fontWeight: 600, letterSpacing: .5 }}>{s.label}</span>;
}

function UseCaseTag({ uc, t }) {
  const map = { Gaming: { c: "#ff4757", label: t.gaming_ }, School: { c: "#2ed573", label: t.school_ }, Editing: { c: "#ffa502", label: t.editing_ }, Streaming: { c: "#a78bfa", label: t.streaming_ }, Office: { c: "#00e5ff", label: t.office_ } };
  const s = map[uc] || { c: "#6b7280", label: uc };
  return <span style={{ background: `${s.c}18`, border: `1px solid ${s.c}44`, color: s.c, borderRadius: 20, padding: "2px 9px", fontSize: 10, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>{s.label}</span>;
}

// Reliable image component with category-specific fallback icons
function DeviceImage({ product }) {
  const [status, setStatus] = useState("loading"); // loading | loaded | error
  const Icon = product.category === "laptop" ? Laptop : product.category === "gaming" ? Gamepad2 : Monitor;
  const [c1, c2] = product.colors;

  return (
    <div style={{ width: "100%", height: 180, overflow: "hidden", borderRadius: "12px 12px 0 0", position: "relative", background: `linear-gradient(135deg,${c1}cc,${c2}cc)` }}>
      {/* Gradient icon fallback — always rendered behind */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={64} color="rgba(255,255,255,0.2)" strokeWidth={1} />
      </div>

      {/* Shimmer while loading */}
      {status === "loading" && (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.04) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
      )}

      {/* Actual image */}
      {status !== "error" && (
        <img
          src={product.img}
          alt={product.name}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: status === "loaded" ? 0.85 : 0,
            transition: "opacity .5s ease",
          }}
        />
      )}

      {/* Subtle gradient overlay so text/badges are readable */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(transparent,rgba(0,0,0,0.5))", pointerEvents: "none" }} />
    </div>
  );
}

function YTModal({ product, onClose }) {
  return (
    <div className="anim-fade" onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="anim-up" onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 700, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#0e0e1c" }}>
        <div style={{ background: "#0e0e1c", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 12, color: "#00e5ff", marginBottom: 2 }}>YouTube Review</div>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, color: "#94a3b8" }}>{product.name}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href={product.youtubeSearch} target="_blank" rel="noopener noreferrer"
              style={{ background: "rgba(255,0,0,0.12)", border: "1px solid rgba(255,0,0,0.3)", color: "#ff4444", borderRadius: 8, padding: "6px 14px", textDecoration: "none", fontSize: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
              <Youtube size={13} /> Abrir YouTube
            </a>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8" }}><X size={15} /></button>
          </div>
        </div>
        <div style={{ padding: "24px", background: "rgba(255,0,0,0.04)", borderTop: "1px solid rgba(255,0,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,0,0,0.12)", border: "2px solid rgba(255,68,68,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Youtube size={28} color="#ff4444" />
          </div>
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 14, color: "#e0e8ff", marginBottom: 8 }}>Reviews de "{product.name}"</div>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, color: "#6b7280", lineHeight: 1.6, maxWidth: 400 }}>
              Encuentra los últimos benchmarks, unboxings y reviews honestas de los mejores YouTubers de tecnología.
            </div>
          </div>
          <a href={product.youtubeSearch} target="_blank" rel="noopener noreferrer"
            style={{ background: "linear-gradient(135deg,#ff4444,#cc0000)", color: "#fff", borderRadius: 10, padding: "12px 28px", textDecoration: "none", fontSize: 14, fontFamily: "'Orbitron',monospace", fontWeight: 700, letterSpacing: .5, display: "flex", alignItems: "center", gap: 8 }}>
            <Play size={15} fill="#fff" /> Buscar Reviews en YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, t, favorites, onFav, compareList, onCompare, delay = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const [showYT, setShowYT] = useState(false);
  const isFav = favorites.includes(product.id);
  const inCompare = compareList.includes(product.id);
  const canCompare = compareList.length < 3 || inCompare;
  const lvl = t[levelKey(product.performanceLevel)];

  return (
    <>
      <div className="card-hover anim-up glass-card" style={{ borderRadius: 14, overflow: "hidden", position: "relative", animationDelay: `${delay}ms`, display: "flex", flexDirection: "column" }}>
        <div className="scan-line" />
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 5, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {product.badges.includes("Best Deal") && <span style={{ background: "linear-gradient(135deg,#ff6b35,#f7931e)", borderRadius: 20, padding: "3px 10px", fontSize: 10, fontFamily: "'Orbitron',monospace", fontWeight: 700, letterSpacing: .5, color: "#fff" }}>🔥 {t.bestDeal}</span>}
          {product.badges.includes("Editor Choice") && <span style={{ background: "linear-gradient(135deg,#ffd700,#ffa500)", borderRadius: 20, padding: "3px 10px", fontSize: 10, fontFamily: "'Orbitron',monospace", fontWeight: 700, letterSpacing: .5, color: "#000" }}>⭐ {t.editorChoice}</span>}
        </div>
        <button onClick={() => onFav(product.id)} style={{ position: "absolute", top: 12, right: 12, zIndex: 5, background: isFav ? "#ff445544" : "rgba(0,0,0,0.5)", border: `1px solid ${isFav ? "#ff4455" : "rgba(255,255,255,0.15)"}`, borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}>
          <Heart size={16} fill={isFav ? "#ff4455" : "none"} color={isFav ? "#ff4455" : "#94a3b8"} />
        </button>

        <DeviceImage product={product} />

        <div style={{ padding: "18px 18px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
            <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, fontWeight: 700, color: "#e0e8ff", lineHeight: 1.3, flex: 1, paddingRight: 8 }}>{product.name}</h3>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 18, fontWeight: 800, color: "#00e5ff" }}>{fmtPrice(product.price)}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            <CondBadge condition={product.condition} t={t} />
            <span style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>{lvl}</span>
          </div>

          <p style={{ fontSize: 13, color: "#8892aa", lineHeight: 1.5, marginBottom: 10, fontFamily: "'Rajdhani',sans-serif" }}>{product.description}</p>

          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
            {product.useCases.map(uc => <UseCaseTag key={uc} uc={uc} t={t} />)}
          </div>

          <PerformanceBar score={product.valueScore} label={t.value} color="#00e5ff" />
          <PerformanceBar score={product.performanceScore} label={t.perf} color={perfColor(product.performanceScore)} />

          <button onClick={() => setExpanded(!expanded)}
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 8, padding: "8px 12px", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, marginBottom: 8, transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,0.06)"; e.currentTarget.style.borderColor = "rgba(0,229,255,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
            <span>{t.specs}</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {expanded && (
            <div className="anim-fade" style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "12px", marginBottom: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
              {[["cpu", t.cpu, Cpu], ["gpu", t.gpu, Zap], ["ram", t.ram, BarChart3], ["storage", t.storage, HardDrive]].map(([k, label, Icon]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Icon size={12} color="#00e5ff" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "'Rajdhani',sans-serif", minWidth: 80 }}>{label}</span>
                  <span style={{ fontSize: 12, color: "#c0cce0", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>{product.specs[k]}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <TrendingUp size={12} color="#00ff88" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: 11, color: "#7ab8a0", fontFamily: "'Rajdhani',sans-serif", lineHeight: 1.5 }}>{product.whyGoodValue}</p>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
            {product.purchaseLinks.slice(0, 2).map((pl, i) => (
              <a key={i} href={pl.url} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, minWidth: 80, background: i === 0 ? "linear-gradient(135deg,#00e5ff,#0080ff)" : "rgba(255,255,255,0.05)", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)", color: i === 0 ? "#000" : "#94a3b8", borderRadius: 8, padding: "9px 10px", textAlign: "center", textDecoration: "none", fontSize: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, transition: "all .2s" }}
                onMouseEnter={e => { if (i !== 0) { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#e0e8ff"; } else { e.currentTarget.style.filter = "brightness(1.12)"; } }}
                onMouseLeave={e => { if (i !== 0) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#94a3b8"; } else { e.currentTarget.style.filter = "brightness(1)"; } }}>
                <ExternalLink size={11} />{i === 0 ? t.buy : pl.store}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <button onClick={() => setShowYT(true)} className="yt-btn"
              style={{ flex: 1, background: "rgba(255,0,0,0.08)", border: "1px solid rgba(255,0,0,0.2)", color: "#ff4444", borderRadius: 8, padding: "8px", textAlign: "center", fontSize: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "all .2s", cursor: "pointer" }}>
              <Youtube size={13} />{t.watchReview}
            </button>
            <button onClick={() => canCompare && onCompare(product.id)}
              style={{ flex: 1, background: inCompare ? "rgba(0,229,255,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${inCompare ? "rgba(0,229,255,0.4)" : "rgba(255,255,255,0.09)"}`, color: inCompare ? "#00e5ff" : "#94a3b8", borderRadius: 8, padding: "8px", fontSize: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, cursor: canCompare ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "all .2s", opacity: !canCompare && !inCompare ? .5 : 1 }}>
              <GitCompare size={13} />{inCompare ? <Check size={13} /> : null}{t.addCompare}
            </button>
          </div>
        </div>
      </div>
      {showYT && <YTModal product={product} onClose={() => setShowYT(false)} />}
    </>
  );
}

function CompareModal({ ids, products, onClose, onRemove, t }) {
  const devs = ids.map(id => products.find(p => p.id === id)).filter(Boolean);
  const fields = [["cpu", t.cpu], ["gpu", t.gpu], ["ram", t.ram], ["storage", t.storage]];
  return (
    <div className="anim-fade" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="glass-card anim-up" style={{ borderRadius: 16, padding: 24, maxWidth: 900, width: "100%", maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 18, color: "#e0e8ff" }}>{t.cmpTitle}</h2>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8" }}><X size={16} /></button>
        </div>
        {devs.length === 0 ? <p style={{ textAlign: "center", color: "#6b7280", padding: "40px 0" }}>{t.cmpEmpty}</p> : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px 12px", width: 120 }} />
                  {devs.map(d => (
                    <th key={d.id} style={{ padding: "0 12px 16px", textAlign: "center" }}>
                      <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                        <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, color: "#00e5ff", marginBottom: 4 }}>{d.name}</div>
                        <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 16, color: "#e0e8ff", fontWeight: 800 }}>{fmtPrice(d.price)}</div>
                        <button onClick={() => onRemove(d.id)} style={{ position: "absolute", top: -4, right: -8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6b7280" }}><X size={10} /></button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[["Value Score", d => d.valueScore.toFixed(1), "#00e5ff"], ["Rendimiento", d => d.performanceScore.toFixed(1), "#a78bfa"]].map(([lbl, fn, c]) => (
                  <tr key={lbl}>
                    <td style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", color: "#6b7280", fontSize: 12, fontFamily: "'Rajdhani',sans-serif" }}>{lbl}</td>
                    {devs.map(d => (
                      <td key={d.id + lbl} style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                        <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 14, color: c, fontWeight: 700 }}>{fn(d)}</span>
                      </td>
                    ))}
                  </tr>
                ))}
                {fields.map(([k, label]) => (
                  <tr key={k}>
                    <td style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", color: "#6b7280", fontSize: 12, fontFamily: "'Rajdhani',sans-serif" }}>{label}</td>
                    {devs.map(d => (
                      <td key={d.id + k} style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                        <span style={{ fontSize: 12, color: "#c0cce0", fontFamily: "'Rajdhani',sans-serif" }}>{d.specs[k]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr key="cond">
                  <td style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", color: "#6b7280", fontSize: 12, fontFamily: "'Rajdhani',sans-serif" }}>{t.cond}</td>
                  {devs.map(d => (
                    <td key={d.id + "cond"} style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                      <CondBadge condition={d.condition} t={t} />
                    </td>
                  ))}
                </tr>
                <tr key="links">
                  <td style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", color: "#6b7280", fontSize: 12, fontFamily: "'Rajdhani',sans-serif" }}>Comprar</td>
                  {devs.map(d => (
                    <td key={d.id + "links"} style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                      <a href={d.purchaseLinks[0].url} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "linear-gradient(135deg,#00e5ff,#0080ff)", color: "#000", borderRadius: 6, padding: "5px 12px", textDecoration: "none", fontSize: 11, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700 }}>
                        <ExternalLink size={10} /> {t.buy}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function AIPanel({ t, lang, onClose }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true); setResponse(""); setErr("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `Eres CoreGuide AI, un experto asesor de hardware PC especializado en recomendaciones de valor para el mercado europeo (España). 
Ayuda a los usuarios a encontrar los mejores portátiles, PCs de escritorio y PCs gaming por el dinero.
Estructura las respuestas claramente con: 🏆 Mejor Opción, ⚙️ Especificaciones clave a buscar, 💰 Rango de Precio, 🛒 Dónde Comprar (Amazon.es, PCComponentes, MediaMarkt, BackMarket).
Sé conciso (menos de 280 palabras), entusiasta y honesto sobre las concesiones.
${lang === "es" ? "Responde en español." : "Respond in English."}`,
          messages: [{ role: "user", content: query }]
        })
      });
      const data = await res.json();
      if (data.content?.[0]) setResponse(data.content[0].text);
      else setErr("Sin respuesta. Por favor inténtalo de nuevo.");
    } catch (e) { setErr("Error de conexión. Por favor inténtalo de nuevo."); }
    finally { setLoading(false); }
  };

  const quickPrompts = lang === "es"
    ? ["Portátil para edición de vídeo por menos de 800€", "PC gaming por menos de 500€", "Portátil de estudiante por menos de 300€"]
    : ["Laptop for video editing under 800€", "Gaming PC under 500€", "Student laptop under 300€"];

  return (
    <div className="anim-fade" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="glass-card anim-up" style={{ borderRadius: 16, padding: 28, maxWidth: 600, width: "100%", maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#00e5ff22,#0080ff22)", border: "1px solid #00e5ff44", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={18} color="#00e5ff" />
            </div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 16, color: "#e0e8ff" }}>{t.askAI}</h2>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8" }}><X size={16} /></button>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {quickPrompts.map(prompt => (
            <button key={prompt} onClick={() => setQuery(prompt)}
              style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.15)", color: "#94a3b8", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#00e5ff"; e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(0,229,255,0.15)"; }}>
              {prompt}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", marginBottom: 14 }}>
          <textarea value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) handleAsk(); }}
            placeholder={t.aiPH} rows={3}
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 16px", color: "#e0e8ff", fontSize: 14, fontFamily: "'Rajdhani',sans-serif", resize: "vertical", lineHeight: 1.6 }}
            onFocus={e => e.target.style.borderColor = "rgba(0,229,255,0.4)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
        </div>

        <button onClick={handleAsk} disabled={loading || !query.trim()}
          style={{ width: "100%", background: "linear-gradient(135deg,#00e5ff,#0080ff)", color: "#000", borderRadius: 10, padding: "13px", fontSize: 14, fontFamily: "'Orbitron',monospace", fontWeight: 700, cursor: loading || !query.trim() ? "not-allowed" : "pointer", opacity: loading || !query.trim() ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: .5, border: "none", marginBottom: 16 }}>
          {loading ? <span className="anim-fade">{t.aiLoad}</span> : <><Send size={14} />{t.aiSend}</>}
        </button>

        {err && <div style={{ background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.2)", borderRadius: 8, padding: "12px 16px", color: "#ff8888", fontSize: 13, marginBottom: 12 }}>{err}</div>}

        {response && (
          <div className="anim-up" style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <Bot size={14} color="#00e5ff" />
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, color: "#00e5ff", fontWeight: 600 }}>CoreGuide AI</span>
            </div>
            <p style={{ fontSize: 14, color: "#c0d0e8", lineHeight: 1.75, fontFamily: "'Rajdhani',sans-serif", whiteSpace: "pre-wrap" }}>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FavPanel({ ids, products, onRemove, onClear, t, onClose }) {
  const devs = ids.map(id => products.find(p => p.id === id)).filter(Boolean);
  return (
    <div className="anim-fade" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div className="glass-card anim-up" style={{ borderRadius: 16, padding: 24, maxWidth: 560, width: "100%", maxHeight: "85vh", overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Heart size={18} color="#ff4455" fill="#ff4455" />
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 16, color: "#e0e8ff" }}>{t.savedFavs}</h2>
            <span style={{ background: "rgba(255,68,85,0.15)", color: "#ff4455", borderRadius: 20, padding: "2px 8px", fontSize: 12, fontFamily: "'Orbitron',monospace", fontWeight: 700 }}>{devs.length}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {devs.length > 0 && <button onClick={onClear} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 12px", color: "#6b7280", cursor: "pointer", fontSize: 12, fontFamily: "'Rajdhani',sans-serif", display: "flex", alignItems: "center", gap: 5 }}><Trash2 size={12} />{t.clearAll}</button>}
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8" }}><X size={15} /></button>
          </div>
        </div>
        {devs.length === 0 ? <p style={{ textAlign: "center", color: "#6b7280", padding: "40px 0", fontFamily: "'Rajdhani',sans-serif", fontSize: 14 }}>{t.noFavs}</p> :
          devs.map(d => {
            const Icon = d.category === "laptop" ? Laptop : d.category === "gaming" ? Gamepad2 : Monitor;
            return (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: 10, marginBottom: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 56, height: 44, borderRadius: 8, background: `linear-gradient(135deg,${d.colors[0]},${d.colors[1]})`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color="rgba(255,255,255,0.5)" strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, color: "#e0e8ff", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.name}</div>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 14, color: "#00e5ff", fontWeight: 800, marginTop: 2 }}>{fmtPrice(d.price)}</div>
                </div>
                <a href={d.purchaseLinks[0].url} target="_blank" rel="noopener noreferrer"
                  style={{ background: "linear-gradient(135deg,#00e5ff,#0080ff)", color: "#000", borderRadius: 7, padding: "5px 12px", textDecoration: "none", fontSize: 11, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                  <ExternalLink size={10} /> {t.buy}
                </a>
                <button onClick={() => onRemove(d.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}><X size={14} /></button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default function CoreGuide() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [lang, setLang] = useState("es");
  const [category, setCategory] = useState(null);
  const [budget, setBudget] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [sortBy, setSortBy] = useState("value");
  const [filterCond, setFilterCond] = useState("all");
  const [filterUC, setFilterUC] = useState("all");
  const [showCompare, setShowCompare] = useState(false);
  const [showFavs, setShowFavs] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const t = T[lang];

  const displayProducts = useMemo(() => {
    if (!category || !budget) return [];
    let f = PRODUCTS.filter(p => p.category === category && p.budget === budget);
    if (searchQ) f = f.filter(p =>
      p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
      p.specs.cpu.toLowerCase().includes(searchQ.toLowerCase()) ||
      p.specs.gpu.toLowerCase().includes(searchQ.toLowerCase())
    );
    if (filterCond !== "all") f = f.filter(p => p.condition === filterCond);
    if (filterUC !== "all") f = f.filter(p => p.useCases.includes(filterUC));
    f.sort((a, b) => {
      if (sortBy === "value") return b.valueScore - a.valueScore;
      if (sortBy === "performance") return b.performanceScore - a.performanceScore;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });
    return f;
  }, [category, budget, searchQ, filterCond, filterUC, sortBy]);

  const toggleFav = id => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const toggleCompare = id => setCompareList(f => f.includes(id) ? f.filter(x => x !== id) : f.length < 3 ? [...f, id] : f);

  const catIcons = { laptop: <Laptop size={36} strokeWidth={1.5} />, pc: <Monitor size={36} strokeWidth={1.5} />, gaming: <Gamepad2 size={36} strokeWidth={1.5} /> };
  const catColors = { laptop: ["#00e5ff", "#0080ff"], pc: ["#a78bfa", "#7c3aed"], gaming: ["#ff4757", "#ff6b81"] };
  const catBg = {
    laptop: "radial-gradient(circle at 30% 50%,rgba(0,229,255,0.12),transparent 70%)",
    pc: "radial-gradient(circle at 30% 50%,rgba(167,139,250,0.12),transparent 70%)",
    gaming: "radial-gradient(circle at 30% 50%,rgba(255,71,87,0.12),transparent 70%)"
  };

  const selectStyle = {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, padding: "10px 14px", color: "#94a3b8", fontSize: 13, cursor: "pointer"
  };

  const budgets = category ? getBudgets(category) : [];

  return (
    <div style={{ minHeight: "100vh", background: "#080810" }}>

      {/* NAVBAR */}
      <nav className="glass-dark" style={{ position: "sticky", top: 0, zIndex: 200, padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "none", borderLeft: "none", borderRight: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => { setCategory(null); setBudget(null); }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00e5ff,#0080ff)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Zap size={18} color="#000" fill="#000" />
          </div>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 18, fontWeight: 800, color: "#e0e8ff", letterSpacing: 1 }}>CORE<span style={{ color: "#00e5ff" }}>GUIDE</span></span>
        </div>

        <div className="hide-mob" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {[
            { icon: <Bot size={14} />, label: t.aiRec, onClick: () => setShowAI(true), color: "#00e5ff", bg: "rgba(0,229,255,0.08)", border: "rgba(0,229,255,0.2)", count: 0 },
            { icon: <Heart size={14} fill={favorites.length > 0 ? "#ff4455" : "none"} />, label: t.favorites, onClick: () => setShowFavs(true), color: "#ff4455", bg: "rgba(255,68,85,0.08)", border: "rgba(255,68,85,0.2)", count: favorites.length },
            { icon: <GitCompare size={14} />, label: t.compare, onClick: () => setShowCompare(true), color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)", count: compareList.length },
          ].map((btn, i) => (
            <button key={i} onClick={btn.onClick}
              style={{ background: btn.bg, border: `1px solid ${btn.border}`, color: btn.color, borderRadius: 8, padding: "7px 14px", fontSize: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              {btn.icon}{btn.label}
              {btn.count > 0 && <span style={{ background: btn.color, color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontFamily: "'Orbitron',monospace", fontWeight: 700 }}>{btn.count}</span>}
            </button>
          ))}
          <button onClick={() => setLang(l => l === "en" ? "es" : "en")}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Globe size={14} />{t.lang}
          </button>
        </div>

        <button className="show-mob" onClick={() => setMobileMenu(!mobileMenu)}
          style={{ background: mobileMenu ? "rgba(0,229,255,0.08)" : "none", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", cursor: "pointer", padding: "8px", borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
          {mobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileMenu && (
        <div className="glass-dark anim-fade show-mob" style={{ position: "sticky", top: 64, zIndex: 199, padding: 16, flexDirection: "column", gap: 8 }}>
          {[
            { icon: <Bot size={14} />, label: t.aiRec, onClick: () => { setShowAI(true); setMobileMenu(false); }, color: "#00e5ff" },
            { icon: <Heart size={14} fill={favorites.length > 0 ? "#ff4455" : "none"} />, label: `${t.favorites} (${favorites.length})`, onClick: () => { setShowFavs(true); setMobileMenu(false); }, color: "#ff4455" },
            { icon: <GitCompare size={14} />, label: `${t.compare} (${compareList.length})`, onClick: () => { setShowCompare(true); setMobileMenu(false); }, color: "#a78bfa" },
            { icon: <Globe size={14} />, label: t.lang, onClick: () => { setLang(l => l === "en" ? "es" : "en"); setMobileMenu(false); }, color: "#94a3b8" },
          ].map((btn, i) => (
            <button key={i} onClick={btn.onClick}
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: btn.color, borderRadius: 8, padding: "12px 16px", fontSize: 14, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              {btn.icon}{btn.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      {!category && (
        <section className="hero-bg grid-bg" style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle,rgba(0,229,255,0.04),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 20, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,229,255,0.3),transparent)" }} />

          <div className="anim-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 30, padding: "6px 18px", marginBottom: 24 }}>
            <Star size={12} color="#00e5ff" fill="#00e5ff" />
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, color: "#00e5ff", letterSpacing: 1 }}>COREGUIDE — ASESOR PC</span>
          </div>

          <h1 className="anim-up" style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(26px,5vw,54px)", fontWeight: 900, color: "#e0e8ff", lineHeight: 1.15, marginBottom: 16, animationDelay: "60ms" }}>
            {t.tagline.split(" ").map((w, i) =>
              (w === "Euro" || w === "Euro") ? <span key={i} className="text-cyan"> {w} </span> : <span key={i}> {w}</span>
            )}
          </h1>

          <p className="anim-up" style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(14px,2vw,18px)", color: "#6b7280", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.6, animationDelay: "120ms" }}>{t.sub}</p>

          <div className="anim-up" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animationDelay: "180ms" }}>
            {[{ icon: <Zap size={14} />, label: "IA Integrada" }, { icon: <Shield size={14} />, label: "Selección Curada" }, { icon: <TrendingUp size={14} />, label: "Valor Real" }].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 16px" }}>
                <span style={{ color: "#00e5ff" }}>{b.icon}</span>
                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px 80px" }}>

        {/* CATEGORY SELECTOR */}
        {!category && (
          <section style={{ padding: "40px 0" }}>
            <h2 className="anim-up" style={{ fontFamily: "'Orbitron',monospace", fontSize: 22, color: "#e0e8ff", textAlign: "center", marginBottom: 8 }}>{t.chooseCat}</h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#00e5ff,#0080ff)", borderRadius: 2, margin: "0 auto 32px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
              {[{ id: "laptop", name: t.laptops }, { id: "pc", name: t.pcs }, { id: "gaming", name: t.gaming }].map((cat, i) => {
                const [c1, c2] = catColors[cat.id];
                return (
                  <div key={cat.id} className="cat-card glass-card anim-up"
                    onClick={() => { setCategory(cat.id); setBudget(null); setSearchQ(""); setFilterCond("all"); setFilterUC("all"); }}
                    style={{ padding: "36px 28px", textAlign: "center", borderRadius: 16, animationDelay: `${i * 80}ms`, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: catBg[cat.id], pointerEvents: "none" }} />
                    <div className="cat-icon" style={{ width: 72, height: 72, borderRadius: 20, background: `linear-gradient(135deg,${c1}22,${c2}22)`, border: `1px solid ${c1}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: c1, boxShadow: `0 0 24px ${c1}22` }}>
                      {catIcons[cat.id]}
                    </div>
                    <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 15, fontWeight: 700, color: "#e0e8ff", marginBottom: 10 }}>{cat.name}</h3>
                    <p style={{ fontSize: 13, color: "#6b7280", fontFamily: "'Rajdhani',sans-serif", lineHeight: 1.5 }}>{t.catDesc[cat.id]}</p>
                    <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, color: c1, fontSize: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>
                      {t.selectBudget} <span style={{ fontSize: 14 }}>→</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="anim-up glass-card" style={{ marginTop: 24, borderRadius: 16, padding: "24px", background: "rgba(0,229,255,0.03)", border: "1px solid rgba(0,229,255,0.12)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", cursor: "pointer", animationDelay: "300ms" }} onClick={() => setShowAI(true)}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#00e5ff22,#0080ff22)", border: "1px solid #00e5ff33", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={24} color="#00e5ff" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, color: "#00e5ff", marginBottom: 5 }}>{t.askAI}</h3>
                <p style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{t.aiPH}</p>
              </div>
              <div style={{ color: "#00e5ff", fontSize: 22, fontWeight: 300 }}>→</div>
            </div>
          </section>
        )}

        {/* BUDGET SELECTOR */}
        {category && (
          <section style={{ padding: "32px 0 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <button onClick={() => { setCategory(null); setBudget(null); }}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 14px", color: "#94a3b8", cursor: "pointer", fontSize: 13, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                <ArrowLeft size={14} />{t.back}
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ color: catColors[category][0] }}>{catIcons[category]}</div>
                <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: 20, color: "#e0e8ff" }}>
                  {category === "laptop" ? t.laptops : category === "pc" ? t.pcs : t.gaming}
                </h2>
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 14, color: "#6b7280", marginBottom: 14, letterSpacing: .5 }}>{t.selectBudget}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {budgets.map(b => {
                  const isActive = budget === b;
                  const [c1, c2] = catColors[category];
                  return (
                    <button key={b} className="budget-btn"
                      onClick={() => setBudget(b)}
                      style={{ background: isActive ? `linear-gradient(135deg,${c1},${c2})` : "rgba(255,255,255,0.04)", border: `1px solid ${isActive ? c1 : "rgba(255,255,255,0.09)"}`, color: isActive ? "#000" : "#94a3b8", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontFamily: "'Orbitron',monospace", fontWeight: isActive ? 700 : 500, cursor: "pointer", letterSpacing: .3 }}>
                      {fmtPrice(b)}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* PRODUCTS GRID */}
        {category && budget && (
          <section>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: "1 1 200px", position: "relative" }}>
                <Search size={15} color="#6b7280" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: 14 }} />
                <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder={t.search}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px 10px 40px", color: "#e0e8ff", fontSize: 13 }}
                  onFocus={e => e.target.style.borderColor = "rgba(0,229,255,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
              <select value={filterCond} onChange={e => setFilterCond(e.target.value)} style={selectStyle}>
                <option value="all">{t.all} {t.condition}</option>
                <option value="New">{t.new_}</option>
                <option value="Used">{t.used_}</option>
                <option value="Refurbished">{t.refurb}</option>
              </select>
              <select value={filterUC} onChange={e => setFilterUC(e.target.value)} style={selectStyle}>
                <option value="all">{t.all} {t.useCase}</option>
                {["Gaming", "School", "Editing", "Streaming", "Office"].map(uc => (
                  <option key={uc} value={uc}>{t[uc.toLowerCase() + "_"] || uc}</option>
                ))}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
                <option value="value">{t.sv}</option>
                <option value="performance">{t.sp}</option>
                <option value="price-low">{t.splo}</option>
                <option value="price-high">{t.sphi}</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 16, color: "#e0e8ff" }}>
                <span className="text-cyan">{fmtPrice(budget)}</span> {t.recs}
                <span style={{ color: "#6b7280", fontSize: 12, marginLeft: 10, fontFamily: "'Rajdhani',sans-serif" }}>({displayProducts.length})</span>
              </h3>
            </div>

            {displayProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7280", fontFamily: "'Rajdhani',sans-serif", fontSize: 16 }}>
                <RotateCcw size={32} style={{ marginBottom: 12, opacity: .4 }} />
                <p>{t.noResults}</p>
                <button onClick={() => { setSearchQ(""); setFilterCond("all"); setFilterUC("all"); }}
                  style={{ marginTop: 14, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", color: "#00e5ff", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 13, fontFamily: "'Rajdhani',sans-serif" }}>
                  {t.resetFilters}
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }} className="grid-mob-1">
                {displayProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} t={t} favorites={favorites} onFav={toggleFav} compareList={compareList} onCompare={toggleCompare} delay={i * 60} />
                ))}
              </div>
            )}

            <div className="anim-up glass-card" style={{ marginTop: 32, borderRadius: 14, padding: "20px 24px", background: "rgba(0,229,255,0.03)", border: "1px solid rgba(0,229,255,0.1)", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", flexWrap: "wrap" }} onClick={() => setShowAI(true)}>
              <Bot size={20} color="#00e5ff" />
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 12, color: "#00e5ff" }}>¿No estás seguro? </span>
                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, color: "#6b7280" }}>Deja que el asesor IA elija el dispositivo perfecto para tus necesidades exactas →</span>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#00e5ff,#0080ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={14} color="#000" fill="#000" />
          </div>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: 16, fontWeight: 800, color: "#e0e8ff" }}>CORE<span style={{ color: "#00e5ff" }}>GUIDE</span></span>
        </div>
        <p style={{ color: "#374151", fontSize: 12, fontFamily: "'Rajdhani',sans-serif" }}>El Mejor Rendimiento Por Euro · Precios aproximados · Verifica siempre antes de comprar</p>
      </footer>

      {/* MODALS */}
      {showCompare && <CompareModal ids={compareList} products={PRODUCTS} onClose={() => setShowCompare(false)} onRemove={id => setCompareList(c => c.filter(x => x !== id))} t={t} />}
      {showFavs && <FavPanel ids={favorites} products={PRODUCTS} onRemove={toggleFav} onClear={() => setFavorites([])} t={t} onClose={() => setShowFavs(false)} />}
      {showAI && <AIPanel t={t} lang={lang} onClose={() => setShowAI(false)} />}

      {/* Floating compare bar */}
      {compareList.length > 0 && !showCompare && (
        <div className="anim-up glass-dark" style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", borderRadius: 50, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, zIndex: 100, border: "1px solid rgba(167,139,250,0.3)", whiteSpace: "nowrap" }}>
          <GitCompare size={16} color="#a78bfa" />
          <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, color: "#c0cce0", fontWeight: 600 }}>{compareList.length} {t.compare}</span>
          <button onClick={() => setShowCompare(true)} style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)", color: "#fff", border: "none", borderRadius: 20, padding: "6px 16px", fontSize: 12, fontFamily: "'Orbitron',monospace", fontWeight: 700, cursor: "pointer", letterSpacing: .3 }}>{t.cmpTitle}</button>
          <button onClick={() => setCompareList([])} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: 2 }}><X size={13} /></button>
        </div>
      )}
    </div>
  );
}
