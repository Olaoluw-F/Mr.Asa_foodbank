/**
 * Fields: kind ("Student org" or "Campus program"), vol (takes volunteers),
 * directory (true for the TerpLink search card), name, tags, mission, about
 * (shown when there's no mission), meets, instagram, groupme, terplink, website.
 * Collect org details with data-sources/umd-student-orgs-template.csv.
 */
// UMD student organizations & campus programs.
// Fill in: mission (their official statement), instagram, groupme, terplink, meets.
// Leave a field as "" to hide it. Only add links you've confirmed with the org.
export const ORGS = [
  {kind:"Student org", vol:true, name:"Mr. ASA", tags:["Food security"],
   mission:"", about:"The student platform behind this hub. We connect people across Prince George's County to free food, and connect volunteers to places that need them.",
   meets:"", instagram:"", groupme:"", terplink:"https://terplink.umd.edu/organizations?query=Mr.%20ASA", website:""},
  {kind:"Student org", vol:true, name:"Food Recovery Network (UMD chapter)", tags:["Food recovery"],
   mission:"", about:"The national Food Recovery Network started at UMD in 2011. Student volunteers collect unserved food from dining halls and deliver it to shelters and pantries nearby.",
   meets:"", instagram:"", groupme:"", terplink:"https://terplink.umd.edu/organizations?query=Food%20Recovery%20Network", website:"https://www.foodrecoverynetwork.org"},
  {kind:"Campus program", vol:true, name:"UMD Campus Pantry", tags:["Pantry","Volunteer shifts"],
   mission:"", about:"The on-campus pantry for students, faculty, and staff. Volunteers stock shelves, check in visitors, and run food drives.",
   meets:"", instagram:"", groupme:"", terplink:"", website:"https://studentaffairs.umd.edu"},
  {kind:"Campus program", vol:true, name:"Terp Farm", tags:["Farming","Fresh produce"],
   mission:"", about:"UMD Dining's own farm grows vegetables for the dining halls and shares produce with campus food programs.",
   meets:"", instagram:"", groupme:"", terplink:"", website:"https://dining.umd.edu"},
  {kind:"Campus program", vol:true, name:"Leadership & Community Service-Learning (LCSL)", tags:["Service","Alternative Breaks"],
   mission:"", about:"The campus office for community service: one-day projects, ongoing placements, and Alternative Breaks trips, some focused on hunger.",
   meets:"", instagram:"", groupme:"", terplink:"", website:"https://thestamp.umd.edu"},
  {kind:"Campus program", vol:false, name:"UMD Extension nutrition education (SNAP-Ed)", tags:["Cooking on a budget"],
   mission:"", about:"University of Maryland Extension teaches budget cooking and nutrition classes across the state, including in Prince George's County.",
   meets:"", instagram:"", groupme:"", terplink:"", website:"https://extension.umd.edu"},
  {kind:"Student org", vol:true, directory:true, name:"Find more groups on TerpLink", tags:["Directory"],
   mission:"", about:"TerpLink is UMD's directory of student organizations. Search food, hunger, garden, sustainability, or service to find more groups.",
   meets:"", instagram:"", groupme:"", terplink:"https://terplink.umd.edu/organizations?query=food", website:""}
];
