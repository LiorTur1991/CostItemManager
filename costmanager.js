window.costManager = {};

window.costManager.footerText = "Created by Natan Kaspy and Lior Turgeman";


window.costManager.getCostItem = function(title, description, date, price, note){
    let costItem = {};
    costItem.title = title;
    costItem.description = description;
    costItem.date = date;
    costItem.price = price;
    costItem.note = note;
    return costItem;
}

window.costManager.addItem = function(ob) {
    let data = costManager.getItems();
    data.push(ob)
    let dataString = JSON.stringify(data);
    localStorage.setItem("data", dataString);
};
window.costManager.getItems = function() {
    let data = localStorage.getItem("data");
    if(data)
        return JSON.parse(data);
    else {
        data = [];
        return data;
    }
}

window.costManager.getCostsPerMonth = function(monthNumber) {
    let data = localStorage.getItem("data");
    let vec = JSON.parse(data);
    let result = [];
    if(monthNumber < 0){
        vec.forEach(
            function (ob) {
                result.push(ob);
            });
        return result;
    }
    vec.forEach(
        function (ob) {
            let obDateFormat = new Date(ob.date);
            if(obDateFormat.getMonth() === monthNumber)
                result.push(ob);
    });
    return result;
}
window.costManager.updateListView = function(items){
    let itemsList = "<ul data-role='listview' id='list'>";
    items.forEach(
        function (ob) {
            itemsList+= "<li data-role='collapsible'>";
            itemsList+= "<h3>" + ob.title + "</h3>";
            itemsList+= "<p>" + ob.description + "</p>";
            itemsList+= "<p><strong>" + ob.date + "</strong></p>";
            itemsList+= "</li>";
        });
    itemsList+= "</ul>";
    $("#list").html(itemsList);
    $("#list").trigger('create');
}
