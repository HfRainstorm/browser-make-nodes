import rangy from "rangy";
import TurndownService from "turndown";
import { html2md } from "./html2md";

function getMarkStr() {
  var date = new Date().toISOString().slice(0, 19);
  var title = document.title;
  var url = window.location.href;
  var host = window.location.host;
  var defaultNoteFormat = `## [{title}]({url})
    *Maked from
        host:{host} 
        create date: {date}.
        tags: {tags}*


    {clip}`;

  var noteFormat = defaultNoteFormat;
  var sel = rangy.getSelection().toHtml();
  var turndownService = new TurndownService();
  var selection = turndownService.turndown(sel);
  // var selection = html2md(sel);
  var tags = "[by browser make nodes]";
  // var imageReg = ;

  var matches = [...selection.matchAll(/\!\[.*\]\((.*)\)/g)];

  var imageLinks = [];

  for (let i = 0; i < matches.length; i++) {
    imageLinks.push(matches[i][1]);
  }

  noteFormat = noteFormat.replace("{clip}", selection);
  noteFormat = noteFormat.replace("{date}", date);
  noteFormat = noteFormat.replace("{url}", url);
  noteFormat = noteFormat.replace("{title}", title);
  noteFormat = noteFormat.replace("{host}", host);
  noteFormat = noteFormat.replace("{tags}", tags);

  let bookmark = {
    text: noteFormat,
    htmlstr: sel,
    id: generateUUID(),
    name: dateString() + title,
    title: title,
    href: window.location.href,
    imageLinks: imageLinks,
  };
  //   fetch("http://localhost:43110/new", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(bookmark),
  //   });

  return bookmark;
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function dateString() {
  let rawDate = new Date();
  let filename =
    "" +
    rawDate.getFullYear() +
    (rawDate.getMonth() + 1) +
    rawDate.getDate() +
    rawDate.getHours() +
    rawDate.getMinutes() +
    "  ";
  return filename;
}

export { getMarkStr };
