
var infoMap = [];
var coords = [];
var currentSlide = 0;
var topChart, barChart, lineChart;
//var dataPass=[];
async function init() {
initInfoMap();
 

    var medalsData = await d3.csv("https://raw.githubusercontent.com/VenkyDataScientist/DV_NarrViz/main/resources/data/CSV-medals-History.csv");
    const CountryName = await d3.csv("https://raw.githubusercontent.com/VenkyDataScientist/DV_NarrViz/main/resources/data/noc_regions.csv");

    medalsData.map( record => {
        let r = record;
        var dataVal;
        dataVal = [];
        dataVal = CountryName.filter( function(b){
            return b.NOC.trim() === r.Country.trim();
        } );
        if(dataVal.length > 0)
            r['CountryName'] = dataVal[0]['region'];
        else
           r['CountryName'] = ""    
        return r
      })

      const dataVal = medalsData;

    chartHeight = 600;
    var lineChartmargin = {top: 40, right: 30, bottom: 40, left: 30};
    var chartHeight = chartHeight - lineChartmargin.top - lineChartmargin.bottom;
    

    var lineChartWidth = document.getElementById("linechart").offsetWidth - lineChartmargin.left - lineChartmargin.right ;

    lineChart = new LineChart(lineChartWidth , chartHeight , dataVal , lineChartmargin);
 
    sceneTrig(0);
}

function update(dateStartIncl , dateEndIncl){
    lineChart.updateScene(dateStartIncl, dateEndIncl);
}

function  prevTrig()
{
    clearAnnotation();
    console.log("currentSlide:" + currentSlide);
    //console.log("currentSlide det:" + coords[currentSlide]);
    currentSlide = currentSlide - 1;
    currentValue = coords[currentSlide].date;//xsl(timeParse(coords[currentSlide].date));
    update(coords[currentSlide].x , coords[currentSlide].date );
    //update(timeParse(coords[currentSlide].date));
    infoUpdate(currentSlide);
    annotate();
    toggleSceneBtns();
}
function  nextTrig()
{
    if (++currentSlide < coords.length) {
       // navTimer = setInterval(moveForward, 50);
    } else {
        currentSlide = coords.length - 1;
        annotate();
        //document.getElementById("next-button").disabled = true;
    }
    //annotate();
    toggleSceneBtns();
    infoUpdate(currentSlide);
}

function sceneTrig(num)
{
   sceneNum = num;
   clearAnnotation();
   console.log("Scenbutton selected: " + num);
  
   if (currentSlide < num) {
       currentSlide = num;
       update(coords[currentSlide].x , coords[currentSlide].date);
       annotate();
       //navTimer = setInterval(moveForward, 50);
   } else {
       currentSlide = num;
       update(coords[currentSlide].x , coords[currentSlide].date);
       annotate();
   }
   toggleSceneBtns();
   infoUpdate(currentSlide);

}

function infoUpdate() {

    d3.select("#infoScene")
        .html(infoMap[currentSlide].data);
    
}
//Disable this Button and Enable Other Button
function toggleSceneBtns() {
    //console.log("currentSlide:" + currentSlide + " maxSlides:" + coords.length);
    for (var i = 0; i < coords.length; i++) {
        //console.log("toggleSceneBtns -- page_" +  i );
        document.getElementById("page_" + i).disabled = false;
    }
    document.getElementById("page_" + currentSlide).disabled = true;

    if (currentSlide >= coords.length - 1) {
        document.getElementById("next_Button").disabled = true;
    } else {
        document.getElementById("next_Button").disabled = false;
    }

    if (currentSlide > 0 && currentSlide <= coords.length - 1) {
        document.getElementById("prev_Button").disabled = false;
    } else {
        document.getElementById("prev_Button").disabled = true;
    }
}
function annotate() {

}
function clearAnnotation() {

}

