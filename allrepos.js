// const url="https://github.com/topics/raspberry-pi";
const cheerio = require("cheerio");
const request = require("request");
const repoInfoIssue = require("./issues.js");
const log = console.log;

function topics(url, topic) {
    request(url, cb);
    function cb(err, response, html) {
        if (err)
            log(err);
        else if(response.statusCode==404)
            log("Page not found");
        else {
            extract8repos(html);
        }
    }

    function extract8repos(html) {
        const $ = cheerio.load(html);
        let container = $(".f3.color-fg-muted.text-normal.lh-condensed");
        // log(topic);
        for (let i = 0; i < 10; i++) {
            let anchors = $(container[i]).find("a");
            let reponame=$(anchors[1]).text().trim();
            let repoLink = $(anchors[1]).attr("href");
            repoLink = "https://github.com" + repoLink;
            repoLink = repoLink + "/issues";
            // log(repoLink);
            repoInfoIssue(repoLink, topic, reponame);
        }
        // log("\n");
    }
}


module.exports = {
    topic: topics
}