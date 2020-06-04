class FormatClass {
    constructor(){
        this.abc = "233";
    }
    formatTime(dates){
        let date = new Date(dates);
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    }
}
module.exports = FormatClass;