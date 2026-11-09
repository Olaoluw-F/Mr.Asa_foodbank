/**
 * Volunteer opportunities for the Volunteer page table.
 * Fields: org, sub (kind of org), task, type (kind of work), area, when,
 * hours ("Yes" if it counts toward service hours), walk (true if no car is
 * needed), how (how to join).
 */
// SAMPLE rows: replace with the PGCPS volunteering database
export const VOL = [
  {org:"Sample PGCPS elementary school", sub:"PGCPS", task:"Help pack weekend backpack meals", type:"School support", area:"Hyattsville", when:"Fridays, 1–3 pm", hours:"Yes", walk:false, how:"PGCPS volunteer clearance required"},
  {org:"Sample PGCPS high school", sub:"PGCPS", task:"Run the school food pantry during lunch", type:"School support", area:"Greenbelt", when:"Tue & Thu, 11 am–1 pm", hours:"Yes", walk:false, how:"PGCPS volunteer clearance required"},
  {org:"Capital Area Food Bank", sub:"Warehouse", task:"Sort and pack food boxes", type:"Warehouse", area:"Washington, DC", when:"Weekends", hours:"Yes", walk:false, how:"Register on the food bank site"},
  {org:"Sample community pantry", sub:"Faith-based", task:"Distribute groceries to families", type:"Pantry", area:"Riverdale Park", when:"Saturdays, 9 am–noon", hours:"Yes", walk:true, how:"Walk-ins welcome"},
  {org:"Sample PGCPS middle school", sub:"PGCPS", task:"Garden club: grow produce with students", type:"Garden", area:"College Park", when:"Wednesdays after school", hours:"Yes", walk:true, how:"PGCPS volunteer clearance required"}
];
