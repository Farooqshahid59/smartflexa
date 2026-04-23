/** Client-side fake address generation for QA / UI testing — not for fraud. */

export type FakeAddressCountry = "US" | "UK" | "IN" | "CA";

export type FakeAddress = {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  country: FakeAddressCountry;
};

function randInt(max: number): number {
  const u = new Uint32Array(1);
  crypto.getRandomValues(u);
  return u[0]! % max;
}

function pick<T>(arr: readonly T[]): T {
  return arr[randInt(arr.length)]!;
}

const US_FIRST = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
  "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Christopher", "Karen", "Daniel", "Lisa", "Matthew", "Nancy",
] as const;

const US_LAST = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
  "Taylor", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris",
] as const;

const US_STREET_NAMES = [
  "Maple", "Oak", "Cedar", "Pine", "Elm", "Birch", "Willow", "Ash", "Lakeview", "River",
  "Highland", "Park", "Sunset", "Canyon", "Meadow", "Forest", "Hill", "Valley", "Spring", "Brook",
] as const;

const US_STREET_TYPES = ["St", "Ave", "Rd", "Blvd", "Dr", "Ln", "Ct", "Way"] as const;

const US_CITIES = [
  { city: "Austin", state: "TX", zipBase: "787" },
  { city: "Denver", state: "CO", zipBase: "802" },
  { city: "Seattle", state: "WA", zipBase: "981" },
  { city: "Phoenix", state: "AZ", zipBase: "850" },
  { city: "Portland", state: "OR", zipBase: "972" },
  { city: "Nashville", state: "TN", zipBase: "372" },
  { city: "Miami", state: "FL", zipBase: "331" },
  { city: "Boston", state: "MA", zipBase: "021" },
  { city: "Atlanta", state: "GA", zipBase: "303" },
  { city: "Chicago", state: "IL", zipBase: "606" },
] as const;

const UK_FIRST = [
  "Oliver", "Harry", "George", "Noah", "Jack", "Leo", "Arthur", "Muhammad",
  "Amelia", "Olivia", "Isla", "Ava", "Emily", "Poppy", "Sophia", "Grace",
] as const;

const UK_LAST = [
  "Smith", "Jones", "Taylor", "Williams", "Brown", "Davies", "Evans", "Thomas",
  "Johnson", "Wilson", "Roberts", "Robinson", "Wright", "Thompson", "Walker", "White",
] as const;

const UK_CITIES = [
  { city: "Manchester", county: "Greater Manchester", pc: "M" },
  { city: "Leeds", county: "West Yorkshire", pc: "LS" },
  { city: "Bristol", county: "Bristol", pc: "BS" },
  { city: "Sheffield", county: "South Yorkshire", pc: "S" },
  { city: "Liverpool", county: "Merseyside", pc: "L" },
  { city: "Nottingham", county: "Nottinghamshire", pc: "NG" },
  { city: "Cardiff", county: "Cardiff", pc: "CF" },
  { city: "Edinburgh", county: "Edinburgh", pc: "EH" },
] as const;

const IN_FIRST = [
  "Aarav", "Vihaan", "Aditya", "Arjun", "Rohan", "Krishna", "Ishaan", "Reyansh",
  "Ananya", "Diya", "Saanvi", "Aadhya", "Kiara", "Pari", "Myra", "Navya",
] as const;

const IN_LAST = [
  "Sharma", "Verma", "Patel", "Reddy", "Kumar", "Singh", "Gupta", "Mehta",
  "Iyer", "Nair", "Rao", "Joshi", "Kapoor", "Malhotra", "Chopra", "Agarwal",
] as const;

const IN_STATES = [
  { state: "Maharashtra", cities: ["Pune", "Nagpur", "Thane"] },
  { state: "Karnataka", cities: ["Mysuru", "Hubli", "Mangaluru"] },
  { state: "Tamil Nadu", cities: ["Coimbatore", "Madurai", "Salem"] },
  { state: "Gujarat", cities: ["Surat", "Vadodara", "Rajkot"] },
  { state: "Telangana", cities: ["Warangal", "Nizamabad", "Karimnagar"] },
] as const;

const CA_FIRST = [
  "Liam", "Noah", "Oliver", "Ethan", "Lucas", "Benjamin", "William", "James",
  "Emma", "Olivia", "Sophia", "Isabella", "Charlotte", "Amelia", "Mia", "Ava",
] as const;

const CA_LAST = [
  "Tremblay", "Gagnon", "Roy", "Côté", "Bouchard", "Gauthier", "Morin", "Lavoie",
  "Smith", "Brown", "Wilson", "Martin", "Lee", "Taylor", "Anderson", "Thomas",
] as const;

