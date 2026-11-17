/* =========================================================
   Rooted Together - app.js
   Reads the content in data.js and puts it on the page.
   Every page of the site uses this same file.
   You should not need to edit it, except the list of pages below.
   ========================================================= */

/* ---------- The pages of the site ----------
   The menu and the links on the home page are made from this list.
   To add a page: make a new .html file, then add a line here. */
const PAGES = [
  { file: "index.html",    name: "Home",          about: "" },
  { file: "about.html",    name: "About",         about: "What Rooted Together is, and who made this site." },
  { file: "progress.html", name: "Tree progress", about: "How many trees we planted, and how many are still alive." },
  { file: "right-tree.html", name: "Find the right tree", about: "The kind of tree we plant in each kind of spot, and why." },
  { file: "schedule.html", name: "Crew schedule", about: "When the crew waters, mulches and prunes trees near you." },
  { file: "events.html",   name: "Events",        about: "Clean-up days, planting days and cookouts." },
  { file: "contacts.html", name: "Contacts",      about: "Phone numbers for the managers in your neighborhood." }
];

/* The small tree drawing beside the PUFN name. Not a logo of any real organization. */
const TREE_DRAWING =
  '<svg class="org-icon" viewBox="0 0 24 24" aria-hidden="true">' +
  '<circle cx="12" cy="9" r="7" fill="currentColor"/>' +
  '<rect x="10.75" y="14" width="2.5" height="8" rx="1" fill="currentColor"/>' +
  '</svg>';

/* ---------- Small helpers ---------- */

