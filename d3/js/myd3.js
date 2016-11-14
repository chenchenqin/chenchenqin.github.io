var svgctrl=d3.select('svg');
$(document).ready(function(){
    $("#hide").click(function(){
        $("svg").hide();
    });
    $("#show").click(function(){
        $("svg").show();
    });
});
var cx=150;
var cy=150; 
var r=40;      
var c1=svgctrl.append('circle');
c1.attr('cx',cx).attr('cy',cy).attr('r',r).attr('fill','pink');

var c2=svgctrl.append('ellipse');
c2.attr('cx',cx+130).attr('cy',cy).attr('rx',r*2.5).attr('ry',r*1.25).attr('fill','pink').attr('stroke-width',2);

//var c3=svgctrl.append('polyline');
//c3.attr('points',"380,150,390,140,400,150").attr('fill','none').attr('stroke','#F5D0A9').attr('stroke-width',3);

//var c4=svgctrl.append('polyline');
//c4.attr('points',"130,120 120,100 100,100").attr('fill','none').attr('stroke','#F5D0A9').attr('stroke-width',3);

//var c5=svgctrl.append('polyline');
//c5.attr('points',"170,120 160,100 140,100").attr('fill','none').attr('stroke','#F5D0A9').attr('stroke-width',3);

var c6=svgctrl.append('circle');
c6.attr('cx',cx-15).attr('cy',cy-5).attr('r',r*0.1).attr('stroke','#848484').attr('stroke-width',3).attr('fill','#848484');

var c7=svgctrl.append('circle');
c7.attr('cx',cx+15).attr('cy',cy-5).attr('r',r*0.1).attr('stroke','#848484').attr('stroke-width',3).attr('fill','#848484');

//var c8=svgctrl.append('polyline');
//c8.attr('points',"145,155 150,165 155,155").attr('fill','none').attr('stroke','#0080FF').attr('stroke-width',3);

var c9=svgctrl.append('circle');
c9.attr('cx',cx+90).attr('cy',cy+50).attr('r',r*0.25).attr('stroke','pink').attr('stroke-width',3).attr('fill','pink');

var c10=svgctrl.append('circle');
c10.attr('cx',cx+170).attr('cy',cy+50).attr('r',r*0.25).attr('stroke','pink').attr('stroke-width',3).attr('fill','pink');

var c11=svgctrl.append('rect');
c11.attr('x',cx-100).attr('y',cy+70).attr('width',350).attr('height',10).attr('fill','#cccfff').attr('stroke-width',5).attr('stroke','#cccfff');

