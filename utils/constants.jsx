export const FILTEROPTIONS = [
  { value: "leshArtist", label: "Lash Artists" },
  { value: "student", label: "Students" },
  { value: "partner", label: "Retail Partners" },
  { value: "educator", label: "Educators" },
];

export const allRoles = [
  "student",
  "leshArtist",
  "partner",
  "educator",
  "lightHQ",
];

export const SORTOPTIONS = [
  { value: 5, label: "Nearest" },
  { value: 10, label: "10 KM Radius" },
  { value: 20, label: "20 KM Radius" },
  { value: 50, label: "50 KM Radius" },
];

export const userTypeIcons = {
  leshArtist: "/assets/svgs/icons/map-star.svg",
  student: "/assets/svgs/icons/map-heart.svg",
  partner: "/assets/svgs/icons/map-cart.svg",
  educator: "/assets/svgs/icons/map-student.svg",
};

export const userCardIcons = {
  leshArtist: "/assets/svgs/icons/card-star.svg",
  student: "/assets/svgs/icons/card-heart.svg",
  partner: "/assets/svgs/icons/card-retail.svg",
  educator: "/assets/svgs/icons/card-educator.svg",
};

export const InitialCheckboxText = {
  student: "#2A2A2A",
  leshArtist: "#787777",
  educator: "#787777",
  partner: "#787777",
  lightHQ: "#787777",
};

export const ValueToUserTypeMap = {
  student: "student",
  leshArtist: "leshArtist",
  educator: "educator",
  partner: "partner",
};

export const Radius = 5;

export const PageLimit = 10;

export const DEFAULT_LOCATION = [33.5817771, -111.9305882]

export const isAuthPaths = ["/reset-password", "/login", "/forget-password"]