/* Makes a new page element, for example el("p", "stat-label", "trees planted"). */
function el(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

/* Returns the progress lines for one neighborhood, or all of them for "all". */
function progressFor(neighborhoodId) {
  if (neighborhoodId === "all") {
    return SITE_DATA.progress;
  }
  return SITE_DATA.progress.filter(function (line) {
    return line.neighborhood === neighborhoodId;
  });
}

/* Returns the name visitors see for a neighborhood id such as "homewood-south". */
function neighborhoodName(id) {
  const match = SITE_DATA.neighborhoods.find(function (neighborhood) {
    return neighborhood.id === id;
  });
  return match ? match.name : id;
}

/* ---------- Dates ---------- */

/* Turns "2030-05-07" into a date the browser understands. */
function toDate(text) {
  const parts = text.split("-");
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

/* "2030-05-07" becomes "Tuesday". */
function weekdayLabel(text) {
  return toDate(text).toLocaleDateString("en-US", { weekday: "long" });
}

/* Builds the small green date box, for example "MAY 7", shown beside a visit or event. */
function makeDateBadge(text) {
  const date = toDate(text);
  const badge = el("p", "date-badge");
  badge.appendChild(el("span", "date-month", date.toLocaleDateString("en-US", { month: "short" })));
  badge.appendChild(document.createTextNode(" "));   /* so screen readers say "May 7", not "May7" */
  badge.appendChild(el("span", "date-day", String(date.getDate())));
  return badge;
}

/* "2030-05-07" becomes "May 2030". */
function monthLabel(text) {
  return toDate(text).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/* Takes a list from data.js (crew visits or events) and returns only the lines
   that are today or later, for the chosen neighborhood, soonest first. */
function upcomingFor(list, neighborhoodId) {
  const upcoming = list.filter(function (line) {
    /* Dates written year-month-day can be compared like words: later dates come later. */
    const isUpcoming = line.date >= SITE_DATA.demoToday;
    const isHere = neighborhoodId === "all" || line.neighborhood === neighborhoodId;
    return isUpcoming && isHere;
  });

  upcoming.sort(function (a, b) {
    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
  });
  return upcoming;
}

/* ---------- Top bar and menu (the same on every page) ---------- */

/* The file name of the page being shown, for example "events.html". */
function currentFile() {
  const parts = window.location.pathname.split("/");
  return parts[parts.length - 1] || "index.html";
}

/* Builds the top bar: the PUFN name, a Menu button for phones, and the links to every page. */
function showTopBar() {
  const box = document.getElementById("site-top");
  if (!box) {
    return;
  }

  const bar = el("div", "topbar");
  const inner = el("div", "wrap topbar-inner");

  /* The PUFN name is a link back to the home page. */
  const org = el("a", "org");
  org.href = "index.html";
  org.innerHTML = TREE_DRAWING + " PUFN";
  inner.appendChild(org);

  /* On phones the links hide behind this button. On laptops the button is hidden. */
  const button = el("button", "menu-button", "Menu");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "site-menu");
  inner.appendChild(button);

  const menu = el("nav", "site-menu");
  menu.id = "site-menu";
  menu.setAttribute("aria-label", "Pages");
  PAGES.forEach(function (page) {
    const link = el("a", "", page.name);
    link.href = page.file;
    if (page.file === currentFile()) {
      link.setAttribute("aria-current", "page");   /* marks the page you are on */
    }
    menu.appendChild(link);
  });
  inner.appendChild(menu);

  button.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("is-open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    button.textContent = isOpen ? "Close menu" : "Menu";
  });

  bar.appendChild(inner);
  box.appendChild(bar);
}

/* Builds the green mailing list card shown near the bottom of every page. */
function showSignupCard() {
  const box = document.getElementById("site-bottom");
  if (!box) {
    return;
  }

  const wrap = el("div", "wrap");
  const section = el("section");
  section.id = "signup";
  const card = el("div", "card signup-card");
  card.appendChild(el("h2", "", SITE_DATA.signupTitle || "Get news by email"));
  if (SITE_DATA.signupText) {
    card.appendChild(el("p", "", SITE_DATA.signupText));
  }
  card.appendChild(el("a", "button js-signup", "Join the mailing list"));
  section.appendChild(card);
  wrap.appendChild(section);
  box.appendChild(wrap);
}

/* ---------- Sign-up buttons ---------- */

/* Points every sign-up button at the link in data.js. */
function setSignupLinks() {
  const buttons = document.querySelectorAll(".js-signup");
  buttons.forEach(function (button) {
    button.href = SITE_DATA.signupUrl;
  });
}

/* ---------- Top of the page ---------- */

/* Shows the tagline and the "How it works" steps from data.js. */
function showIntro() {
  const tagline = document.getElementById("tagline");
  if (tagline && SITE_DATA.tagline) {
    tagline.textContent = SITE_DATA.tagline;
  }

  const list = document.getElementById("steps");
  if (!list) {
    return;   /* this page has no "How it works" list */
  }
  list.textContent = "";
  (SITE_DATA.steps || []).forEach(function (step) {
    const item = el("li", "step");
    /* styles.css adds the number in a green circle before each step. */
    const words = el("div", "step-words");
    words.appendChild(el("p", "step-title", step.title));
    words.appendChild(el("p", "step-text", step.text));
    item.appendChild(words);
    list.appendChild(item);
  });
}

/* ---------- Home page ---------- */

/* Makes one large link card for every page except the home page. */
function showPageLinks() {
  const box = document.getElementById("page-links");
  if (!box) {
    return;
  }
  PAGES.forEach(function (page) {
    if (page.file === "index.html") {
      return;
    }
    const link = el("a", "card page-link");
    link.href = page.file;
    link.appendChild(el("span", "page-link-name", page.name));
    link.appendChild(el("span", "page-link-about", page.about));
    box.appendChild(link);
  });
}

/* Makes the "Take part" cards from data.js, such as "Suggest a spot for a tree". */
function showActions() {
  const box = document.getElementById("actions");
  if (!box) {
    return;
  }
  (SITE_DATA.actions || []).forEach(function (action) {
    const card = el("div", "card action-card");
    card.appendChild(el("h3", "", action.title));
    card.appendChild(el("p", "", action.text));
    const button = el("a", "button", action.button);
    button.href = action.url;
    card.appendChild(button);
    box.appendChild(card);
  });
}

/* Shows the soonest upcoming event, with a link to the Events page.
   If a neighborhood is chosen and has an event coming up, that event is shown. */
function showNextEvent(neighborhoodId) {
  const box = document.getElementById("next-event");
  if (!box) {
    return;
  }
  box.textContent = "";

  const events = upcomingFor(SITE_DATA.events, "all");
  if (events.length === 0) {
    box.appendChild(el("p", "card", "No events are planned yet. Please check back soon."));
    return;
  }

  const nearYou = upcomingFor(SITE_DATA.events, neighborhoodId);
  const isNearYou = neighborhoodId !== "all" && nearYou.length > 0;
  const next = isNearYou ? nearYou[0] : events[0];
  const heading = isNearYou ? "Next event in " + neighborhoodName(neighborhoodId) : "Next event";

  const card = makeEventCard(heading, [next]);
  const more = el("a", "text-link", "See all events");
  more.href = "events.html";
  card.appendChild(more);
  box.appendChild(card);
}

/* ---------- About page ---------- */

/* Shows the "about" text from data.js: one card for each part, then the "About me" card. */
function showAbout() {
  const box = document.getElementById("about-sections");
  if (!box || !SITE_DATA.about) {
    return;
  }

  (SITE_DATA.about.sections || []).forEach(function (part) {
    const card = el("div", "card");
    card.appendChild(el("h2", "small-title", part.title));
    card.appendChild(el("p", "last-line", part.text));
    box.appendChild(card);
  });

  const me = SITE_DATA.about.me;
  if (me) {
    const card = el("div", "card about-me");
    card.appendChild(el("h2", "small-title", me.title));
    card.appendChild(el("p", "item-main", me.name));
    card.appendChild(el("p", "last-line", me.text));
    box.appendChild(card);
  }
}

/* ---------- Find the right tree page ---------- */

/* Shows the "treeGuide" part of data.js: the intro, the table of spots,
   the list of trees we avoid, and the closing line. */
function showTreeGuide() {
  const table = document.getElementById("guide-table");
  const guide = SITE_DATA.treeGuide;
  if (!table || !guide) {
    return;   /* this page has no tree guide */
  }

  const intro = document.getElementById("guide-intro");
  if (intro && guide.intro) {
    intro.textContent = guide.intro;
  }

  /* The column names, read from the top row of the table in right-tree.html.
     On a phone each box shows its column name in front, for example "Why: ...". */
  const labels = Array.from(table.querySelectorAll("thead th")).map(function (heading) {
    return heading.textContent;
  });

  /* One table row for each kind of spot. The "role" lines tell screen readers
     this is still a table when a phone shows the rows as stacked blocks. */
  const rows = document.getElementById("guide-rows");
  rows.textContent = "";
  (guide.spots || []).forEach(function (line) {
    const row = el("tr");
    row.setAttribute("role", "row");

    const heading = el("th", "", line.spot);
    heading.scope = "row";
    heading.setAttribute("role", "rowheader");
    row.appendChild(heading);

    const boxes = [line.size, (line.trees || []).join(", "), line.why];
    boxes.forEach(function (words, index) {
      const box = el("td", "", words);
      box.setAttribute("role", "cell");
      box.dataset.label = labels[index + 1] || "";
      row.appendChild(box);
    });
    rows.appendChild(row);
  });

  const note = document.getElementById("guide-note");
  if (note) {
    note.textContent = guide.note || "";
  }

  /* The "Source" line: a link to the City's list, then a short note. */
  const source = document.getElementById("guide-source");
  if (source && guide.source) {
    source.textContent = "";
    source.appendChild(el("strong", "", "Source: "));
    const link = el("a", "", guide.source.linkText);
    link.href = guide.source.url;
    source.appendChild(link);
    source.appendChild(document.createTextNode(". " + (guide.source.note || "")));
  }

  /* What we avoid: the kind of tree in bold, then the reason. */
  const avoid = document.getElementById("avoid-list");
  if (avoid) {
    avoid.textContent = "";
    (guide.avoid || []).forEach(function (line) {
      const item = el("li", "item");
      item.appendChild(el("p", "item-main", line.what));
      item.appendChild(el("p", "", line.why));
      avoid.appendChild(item);
    });
  }

  const closing = document.getElementById("guide-closing");
  if (closing) {
    closing.textContent = guide.closing || "";
  }
}

/* ---------- Headline numbers ---------- */

function showHeadlineNumbers(neighborhoodId) {
  const lines = progressFor(neighborhoodId);

  /* Add up the trees and find the first year. */
  let planted = 0;
  let alive = 0;
  let firstYear = lines.length > 0 ? lines[0].year : "";
  lines.forEach(function (line) {
    planted = planted + line.planted;
    alive = alive + line.alive;
    if (line.year < firstYear) {
      firstYear = line.year;
    }
  });

  /* "9 out of 10" is easier to understand than "90%". */
  const outOfTen = planted > 0 ? Math.round((alive / planted) * 10) : 0;

  const box = document.getElementById("stats");
  if (!box) {
    return;   /* this page has no headline numbers */
  }
  box.textContent = "";   /* clear anything already there */
  box.appendChild(makeStat(planted.toLocaleString("en-US"), "trees planted since " + firstYear, false));
  box.appendChild(makeStat(alive.toLocaleString("en-US"), "trees alive today", false));
  box.appendChild(makeStat(outOfTen + " out of 10", "trees are still alive", true));
}

/* Builds one headline number card. */
function makeStat(number, label, isWide) {
  const card = el("div", isWide ? "card stat stat-wide" : "card stat");
  card.appendChild(el("p", "stat-number", number));
  card.appendChild(el("p", "stat-label", label));
  return card;
}

/* ---------- Chart and table ---------- */

/* Adds up the progress lines so there is one total for each year. */
function totalsByYear(neighborhoodId) {
  const totals = [];
  progressFor(neighborhoodId).forEach(function (line) {
    let total = totals.find(function (item) {
      return item.year === line.year;
    });
    if (!total) {
      total = { year: line.year, planted: 0, alive: 0 };
      totals.push(total);
    }
    total.planted = total.planted + line.planted;
    total.alive = total.alive + line.alive;
  });

  /* Oldest year first. */
  totals.sort(function (a, b) {
    return a.year - b.year;
  });
  return totals;
}

/* Draws two bars for each year: trees planted and trees alive today. */
function showChart(neighborhoodId) {
  const totals = totalsByYear(neighborhoodId);

  /* The longest bar belongs to the biggest number. Every other bar is a share of it. */
  let biggest = 0;
  totals.forEach(function (total) {
    if (total.planted > biggest) {
      biggest = total.planted;
    }
  });

  const chart = document.getElementById("chart");
  if (!chart) {
    return;   /* this page has no chart */
  }
  chart.textContent = "";
  totals.forEach(function (total) {
    const group = el("div", "chart-year");
    group.appendChild(el("p", "chart-year-name", String(total.year)));
    group.appendChild(makeBarRow("Planted", total.planted, biggest, "bar bar-planted"));
    group.appendChild(makeBarRow("Alive today", total.alive, biggest, "bar bar-alive"));
    chart.appendChild(group);
  });
}

/* Builds one line of the chart: a label, a bar and the number. */
function makeBarRow(label, value, biggest, barClass) {
  const row = el("div", "bar-row");
  row.appendChild(el("span", "bar-label", label));

  const track = el("span", "bar-track");
  const bar = el("span", barClass);
  /* --size is a number from 0 to 1. styles.css turns it into the bar's width. */
  bar.style.setProperty("--size", biggest > 0 ? value / biggest : 0);
  track.appendChild(bar);
  track.appendChild(el("span", "bar-value", value.toLocaleString("en-US")));

  row.appendChild(track);
  return row;
}

/* Fills the table under the chart with the same numbers. */
function showTable(neighborhoodId) {
  const totals = totalsByYear(neighborhoodId);
  const rows = document.getElementById("progress-rows");
  if (!rows) {
    return;   /* this page has no table */
  }
  rows.textContent = "";

  let planted = 0;
  let alive = 0;
  totals.forEach(function (total) {
    rows.appendChild(makeTableRow(String(total.year), total.planted, total.alive, ""));
    planted = planted + total.planted;
    alive = alive + total.alive;
  });
  rows.appendChild(makeTableRow("All years", planted, alive, "total-row"));
}

function makeTableRow(name, planted, alive, className) {
  const row = el("tr", className);
  const heading = el("th", "", name);
  heading.scope = "row";
  row.appendChild(heading);
  row.appendChild(el("td", "num", planted.toLocaleString("en-US")));
  row.appendChild(el("td", "num", alive.toLocaleString("en-US")));
  return row;
}

/* Shows the neighborhoods side by side: one row for each year, one column for each
   neighborhood. Each box reads "97 of 110", meaning 97 alive out of 110 planted.
   The card only appears when every neighborhood is showing. */
function showComparison(neighborhoodId) {
  const card = document.getElementById("compare-card");
  const table = document.getElementById("compare-table");
  if (!card || !table) {
    return;   /* this page has no side-by-side table */
  }

  const places = SITE_DATA.neighborhoods;
  card.hidden = neighborhoodId !== "all" || places.length < 2;
  if (card.hidden) {
    return;
  }
  table.textContent = "";

  /* Top row: "Year", then the name of each neighborhood. */
  const head = el("thead");
  const headRow = el("tr");
  const yearHeading = el("th", "", "Year");
  yearHeading.scope = "col";
  headRow.appendChild(yearHeading);
  places.forEach(function (place) {
    const heading = el("th", "", place.name);
    heading.scope = "col";
    headRow.appendChild(heading);
  });
  head.appendChild(headRow);
  table.appendChild(head);

  /* One row for each year, then a last row for all years together. */
  const body = el("tbody");
  totalsByYear("all").forEach(function (yearTotal) {
    const row = el("tr");
    const heading = el("th", "", String(yearTotal.year));
    heading.scope = "row";
    row.appendChild(heading);
    places.forEach(function (place) {
      const match = totalsByYear(place.id).find(function (total) {
        return total.year === yearTotal.year;
      });
      row.appendChild(el("td", "", match ? match.alive + " of " + match.planted : "None"));
    });
    body.appendChild(row);
  });

  const totalRow = el("tr", "total-row");
  const totalHeading = el("th", "", "Total");   /* a short word, so the column stays narrow */
  totalHeading.scope = "row";
  totalRow.appendChild(totalHeading);
  places.forEach(function (place) {
    let planted = 0;
    let alive = 0;
    progressFor(place.id).forEach(function (line) {
      planted = planted + line.planted;
      alive = alive + line.alive;
    });
    totalRow.appendChild(el("td", "", alive + " of " + planted));
  });
  body.appendChild(totalRow);
  table.appendChild(body);
}

/* Shows every part of the Tree progress section for one neighborhood, or "all". */
function showProgress(neighborhoodId) {
  showHeadlineNumbers(neighborhoodId);
  showChart(neighborhoodId);
  showTable(neighborhoodId);
  showComparison(neighborhoodId);
}

/* ---------- Crew schedule ---------- */

/* Lists the upcoming crew visits, with one card for each month. */
function showSchedule(neighborhoodId) {
  const box = document.getElementById("schedule-list");
  if (!box) {
    return;   /* this page has no crew schedule */
  }
  const visits = upcomingFor(SITE_DATA.schedule, neighborhoodId);
  box.textContent = "";

  if (visits.length === 0) {
    box.appendChild(el("p", "card", "No crew visits are planned yet. Please check back soon."));
    return;
  }

  let currentMonth = "";
  let list = null;
  visits.forEach(function (visit) {
    /* When the month changes, start a new card. */
    const month = monthLabel(visit.date);
    if (month !== currentMonth) {
      currentMonth = month;
      const card = el("div", "card");
      card.appendChild(el("h3", "", month));
      list = el("ul", "item-list");
      card.appendChild(list);
      box.appendChild(card);
    }
    list.appendChild(makeVisit(visit));
  });
}

/* Builds one crew visit: the day, the work and place, and a short note. */
function makeVisit(visit) {
  const item = el("li", "item item-dated");
  item.appendChild(makeDateBadge(visit.date));

  /* Everything to the right of the date box goes in "details". */
  const details = el("div", "item-details");
  details.appendChild(el("p", "item-date", weekdayLabel(visit.date)));

  const work = el("p", "item-main", visit.task + " · ");
  /* "keep-together" stops a name like Manchester-Chateau splitting across two lines. */
  work.appendChild(el("span", "keep-together", neighborhoodName(visit.neighborhood)));
  details.appendChild(work);

  if (visit.note) {
    details.appendChild(el("p", "item-note", visit.note));
  }
  item.appendChild(details);
  return item;
}

/* ---------- Events ---------- */

/* Lists the upcoming events. When one neighborhood is chosen, its events come
   first and events in the other neighborhoods follow under "nearby". */
function showEvents(neighborhoodId) {
  const box = document.getElementById("event-list");
  if (!box) {
    return;   /* this page has no events list */
  }
  const events = upcomingFor(SITE_DATA.events, "all");
  box.textContent = "";

  if (events.length === 0) {
    box.appendChild(el("p", "card", "No events are planned yet. Please check back soon."));
    return;
  }

  if (neighborhoodId === "all") {
    box.appendChild(makeEventCard("Coming up", events));
    return;
  }

  const here = events.filter(function (event) {
    return event.neighborhood === neighborhoodId;
  });
  const nearby = events.filter(function (event) {
    return event.neighborhood !== neighborhoodId;
  });

  box.appendChild(makeEventCard("In " + neighborhoodName(neighborhoodId), here));
  if (nearby.length > 0) {
    box.appendChild(makeEventCard("In nearby neighborhoods", nearby));
  }
}

/* Builds one card with a heading and a list of events. */
function makeEventCard(heading, events) {
  const card = el("div", "card");
  card.appendChild(el("h3", "", heading));

  if (events.length === 0) {
    card.appendChild(el("p", "", "No events are planned here yet."));
    return card;
  }

  const list = el("ul", "item-list");
  events.forEach(function (event) {
    list.appendChild(makeEvent(event));
  });
  card.appendChild(list);
  return card;
}

/* Builds one event: when, what, what kind and which neighborhood, where, and a note. */
function makeEvent(event) {
  const item = el("li", "item item-dated");
  item.appendChild(makeDateBadge(event.date));

  /* Everything to the right of the date box goes in "details". */
  const details = el("div", "item-details");

  /* The day, then the time. On a narrow phone the whole time moves to the next line. */
  const when = el("p", "item-date", weekdayLabel(event.date) + ", ");
  when.appendChild(el("span", "keep-together", event.time));
  details.appendChild(when);

  details.appendChild(el("p", "item-main", event.title));

  const kind = el("p", "", event.type + " · ");
  kind.appendChild(el("span", "keep-together", neighborhoodName(event.neighborhood)));
  details.appendChild(kind);

  details.appendChild(el("p", "", "Where: " + event.place));
  if (event.note) {
    details.appendChild(el("p", "item-note", event.note));
  }
  item.appendChild(details);
  return item;
}

/* ---------- Contacts ---------- */

/* Lists the contacts, with one card for each neighborhood. */
function showContacts(neighborhoodId) {
  const box = document.getElementById("contact-list");
  if (!box) {
    return;   /* this page has no contacts */
  }
  box.textContent = "";

  SITE_DATA.neighborhoods.forEach(function (neighborhood) {
    /* Skip neighborhoods the visitor did not choose. */
    if (neighborhoodId !== "all" && neighborhoodId !== neighborhood.id) {
      return;
    }
    const people = SITE_DATA.contacts.filter(function (contact) {
      return contact.neighborhood === neighborhood.id;
    });
    if (people.length > 0) {
      box.appendChild(makeContactCard(neighborhood.name, people));
    }
  });

  /* A contact with neighborhood: "all" in data.js is always shown, in its own card. */
  const everyone = SITE_DATA.contacts.filter(function (contact) {
    return contact.neighborhood === "all";
  });
  if (everyone.length > 0) {
    box.appendChild(makeContactCard(allNeighborhoodsName(), everyone));
  }
}

/* Builds one card with a heading and a list of people. */
function makeContactCard(heading, people) {
  const card = el("div", "card");
  card.appendChild(el("h3", "", heading));
  const list = el("ul", "item-list");
  people.forEach(function (person) {
    list.appendChild(makeContact(person));
  });
  card.appendChild(list);
  return card;
}

/* Builds one contact: the job, the name, what to call about, and a phone link. */
function makeContact(person) {
  const item = el("li", "item");
  item.appendChild(el("p", "item-main", person.role));
  item.appendChild(el("p", "", person.name));
  if (person.about) {
    item.appendChild(el("p", "", person.about));
  }

  /* A "tel:" link starts a phone call when tapped on a phone. It needs digits only. */
  const call = el("a", "call-link", "Call " + person.phone);
  call.href = "tel:" + person.phone.replace(/\D/g, "");
  item.appendChild(call);
  return item;
}

/* ---------- Neighborhood buttons ---------- */

/* The words on the first button, which shows every neighborhood together. */
function allNeighborhoodsName() {
  return SITE_DATA.neighborhoods.length === 2 ? "Both neighborhoods" : "All neighborhoods";
}

/* Makes the first button, then one button for each neighborhood in data.js. */
function makeNeighborhoodButtons() {
  const box = document.getElementById("neighborhood-buttons");
  box.appendChild(makeChoiceButton("all", allNeighborhoodsName()));
  SITE_DATA.neighborhoods.forEach(function (neighborhood) {
    box.appendChild(makeChoiceButton(neighborhood.id, neighborhood.name));
  });
}

function makeChoiceButton(id, name) {
  const button = el("button", "choice", name);
  button.type = "button";
  button.dataset.neighborhood = id;
  button.addEventListener("click", function () {
    chooseNeighborhood(id);
    saveNeighborhood(id);
    setChooserOpen(false, true);   /* fold the buttons away again */
  });
  return button;
}

/* The browser remembers the chosen neighborhood under this name,
   so the choice carries over from one page to the next. */
const SAVED_CHOICE = "rooted-together-neighborhood";

/* Returns what the browser remembers, or nothing (null) if the visitor has not chosen yet. */
function readSavedChoice() {
  try {
    return window.localStorage.getItem(SAVED_CHOICE);
  } catch (error) {
    /* Some browsers block this in private windows. The page still works without it. */
    return null;
  }
}

/* Remembers the visitor's choice for the other pages. */
function saveNeighborhood(id) {
  try {
    window.localStorage.setItem(SAVED_CHOICE, id);
  } catch (error) {
    /* If the browser will not save it, the page still works. */
  }
}

/* Returns the neighborhood chosen on an earlier page, or "all" if there is none. */
function savedNeighborhood() {
  const saved = readSavedChoice();
  const stillExists = SITE_DATA.neighborhoods.some(function (neighborhood) {
    return neighborhood.id === saved;
  });
  return stillExists ? saved : "all";
}

/* On most pages the neighborhood buttons fold away into one line:
   "Showing: Homewood South" and a Change button. This opens or folds them.
   The home page has no Change button, so its buttons always stay open. */
function setChooserOpen(isOpen, moveFocus) {
  const section = document.getElementById("choose");
  const change = document.getElementById("change-button");
  if (!section || !change) {
    return;
  }
  section.classList.toggle("is-open", isOpen);
  change.setAttribute("aria-expanded", isOpen ? "true" : "false");

  /* Keep keyboard users in the right place after the buttons appear or disappear. */
  if (moveFocus && isOpen) {
    const chosen = document.querySelector('.choice[aria-pressed="true"]');
    if (chosen) {
      chosen.focus();
    }
  } else if (moveFocus) {
    change.focus();
  }
}

/* Makes the Change button work. */
function setUpChangeButton() {
  const change = document.getElementById("change-button");
  if (!change) {
    return;
  }
  change.addEventListener("click", function () {
    setChooserOpen(true, true);
  });
}

/* Runs when a visitor taps a neighborhood button, and once when a page opens. */
function chooseNeighborhood(id) {
  const name = id === "all" ? allNeighborhoodsName() : neighborhoodName(id);

  /* Mark the tapped button as chosen and the others as not chosen. */
  document.querySelectorAll(".choice").forEach(function (button) {
    const isChosen = button.dataset.neighborhood === id;
    button.setAttribute("aria-pressed", isChosen ? "true" : "false");
  });

  document.getElementById("showing").textContent = "Showing: " + name;

  /* Redraw every part that depends on the neighborhood.
     On a page without that part, the line does nothing. */
  showProgress(id);
  showSchedule(id);
  showEvents(id);
  showContacts(id);
  showNextEvent(id);
}

/* ---------- Start ---------- */

function start() {
  showTopBar();   /* the menu does not need data.js, so it always appears */

  /* If data.js has a typing mistake, the browser cannot read it.
     Show a clear message instead of an empty page. */
  if (typeof SITE_DATA === "undefined") {
    const warning = el("p", "data-error",
      "The data file could not be read. Open data.js and look for a missing comma, quote mark or bracket.");
    document.querySelector("main").prepend(warning);
    return;
  }

  showSignupCard();
  setSignupLinks();

  /* Each of these fills in one part of a page. On a page without that part, it does nothing. */
  showIntro();
  showPageLinks();
  showActions();
  showAbout();
  showTreeGuide();

  if (document.getElementById("neighborhood-buttons")) {
    /* A page with neighborhood buttons opens on the neighborhood chosen earlier. */
    makeNeighborhoodButtons();
    setUpChangeButton();
    chooseNeighborhood(savedNeighborhood());

    /* A first-time visitor sees the buttons. After a choice, they fold into one line. */
    const hasChosenBefore = readSavedChoice() !== null;
    setChooserOpen(!hasChosenBefore, false);
  }
}

start();
