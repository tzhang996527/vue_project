function f(x){
    console.log(x);
}


function Dateformat(row, column, cellValue, index) {
    if (cellValue !== "" && cellValue !== null){

      if(typeof(cellValue) == "string"){
        var d = new Date(cellValue);
        return d.toLocaleString()
      }else{
        return cellValue.toLocaleString();
      }
    }
    // return cellValue.toLocaleTimeString();
  }
export {
    f,
    Dateformat
};