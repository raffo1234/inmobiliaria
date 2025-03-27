
var calPrimera
var c107
var c507
var c508
var c108
var c509
var c111
var c510
var c511
var c512
var c522
var c116
var c519
var c513
var c517

var c120
var c122
var c158
var c563
var c564
var c565
var c125
var c127
var c128
var c130
var c131
var c141
var c142
var c144
var c145
var c146

//Primera Categoria
var c100
var c557
var c558
var c102
var c501
var c502
var c515

var c153
var c368
var c369
var c370
var c156
var c133
var c159
var c161
var c162
var c163
var c164

//Segunda Categoria
var c350
var c353
var c354
var c355
var c385
var c356

var c357
var c388
var c358
var c359
var c360
var c362
var c363
var c364
var c365

var cuartaquintacategoria = function(){
    calPrimera = function(){ // RENTA DE TRABAJO
        
        //c507 = si(c107 * 0.2<=88800,'c107*0.2','88800')
        var m9 = 0;
        var d507 = gVal(c107, 'i') * 0.2
        if(d507 <= 88800){
            m9 = d507
        }else{
            m9 = 88800
        }

        if(m9 == 0){
            sValB(c507, '0')
        }else{
            sVal(c507, m9)
        }

        //c508 = si(c107 - c507 > 0,'c107-c507','0')
        var d508 = gVal(c107, 'i') - gVal(c507, 'f')
        if(d508 > 0){
            sVal(c508, d508)
        }else{
            sValB(c508, '0')
        }
        
        //c509 = si(c508 + c108 > 0,'c508+c108'.'0')
        var d509 = gVal(c508, 'f') + gVal(c108, 'i')
        if(d509 > 0){
            sVal(c509, d509)
        }else{
            sValB(c509, '0')
        }
           
        //c510 = si(c509 + c111 > 0,'c509+c111'.'0')
        var d510 = gVal(c509, 'f') + gVal(c111, 'i')
        if(d510 > 0){
            sVal(c510, d510)
        }else{
            sValB(c510, '0')
        }
        
        //c511 = si(c510 <=25900,'c510'.'25900')
        var d511 = gVal(c510, 'f')
        if(d511 <= 25900){
            sVal(c511, d511)
        }else{
            sVal(c511, 25900)
        }
        
        //c512 = si(c510 - c511 > 0,'c510 - c511'.'0')
        var d512 = gVal(c510, 'f') - gVal(c511, 'f')
        if(d512 > 0){
            sVal(c512, d512)
        }else{
            sValB(c512, '0')
        }

        //c519 = si((c512 + c116)*0.1 >= c519,'c519','(c512+c116)*0.1')
        var d519 = gVal(c519, 'i')

        if(gVal(c116, 'i') == 0){
            d116 = 0
        }else{
            d116 = gVal(c116, 'i')
        }

        var d512_d166 = (gVal(c512,'f') + d116) * 0.1

        if(d512_d166 <= d519){
            sValB(c519, '0')
        }else{
            sVal(c519, d519)
        }
               
        //c513 = si((c512 - c522 - c519) >= 0,'c512-c522-c519','0')
        var d513 = gVal(c512,'f') - gVal(c522,'i') - gVal(c519,'i')
        if(d513 >= 0){
            sVal(c513,d513)
        }else{
            sValB(c513,'0')
        }

        //c517 = si(c513 + c116 > 0,'c513+c116-c519','0')
        var d517 = gVal(c513,'f') + d116
        if(d517 > 0){
            sVal(c517,d517)
        }else{
            sValB(c517,'0')
        }

        //c120 = si(c517<=99000,'R(c117*0.15)','0')
        //       si(c517>99900 y c517<=199800,'R(((99900*0.15))+(c517-99900)*0.21)','0')
        //       si(c517>199800,'R((99900*0.15)+(99900*0.21)+((c517-199800)*0.3))','0') 
        var v517 = gVal(c517,'f');
        var d120 = 0;

        if(v517 == 0 ){
            sVal(c120,'0')
        }else if(v517 <= 99900){
            d120 = v517 * 0.15
            sValR(c120,d120)

        }else if(v517 > 99900 && v517 <= 199800){
            d120 = (99900 * 0.15) + ((v517 - 99900) * 0.21)
            sValR(c120,d120)

        }else if (v517 > 199800){
            d120 = (99900 * 0.15) + (99900 * 0.21) + ((v517 - 199800) *0.3)
            sValR(c120,d120)
        }

        //si(c122 <= c116 * c120 / (c510+c116),'c122','c116*c120/(c510+c116)')
        var tz_media = (gVal(c120,'f') * 100) / (gVal(c512,'f') + d116 + gVal(c511,'f'))
        var d122 = gVal(c122,'i')
        if(d122 <= (d116 * tz_media)){
            sValR(c122,d122)
        }else{
            console.log("mensaje de superacion")
        }

        //si(c120 - c122 > 0,'c120-c122','0')
        var d158 = gVal(c120,'f') - d122;
        if(d158 > 0){
            sVal(c158,d158)
        }else{
            sValB(c158,'0')
        }

        //si(c563-c564-565 > 0,'c563-c564-565','0')
        var d125 = gVal(c563,'i') - gVal(c564,'i') -  gVal(c565,'i')  
        if(d125 > 0){
            sVal(c125,d125)
        }else{
            sValB(c125,'0')
        }

        //si(c120 - c122 - c125 - c127 - c128 - c130 - c131 > 0,'c120-c122-c125-c127-c128-c130-c131','0')
        var d141_142 = gVal(c120,'f') - gVal(c122,'i') - gVal(c125,'f') - gVal(c127,'i') - gVal(c128,'i') - gVal(c130,'i') - gVal(c131,'i')
        if(d141_142 < 0){
            sVal(c141,d141_142)
            sValB(c142,'0')
        }else{
            sValB(c141,'0')
            sVal(c142,d141_142)
        }

        //si(c146 - c144 + c145 > 0,'c146-c144+c145','0')
        var d146 = gVal(c142,'f') - gVal(c144,'i') + gVal(c145,'i')
        if(d146 > 0){
            sVal(c146,d146)
        }else{
            sValB(c146,'0')
        }  
    }
    
        c107 = $('#c107')
        c507 = $('#c507')
        c508 = $('#c508')
        c108 = $('#c108')
        c509 = $('#c509')
        c111 = $('#c111')
        c510 = $('#c510')
        c511 = $('#c511')
        c512 = $('#c512')
        c522 = $('#c522')
        c519 = $('#c519')
        c513 = $('#c513')
        c116 = $('#c116')
        c517 = $('#c517')
        c120 = $('#c120')
        c122 = $('#c122')
        c158 = $('#c158')
        c563 = $('#c563')   
        c564 = $('#c564')   
        c565 = $('#c565')   
        c125 = $('#c125')
        c127 = $('#c127')
        c128 = $('#c128')
        c130 = $('#c130')
        c131 = $('#c131')
        c141 = $('#c141')
        c142 = $('#c142')
        c144 = $('#c144')
        c145 = $('#c145')
        c146 = $('#c146')

        c107.addClass('edit')
        c108.addClass('edit')
        c111.addClass('edit')
        c522.addClass('edit')
        c116.addClass('edit')
        c519.addClass('edit')

        c122.addClass('edit')
        c563.addClass('edit')
        c564.addClass('edit')
        c565.addClass('edit')
        c127.addClass('edit')
        c128.addClass('edit')
        c130.addClass('edit')
        c131.addClass('edit')

        c144.addClass('edit')
        c145.addClass('edit')

        iniciaCampos();

}
var primercategoria = function(){

    calPrimera = function(){
        
        //C102 = si(c557 + c558 == 0,'0','c557+c558')
        var d557_558 = gVal(c557, 'i') + gVal(c558, 'i');
        if(d557_558 == 0 ){
            sVal(c102, '0');
        }else{
            sVal(c102, d557_558);
        }
        
        //c501 = si(c100 + c102 > 0,'c100+c102','0')
        var d501 = gVal(c100, 'i') + gVal(c102, 'f');
        if(d501 > 0 ){
            sVal(c501, d501);
        }else{
            sVal(c501, '0');
        }
        
        //502 = si(c100 + c102 > 0, 'c501*0.2','0')
        var d502 = gVal(c501, 'f') * 0.2;
        sVal(c502, d502);
        
        //515 = si(c501 > 0,'c501-c502','0')
        var d515 = gVal(c501, 'f') - gVal(c502, 'f');
        if(gVal(c501, 'f') > 0 ){
            sVal(c515, d515);
        }else{
            sVal(c515, '0');
        }
        
        //153 = si(c515<=0,'0','red(c515*0.0625)')
        var d515 = gVal(c515, 'f');    
        if(d515 <= 0 ){
            sVal(c153, '0');
        }else{
            sVal(c153, Math.round(d515 * 0.0625));
        }
        
        //156 = si(c368-c369-c370 > 0,'(c368-c369-c370)','0') 
        var d156 = gVal(c368, 'i') - gVal(c369, 'i') - gVal(c370, 'i');
        if(d156 > 0 ){
            sVal(c156, d156);
        }else{
            sVal(c156, '0');
        
        }
        
        //c159 = si(c156 + c133 > c153,'((c156+c133)-c153)','0')
        var d159 = (gVal(c156, 'f') + gVal(c133, 'i')) - gVal(c153, 'f');
        if((gVal(c156, 'f') + gVal(c133, 'i')) > gVal(c153, 'f')){
            sVal(c159, Math.abs(d159));
        }else{
            sVal(c159, '0');
        }
        
        //c161 = si(c153 > c156 + c113,'(c153-(c156+c113))','0')
        var d161 = gVal(c153, 'f') - (gVal(c156, 'f') + gVal(c133, 'i'));
        if(gVal(c153, 'f') > (gVal(c156, 'f') + gVal(c133, 'i'))) {
            sVal(c161, Math.abs(d161));
        }else{
            sVal(c161, '0');
        }

        //c164 = si(c161 - c162 + c163) > 0, c161 - c162 + c163,'0'
        var d164 = gVal(c161, 'f') - gVal(c162, 'i') + gVal(c163, 'i');
        if(d164 > 0 ){
            sVal(c164, d164);    
        }else{
            sVal(c164, '0');
        }

        //
    }
    

        c100 = $('#c100');
        c557 = $('#c557');
        c558 = $('#c558');
        c102 = $('#c102');
        c501 = $('#c501');
        c502 = $('#c502');
        c515 = $('#c515');
        c153 = $('#c153');
        c368 = $('#c368');
        c369 = $('#c369');
        c370 = $('#c370');
        c156 = $('#c156');
        c133 = $('#c133');
        c159 = $('#c159');
        c133 = $('#c133');
        c161 = $('#c161');
        c162 = $('#c162');
        c163 = $('#c163');
        c164 = $('#c164');

        c100.addClass('edit');
        c557.addClass('edit');
        c558.addClass('edit');
        c368.addClass('edit');
        c369.addClass('edit');
        c370.addClass('edit');
        c133.addClass('edit');
        c162.addClass('edit');
        c163.addClass('edit');

        iniciaCampos()

}
var segundacategoria = function(){

    calPrimera = function(){

        //c353 = si(c350 > 0,'c350*0.2','0')
        var d350 = gVal(c350, 'i');
        if(d350 > 0){
            var d353 = d350 * 0.2;
            sValR(c353, d353);
        }else{
            sVal(c353, '0');
        }
        
        //354 = si(c350 - c353 > 0,'c350-c353','0')
        var d354 = gVal(c350, 'i') - gVal(c353, 'f');
        if(d354 > 0){
            sVal(c354, d354);
        }else{
            sVal(c354, '0');
        }
        
        
        //c356 = c354 - c355 + c385 > 0,'c354-c355+c385','0'
        var d356 = gVal(c354, 'f') - gVal(c355, 'i') + gVal(c385, 'i');
        if(d356 > 0){
            sVal(c356, d356);
        }else{
            sVal(c356, '0');
        }
        
        //c357 = si(c356 > 0,'c356 * 0.0625','0')
        var d356 = gVal(c356, 'f');
        var d357 = gVal(c356, 'f') * 0.0625;
        if( d356 > 0){
            sValR(c357, d357);   
        }else{
            sVal(c357, '0');
        }
        
        //c360 = c357 - c388 - c358 - c359 < 0,'abs(c357-c388-c358-c359)','0'
        var d360 = gVal(c357, 'f') - gVal(c388, 'i') - gVal(c358, 'i') - gVal(c359, 'i')
        if(d360 < 0){
            sVal(c360, Math.abs(d360));
            sVal(c362, '0');
        }else{
            sVal(c360, '0');
            sVal(c362, Math.abs(d360));
        }
        
        //365 = c362 - c363 + c364 > 0,'c362-c363+c364','0'
        var d365 = gVal(c362, 'f') - gVal(c363, 'i') + gVal(c364, 'i');
        if(d365 < 0){
            sVal(c365, '0');
        }else{
            sVal(c365, d365);
        }
        
    }
    
        c350 = $('#c350');
        c353 = $('#c353');
        c354 = $('#c354');
        c355 = $('#c355');
        c385 = $('#c385');
        c356 = $('#c356');
        c357 = $('#c357');
        c388 = $('#c388');
        c358 = $('#c358');
        c359 = $('#c359');
        c360 = $('#c360');
        c362 = $('#c362');
        c363 = $('#c363');
        c364 = $('#c364');
        c365 = $('#c365');


        c350.addClass('edit');
        c355.addClass('edit');
        c385.addClass('edit');
        c358.addClass('edit');
        c388.addClass('edit');
        c359.addClass('edit');
        c363.addClass('edit');
        c364.addClass('edit');

        iniciaCampos()

}
