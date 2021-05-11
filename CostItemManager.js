window.todo = {};

window.todo.CostItem = function(date ,description,note){
    let costItem;
    costItem.Date = date;
    costItem.description = description;
    costItem.note = note;
    return costItem;
}

window.todo.addItem = function(ob) {
    var data = todo.getItems();
    if(data == null)
        data = [];
    data.push(ob)
    let dataString = JSON.stringify(data);
    localStorage.setItem("data", dataString);
};
window.todo.getItems = function() {
    var data = localStorage.getItem("data");
    if(data) return JSON.parse(data);
}