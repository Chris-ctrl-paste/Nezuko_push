const puppeteer = require('puppeteer');

const getMangaListOfChapters = async(manga_url, mangaReadingList) => {
    const browser = await puppeteer.launch({
		headless: false
	  });
     console.log(mangaReadingList)
    const page = await browser.newPage();

    let result = [];

    for(const manga of mangaReadingList) {
		const chapters = await getChapters(page, manga_url, manga.url_ends_with);
        result.push({
            "name": manga.url_ends_with,
            chapters
        })
        
    }
  
    await page.close();
    await browser.close();
    
    return result;
}

const getChapters = async(page, manga_url, mangaTitle) => {
    await page.goto(`${manga_url}/${mangaTitle}`);
    console.log(mangaTitle)
    const getXpath = await getMangaChaptersElement(page);
    const getMsg = await page.evaluate(name => name.innerText, getXpath);
    return getMsg.split("\n");
}

const getMangaChaptersElement = async(page) => {
    // const selector = "/html/body/div[1]/div[3]/div[1]/div[3]/ul/li[1]";  --- https://readmanganato.com/
    const selector = "/html/body/div[1]/div/div[1]/div/div[2]/div/div/div/div[1]/div/div[1]/div/div[4]/div/ul/li[1]"; //https://manhwachill.com/
    await page.waitForXPath(selector);
    const [getXpath] = await page.$x(selector);
    return getXpath;
    
}

module.exports = {
    getMangaListOfChapters
}