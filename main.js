const url = "https://github.com/topics";
const cheerio = require("cheerio");
const request = require("request");
const topicsObj = require("./allrepos.js");
const log=console.log;

request(url,cb);
function cb(err,response,html) {
    if (err)
        log(err);
    else if(response.statusCode==404)
        log("Page not found");
    else {
        extract(html);
    }
}

function extract(html) {
    const $=cheerio.load(html);
    let topicsEle = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0; i<topicsEle.length; i++) {
        let topic=$(topicsEle[i]).find("p");
        topic =$(topic[0]).text().trim();
        // log(topic);
        let link =$(topicsEle[i]).attr("href");
        link="https://github.com"+link;
        // log(link,"\n");
        topicsObj.topic(link,topic);
    }
}