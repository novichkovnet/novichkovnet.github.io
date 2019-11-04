var h_barchart = function(){

this.testdata = [
  {title:"Двенадцать" , number:12 },
  {title:"Этот огромный-огромный текст типа" , number:5 },
  {title:"Обязательно проверить" , number:7 },
  {title:"При изложении статистики сновидений возможна и такая длина строки, кто знает, что там людям снится" , number:11 }
];
//console.log(this.testdata);
this.data = [];
this.scale = d3.scaleLinear;
this.getNum = function(d){return d["number"]};
this.getString = function(d){return d.title};
this.where = "#chart";
this.testrun = function(){
  var me = this;
  me.data = me.testdata;
  me.init();
}


this.makefixfunction = function() {
    //console.log("making fix");
    var me = this;
    return function() {
        //console.log("made function")
        var cont = d3.select(me.where);
        //clear added styling
        cont.selectAll("div.bc_label")
          .style("padding-top" , "0px");
        //gather all heights
        var hgts = [];
        cont.selectAll("div.bc_label").each(function(d) {
          hgts.push(d3.select(this).node().offsetHeight)
        });
        //choose the max one
        var maxh = d3.max(hgts);
        //set all to it
        cont.selectAll("div.bc_label")
          .style("padding-top", function(d) {
              var r = maxh - d3.select(this).node().offsetHeight;
              return r + "px";
            });
          };
  }
//
//d3.select("body").on("resize",  this.makefixfunction() ); //doesn't work
window.addEventListener('resize', this.makefixfunction(), true);

this.setup = function(data, strname , numname){
  this.data = d;
  this.setfields(strname , numname);
  this.init();
  }

this.setfields = function(strname , numname){
  this.getString = function(d){return d[strname]};
  this.getNum = function(d){return d[numname]};
  }


this.init = function(){
  var me = this;
  //sort
  me.data.sort(function(a,b){
    return me.getNum(a)<=me.getNum(b);
  });
  //scale bars
  var barscale = d3.scaleLinear()
     .domain([0, d3.max(me.data, me.getNum)])
     .range([0,100]);
  //draw
  var cont = d3.select(me.where);
  //console.log(me.testdata);

  cont.selectAll("div")
    .data(me.data)
    .enter()
    .append("div")
    .classed("item", true);

  //text labels
  cont.selectAll("div.item")
    .append("div")
    .classed("bc_label", true)
    .text( function(d){ return me.getString(d); });

  //numbers labels
  cont.selectAll("div.item")
    .append("div")
    .classed("bc_number" , true)
    .text(function(d){return me.getNum(d);});
  //bars
  cont.selectAll("div.item")
     .append("div")
     .classed("bar_container" , true)
     .append("div")
     .classed("the_bar" , true)
     .style("width" , function(d){return barscale(me.getNum(d))+"%" } );
 //clear
    cont
      .append("div")
      .style("clear" , "both");
//even the items
    me.makefixfunction()(); //BOOBS
  }

}
