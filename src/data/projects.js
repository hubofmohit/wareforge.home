// Core feature data for the "Core Features" section + modal details.
// Pulled 1:1 from the original static site's Home.js.
const projects = [
  {
    id: 1,
    number: "01",
    title: "Dynamic Warehouses",
    category: "Warehouse Management",
    description:
      "Create multiple warehouses and define their length and breadth to match the actual physical space you use.",
    tech: ["Warehouse Management", "Dynamic Layout", "Custom Dimensions"],
    color: "#2dd9f0",
    metrics: { warehouses: "Multiple", dimensions: "Custom", layout: "Dynamic" },
    details: {
      challenge:
        "Traditional warehouse systems often rely on fixed layouts that do not adapt easily to different warehouse sizes and physical spaces.",
      solution:
        "WareForge allows users to create warehouses with custom length and breadth dimensions, giving them complete control over their warehouse layout.",
      results: [
        "Create multiple warehouses",
        "Define custom warehouse dimensions",
        "Match digital layouts with physical warehouse spaces",
        "Manage every warehouse from one application",
      ],
    },
  },
  {
    id: 2,
    number: "02",
    title: "Custom Zones",
    category: "Warehouse Organization",
    description:
      "Divide each warehouse into custom zones and manage their size, position, and information as the warehouse layout changes.",
    tech: ["Dynamic Zones", "Layout Management", "Warehouse Mapping"],
    color: "#ffb020",
    metrics: { zones: "Unlimited", editing: "Flexible", layout: "Custom" },
    details: {
      challenge:
        "Warehouse layouts change over time, making fixed zone structures difficult to maintain and update.",
      solution:
        "WareForge lets users create, rename, edit, resize, reposition, and remove zones according to their operational requirements.",
      results: [
        "Create custom zones inside warehouses",
        "Rename zones whenever required",
        "Resize and reposition zones",
        "Edit or remove existing zones",
        "Maintain a flexible warehouse layout",
      ],
    },
  },
  {
    id: 3,
    number: "03",
    title: "Inventory Management",
    category: "Inventory Management",
    description:
      "Track inventory items inside warehouse zones along with their quantities and minimum stock thresholds.",
    tech: ["Inventory Tracking", "Stock Monitoring", "Threshold Management"],
    color: "#34e0a1",
    metrics: { items: "Trackable", stock: "Real-time", threshold: "Custom" },
    details: {
      challenge:
        "Managing inventory across multiple warehouse zones can make it difficult to know what is available and which items need replenishment.",
      solution:
        "WareForge connects inventory with warehouse zones and allows users to maintain item quantities and minimum stock thresholds.",
      results: [
        "Track items by warehouse and zone",
        "Maintain item quantities",
        "Set minimum stock thresholds",
        "Identify low-stock items easily",
        "Keep inventory organized by location",
      ],
    },
  },
  {
    id: 4,
    number: "04",
    title: "Search & Table Views",
    category: "Data Management",
    description:
      "Quickly search for any item and view warehouse, zone, quantity, and stock information through structured tables.",
    tech: ["Global Search", "Data Tables", "Inventory Analytics"],
    color: "#b48cff",
    metrics: { search: "Global", views: "Table", access: "Fast" },
    details: {
      challenge:
        "Finding specific inventory across multiple warehouses and zones can become time-consuming when information is spread across different locations.",
      solution:
        "WareForge provides centralized search and structured table views so users can quickly locate and review inventory information.",
      results: [
        "Search for any inventory item",
        "View warehouse and zone information",
        "Review quantities and minimum thresholds",
        "Identify stock status quickly",
        "Access organized inventory data",
      ],
    },
  },
  {
    id: 5,
    number: "05",
    title: "Excel Data Support",
    category: "Data Import & Export",
    description:
      "Import and export warehouse and inventory information through Excel to make large-scale data management easier.",
    tech: ["Excel", "Data Import", "Data Export"],
    color: "#12b886",
    metrics: { format: "Excel", workflow: "Import / Export", data: "Scalable" },
    details: {
      challenge:
        "Manually entering large amounts of warehouse and inventory data can be inefficient and time-consuming.",
      solution:
        "WareForge supports Excel-based data workflows, allowing users to extend, update, import, and export application data.",
      results: [
        "Import warehouse and inventory data",
        "Export application data",
        "Handle large datasets more efficiently",
        "Update existing information through Excel",
        "Reduce manual data entry",
      ],
    },
  },
  {
    id: 6,
    number: "06",
    title: "Controlled Access",
    category: "User Access Management",
    description:
      "Access is granted directly, not self-signup — the admin hands out a link, then assigns each teammate an Editor or Viewer role.",
    tech: ["Role-Based Access", "Admin-Granted Links", "Permissions"],
    color: "#ff7a3d",
    metrics: { roles: "3", control: "Admin", access: "Invite-Only" },
    details: {
      challenge:
        "Warehouse information may need to be shared with different users while preventing unauthorized changes to important data.",
      solution:
        "WareForge has no public sign-up — the admin creates each access link directly and assigns it an Admin, Editor, or Viewer role.",
      results: [
        "Admin has full control and grants every link personally",
        "Editors can update zones, items, and quantities",
        "Viewers can see everything without being able to change it",
        "Access can be deactivated at any time without deleting data",
        "Protect warehouse information from unauthorized changes",
      ],
    },
  },
];

export default projects;