function initInfoMap() {
    infoMap = [];
    infoMap.push({
        "data": "<h4>Olympics History</h4><p>The Ancient Olympic Games were religious and athletic festivals held every four years at the sanctuary of Zeus in Olympia, Greece. The games spanned over 1150 years from 776 BC to 393 AD. Various uses of the term \"Olympic\" to describe athletic events in the modern era have been documented since the 17th century. The first such event near Chipping Campden, England involving various sports.</p>" +
            "<h4>Modern Olympics</h4><p>The official modern Olympics took over 1500 years to arrive from the original ones. The first modern Olympics was held in Athens, Greece in 1896 under the auspices of IOC. USA, Great Britian, Germany and Italy were the major players.</p>"
    });
    infoMap.push({
        "data": "<h4>1920s </h4><p>The Olympics was held again in 1920 after the World War I; Olympic Oath was first introduced in 1920. The idea of the Olympic torch or Olympic Flame was first inaugurated in the 1928 Olympic Games in Amsterdam, Netherlands.</p>" +
            "<h4>US Dominance from Early On </h4><p>The United States won  most gold and overall medals in the 1920s.</p>"
    });
    infoMap.push({
        "data": "<h4>Television in the Games </h4><p>The 1936 Summer Olympics in Berlin were the first Games to be broadcast on television, though only to local audiences. The broadcasting rights for the 1960 Winter Games in California were sold for the first time to specialised television broadcasting networks - CBS paid US$394,000 for the rights. Ever since the prices increased multiple fold, with the highest being a $4.38 billion contract between NBC and IOC to broadcast the Olympics through the 2020 Games</p>" +
            "<h4>Second World War </h4><p>World War 2 caused the cancelation of the Olympic games in 1940 and 1944. USA maintained its dominance before the war.</p>"
    });
    infoMap.push({
        "data": "<h4>Post World War II </h4><p> The post World War II Olympiad was held in London in 1948 with a few post-war modifications. Japan and Germany, the aggressors of WWII, were not invited to compete. The Soviet Union, though invited, declined to participate. USA continues to dominate the medal counts, while the number of medals won by Great Britain continues to decline.</p>" +
            "<h4>New Records </h4><p>At the 1972 Summer Olympics American Mark Spitz won seven Olympic gold medals in water sports. Furthermore, Spitz set a new world record in each of the seven events, a record at that time. </p>"
    });
    infoMap.push({
        "data": "<h4>Olympic Boycotts </h4><p> The 1976 Montreal Games were marred by an African boycott involving 22 countries. It was one of the priciest games till that point and the games left the city with a C$1.6bn debt.</p>" +
            "<h4>Cold War Effects</h4> <p>At the peak of Cold War, intense rivalry that existed between USA and the Soviet Union spilled over to the games as well, with both countries claiming the most medals in the Olympic games in the period. Western countries boycotted the Moscow Olympics 1980 while the Soviet Union and allied nations boycotted Los Angeles Olympics in 1984.</p>"
    });
    infoMap.push({
        "data": "<h4>New Players in the World Scene </h4><p>New players have emerged in the Olympics, with East Asian countries starting to dominate the Olympics. China, for instance, won the most number of gold medals in the 2008 Summer Olympics displacing USA, a traditional medal topper, to position #2. </p>" +
            "<h4> USA Returns </h4><p> However, USA bounced back in 2012 and has been #1 in the medal count in the all the Olympics till date. </p>"
    });

    coords.push({
        "x": "1896",
        "date": "1916",
        "y": 1,
        "ax": 50,
        "ay": -150,
        "text": "1st Confirmed Case in the US",
        "textx": 0,
        "texty": 0
    });
    coords.push({
        "x": "1920",
        "date": "1928",
        "y": 1,
        "ax": 90,
        "ay": -150,
        "text": "1st death in the US",
        "textx": 0,
        "texty": 0
    });
    coords.push({
        "x": "1936",
        "date": "1948",
        "y": 351,
        "ax": 90,
        "ay": -150,
        "text": "National Emergency declared",
        "textx": 0,
        "texty": 0,
        "bartext": "NY - Epicenter of the Pandemic",
        "state": "New York",
        "cases": 33117,
    });
    coords.push({
        "x": "1949",
        "date": "1972",
        "y": 4928,
        "ax": 90,
        "ay": -150,
        "text": "Max deaths in one day",
        "textx": 0,
        "texty": 0
    });
    coords.push({
        "x": "1976",
        "date": "1992",
        "y": 19807,
        "ax": 50,
        "ay": -150,
        "text": "Stay-at-home order lifted",
        "textx": 0,
        "texty": 0
    });
    coords.push({
        "x": "1996",
        "date": "2012",
        "y": 78427,
        "ax": -150,
        "ay": 50,
        "text": "Max cases in one day",
        "textx": -100,
        "texty": 20,
        "state": "California",
        "cases": 487855,
        "bartext": "California becomes the most infected state"
    });
}

