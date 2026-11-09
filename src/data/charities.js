/**
 * Fields: name, c (country codes), tag, does, trust (reasons to trust it),
 * note ("Keep in mind"), url, cta (button text), wide (full-width card).
 * When ratings change, update the "last checked" date on the Donate page too.
 */
// Vetted charities for Burkina Faso & Nigeria (checked Sept 26 2026)
export const AFRICA = [
  {name:"World Food Program USA", c:["BF","NG"], tag:"Emergency food",
   does:"Funds the UN World Food Programme: emergency food and cash, school meals, and nutrition help for children and mothers. In July 2025 it reached over 1.3 million people in Nigeria.",
   trust:["Charity Navigator 4 of 4 stars (2026)","501(c)(3), EIN 13-3843435","Lets US donors give to the Nigeria operation"],
   note:"WFP is a huge UN agency. Large aid operations in conflict zones have faced theft and diversion in some countries, which WFP investigates and reports publicly.",
   url:"https://www.wfpusa.org/countries/nigeria/", cta:"Give to Nigeria"},
  {name:"Action Against Hunger USA", c:["BF","NG"], tag:"Malnutrition treatment",
   does:"Treats severely malnourished children, runs food and cash distributions, and builds water systems. Last year it reached 1.24 million people in Burkina Faso and 2.63 million in Nigeria (Borno and Yobe states).",
   trust:["Charity Navigator 3 of 4 stars","Candid Platinum transparency seal","Top-rated by CharityWatch, BBB accredited","Says 90% of donations go to programs"],
   note:"Rated 3 stars by Charity Navigator, one step below the top rating.",
   url:"https://www.actionagainsthunger.org", cta:"Donate"},
  {name:"Helen Keller Intl", c:["BF","NG"], tag:"Child nutrition",
   does:"Gives children vitamin A supplements, which prevent blindness and deaths from common illnesses in malnourished kids. About $1 per capsule delivered.",
   trust:["GiveWell top charity","Charity Navigator 4 of 4 stars","501(c)(3), EIN 13-5562162"],
   note:"GiveWell notes Helen Keller usually monitors only one of its two campaign rounds each year, so results may be a bit overstated.",
   url:"https://www.givewell.org/charities/helen-keller-international", cta:"Review & donate"},
  {name:"Malaria Consortium", c:["BF","NG"], tag:"Malaria prevention",
   does:"Gives children seasonal anti-malaria medicine during the rainy season. Malaria and malnutrition feed each other, so this protects hungry children. About $1.50 per child per monthly round.",
   trust:["GiveWell top charity","Surveys found 92% coverage in Burkina Faso and 78% in Nigeria","GiveWell: shares significant information and is closely followed"],
   note:"This is a health program, not food aid. Giving through GiveWell's page is the easiest way for US donors.",
   url:"https://www.givewell.org/charities/malaria-consortium", cta:"Review & donate"},
  {name:"New Incentives", c:["NG"], tag:"Child health",
   does:"Gives small cash payments to caregivers in 9 northern Nigerian states when their babies get vaccinated. Costs about $18 per child enrolled.",
   trust:["GiveWell top charity","501(c)(3), EIN 45-2368993","Anti-fraud checks: photo records of every payment, biometric duplicate checks, and unannounced audits"],
   note:"Nigeria only. GiveWell says fraud is always a risk with cash programs, even with strong checks in place.",
   url:"https://www.newincentives.org", cta:"Donate"},
  {name:"Doctors Without Borders USA", c:["BF","NG"], tag:"Emergency medical care",
   does:"Runs therapeutic feeding centers for severely malnourished children. In 2025 it admitted 89,800 children to inpatient feeding programs in Nigeria, and it runs hospitals and emergency care in Burkina Faso.",
   trust:["Charity Navigator 4 of 4 stars","501(c)(3), EIN 13-3433452"],
   note:"Gifts usually go where MSF needs them most, so you can't choose a country.",
   url:"https://www.doctorswithoutborders.org", cta:"Donate"},
  {wide:true, name:"GiveWell Top Charities Fund", c:["BF","NG"], tag:"Let experts choose",
   does:"GiveWell passes 100% of your gift to its top charities, including Malaria Consortium, Helen Keller Intl, and New Incentives, based on where it will do the most good.",
   trust:["GiveWell takes no fees (only card processing fees)","Spends 70,000+ hours a year on research","Emails you an estimate of your gift's impact"],
   note:"GiveWell decides which country gets the money, so it may go beyond Burkina Faso and Nigeria.",
   url:"https://www.givewell.org/top-charities-fund", cta:"Give to the fund"}
];

/** Country names for the codes in AFRICA[].c. */
export const CN = {BF:"Burkina Faso", NG:"Nigeria"};
