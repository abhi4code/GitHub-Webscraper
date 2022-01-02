// const url = "https://github.com/home-assistant/core";
// const { is } = require("cheerio/lib/api/traversing");

const cheerio = require("cheerio");
const request = require("request");
const path = require("path");
const fs = require("fs");
const PDFDocument = require('pdfkit');
const log = console.log;

function repoInfoIssue(url, topic, reponame) {
    request(url, cb);
    function cb(err, response, html) {
        if (err)
            log(err);
        else if(response.statusCode==404)
            log("Page not found");
        else {
            // log(html);
            extractAllIssues(html);
        }
    }


    // function gotoIssues(html) {
    //     const $ = cheerio.load(html);
    //     let issuesEle = $("#issues-tab");
    //     let issueanchor = $(issuesEle[0]).attr("href");
    //     issueanchor = "https://github.com" + issueanchor;
    //     // log(issueLink);
    //     request(issueanchor, function (err, response, data) {
    //         if (err)
    //             log(err);
    //         else {
    //             extractAllIssues(data);
    //         }
    //     });
    // }

    function extractAllIssues(data) {
        const $ = cheerio.load(data);
        let issueEle = $(".Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item.js-issue-row [data-hovercard-type='issue']");
        let arr=[];
        for (let i = 0; i < issueEle.length; i++) {
            let issueLink = $(issueEle[i]).attr("href");
            issueLink="https://github.com"+issueLink;
            // log(issueLink);
            arr.push(issueLink);
            // processIssues(issueLink, topic, reponame);
        }
        let topicPath = path.join(__dirname,topic);
        dirCreator(topicPath);

        //for json
        // let repoPath = path.join(topicPath,reponame+".json");
        // fs.writeFileSync(repoPath,JSON.stringify(arr));

        //for pdf
        let repoPath = path.join(topicPath,reponame+".pdf");
        let pdfdoc = new PDFDocument();
        // let issueText=JSON.stringify(arr);
        pdfdoc.pipe(fs.createWriteStream(repoPath));
        pdfdoc
        .fillColor('red')
        .list(arr);
        // .text(issueText);
        pdfdoc.end();
    }
}


function dirCreator(filepath) {
    if(fs.existsSync(filepath)==false) {
        fs.mkdirSync(filepath);
    }
}

module.exports = repoInfoIssue

// function processIssues(issueLink, topic, reponame) {
//     let topicPath = path.join(__dirname,topic);
//     dirCreator(topicPath);
//     let repoPath = path.join(topicPath,reponame+".json");
//     let content=jsonRead(repoPath);
//     let obj={
//         issueLink
//     }
//     content.push(obj);
//     let stringData = JSON.stringify(content)
//     fs.writeFileSync(repoPath,stringData);
// }
// function jsonRead(repoPath) {
//     if(fs.existsSync(repoPath)==false) {
//         return [];
//     }
//     let data=require(repoPath);
//     return data;
// }
