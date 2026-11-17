/* =========================================================
   Rooted Together - ALL SITE CONTENT LIVES IN THIS FILE

   This is the only file you need to edit to change numbers,
   dates, events, contacts or the sign-up link.

   Three rules when editing:
   1. Keep the quote marks around words:   name: "Homewood South"
   2. Numbers have no quote marks:         planted: 110
   3. Every line in a list ends with a comma, except the last one.

   Dates are always written year-month-day:  "2030-05-18"

   EVERYTHING HERE IS SAMPLE DATA. Names are placeholders and
   phone numbers use the 555-01xx range, which is never a real number.
   ========================================================= */

const SITE_DATA = {

  /* The date the site pretends it is today.
     Events and crew visits before this date are hidden. */
  demoToday: "2030-04-15",

  /* Replace this with the link to your Google Form. */
  signupUrl: "https://example.com/replace-with-google-form",

  /* The words on the green mailing list card at the bottom of every page. */
  signupTitle: "Get news by email",
  signupText: "We send one short email a month about trees and events in your neighborhood.",

  /* ---- Take part ----
     The cards that let residents tell PUFN something. Each button opens a form.
     Replace each "url" with the link to your own Google Form. */
  actions: [
    { title: "Suggest a spot for a tree",
      text: "Tell us where you would like a new tree in your neighborhood.",
      button: "Suggest a spot",
      url: "https://example.com/replace-with-suggest-a-spot-form" },
    { title: "Report a tree that needs care",
      text: "Tell us about a tree that is dead, damaged or dry.",
      button: "Report a tree",
      url: "https://example.com/replace-with-report-a-tree-form" }
  ],

  /* The short line under the page title. */
  tagline: "More trees, and better care for them, in your neighborhood.",

  /* ---- How it works ----
     The numbered steps near the top of the page. The site adds the numbers. */
  steps: [
    { title: "We clear dead trees first",
      text: "Dead trees come down before anything new is planted." },
    { title: "You choose where new trees go",
      text: "Neighbors pick the spots for new trees." },
    { title: "A paid crew cares for them",
      text: "The crew, including teenagers in summer jobs, waters, mulches and prunes." }
  ],

  /* ---- About page ----
     "sections" are the cards about the program. Add or remove lines as you like.
     "me" is the last card on the page. Replace the placeholder words with your own. */
  about: {
    sections: [
      { title: "What Rooted Together is",
        text: "Rooted Together is PUFN's program to plant more trees, and to care for them for years, in Homewood South and Manchester-Chateau." },
      { title: "What we promise",
        text: "We clear dead trees before we plant new ones. Neighbors choose where new trees go. A paid crew looks after every tree we plant." },
      { title: "Our goal",
        text: "We want at least 9 out of every 10 new trees to be alive one year after planting. The Tree progress page shows how we are doing." },
      { title: "Paid local jobs",
        text: "The care crew is paid for its work. In summer the crew includes teenagers in summer jobs." }
    ],
    me: {
      title: "About me",
      name: "Your name here (placeholder)",
      text: "Write two or three sentences about yourself here: who you are, where you study, and why you worked on this project."
    }
  },

  /* ---- Find the right tree page ----
     The tree names and the three sizes (Small, Medium, Large) come from the
     City of Pittsburgh's approved street tree list, dated January 8, 2020.
     Only use a tree name that is on that list, with the size the list gives it.
     Matching a size to the width of a sidewalk strip is this site's own guide.
     The City list only sorts trees by size and by power lines. */
  treeGuide: {
    intro: "Every tree we plant is chosen for its exact spot from the City of Pittsburgh Forestry Division's recommended species list. Roots stay clear of sidewalks and pipes, and the tree stays a size the street can hold.",

    /* One line for each kind of spot. "trees" are two or three examples from the City list. */
    spots: [
      { spot: "Under power lines",
        size: "Small",
        trees: ["Flowering cherry", "Lilac tree", "Carolina silverbell"],
        why: "These trees stay short. They need only light trimming near the wires." },

      { spot: "Narrow sidewalk strip (under 4 feet wide)",
        size: "Medium",
        trees: ["Hophornbeam", "Amur maackia", "Hedge maple"],
        why: "A medium tree needs less room for its roots than a large tree." },

      { spot: "Wide sidewalk strip or front yard",
        size: "Large",
        trees: ["Ginkgo", "Swamp white oak", "Black gum"],
        why: "There is room for the roots here. Large trees give the most shade." },

      { spot: "Open lot or park edge",
        size: "Large",
        trees: ["Bald cypress", "Bur oak", "London plane"],
        why: "Open ground lets a large tree spread out, far from houses and pipes." }
    ],

    /* A short line shown under the table. */
    note: "If there are power lines above your spot, we always plant a small tree.",

    /* The line that says where the tree names come from. */
    source: {
      linkText: "City of Pittsburgh approved street tree list (PDF, January 2020)",
      url: "https://www.pittsburghpa.gov/files/assets/city/v/1/parks/documents/17527_approved_stree_species_2020.pdf",
      note: "The tree names and sizes come from this list. Matching a size to each kind of spot is our own guide. The City did not make or check this sample site."
    },

    /* What we do not plant, and why. */
    avoid: [
      { what: "Large trees in small spaces",
        why: "Their roots can lift the sidewalk." },
      { what: "Trees with messy fruit or heavy leaf drop near homes",
        why: "They leave a lot to clean up on steps, cars and gutters." },
      { what: "Trees with weak wood",
        why: "Their branches can break in storms." }
    ],

    closing: "The crew waters and prunes every new tree for its first summer. You do not have to."
  },

  /* ---- Neighborhoods ----
     "id" is a short code used in the lists below. Do not change an id
     unless you change it everywhere. "name" is what visitors see. */
  neighborhoods: [
    { id: "homewood-south",     name: "Homewood South" },
    { id: "manchester-chateau", name: "Manchester-Chateau" }
  ],

  /* ---- Tree progress ----
     One line for each year in each neighborhood.
     planted = trees planted that year
     alive   = how many of those trees are alive today */
  progress: [
    { year: 2027, neighborhood: "homewood-south",     planted: 110, alive: 97 },
    { year: 2027, neighborhood: "manchester-chateau", planted: 90,  alive: 79 },
    { year: 2028, neighborhood: "homewood-south",     planted: 160, alive: 144 },
    { year: 2028, neighborhood: "manchester-chateau", planted: 140, alive: 126 },
    { year: 2029, neighborhood: "homewood-south",     planted: 160, alive: 148 },
    { year: 2029, neighborhood: "manchester-chateau", planted: 140, alive: 128 }
  ],

  /* ---- Crew schedule ----
     One line for each crew visit. task is "Watering", "Mulching" or "Pruning".
     The site works out the day of the week from the date. */
  schedule: [
    { date: "2030-04-20", neighborhood: "homewood-south",     task: "Mulching", note: "Fresh mulch around every young tree" },
    { date: "2030-04-23", neighborhood: "homewood-south",     task: "Watering", note: "First watering of the season" },
    { date: "2030-05-07", neighborhood: "homewood-south",     task: "Watering", note: "Morning visit" },
    { date: "2030-05-21", neighborhood: "homewood-south",     task: "Watering", note: "Morning visit" },
    { date: "2030-06-04", neighborhood: "homewood-south",     task: "Watering", note: "Morning visit" },
    { date: "2030-06-13", neighborhood: "homewood-south",     task: "Pruning",  note: "Crew removes dead or broken branches" },
    { date: "2030-06-18", neighborhood: "homewood-south",     task: "Watering", note: "Morning visit" },

    { date: "2030-04-25", neighborhood: "manchester-chateau", task: "Watering", note: "First watering of the season" },
    { date: "2030-04-27", neighborhood: "manchester-chateau", task: "Mulching", note: "Fresh mulch around every young tree" },
    { date: "2030-05-09", neighborhood: "manchester-chateau", task: "Watering", note: "Morning visit" },
    { date: "2030-05-23", neighborhood: "manchester-chateau", task: "Watering", note: "Morning visit" },
    { date: "2030-06-06", neighborhood: "manchester-chateau", task: "Watering", note: "Morning visit" },
    { date: "2030-06-12", neighborhood: "manchester-chateau", task: "Pruning",  note: "Crew removes dead or broken branches" },
    { date: "2030-06-20", neighborhood: "manchester-chateau", task: "Watering", note: "Morning visit" }
  ],

  /* ---- Events ----
     type is "Clean-up day", "Planting day" or "Cookout".
     The first event is in the past on purpose, to show that the site hides old events. */
  events: [
    { date: "2030-03-30", time: "9 am to 12 noon", type: "Clean-up day",
      title: "Early Spring Clean-Up", neighborhood: "manchester-chateau",
      place: "Sample Avenue Lot (placeholder)", note: "Gloves and bags provided." },

    { date: "2030-04-27", time: "9 am to 12 noon", type: "Clean-up day",
      title: "Dead Tree Clean-Up Day", neighborhood: "homewood-south",
      place: "Sample Street Corner Lot (placeholder)", note: "Gloves and bags provided." },

    { date: "2030-05-04", time: "10 am to 1 pm", type: "Planting day",
      title: "Spring Planting Day", neighborhood: "manchester-chateau",
      place: "Sample Avenue Park (placeholder)", note: "No experience needed. We bring the tools." },

    { date: "2030-05-18", time: "10 am to 1 pm", type: "Planting day",
      title: "Spring Planting Day", neighborhood: "homewood-south",
      place: "Sample Street Park (placeholder)", note: "No experience needed. We bring the tools." },

    { date: "2030-06-08", time: "12 noon to 3 pm", type: "Cookout",
      title: "Neighborhood Cookout", neighborhood: "homewood-south",
      place: "Sample Community Center (placeholder)", note: "Free food. Bring a chair." },

    { date: "2030-06-22", time: "12 noon to 3 pm", type: "Cookout",
      title: "Meet the Summer Crew Cookout", neighborhood: "manchester-chateau",
      place: "Sample Avenue Park (placeholder)", note: "Free food. Meet the Learn and Earn crew." }
  ],

  /* ---- Contacts ----
     Sample phone numbers must stay in the 555-0100 to 555-0199 range. */
  contacts: [
    { role: "PUFN neighborhood manager", neighborhood: "homewood-south",
      name: "Alex Sample", phone: "412-555-0101",
      about: "Questions about trees, planting spots and events." },

    { role: "Learn and Earn crew manager", neighborhood: "homewood-south",
      name: "Jordan Placeholder", phone: "412-555-0102",
      about: "Questions about the summer youth crew and jobs." },

    { role: "PUFN neighborhood manager", neighborhood: "manchester-chateau",
      name: "Taylor Sample", phone: "412-555-0103",
      about: "Questions about trees, planting spots and events." },

    { role: "Learn and Earn crew manager", neighborhood: "manchester-chateau",
      name: "Casey Placeholder", phone: "412-555-0104",
      about: "Questions about the summer youth crew and jobs." }
  ]

};
