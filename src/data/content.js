// Nav sections, in scroll order — drives both the Navbar links and the
// IntersectionObserver-based scroll-spy in useScrollSpy().
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "tour", label: "Tour" },
  { id: "skills", label: "Zones" },
  { id: "projects", label: "Features" },
  { id: "contact", label: "Under the Hood" },
  { id: "live-analysis", label: "Live Analysis" },
  { id: "access", label: "Get Access" },
];

export const expertiseItems = [
  {
    icon: "📐",
    title: "Dynamic Warehouse Sizing",
    desc: "Update a warehouse's length and breadth any time your floor plan changes, and existing zones adjust to fit — without losing anything already stored",
  },
  {
    icon: "🗂️",
    title: "Custom Zones",
    desc: "Draw zones inside the grid and name them the way your floor actually works — receiving, cold storage, overflow",
  },
  {
    icon: "📦",
    title: "Quantity & Minimum Stock",
    desc: "Set a required minimum per item and see immediately which zones are running low before it becomes a problem",
  },
  {
    icon: "📊",
    title: "Table View & Excel Sync",
    desc: "Switch to a sortable table of every item, then import or export the whole warehouse as an Excel file in one click",
  },
  {
    icon: "🔎",
    title: "Search & Filtering",
    desc: "Find any item by name instantly within the warehouse you're working in, or switch the Table View's scope to \"All locations\" to search and filter everything at once.",
  },
];

export const tourSteps = [
  {
    step: "Step 01",
    title: "Draw the floor plan",
    url: "wareforge.app/floor-plan",
    image: "/assets/floor-plan-designer.png",
    alt: "WareForge floor plan designer showing a warehouse grid, length and breadth inputs, and zone tools",
    description:
      "Set the length and breadth of a warehouse, then draw, resize, and reposition zones directly on the grid — receiving, cold storage, overflow, whatever your floor actually looks like.",
    reverse: false,
  },
  {
    step: "Step 02",
    title: "Track what's inside",
    url: "wareforge.app/stock-table",
    image: "/assets/stock-table.png",
    alt: "WareForge stock table showing Items, Zones, Locations and Low Stock tabs with a form to add an item",
    description:
      "Open the Stock Table to browse Items, Zones, and Locations, filter by warehouse, search for anything, and add an item with its quantity and minimum stock in seconds. The Low Stock tab flags what needs attention first.",
    reverse: true,
  },
];

export const skillCategories = [
  {
    title: "Warehouse & Zone Visibility",
    skills: [
      { name: "Receiving & Dispatch", level: 100 },
      { name: "Storage Areas", level: 100 },
      { name: "Bulk Inventory", level: 100 },
      { name: "Overflow Areas", level: 100 },
    ],
  },
  {
    title: "Inventory Control",
    skills: [
      { name: "Inventory Quantity", level: 100 },
      { name: "Minimum Stock Threshold", level: 100 },
      { name: "Item Search", level: 100 },
      { name: "Low-Stock Visibility", level: 100 },
    ],
  },
];

export const heroStats = [
  { count: 10, label: "Warehouses You Can Manage" },
  { count: 100, label: "Zones You Can Configure" },
  { count: 10000, label: "Items You Can Track" },
];

export const underTheHood = [
  {
    label: "Access",
    value: "Admin-Granted Links, No Self-Signup",
    icon: "users",
  },
  { label: "Warehouses", value: "Unlimited, Each With Its Own Layout", icon: "building" },
  { label: "Zones", value: "Draw, Resize & Reposition Freely", icon: "grid" },
  { label: "Stock", value: "Quantity + Minimum Threshold, Per Item", icon: "target" },
  { label: "Backups", value: "Automatic Daily, Plus On-Demand", icon: "box" },
  { label: "Data Sync", value: "Live Across Every Teammate's Screen", icon: "alert" },
];

// data-stat-key -> label, mirrors the six <span data-stat-key> spans
// in the original Live Analysis section.
export const liveStatFields = [
  { key: "totalVisits", label: "Total Visits", icon: "eye" },
  { key: "totalClicks", label: "CTA Clicks", icon: "cursor" },
  { key: "authorizedUsers", label: "Authorized Users", icon: "users" },
  { key: "activeWarehouses", label: "Active Warehouses", icon: "building" },
  { key: "configuredZones", label: "Configured Zones", icon: "grid" },
  { key: "trackedItems", label: "Items Tracked", icon: "target" },
];
