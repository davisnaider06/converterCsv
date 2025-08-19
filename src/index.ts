import * as fs from "fs";
import csv from "csv-parser";

function capitalizeFirstLetter(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function lerCsv() {
  const results: string[] = [];

  fs.createReadStream("src/nomes.csv")
    .pipe(
      csv({
        headers: ["nome"],
        skipLines: 0,   
      })
    )
    .on("data", (data) => {
      if (data.nome) {
        results.push(capitalizeFirstLetter(data.nome));
      }
    })
    .on("end", () => {
      results.forEach((nome) => console.log(nome));
    });
}

lerCsv();
