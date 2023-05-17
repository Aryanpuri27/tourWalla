const fs = require("fs");

const card = fs.readFileSync(`${__dirname}/../static/card.pug`, "utf-8");
const index = fs.readFileSync(`${__dirname}/../static/index.pug`, "utf-8");
const form = fs.readFileSync(`${__dirname}/../static/create.pug`, "utf-8");
const data = fs.readFileSync(
  `${__dirname}/../dev-data/data/tours-simple.json`,
  "utf-8"
);
const newdata = JSON.parse(data);

function replace(card, data) {
  //   console.log(card);
  let newcard = card.replace("{%NAME%}", data.name);
  newcard = newcard.replace("{%RATING%}", data.ratingsAverage);
  newcard = newcard.replace("{%DURATION%}", data.duration);
  newcard = newcard.replace("{%SUMMARY%}", data.summary);
  newcard = newcard.replace(/{%IMAGE%}/g, data.imageCover);
  //   console.log(newcard);
  //   console.log("**************************************");
  return newcard;
}

exports.getTours = (req, res) => {
  let cardsss = " ";
  let cards = newdata.forEach((element) => {
    cardsss = cardsss + replace(card, element);
  });
  //   console.log(cards);
  //   console.log(cardsss);
  let final = index.replace("{%CARD%}", cardsss);
  fs.writeFileSync("/home/aryan/nodejs/project/views/final.pug", final);
  res.status(200).render("/home/aryan/nodejs/project/views/final.pug");
};

exports.createTourForm = (req, res) => {
  let final = index.replace("{%CARD%}", form);
  fs.writeFileSync("/home/aryan/nodejs/project/views/finalform.pug", final);
  res.status(200).render("/home/aryan/nodejs/project/views/finalform.pug");
};

exports.submitform = (req, res) => {
  console.log(req.body);

  let final = newdata.concat(req.body);
  let finalll = JSON.stringify(final);
  console.log(final);
  fs.writeFileSync(
    "/home/aryan/nodejs/project/dev-data/data/tours-simple.json",
    finalll
  );
  res.status(200).redirect("http://127.0.0.1:3500/api/v1/tours");
};
