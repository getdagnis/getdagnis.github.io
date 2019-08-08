function showDiv(thisId) {
    document.getElementById(thisId).style.display = "block";
    let newHref = "javascript:closeTable('" + thisId + "');";
    document.getElementsByClassName(thisId)[0].setAttribute('href', newHref);
}

function closeTable() {
    document.getElementById('table').style.display = "none";
    let newHref = "javascript:showDiv('table');";
    document.getElementsByClassName('table')[0].setAttribute('href', newHref);
}