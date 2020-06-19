let fs = require("fs");
let puppeteer = require("puppeteer")
let credentialsFile = process.argv[2];
(async function () {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    login = credentials.login;
    email = credentials.email;
    pwd = credentials.pwd;
    content=credentials.content;
    content2 = credentials.content2;
    // starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });
    
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    
    await tab.goto(login, {
        waitUntil: "networkidle2"
    });
    await tab.waitForSelector("#email");
    await tab.type("#email", email, { delay: 100 });
    await tab.waitForSelector("#password");
    await tab.type("#password", pwd, { delay: 100 });
    await tab.waitForSelector("#login_submit");
    await tab.click("#login_submit");
    

    await tab.waitForSelector("#internships_new_superscript");
    await tab.click("internships_new_superscript");

    //SELECTING CONTENT WRITING

    await tab.waitForSelector(".heading_4_5.profile");
    let lengthofcont=await tab.$$(".heading_4_5.profile");

    /////**TO CHECK LENGTH OF THE CSS SELECTOR */
    //console.log(lengthofcont.length);
    //***************************************** */

    //SELECT FIRST ELEMENT
    await lengthofcont[1].click();

    await tab.waitForSelector(".btn.btn-large");
    await tab.click(".btn.btn-large");
    await tab.waitForSelector(".btn.btn-primary.education_incomplete");
    await tab.click(".btn.btn-primary.education_incomplete");

    ///CONTENT TYPING "WHY SHOULD WE HIRE YOU"
    await tab.waitForSelector("#cover_letter");
    await tab.type("#cover_letter",content,{delay:100});

    //CONTENT TYPING "ARE YOU AVAILABLE FOR THIS INTERNSHIP"
    await tab.waitForSelector("#text_1205352");
    await tab.type("#text_1205352",content2,{delay : 100});

    //SUBMITING THE FORM
    await tab.waitForSelector("#submit");
    await tab.click("#submit");

    
})()
