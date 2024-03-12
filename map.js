

document.addEventListener('DOMContentLoaded', event => {
    console.log("here's map")
    parsePlacesCSV();

})

function determineTab(option){
    let tab = "";
    if (option == "beaches") {
        tab="tab-2853"
    } else if (option == "restaurants") {
        tab="tab-22fc"
    } else if (option == "hiking") {
        tab="tab-330e"
    } else if (option == "rentals") {
        tab="tab-4627"
    } else if (option == "shopping") {
        tab="tab-27fc"
    } else if ((option == "culture-events") || (option == "culture events") || (option == "culture")) {
        tab="tab-1f6b"
    } else if (option == "hotels") {
        tab="tab-45ef"
    } else if ((option == "nature-reserves") || (option == "nature reserves") || (option == "nature")) {
        tab="tab-45ea"
    } else if (option == "favorites") {
        tab="tab-45eb"
    } else {
        tab="tab-e3fa"
    }
    // console.log("determine tab:", option, tab)
    return tab;
}

function pickTab(option = "") {
    let tab = determineTab(option);
    
    let l = document.getElementById('link-' + tab);
    let t = document.getElementById(tab);
    //console.log("your tab is", t)
    // t.addEventListener('click', e => {
    //     console.log("clicked!", e)
    // })
//    t.click();

    // const clickEvent = new MouseEvent('click', {
    //     bubbles: true,
    //     cancelable: true,
    //     view: window,
    //     isTrusted: true

    // });
    // t.dispatchEvent(clickEvent);
    l.ariaSelected = 'true'
    l.classList.add('active')
    t.classList.add('u-tab-active')
    // t.ariaSelected("true")
    // console.log("your tab is now", t)

    //document.getElementById("link-tab-22fc").click();

    // document.getElementsByName("filled-heart")
    
}

let places