const CA_PROVINCES = [
  { prov: "ON", cities: ["Hamilton", "London", "Kitchener"], postal: "K" },
  { prov: "BC", cities: ["Surrey", "Burnaby", "Richmond"], postal: "V" },
  { prov: "AB", cities: ["Calgary", "Edmonton", "Red Deer"], postal: "T" },
  { prov: "QC", cities: ["Laval", "Gatineau", "Longueuil"], postal: "H" },
  { prov: "MB", cities: ["Winnipeg", "Brandon"], postal: "R" },
] as const;

function usZip(base: string): string {
  return `${base}${String(randInt(100)).padStart(2, "0")}${String(randInt(100)).padStart(2, "0")}`;
}

function ukPostcode(prefix: string): string {
  const out = `${prefix}${randInt(9) + 1}`;
  const inward = `${randInt(9) + 1}${String.fromCharCode(65 + randInt(26))}${String.fromCharCode(65 + randInt(26))}`;
  return `${out} ${inward}`;
}

function inPin(): string {
  return String(100000 + randInt(900000));
}

function caPostal(letter: string): string {
  const n = () => String(randInt(9) + 1);
  const L = () => String.fromCharCode(65 + randInt(26));
  return `${letter}${n()}${L()} ${n()}${L()}${n()}`;
}

function usPhone(): string {
  const mid = 200 + randInt(800);
  const last = 1000 + randInt(9000);
  return `(555) ${mid}-${last}`;
}

function ukPhone(): string {
  return `+44 7${randInt(9)}${randInt(9)}${randInt(9)} ${200 + randInt(800)} ${1000 + randInt(9000)}`;
}

function inPhone(): string {
  return `+91 ${7 + randInt(3)}${randInt(10)}${randInt(10)} ${100 + randInt(900)} ${1000 + randInt(9000)}`;
}

function caPhone(): string {
  const ac = [403, 416, 514, 604, 613, 780, 902, 905][randInt(8)]!;
  const mid = 200 + randInt(800);
  const last = 1000 + randInt(9000);
  return `+1 (${ac}) ${mid}-${last}`;
}

function generateUS(): FakeAddress {
  const loc = pick(US_CITIES);
  const num = 100 + randInt(8900);
  const street = `${num} ${pick(US_STREET_NAMES)} ${pick(US_STREET_TYPES)}`;
  return {
    country: "US",
    fullName: `${pick(US_FIRST)} ${pick(US_LAST)}`,
    street,
    city: loc.city,
    state: loc.state,
    zip: usZip(loc.zipBase),
    phone: usPhone(),
  };
}

function generateUK(): FakeAddress {
  const loc = pick(UK_CITIES);
  const num = 1 + randInt(180);
  const street = `${num} ${pick(US_STREET_NAMES)} ${randInt(2) === 0 ? "Road" : "Close"}`;
  return {
    country: "UK",
    fullName: `${pick(UK_FIRST)} ${pick(UK_LAST)}`,
    street,
    city: loc.city,
    state: loc.county,
    zip: ukPostcode(loc.pc),
    phone: ukPhone(),
  };
}

function generateIN(): FakeAddress {
  const st = pick(IN_STATES);
  return {
    country: "IN",
    fullName: `${pick(IN_FIRST)} ${pick(IN_LAST)}`,
    street: `${10 + randInt(190)} ${pick(US_STREET_NAMES)} ${randInt(2) === 0 ? "Main Road" : "Nagar"}`,
    city: pick(st.cities),
    state: st.state,
    zip: inPin(),
    phone: inPhone(),
  };
}

function generateCA(): FakeAddress {
  const p = pick(CA_PROVINCES);
  return {
    country: "CA",
    fullName: `${pick(CA_FIRST)} ${pick(CA_LAST)}`,
    street: `${100 + randInt(8900)} ${pick(US_STREET_NAMES)} ${pick(US_STREET_TYPES)}`,
    city: pick(p.cities),
    state: p.prov,
    zip: caPostal(p.postal),
    phone: caPhone(),
  };
}

export function generateFakeAddress(country: FakeAddressCountry): FakeAddress {
  switch (country) {
    case "US":
      return generateUS();
    case "UK":
      return generateUK();
    case "IN":
      return generateIN();
    case "CA":
      return generateCA();
    default:
      return generateUS();
  }
}

export function generateFakeAddresses(
  country: FakeAddressCountry,
  count: number,
): FakeAddress[] {
  const n = Math.max(1, Math.min(5, count));
  return Array.from({ length: n }, () => generateFakeAddress(country));
}

export function formatAddressBlock(a: FakeAddress): string {
  return [
    a.fullName,
    a.street,
    `${a.city}, ${a.state} ${a.zip}`,
    a.phone,
    a.country === "US"
      ? "United States"
      : a.country === "UK"
        ? "United Kingdom"
        : a.country === "IN"
          ? "India"
          : "Canada",
  ].join("\n");
}
