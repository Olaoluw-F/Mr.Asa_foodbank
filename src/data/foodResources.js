/**
 * Food help that isn't a county pantry site.
 * - cat "campus" and "benefits" are listed on the UMD Students page.
 * - cat "community" are the regional services under "More help" on Find Food.
 *
 * Fields: cat, name, tags (pills), desc, url and link (link text).
 * UMD entries also have where and who.
 */
export const FOOD = [
  {cat:"campus", name:"UMD Campus Pantry", tags:["Pantry","Free","UMD ID"],
   desc:"Free groceries and toiletries for UMD students, faculty, and staff. Located in South Campus Dining Hall.",
   where:"South Campus Dining Hall", who:"Anyone with a UMD ID", url:"https://studentaffairs.umd.edu", link:"Student Affairs basic needs"},
  {cat:"campus", name:"Dining meal support", tags:["Meals","Dining halls"],
   desc:"Ask Dining Services about emergency meal help and donated meal swipe programs when you're between paychecks or aid.",
   where:"Dining halls across campus", who:"UMD students", url:"https://dining.umd.edu", link:"UMD Dining Services"},
  {cat:"campus", name:"Emergency funds & basic needs support", tags:["Money","Case support"],
   desc:"If food is one part of a bigger money problem, Student Affairs can connect you with emergency funds and a staff member who can help.",
   where:"Online and in person", who:"UMD students", url:"https://studentaffairs.umd.edu", link:"Division of Student Affairs"},
  {cat:"benefits", name:"SNAP (Food Supplement Program)", tags:["Monthly benefit","Groceries"],
   desc:"A monthly benefit on an EBT card for groceries. Many students qualify through work, work-study, or other exemptions.",
   where:"Apply online", who:"Eligible students and residents", url:"https://mydhrbenefits.dhs.maryland.gov", link:"Maryland benefits portal"},
  {cat:"benefits", name:"SNAP rules for students", tags:["Eligibility guide"],
   desc:"Federal guide to which college students can get SNAP and which exemptions apply.",
   where:"Online", who:"College students", url:"https://www.fns.usda.gov/snap/students", link:"USDA student eligibility"},
  {cat:"community", name:"Capital Area Food Bank", tags:["Food finder","Free"],
   desc:"Use the Get Help map to find free food distributions and partner pantries across the DC region.",
   url:"https://www.capitalareafoodbank.org", link:"Find food near you"},
  {cat:"community", name:"Maryland 211", tags:["24/7","Referrals"],
   desc:"Call or text 2-1-1 any time to find food pantries, meal programs, and other help close to you.",
   url:"https://211md.org", link:"Maryland 211"},
  {cat:"community", name:"Maryland Food Bank", tags:["Food finder"],
   desc:"Statewide network of pantries and meal programs with a searchable food finder.",
   url:"https://mdfoodbank.org", link:"Maryland Food Bank"}
];

/** Pill text for each UMD category. */
export const CAT_LABEL = {campus:"On campus",benefits:"Benefits"};
