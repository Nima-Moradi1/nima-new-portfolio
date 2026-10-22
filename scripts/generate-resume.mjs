import { readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

// Derived from the same verified English content as the website. No phone or private data.
const p = JSON.parse(await readFile("src/messages/en/portfolio.json", "utf8"));
const escape = (text) =>
  String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Nima Moradirad - Senior Frontend Engineer</title><style>
@page { size: A4; margin: 13mm 15mm; }
* { box-sizing: border-box; } body { font: 10.5pt/1.35 Arial, sans-serif; color: #1b241d; margin: 0; }
h1 { font-size: 27pt; line-height: 1.1; margin: 0 0 3pt; letter-spacing: -.5pt; } .role { font-size: 14pt; color: #365c16; margin-bottom: 7pt; }
a { color: #25490b; text-decoration: none; } .contact { display: flex; flex-wrap: wrap; gap: 4pt 12pt; font-size: 9pt; margin-bottom: 9pt; }
h2 { font-size: 11pt; margin: 12pt 0 6pt; padding-bottom: 3pt; border-bottom: .6pt solid #b3bcb0; color: #365c16; }
h3 { font-size: 10.5pt; margin: 0; } .job { break-inside: avoid; margin-bottom: 8pt; } .jobHeader { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }
.date { white-space: nowrap; font-size: 9pt; color: #454d42; } .jobRole { margin: 2pt 0 3pt; color: #454d42; font-size: 9.5pt; }
p { margin: 0 0 5pt; } ul { margin: 2pt 0; padding-left: 13pt; } li { margin-bottom: 2pt; }
.skills { display: grid; grid-template-columns: 1fr 1fr; gap: 4pt 16pt; font-size: 9.5pt; } .project { margin-bottom: 5pt; break-inside: avoid; font-size: 9.5pt; }
.education { font-size: 9.5pt; } .foot { margin-top: 9pt; font-size: 9pt; color: #454d42; }
</style></head><body>
<h1>${escape(p.identity.name)}</h1><div class="role">${escape(p.identity.role)}</div>
<div class="contact"><a href="mailto:${escape(p.identity.email)}">${escape(p.identity.email)}</a><a href="https://nimamoradirad.com">nimamoradirad.com</a><a href="${p.socialLinks[0].href}">LinkedIn: nima-moradi-rad-1380s</a><a href="${p.socialLinks[1].href}">GitHub: Nima-Moradi1</a></div>
<p>${escape(p.identity.intro)}</p>
<h2>Professional experience</h2>
${p.experience.map((job) => `<div class="job"><div class="jobHeader"><h3>${escape(job.company)}</h3><span class="date">${escape(job.period)}</span></div><div class="jobRole">${escape(job.role)}</div><ul>${job.highlights.map((h) => `<li>${escape(h)}</li>`).join("")}</ul></div>`).join("")}
<h2>Skills</h2><div class="skills">${p.capabilities.map((group) => `<div><strong>${escape(group.title)}</strong><br>${group.skills.map(escape).join(", ")}</div>`).join("")}</div>
<h2>Selected independent projects</h2>
${[p.projects[1], p.projects[2], p.projects[3]].map((project) => `<div class="project"><strong><a href="https://nimamoradirad.com${project.href}">${escape(project.title)}</a></strong> - ${escape(project.summary)} <span>${project.technologies.map(escape).join(", ")}.</span></div>`).join("")}
<h2>Education and languages</h2><div class="education"><p><strong>${escape(p.education.title)}</strong>, ${escape(p.education.institution)}. ${escape(p.education.note)}</p><p>${p.education.languages.map(escape).join(" | ")}</p></div>
<p class="foot">${escape(p.identity.availability)}</p>
</body></html>`;
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({
    path: "public/nima-moradirad-resume.pdf",
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
  });
} finally {
  await browser.close();
}