async function parsePlacesCSV(){
    const csvUrl = 'places.txt';
    
    try {
        // Fetch the CSV file
        const response = await fetch(csvUrl);
        const csvData = await response.text();

        const rows = csvData.split('\n');
        // console.log("rows", rows)

        let data = []
        for (let r = 1; r < rows.length-1; r++) {
            let cols = rows[r].split(',')

            let cleanCols = []
            cols.forEach(item => {
                // console.log("no please",item)
                // item = item.trim()
                // if(item.search('%%%') > -1){

                    // console.log("before", item)
                    item = item.replaceAll('%%%',',')
                    // console.log("after", item)
                    cleanCols.push(item)
                // }
            })
            //console.log("now doing", cols);
            data.push(cleanCols);
        }
        // console.log(data)

        places = data;
    
        // console.log("here is your places:", csvData)
        
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
    }

    let content = document.getElementById("content")
    let html = displayPlaces();
    // console.log("and the winnder is", html)
    content.innerHTML = html;




    const queryString = window.location.search;
    console.log("query", queryString)
    const urlParams = new URLSearchParams(queryString);

    const tab = urlParams.get('tab')
    console.log("tab", tab);

    pickTab(tab);

    let images = []
    images = document.getElementsByClassName("image");
    console.log("heres images:", images)    
    let url = window.location.origin;
    console.log("url", url)  
    let img1 = url + "/traveltaniti/2107845.png";
    let img2 = url + "/traveltaniti/6521659.png"

    console.log("HEYY", url, img1, img2)
    for (let image of images){

        image.addEventListener('click', event => {
            console.log("image", image, event)
            let id = image.id;
            // image.src = (image.src === img1)? img2 : img1;
            if (image.src ===img1) {
                image.src = img2;
                addToFavs(id)
            } else {
                image.src = img1;
                removeFromFavs(id)
            }
        })
    }



   
    let rows = document.getElementsByClassName("row-select");

    for (let row of rows) {
        row.addEventListener('mouseover', function() {
            // Change color on mouse hover
            this.style.backgroundColor = 'lightblue';
        });
    
        row.addEventListener('mouseout', function() {
            // Restore original color on mouse out
            this.style.backgroundColor = '';
        });
    
        row.addEventListener('click', function(event) {
            // Check if the click event originated from an interactive element inside the row
            let clickedItem = event.target.tagName.toLowerCase();
            console.log("you clicked", clickedItem)
            if ((clickedItem !== 'img') && (clickedItem !== 'a')) {
                // Remove 'selected' class from all rows
                for (let otherRow of rows) {
                    if (otherRow !== row) {
                        otherRow.classList.remove('selected');

                    }
                }


                let id = row.id.substring(4).trim()
                console.log("places", places)


                // Example usage: Search for rows where the name (column 0) is 'Alice'
                let searchResult = searchByColumn(places, 8, id);

                console.log(id, searchResult[6]);
                let mapURL = searchResult[6];
                let map = document.getElementById("map-src")
                let zoom = 10;
                map.src = mapURL + "&z=" + zoom;
                // Add 'selected' class to the clicked row
                row.classList.add('selected');
    
                // Scroll to the top of the page with animation
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    
    

}

// Function to search and filter based on a specific column
function searchByColumn(arr, columnIndex, searchString) {
    let found = arr.filter(row => {
        console.log(searchString ,row[columnIndex])
        if(row[columnIndex].includes(searchString)) {
            console.log("match")
            return true;
        } else {

            return false;
        }

    })
    console.log("found", found[0])
    return found[0];
}

function displayPlaces() {
    const orgPlaces = {
        beaches: [],
        restaurants: [],
        hiking: [],
        rentals: [],
        shopping: [],
        culture: [],
        hotels: [],
        nature: [],
        favorites: [],
        popular: []
    };

    // const typeMapping = {
    //     beaches: 'beaches',
    //     restaurants: 'restaurants',
    //     hiking: 'hiking',
    //     rentals: 'rentals',
    //     shopping: 'shopping',
    //     culture: 'culture',
    //     hotels: 'hotels',
    //     nature: 'nature',
    //     popular: 'popular'
    // };

    places.forEach(place => {
        const type = place[7].trim();
        // const orgType = typeMapping[type];
        // console.log("watch out", type, type.length,orgPlaces[type], place)
        orgPlaces[type].push(place);
    });

    let html = ''//'<div class="u-tab-content">';

    Object.entries(orgPlaces).forEach(([type, placesArray], num) => {
        const tab = determineTab(type);
        // console.log("object", type, orgPlaces[type])
        html += getSingleTabContentHTML(orgPlaces[type], tab, num+1);
    });

    // html += '</div>';

    return html;
}

function addToFavs(id) {
    console.log("clicked!", id)
}

function removeFromFavs(id){

}

function updateFavsCount(){

}

function getTableHeaderHTML(){
    let html = `<colgroup>
    <col width="5%" />
    <col width="10%" />
    <col width="11%" />
    <col width="44%" />
    <col width="15%" />
    <col width="15%" />
  </colgroup>
  <thead class="u-custom-font u-font-ubuntu u-table-header">
    <tr style="height: 40px">
      <th class="u-table-cell"></th>
      <th class="u-table-cell">        
        <span class="u-file-icon u-icon"
        ><img src="7693521.png" alt="" /></span
        >Rating
      </th>
      <th class="u-table-cell">        
        <span class="u-file-icon u-icon"
        ><img src="7693521.png" alt="" /></span
        >Cost
      </th>

      <th class="u-table-cell u-table-cell-4">
        <span class="u-file-icon u-icon"
          ><img src="7693521.png" alt="" /></span
        >Alphabetical
      </th>
      <th class="u-table-cell u-table-cell-5">Address</th>
      <th class="u-table-cell u-table-cell-6">Phone</th>
    </tr>
  </thead>`;


    return html;
}

function getRowHTML(row){
    // console.log("getting row", row)
    let heart = "/traveltaniti/6521659.png"
    console.log("row is tttt", row[7])
    if(row[7] == "favorites"){
        heart = "/traveltaniti/2107845.png"
    }

    let html = `<tr style="height: 118px"
    class="row-select"
    id='row-` + row[8] + `'>
    <td class="u-border-2 u-border-grey-30 u-border-no-left u-border-no-right u-table-cell">
    <span class="u-file-icon u-icon u-icon-9">
    <img
      id="img-` + row[8] + `"
        class="image"
      src=` + heart + `
      alt="">
    </span>
    </td>
    <td
    class="u-border-2 u-border-grey-30 u-border-no-left u-border-no-right u-table-cell">
    <span class="u-file-icon u-icon u-icon-3">
    <img src="7656139.png" alt="" ><span style="font-size: 25px">
    ` + row[0] + `</span></span>
    </td>
    <td class="u-border-2 u-border-grey-30 u-border-no-left u-border-no-right u-table-cell">`

    let dollar = "";

    if (row[1] == 0) {
        dollar = "<span>FREE</span>";
    } else {
        for (let i = 0; i < row[1]; i++){
            dollar +=`<span class="u-file-icon u-icon u-icon-8"
            ><img src="2150150.png" alt=""
          ></span>`
        }
    }
    html += dollar + '</td>';

    html += `<td class="u-border-2 u-border-grey-30 u-border-no-left u-border-no-right u-table-cell">
    <a
      class="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
      style="font-weight: 700; font-size:24px;"
    >
      ` + row[2] + `</a>
      <br><span style="font-size:16px;line-height: 1;">` + row[3] + `</span>
  </td>
  <td
  class="u-border-2 u-border-grey-30 u-border-no-left u-border-no-right u-table-cell u-table-cell-11"
  style="font-size:16px;">` + row[4] + `</td> <td
class="u-border-2 u-border-grey-30 u-border-no-left u-border-no-right u-table-cell u-table-cell-12"
style="font-size:16px;">
<a href="tel:` + row[5] + `">` + row[5] + `</a></td>
</tr>`;

    return html;
}

function getSingleTabContentHTML(rows, tabID, num) {
    console.log("get single content", rows, tabID, num)
    let html = `<div
    class="u-container-style u-tab-pane"
    id="` + tabID + `" role="tabpanel"
    aria-labelledby="link-` + tabID + `">`

    html += `<div class="u-container-layout u-container-layout-` + num + `">
    <div class="u-table u-table-responsive u-table-` + num + `">
      <table class="u-table-entity">`

    html += getTableHeaderHTML();

    for (let row = 0; row < rows.length; row++) {
        html += getRowHTML(rows[row]);
    }

    if(rows[0][7] == "favorites"){
        html += `<tr style="height: 100px">
        <td colspan="8" style="text-align: center;">
        <i>Heart additional places to see them here in your favorites!</i>
        </td>
        </tr>`
    }

    html += `</table>
    </div></div></div>`;

    return html;
}
