import $ from 'jquery';
window.jQuery = $;
window.$ = $;

var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

if (module.hot) {
    module.hot.accept();
}

$(document).ready(() => {

    //spalten eine precision geben, hübsch machen
    //spalte F hat auch eine benutzerdefinierte Funktion die nicht genutzt werden kann


    parser.on('callCellValue', function(cellCoord, done) {
        let excl_obj = eval("data.cells." + cellCoord.label);

        if (excl_obj.formula.length > 0 && excl_obj.formula.search("Düngung") == -1) {
            let parseResult = parser.parse(excl_obj.formula);
            done(parseResult.result);
            if (parseResult.result != null) {

            }
        } else {
            done(excl_obj.val);
        }

        if (cellCoord.label.slice(-1) == 4 && !$.isNumeric(cellCoord.label.slice(-2, -1))) {
            console.log(cellCoord);
            console.log(excl_obj);
            console.log(" ");
        }
    });

    excl_rowlist = excl_rowlist.split(",");
    excl_columnlist = excl_columnlist.split(",");

    let thead = "";
    let headerrow = "2";

    console.log(data.cells);
    console.log(parser);

    for (let c = 0; c < excl_columnmax; c++) {
        let excl_obj = eval("data.cells." + numberToLetters(c + 1) + headerrow);
        thead += "<th id=" + excl_obj.excl_cell + " class=" + (excl_obj.hidden ? "excl_hide" : "excl_show") + ">" + excl_obj.val + "</th>";
    }
    thead = "<tr>" + thead + "</tr>";


    let tr_data = "";
    for (let r = 0; r < excl_rowmax; r++) {
        let td_data = "";
        for (let c = 0; c < excl_columnmax; c++) {
            let excl_obj = eval("data.cells." + numberToLetters(c + 1) + (r + 1) );
            let result;

            if (excl_obj.formula.length > 0 && excl_obj.formula.search("Düngung") == -1) {
                let parseResult = parser.parse(excl_obj.formula);
                result = parseResult.result;
            } else {
                if (excl_obj.formula.search("Düngung") != -1) {
                    console.log(excl_obj);
                    console.log("Düngung");
                }
                result = excl_obj.val;
            }


            td_data += "<td id=" + excl_obj.excl_cell + " class=" + (excl_obj.hidden ? "excl_hide" : "excl_show") + ">" + result + "</td>";
        }
        tr_data += "<tr>" + td_data + "</tr>";
    }

    let table = `
    <table border="1" cellspacing="0">
        <thead>
        ` + thead + `
        </thead>
        <tbody>
        ` + tr_data + `
        </tbody>
    </table>
    `;

    /*
    $.each(excl_varcells.split(","), (index, val) => {
        let excl_obj = eval("data.cells." + "r" + val_r + "c" + val_c);
        table.find("td#" + val).empty();
    });
    */


    $('#calc').empty();
    $('#calc').append(table);




});



//Buchstaben zu Zahl
function lettersToNumb(letters) {
    let decode = 0;
    let letterArray = letters.split("");

    for (let i = 0; i < letterArray.length; i++) {
        decode += (letterArray[i].codePointAt(0) - 64) * Math.pow(26, i);
    }

    return decode;
}


// Zahl zu Buchstaben
function numberToLetters(number) {
    number = parseInt(number);
    if (number <= 0) return "";
    let decode = "";

    let length = parseInt(Math.floor(number / 26));
    decode += formatBaseNData(number % 26);

    if (length > 0) {
        if (number % 26 == 0) {
            decode += reverseString(numberToLetters(length - 1));
        } else {
            decode += reverseString(numberToLetters(length));
        }
    }

    return reverseString(decode);
}

// formatBaseNData
function formatBaseNData(value) {
    let alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY".split("");
    let radix = alphabet.length;
    let encoded = "";


    while (true) {
        let result = Math.floor(value / radix);
        let remainder = (value % radix);
        encoded = alphabet[remainder] + encoded;
        value = result;

        if (!value) break;
    }

    return encoded;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}



let excl_columnlist = "1,3,10,17,19,20,21,22,24,25,29,32,33,59";
let excl_rowlist = "2,3,4,5,6,7,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,30,32,33,34,35,36,37,38,40,41,42,44";
let excl_varcells = "S18,T18";
let excl_columnmax = "33";
let excl_rowmax = "44";


let data = { cells: {
'A1' : {
val: `Rentabilitätsschwellen 2009 (hohe Anbauintensität)`,
val_noFormat: `Rentabilitätsschwellen 2009 (hohe Anbauintensität)`,
excl_cell: `A1`,
formula: ``,
hidden: true
},
'B1' : {
val: ``,
val_noFormat: ``,
excl_cell: `B1`,
formula: ``,
hidden: true
},
'C1' : {
val: ``,
val_noFormat: ``,
excl_cell: `C1`,
formula: ``,
hidden: true
},
'D1' : {
val: ``,
val_noFormat: ``,
excl_cell: `D1`,
formula: ``,
hidden: true
},
'E1' : {
val: ``,
val_noFormat: ``,
excl_cell: `E1`,
formula: ``,
hidden: true
},
'F1' : {
val: ``,
val_noFormat: ``,
excl_cell: `F1`,
formula: ``,
hidden: true
},
'G1' : {
val: ``,
val_noFormat: ``,
excl_cell: `G1`,
formula: ``,
hidden: true
},
'H1' : {
val: ``,
val_noFormat: ``,
excl_cell: `H1`,
formula: ``,
hidden: true
},
'I1' : {
val: ``,
val_noFormat: ``,
excl_cell: `I1`,
formula: ``,
hidden: true
},
'J1' : {
val: ``,
val_noFormat: ``,
excl_cell: `J1`,
formula: ``,
hidden: true
},
'K1' : {
val: ``,
val_noFormat: ``,
excl_cell: `K1`,
formula: ``,
hidden: true
},
'L1' : {
val: ``,
val_noFormat: ``,
excl_cell: `L1`,
formula: ``,
hidden: true
},
'M1' : {
val: ``,
val_noFormat: ``,
excl_cell: `M1`,
formula: ``,
hidden: true
},
'N1' : {
val: ``,
val_noFormat: ``,
excl_cell: `N1`,
formula: ``,
hidden: true
},
'O1' : {
val: ``,
val_noFormat: ``,
excl_cell: `O1`,
formula: ``,
hidden: true
},
'P1' : {
val: ``,
val_noFormat: ``,
excl_cell: `P1`,
formula: ``,
hidden: true
},
'Q1' : {
val: ``,
val_noFormat: ``,
excl_cell: `Q1`,
formula: ``,
hidden: true
},
'R1' : {
val: ``,
val_noFormat: ``,
excl_cell: `R1`,
formula: ``,
hidden: true
},
'S1' : {
val: ``,
val_noFormat: ``,
excl_cell: `S1`,
formula: ``,
hidden: true
},
'T1' : {
val: ``,
val_noFormat: ``,
excl_cell: `T1`,
formula: ``,
hidden: true
},
'U1' : {
val: ``,
val_noFormat: ``,
excl_cell: `U1`,
formula: ``,
hidden: true
},
'V1' : {
val: ``,
val_noFormat: ``,
excl_cell: `V1`,
formula: ``,
hidden: true
},
'W1' : {
val: ``,
val_noFormat: ``,
excl_cell: `W1`,
formula: ``,
hidden: true
},
'X1' : {
val: ``,
val_noFormat: ``,
excl_cell: `X1`,
formula: ``,
hidden: true
},
'Y1' : {
val: ``,
val_noFormat: ``,
excl_cell: `Y1`,
formula: ``,
hidden: true
},
'Z1' : {
val: ``,
val_noFormat: ``,
excl_cell: `Z1`,
formula: ``,
hidden: true
},
'AA1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AA1`,
formula: ``,
hidden: true
},
'AB1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AB1`,
formula: ``,
hidden: true
},
'AC1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AC1`,
formula: ``,
hidden: true
},
'AD1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AD1`,
formula: ``,
hidden: true
},
'AE1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AE1`,
formula: ``,
hidden: true
},
'AF1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AF1`,
formula: ``,
hidden: true
},
'AG1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AG1`,
formula: ``,
hidden: true
},
'AH1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AH1`,
formula: ``,
hidden: true
},
'AI1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AI1`,
formula: ``,
hidden: true
},
'AJ1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AJ1`,
formula: ``,
hidden: true
},
'AK1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AK1`,
formula: ``,
hidden: true
},
'AL1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AL1`,
formula: ``,
hidden: true
},
'AM1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AM1`,
formula: ``,
hidden: true
},
'AN1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AN1`,
formula: ``,
hidden: true
},
'AO1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AO1`,
formula: ``,
hidden: true
},
'AP1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP1`,
formula: ``,
hidden: true
},
'AQ1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ1`,
formula: ``,
hidden: true
},
'AR1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AR1`,
formula: ``,
hidden: true
},
'AS1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AS1`,
formula: ``,
hidden: true
},
'AT1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AT1`,
formula: ``,
hidden: true
},
'AU1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AU1`,
formula: ``,
hidden: true
},
'AV1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AV1`,
formula: ``,
hidden: true
},
'AW1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AW1`,
formula: ``,
hidden: true
},
'AX1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AX1`,
formula: ``,
hidden: true
},
'AY1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AY1`,
formula: ``,
hidden: true
},
'AZ1' : {
val: ``,
val_noFormat: ``,
excl_cell: `AZ1`,
formula: ``,
hidden: true
},
'BA1' : {
val: ``,
val_noFormat: ``,
excl_cell: `BA1`,
formula: ``,
hidden: true
},
'BB1' : {
val: ``,
val_noFormat: ``,
excl_cell: `BB1`,
formula: ``,
hidden: true
},
'BC1' : {
val: ``,
val_noFormat: ``,
excl_cell: `BC1`,
formula: ``,
hidden: true
},
'BD1' : {
val: ``,
val_noFormat: ``,
excl_cell: `BD1`,
formula: ``,
hidden: true
},
'BE1' : {
val: ``,
val_noFormat: ``,
excl_cell: `BE1`,
formula: ``,
hidden: true
},
'BF1' : {
val: ``,
val_noFormat: ``,
excl_cell: `BF1`,
formula: ``,
hidden: true
},
'BG1' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG1`,
formula: ``,
hidden: true
},
'A2' : {
val: `Fruchtartenrechner\nSAATEN-UNION`,
val_noFormat: `Fruchtartenrechner\nSAATEN-UNION`,
excl_cell: `A2`,
formula: ``,
hidden: false
},
'B2' : {
val: `Sorte`,
val_noFormat: `Sorte`,
excl_cell: `B2`,
formula: ``,
hidden: true
},
'C2' : {
val: `Fruchtfolgestellung`,
val_noFormat: `Fruchtfolgestellung`,
excl_cell: `C2`,
formula: ``,
hidden: false
},
'D2' : {
val: `Saatgut`,
val_noFormat: `Saatgut`,
excl_cell: `D2`,
formula: ``,
hidden: true
},
'E2' : {
val: ``,
val_noFormat: ``,
excl_cell: `E2`,
formula: ``,
hidden: true
},
'F2' : {
val: `Nährstoffe + Kalk`,
val_noFormat: `Nährstoffe + Kalk`,
excl_cell: `F2`,
formula: ``,
hidden: true
},
'G2' : {
val: `Pflanzenschutz`,
val_noFormat: `Pflanzenschutz`,
excl_cell: `G2`,
formula: ``,
hidden: true
},
'H2' : {
val: `Fakt.`,
val_noFormat: `Fakt.`,
excl_cell: `H2`,
formula: ``,
hidden: true
},
'I2' : {
val: `Zinsen + Versich.`,
val_noFormat: `Zinsen + Versich.`,
excl_cell: `I2`,
formula: ``,
hidden: true
},
'J2' : {
val: `Direktkosten`,
val_noFormat: `Direktkosten`,
excl_cell: `J2`,
formula: ``,
hidden: false
},
'K2' : {
val: `VK Maschinen`,
val_noFormat: `VK Maschinen`,
excl_cell: `K2`,
formula: ``,
hidden: true
},
'L2' : {
val: ``,
val_noFormat: ``,
excl_cell: `L2`,
formula: ``,
hidden: true
},
'M2' : {
val: `Lohnansatz`,
val_noFormat: `Lohnansatz`,
excl_cell: `M2`,
formula: ``,
hidden: true
},
'N2' : {
val: ``,
val_noFormat: ``,
excl_cell: `N2`,
formula: ``,
hidden: true
},
'O2' : {
val: `FK-Maschinen`,
val_noFormat: `FK-Maschinen`,
excl_cell: `O2`,
formula: ``,
hidden: true
},
'P2' : {
val: ``,
val_noFormat: ``,
excl_cell: `P2`,
formula: ``,
hidden: true
},
'Q2' : {
val: `Arbeitskosten`,
val_noFormat: `Arbeitskosten`,
excl_cell: `Q2`,
formula: ``,
hidden: false
},
'R2' : {
val: `Direktkosten und Arbeitskosten`,
val_noFormat: `Direktkosten und Arbeitskosten`,
excl_cell: `R2`,
formula: ``,
hidden: true
},
'S2' : {
val: `Preiserwartung`,
val_noFormat: `Preiserwartung`,
excl_cell: `S2`,
formula: ``,
hidden: false
},
'T2' : {
val: `Ertragserwartung`,
val_noFormat: `Ertragserwartung`,
excl_cell: `T2`,
formula: ``,
hidden: false
},
'U2' : {
val: ``,
val_noFormat: ``,
excl_cell: `U2`,
formula: ``,
hidden: false
},
'V2' : {
val: `Marktleistung`,
val_noFormat: `Marktleistung`,
excl_cell: `V2`,
formula: ``,
hidden: false
},
'W2' : {
val: `Anteil Qualitätsware`,
val_noFormat: `Anteil Qualitätsware`,
excl_cell: `W2`,
formula: ``,
hidden: true
},
'X2' : {
val: `Fruchtfolgewert`,
val_noFormat: `Fruchtfolgewert`,
excl_cell: `X2`,
formula: ``,
hidden: false
},
'Y2' : {
val: `Gekoppelte Prämie`,
val_noFormat: `Gekoppelte Prämie`,
excl_cell: `Y2`,
formula: ``,
hidden: false
},
'Z2' : {
val: `Stückkosten`,
val_noFormat: `Stückkosten`,
excl_cell: `Z2`,
formula: ``,
hidden: true
},
'AA2' : {
val: `Variable Kosen`,
val_noFormat: `Variable Kosen`,
excl_cell: `AA2`,
formula: ``,
hidden: true
},
'AB2' : {
val: `Deckungsbeitrag`,
val_noFormat: `Deckungsbeitrag`,
excl_cell: `AB2`,
formula: ``,
hidden: true
},
'AC2' : {
val: `Direkt- und arbeits-kostenfreie Leistung`,
val_noFormat: `Direkt- und arbeits-kostenfreie Leistung`,
excl_cell: `AC2`,
formula: ``,
hidden: false
},
'AD2' : {
val: `Rentab.schwelle\nERTRAG`,
val_noFormat: `Rentab.schwelle\nERTRAG`,
excl_cell: `AD2`,
formula: ``,
hidden: true
},
'AE2' : {
val: `Rentab.schwelle \nPREIS`,
val_noFormat: `Rentab.schwelle \nPREIS`,
excl_cell: `AE2`,
formula: ``,
hidden: true
},
'AF2' : {
val: `Gleichgewichts-\nertrag`,
val_noFormat: `Gleichgewichts-\nertrag`,
excl_cell: `AF2`,
formula: ``,
hidden: false
},
'AG2' : {
val: `Gleichgewichts-\npreis`,
val_noFormat: `Gleichgewichts-\npreis`,
excl_cell: `AG2`,
formula: ``,
hidden: false
},
'AH2' : {
val: `Allgemeinaufwand `,
val_noFormat: `Allgemeinaufwand `,
excl_cell: `AH2`,
formula: ``,
hidden: true
},
'AI2' : {
val: `Zinsansatz`,
val_noFormat: `Zinsansatz`,
excl_cell: `AI2`,
formula: ``,
hidden: true
},
'AJ2' : {
val: `Betriebsaufwand`,
val_noFormat: `Betriebsaufwand`,
excl_cell: `AJ2`,
formula: ``,
hidden: true
},
'AK2' : {
val: `Flächenprämie`,
val_noFormat: `Flächenprämie`,
excl_cell: `AK2`,
formula: ``,
hidden: true
},
'AL2' : {
val: `Reinertrag`,
val_noFormat: `Reinertrag`,
excl_cell: `AL2`,
formula: ``,
hidden: true
},
'AM2' : {
val: `Grundrente`,
val_noFormat: `Grundrente`,
excl_cell: `AM2`,
formula: ``,
hidden: true
},
'AN2' : {
val: `N-Gehalt FM`,
val_noFormat: `N-Gehalt FM`,
excl_cell: `AN2`,
formula: ``,
hidden: true
},
'AO2' : {
val: `TS-Gehalt`,
val_noFormat: `TS-Gehalt`,
excl_cell: `AO2`,
formula: ``,
hidden: true
},
'AP2' : {
val: `% Rohprotein i.FM`,
val_noFormat: `% Rohprotein i.FM`,
excl_cell: `AP2`,
formula: ``,
hidden: true
},
'AQ2' : {
val: `% Rohprotein i. TM`,
val_noFormat: `% Rohprotein i. TM`,
excl_cell: `AQ2`,
formula: ``,
hidden: true
},
'AR2' : {
val: `Anteil Nebenernteprodukte`,
val_noFormat: `Anteil Nebenernteprodukte`,
excl_cell: `AR2`,
formula: ``,
hidden: true
},
'AS2' : {
val: `N-Gehalt Nebenernteprodukt`,
val_noFormat: `N-Gehalt Nebenernteprodukt`,
excl_cell: `AS2`,
formula: ``,
hidden: true
},
'AT2' : {
val: `N-Aufnahme`,
val_noFormat: `N-Aufnahme`,
excl_cell: `AT2`,
formula: ``,
hidden: true
},
'AU2' : {
val: `N-Entzug`,
val_noFormat: `N-Entzug`,
excl_cell: `AU2`,
formula: ``,
hidden: true
},
'AV2' : {
val: `N-Bedarfswert`,
val_noFormat: `N-Bedarfswert`,
excl_cell: `AV2`,
formula: ``,
hidden: true
},
'AW2' : {
val: `Ertragsniveau`,
val_noFormat: `Ertragsniveau`,
excl_cell: `AW2`,
formula: ``,
hidden: true
},
'AX2' : {
val: `Ertragsdifferenz`,
val_noFormat: `Ertragsdifferenz`,
excl_cell: `AX2`,
formula: ``,
hidden: true
},
'AY2' : {
val: `Korrektur. höhere Erträge`,
val_noFormat: `Korrektur, höhere Erträge`,
excl_cell: `AY2`,
formula: ``,
hidden: true
},
'AZ2' : {
val: `Korrekture niedr. Erträge`,
val_noFormat: `Korrekture niedr. Erträge`,
excl_cell: `AZ2`,
formula: ``,
hidden: true
},
'BA2' : {
val: `Korrigierter N-Bedarf`,
val_noFormat: `Korrigierter N-Bedarf`,
excl_cell: `BA2`,
formula: ``,
hidden: true
},
'BB2' : {
val: `Stickstoffbilanz`,
val_noFormat: `Stickstoffbilanz`,
excl_cell: `BB2`,
formula: ``,
hidden: true
},
'BC2' : {
val: `Humuswirkung`,
val_noFormat: `Humuswirkung`,
excl_cell: `BC2`,
formula: ``,
hidden: true
},
'BD2' : {
val: `Anteil Nebenprodutke`,
val_noFormat: `Anteil Nebenprodutke`,
excl_cell: `BD2`,
formula: ``,
hidden: true
},
'BE2' : {
val: `Humusfaktor`,
val_noFormat: `Humusfaktor`,
excl_cell: `BE2`,
formula: ``,
hidden: true
},
'BF2' : {
val: `Humusbilanz`,
val_noFormat: `Humusbilanz`,
excl_cell: `BF2`,
formula: ``,
hidden: true
},
'BG2' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG2`,
formula: ``,
hidden: false
},
'A3' : {
val: ``,
val_noFormat: ``,
excl_cell: `A3`,
formula: ``,
hidden: false
},
'B3' : {
val: ``,
val_noFormat: ``,
excl_cell: `B3`,
formula: ``,
hidden: true
},
'C3' : {
val: ``,
val_noFormat: ``,
excl_cell: `C3`,
formula: ``,
hidden: false
},
'D3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `D3`,
formula: ``,
hidden: true
},
'E3' : {
val: ``,
val_noFormat: ``,
excl_cell: `E3`,
formula: ``,
hidden: true
},
'F3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `F3`,
formula: ``,
hidden: true
},
'G3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `G3`,
formula: ``,
hidden: true
},
'H3' : {
val: `Fakt.`,
val_noFormat: `Fakt.`,
excl_cell: `H3`,
formula: ``,
hidden: true
},
'I3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `I3`,
formula: ``,
hidden: true
},
'J3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `J3`,
formula: ``,
hidden: false
},
'K3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `K3`,
formula: ``,
hidden: true
},
'L3' : {
val: `Fakt.`,
val_noFormat: `Fakt.`,
excl_cell: `L3`,
formula: ``,
hidden: true
},
'M3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `M3`,
formula: ``,
hidden: true
},
'N3' : {
val: `Fakt.`,
val_noFormat: `Fakt.`,
excl_cell: `N3`,
formula: ``,
hidden: true
},
'O3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `O3`,
formula: ``,
hidden: true
},
'P3' : {
val: `Fakt.`,
val_noFormat: `Fakt.`,
excl_cell: `P3`,
formula: ``,
hidden: true
},
'Q3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `Q3`,
formula: ``,
hidden: false
},
'R3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `R3`,
formula: ``,
hidden: true
},
'S3' : {
val: `€/dt`,
val_noFormat: `€/dt`,
excl_cell: `S3`,
formula: ``,
hidden: false
},
'T3' : {
val: `dt/ha`,
val_noFormat: `dt/ha`,
excl_cell: `T3`,
formula: ``,
hidden: false
},
'U3' : {
val: `Fakt.`,
val_noFormat: `Fakt.`,
excl_cell: `U3`,
formula: ``,
hidden: false
},
'V3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `V3`,
formula: ``,
hidden: false
},
'W3' : {
val: ``,
val_noFormat: ``,
excl_cell: `W3`,
formula: ``,
hidden: true
},
'X3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `X3`,
formula: ``,
hidden: false
},
'Y3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `Y3`,
formula: ``,
hidden: false
},
'Z3' : {
val: `€/dt`,
val_noFormat: `€/dt`,
excl_cell: `Z3`,
formula: ``,
hidden: true
},
'AA3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `AA3`,
formula: ``,
hidden: true
},
'AB3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `AB3`,
formula: ``,
hidden: true
},
'AC3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `AC3`,
formula: ``,
hidden: false
},
'AD3' : {
val: `dt/ha`,
val_noFormat: `dt/ha`,
excl_cell: `AD3`,
formula: ``,
hidden: true
},
'AE3' : {
val: `€/dt`,
val_noFormat: `€/dt`,
excl_cell: `AE3`,
formula: ``,
hidden: true
},
'AF3' : {
val: `dt/ha`,
val_noFormat: `dt/ha`,
excl_cell: `AF3`,
formula: ``,
hidden: false
},
'AG3' : {
val: `€/dt`,
val_noFormat: `€/dt`,
excl_cell: `AG3`,
formula: ``,
hidden: false
},
'AH3' : {
val: `€/dt`,
val_noFormat: `€/dt`,
excl_cell: `AH3`,
formula: ``,
hidden: true
},
'AI3' : {
val: `€/dt`,
val_noFormat: `€/dt`,
excl_cell: `AI3`,
formula: ``,
hidden: true
},
'AJ3' : {
val: `€/dt`,
val_noFormat: `€/dt`,
excl_cell: `AJ3`,
formula: ``,
hidden: true
},
'AK3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `AK3`,
formula: ``,
hidden: true
},
'AL3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `AL3`,
formula: ``,
hidden: true
},
'AM3' : {
val: `€/ha`,
val_noFormat: `€/ha`,
excl_cell: `AM3`,
formula: ``,
hidden: true
},
'AN3' : {
val: `%`,
val_noFormat: `%`,
excl_cell: `AN3`,
formula: ``,
hidden: true
},
'AO3' : {
val: `%`,
val_noFormat: `%`,
excl_cell: `AO3`,
formula: ``,
hidden: true
},
'AP3' : {
val: `%`,
val_noFormat: `%`,
excl_cell: `AP3`,
formula: ``,
hidden: true
},
'AQ3' : {
val: `%`,
val_noFormat: `%`,
excl_cell: `AQ3`,
formula: ``,
hidden: true
},
'AR3' : {
val: ``,
val_noFormat: ``,
excl_cell: `AR3`,
formula: ``,
hidden: true
},
'AS3' : {
val: ``,
val_noFormat: ``,
excl_cell: `AS3`,
formula: ``,
hidden: true
},
'AT3' : {
val: `kg/ha`,
val_noFormat: `kg/ha`,
excl_cell: `AT3`,
formula: ``,
hidden: true
},
'AU3' : {
val: `kg/ha`,
val_noFormat: `kg/ha`,
excl_cell: `AU3`,
formula: ``,
hidden: true
},
'AV3' : {
val: `kg/ha`,
val_noFormat: `kg/ha`,
excl_cell: `AV3`,
formula: ``,
hidden: true
},
'AW3' : {
val: `dt/ha`,
val_noFormat: `dt/ha`,
excl_cell: `AW3`,
formula: ``,
hidden: true
},
'AX3' : {
val: `dt/ha`,
val_noFormat: `dt/ha`,
excl_cell: `AX3`,
formula: ``,
hidden: true
},
'AY3' : {
val: `kg/dt`,
val_noFormat: `kg/dt`,
excl_cell: `AY3`,
formula: ``,
hidden: true
},
'AZ3' : {
val: `kg/dt`,
val_noFormat: `kg/dt`,
excl_cell: `AZ3`,
formula: ``,
hidden: true
},
'BA3' : {
val: `kg/dt`,
val_noFormat: `kg/dt`,
excl_cell: `BA3`,
formula: ``,
hidden: true
},
'BB3' : {
val: `kg/dt`,
val_noFormat: `kg/dt`,
excl_cell: `BB3`,
formula: ``,
hidden: true
},
'BC3' : {
val: `kg/ha`,
val_noFormat: `kg/ha`,
excl_cell: `BC3`,
formula: ``,
hidden: true
},
'BD3' : {
val: ``,
val_noFormat: ``,
excl_cell: `BD3`,
formula: ``,
hidden: true
},
'BE3' : {
val: `kg/t`,
val_noFormat: `kg/t`,
excl_cell: `BE3`,
formula: ``,
hidden: true
},
'BF3' : {
val: `kg/ha`,
val_noFormat: `kg/ha`,
excl_cell: `BF3`,
formula: ``,
hidden: true
},
'BG3' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG3`,
formula: ``,
hidden: false
},
'A4' : {
val: `Körnermais`,
val_noFormat: `Körnermais`,
excl_cell: `A4`,
formula: ``,
hidden: false
},
'B4' : {
val: `SUNSHINOS`,
val_noFormat: `SUNSHINOS`,
excl_cell: `B4`,
formula: ``,
hidden: true
},
'C4' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C4`,
formula: ``,
hidden: false
},
'D4' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `D4`,
formula: `E4*D18`,
hidden: true
},
'E4' : {
val: `2.35`,
val_noFormat: `2,35`,
excl_cell: `E4`,
formula: ``,
hidden: true
},
'F4' : {
val: `305.89156`,
val_noFormat: `305.89156`,
excl_cell: `F4`,
formula: `[2]Düngung!M40*T4+[2]Düngung!P11`,
hidden: true
},
'G4' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `G4`,
formula: `H4*G18`,
hidden: true
},
'H4' : {
val: `0.75`,
val_noFormat: `0,75`,
excl_cell: `H4`,
formula: ``,
hidden: true
},
'I4' : {
val: `53.253868499999996`,
val_noFormat: `53.253868499999996`,
excl_cell: `I4`,
formula: `(SUM(D4:G4)/4*0.05)+(V4*0.014*1.5)`,
hidden: true
},
'J4' : {
val: `678.8954285`,
val_noFormat: `678.8954285`,
excl_cell: `J4`,
formula: `SUM(D4,F4,G4,I4)`,
hidden: false
},
'K4' : {
val: `385`,
val_noFormat: `385`,
excl_cell: `K4`,
formula: `L4*K18`,
hidden: true
},
'L4' : {
val: `2.20`,
val_noFormat: `2,20`,
excl_cell: `L4`,
formula: ``,
hidden: true
},
'M4' : {
val: `190`,
val_noFormat: `190`,
excl_cell: `M4`,
formula: `N4*M18`,
hidden: true
},
'N4' : {
val: `1.15`,
val_noFormat: `1,15`,
excl_cell: `N4`,
formula: ``,
hidden: true
},
'O4' : {
val: `360`,
val_noFormat: `360`,
excl_cell: `O4`,
formula: `P4*O18`,
hidden: true
},
'P4' : {
val: `1.44`,
val_noFormat: `1,44`,
excl_cell: `P4`,
formula: ``,
hidden: true
},
'Q4' : {
val: `935`,
val_noFormat: `935`,
excl_cell: `Q4`,
formula: `SUM(K4,M4,O4)`,
hidden: false
},
'R4' : {
val: `1610.0`,
val_noFormat: `1610.0`,
excl_cell: `R4`,
formula: `ROUND(J4+Q4,3-LEN(INT(J4+Q4)))`,
hidden: true
},
'S4' : {
val: `18,80`,
val_noFormat: `18,80`,
excl_cell: `S4`,
formula: `S18+0.8`,
hidden: false
},
'T4' : {
val: `115,0`,
val_noFormat: `115,0`,
excl_cell: `T4`,
formula: `T18*U4`,
hidden: false
},
'U4' : {
val: `1.353`,
val_noFormat: `1,353`,
excl_cell: `U4`,
formula: ``,
hidden: false
},
'V4' : {
val: `2.162`,
val_noFormat: `2.162`,
excl_cell: `V4`,
formula: `S4*T4`,
hidden: false
},
'W4' : {
val: ``,
val_noFormat: ``,
excl_cell: `W4`,
formula: ``,
hidden: true
},
'X4' : {
val: `40`,
val_noFormat: `40`,
excl_cell: `X4`,
formula: ``,
hidden: false
},
'Y4' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y4`,
formula: ``,
hidden: false
},
'Z4' : {
val: `13.999391330811704`,
val_noFormat: `13.999391330811704`,
excl_cell: `Z4`,
formula: `R4/T4`,
hidden: true
},
'AA4' : {
val: `1063.8954285`,
val_noFormat: `1063.8954285`,
excl_cell: `AA4`,
formula: `D4+F4+G4+I4+K4`,
hidden: true
},
'AB4' : {
val: `1098.1985715`,
val_noFormat: `1098.1985715`,
excl_cell: `AB4`,
formula: `V4-D4-F4-G4-I4-K4`,
hidden: true
},
'AC4' : {
val: `588.4485715000001`,
val_noFormat: `588.4485715000001`,
excl_cell: `AC4`,
formula: `V4+Y4-J4-Q4+X4`,
hidden: false
},
'AD4' : {
val: `83.70454406914894`,
val_noFormat: `83.70454406914894`,
excl_cell: `AD4`,
formula: `(J4+Q4-X4-Y4)/S4`,
hidden: true
},
'AE4' : {
val: `13.7`,
val_noFormat: `13.7`,
excl_cell: `AE4`,
formula: `ROUND((J4+Q4-X4-Y4)/T4,3-LEN(INT((J4+Q4-X4-Y4)/T4)))`,
hidden: true
},
'AF4' : {
val: `94.20050151595744`,
val_noFormat: `94.20050151595744`,
excl_cell: `AF4`,
formula: `(AC41+J4+Q4-X4)/S4`,
hidden: false
},
'AG4' : {
val: `15.39906463632016`,
val_noFormat: `15.39906463632016`,
excl_cell: `AG4`,
formula: `(AC41+J4+Q4-X4)/T4`,
hidden: false
},
'AH4' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH4`,
formula: ``,
hidden: true
},
'AI4' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI4`,
formula: ``,
hidden: true
},
'AJ4' : {
val: `1730.0`,
val_noFormat: `1730.0`,
excl_cell: `AJ4`,
formula: `R4+AH4`,
hidden: true
},
'AK4' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK4`,
formula: ``,
hidden: true
},
'AL4' : {
val: `712.094`,
val_noFormat: `712.094`,
excl_cell: `AL4`,
formula: `V4+AK4-AJ4`,
hidden: true
},
'AM4' : {
val: `632.094`,
val_noFormat: `632.094`,
excl_cell: `AM4`,
formula: `AL4-AI4`,
hidden: true
},
'AN4' : {
val: `1,37`,
val_noFormat: `1,37`,
excl_cell: `AN4`,
formula: `AP4/6.25`,
hidden: true
},
'AO4' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO4`,
formula: ``,
hidden: true
},
'AP4' : {
val: `8,60`,
val_noFormat: `8,60`,
excl_cell: `AP4`,
formula: `AQ4*AO4/100`,
hidden: true
},
'AQ4' : {
val: `10.00`,
val_noFormat: `10,00`,
excl_cell: `AQ4`,
formula: ``,
hidden: true
},
'AR4' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `AR4`,
formula: ``,
hidden: true
},
'AS4' : {
val: `0.90`,
val_noFormat: `0,90`,
excl_cell: `AS4`,
formula: ``,
hidden: true
},
'AT4' : {
val: `262`,
val_noFormat: `262`,
excl_cell: `AT4`,
formula: `AU4+(AR4*T4*AS4)`,
hidden: true
},
'AU4' : {
val: `158`,
val_noFormat: `158`,
excl_cell: `AU4`,
formula: `AN4*T4`,
hidden: true
},
'AV4' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `AV4`,
formula: ``,
hidden: true
},
'AW4' : {
val: `90`,
val_noFormat: `90`,
excl_cell: `AW4`,
formula: ``,
hidden: true
},
'AX4' : {
val: `25`,
val_noFormat: `25`,
excl_cell: `AX4`,
formula: `T4-AW4`,
hidden: true
},
'AY4' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY4`,
formula: ``,
hidden: true
},
'AZ4' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ4`,
formula: ``,
hidden: true
},
'BA4' : {
val: `225`,
val_noFormat: `225`,
excl_cell: `BA4`,
formula: `(IF(AX4>0,AY13*AX4,IF(AX4<0,AZ4*AX4)))+AV4`,
hidden: true
},
'BB4' : {
val: `67`,
val_noFormat: `67`,
excl_cell: `BB4`,
formula: `BA4-AU4`,
hidden: true
},
'BC4' : {
val: `-800`,
val_noFormat: `-800`,
excl_cell: `BC4`,
formula: ``,
hidden: true
},
'BD4' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `BD4`,
formula: ``,
hidden: true
},
'BE4' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE4`,
formula: ``,
hidden: true
},
'BF4' : {
val: `350`,
val_noFormat: `350`,
excl_cell: `BF4`,
formula: `(T4*BD4*BE4*0.1)+BC4`,
hidden: true
},
'BG4' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG4`,
formula: ``,
hidden: false
},
'A5' : {
val: `Wi-Raps`,
val_noFormat: `Wi-Raps`,
excl_cell: `A5`,
formula: ``,
hidden: false
},
'B5' : {
val: `HATTRICK`,
val_noFormat: `HATTRICK`,
excl_cell: `B5`,
formula: ``,
hidden: true
},
'C5' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C5`,
formula: ``,
hidden: false
},
'D5' : {
val: `90`,
val_noFormat: `90`,
excl_cell: `D5`,
formula: `E5*D18`,
hidden: true
},
'E5' : {
val: `1.06`,
val_noFormat: `1,06`,
excl_cell: `E5`,
formula: ``,
hidden: true
},
'F5' : {
val: `222.403914`,
val_noFormat: `222.403914`,
excl_cell: `F5`,
formula: `[2]Düngung!M44*T5+[2]Düngung!P11`,
hidden: true
},
'G5' : {
val: `210`,
val_noFormat: `210`,
excl_cell: `G5`,
formula: `H5*G18`,
hidden: true
},
'H5' : {
val: `1.31`,
val_noFormat: `1,31`,
excl_cell: `H5`,
formula: ``,
hidden: true
},
'I5' : {
val: `86.587100525`,
val_noFormat: `86.587100525`,
excl_cell: `I5`,
formula: `(SUM(D5:G5)/4*0.05)+(V5*0.014*4)`,
hidden: true
},
'J5' : {
val: `609.6610145249999`,
val_noFormat: `609.6610145249999`,
excl_cell: `J5`,
formula: `SUM(D5,F5,G5,I5)`,
hidden: false
},
'K5' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `K5`,
formula: `L5*K18`,
hidden: true
},
'L5' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `L5`,
formula: ``,
hidden: true
},
'M5' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `M5`,
formula: `N5*M18`,
hidden: true
},
'N5' : {
val: `0.85`,
val_noFormat: `0,85`,
excl_cell: `N5`,
formula: ``,
hidden: true
},
'O5' : {
val: `210`,
val_noFormat: `210`,
excl_cell: `O5`,
formula: `P5*O18`,
hidden: true
},
'P5' : {
val: `0.84`,
val_noFormat: `0,84`,
excl_cell: `P5`,
formula: ``,
hidden: true
},
'Q5' : {
val: `515`,
val_noFormat: `515`,
excl_cell: `Q5`,
formula: `SUM(K5,M5,O5)`,
hidden: false
},
'R5' : {
val: `1120.0`,
val_noFormat: `1120.0`,
excl_cell: `R5`,
formula: `ROUND(J5+Q5,3-LEN(INT(J5+Q5)))`,
hidden: true
},
'S5' : {
val: `39,60`,
val_noFormat: `39,60`,
excl_cell: `S5`,
formula: `S18*2.2`,
hidden: false
},
'T5' : {
val: `36,1`,
val_noFormat: `36,1`,
excl_cell: `T5`,
formula: `T18*U5`,
hidden: false
},
'U5' : {
val: `0.424`,
val_noFormat: `0,424`,
excl_cell: `U5`,
formula: ``,
hidden: false
},
'V5' : {
val: `1.429`,
val_noFormat: `1.429`,
excl_cell: `V5`,
formula: `S5*T5`,
hidden: false
},
'W5' : {
val: ``,
val_noFormat: ``,
excl_cell: `W5`,
formula: ``,
hidden: true
},
'X5' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `X5`,
formula: ``,
hidden: false
},
'Y5' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y5`,
formula: ``,
hidden: false
},
'Z5' : {
val: `31.032667424011525`,
val_noFormat: `31.032667424011525`,
excl_cell: `Z5`,
formula: `R5/T5`,
hidden: true
},
'AA5' : {
val: `774.1610145249999`,
val_noFormat: `774.1610145249999`,
excl_cell: `AA5`,
formula: `D5+F5+G5+I5+K5`,
hidden: true
},
'AB5' : {
val: `655.0425854750001`,
val_noFormat: `655.0425854750001`,
excl_cell: `AB5`,
formula: `V5-D5-F5-G5-I5-K5`,
hidden: true
},
'AC5' : {
val: `424.7925854750001`,
val_noFormat: `424.7925854750001`,
excl_cell: `AC5`,
formula: `V5+Y5-J5-Q5+X5`,
hidden: false
},
'AD5' : {
val: `25.363914508207067`,
val_noFormat: `25.363914508207067`,
excl_cell: `AD5`,
formula: `(J5+Q5-X5-Y5)/S5`,
hidden: true
},
'AE5' : {
val: `27.8`,
val_noFormat: `27.8`,
excl_cell: `AE5`,
formula: `ROUND((J5+Q5-X5-Y5)/T5,3-LEN(INT((J5+Q5-X5-Y5)/T5)))`,
hidden: true
},
'AF5' : {
val: `30.346843801136355`,
val_noFormat: `30.346843801136355`,
excl_cell: `AF5`,
formula: `(AC41+J5+Q5-X5)/S5`,
hidden: false
},
'AG5' : {
val: `33.29735985494998`,
val_noFormat: `33.29735985494998`,
excl_cell: `AG5`,
formula: `(AC41+J5+Q5-X5)/T5`,
hidden: false
},
'AH5' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH5`,
formula: ``,
hidden: true
},
'AI5' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI5`,
formula: ``,
hidden: true
},
'AJ5' : {
val: `1240.0`,
val_noFormat: `1240.0`,
excl_cell: `AJ5`,
formula: `R5+AH5`,
hidden: true
},
'AK5' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK5`,
formula: ``,
hidden: true
},
'AL5' : {
val: `469.20360000000005`,
val_noFormat: `469.20360000000005`,
excl_cell: `AL5`,
formula: `V5+AK5-AJ5`,
hidden: true
},
'AM5' : {
val: `389.20360000000005`,
val_noFormat: `389.20360000000005`,
excl_cell: `AM5`,
formula: `AL5-AI5`,
hidden: true
},
'AN5' : {
val: `3.35`,
val_noFormat: `3,35`,
excl_cell: `AN5`,
formula: ``,
hidden: true
},
'AO5' : {
val: `91.0`,
val_noFormat: `91,0`,
excl_cell: `AO5`,
formula: ``,
hidden: true
},
'AP5' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP5`,
formula: ``,
hidden: true
},
'AQ5' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ5`,
formula: ``,
hidden: true
},
'AR5' : {
val: `1.70`,
val_noFormat: `1,70`,
excl_cell: `AR5`,
formula: ``,
hidden: true
},
'AS5' : {
val: `0.70`,
val_noFormat: `0,70`,
excl_cell: `AS5`,
formula: ``,
hidden: true
},
'AT5' : {
val: `164`,
val_noFormat: `164`,
excl_cell: `AT5`,
formula: `AU5+(AR5*T5*AS5)`,
hidden: true
},
'AU5' : {
val: `121`,
val_noFormat: `121`,
excl_cell: `AU5`,
formula: `AN5*T5`,
hidden: true
},
'AV5' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `AV5`,
formula: ``,
hidden: true
},
'AW5' : {
val: `40`,
val_noFormat: `40`,
excl_cell: `AW5`,
formula: ``,
hidden: true
},
'AX5' : {
val: `-4`,
val_noFormat: `-4`,
excl_cell: `AX5`,
formula: `T5-AW5`,
hidden: true
},
'AY5' : {
val: `2.0`,
val_noFormat: `2,0`,
excl_cell: `AY5`,
formula: ``,
hidden: true
},
'AZ5' : {
val: `3.0`,
val_noFormat: `3,0`,
excl_cell: `AZ5`,
formula: ``,
hidden: true
},
'BA5' : {
val: `188`,
val_noFormat: `188`,
excl_cell: `BA5`,
formula: `(IF(AX5>0,AY5*AX5,IF(AX5<0,AZ5*AX5)))+AV5`,
hidden: true
},
'BB5' : {
val: `67`,
val_noFormat: `67`,
excl_cell: `BB5`,
formula: `BA5-AU5`,
hidden: true
},
'BC5' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC5`,
formula: ``,
hidden: true
},
'BD5' : {
val: `1.7`,
val_noFormat: `1,7`,
excl_cell: `BD5`,
formula: ``,
hidden: true
},
'BE5' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE5`,
formula: ``,
hidden: true
},
'BF5' : {
val: `214`,
val_noFormat: `214`,
excl_cell: `BF5`,
formula: `(T5*BD5*BE5*0.1)+BC5`,
hidden: true
},
'BG5' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG5`,
formula: ``,
hidden: false
},
'A6' : {
val: `Sojabohne`,
val_noFormat: `Sojabohne`,
excl_cell: `A6`,
formula: ``,
hidden: false
},
'B6' : {
val: `ADSOY`,
val_noFormat: `ADSOY`,
excl_cell: `B6`,
formula: ``,
hidden: true
},
'C6' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C6`,
formula: ``,
hidden: false
},
'D6' : {
val: `285`,
val_noFormat: `285`,
excl_cell: `D6`,
formula: `E6*D18`,
hidden: true
},
'E6' : {
val: `3.35`,
val_noFormat: `3,35`,
excl_cell: `E6`,
formula: ``,
hidden: true
},
'F6' : {
val: `104.13998`,
val_noFormat: `104.13998`,
excl_cell: `F6`,
formula: `[2]Düngung!M41*T6+[2]Düngung!P11`,
hidden: true
},
'G6' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `G6`,
formula: `H6*G18`,
hidden: true
},
'H6' : {
val: `0.63`,
val_noFormat: `0,63`,
excl_cell: `H6`,
formula: ``,
hidden: true
},
'I6' : {
val: `42.25726655`,
val_noFormat: `42.25726655`,
excl_cell: `I6`,
formula: `(SUM(D6:G6)/4*0.05)+(V6*0.014*2)`,
hidden: true
},
'J6' : {
val: `531.14724655`,
val_noFormat: `531.14724655`,
excl_cell: `J6`,
formula: `SUM(D6,F6,G6,I6)`,
hidden: false
},
'K6' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `K6`,
formula: `L6*K18`,
hidden: true
},
'L6' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `L6`,
formula: ``,
hidden: true
},
'M6' : {
val: `132`,
val_noFormat: `132`,
excl_cell: `M6`,
formula: `N6*M18`,
hidden: true
},
'N6' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `N6`,
formula: ``,
hidden: true
},
'O6' : {
val: `215`,
val_noFormat: `215`,
excl_cell: `O6`,
formula: `P6*O18`,
hidden: true
},
'P6' : {
val: `0.86`,
val_noFormat: `0,86`,
excl_cell: `P6`,
formula: ``,
hidden: true
},
'Q6' : {
val: `512`,
val_noFormat: `512`,
excl_cell: `Q6`,
formula: `SUM(K6,M6,O6)`,
hidden: false
},
'R6' : {
val: `1040.0`,
val_noFormat: `1040.0`,
excl_cell: `R6`,
formula: `ROUND(J6+Q6,3-LEN(INT(J6+Q6)))`,
hidden: true
},
'S6' : {
val: `42,73`,
val_noFormat: `42,73`,
excl_cell: `S6`,
formula: `S18*2.374`,
hidden: false
},
'T6' : {
val: `30,2`,
val_noFormat: `30,2`,
excl_cell: `T6`,
formula: `T18*U6`,
hidden: false
},
'U6' : {
val: `0.355`,
val_noFormat: `0,355`,
excl_cell: `U6`,
formula: ``,
hidden: false
},
'V6' : {
val: `1.289`,
val_noFormat: `1.289`,
excl_cell: `V6`,
formula: `S6*T6`,
hidden: false
},
'W6' : {
val: ``,
val_noFormat: ``,
excl_cell: `W6`,
formula: ``,
hidden: true
},
'X6' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `X6`,
formula: ``,
hidden: false
},
'Y6' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y6`,
formula: ``,
hidden: false
},
'Z6' : {
val: `34.46561723280862`,
val_noFormat: `34.46561723280862`,
excl_cell: `Z6`,
formula: `R6/T6`,
hidden: true
},
'AA6' : {
val: `695.64724655`,
val_noFormat: `695.64724655`,
excl_cell: `AA6`,
formula: `D6+F6+G6+I6+K6`,
hidden: true
},
'AB6' : {
val: `593.7908534499998`,
val_noFormat: `593.7908534499998`,
excl_cell: `AB6`,
formula: `V6-D6-F6-G6-I6-K6`,
hidden: true
},
'AC6' : {
val: `326.7908534499999`,
val_noFormat: `326.7908534499999`,
excl_cell: `AC6`,
formula: `V6+Y6-J6-Q6+X6`,
hidden: false
},
'AD6' : {
val: `22.527549530796595`,
val_noFormat: `22.527549530796595`,
excl_cell: `AD6`,
formula: `(J6+Q6-X6-Y6)/S6`,
hidden: true
},
'AE6' : {
val: `31.9`,
val_noFormat: `31.9`,
excl_cell: `AE6`,
formula: `ROUND((J6+Q6-X6-Y6)/T6,3-LEN(INT((J6+Q6-X6-Y6)/T6)))`,
hidden: true
},
'AF6' : {
val: `27.145259911775717`,
val_noFormat: `27.145259911775717`,
excl_cell: `AF6`,
formula: `(AC41+J6+Q6-X6)/S6`,
hidden: false
},
'AG6' : {
val: `38.441466331400164`,
val_noFormat: `38.441466331400164`,
excl_cell: `AG6`,
formula: `(AC41+J6+Q6-X6)/T6`,
hidden: false
},
'AH6' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH6`,
formula: ``,
hidden: true
},
'AI6' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI6`,
formula: ``,
hidden: true
},
'AJ6' : {
val: `1160.0`,
val_noFormat: `1160.0`,
excl_cell: `AJ6`,
formula: `R6+AH6`,
hidden: true
},
'AK6' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK6`,
formula: ``,
hidden: true
},
'AL6' : {
val: `409.43809999999985`,
val_noFormat: `409.43809999999985`,
excl_cell: `AL6`,
formula: `V6+AK6-AJ6`,
hidden: true
},
'AM6' : {
val: `329.43809999999985`,
val_noFormat: `329.43809999999985`,
excl_cell: `AM6`,
formula: `AL6-AI6`,
hidden: true
},
'AN6' : {
val: `4.40`,
val_noFormat: `4,40`,
excl_cell: `AN6`,
formula: ``,
hidden: true
},
'AO6' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO6`,
formula: ``,
hidden: true
},
'AP6' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP6`,
formula: ``,
hidden: true
},
'AQ6' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ6`,
formula: ``,
hidden: true
},
'AR6' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `AR6`,
formula: ``,
hidden: true
},
'AS6' : {
val: `1.50`,
val_noFormat: `1,50`,
excl_cell: `AS6`,
formula: ``,
hidden: true
},
'AT6' : {
val: ``,
val_noFormat: ``,
excl_cell: `AT6`,
formula: ``,
hidden: true
},
'AU6' : {
val: `133`,
val_noFormat: `133`,
excl_cell: `AU6`,
formula: `AN6*T6`,
hidden: true
},
'AV6' : {
val: ``,
val_noFormat: ``,
excl_cell: `AV6`,
formula: ``,
hidden: true
},
'AW6' : {
val: ``,
val_noFormat: ``,
excl_cell: `AW6`,
formula: ``,
hidden: true
},
'AX6' : {
val: ``,
val_noFormat: ``,
excl_cell: `AX6`,
formula: ``,
hidden: true
},
'AY6' : {
val: ``,
val_noFormat: ``,
excl_cell: `AY6`,
formula: ``,
hidden: true
},
'AZ6' : {
val: ``,
val_noFormat: ``,
excl_cell: `AZ6`,
formula: ``,
hidden: true
},
'BA6' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `BA6`,
formula: `T6*5.3`,
hidden: true
},
'BB6' : {
val: `27`,
val_noFormat: `27`,
excl_cell: `BB6`,
formula: `BA6-AU6`,
hidden: true
},
'BC6' : {
val: `-240`,
val_noFormat: `-240`,
excl_cell: `BC6`,
formula: ``,
hidden: true
},
'BD6' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `BD6`,
formula: ``,
hidden: true
},
'BE6' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE6`,
formula: ``,
hidden: true
},
'BF6' : {
val: `62`,
val_noFormat: `62`,
excl_cell: `BF6`,
formula: `(T6*BD6*BE6*0.1)+BC6`,
hidden: true
},
'BG6' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG6`,
formula: ``,
hidden: false
},
'A7' : {
val: `Zuckerrübe`,
val_noFormat: `Zuckerrübe`,
excl_cell: `A7`,
formula: ``,
hidden: false
},
'B7' : {
val: `MARLEY`,
val_noFormat: `MARLEY`,
excl_cell: `B7`,
formula: ``,
hidden: true
},
'C7' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C7`,
formula: ``,
hidden: false
},
'D7' : {
val: `265`,
val_noFormat: `265`,
excl_cell: `D7`,
formula: `E7*D18`,
hidden: true
},
'E7' : {
val: `3.12`,
val_noFormat: `3,12`,
excl_cell: `E7`,
formula: ``,
hidden: true
},
'F7' : {
val: `361.63745`,
val_noFormat: `361.63745`,
excl_cell: `F7`,
formula: `[2]Düngung!M48*T7/10*10+[2]Düngung!P11`,
hidden: true
},
'G7' : {
val: `395`,
val_noFormat: `395`,
excl_cell: `G7`,
formula: `H7*G18`,
hidden: true
},
'H7' : {
val: `2.46`,
val_noFormat: `2,46`,
excl_cell: `H7`,
formula: ``,
hidden: true
},
'I7' : {
val: `142.550490125`,
val_noFormat: `142.550490125`,
excl_cell: `I7`,
formula: `(SUM(D7:G7)/4*0.05)+(V7*0.04*1.5)`,
hidden: true
},
'J7' : {
val: `1164.267940125`,
val_noFormat: `1164.267940125`,
excl_cell: `J7`,
formula: `SUM(D7,F7,G7,I7)`,
hidden: false
},
'K7' : {
val: `210`,
val_noFormat: `210`,
excl_cell: `K7`,
formula: `L7*K18`,
hidden: true
},
'L7' : {
val: `1.20`,
val_noFormat: `1,20`,
excl_cell: `L7`,
formula: ``,
hidden: true
},
'M7' : {
val: `190`,
val_noFormat: `190`,
excl_cell: `M7`,
formula: `N7*M18`,
hidden: true
},
'N7' : {
val: `1.15`,
val_noFormat: `1,15`,
excl_cell: `N7`,
formula: ``,
hidden: true
},
'O7' : {
val: `220`,
val_noFormat: `220`,
excl_cell: `O7`,
formula: `P7*O18`,
hidden: true
},
'P7' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `P7`,
formula: ``,
hidden: true
},
'Q7' : {
val: `620`,
val_noFormat: `620`,
excl_cell: `Q7`,
formula: `SUM(K7,M7,O7)`,
hidden: false
},
'R7' : {
val: `1780.0`,
val_noFormat: `1780.0`,
excl_cell: `R7`,
formula: `ROUND(J7+Q7,3-LEN(INT(J7+Q7)))`,
hidden: true
},
'S7' : {
val: `2,79`,
val_noFormat: `2,79`,
excl_cell: `S7`,
formula: `S18*0.155`,
hidden: false
},
'T7' : {
val: `775,0`,
val_noFormat: `775,0`,
excl_cell: `T7`,
formula: `T18*U7`,
hidden: false
},
'U7' : {
val: `9.12`,
val_noFormat: `9,12`,
excl_cell: `U7`,
formula: ``,
hidden: false
},
'V7' : {
val: `2.162`,
val_noFormat: `2.162`,
excl_cell: `V7`,
formula: `S7*T7`,
hidden: false
},
'W7' : {
val: ``,
val_noFormat: ``,
excl_cell: `W7`,
formula: ``,
hidden: true
},
'X7' : {
val: `-60`,
val_noFormat: `-60`,
excl_cell: `X7`,
formula: ``,
hidden: false
},
'Y7' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y7`,
formula: ``,
hidden: false
},
'Z7' : {
val: `2.296685289601693`,
val_noFormat: `2.296685289601693`,
excl_cell: `Z7`,
formula: `R7/T7`,
hidden: true
},
'AA7' : {
val: `1374.267940125`,
val_noFormat: `1374.267940125`,
excl_cell: `AA7`,
formula: `D7+F7+G7+I7+K7`,
hidden: true
},
'AB7' : {
val: `788.065759875`,
val_noFormat: `788.065759875`,
excl_cell: `AB7`,
formula: `V7-D7-F7-G7-I7-K7`,
hidden: true
},
'AC7' : {
val: `318.31575987500014`,
val_noFormat: `318.31575987500014`,
excl_cell: `AC7`,
formula: `V7+Y7-J7-Q7+X7`,
hidden: false
},
'AD7' : {
val: `660.9383297939067`,
val_noFormat: `660.9383297939067`,
excl_cell: `AD7`,
formula: `(J7+Q7-X7-Y7)/S7`,
hidden: true
},
'AE7' : {
val: `2.38`,
val_noFormat: `2.38`,
excl_cell: `AE7`,
formula: `ROUND((J7+Q7-X7-Y7)/T7,3-LEN(INT((J7+Q7-X7-Y7)/T7)))`,
hidden: true
},
'AF7' : {
val: `731.6637778225805`,
val_noFormat: `731.6637778225805`,
excl_cell: `AF7`,
formula: `(AC41+J7+Q7-X7)/S7`,
hidden: false
},
'AG7' : {
val: `2.6338876432202625`,
val_noFormat: `2.6338876432202625`,
excl_cell: `AG7`,
formula: `(AC41+J7+Q7-X7)/T7`,
hidden: false
},
'AH7' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH7`,
formula: ``,
hidden: true
},
'AI7' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI7`,
formula: ``,
hidden: true
},
'AJ7' : {
val: `1900.0`,
val_noFormat: `1900.0`,
excl_cell: `AJ7`,
formula: `R7+AH7`,
hidden: true
},
'AK7' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK7`,
formula: ``,
hidden: true
},
'AL7' : {
val: `542.3337000000001`,
val_noFormat: `542.3337000000001`,
excl_cell: `AL7`,
formula: `V7+AK7-AJ7`,
hidden: true
},
'AM7' : {
val: `462.33370000000014`,
val_noFormat: `462.33370000000014`,
excl_cell: `AM7`,
formula: `AL7-AI7`,
hidden: true
},
'AN7' : {
val: `0.18`,
val_noFormat: `0,18`,
excl_cell: `AN7`,
formula: ``,
hidden: true
},
'AO7' : {
val: `23.0`,
val_noFormat: `23,0`,
excl_cell: `AO7`,
formula: ``,
hidden: true
},
'AP7' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP7`,
formula: ``,
hidden: true
},
'AQ7' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ7`,
formula: ``,
hidden: true
},
'AR7' : {
val: `0.70`,
val_noFormat: `0,70`,
excl_cell: `AR7`,
formula: ``,
hidden: true
},
'AS7' : {
val: `0.40`,
val_noFormat: `0,40`,
excl_cell: `AS7`,
formula: ``,
hidden: true
},
'AT7' : {
val: `357`,
val_noFormat: `357`,
excl_cell: `AT7`,
formula: `AU7+(AR7*T7/10*AS7)*10`,
hidden: true
},
'AU7' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `AU7`,
formula: `AN7*T7/10*10`,
hidden: true
},
'AV7' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `AV7`,
formula: ``,
hidden: true
},
'AW7' : {
val: `65`,
val_noFormat: `65`,
excl_cell: `AW7`,
formula: ``,
hidden: true
},
'AX7' : {
val: `13`,
val_noFormat: `13`,
excl_cell: `AX7`,
formula: `(T7/10)-AW7`,
hidden: true
},
'AY7' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY7`,
formula: ``,
hidden: true
},
'AZ7' : {
val: `2.0`,
val_noFormat: `2,0`,
excl_cell: `AZ7`,
formula: ``,
hidden: true
},
'BA7' : {
val: `183`,
val_noFormat: `183`,
excl_cell: `BA7`,
formula: `(IF(AX7>0,AY7*AX7,IF(AX7<0,AZ7*AX7)))+AV7`,
hidden: true
},
'BB7' : {
val: `43`,
val_noFormat: `43`,
excl_cell: `BB7`,
formula: `BA7-AU7`,
hidden: true
},
'BC7' : {
val: `-1.300`,
val_noFormat: `-1.300`,
excl_cell: `BC7`,
formula: ``,
hidden: true
},
'BD7' : {
val: `0.7`,
val_noFormat: `0,7`,
excl_cell: `BD7`,
formula: ``,
hidden: true
},
'BE7' : {
val: `8`,
val_noFormat: `8`,
excl_cell: `BE7`,
formula: ``,
hidden: true
},
'BF7' : {
val: `-866`,
val_noFormat: `-866`,
excl_cell: `BF7`,
formula: `(T7/10*BD7*BE7)+BC7`,
hidden: true
},
'BG7' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG7`,
formula: ``,
hidden: false
},
'A8' : {
val: `Gehaltsrübe`,
val_noFormat: `Gehaltsrübe`,
excl_cell: `A8`,
formula: ``,
hidden: true
},
'B8' : {
val: `BRUNIUM`,
val_noFormat: `BRUNIUM`,
excl_cell: `B8`,
formula: ``,
hidden: true
},
'C8' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C8`,
formula: ``,
hidden: true
},
'D8' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `D8`,
formula: `E8*D18`,
hidden: true
},
'E8' : {
val: `0.00`,
val_noFormat: `0,00`,
excl_cell: `E8`,
formula: ``,
hidden: true
},
'F8' : {
val: ``,
val_noFormat: ``,
excl_cell: `F8`,
formula: ``,
hidden: true
},
'G8' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `G8`,
formula: `H8*G18`,
hidden: true
},
'H8' : {
val: ``,
val_noFormat: ``,
excl_cell: `H8`,
formula: ``,
hidden: true
},
'I8' : {
val: ``,
val_noFormat: ``,
excl_cell: `I8`,
formula: ``,
hidden: true
},
'J8' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `J8`,
formula: `SUM(D8,F8,G8,I8)`,
hidden: true
},
'K8' : {
val: ``,
val_noFormat: ``,
excl_cell: `K8`,
formula: ``,
hidden: true
},
'L8' : {
val: ``,
val_noFormat: ``,
excl_cell: `L8`,
formula: ``,
hidden: true
},
'M8' : {
val: ``,
val_noFormat: ``,
excl_cell: `M8`,
formula: ``,
hidden: true
},
'N8' : {
val: ``,
val_noFormat: ``,
excl_cell: `N8`,
formula: ``,
hidden: true
},
'O8' : {
val: ``,
val_noFormat: ``,
excl_cell: `O8`,
formula: ``,
hidden: true
},
'P8' : {
val: ``,
val_noFormat: ``,
excl_cell: `P8`,
formula: ``,
hidden: true
},
'Q8' : {
val: ``,
val_noFormat: ``,
excl_cell: `Q8`,
formula: ``,
hidden: true
},
'R8' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `R8`,
formula: `ROUND(J8+Q8,3-LEN(INT(J8+Q8)))`,
hidden: true
},
'S8' : {
val: ``,
val_noFormat: ``,
excl_cell: `S8`,
formula: ``,
hidden: true
},
'T8' : {
val: `1.020,0`,
val_noFormat: `1.020,0`,
excl_cell: `T8`,
formula: `T18*U8`,
hidden: true
},
'U8' : {
val: `12.00`,
val_noFormat: `12,00`,
excl_cell: `U8`,
formula: ``,
hidden: true
},
'V8' : {
val: ``,
val_noFormat: ``,
excl_cell: `V8`,
formula: ``,
hidden: true
},
'W8' : {
val: ``,
val_noFormat: ``,
excl_cell: `W8`,
formula: ``,
hidden: true
},
'X8' : {
val: ``,
val_noFormat: ``,
excl_cell: `X8`,
formula: ``,
hidden: true
},
'Y8' : {
val: ``,
val_noFormat: ``,
excl_cell: `Y8`,
formula: ``,
hidden: true
},
'Z8' : {
val: ``,
val_noFormat: ``,
excl_cell: `Z8`,
formula: ``,
hidden: true
},
'AA8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AA8`,
formula: ``,
hidden: true
},
'AB8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AB8`,
formula: ``,
hidden: true
},
'AC8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AC8`,
formula: ``,
hidden: true
},
'AD8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AD8`,
formula: ``,
hidden: true
},
'AE8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AE8`,
formula: ``,
hidden: true
},
'AF8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AF8`,
formula: ``,
hidden: true
},
'AG8' : {
val: `0.19345490196078427`,
val_noFormat: `0.19345490196078427`,
excl_cell: `AG8`,
formula: `(AC41+J8+Q8-X8)/T8`,
hidden: true
},
'AH8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AH8`,
formula: ``,
hidden: true
},
'AI8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AI8`,
formula: ``,
hidden: true
},
'AJ8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AJ8`,
formula: ``,
hidden: true
},
'AK8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AK8`,
formula: ``,
hidden: true
},
'AL8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AL8`,
formula: ``,
hidden: true
},
'AM8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AM8`,
formula: ``,
hidden: true
},
'AN8' : {
val: `0.18`,
val_noFormat: `0,18`,
excl_cell: `AN8`,
formula: ``,
hidden: true
},
'AO8' : {
val: `15.0`,
val_noFormat: `15,0`,
excl_cell: `AO8`,
formula: ``,
hidden: true
},
'AP8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP8`,
formula: ``,
hidden: true
},
'AQ8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ8`,
formula: ``,
hidden: true
},
'AR8' : {
val: `0.40`,
val_noFormat: `0,40`,
excl_cell: `AR8`,
formula: ``,
hidden: true
},
'AS8' : {
val: `0.30`,
val_noFormat: `0,30`,
excl_cell: `AS8`,
formula: ``,
hidden: true
},
'AT8' : {
val: `306`,
val_noFormat: `306`,
excl_cell: `AT8`,
formula: `AU8+(AR8*T8*AS8)`,
hidden: true
},
'AU8' : {
val: `183`,
val_noFormat: `183`,
excl_cell: `AU8`,
formula: `AN8*T8`,
hidden: true
},
'AV8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AV8`,
formula: ``,
hidden: true
},
'AW8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AW8`,
formula: ``,
hidden: true
},
'AX8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AX8`,
formula: ``,
hidden: true
},
'AY8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AY8`,
formula: ``,
hidden: true
},
'AZ8' : {
val: ``,
val_noFormat: ``,
excl_cell: `AZ8`,
formula: ``,
hidden: true
},
'BA8' : {
val: ``,
val_noFormat: ``,
excl_cell: `BA8`,
formula: ``,
hidden: true
},
'BB8' : {
val: ``,
val_noFormat: ``,
excl_cell: `BB8`,
formula: ``,
hidden: true
},
'BC8' : {
val: `-1.300`,
val_noFormat: `-1.300`,
excl_cell: `BC8`,
formula: ``,
hidden: true
},
'BD8' : {
val: `0.4`,
val_noFormat: `0,4`,
excl_cell: `BD8`,
formula: ``,
hidden: true
},
'BE8' : {
val: `8`,
val_noFormat: `8`,
excl_cell: `BE8`,
formula: ``,
hidden: true
},
'BF8' : {
val: `1.964`,
val_noFormat: `1.964`,
excl_cell: `BF8`,
formula: `(T8*BD8*BE8)+BC8`,
hidden: true
},
'BG8' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG8`,
formula: ``,
hidden: true
},
'A9' : {
val: `Wi-Raps (L)`,
val_noFormat: `Wi-Raps (L)`,
excl_cell: `A9`,
formula: ``,
hidden: true
},
'B9' : {
val: ``,
val_noFormat: ``,
excl_cell: `B9`,
formula: ``,
hidden: true
},
'C9' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C9`,
formula: ``,
hidden: true
},
'D9' : {
val: `57`,
val_noFormat: `57`,
excl_cell: `D9`,
formula: `E9*D18`,
hidden: true
},
'E9' : {
val: `0.67`,
val_noFormat: `0,67`,
excl_cell: `E9`,
formula: ``,
hidden: true
},
'F9' : {
val: `212.5344`,
val_noFormat: `212.5344`,
excl_cell: `F9`,
formula: `[2]Düngung!M45*T9`,
hidden: true
},
'G9' : {
val: `173`,
val_noFormat: `173`,
excl_cell: `G9`,
formula: `H9*G18`,
hidden: true
},
'H9' : {
val: `1.08`,
val_noFormat: `1,08`,
excl_cell: `H9`,
formula: ``,
hidden: true
},
'I9' : {
val: `41.957649473684214`,
val_noFormat: `41.957649473684214`,
excl_cell: `I9`,
formula: `(SUM(D9:G9)/2*0.05)+(V9*0.02)`,
hidden: true
},
'J9' : {
val: `484.07362842105266`,
val_noFormat: `484.07362842105266`,
excl_cell: `J9`,
formula: `SUM(D9,F9,G9,I9)`,
hidden: true
},
'K9' : {
val: `209`,
val_noFormat: `209`,
excl_cell: `K9`,
formula: `L9*K18`,
hidden: true
},
'L9' : {
val: `1.19`,
val_noFormat: `1,19`,
excl_cell: `L9`,
formula: ``,
hidden: true
},
'M9' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `M9`,
formula: `N9*M18`,
hidden: true
},
'N9' : {
val: `0.85`,
val_noFormat: `0,85`,
excl_cell: `N9`,
formula: ``,
hidden: true
},
'O9' : {
val: `204`,
val_noFormat: `204`,
excl_cell: `O9`,
formula: `P9*O18`,
hidden: true
},
'P9' : {
val: `0.81`,
val_noFormat: `0,81`,
excl_cell: `P9`,
formula: ``,
hidden: true
},
'Q9' : {
val: `553`,
val_noFormat: `553`,
excl_cell: `Q9`,
formula: `SUM(K9,M9,O9)`,
hidden: true
},
'R9' : {
val: `1040.0`,
val_noFormat: `1040.0`,
excl_cell: `R9`,
formula: `ROUND(J9+Q9,3-LEN(INT(J9+Q9)))`,
hidden: true
},
'S9' : {
val: `39,60`,
val_noFormat: `39,60`,
excl_cell: `S9`,
formula: `S5`,
hidden: true
},
'T9' : {
val: `39,0`,
val_noFormat: `39,0`,
excl_cell: `T9`,
formula: `T18*U9`,
hidden: true
},
'U9' : {
val: `0.459`,
val_noFormat: `0,459`,
excl_cell: `U9`,
formula: ``,
hidden: true
},
'V9' : {
val: `1.544`,
val_noFormat: `1.544`,
excl_cell: `V9`,
formula: `S9*T9`,
hidden: true
},
'W9' : {
val: ``,
val_noFormat: ``,
excl_cell: `W9`,
formula: ``,
hidden: true
},
'X9' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `X9`,
formula: ``,
hidden: true
},
'Y9' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y9`,
formula: ``,
hidden: true
},
'Z9' : {
val: `26.666666666666668`,
val_noFormat: `26.666666666666668`,
excl_cell: `Z9`,
formula: `R9/T9`,
hidden: true
},
'AA9' : {
val: `692.9445961629882`,
val_noFormat: `692.9445961629882`,
excl_cell: `AA9`,
formula: `D9+F9+G9+I9+K9`,
hidden: true
},
'AB9' : {
val: `851.4554038370118`,
val_noFormat: `851.4554038370118`,
excl_cell: `AB9`,
formula: `V9-D9-F9-G9-I9-K9`,
hidden: true
},
'AC9' : {
val: `627.4554038370118`,
val_noFormat: `627.4554038370118`,
excl_cell: `AC9`,
formula: `V9+Y9-J9-Q9+X9`,
hidden: true
},
'AD9' : {
val: `23.155166569772433`,
val_noFormat: `23.155166569772433`,
excl_cell: `AD9`,
formula: `(J9+Q9-X9-Y9)/S9`,
hidden: true
},
'AE9' : {
val: `23.5`,
val_noFormat: `23.5`,
excl_cell: `AE9`,
formula: `ROUND((J9+Q9-X9-Y9)/T9,3-LEN(INT((J9+Q9-X9-Y9)/T9)))`,
hidden: true
},
'AF9' : {
val: `28.13809586270172`,
val_noFormat: `28.13809586270172`,
excl_cell: `AF9`,
formula: `(AC41+J9+Q9-X9)/S9`,
hidden: true
},
'AG9' : {
val: `28.570989645204826`,
val_noFormat: `28.570989645204826`,
excl_cell: `AG9`,
formula: `(AC41+J9+Q9-X9)/T9`,
hidden: true
},
'AH9' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH9`,
formula: ``,
hidden: true
},
'AI9' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI9`,
formula: ``,
hidden: true
},
'AJ9' : {
val: `1160.0`,
val_noFormat: `1160.0`,
excl_cell: `AJ9`,
formula: `R9+AH9`,
hidden: true
},
'AK9' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK9`,
formula: ``,
hidden: true
},
'AL9' : {
val: `664.4000000000001`,
val_noFormat: `664.4000000000001`,
excl_cell: `AL9`,
formula: `V9+AK9-AJ9`,
hidden: true
},
'AM9' : {
val: `584.4000000000001`,
val_noFormat: `584.4000000000001`,
excl_cell: `AM9`,
formula: `AL9-AI9`,
hidden: true
},
'AN9' : {
val: `3.35`,
val_noFormat: `3,35`,
excl_cell: `AN9`,
formula: ``,
hidden: true
},
'AO9' : {
val: `91.0`,
val_noFormat: `91,0`,
excl_cell: `AO9`,
formula: ``,
hidden: true
},
'AP9' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP9`,
formula: ``,
hidden: true
},
'AQ9' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ9`,
formula: ``,
hidden: true
},
'AR9' : {
val: `1.70`,
val_noFormat: `1,70`,
excl_cell: `AR9`,
formula: ``,
hidden: true
},
'AS9' : {
val: `0.70`,
val_noFormat: `0,70`,
excl_cell: `AS9`,
formula: ``,
hidden: true
},
'AT9' : {
val: `177`,
val_noFormat: `177`,
excl_cell: `AT9`,
formula: `AU9+(AR9*T9*AS9)`,
hidden: true
},
'AU9' : {
val: `131`,
val_noFormat: `131`,
excl_cell: `AU9`,
formula: `AN9*T9`,
hidden: true
},
'AV9' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `AV9`,
formula: ``,
hidden: true
},
'AW9' : {
val: `40`,
val_noFormat: `40`,
excl_cell: `AW9`,
formula: ``,
hidden: true
},
'AX9' : {
val: `-1`,
val_noFormat: `-1`,
excl_cell: `AX9`,
formula: `T9-AW9`,
hidden: true
},
'AY9' : {
val: `2.0`,
val_noFormat: `2,0`,
excl_cell: `AY9`,
formula: ``,
hidden: true
},
'AZ9' : {
val: `3.0`,
val_noFormat: `3,0`,
excl_cell: `AZ9`,
formula: ``,
hidden: true
},
'BA9' : {
val: `197`,
val_noFormat: `197`,
excl_cell: `BA9`,
formula: `(IF(AX9>0,AY9*AX9,IF(AX9<0,AZ9*AX9)))+AV9`,
hidden: true
},
'BB9' : {
val: `66`,
val_noFormat: `66`,
excl_cell: `BB9`,
formula: `BA9-AU9`,
hidden: true
},
'BC9' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC9`,
formula: ``,
hidden: true
},
'BD9' : {
val: `1.7`,
val_noFormat: `1,7`,
excl_cell: `BD9`,
formula: ``,
hidden: true
},
'BE9' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE9`,
formula: ``,
hidden: true
},
'BF9' : {
val: `263`,
val_noFormat: `263`,
excl_cell: `BF9`,
formula: `(T9*BD9*BE9*0.1)+BC9`,
hidden: true
},
'BG9' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG9`,
formula: ``,
hidden: true
},
'A10' : {
val: `Körnererbse`,
val_noFormat: `Körnererbse`,
excl_cell: `A10`,
formula: ``,
hidden: false
},
'B10' : {
val: `ASTRONAUTE`,
val_noFormat: `ASTRONAUTE`,
excl_cell: `B10`,
formula: ``,
hidden: true
},
'C10' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C10`,
formula: ``,
hidden: false
},
'D10' : {
val: `95`,
val_noFormat: `95`,
excl_cell: `D10`,
formula: `E10*D18`,
hidden: true
},
'E10' : {
val: `1.12`,
val_noFormat: `1,12`,
excl_cell: `E10`,
formula: ``,
hidden: true
},
'F10' : {
val: `126.30049999999999`,
val_noFormat: `126.30049999999999`,
excl_cell: `F10`,
formula: `[2]Düngung!M42*T10+[2]Düngung!P11`,
hidden: true
},
'G10' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `G10`,
formula: `H10*G18`,
hidden: true
},
'H10' : {
val: `0.63`,
val_noFormat: `0,63`,
excl_cell: `H10`,
formula: ``,
hidden: true
},
'I10' : {
val: `13.442256250000002`,
val_noFormat: `13.442256250000002`,
excl_cell: `I10`,
formula: `(SUM(D10:G10)/4*0.05)+(V10*0.01)`,
hidden: true
},
'J10' : {
val: `334.94275625`,
val_noFormat: `334.94275625`,
excl_cell: `J10`,
formula: `SUM(D10,F10,G10,I10)`,
hidden: false
},
'K10' : {
val: `150`,
val_noFormat: `150`,
excl_cell: `K10`,
formula: `L10*K18`,
hidden: true
},
'L10' : {
val: `0.85`,
val_noFormat: `0,85`,
excl_cell: `L10`,
formula: ``,
hidden: true
},
'M10' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `M10`,
formula: `N10*M18`,
hidden: true
},
'N10' : {
val: `0.73`,
val_noFormat: `0,73`,
excl_cell: `N10`,
formula: ``,
hidden: true
},
'O10' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `O10`,
formula: `P10*O18`,
hidden: true
},
'P10' : {
val: `0.92`,
val_noFormat: `0,92`,
excl_cell: `P10`,
formula: ``,
hidden: true
},
'Q10' : {
val: `500`,
val_noFormat: `500`,
excl_cell: `Q10`,
formula: `SUM(K10,M10,O10)`,
hidden: false
},
'R10' : {
val: `835.0`,
val_noFormat: `835.0`,
excl_cell: `R10`,
formula: `ROUND(J10+Q10,3-LEN(INT(J10+Q10)))`,
hidden: true
},
'S10' : {
val: `22,14`,
val_noFormat: `22,14`,
excl_cell: `S10`,
formula: `S18*1.23`,
hidden: false
},
'T10' : {
val: `42,5`,
val_noFormat: `42,5`,
excl_cell: `T10`,
formula: `T18*U10`,
hidden: false
},
'U10' : {
val: `0.500`,
val_noFormat: `0,500`,
excl_cell: `U10`,
formula: ``,
hidden: false
},
'V10' : {
val: `941`,
val_noFormat: `941`,
excl_cell: `V10`,
formula: `S10*T10`,
hidden: false
},
'W10' : {
val: ``,
val_noFormat: ``,
excl_cell: `W10`,
formula: ``,
hidden: true
},
'X10' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `X10`,
formula: ``,
hidden: false
},
'Y10' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y10`,
formula: ``,
hidden: false
},
'Z10' : {
val: `19.647058823529413`,
val_noFormat: `19.647058823529413`,
excl_cell: `Z10`,
formula: `R10/T10`,
hidden: true
},
'AA10' : {
val: `484.56775625`,
val_noFormat: `484.56775625`,
excl_cell: `AA10`,
formula: `D10+F10+G10+I10+K10`,
hidden: true
},
'AB10' : {
val: `456.38224375000004`,
val_noFormat: `456.38224375000004`,
excl_cell: `AB10`,
formula: `V10-D10-F10-G10-I10-K10`,
hidden: true
},
'AC10' : {
val: `265.93224375000005`,
val_noFormat: `265.93224375000005`,
excl_cell: `AC10`,
formula: `V10+Y10-J10-Q10+X10`,
hidden: false
},
'AD10' : {
val: `30.48860687669377`,
val_noFormat: `30.48860687669377`,
excl_cell: `AD10`,
formula: `(J10+Q10-X10-Y10)/S10`,
hidden: true
},
'AE10' : {
val: `15.9`,
val_noFormat: `15.9`,
excl_cell: `AE10`,
formula: `ROUND((J10+Q10-X10-Y10)/T10,3-LEN(INT((J10+Q10-X10-Y10)/T10)))`,
hidden: true
},
'AF10' : {
val: `39.40116333559168`,
val_noFormat: `39.40116333559168`,
excl_cell: `AF10`,
formula: `(AC41+J10+Q10-X10)/S10`,
hidden: false
},
'AG10' : {
val: `20.52568838235294`,
val_noFormat: `20.52568838235294`,
excl_cell: `AG10`,
formula: `(AC41+J10+Q10-X10)/T10`,
hidden: false
},
'AH10' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH10`,
formula: ``,
hidden: true
},
'AI10' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI10`,
formula: ``,
hidden: true
},
'AJ10' : {
val: `955.0`,
val_noFormat: `955.0`,
excl_cell: `AJ10`,
formula: `R10+AH10`,
hidden: true
},
'AK10' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK10`,
formula: ``,
hidden: true
},
'AL10' : {
val: `265.95000000000005`,
val_noFormat: `265.95000000000005`,
excl_cell: `AL10`,
formula: `V10+AK10-AJ10`,
hidden: true
},
'AM10' : {
val: `185.95000000000005`,
val_noFormat: `185.95000000000005`,
excl_cell: `AM10`,
formula: `AL10-AI10`,
hidden: true
},
'AN10' : {
val: `3.60`,
val_noFormat: `3,60`,
excl_cell: `AN10`,
formula: ``,
hidden: true
},
'AO10' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO10`,
formula: ``,
hidden: true
},
'AP10' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP10`,
formula: ``,
hidden: true
},
'AQ10' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ10`,
formula: ``,
hidden: true
},
'AR10' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `AR10`,
formula: ``,
hidden: true
},
'AS10' : {
val: `1.50`,
val_noFormat: `1,50`,
excl_cell: `AS10`,
formula: ``,
hidden: true
},
'AT10' : {
val: ``,
val_noFormat: ``,
excl_cell: `AT10`,
formula: ``,
hidden: true
},
'AU10' : {
val: `153`,
val_noFormat: `153`,
excl_cell: `AU10`,
formula: `AN10*T10`,
hidden: true
},
'AV10' : {
val: ``,
val_noFormat: ``,
excl_cell: `AV10`,
formula: ``,
hidden: true
},
'AW10' : {
val: ``,
val_noFormat: ``,
excl_cell: `AW10`,
formula: ``,
hidden: true
},
'AX10' : {
val: ``,
val_noFormat: ``,
excl_cell: `AX10`,
formula: ``,
hidden: true
},
'AY10' : {
val: ``,
val_noFormat: ``,
excl_cell: `AY10`,
formula: ``,
hidden: true
},
'AZ10' : {
val: ``,
val_noFormat: ``,
excl_cell: `AZ10`,
formula: ``,
hidden: true
},
'BA10' : {
val: `187`,
val_noFormat: `187`,
excl_cell: `BA10`,
formula: `T10*4.4`,
hidden: true
},
'BB10' : {
val: `34`,
val_noFormat: `34`,
excl_cell: `BB10`,
formula: `BA10-AU10`,
hidden: true
},
'BC10' : {
val: `-240`,
val_noFormat: `-240`,
excl_cell: `BC10`,
formula: ``,
hidden: true
},
'BD10' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `BD10`,
formula: ``,
hidden: true
},
'BE10' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE10`,
formula: ``,
hidden: true
},
'BF10' : {
val: `185`,
val_noFormat: `185`,
excl_cell: `BF10`,
formula: `(T10*BD10*BE10*0.1)+BC10`,
hidden: true
},
'BG10' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG10`,
formula: ``,
hidden: false
},
'A11' : {
val: `Ackerbohne`,
val_noFormat: `Ackerbohne`,
excl_cell: `A11`,
formula: ``,
hidden: false
},
'B11' : {
val: `FANFARE`,
val_noFormat: `FANFARE`,
excl_cell: `B11`,
formula: ``,
hidden: true
},
'C11' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C11`,
formula: ``,
hidden: false
},
'D11' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `D11`,
formula: `E11*D18`,
hidden: true
},
'E11' : {
val: `1.41`,
val_noFormat: `1,41`,
excl_cell: `E11`,
formula: ``,
hidden: true
},
'F11' : {
val: `139.3718`,
val_noFormat: `139.3718`,
excl_cell: `F11`,
formula: `[2]Düngung!M41*T11+[2]Düngung!P11`,
hidden: true
},
'G11' : {
val: `125`,
val_noFormat: `125`,
excl_cell: `G11`,
formula: `H11*G18`,
hidden: true
},
'H11' : {
val: `0.78`,
val_noFormat: `0,78`,
excl_cell: `H11`,
formula: ``,
hidden: true
},
'I11' : {
val: `31.65454426000001`,
val_noFormat: `31.65454426000001`,
excl_cell: `I11`,
formula: `(SUM(D11:G11)/4*0.05)+(V11*0.014*2)`,
hidden: true
},
'J11' : {
val: `415.67634426000006`,
val_noFormat: `415.67634426000006`,
excl_cell: `J11`,
formula: `SUM(D11,F11,G11,I11)`,
hidden: false
},
'K11' : {
val: `150`,
val_noFormat: `150`,
excl_cell: `K11`,
formula: `L11*K18`,
hidden: true
},
'L11' : {
val: `0.85`,
val_noFormat: `0,85`,
excl_cell: `L11`,
formula: ``,
hidden: true
},
'M11' : {
val: `115`,
val_noFormat: `115`,
excl_cell: `M11`,
formula: `N11*M18`,
hidden: true
},
'N11' : {
val: `0.69`,
val_noFormat: `0,69`,
excl_cell: `N11`,
formula: ``,
hidden: true
},
'O11' : {
val: `205`,
val_noFormat: `205`,
excl_cell: `O11`,
formula: `P11*O18`,
hidden: true
},
'P11' : {
val: `0.82`,
val_noFormat: `0,82`,
excl_cell: `P11`,
formula: ``,
hidden: true
},
'Q11' : {
val: `470`,
val_noFormat: `470`,
excl_cell: `Q11`,
formula: `SUM(K11,M11,O11)`,
hidden: false
},
'R11' : {
val: `885.0`,
val_noFormat: `885.0`,
excl_cell: `R11`,
formula: `ROUND(J11+Q11,3-LEN(INT(J11+Q11)))`,
hidden: true
},
'S11' : {
val: `20,50`,
val_noFormat: `20,50`,
excl_cell: `S11`,
formula: `S10*0.926`,
hidden: false
},
'T11' : {
val: `46,8`,
val_noFormat: `46,8`,
excl_cell: `T11`,
formula: `T18*U11`,
hidden: false
},
'U11' : {
val: `0.550`,
val_noFormat: `0,550`,
excl_cell: `U11`,
formula: ``,
hidden: false
},
'V11' : {
val: `958`,
val_noFormat: `958`,
excl_cell: `V11`,
formula: `S11*T11`,
hidden: false
},
'W11' : {
val: ``,
val_noFormat: ``,
excl_cell: `W11`,
formula: ``,
hidden: true
},
'X11' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `X11`,
formula: ``,
hidden: false
},
'Y11' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y11`,
formula: ``,
hidden: false
},
'Z11' : {
val: `18.930481283422456`,
val_noFormat: `18.930481283422456`,
excl_cell: `Z11`,
formula: `R11/T11`,
hidden: true
},
'AA11' : {
val: `565.3013442600001`,
val_noFormat: `565.3013442600001`,
excl_cell: `AA11`,
formula: `D11+F11+G11+I11+K11`,
hidden: true
},
'AB11' : {
val: `393.1503257400002`,
val_noFormat: `393.1503257400002`,
excl_cell: `AB11`,
formula: `V11-D11-F11-G11-I11-K11`,
hidden: true
},
'AC11' : {
val: `233.1453257400002`,
val_noFormat: `233.1453257400002`,
excl_cell: `AC11`,
formula: `V11+Y11-J11-Q11+X11`,
hidden: false
},
'AD11' : {
val: `35.377967043612124`,
val_noFormat: `35.377967043612124`,
excl_cell: `AD11`,
formula: `(J11+Q11-X11-Y11)/S11`,
hidden: true
},
'AE11' : {
val: `15.5`,
val_noFormat: `15.5`,
excl_cell: `AE11`,
formula: `ROUND((J11+Q11-X11-Y11)/T11,3-LEN(INT((J11+Q11-X11-Y11)/T11)))`,
hidden: true
},
'AF11' : {
val: `45.00275803594249`,
val_noFormat: `45.00275803594249`,
excl_cell: `AF11`,
formula: `(AC41+J11+Q11-X11)/S11`,
hidden: false
},
'AG11' : {
val: `19.735408433368985`,
val_noFormat: `19.735408433368985`,
excl_cell: `AG11`,
formula: `(AC41+J11+Q11-X11)/T11`,
hidden: false
},
'AH11' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH11`,
formula: ``,
hidden: true
},
'AI11' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI11`,
formula: ``,
hidden: true
},
'AJ11' : {
val: `1005.0`,
val_noFormat: `1005.0`,
excl_cell: `AJ11`,
formula: `R11+AH11`,
hidden: true
},
'AK11' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK11`,
formula: ``,
hidden: true
},
'AL11' : {
val: `233.45167000000038`,
val_noFormat: `233.45167000000038`,
excl_cell: `AL11`,
formula: `V11+AK11-AJ11`,
hidden: true
},
'AM11' : {
val: `153.45167000000038`,
val_noFormat: `153.45167000000038`,
excl_cell: `AM11`,
formula: `AL11-AI11`,
hidden: true
},
'AN11' : {
val: `4.10`,
val_noFormat: `4,10`,
excl_cell: `AN11`,
formula: ``,
hidden: true
},
'AO11' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO11`,
formula: ``,
hidden: true
},
'AP11' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP11`,
formula: ``,
hidden: true
},
'AQ11' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ11`,
formula: ``,
hidden: true
},
'AR11' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `AR11`,
formula: ``,
hidden: true
},
'AS11' : {
val: `1.50`,
val_noFormat: `1,50`,
excl_cell: `AS11`,
formula: ``,
hidden: true
},
'AT11' : {
val: ``,
val_noFormat: ``,
excl_cell: `AT11`,
formula: ``,
hidden: true
},
'AU11' : {
val: `192`,
val_noFormat: `192`,
excl_cell: `AU11`,
formula: `AN11*T11`,
hidden: true
},
'AV11' : {
val: ``,
val_noFormat: ``,
excl_cell: `AV11`,
formula: ``,
hidden: true
},
'AW11' : {
val: ``,
val_noFormat: ``,
excl_cell: `AW11`,
formula: ``,
hidden: true
},
'AX11' : {
val: ``,
val_noFormat: ``,
excl_cell: `AX11`,
formula: ``,
hidden: true
},
'AY11' : {
val: ``,
val_noFormat: ``,
excl_cell: `AY11`,
formula: ``,
hidden: true
},
'AZ11' : {
val: ``,
val_noFormat: ``,
excl_cell: `AZ11`,
formula: ``,
hidden: true
},
'BA11' : {
val: `234`,
val_noFormat: `234`,
excl_cell: `BA11`,
formula: `T11*5`,
hidden: true
},
'BB11' : {
val: `42`,
val_noFormat: `42`,
excl_cell: `BB11`,
formula: `BA11-AU11`,
hidden: true
},
'BC11' : {
val: `-240`,
val_noFormat: `-240`,
excl_cell: `BC11`,
formula: ``,
hidden: true
},
'BD11' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `BD11`,
formula: ``,
hidden: true
},
'BE11' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE11`,
formula: ``,
hidden: true
},
'BF11' : {
val: `228`,
val_noFormat: `228`,
excl_cell: `BF11`,
formula: `(T11*BD11*BE11*0.1)+BC11`,
hidden: true
},
'BG11' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG11`,
formula: ``,
hidden: false
},
'A12' : {
val: `So-Raps`,
val_noFormat: `So-Raps`,
excl_cell: `A12`,
formula: ``,
hidden: false
},
'B12' : {
val: `MAKRO`,
val_noFormat: `MAKRO`,
excl_cell: `B12`,
formula: ``,
hidden: true
},
'C12' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C12`,
formula: ``,
hidden: false
},
'D12' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `D12`,
formula: `E12*D18`,
hidden: true
},
'E12' : {
val: `1.18`,
val_noFormat: `1,18`,
excl_cell: `E12`,
formula: ``,
hidden: true
},
'F12' : {
val: `176.45799999999997`,
val_noFormat: `176.45799999999997`,
excl_cell: `F12`,
formula: `[2]Düngung!M44*T12+[2]Düngung!P11`,
hidden: true
},
'G12' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `G12`,
formula: `H12*G18`,
hidden: true
},
'H12' : {
val: `0.75`,
val_noFormat: `0,75`,
excl_cell: `H12`,
formula: ``,
hidden: true
},
'I12' : {
val: `64.84405000000001`,
val_noFormat: `64.84405000000001`,
excl_cell: `I12`,
formula: `(SUM(D12:G12)/4*0.05)+(V12*0.014*4)`,
hidden: true
},
'J12' : {
val: `461.17705`,
val_noFormat: `461.17705`,
excl_cell: `J12`,
formula: `SUM(D12,F12,G12,I12)`,
hidden: false
},
'K12' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `K12`,
formula: `L12*K18`,
hidden: true
},
'L12' : {
val: `0.92`,
val_noFormat: `0,92`,
excl_cell: `L12`,
formula: ``,
hidden: true
},
'M12' : {
val: `125`,
val_noFormat: `125`,
excl_cell: `M12`,
formula: `N12*M18`,
hidden: true
},
'N12' : {
val: `0.76`,
val_noFormat: `0,76`,
excl_cell: `N12`,
formula: ``,
hidden: true
},
'O12' : {
val: `195`,
val_noFormat: `195`,
excl_cell: `O12`,
formula: `P12*O18`,
hidden: true
},
'P12' : {
val: `0.78`,
val_noFormat: `0,78`,
excl_cell: `P12`,
formula: ``,
hidden: true
},
'Q12' : {
val: `480`,
val_noFormat: `480`,
excl_cell: `Q12`,
formula: `SUM(K12,M12,O12)`,
hidden: false
},
'R12' : {
val: `941.0`,
val_noFormat: `941.0`,
excl_cell: `R12`,
formula: `ROUND(J12+Q12,3-LEN(INT(J12+Q12)))`,
hidden: true
},
'S12' : {
val: `39,60`,
val_noFormat: `39,60`,
excl_cell: `S12`,
formula: `S5`,
hidden: false
},
'T12' : {
val: `27,0`,
val_noFormat: `27,0`,
excl_cell: `T12`,
formula: `T18*U12`,
hidden: false
},
'U12' : {
val: `0.318`,
val_noFormat: `0,318`,
excl_cell: `U12`,
formula: ``,
hidden: false
},
'V12' : {
val: `1.069`,
val_noFormat: `1.069`,
excl_cell: `V12`,
formula: `S12*T12`,
hidden: false
},
'W12' : {
val: ``,
val_noFormat: ``,
excl_cell: `W12`,
formula: ``,
hidden: true
},
'X12' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `X12`,
formula: ``,
hidden: false
},
'Y12' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y12`,
formula: ``,
hidden: false
},
'Z12' : {
val: `34.851851851851855`,
val_noFormat: `34.851851851851855`,
excl_cell: `Z12`,
formula: `R12/T12`,
hidden: true
},
'AA12' : {
val: `621.30205`,
val_noFormat: `621.30205`,
excl_cell: `AA12`,
formula: `D12+F12+G12+I12+K12`,
hidden: true
},
'AB12' : {
val: `447.89795000000004`,
val_noFormat: `447.89795000000004`,
excl_cell: `AB12`,
formula: `V12-D12-F12-G12-I12-K12`,
hidden: true
},
'AC12' : {
val: `227.99795000000006`,
val_noFormat: `227.99795000000006`,
excl_cell: `AC12`,
formula: `V12+Y12-J12-Q12+X12`,
hidden: false
},
'AD12' : {
val: `21.242476010101008`,
val_noFormat: `21.242476010101008`,
excl_cell: `AD12`,
formula: `(J12+Q12-X12-Y12)/S12`,
hidden: true
},
'AE12' : {
val: `31.2`,
val_noFormat: `31.2`,
excl_cell: `AE12`,
formula: `ROUND((J12+Q12-X12-Y12)/T12,3-LEN(INT((J12+Q12-X12-Y12)/T12)))`,
hidden: true
},
'AF12' : {
val: `26.2254053030303`,
val_noFormat: `26.2254053030303`,
excl_cell: `AF12`,
formula: `(AC41+J12+Q12-X12)/S12`,
hidden: false
},
'AG12' : {
val: `38.463927777777776`,
val_noFormat: `38.463927777777776`,
excl_cell: `AG12`,
formula: `(AC41+J12+Q12-X12)/T12`,
hidden: false
},
'AH12' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH12`,
formula: ``,
hidden: true
},
'AI12' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI12`,
formula: ``,
hidden: true
},
'AJ12' : {
val: `1061.0`,
val_noFormat: `1061.0`,
excl_cell: `AJ12`,
formula: `R12+AH12`,
hidden: true
},
'AK12' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK12`,
formula: ``,
hidden: true
},
'AL12' : {
val: `288.20000000000005`,
val_noFormat: `288.20000000000005`,
excl_cell: `AL12`,
formula: `V12+AK12-AJ12`,
hidden: true
},
'AM12' : {
val: `208.20000000000005`,
val_noFormat: `208.20000000000005`,
excl_cell: `AM12`,
formula: `AL12-AI12`,
hidden: true
},
'AN12' : {
val: `3.35`,
val_noFormat: `3,35`,
excl_cell: `AN12`,
formula: ``,
hidden: true
},
'AO12' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO12`,
formula: ``,
hidden: true
},
'AP12' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP12`,
formula: ``,
hidden: true
},
'AQ12' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ12`,
formula: ``,
hidden: true
},
'AR12' : {
val: `1.70`,
val_noFormat: `1,70`,
excl_cell: `AR12`,
formula: ``,
hidden: true
},
'AS12' : {
val: `0.70`,
val_noFormat: `0,70`,
excl_cell: `AS12`,
formula: ``,
hidden: true
},
'AT12' : {
val: `123`,
val_noFormat: `123`,
excl_cell: `AT12`,
formula: `AU12+(AR12*T12*AS12)`,
hidden: true
},
'AU12' : {
val: `90`,
val_noFormat: `90`,
excl_cell: `AU12`,
formula: `AN12*T12`,
hidden: true
},
'AV12' : {
val: ``,
val_noFormat: ``,
excl_cell: `AV12`,
formula: ``,
hidden: true
},
'AW12' : {
val: ``,
val_noFormat: ``,
excl_cell: `AW12`,
formula: ``,
hidden: true
},
'AX12' : {
val: ``,
val_noFormat: ``,
excl_cell: `AX12`,
formula: ``,
hidden: true
},
'AY12' : {
val: ``,
val_noFormat: ``,
excl_cell: `AY12`,
formula: ``,
hidden: true
},
'AZ12' : {
val: ``,
val_noFormat: ``,
excl_cell: `AZ12`,
formula: ``,
hidden: true
},
'BA12' : {
val: `143`,
val_noFormat: `143`,
excl_cell: `BA12`,
formula: `T12*5.3`,
hidden: true
},
'BB12' : {
val: `53`,
val_noFormat: `53`,
excl_cell: `BB12`,
formula: `BA12-AU12`,
hidden: true
},
'BC12' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC12`,
formula: ``,
hidden: true
},
'BD12' : {
val: `1.7`,
val_noFormat: `1,7`,
excl_cell: `BD12`,
formula: ``,
hidden: true
},
'BE12' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE12`,
formula: ``,
hidden: true
},
'BF12' : {
val: `59`,
val_noFormat: `59`,
excl_cell: `BF12`,
formula: `(T12*BD12*BE12*0.1)+BC12`,
hidden: true
},
'BG12' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG12`,
formula: ``,
hidden: false
},
'A13' : {
val: `Sonnenblume`,
val_noFormat: `Sonnenblume`,
excl_cell: `A13`,
formula: ``,
hidden: false
},
'B13' : {
val: `PARAISO`,
val_noFormat: `PARAISO`,
excl_cell: `B13`,
formula: ``,
hidden: true
},
'C13' : {
val: `A`,
val_noFormat: `A`,
excl_cell: `C13`,
formula: ``,
hidden: false
},
'D13' : {
val: `190`,
val_noFormat: `190`,
excl_cell: `D13`,
formula: ``,
hidden: true
},
'E13' : {
val: `2.62`,
val_noFormat: `2,62`,
excl_cell: `E13`,
formula: ``,
hidden: true
},
'F13' : {
val: `197.49344000000002`,
val_noFormat: `197.49344000000002`,
excl_cell: `F13`,
formula: `[2]Düngung!M45*T13+[2]Düngung!P11`,
hidden: true
},
'G13' : {
val: `76`,
val_noFormat: `76`,
excl_cell: `G13`,
formula: `H13*G18`,
hidden: true
},
'H13' : {
val: `0.48`,
val_noFormat: `0,48`,
excl_cell: `H13`,
formula: ``,
hidden: true
},
'I13' : {
val: `67.36154017777778`,
val_noFormat: `67.36154017777778`,
excl_cell: `I13`,
formula: `(SUM(D13:G13)/4*0.05)+(V13*0.014*4)`,
hidden: true
},
'J13' : {
val: `531.6549801777778`,
val_noFormat: `531.6549801777778`,
excl_cell: `J13`,
formula: `SUM(D13,F13,G13,I13)`,
hidden: false
},
'K13' : {
val: `190`,
val_noFormat: `190`,
excl_cell: `K13`,
formula: `L13*K18`,
hidden: true
},
'L13' : {
val: `1.08`,
val_noFormat: `1,08`,
excl_cell: `L13`,
formula: ``,
hidden: true
},
'M13' : {
val: `135`,
val_noFormat: `135`,
excl_cell: `M13`,
formula: `N13*M18`,
hidden: true
},
'N13' : {
val: `0.82`,
val_noFormat: `0,82`,
excl_cell: `N13`,
formula: ``,
hidden: true
},
'O13' : {
val: `210`,
val_noFormat: `210`,
excl_cell: `O13`,
formula: `P13*O18`,
hidden: true
},
'P13' : {
val: `0.84`,
val_noFormat: `0,84`,
excl_cell: `P13`,
formula: ``,
hidden: true
},
'Q13' : {
val: `535`,
val_noFormat: `535`,
excl_cell: `Q13`,
formula: `SUM(K13,M13,O13)`,
hidden: false
},
'R13' : {
val: `1070.0`,
val_noFormat: `1070.0`,
excl_cell: `R13`,
formula: `ROUND(J13+Q13,3-LEN(INT(J13+Q13)))`,
hidden: true
},
'S13' : {
val: `38,01`,
val_noFormat: `38,01`,
excl_cell: `S13`,
formula: `S5*0.96`,
hidden: false
},
'T13' : {
val: `28,9`,
val_noFormat: `28,9`,
excl_cell: `T13`,
formula: `T18*U13`,
hidden: false
},
'U13' : {
val: `0.340`,
val_noFormat: `0,340`,
excl_cell: `U13`,
formula: ``,
hidden: false
},
'V13' : {
val: `1.099`,
val_noFormat: `1.099`,
excl_cell: `V13`,
formula: `S13*T13`,
hidden: false
},
'W13' : {
val: ``,
val_noFormat: ``,
excl_cell: `W13`,
formula: ``,
hidden: true
},
'X13' : {
val: `50`,
val_noFormat: `50`,
excl_cell: `X13`,
formula: ``,
hidden: false
},
'Y13' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y13`,
formula: ``,
hidden: false
},
'Z13' : {
val: `37.0242214532872`,
val_noFormat: `37.0242214532872`,
excl_cell: `Z13`,
formula: `R13/T13`,
hidden: true
},
'AA13' : {
val: `721.5299801777778`,
val_noFormat: `721.5299801777778`,
excl_cell: `AA13`,
formula: `D13+F13+G13+I13+K13`,
hidden: true
},
'AB13' : {
val: `377.13241982222223`,
val_noFormat: `377.13241982222223`,
excl_cell: `AB13`,
formula: `V13-D13-F13-G13-I13-K13`,
hidden: true
},
'AC13' : {
val: `81.83241982222216`,
val_noFormat: `81.83241982222216`,
excl_cell: `AC13`,
formula: `V13+Y13-J13-Q13+X13`,
hidden: false
},
'AD13' : {
val: `26.747421616629257`,
val_noFormat: `26.747421616629257`,
excl_cell: `AD13`,
formula: `(J13+Q13-X13-Y13)/S13`,
hidden: true
},
'AE13' : {
val: `35.2`,
val_noFormat: `35.2`,
excl_cell: `AE13`,
formula: `ROUND((J13+Q13-X13-Y13)/T13,3-LEN(INT((J13+Q13-X13-Y13)/T13)))`,
hidden: true
},
'AF13' : {
val: `31.9379729634306`,
val_noFormat: `31.9379729634306`,
excl_cell: `AF13`,
formula: `(AC41+J13+Q13-X13)/S13`,
hidden: false
},
'AG13' : {
val: `42.01224844905805`,
val_noFormat: `42.01224844905805`,
excl_cell: `AG13`,
formula: `(AC41+J13+Q13-X13)/T13`,
hidden: false
},
'AH13' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH13`,
formula: ``,
hidden: true
},
'AI13' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI13`,
formula: ``,
hidden: true
},
'AJ13' : {
val: `1190.0`,
val_noFormat: `1190.0`,
excl_cell: `AJ13`,
formula: `R13+AH13`,
hidden: true
},
'AK13' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK13`,
formula: ``,
hidden: true
},
'AL13' : {
val: `188.66239999999993`,
val_noFormat: `188.66239999999993`,
excl_cell: `AL13`,
formula: `V13+AK13-AJ13`,
hidden: true
},
'AM13' : {
val: `108.66239999999993`,
val_noFormat: `108.66239999999993`,
excl_cell: `AM13`,
formula: `AL13-AI13`,
hidden: true
},
'AN13' : {
val: `2.91`,
val_noFormat: `2,91`,
excl_cell: `AN13`,
formula: ``,
hidden: true
},
'AO13' : {
val: `91.0`,
val_noFormat: `91,0`,
excl_cell: `AO13`,
formula: ``,
hidden: true
},
'AP13' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP13`,
formula: ``,
hidden: true
},
'AQ13' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ13`,
formula: ``,
hidden: true
},
'AR13' : {
val: `2.00`,
val_noFormat: `2,00`,
excl_cell: `AR13`,
formula: ``,
hidden: true
},
'AS13' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `AS13`,
formula: ``,
hidden: true
},
'AT13' : {
val: `142`,
val_noFormat: `142`,
excl_cell: `AT13`,
formula: `AU13+(AR13*T13*AS13)`,
hidden: true
},
'AU13' : {
val: `84`,
val_noFormat: `84`,
excl_cell: `AU13`,
formula: `AN13*T13`,
hidden: true
},
'AV13' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AV13`,
formula: ``,
hidden: true
},
'AW13' : {
val: `30`,
val_noFormat: `30`,
excl_cell: `AW13`,
formula: ``,
hidden: true
},
'AX13' : {
val: `-1`,
val_noFormat: `-1`,
excl_cell: `AX13`,
formula: `T13-AW13`,
hidden: true
},
'AY13' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY13`,
formula: ``,
hidden: true
},
'AZ13' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ13`,
formula: ``,
hidden: true
},
'BA13' : {
val: `118`,
val_noFormat: `118`,
excl_cell: `BA13`,
formula: `(IF(AX13>0,AY19*AX13,IF(AX13<0,AZ13*AX13)))+AV13`,
hidden: true
},
'BB13' : {
val: `34`,
val_noFormat: `34`,
excl_cell: `BB13`,
formula: `BA13-AU13`,
hidden: true
},
'BC13' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC13`,
formula: ``,
hidden: true
},
'BD13' : {
val: `2.0`,
val_noFormat: `2,0`,
excl_cell: `BD13`,
formula: ``,
hidden: true
},
'BE13' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE13`,
formula: ``,
hidden: true
},
'BF13' : {
val: `178`,
val_noFormat: `178`,
excl_cell: `BF13`,
formula: `(T13*BD13*BE13*0.1)+BC13`,
hidden: true
},
'BG13' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG13`,
formula: ``,
hidden: false
},
'A14' : {
val: ``,
val_noFormat: ``,
excl_cell: `A14`,
formula: ``,
hidden: false
},
'B14' : {
val: ``,
val_noFormat: ``,
excl_cell: `B14`,
formula: ``,
hidden: true
},
'C14' : {
val: ``,
val_noFormat: ``,
excl_cell: `C14`,
formula: ``,
hidden: false
},
'D14' : {
val: ``,
val_noFormat: ``,
excl_cell: `D14`,
formula: ``,
hidden: true
},
'E14' : {
val: ``,
val_noFormat: ``,
excl_cell: `E14`,
formula: ``,
hidden: true
},
'F14' : {
val: ``,
val_noFormat: ``,
excl_cell: `F14`,
formula: ``,
hidden: true
},
'G14' : {
val: ``,
val_noFormat: ``,
excl_cell: `G14`,
formula: ``,
hidden: true
},
'H14' : {
val: ``,
val_noFormat: ``,
excl_cell: `H14`,
formula: ``,
hidden: true
},
'I14' : {
val: ``,
val_noFormat: ``,
excl_cell: `I14`,
formula: ``,
hidden: true
},
'J14' : {
val: ``,
val_noFormat: ``,
excl_cell: `J14`,
formula: ``,
hidden: false
},
'K14' : {
val: ``,
val_noFormat: ``,
excl_cell: `K14`,
formula: ``,
hidden: true
},
'L14' : {
val: ``,
val_noFormat: ``,
excl_cell: `L14`,
formula: ``,
hidden: true
},
'M14' : {
val: ``,
val_noFormat: ``,
excl_cell: `M14`,
formula: ``,
hidden: true
},
'N14' : {
val: ``,
val_noFormat: ``,
excl_cell: `N14`,
formula: ``,
hidden: true
},
'O14' : {
val: ``,
val_noFormat: ``,
excl_cell: `O14`,
formula: ``,
hidden: true
},
'P14' : {
val: ``,
val_noFormat: ``,
excl_cell: `P14`,
formula: ``,
hidden: true
},
'Q14' : {
val: ``,
val_noFormat: ``,
excl_cell: `Q14`,
formula: ``,
hidden: false
},
'R14' : {
val: ``,
val_noFormat: ``,
excl_cell: `R14`,
formula: ``,
hidden: true
},
'S14' : {
val: ``,
val_noFormat: ``,
excl_cell: `S14`,
formula: ``,
hidden: false
},
'T14' : {
val: ``,
val_noFormat: ``,
excl_cell: `T14`,
formula: ``,
hidden: false
},
'U14' : {
val: ``,
val_noFormat: ``,
excl_cell: `U14`,
formula: ``,
hidden: false
},
'V14' : {
val: ``,
val_noFormat: ``,
excl_cell: `V14`,
formula: ``,
hidden: false
},
'W14' : {
val: ``,
val_noFormat: ``,
excl_cell: `W14`,
formula: ``,
hidden: true
},
'X14' : {
val: ``,
val_noFormat: ``,
excl_cell: `X14`,
formula: ``,
hidden: false
},
'Y14' : {
val: ``,
val_noFormat: ``,
excl_cell: `Y14`,
formula: ``,
hidden: false
},
'Z14' : {
val: ``,
val_noFormat: ``,
excl_cell: `Z14`,
formula: ``,
hidden: true
},
'AA14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AA14`,
formula: ``,
hidden: true
},
'AB14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AB14`,
formula: ``,
hidden: true
},
'AC14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AC14`,
formula: ``,
hidden: false
},
'AD14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AD14`,
formula: ``,
hidden: true
},
'AE14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AE14`,
formula: ``,
hidden: true
},
'AF14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AF14`,
formula: ``,
hidden: false
},
'AG14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AG14`,
formula: ``,
hidden: false
},
'AH14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AH14`,
formula: ``,
hidden: true
},
'AI14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AI14`,
formula: ``,
hidden: true
},
'AJ14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AJ14`,
formula: ``,
hidden: true
},
'AK14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AK14`,
formula: ``,
hidden: true
},
'AL14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AL14`,
formula: ``,
hidden: true
},
'AM14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AM14`,
formula: ``,
hidden: true
},
'AN14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AN14`,
formula: ``,
hidden: true
},
'AO14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AO14`,
formula: ``,
hidden: true
},
'AP14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP14`,
formula: ``,
hidden: true
},
'AQ14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ14`,
formula: ``,
hidden: true
},
'AR14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AR14`,
formula: ``,
hidden: true
},
'AS14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AS14`,
formula: ``,
hidden: true
},
'AT14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AT14`,
formula: ``,
hidden: true
},
'AU14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AU14`,
formula: ``,
hidden: true
},
'AV14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AV14`,
formula: ``,
hidden: true
},
'AW14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AW14`,
formula: ``,
hidden: true
},
'AX14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AX14`,
formula: ``,
hidden: true
},
'AY14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AY14`,
formula: ``,
hidden: true
},
'AZ14' : {
val: ``,
val_noFormat: ``,
excl_cell: `AZ14`,
formula: ``,
hidden: true
},
'BA14' : {
val: ``,
val_noFormat: ``,
excl_cell: `BA14`,
formula: ``,
hidden: true
},
'BB14' : {
val: ``,
val_noFormat: ``,
excl_cell: `BB14`,
formula: ``,
hidden: true
},
'BC14' : {
val: ``,
val_noFormat: ``,
excl_cell: `BC14`,
formula: ``,
hidden: true
},
'BD14' : {
val: ``,
val_noFormat: ``,
excl_cell: `BD14`,
formula: ``,
hidden: true
},
'BE14' : {
val: ``,
val_noFormat: ``,
excl_cell: `BE14`,
formula: ``,
hidden: true
},
'BF14' : {
val: ``,
val_noFormat: ``,
excl_cell: `BF14`,
formula: ``,
hidden: true
},
'BG14' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG14`,
formula: ``,
hidden: false
},
'A15' : {
val: `Wi-Durum`,
val_noFormat: `Wi-Durum`,
excl_cell: `A15`,
formula: ``,
hidden: false
},
'B15' : {
val: `WINTERGOLD`,
val_noFormat: `WINTERGOLD`,
excl_cell: `B15`,
formula: ``,
hidden: true
},
'C15' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C15`,
formula: ``,
hidden: false
},
'D15' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `D15`,
formula: `E15*D18`,
hidden: true
},
'E15' : {
val: `1.70`,
val_noFormat: `1,70`,
excl_cell: `E15`,
formula: ``,
hidden: true
},
'F15' : {
val: `248.09224`,
val_noFormat: `248.09224`,
excl_cell: `F15`,
formula: `[2]Düngung!M19*T15+[2]Düngung!P11`,
hidden: true
},
'G15' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `G15`,
formula: `H15*G18`,
hidden: true
},
'H15' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `H15`,
formula: ``,
hidden: true
},
'I15' : {
val: `34.631753`,
val_noFormat: `34.631753`,
excl_cell: `I15`,
formula: `(SUM(D15:G15)/4*0.05)+(V15*0.014*1.25)`,
hidden: true
},
'J15' : {
val: `567.223993`,
val_noFormat: `567.223993`,
excl_cell: `J15`,
formula: `SUM(D15,F15,G15,I15)`,
hidden: false
},
'K15' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `K15`,
formula: `L15*K18`,
hidden: true
},
'L15' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `L15`,
formula: ``,
hidden: true
},
'M15' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `M15`,
formula: `N15*M18`,
hidden: true
},
'N15' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `N15`,
formula: ``,
hidden: true
},
'O15' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O15`,
formula: `P15*O18`,
hidden: true
},
'P15' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P15`,
formula: ``,
hidden: true
},
'Q15' : {
val: `580`,
val_noFormat: `580`,
excl_cell: `Q15`,
formula: `SUM(K15,M15,O15)`,
hidden: false
},
'R15' : {
val: `1150.0`,
val_noFormat: `1150.0`,
excl_cell: `R15`,
formula: `ROUND(J15+Q15,3-LEN(INT(J15+Q15)))`,
hidden: true
},
'S15' : {
val: `23,20`,
val_noFormat: `23,20`,
excl_cell: `S15`,
formula: `S21`,
hidden: false
},
'T15' : {
val: `68,9`,
val_noFormat: `68,9`,
excl_cell: `T15`,
formula: `T18*U15`,
hidden: false
},
'U15' : {
val: `0.810`,
val_noFormat: `0,810`,
excl_cell: `U15`,
formula: ``,
hidden: false
},
'V15' : {
val: `1.597`,
val_noFormat: `1.597`,
excl_cell: `V15`,
formula: `(S15*T15*W15/100)+(S23*T15*(100-W15)/100)`,
hidden: false
},
'W15' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `W15`,
formula: ``,
hidden: true
},
'X15' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X15`,
formula: ``,
hidden: false
},
'Y15' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y15`,
formula: ``,
hidden: false
},
'Z15' : {
val: `16.70297748729121`,
val_noFormat: `16.70297748729121`,
excl_cell: `Z15`,
formula: `R15/T15`,
hidden: true
},
'AA15' : {
val: `742.223993`,
val_noFormat: `742.223993`,
excl_cell: `AA15`,
formula: `D15+F15+G15+I15+K15`,
hidden: true
},
'AB15' : {
val: `855.0960070000006`,
val_noFormat: `855.0960070000006`,
excl_cell: `AB15`,
formula: `V15-D15-F15-G15-I15-K15`,
hidden: true
},
'AC15' : {
val: `449.6660070000006`,
val_noFormat: `449.6660070000006`,
excl_cell: `AC15`,
formula: `V15+Y15-J15-Q15+X15`,
hidden: false
},
'AD15' : {
val: `49.46784452586206`,
val_noFormat: `49.46784452586206`,
excl_cell: `AD15`,
formula: `(J15+Q15-X15-Y15)/S15`,
hidden: true
},
'AE15' : {
val: `16.7`,
val_noFormat: `16.7`,
excl_cell: `AE15`,
formula: `ROUND((J15+Q15-X15-Y15)/T15,3-LEN(INT((J15+Q15-X15-Y15)/T15)))`,
hidden: true
},
'AF15' : {
val: `57.97318935344828`,
val_noFormat: `57.97318935344828`,
excl_cell: `AF15`,
formula: `(AC41+J15+Q15-X15)/S15`,
hidden: false
},
'AG15' : {
val: `19.53490185911401`,
val_noFormat: `19.53490185911401`,
excl_cell: `AG15`,
formula: `(AC41+J15+Q15-X15)/T15`,
hidden: false
},
'AH15' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH15`,
formula: ``,
hidden: true
},
'AI15' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI15`,
formula: ``,
hidden: true
},
'AJ15' : {
val: `1270.0`,
val_noFormat: `1270.0`,
excl_cell: `AJ15`,
formula: `R15+AH15`,
hidden: true
},
'AK15' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK15`,
formula: ``,
hidden: true
},
'AL15' : {
val: `607.3200000000004`,
val_noFormat: `607.3200000000004`,
excl_cell: `AL15`,
formula: `V15+AK15-AJ15`,
hidden: true
},
'AM15' : {
val: `527.3200000000004`,
val_noFormat: `527.3200000000004`,
excl_cell: `AM15`,
formula: `AL15-AI15`,
hidden: true
},
'AN15' : {
val: `2,26`,
val_noFormat: `2,26`,
excl_cell: `AN15`,
formula: `AP15/5.7`,
hidden: true
},
'AO15' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO15`,
formula: ``,
hidden: true
},
'AP15' : {
val: `12,90`,
val_noFormat: `12,90`,
excl_cell: `AP15`,
formula: `AQ15*AO15/100`,
hidden: true
},
'AQ15' : {
val: `15.00`,
val_noFormat: `15,00`,
excl_cell: `AQ15`,
formula: ``,
hidden: true
},
'AR15' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR15`,
formula: ``,
hidden: true
},
'AS15' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS15`,
formula: ``,
hidden: true
},
'AT15' : {
val: `183`,
val_noFormat: `183`,
excl_cell: `AT15`,
formula: `AU15+(AR15*T15*AS15)`,
hidden: true
},
'AU15' : {
val: `156`,
val_noFormat: `156`,
excl_cell: `AU15`,
formula: `AN15*T15`,
hidden: true
},
'AV15' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `AV15`,
formula: ``,
hidden: true
},
'AW15' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW15`,
formula: ``,
hidden: true
},
'AX15' : {
val: `-11`,
val_noFormat: `-11`,
excl_cell: `AX15`,
formula: `T15-AW15`,
hidden: true
},
'AY15' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY15`,
formula: ``,
hidden: true
},
'AZ15' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ15`,
formula: ``,
hidden: true
},
'BA15' : {
val: `183`,
val_noFormat: `183`,
excl_cell: `BA15`,
formula: `(IF(AX15>0,AY15*AX15,IF(AX15<0,AZ15*AX15)))+AV15`,
hidden: true
},
'BB15' : {
val: `27`,
val_noFormat: `27`,
excl_cell: `BB15`,
formula: `BA15-AU15`,
hidden: true
},
'BC15' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC15`,
formula: ``,
hidden: true
},
'BD15' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD15`,
formula: ``,
hidden: true
},
'BE15' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE15`,
formula: ``,
hidden: true
},
'BF15' : {
val: `151`,
val_noFormat: `151`,
excl_cell: `BF15`,
formula: `(T15*BD15*BE15*0.1)+BC15`,
hidden: true
},
'BG15' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG15`,
formula: ``,
hidden: false
},
'A16' : {
val: `Dinkel`,
val_noFormat: `Dinkel`,
excl_cell: `A16`,
formula: ``,
hidden: false
},
'B16' : {
val: `ZOLLERNSPELZ`,
val_noFormat: `ZOLLERNSPELZ`,
excl_cell: `B16`,
formula: ``,
hidden: true
},
'C16' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C16`,
formula: ``,
hidden: false
},
'D16' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `D16`,
formula: `E16*D18`,
hidden: true
},
'E16' : {
val: `1.65`,
val_noFormat: `1,65`,
excl_cell: `E16`,
formula: ``,
hidden: true
},
'F16' : {
val: `234.71936`,
val_noFormat: `234.71936`,
excl_cell: `F16`,
formula: `[2]Düngung!M33*T16+[2]Düngung!P11`,
hidden: true
},
'G16' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `G16`,
formula: `H16*G18`,
hidden: true
},
'H16' : {
val: `0.96`,
val_noFormat: `0,96`,
excl_cell: `H16`,
formula: ``,
hidden: true
},
'I16' : {
val: `34.209281999999995`,
val_noFormat: `34.209281999999995`,
excl_cell: `I16`,
formula: `(SUM(D16:G16)/4*0.05)+(V16*0.014*1.25)`,
hidden: true
},
'J16' : {
val: `563.898642`,
val_noFormat: `563.898642`,
excl_cell: `J16`,
formula: `SUM(D16,F16,G16,I16)`,
hidden: false
},
'K16' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `K16`,
formula: `L16*K18`,
hidden: true
},
'L16' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `L16`,
formula: ``,
hidden: true
},
'M16' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `M16`,
formula: `N16*M18`,
hidden: true
},
'N16' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `N16`,
formula: ``,
hidden: true
},
'O16' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O16`,
formula: `P16*O18`,
hidden: true
},
'P16' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P16`,
formula: ``,
hidden: true
},
'Q16' : {
val: `575`,
val_noFormat: `575`,
excl_cell: `Q16`,
formula: `SUM(K16,M16,O16)`,
hidden: false
},
'R16' : {
val: `1140.0`,
val_noFormat: `1140.0`,
excl_cell: `R16`,
formula: `ROUND(J16+Q16,3-LEN(INT(J16+Q16)))`,
hidden: true
},
'S16' : {
val: `21,06`,
val_noFormat: `21,06`,
excl_cell: `S16`,
formula: `S18*1.17`,
hidden: false
},
'T16' : {
val: `74,8`,
val_noFormat: `74,8`,
excl_cell: `T16`,
formula: `T18*U16`,
hidden: false
},
'U16' : {
val: `0.880`,
val_noFormat: `0,880`,
excl_cell: `U16`,
formula: ``,
hidden: false
},
'V16' : {
val: `1.575`,
val_noFormat: `1.575`,
excl_cell: `V16`,
formula: `S16*T16`,
hidden: false
},
'W16' : {
val: ``,
val_noFormat: ``,
excl_cell: `W16`,
formula: ``,
hidden: true
},
'X16' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X16`,
formula: ``,
hidden: false
},
'Y16' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y16`,
formula: ``,
hidden: false
},
'Z16' : {
val: `15.240641711229948`,
val_noFormat: `15.240641711229948`,
excl_cell: `Z16`,
formula: `R16/T16`,
hidden: true
},
'AA16' : {
val: `733.648642`,
val_noFormat: `733.648642`,
excl_cell: `AA16`,
formula: `D16+F16+G16+I16+K16`,
hidden: true
},
'AB16' : {
val: `841.6393579999997`,
val_noFormat: `841.6393579999997`,
excl_cell: `AB16`,
formula: `V16-D16-F16-G16-I16-K16`,
hidden: true
},
'AC16' : {
val: `436.53935799999977`,
val_noFormat: `436.53935799999977`,
excl_cell: `AC16`,
formula: `V16+Y16-J16-Q16+X16`,
hidden: false
},
'AD16' : {
val: `54.07163542260209`,
val_noFormat: `54.07163542260209`,
excl_cell: `AD16`,
formula: `(J16+Q16-X16-Y16)/S16`,
hidden: true
},
'AE16' : {
val: `15.2`,
val_noFormat: `15.2`,
excl_cell: `AE16`,
formula: `ROUND((J16+Q16-X16-Y16)/T16,3-LEN(INT((J16+Q16-X16-Y16)/T16)))`,
hidden: true
},
'AF16' : {
val: `63.4412460588794`,
val_noFormat: `63.4412460588794`,
excl_cell: `AF16`,
formula: `(AC41+J16+Q16-X16)/S16`,
hidden: false
},
'AG16' : {
val: `17.861933716577543`,
val_noFormat: `17.861933716577543`,
excl_cell: `AG16`,
formula: `(AC41+J16+Q16-X16)/T16`,
hidden: false
},
'AH16' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH16`,
formula: ``,
hidden: true
},
'AI16' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI16`,
formula: ``,
hidden: true
},
'AJ16' : {
val: `1260.0`,
val_noFormat: `1260.0`,
excl_cell: `AJ16`,
formula: `R16+AH16`,
hidden: true
},
'AK16' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK16`,
formula: ``,
hidden: true
},
'AL16' : {
val: `595.2879999999998`,
val_noFormat: `595.2879999999998`,
excl_cell: `AL16`,
formula: `V16+AK16-AJ16`,
hidden: true
},
'AM16' : {
val: `515.2879999999998`,
val_noFormat: `515.2879999999998`,
excl_cell: `AM16`,
formula: `AL16-AI16`,
hidden: true
},
'AN16' : {
val: `1,96`,
val_noFormat: `1,96`,
excl_cell: `AN16`,
formula: `AP16/5.7`,
hidden: true
},
'AO16' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO16`,
formula: ``,
hidden: true
},
'AP16' : {
val: `11,18`,
val_noFormat: `11,18`,
excl_cell: `AP16`,
formula: `AQ16*AO16/100`,
hidden: true
},
'AQ16' : {
val: `13.00`,
val_noFormat: `13,00`,
excl_cell: `AQ16`,
formula: ``,
hidden: true
},
'AR16' : {
val: `1.10`,
val_noFormat: `1,10`,
excl_cell: `AR16`,
formula: ``,
hidden: true
},
'AS16' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS16`,
formula: ``,
hidden: true
},
'AT16' : {
val: `188`,
val_noFormat: `188`,
excl_cell: `AT16`,
formula: `AU16+(AR16*T16*AS16)`,
hidden: true
},
'AU16' : {
val: `147`,
val_noFormat: `147`,
excl_cell: `AU16`,
formula: `AN16*T16`,
hidden: true
},
'AV16' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `AV16`,
formula: ``,
hidden: true
},
'AW16' : {
val: `60`,
val_noFormat: `60`,
excl_cell: `AW16`,
formula: ``,
hidden: true
},
'AX16' : {
val: `15`,
val_noFormat: `15`,
excl_cell: `AX16`,
formula: `T16-AW16`,
hidden: true
},
'AY16' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY16`,
formula: ``,
hidden: true
},
'AZ16' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ16`,
formula: ``,
hidden: true
},
'BA16' : {
val: `185`,
val_noFormat: `185`,
excl_cell: `BA16`,
formula: `(IF(AX16>0,AY16*AX16,IF(AX16<0,AZ16*AX16)))+AV16`,
hidden: true
},
'BB16' : {
val: `38`,
val_noFormat: `38`,
excl_cell: `BB16`,
formula: `BA16-AU16`,
hidden: true
},
'BC16' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC16`,
formula: ``,
hidden: true
},
'BD16' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD16`,
formula: ``,
hidden: true
},
'BE16' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE16`,
formula: ``,
hidden: true
},
'BF16' : {
val: `198`,
val_noFormat: `198`,
excl_cell: `BF16`,
formula: `(T16*BD16*BE16*0.1)+BC16`,
hidden: true
},
'BG16' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG16`,
formula: ``,
hidden: false
},
'A17' : {
val: `Wi-Weizen A`,
val_noFormat: `Wi-Weizen A`,
excl_cell: `A17`,
formula: ``,
hidden: false
},
'B17' : {
val: `NORDKAP`,
val_noFormat: `NORDKAP`,
excl_cell: `B17`,
formula: ``,
hidden: true
},
'C17' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C17`,
formula: ``,
hidden: false
},
'D17' : {
val: `87`,
val_noFormat: `87`,
excl_cell: `D17`,
formula: `E17*D18`,
hidden: true
},
'E17' : {
val: `1.02`,
val_noFormat: `1,02`,
excl_cell: `E17`,
formula: ``,
hidden: true
},
'F17' : {
val: `269.10832000000005`,
val_noFormat: `269.10832000000005`,
excl_cell: `F17`,
formula: `[2]Düngung!M11*T17+[2]Düngung!P11`,
hidden: true
},
'G17' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `G17`,
formula: `H17*G18`,
hidden: true
},
'H17' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `H17`,
formula: ``,
hidden: true
},
'I17' : {
val: `33.5016165`,
val_noFormat: `33.5016165`,
excl_cell: `I17`,
formula: `(SUM(D17:G17)/4*0.05)+(V17*0.014*1.25)`,
hidden: true
},
'J17' : {
val: `549.3099365`,
val_noFormat: `549.3099365`,
excl_cell: `J17`,
formula: `SUM(D17,F17,G17,I17)`,
hidden: false
},
'K17' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `K17`,
formula: `L17*K18`,
hidden: true
},
'L17' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `L17`,
formula: ``,
hidden: true
},
'M17' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `M17`,
formula: `N17*M18`,
hidden: true
},
'N17' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `N17`,
formula: ``,
hidden: true
},
'O17' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O17`,
formula: ``,
hidden: true
},
'P17' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P17`,
formula: ``,
hidden: true
},
'Q17' : {
val: `590`,
val_noFormat: `590`,
excl_cell: `Q17`,
formula: `SUM(K17,M17,O17)`,
hidden: false
},
'R17' : {
val: `1140.0`,
val_noFormat: `1140.0`,
excl_cell: `R17`,
formula: `ROUND(J17+Q17,3-LEN(INT(J17+Q17)))`,
hidden: true
},
'S17' : {
val: `18,55`,
val_noFormat: `18,55`,
excl_cell: `S17`,
formula: `S18+0.55`,
hidden: false
},
'T17' : {
val: `83,3`,
val_noFormat: `83,3`,
excl_cell: `T17`,
formula: `T18*U17`,
hidden: false
},
'U17' : {
val: `0.980`,
val_noFormat: `0,980`,
excl_cell: `U17`,
formula: ``,
hidden: false
},
'V17' : {
val: `1.545`,
val_noFormat: `1.545`,
excl_cell: `V17`,
formula: `S17*T17`,
hidden: false
},
'W17' : {
val: ``,
val_noFormat: ``,
excl_cell: `W17`,
formula: ``,
hidden: true
},
'X17' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X17`,
formula: ``,
hidden: false
},
'Y17' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y17`,
formula: ``,
hidden: false
},
'Z17' : {
val: `13.68547418967587`,
val_noFormat: `13.68547418967587`,
excl_cell: `Z17`,
formula: `R17/T17`,
hidden: true
},
'AA17' : {
val: `724.3099365`,
val_noFormat: `724.3099365`,
excl_cell: `AA17`,
formula: `D17+F17+G17+I17+K17`,
hidden: true
},
'AB17' : {
val: `820.9050634999999`,
val_noFormat: `820.9050634999999`,
excl_cell: `AB17`,
formula: `V17-D17-F17-G17-I17-K17`,
hidden: true
},
'AC17' : {
val: `405.90506349999987`,
val_noFormat: `405.90506349999987`,
excl_cell: `AC17`,
formula: `V17+Y17-J17-Q17+X17`,
hidden: false
},
'AD17' : {
val: `61.41832541778976`,
val_noFormat: `61.41832541778976`,
excl_cell: `AD17`,
formula: `(J17+Q17-X17-Y17)/S17`,
hidden: true
},
'AE17' : {
val: `13.7`,
val_noFormat: `13.7`,
excl_cell: `AE17`,
formula: `ROUND((J17+Q17-X17-Y17)/T17,3-LEN(INT((J17+Q17-X17-Y17)/T17)))`,
hidden: true
},
'AF17' : {
val: `72.05573781671158`,
val_noFormat: `72.05573781671158`,
excl_cell: `AF17`,
formula: `(AC41+J17+Q17-X17)/S17`,
hidden: false
},
'AG17' : {
val: `16.046025648259302`,
val_noFormat: `16.046025648259302`,
excl_cell: `AG17`,
formula: `(AC41+J17+Q17-X17)/T17`,
hidden: false
},
'AH17' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH17`,
formula: ``,
hidden: true
},
'AI17' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI17`,
formula: ``,
hidden: true
},
'AJ17' : {
val: `1260.0`,
val_noFormat: `1260.0`,
excl_cell: `AJ17`,
formula: `R17+AH17`,
hidden: true
},
'AK17' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK17`,
formula: ``,
hidden: true
},
'AL17' : {
val: `565.2149999999999`,
val_noFormat: `565.2149999999999`,
excl_cell: `AL17`,
formula: `V17+AK17-AJ17`,
hidden: true
},
'AM17' : {
val: `485.2149999999999`,
val_noFormat: `485.2149999999999`,
excl_cell: `AM17`,
formula: `AL17-AI17`,
hidden: true
},
'AN17' : {
val: `1,96`,
val_noFormat: `1,96`,
excl_cell: `AN17`,
formula: `AP17/5.7`,
hidden: true
},
'AO17' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO17`,
formula: ``,
hidden: true
},
'AP17' : {
val: `11,18`,
val_noFormat: `11,18`,
excl_cell: `AP17`,
formula: `AQ17*AO17/100`,
hidden: true
},
'AQ17' : {
val: `13.00`,
val_noFormat: `13,00`,
excl_cell: `AQ17`,
formula: ``,
hidden: true
},
'AR17' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR17`,
formula: ``,
hidden: true
},
'AS17' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS17`,
formula: ``,
hidden: true
},
'AT17' : {
val: `197`,
val_noFormat: `197`,
excl_cell: `AT17`,
formula: `AU17+(AR17*T17*AS17)`,
hidden: true
},
'AU17' : {
val: `163`,
val_noFormat: `163`,
excl_cell: `AU17`,
formula: `AN17*T17`,
hidden: true
},
'AV17' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `AV17`,
formula: ``,
hidden: true
},
'AW17' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW17`,
formula: ``,
hidden: true
},
'AX17' : {
val: `3`,
val_noFormat: `3`,
excl_cell: `AX17`,
formula: `T17-AW17`,
hidden: true
},
'AY17' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY17`,
formula: ``,
hidden: true
},
'AZ17' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ17`,
formula: ``,
hidden: true
},
'BA17' : {
val: `233`,
val_noFormat: `233`,
excl_cell: `BA17`,
formula: `(IF(AX17>0,AY17*AX17,IF(AX17<0,AZ17*AX17)))+AV17`,
hidden: true
},
'BB17' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `BB17`,
formula: `BA17-AU17`,
hidden: true
},
'BC17' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC17`,
formula: ``,
hidden: true
},
'BD17' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD17`,
formula: ``,
hidden: true
},
'BE17' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE17`,
formula: ``,
hidden: true
},
'BF17' : {
val: `266`,
val_noFormat: `266`,
excl_cell: `BF17`,
formula: `(T17*BD17*BE17*0.1)+BC17`,
hidden: true
},
'BG17' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG17`,
formula: ``,
hidden: false
},
'A18' : {
val: `Wi-Weizen B`,
val_noFormat: `Wi-Weizen B`,
excl_cell: `A18`,
formula: ``,
hidden: false
},
'B18' : {
val: `FAUSTUS`,
val_noFormat: `FAUSTUS`,
excl_cell: `B18`,
formula: ``,
hidden: true
},
'C18' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C18`,
formula: ``,
hidden: false
},
'D18' : {
val: `85`,
val_noFormat: `85`,
excl_cell: `D18`,
formula: ``,
hidden: true
},
'E18' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `E18`,
formula: ``,
hidden: true
},
'F18' : {
val: `263.58400000000006`,
val_noFormat: `263.58400000000006`,
excl_cell: `F18`,
formula: `[2]Düngung!M9*T18+[2]Düngung!P11`,
hidden: true
},
'G18' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `G18`,
formula: ``,
hidden: true
},
'H18' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `H18`,
formula: ``,
hidden: true
},
'I18' : {
val: `33.144800000000004`,
val_noFormat: `33.144800000000004`,
excl_cell: `I18`,
formula: `(SUM(D18:G18)/4*0.05)+(V18*0.014*1.25)`,
hidden: true
},
'J18' : {
val: `541.7288000000001`,
val_noFormat: `541.7288000000001`,
excl_cell: `J18`,
formula: `SUM(D18,F18,G18,I18)`,
hidden: false
},
'K18' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `K18`,
formula: ``,
hidden: true
},
'L18' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `L18`,
formula: ``,
hidden: true
},
'M18' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `M18`,
formula: ``,
hidden: true
},
'N18' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `N18`,
formula: ``,
hidden: true
},
'O18' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O18`,
formula: ``,
hidden: true
},
'P18' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P18`,
formula: ``,
hidden: true
},
'Q18' : {
val: `590`,
val_noFormat: `590`,
excl_cell: `Q18`,
formula: `SUM(K18,M18,O18)`,
hidden: false
},
'R18' : {
val: `1130.0`,
val_noFormat: `1130.0`,
excl_cell: `R18`,
formula: `ROUND(J18+Q18,3-LEN(INT(J18+Q18)))`,
hidden: true
},
'S18' : {
val: `18.00`,
val_noFormat: `18,00`,
excl_cell: `S18`,
formula: ``,
hidden: false
},
'T18' : {
val: `85.0`,
val_noFormat: `85,0`,
excl_cell: `T18`,
formula: ``,
hidden: false
},
'U18' : {
val: `1.000`,
val_noFormat: `1,000`,
excl_cell: `U18`,
formula: ``,
hidden: false
},
'V18' : {
val: `1.530`,
val_noFormat: `1.530`,
excl_cell: `V18`,
formula: `S18*T18`,
hidden: false
},
'W18' : {
val: ``,
val_noFormat: ``,
excl_cell: `W18`,
formula: ``,
hidden: true
},
'X18' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X18`,
formula: ``,
hidden: false
},
'Y18' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y18`,
formula: ``,
hidden: false
},
'Z18' : {
val: `13.294117647058824`,
val_noFormat: `13.294117647058824`,
excl_cell: `Z18`,
formula: `R18/T18`,
hidden: true
},
'AA18' : {
val: `716.7288000000001`,
val_noFormat: `716.7288000000001`,
excl_cell: `AA18`,
formula: `D18+F18+G18+I18+K18`,
hidden: true
},
'AB18' : {
val: `813.2711999999999`,
val_noFormat: `813.2711999999999`,
excl_cell: `AB18`,
formula: `V18-D18-F18-G18-I18-K18`,
hidden: true
},
'AC18' : {
val: `398.2711999999999`,
val_noFormat: `398.2711999999999`,
excl_cell: `AC18`,
formula: `V18+Y18-J18-Q18+X18`,
hidden: false
},
'AD18' : {
val: `62.87382222222223`,
val_noFormat: `62.87382222222223`,
excl_cell: `AD18`,
formula: `(J18+Q18-X18-Y18)/S18`,
hidden: true
},
'AE18' : {
val: `13.3`,
val_noFormat: `13.3`,
excl_cell: `AE18`,
formula: `ROUND((J18+Q18-X18-Y18)/T18,3-LEN(INT((J18+Q18-X18-Y18)/T18)))`,
hidden: true
},
'AF18' : {
val: `73.83626666666666`,
val_noFormat: `73.83626666666666`,
excl_cell: `AF18`,
formula: `(AC41+J18+Q18-X18)/S18`,
hidden: false
},
'AG18' : {
val: `15.635915294117646`,
val_noFormat: `15.635915294117646`,
excl_cell: `AG18`,
formula: `(AC41+J18+Q18-X18)/T18`,
hidden: false
},
'AH18' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH18`,
formula: ``,
hidden: true
},
'AI18' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI18`,
formula: ``,
hidden: true
},
'AJ18' : {
val: `1250.0`,
val_noFormat: `1250.0`,
excl_cell: `AJ18`,
formula: `R18+AH18`,
hidden: true
},
'AK18' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK18`,
formula: ``,
hidden: true
},
'AL18' : {
val: `560.0`,
val_noFormat: `560.0`,
excl_cell: `AL18`,
formula: `V18+AK18-AJ18`,
hidden: true
},
'AM18' : {
val: `480.0`,
val_noFormat: `480.0`,
excl_cell: `AM18`,
formula: `AL18-AI18`,
hidden: true
},
'AN18' : {
val: `1,88`,
val_noFormat: `1,88`,
excl_cell: `AN18`,
formula: `AP18/5.7`,
hidden: true
},
'AO18' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO18`,
formula: ``,
hidden: true
},
'AP18' : {
val: `10,71`,
val_noFormat: `10,71`,
excl_cell: `AP18`,
formula: `AQ18*AO18/100`,
hidden: true
},
'AQ18' : {
val: `12.45`,
val_noFormat: `12,45`,
excl_cell: `AQ18`,
formula: ``,
hidden: true
},
'AR18' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR18`,
formula: ``,
hidden: true
},
'AS18' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS18`,
formula: ``,
hidden: true
},
'AT18' : {
val: `194`,
val_noFormat: `194`,
excl_cell: `AT18`,
formula: `AU18+(AR18*T18*AS18)`,
hidden: true
},
'AU18' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `AU18`,
formula: `AN18*T18`,
hidden: true
},
'AV18' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `AV18`,
formula: ``,
hidden: true
},
'AW18' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW18`,
formula: ``,
hidden: true
},
'AX18' : {
val: `5`,
val_noFormat: `5`,
excl_cell: `AX18`,
formula: `T18-AW18`,
hidden: true
},
'AY18' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY18`,
formula: ``,
hidden: true
},
'AZ18' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ18`,
formula: ``,
hidden: true
},
'BA18' : {
val: `235`,
val_noFormat: `235`,
excl_cell: `BA18`,
formula: `(IF(AX18>0,AY18*AX18,IF(AX18<0,AZ18*AX18)))+AV18`,
hidden: true
},
'BB18' : {
val: `75`,
val_noFormat: `75`,
excl_cell: `BB18`,
formula: `BA18-AU18`,
hidden: true
},
'BC18' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC18`,
formula: ``,
hidden: true
},
'BD18' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD18`,
formula: ``,
hidden: true
},
'BE18' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE18`,
formula: ``,
hidden: true
},
'BF18' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `BF18`,
formula: `(T18*BD18*BE18*0.1)+BC18`,
hidden: true
},
'BG18' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG18`,
formula: ``,
hidden: false
},
'A19' : {
val: `Wi-Weizen E`,
val_noFormat: `Wi-Weizen E`,
excl_cell: `A19`,
formula: ``,
hidden: false
},
'B19' : {
val: `GENIUS`,
val_noFormat: `GENIUS`,
excl_cell: `B19`,
formula: ``,
hidden: true
},
'C19' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C19`,
formula: ``,
hidden: false
},
'D19' : {
val: `90`,
val_noFormat: `90`,
excl_cell: `D19`,
formula: `E19*D18`,
hidden: true
},
'E19' : {
val: `1.05`,
val_noFormat: `1,05`,
excl_cell: `E19`,
formula: ``,
hidden: true
},
'F19' : {
val: `257.14576`,
val_noFormat: `257.14576`,
excl_cell: `F19`,
formula: `[2]Düngung!M13*T19+[2]Düngung!P11`,
hidden: true
},
'G19' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `G19`,
formula: `H19*G18`,
hidden: true
},
'H19' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `H19`,
formula: ``,
hidden: true
},
'I19' : {
val: `32.95833450000001`,
val_noFormat: `32.95833450000001`,
excl_cell: `I19`,
formula: `(SUM(D19:G19)/4*0.05)+(V19*0.014*1.25)`,
hidden: true
},
'J19' : {
val: `539.7790945`,
val_noFormat: `539.7790945`,
excl_cell: `J19`,
formula: `SUM(D19,F19,G19,I19)`,
hidden: false
},
'K19' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `K19`,
formula: `L19*K18`,
hidden: true
},
'L19' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `L19`,
formula: ``,
hidden: true
},
'M19' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `M19`,
formula: `N19*M18`,
hidden: true
},
'N19' : {
val: `1.03`,
val_noFormat: `1,03`,
excl_cell: `N19`,
formula: ``,
hidden: true
},
'O19' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O19`,
formula: `P19*O18`,
hidden: true
},
'P19' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P19`,
formula: ``,
hidden: true
},
'Q19' : {
val: `595`,
val_noFormat: `595`,
excl_cell: `Q19`,
formula: `SUM(K19,M19,O19)`,
hidden: false
},
'R19' : {
val: `1130.0`,
val_noFormat: `1130.0`,
excl_cell: `R19`,
formula: `ROUND(J19+Q19,3-LEN(INT(J19+Q19)))`,
hidden: true
},
'S19' : {
val: `20,10`,
val_noFormat: `20,10`,
excl_cell: `S19`,
formula: `S18+2.1`,
hidden: false
},
'T19' : {
val: `75,7`,
val_noFormat: `75,7`,
excl_cell: `T19`,
formula: `T18*U19`,
hidden: false
},
'U19' : {
val: `0.890`,
val_noFormat: `0,890`,
excl_cell: `U19`,
formula: ``,
hidden: false
},
'V19' : {
val: `1.521`,
val_noFormat: `1.521`,
excl_cell: `V19`,
formula: `S19*T19`,
hidden: false
},
'W19' : {
val: ``,
val_noFormat: ``,
excl_cell: `W19`,
formula: ``,
hidden: true
},
'X19' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X19`,
formula: ``,
hidden: false
},
'Y19' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y19`,
formula: ``,
hidden: false
},
'Z19' : {
val: `14.937210839391936`,
val_noFormat: `14.937210839391936`,
excl_cell: `Z19`,
formula: `R19/T19`,
hidden: true
},
'AA19' : {
val: `714.7790945`,
val_noFormat: `714.7790945`,
excl_cell: `AA19`,
formula: `D19+F19+G19+I19+K19`,
hidden: true
},
'AB19' : {
val: `805.7859055000005`,
val_noFormat: `805.7859055000005`,
excl_cell: `AB19`,
formula: `V19-D19-F19-G19-I19-K19`,
hidden: true
},
'AC19' : {
val: `385.8359055000002`,
val_noFormat: `385.8359055000002`,
excl_cell: `AC19`,
formula: `V19+Y19-J19-Q19+X19`,
hidden: false
},
'AD19' : {
val: `56.454183805970146`,
val_noFormat: `56.454183805970146`,
excl_cell: `AD19`,
formula: `(J19+Q19-X19-Y19)/S19`,
hidden: true
},
'AE19' : {
val: `15.0`,
val_noFormat: `15.0`,
excl_cell: `AE19`,
formula: `ROUND((J19+Q19-X19-Y19)/T19,3-LEN(INT((J19+Q19-X19-Y19)/T19)))`,
hidden: true
},
'AF19' : {
val: `66.27129823383085`,
val_noFormat: `66.27129823383085`,
excl_cell: `AF19`,
formula: `(AC41+J19+Q19-X19)/S19`,
hidden: false
},
'AG19' : {
val: `17.60810435558493`,
val_noFormat: `17.60810435558493`,
excl_cell: `AG19`,
formula: `(AC41+J19+Q19-X19)/T19`,
hidden: false
},
'AH19' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH19`,
formula: ``,
hidden: true
},
'AI19' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI19`,
formula: ``,
hidden: true
},
'AJ19' : {
val: `1250.0`,
val_noFormat: `1250.0`,
excl_cell: `AJ19`,
formula: `R19+AH19`,
hidden: true
},
'AK19' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK19`,
formula: ``,
hidden: true
},
'AL19' : {
val: `550.5650000000003`,
val_noFormat: `550.5650000000003`,
excl_cell: `AL19`,
formula: `V19+AK19-AJ19`,
hidden: true
},
'AM19' : {
val: `470.5650000000003`,
val_noFormat: `470.5650000000003`,
excl_cell: `AM19`,
formula: `AL19-AI19`,
hidden: true
},
'AN19' : {
val: `2,11`,
val_noFormat: `2,11`,
excl_cell: `AN19`,
formula: `AP19/5.7`,
hidden: true
},
'AO19' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO19`,
formula: ``,
hidden: true
},
'AP19' : {
val: `12,04`,
val_noFormat: `12,04`,
excl_cell: `AP19`,
formula: `AQ19*AO19/100`,
hidden: true
},
'AQ19' : {
val: `14.00`,
val_noFormat: `14,00`,
excl_cell: `AQ19`,
formula: ``,
hidden: true
},
'AR19' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR19`,
formula: ``,
hidden: true
},
'AS19' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS19`,
formula: ``,
hidden: true
},
'AT19' : {
val: `190`,
val_noFormat: `190`,
excl_cell: `AT19`,
formula: `AU19+(AR19*T19*AS19)`,
hidden: true
},
'AU19' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `AU19`,
formula: `AN19*T19`,
hidden: true
},
'AV19' : {
val: `260`,
val_noFormat: `260`,
excl_cell: `AV19`,
formula: ``,
hidden: true
},
'AW19' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW19`,
formula: ``,
hidden: true
},
'AX19' : {
val: `-4`,
val_noFormat: `-4`,
excl_cell: `AX19`,
formula: `T19-AW19`,
hidden: true
},
'AY19' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY19`,
formula: ``,
hidden: true
},
'AZ19' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ19`,
formula: ``,
hidden: true
},
'BA19' : {
val: `253`,
val_noFormat: `253`,
excl_cell: `BA19`,
formula: `(IF(AX19>0,AY19*AX19,IF(AX19<0,AZ19*AX19)))+AV19`,
hidden: true
},
'BB19' : {
val: `94`,
val_noFormat: `94`,
excl_cell: `BB19`,
formula: `BA19-AU19`,
hidden: true
},
'BC19' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC19`,
formula: ``,
hidden: true
},
'BD19' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD19`,
formula: ``,
hidden: true
},
'BE19' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE19`,
formula: ``,
hidden: true
},
'BF19' : {
val: `205`,
val_noFormat: `205`,
excl_cell: `BF19`,
formula: `(T19*BD19*BE19*0.1)+BC19`,
hidden: true
},
'BG19' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG19`,
formula: ``,
hidden: false
},
'A20' : {
val: `Hybridrogg. Eig.verf.`,
val_noFormat: `Hybridrogg. Eig.verf.`,
excl_cell: `A20`,
formula: ``,
hidden: false
},
'B20' : {
val: `SU PIANO`,
val_noFormat: `SU PIANO`,
excl_cell: `B20`,
formula: ``,
hidden: true
},
'C20' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C20`,
formula: ``,
hidden: false
},
'D20' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `D20`,
formula: `E20*D18`,
hidden: true
},
'E20' : {
val: `1.29`,
val_noFormat: `1,29`,
excl_cell: `E20`,
formula: ``,
hidden: true
},
'F20' : {
val: `251.31136`,
val_noFormat: `251.31136`,
excl_cell: `F20`,
formula: `[2]Düngung!M21*T20+[2]Düngung!P11`,
hidden: true
},
'G20' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `G20`,
formula: `H20*G18`,
hidden: true
},
'H20' : {
val: `0.91`,
val_noFormat: `0,91`,
excl_cell: `H20`,
formula: ``,
hidden: true
},
'I20' : {
val: `27.253582`,
val_noFormat: `27.253582`,
excl_cell: `I20`,
formula: `(SUM(D20:G20)/4*0.05)+(V20*0.014*1)`,
hidden: true
},
'J20' : {
val: `533.014942`,
val_noFormat: `533.014942`,
excl_cell: `J20`,
formula: `SUM(D20,F20,G20,I20)`,
hidden: false
},
'K20' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `K20`,
formula: `L20*K18`,
hidden: true
},
'L20' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `L20`,
formula: ``,
hidden: true
},
'M20' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `M20`,
formula: `N20*M18`,
hidden: true
},
'N20' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `N20`,
formula: ``,
hidden: true
},
'O20' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O20`,
formula: `P20*O18`,
hidden: true
},
'P20' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P20`,
formula: ``,
hidden: true
},
'Q20' : {
val: `575`,
val_noFormat: `575`,
excl_cell: `Q20`,
formula: `SUM(K20,M20,O20)`,
hidden: false
},
'R20' : {
val: `1110.0`,
val_noFormat: `1110.0`,
excl_cell: `R20`,
formula: `ROUND(J20+Q20,3-LEN(INT(J20+Q20)))`,
hidden: true
},
'S20' : {
val: `16,90`,
val_noFormat: `16,90`,
excl_cell: `S20`,
formula: `S23-0.5`,
hidden: false
},
'T20' : {
val: `88,4`,
val_noFormat: `88,4`,
excl_cell: `T20`,
formula: `T18*U20`,
hidden: false
},
'U20' : {
val: `1.040`,
val_noFormat: `1,040`,
excl_cell: `U20`,
formula: ``,
hidden: false
},
'V20' : {
val: `1.494`,
val_noFormat: `1.494`,
excl_cell: `V20`,
formula: `S20*T20`,
hidden: false
},
'W20' : {
val: ``,
val_noFormat: ``,
excl_cell: `W20`,
formula: ``,
hidden: true
},
'X20' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X20`,
formula: ``,
hidden: false
},
'Y20' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y20`,
formula: ``,
hidden: false
},
'Z20' : {
val: `12.55656108597285`,
val_noFormat: `12.55656108597285`,
excl_cell: `Z20`,
formula: `R20/T20`,
hidden: true
},
'AA20' : {
val: `697.514942`,
val_noFormat: `697.514942`,
excl_cell: `AA20`,
formula: `D20+F20+G20+I20+K20`,
hidden: true
},
'AB20' : {
val: `796.445058`,
val_noFormat: `796.445058`,
excl_cell: `AB20`,
formula: `V20-D20-F20-G20-I20-K20`,
hidden: true
},
'AC20' : {
val: `386.39505800000006`,
val_noFormat: `386.39505800000006`,
excl_cell: `AC20`,
formula: `V20+Y20-J20-Q20+X20`,
hidden: false
},
'AD20' : {
val: `65.53638710059172`,
val_noFormat: `65.53638710059172`,
excl_cell: `AD20`,
formula: `(J20+Q20-X20-Y20)/S20`,
hidden: true
},
'AE20' : {
val: `12.5`,
val_noFormat: `12.5`,
excl_cell: `AE20`,
formula: `ROUND((J20+Q20-X20-Y20)/T20,3-LEN(INT((J20+Q20-X20-Y20)/T20)))`,
hidden: true
},
'AF20' : {
val: `77.21236343195267`,
val_noFormat: `77.21236343195267`,
excl_cell: `AF20`,
formula: `(AC41+J20+Q20-X20)/S20`,
hidden: false
},
'AG20' : {
val: `14.761187126696832`,
val_noFormat: `14.761187126696832`,
excl_cell: `AG20`,
formula: `(AC41+J20+Q20-X20)/T20`,
hidden: false
},
'AH20' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH20`,
formula: ``,
hidden: true
},
'AI20' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI20`,
formula: ``,
hidden: true
},
'AJ20' : {
val: `1230.0`,
val_noFormat: `1230.0`,
excl_cell: `AJ20`,
formula: `R20+AH20`,
hidden: true
},
'AK20' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK20`,
formula: ``,
hidden: true
},
'AL20' : {
val: `543.96`,
val_noFormat: `543.96`,
excl_cell: `AL20`,
formula: `V20+AK20-AJ20`,
hidden: true
},
'AM20' : {
val: `463.96000000000004`,
val_noFormat: `463.96000000000004`,
excl_cell: `AM20`,
formula: `AL20-AI20`,
hidden: true
},
'AN20' : {
val: `1,51`,
val_noFormat: `1,51`,
excl_cell: `AN20`,
formula: `AP20/6.25`,
hidden: true
},
'AO20' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO20`,
formula: ``,
hidden: true
},
'AP20' : {
val: `9,46`,
val_noFormat: `9,46`,
excl_cell: `AP20`,
formula: `AQ20*AO20/100`,
hidden: true
},
'AQ20' : {
val: `11.00`,
val_noFormat: `11,00`,
excl_cell: `AQ20`,
formula: ``,
hidden: true
},
'AR20' : {
val: `0.90`,
val_noFormat: `0,90`,
excl_cell: `AR20`,
formula: ``,
hidden: true
},
'AS20' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS20`,
formula: ``,
hidden: true
},
'AT20' : {
val: `174`,
val_noFormat: `174`,
excl_cell: `AT20`,
formula: `AU20+(AR20*T20*AS20)`,
hidden: true
},
'AU20' : {
val: `134`,
val_noFormat: `134`,
excl_cell: `AU20`,
formula: `AN20*T20`,
hidden: true
},
'AV20' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `AV20`,
formula: ``,
hidden: true
},
'AW20' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `AW20`,
formula: ``,
hidden: true
},
'AX20' : {
val: `18`,
val_noFormat: `18`,
excl_cell: `AX20`,
formula: `T20-AW20`,
hidden: true
},
'AY20' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY20`,
formula: ``,
hidden: true
},
'AZ20' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ20`,
formula: ``,
hidden: true
},
'BA20' : {
val: `188`,
val_noFormat: `188`,
excl_cell: `BA20`,
formula: `(IF(AX20>0,AY20*AX20,IF(AX20<0,AZ20*AX20)))+AV20`,
hidden: true
},
'BB20' : {
val: `55`,
val_noFormat: `55`,
excl_cell: `BB20`,
formula: `BA20-AU20`,
hidden: true
},
'BC20' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC20`,
formula: ``,
hidden: true
},
'BD20' : {
val: `0.9`,
val_noFormat: `0,9`,
excl_cell: `BD20`,
formula: ``,
hidden: true
},
'BE20' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE20`,
formula: ``,
hidden: true
},
'BF20' : {
val: `396`,
val_noFormat: `396`,
excl_cell: `BF20`,
formula: `(T20*BD20*BE20*0.1)+BC20`,
hidden: true
},
'BG20' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG20`,
formula: ``,
hidden: false
},
'A21' : {
val: `So-Durum`,
val_noFormat: `So-Durum`,
excl_cell: `A21`,
formula: ``,
hidden: false
},
'B21' : {
val: `DURAMONTE`,
val_noFormat: `DURAMONTE`,
excl_cell: `B21`,
formula: ``,
hidden: true
},
'C21' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C21`,
formula: ``,
hidden: false
},
'D21' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `D21`,
formula: `E21*D18`,
hidden: true
},
'E21' : {
val: `1.82`,
val_noFormat: `1,82`,
excl_cell: `E21`,
formula: ``,
hidden: true
},
'F21' : {
val: `219.62727679999998`,
val_noFormat: `219.62727679999998`,
excl_cell: `F21`,
formula: `[2]Düngung!M19*T21+[2]Düngung!P11`,
hidden: true
},
'G21' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `G21`,
formula: `H21*G18`,
hidden: true
},
'H21' : {
val: `0.69`,
val_noFormat: `0,69`,
excl_cell: `H21`,
formula: ``,
hidden: true
},
'I21' : {
val: `30.211232960000004`,
val_noFormat: `30.211232960000004`,
excl_cell: `I21`,
formula: `(SUM(D21:G21)/4*0.05)+(V21*0.014*1.25)`,
hidden: true
},
'J21' : {
val: `514.93850976`,
val_noFormat: `514.93850976`,
excl_cell: `J21`,
formula: `SUM(D21,F21,G21,I21)`,
hidden: false
},
'K21' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `K21`,
formula: `L21*K18`,
hidden: true
},
'L21' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `L21`,
formula: ``,
hidden: true
},
'M21' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `M21`,
formula: `N21*M18`,
hidden: true
},
'N21' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `N21`,
formula: ``,
hidden: true
},
'O21' : {
val: `220`,
val_noFormat: `220`,
excl_cell: `O21`,
formula: `P21*O18`,
hidden: true
},
'P21' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `P21`,
formula: ``,
hidden: true
},
'Q21' : {
val: `530`,
val_noFormat: `530`,
excl_cell: `Q21`,
formula: `SUM(K21,M21,O21)`,
hidden: false
},
'R21' : {
val: `1040.0`,
val_noFormat: `1040.0`,
excl_cell: `R21`,
formula: `ROUND(J21+Q21,3-LEN(INT(J21+Q21)))`,
hidden: true
},
'S21' : {
val: `23,20`,
val_noFormat: `23,20`,
excl_cell: `S21`,
formula: `S18+5.2`,
hidden: false
},
'T21' : {
val: `59,4`,
val_noFormat: `59,4`,
excl_cell: `T21`,
formula: `T18*U21`,
hidden: false
},
'U21' : {
val: `0.699`,
val_noFormat: `0,699`,
excl_cell: `U21`,
formula: ``,
hidden: false
},
'V21' : {
val: `1.379`,
val_noFormat: `1.379`,
excl_cell: `V21`,
formula: `(S21*T21*W21/100)+(S23*T21*(100-W21)/100)`,
hidden: false
},
'W21' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `W21`,
formula: ``,
hidden: true
},
'X21' : {
val: `40`,
val_noFormat: `40`,
excl_cell: `X21`,
formula: ``,
hidden: false
},
'Y21' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y21`,
formula: ``,
hidden: false
},
'Z21' : {
val: `17.498990442859068`,
val_noFormat: `17.498990442859068`,
excl_cell: `Z21`,
formula: `R21/T21`,
hidden: true
},
'AA21' : {
val: `679.43850976`,
val_noFormat: `679.43850976`,
excl_cell: `AA21`,
formula: `D21+F21+G21+I21+K21`,
hidden: true
},
'AB21' : {
val: `699.38389024`,
val_noFormat: `699.38389024`,
excl_cell: `AB21`,
formula: `V21-D21-F21-G21-I21-K21`,
hidden: true
},
'AC21' : {
val: `374.18389024`,
val_noFormat: `374.18389024`,
excl_cell: `AC21`,
formula: `V21+Y21-J21-Q21+X21`,
hidden: false
},
'AD21' : {
val: `43.30338404137931`,
val_noFormat: `43.30338404137931`,
excl_cell: `AD21`,
formula: `(J21+Q21-X21-Y21)/S21`,
hidden: true
},
'AE21' : {
val: `16.9`,
val_noFormat: `16.9`,
excl_cell: `AE21`,
formula: `ROUND((J21+Q21-X21-Y21)/T21,3-LEN(INT((J21+Q21-X21-Y21)/T21)))`,
hidden: true
},
'AF21' : {
val: `51.808728868965524`,
val_noFormat: `51.808728868965524`,
excl_cell: `AF21`,
formula: `(AC41+J21+Q21-X21)/S21`,
hidden: false
},
'AG21' : {
val: `20.224163914389557`,
val_noFormat: `20.224163914389557`,
excl_cell: `AG21`,
formula: `(AC41+J21+Q21-X21)/T21`,
hidden: false
},
'AH21' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH21`,
formula: ``,
hidden: true
},
'AI21' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI21`,
formula: ``,
hidden: true
},
'AJ21' : {
val: `1160.0`,
val_noFormat: `1160.0`,
excl_cell: `AJ21`,
formula: `R21+AH21`,
hidden: true
},
'AK21' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK21`,
formula: ``,
hidden: true
},
'AL21' : {
val: `498.8224`,
val_noFormat: `498.8224`,
excl_cell: `AL21`,
formula: `V21+AK21-AJ21`,
hidden: true
},
'AM21' : {
val: `418.8224`,
val_noFormat: `418.8224`,
excl_cell: `AM21`,
formula: `AL21-AI21`,
hidden: true
},
'AN21' : {
val: `2,34`,
val_noFormat: `2,34`,
excl_cell: `AN21`,
formula: `AP21/5.7`,
hidden: true
},
'AO21' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO21`,
formula: ``,
hidden: true
},
'AP21' : {
val: `13,33`,
val_noFormat: `13,33`,
excl_cell: `AP21`,
formula: `AQ21*AO21/100`,
hidden: true
},
'AQ21' : {
val: `15.50`,
val_noFormat: `15,50`,
excl_cell: `AQ21`,
formula: ``,
hidden: true
},
'AR21' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR21`,
formula: ``,
hidden: true
},
'AS21' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS21`,
formula: ``,
hidden: true
},
'AT21' : {
val: `163`,
val_noFormat: `163`,
excl_cell: `AT21`,
formula: `AU21+(AR21*T21*AS21)`,
hidden: true
},
'AU21' : {
val: `139`,
val_noFormat: `139`,
excl_cell: `AU21`,
formula: `AN21*T21`,
hidden: true
},
'AV21' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `AV21`,
formula: ``,
hidden: true
},
'AW21' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW21`,
formula: ``,
hidden: true
},
'AX21' : {
val: `-21`,
val_noFormat: `-21`,
excl_cell: `AX21`,
formula: `T21-AW21`,
hidden: true
},
'AY21' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY21`,
formula: ``,
hidden: true
},
'AZ21' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ21`,
formula: ``,
hidden: true
},
'BA21' : {
val: `169`,
val_noFormat: `169`,
excl_cell: `BA21`,
formula: `(IF(AX21>0,AY21*AX21,IF(AX21<0,AZ21*AX21)))+AV21`,
hidden: true
},
'BB21' : {
val: `30`,
val_noFormat: `30`,
excl_cell: `BB21`,
formula: `BA21-AU21`,
hidden: true
},
'BC21' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC21`,
formula: ``,
hidden: true
},
'BD21' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD21`,
formula: ``,
hidden: true
},
'BE21' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE21`,
formula: ``,
hidden: true
},
'BF21' : {
val: `75`,
val_noFormat: `75`,
excl_cell: `BF21`,
formula: `(T21*BD21*BE21*0.1)+BC21`,
hidden: true
},
'BG21' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG21`,
formula: ``,
hidden: false
},
'A22' : {
val: `Hybridweizen A`,
val_noFormat: `Hybridweizen A`,
excl_cell: `A22`,
formula: ``,
hidden: true
},
'B22' : {
val: `HYVENTO`,
val_noFormat: `HYVENTO`,
excl_cell: `B22`,
formula: ``,
hidden: true
},
'C22' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C22`,
formula: ``,
hidden: true
},
'D22' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `D22`,
formula: `E22*D18`,
hidden: true
},
'E22' : {
val: `1.82`,
val_noFormat: `1,82`,
excl_cell: `E22`,
formula: ``,
hidden: true
},
'F22' : {
val: `262.0948`,
val_noFormat: `262.0948`,
excl_cell: `F22`,
formula: `[2]Düngung!M11*T22*0.95+[2]Düngung!P11`,
hidden: true
},
'G22' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `G22`,
formula: `H22*G18`,
hidden: true
},
'H22' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `H22`,
formula: ``,
hidden: true
},
'I22' : {
val: `34.825810000000004`,
val_noFormat: `34.825810000000004`,
excl_cell: `I22`,
formula: `(SUM(D22:G22)/4*0.05)+(V22*0.014*1.25)`,
hidden: true
},
'J22' : {
val: `611.62061`,
val_noFormat: `611.62061`,
excl_cell: `J22`,
formula: `SUM(D22,F22,G22,I22)`,
hidden: true
},
'K22' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `K22`,
formula: `L22*K18`,
hidden: true
},
'L22' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `L22`,
formula: ``,
hidden: true
},
'M22' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `M22`,
formula: `N22*M18`,
hidden: true
},
'N22' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `N22`,
formula: ``,
hidden: true
},
'O22' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O22`,
formula: `P22*O18`,
hidden: true
},
'P22' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P22`,
formula: ``,
hidden: true
},
'Q22' : {
val: `590`,
val_noFormat: `590`,
excl_cell: `Q22`,
formula: `SUM(K22,M22,O22)`,
hidden: true
},
'R22' : {
val: `1200.0`,
val_noFormat: `1200.0`,
excl_cell: `R22`,
formula: `ROUND(J22+Q22,3-LEN(INT(J22+Q22)))`,
hidden: true
},
'S22' : {
val: `18,55`,
val_noFormat: `18,55`,
excl_cell: `S22`,
formula: `S17`,
hidden: true
},
'T22' : {
val: `85,0`,
val_noFormat: `85,0`,
excl_cell: `T22`,
formula: `T18*U22`,
hidden: true
},
'U22' : {
val: `1.000`,
val_noFormat: `1,000`,
excl_cell: `U22`,
formula: ``,
hidden: true
},
'V22' : {
val: `1.577`,
val_noFormat: `1.577`,
excl_cell: `V22`,
formula: `S22*T22`,
hidden: true
},
'W22' : {
val: ``,
val_noFormat: ``,
excl_cell: `W22`,
formula: ``,
hidden: true
},
'X22' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X22`,
formula: ``,
hidden: true
},
'Y22' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y22`,
formula: ``,
hidden: true
},
'Z22' : {
val: `14.117647058823529`,
val_noFormat: `14.117647058823529`,
excl_cell: `Z22`,
formula: `R22/T22`,
hidden: true
},
'AA22' : {
val: `786.62061`,
val_noFormat: `786.62061`,
excl_cell: `AA22`,
formula: `D22+F22+G22+I22+K22`,
hidden: true
},
'AB22' : {
val: `790.1293899999998`,
val_noFormat: `790.1293899999998`,
excl_cell: `AB22`,
formula: `V22-D22-F22-G22-I22-K22`,
hidden: true
},
'AC22' : {
val: `375.12938999999994`,
val_noFormat: `375.12938999999994`,
excl_cell: `AC22`,
formula: `V22+Y22-J22-Q22+X22`,
hidden: true
},
'AD22' : {
val: `64.77739137466307`,
val_noFormat: `64.77739137466307`,
excl_cell: `AD22`,
formula: `(J22+Q22-X22-Y22)/S22`,
hidden: true
},
'AE22' : {
val: `14.1`,
val_noFormat: `14.1`,
excl_cell: `AE22`,
formula: `ROUND((J22+Q22-X22-Y22)/T22,3-LEN(INT((J22+Q22-X22-Y22)/T22)))`,
hidden: true
},
'AF22' : {
val: `75.41480377358491`,
val_noFormat: `75.41480377358491`,
excl_cell: `AF22`,
formula: `(AC41+J22+Q22-X22)/S22`,
hidden: true
},
'AG22' : {
val: `16.458171882352943`,
val_noFormat: `16.458171882352943`,
excl_cell: `AG22`,
formula: `(AC41+J22+Q22-X22)/T22`,
hidden: true
},
'AH22' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH22`,
formula: ``,
hidden: true
},
'AI22' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI22`,
formula: ``,
hidden: true
},
'AJ22' : {
val: `1320.0`,
val_noFormat: `1320.0`,
excl_cell: `AJ22`,
formula: `R22+AH22`,
hidden: true
},
'AK22' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK22`,
formula: ``,
hidden: true
},
'AL22' : {
val: `536.75`,
val_noFormat: `536.75`,
excl_cell: `AL22`,
formula: `V22+AK22-AJ22`,
hidden: true
},
'AM22' : {
val: `456.75`,
val_noFormat: `456.75`,
excl_cell: `AM22`,
formula: `AL22-AI22`,
hidden: true
},
'AN22' : {
val: `1,96`,
val_noFormat: `1,96`,
excl_cell: `AN22`,
formula: `AP22/5.7`,
hidden: true
},
'AO22' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO22`,
formula: ``,
hidden: true
},
'AP22' : {
val: `11,18`,
val_noFormat: `11,18`,
excl_cell: `AP22`,
formula: `AQ22*AO22/100`,
hidden: true
},
'AQ22' : {
val: `13.00`,
val_noFormat: `13,00`,
excl_cell: `AQ22`,
formula: ``,
hidden: true
},
'AR22' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR22`,
formula: ``,
hidden: true
},
'AS22' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS22`,
formula: ``,
hidden: true
},
'AT22' : {
val: `201`,
val_noFormat: `201`,
excl_cell: `AT22`,
formula: `AU22+(AR22*T22*AS22)`,
hidden: true
},
'AU22' : {
val: `167`,
val_noFormat: `167`,
excl_cell: `AU22`,
formula: `AN22*T22`,
hidden: true
},
'AV22' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `AV22`,
formula: ``,
hidden: true
},
'AW22' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW22`,
formula: ``,
hidden: true
},
'AX22' : {
val: `5`,
val_noFormat: `5`,
excl_cell: `AX22`,
formula: `T22-AW22`,
hidden: true
},
'AY22' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY22`,
formula: ``,
hidden: true
},
'AZ22' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ22`,
formula: ``,
hidden: true
},
'BA22' : {
val: `235`,
val_noFormat: `235`,
excl_cell: `BA22`,
formula: `(IF(AX22>0,AY22*AX22,IF(AX22<0,AZ22*AX22)))+AV22`,
hidden: true
},
'BB22' : {
val: `68`,
val_noFormat: `68`,
excl_cell: `BB22`,
formula: `BA22-AU22`,
hidden: true
},
'BC22' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC22`,
formula: ``,
hidden: true
},
'BD22' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD22`,
formula: ``,
hidden: true
},
'BE22' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE22`,
formula: ``,
hidden: true
},
'BF22' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `BF22`,
formula: `(T22*BD22*BE22*0.1)+BC22`,
hidden: true
},
'BG22' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG22`,
formula: ``,
hidden: true
},
'A23' : {
val: `Wi-Weizen C`,
val_noFormat: `Wi-Weizen C`,
excl_cell: `A23`,
formula: ``,
hidden: false
},
'B23' : {
val: `ELIXER`,
val_noFormat: `ELIXER`,
excl_cell: `B23`,
formula: ``,
hidden: true
},
'C23' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C23`,
formula: ``,
hidden: false
},
'D23' : {
val: `83`,
val_noFormat: `83`,
excl_cell: `D23`,
formula: `E23*D18`,
hidden: true
},
'E23' : {
val: `0.98`,
val_noFormat: `0,98`,
excl_cell: `E23`,
formula: ``,
hidden: true
},
'F23' : {
val: `268.05568000000005`,
val_noFormat: `268.05568000000005`,
excl_cell: `F23`,
formula: `[2]Düngung!M9*T23+[2]Düngung!P11`,
hidden: true
},
'G23' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `G23`,
formula: `H23*G18`,
hidden: true
},
'H23' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `H23`,
formula: ``,
hidden: true
},
'I23' : {
val: `32.804346`,
val_noFormat: `32.804346`,
excl_cell: `I23`,
formula: `(SUM(D23:G23)/4*0.05)+(V23*0.014*1.25)`,
hidden: true
},
'J23' : {
val: `544.160026`,
val_noFormat: `544.160026`,
excl_cell: `J23`,
formula: `SUM(D23,F23,G23,I23)`,
hidden: false
},
'K23' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `K23`,
formula: `L23*K18`,
hidden: true
},
'L23' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `L23`,
formula: ``,
hidden: true
},
'M23' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `M23`,
formula: `N23*M18`,
hidden: true
},
'N23' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `N23`,
formula: ``,
hidden: true
},
'O23' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O23`,
formula: `P23*O18`,
hidden: true
},
'P23' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P23`,
formula: ``,
hidden: true
},
'Q23' : {
val: `590`,
val_noFormat: `590`,
excl_cell: `Q23`,
formula: `SUM(K23,M23,O23)`,
hidden: false
},
'R23' : {
val: `1130.0`,
val_noFormat: `1130.0`,
excl_cell: `R23`,
formula: `ROUND(J23+Q23,3-LEN(INT(J23+Q23)))`,
hidden: true
},
'S23' : {
val: `17,40`,
val_noFormat: `17,40`,
excl_cell: `S23`,
formula: `S18-0.6`,
hidden: false
},
'T23' : {
val: `86,7`,
val_noFormat: `86,7`,
excl_cell: `T23`,
formula: `T18*U23`,
hidden: false
},
'U23' : {
val: `1.020`,
val_noFormat: `1,020`,
excl_cell: `U23`,
formula: ``,
hidden: false
},
'V23' : {
val: `1.509`,
val_noFormat: `1.509`,
excl_cell: `V23`,
formula: `S23*T23`,
hidden: false
},
'W23' : {
val: ``,
val_noFormat: ``,
excl_cell: `W23`,
formula: ``,
hidden: true
},
'X23' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X23`,
formula: ``,
hidden: false
},
'Y23' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y23`,
formula: ``,
hidden: false
},
'Z23' : {
val: `13.033448673587081`,
val_noFormat: `13.033448673587081`,
excl_cell: `Z23`,
formula: `R23/T23`,
hidden: true
},
'AA23' : {
val: `719.160026`,
val_noFormat: `719.160026`,
excl_cell: `AA23`,
formula: `D23+F23+G23+I23+K23`,
hidden: true
},
'AB23' : {
val: `789.4199739999998`,
val_noFormat: `789.4199739999998`,
excl_cell: `AB23`,
formula: `V23-D23-F23-G23-I23-K23`,
hidden: true
},
'AC23' : {
val: `374.4199739999999`,
val_noFormat: `374.4199739999999`,
excl_cell: `AC23`,
formula: `V23+Y23-J23-Q23+X23`,
hidden: false
},
'AD23' : {
val: `65.18161068965517`,
val_noFormat: `65.18161068965517`,
excl_cell: `AD23`,
formula: `(J23+Q23-X23-Y23)/S23`,
hidden: true
},
'AE23' : {
val: `13.1`,
val_noFormat: `13.1`,
excl_cell: `AE23`,
formula: `ROUND((J23+Q23-X23-Y23)/T23,3-LEN(INT((J23+Q23-X23-Y23)/T23)))`,
hidden: true
},
'AF23' : {
val: `76.52207045977012`,
val_noFormat: `76.52207045977012`,
excl_cell: `AF23`,
formula: `(AC41+J23+Q23-X23)/S23`,
hidden: false
},
'AG23' : {
val: `15.357370542099194`,
val_noFormat: `15.357370542099194`,
excl_cell: `AG23`,
formula: `(AC41+J23+Q23-X23)/T23`,
hidden: false
},
'AH23' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH23`,
formula: ``,
hidden: true
},
'AI23' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI23`,
formula: ``,
hidden: true
},
'AJ23' : {
val: `1250.0`,
val_noFormat: `1250.0`,
excl_cell: `AJ23`,
formula: `R23+AH23`,
hidden: true
},
'AK23' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK23`,
formula: ``,
hidden: true
},
'AL23' : {
val: `538.5799999999999`,
val_noFormat: `538.5799999999999`,
excl_cell: `AL23`,
formula: `V23+AK23-AJ23`,
hidden: true
},
'AM23' : {
val: `458.5799999999999`,
val_noFormat: `458.5799999999999`,
excl_cell: `AM23`,
formula: `AL23-AI23`,
hidden: true
},
'AN23' : {
val: `1,78`,
val_noFormat: `1,78`,
excl_cell: `AN23`,
formula: `AP23/5.7`,
hidden: true
},
'AO23' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO23`,
formula: ``,
hidden: true
},
'AP23' : {
val: `10,15`,
val_noFormat: `10,15`,
excl_cell: `AP23`,
formula: `AQ23*AO23/100`,
hidden: true
},
'AQ23' : {
val: `11.80`,
val_noFormat: `11,80`,
excl_cell: `AQ23`,
formula: ``,
hidden: true
},
'AR23' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR23`,
formula: ``,
hidden: true
},
'AS23' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS23`,
formula: ``,
hidden: true
},
'AT23' : {
val: `189`,
val_noFormat: `189`,
excl_cell: `AT23`,
formula: `AU23+(AR23*T23*AS23)`,
hidden: true
},
'AU23' : {
val: `154`,
val_noFormat: `154`,
excl_cell: `AU23`,
formula: `AN23*T23`,
hidden: true
},
'AV23' : {
val: `210`,
val_noFormat: `210`,
excl_cell: `AV23`,
formula: ``,
hidden: true
},
'AW23' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW23`,
formula: ``,
hidden: true
},
'AX23' : {
val: `7`,
val_noFormat: `7`,
excl_cell: `AX23`,
formula: `T23-AW23`,
hidden: true
},
'AY23' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY23`,
formula: ``,
hidden: true
},
'AZ23' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ23`,
formula: ``,
hidden: true
},
'BA23' : {
val: `216`,
val_noFormat: `216`,
excl_cell: `BA23`,
formula: `(IF(AX23>0,AY23*AX23,IF(AX23<0,AZ23*AX23)))+AV23`,
hidden: true
},
'BB23' : {
val: `62`,
val_noFormat: `62`,
excl_cell: `BB23`,
formula: `BA23-AU23`,
hidden: true
},
'BC23' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC23`,
formula: ``,
hidden: true
},
'BD23' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD23`,
formula: ``,
hidden: true
},
'BE23' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE23`,
formula: ``,
hidden: true
},
'BF23' : {
val: `294`,
val_noFormat: `294`,
excl_cell: `BF23`,
formula: `(T23*BD23*BE23*0.1)+BC23`,
hidden: true
},
'BG23' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG23`,
formula: ``,
hidden: false
},
'A24' : {
val: `Wi-Triticale`,
val_noFormat: `Wi-Triticale`,
excl_cell: `A24`,
formula: ``,
hidden: false
},
'B24' : {
val: `SU KALYPTUS`,
val_noFormat: `SU KALYPTUS`,
excl_cell: `B24`,
formula: ``,
hidden: true
},
'C24' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C24`,
formula: `C23`,
hidden: false
},
'D24' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `D24`,
formula: `E24*D18`,
hidden: true
},
'E24' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `E24`,
formula: ``,
hidden: true
},
'F24' : {
val: `254.83104`,
val_noFormat: `254.83104`,
excl_cell: `F24`,
formula: `[2]Düngung!M23*T24+[2]Düngung!P11`,
hidden: true
},
'G24' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `G24`,
formula: `H24*G18`,
hidden: true
},
'H24' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `H24`,
formula: ``,
hidden: true
},
'I24' : {
val: `31.786738`,
val_noFormat: `31.786738`,
excl_cell: `I24`,
formula: `(SUM(D24:G24)/4*0.05)+(V24*0.014*1.25)`,
hidden: true
},
'J24' : {
val: `506.517778`,
val_noFormat: `506.517778`,
excl_cell: `J24`,
formula: `SUM(D24,F24,G24,I24)`,
hidden: false
},
'K24' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `K24`,
formula: `L24*K18`,
hidden: true
},
'L24' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `L24`,
formula: ``,
hidden: true
},
'M24' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `M24`,
formula: `N24*M18`,
hidden: true
},
'N24' : {
val: `0.85`,
val_noFormat: `0,85`,
excl_cell: `N24`,
formula: ``,
hidden: true
},
'O24' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O24`,
formula: `P24*O18`,
hidden: true
},
'P24' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P24`,
formula: ``,
hidden: true
},
'Q24' : {
val: `560`,
val_noFormat: `560`,
excl_cell: `Q24`,
formula: `SUM(K24,M24,O24)`,
hidden: false
},
'R24' : {
val: `1070.0`,
val_noFormat: `1070.0`,
excl_cell: `R24`,
formula: `ROUND(J24+Q24,3-LEN(INT(J24+Q24)))`,
hidden: true
},
'S24' : {
val: `17,20`,
val_noFormat: `17,20`,
excl_cell: `S24`,
formula: `S18-0.8`,
hidden: false
},
'T24' : {
val: `85,8`,
val_noFormat: `85,8`,
excl_cell: `T24`,
formula: `T18*U24`,
hidden: false
},
'U24' : {
val: `1.010`,
val_noFormat: `1,010`,
excl_cell: `U24`,
formula: ``,
hidden: false
},
'V24' : {
val: `1.477`,
val_noFormat: `1.477`,
excl_cell: `V24`,
formula: `S24*T24`,
hidden: false
},
'W24' : {
val: ``,
val_noFormat: ``,
excl_cell: `W24`,
formula: ``,
hidden: true
},
'X24' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X24`,
formula: ``,
hidden: false
},
'Y24' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y24`,
formula: `Y23`,
hidden: false
},
'Z24' : {
val: `12.463599301106582`,
val_noFormat: `12.463599301106582`,
excl_cell: `Z24`,
formula: `R24/T24`,
hidden: true
},
'AA24' : {
val: `676.267778`,
val_noFormat: `676.267778`,
excl_cell: `AA24`,
formula: `D24+F24+G24+I24+K24`,
hidden: true
},
'AB24' : {
val: `800.3522219999998`,
val_noFormat: `800.3522219999998`,
excl_cell: `AB24`,
formula: `V24-D24-F24-G24-I24-K24`,
hidden: true
},
'AC24' : {
val: `374.4199739999999`,
val_noFormat: `374.4199739999999`,
excl_cell: `AC24`,
formula: `AC23`,
hidden: false
},
'AD24' : {
val: `65.18161068965517`,
val_noFormat: `65.18161068965517`,
excl_cell: `AD24`,
formula: `AD23`,
hidden: true
},
'AE24' : {
val: `13.1`,
val_noFormat: `13.1`,
excl_cell: `AE24`,
formula: `AE23`,
hidden: true
},
'AF24' : {
val: `73.47917313953488`,
val_noFormat: `73.47917313953488`,
excl_cell: `AF24`,
formula: `(AC41+J24+Q24-X24)/S24`,
hidden: false
},
'AG24' : {
val: `14.721511683168318`,
val_noFormat: `14.721511683168318`,
excl_cell: `AG24`,
formula: `(AC41+J24+Q24-X24)/T24`,
hidden: false
},
'AH24' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH24`,
formula: ``,
hidden: true
},
'AI24' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI24`,
formula: ``,
hidden: true
},
'AJ24' : {
val: `1190.0`,
val_noFormat: `1190.0`,
excl_cell: `AJ24`,
formula: `R24+AH24`,
hidden: true
},
'AK24' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK24`,
formula: ``,
hidden: true
},
'AL24' : {
val: `566.6199999999999`,
val_noFormat: `566.6199999999999`,
excl_cell: `AL24`,
formula: `V24+AK24-AJ24`,
hidden: true
},
'AM24' : {
val: `486.6199999999999`,
val_noFormat: `486.6199999999999`,
excl_cell: `AM24`,
formula: `AL24-AI24`,
hidden: true
},
'AN24' : {
val: `1,65`,
val_noFormat: `1,65`,
excl_cell: `AN24`,
formula: `AP24/6.25`,
hidden: true
},
'AO24' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO24`,
formula: ``,
hidden: true
},
'AP24' : {
val: `10,32`,
val_noFormat: `10,32`,
excl_cell: `AP24`,
formula: `AQ24*AO24/100`,
hidden: true
},
'AQ24' : {
val: `12.00`,
val_noFormat: `12,00`,
excl_cell: `AQ24`,
formula: ``,
hidden: true
},
'AR24' : {
val: `0.90`,
val_noFormat: `0,90`,
excl_cell: `AR24`,
formula: ``,
hidden: true
},
'AS24' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS24`,
formula: ``,
hidden: true
},
'AT24' : {
val: `180`,
val_noFormat: `180`,
excl_cell: `AT24`,
formula: `AU24+(AR24*T24*AS24)`,
hidden: true
},
'AU24' : {
val: `142`,
val_noFormat: `142`,
excl_cell: `AU24`,
formula: `AN24*T24`,
hidden: true
},
'AV24' : {
val: `190`,
val_noFormat: `190`,
excl_cell: `AV24`,
formula: ``,
hidden: true
},
'AW24' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `AW24`,
formula: ``,
hidden: true
},
'AX24' : {
val: `16`,
val_noFormat: `16`,
excl_cell: `AX24`,
formula: `T24-AW24`,
hidden: true
},
'AY24' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY24`,
formula: ``,
hidden: true
},
'AZ24' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ24`,
formula: ``,
hidden: true
},
'BA24' : {
val: `206`,
val_noFormat: `206`,
excl_cell: `BA24`,
formula: `(IF(AX24>0,AY24*AX24,IF(AX24<0,AZ24*AX24)))+AV24`,
hidden: true
},
'BB24' : {
val: `64`,
val_noFormat: `64`,
excl_cell: `BB24`,
formula: `BA24-AU24`,
hidden: true
},
'BC24' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC24`,
formula: ``,
hidden: true
},
'BD24' : {
val: `0.9`,
val_noFormat: `0,9`,
excl_cell: `BD24`,
formula: ``,
hidden: true
},
'BE24' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE24`,
formula: ``,
hidden: true
},
'BF24' : {
val: `373`,
val_noFormat: `373`,
excl_cell: `BF24`,
formula: `(T24*BD24*BE24*0.1)+BC24`,
hidden: true
},
'BG24' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG24`,
formula: ``,
hidden: false
},
'A25' : {
val: `So-Weizen E`,
val_noFormat: `So-Weizen E`,
excl_cell: `A25`,
formula: ``,
hidden: false
},
'B25' : {
val: `LENNOX`,
val_noFormat: `LENNOX`,
excl_cell: `B25`,
formula: ``,
hidden: true
},
'C25' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C25`,
formula: ``,
hidden: false
},
'D25' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `D25`,
formula: `E25*D18`,
hidden: true
},
'E25' : {
val: `1.29`,
val_noFormat: `1,29`,
excl_cell: `E25`,
formula: ``,
hidden: true
},
'F25' : {
val: `225.42783999999997`,
val_noFormat: `225.42783999999997`,
excl_cell: `F25`,
formula: `[2]Düngung!M13*T25+[2]Düngung!P11`,
hidden: true
},
'G25' : {
val: `115`,
val_noFormat: `115`,
excl_cell: `G25`,
formula: `H25*G18`,
hidden: true
},
'H25' : {
val: `0.72`,
val_noFormat: `0,72`,
excl_cell: `H25`,
formula: ``,
hidden: true
},
'I25' : {
val: `28.593747999999998`,
val_noFormat: `28.593747999999998`,
excl_cell: `I25`,
formula: `(SUM(D25:G25)/4*0.05)+(V25*0.014*1.25)`,
hidden: true
},
'J25' : {
val: `478.871588`,
val_noFormat: `478.871588`,
excl_cell: `J25`,
formula: `SUM(D25,F25,G25,I25)`,
hidden: false
},
'K25' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `K25`,
formula: `L25*K18`,
hidden: true
},
'L25' : {
val: `0.89`,
val_noFormat: `0,89`,
excl_cell: `L25`,
formula: ``,
hidden: true
},
'M25' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `M25`,
formula: `N25*M18`,
hidden: true
},
'N25' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `N25`,
formula: ``,
hidden: true
},
'O25' : {
val: `220`,
val_noFormat: `220`,
excl_cell: `O25`,
formula: `P25*O18`,
hidden: true
},
'P25' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `P25`,
formula: ``,
hidden: true
},
'Q25' : {
val: `520`,
val_noFormat: `520`,
excl_cell: `Q25`,
formula: `SUM(K25,M25,O25)`,
hidden: false
},
'R25' : {
val: `999.0`,
val_noFormat: `999.0`,
excl_cell: `R25`,
formula: `ROUND(J25+Q25,3-LEN(INT(J25+Q25)))`,
hidden: true
},
'S25' : {
val: `20,30`,
val_noFormat: `20,30`,
excl_cell: `S25`,
formula: `S19+0.2`,
hidden: false
},
'T25' : {
val: `64,6`,
val_noFormat: `64,6`,
excl_cell: `T25`,
formula: `T18*U25`,
hidden: false
},
'U25' : {
val: `0.760`,
val_noFormat: `0,760`,
excl_cell: `U25`,
formula: ``,
hidden: false
},
'V25' : {
val: `1.311`,
val_noFormat: `1.311`,
excl_cell: `V25`,
formula: `S25*T25`,
hidden: false
},
'W25' : {
val: ``,
val_noFormat: ``,
excl_cell: `W25`,
formula: ``,
hidden: true
},
'X25' : {
val: `40`,
val_noFormat: `40`,
excl_cell: `X25`,
formula: ``,
hidden: false
},
'Y25' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y25`,
formula: ``,
hidden: false
},
'Z25' : {
val: `15.464396284829723`,
val_noFormat: `15.464396284829723`,
excl_cell: `Z25`,
formula: `R25/T25`,
hidden: true
},
'AA25' : {
val: `633.746588`,
val_noFormat: `633.746588`,
excl_cell: `AA25`,
formula: `D25+F25+G25+I25+K25`,
hidden: true
},
'AB25' : {
val: `677.6334119999999`,
val_noFormat: `677.6334119999999`,
excl_cell: `AB25`,
formula: `V25-D25-F25-G25-I25-K25`,
hidden: true
},
'AC25' : {
val: `352.7634119999999`,
val_noFormat: `352.7634119999999`,
excl_cell: `AC25`,
formula: `V25+Y25-J25-Q25+X25`,
hidden: false
},
'AD25' : {
val: `47.22249201970443`,
val_noFormat: `47.22249201970443`,
excl_cell: `AD25`,
formula: `(J25+Q25-X25-Y25)/S25`,
hidden: true
},
'AE25' : {
val: `14.8`,
val_noFormat: `14.8`,
excl_cell: `AE25`,
formula: `ROUND((J25+Q25-X25-Y25)/T25,3-LEN(INT((J25+Q25-X25-Y25)/T25)))`,
hidden: true
},
'AF25' : {
val: `56.94288610837438`,
val_noFormat: `56.94288610837438`,
excl_cell: `AF25`,
formula: `(AC41+J25+Q25-X25)/S25`,
hidden: false
},
'AG25' : {
val: `17.893817151702788`,
val_noFormat: `17.893817151702788`,
excl_cell: `AG25`,
formula: `(AC41+J25+Q25-X25)/T25`,
hidden: false
},
'AH25' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH25`,
formula: ``,
hidden: true
},
'AI25' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI25`,
formula: ``,
hidden: true
},
'AJ25' : {
val: `1119.0`,
val_noFormat: `1119.0`,
excl_cell: `AJ25`,
formula: `R25+AH25`,
hidden: true
},
'AK25' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK25`,
formula: ``,
hidden: true
},
'AL25' : {
val: `472.3799999999999`,
val_noFormat: `472.3799999999999`,
excl_cell: `AL25`,
formula: `V25+AK25-AJ25`,
hidden: true
},
'AM25' : {
val: `392.3799999999999`,
val_noFormat: `392.3799999999999`,
excl_cell: `AM25`,
formula: `AL25-AI25`,
hidden: true
},
'AN25' : {
val: `2,26`,
val_noFormat: `2,26`,
excl_cell: `AN25`,
formula: `AP25/5.7`,
hidden: true
},
'AO25' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO25`,
formula: ``,
hidden: true
},
'AP25' : {
val: `12,90`,
val_noFormat: `12,90`,
excl_cell: `AP25`,
formula: `AQ25*AO25/100`,
hidden: true
},
'AQ25' : {
val: `15.00`,
val_noFormat: `15,00`,
excl_cell: `AQ25`,
formula: ``,
hidden: true
},
'AR25' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR25`,
formula: ``,
hidden: true
},
'AS25' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS25`,
formula: ``,
hidden: true
},
'AT25' : {
val: `172`,
val_noFormat: `172`,
excl_cell: `AT25`,
formula: `AU25+(AR25*T25*AS25)`,
hidden: true
},
'AU25' : {
val: `146`,
val_noFormat: `146`,
excl_cell: `AU25`,
formula: `AN25*T25`,
hidden: true
},
'AV25' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `AV25`,
formula: ``,
hidden: true
},
'AW25' : {
val: `60`,
val_noFormat: `60`,
excl_cell: `AW25`,
formula: ``,
hidden: true
},
'AX25' : {
val: `5`,
val_noFormat: `5`,
excl_cell: `AX25`,
formula: `T25-AW25`,
hidden: true
},
'AY25' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY25`,
formula: ``,
hidden: true
},
'AZ25' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ25`,
formula: ``,
hidden: true
},
'BA25' : {
val: `174`,
val_noFormat: `174`,
excl_cell: `BA25`,
formula: `(IF(AX25>0,AY25*AX25,IF(AX25<0,AZ25*AX25)))+AV25`,
hidden: true
},
'BB25' : {
val: `28`,
val_noFormat: `28`,
excl_cell: `BB25`,
formula: `BA25-AU25`,
hidden: true
},
'BC25' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC25`,
formula: ``,
hidden: true
},
'BD25' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD25`,
formula: ``,
hidden: true
},
'BE25' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE25`,
formula: ``,
hidden: true
},
'BF25' : {
val: `117`,
val_noFormat: `117`,
excl_cell: `BF25`,
formula: `(T25*BD25*BE25*0.1)+BC25`,
hidden: true
},
'BG25' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG25`,
formula: ``,
hidden: false
},
'A26' : {
val: `So-Braugerste`,
val_noFormat: `So-Braugerste`,
excl_cell: `A26`,
formula: ``,
hidden: false
},
'B26' : {
val: `ACCORDINE`,
val_noFormat: `ACCORDINE`,
excl_cell: `B26`,
formula: ``,
hidden: true
},
'C26' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C26`,
formula: ``,
hidden: false
},
'D26' : {
val: `90`,
val_noFormat: `90`,
excl_cell: `D26`,
formula: `E26*D18`,
hidden: true
},
'E26' : {
val: `1.06`,
val_noFormat: `1,06`,
excl_cell: `E26`,
formula: ``,
hidden: true
},
'F26' : {
val: `177.26376`,
val_noFormat: `177.26376`,
excl_cell: `F26`,
formula: `[2]Düngung!M19*T26+[2]Düngung!P1`,
hidden: true
},
'G26' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `G26`,
formula: `H26*G18`,
hidden: true
},
'H26' : {
val: `0.69`,
val_noFormat: `0,69`,
excl_cell: `H26`,
formula: ``,
hidden: true
},
'I26' : {
val: `30.599946999999997`,
val_noFormat: `30.599946999999997`,
excl_cell: `I26`,
formula: `(SUM(D26:G26)/4*0.05)+(V26*0.014*1.5)`,
hidden: true
},
'J26' : {
val: `408.363707`,
val_noFormat: `408.363707`,
excl_cell: `J26`,
formula: `SUM(D26,F26,G26,I26)`,
hidden: false
},
'K26' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `K26`,
formula: `L26*K18`,
hidden: true
},
'L26' : {
val: `0.92`,
val_noFormat: `0,92`,
excl_cell: `L26`,
formula: ``,
hidden: true
},
'M26' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `M26`,
formula: `N26*M18`,
hidden: true
},
'N26' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `N26`,
formula: ``,
hidden: true
},
'O26' : {
val: `235`,
val_noFormat: `235`,
excl_cell: `O26`,
formula: `P26*O18`,
hidden: true
},
'P26' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `P26`,
formula: ``,
hidden: true
},
'Q26' : {
val: `540`,
val_noFormat: `540`,
excl_cell: `Q26`,
formula: `SUM(K26,M26,O26)`,
hidden: false
},
'R26' : {
val: `949.0`,
val_noFormat: `949.0`,
excl_cell: `R26`,
formula: `ROUND(J26+Q26,3-LEN(INT(J26+Q26)))`,
hidden: true
},
'S26' : {
val: `21,00`,
val_noFormat: `21,00`,
excl_cell: `S26`,
formula: `S37`,
hidden: false
},
'T26' : {
val: `58,6`,
val_noFormat: `58,6`,
excl_cell: `T26`,
formula: `T18*U26`,
hidden: false
},
'U26' : {
val: `0.690`,
val_noFormat: `0,690`,
excl_cell: `U26`,
formula: ``,
hidden: false
},
'V26' : {
val: `1.232`,
val_noFormat: `1.232`,
excl_cell: `V26`,
formula: `S26*T26`,
hidden: false
},
'W26' : {
val: ``,
val_noFormat: ``,
excl_cell: `W26`,
formula: ``,
hidden: true
},
'X26' : {
val: `40`,
val_noFormat: `40`,
excl_cell: `X26`,
formula: ``,
hidden: false
},
'Y26' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y26`,
formula: ``,
hidden: false
},
'Z26' : {
val: `16.18073316283035`,
val_noFormat: `16.18073316283035`,
excl_cell: `Z26`,
formula: `R26/T26`,
hidden: true
},
'AA26' : {
val: `568.488707`,
val_noFormat: `568.488707`,
excl_cell: `AA26`,
formula: `D26+F26+G26+I26+K26`,
hidden: true
},
'AB26' : {
val: `663.1612929999999`,
val_noFormat: `663.1612929999999`,
excl_cell: `AB26`,
formula: `V26-D26-F26-G26-I26-K26`,
hidden: true
},
'AC26' : {
val: `322.96129299999984`,
val_noFormat: `322.96129299999984`,
excl_cell: `AC26`,
formula: `V26+Y26-J26-Q26+X26`,
hidden: false
},
'AD26' : {
val: `43.27089080952381`,
val_noFormat: `43.27089080952381`,
excl_cell: `AD26`,
formula: `(J26+Q26-X26-Y26)/S26`,
hidden: true
},
'AE26' : {
val: `15.5`,
val_noFormat: `15.5`,
excl_cell: `AE26`,
formula: `ROUND((J26+Q26-X26-Y26)/T26,3-LEN(INT((J26+Q26-X26-Y26)/T26)))`,
hidden: true
},
'AF26' : {
val: `52.66727176190476`,
val_noFormat: `52.66727176190476`,
excl_cell: `AF26`,
formula: `(AC41+J26+Q26-X26)/S26`,
hidden: false
},
'AG26' : {
val: `18.857846666666664`,
val_noFormat: `18.857846666666664`,
excl_cell: `AG26`,
formula: `(AC41+J26+Q26-X26)/T26`,
hidden: false
},
'AH26' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH26`,
formula: ``,
hidden: true
},
'AI26' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI26`,
formula: ``,
hidden: true
},
'AJ26' : {
val: `1069.0`,
val_noFormat: `1069.0`,
excl_cell: `AJ26`,
formula: `R26+AH26`,
hidden: true
},
'AK26' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK26`,
formula: ``,
hidden: true
},
'AL26' : {
val: `442.64999999999986`,
val_noFormat: `442.64999999999986`,
excl_cell: `AL26`,
formula: `V26+AK26-AJ26`,
hidden: true
},
'AM26' : {
val: `362.64999999999986`,
val_noFormat: `362.64999999999986`,
excl_cell: `AM26`,
formula: `AL26-AI26`,
hidden: true
},
'AN26' : {
val: `1,44`,
val_noFormat: `1,44`,
excl_cell: `AN26`,
formula: `AP26/6.25`,
hidden: true
},
'AO26' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO26`,
formula: ``,
hidden: true
},
'AP26' : {
val: `9,03`,
val_noFormat: `9,03`,
excl_cell: `AP26`,
formula: `AQ26*AO26/100`,
hidden: true
},
'AQ26' : {
val: `10.50`,
val_noFormat: `10,50`,
excl_cell: `AQ26`,
formula: ``,
hidden: true
},
'AR26' : {
val: `0.70`,
val_noFormat: `0,70`,
excl_cell: `AR26`,
formula: ``,
hidden: true
},
'AS26' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS26`,
formula: ``,
hidden: true
},
'AT26' : {
val: `105`,
val_noFormat: `105`,
excl_cell: `AT26`,
formula: `AU26+(AR26*T26*AS26)`,
hidden: true
},
'AU26' : {
val: `85`,
val_noFormat: `85`,
excl_cell: `AU26`,
formula: `AN26*T26`,
hidden: true
},
'AV26' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `AV26`,
formula: ``,
hidden: true
},
'AW26' : {
val: `50`,
val_noFormat: `50`,
excl_cell: `AW26`,
formula: ``,
hidden: true
},
'AX26' : {
val: `9`,
val_noFormat: `9`,
excl_cell: `AX26`,
formula: `T26-AW26`,
hidden: true
},
'AY26' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY26`,
formula: ``,
hidden: true
},
'AZ26' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ26`,
formula: ``,
hidden: true
},
'BA26' : {
val: `149`,
val_noFormat: `149`,
excl_cell: `BA26`,
formula: `(IF(AX26>0,AY26*AX26,IF(AX26<0,AZ26*AX26)))+AV26`,
hidden: true
},
'BB26' : {
val: `64`,
val_noFormat: `64`,
excl_cell: `BB26`,
formula: `BA26-AU26`,
hidden: true
},
'BC26' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC26`,
formula: ``,
hidden: true
},
'BD26' : {
val: `0.7`,
val_noFormat: `0,7`,
excl_cell: `BD26`,
formula: ``,
hidden: true
},
'BE26' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE26`,
formula: ``,
hidden: true
},
'BF26' : {
val: `11`,
val_noFormat: `11`,
excl_cell: `BF26`,
formula: `(T26*BD26*BE26*0.1)+BC26`,
hidden: true
},
'BG26' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG26`,
formula: ``,
hidden: false
},
'A27' : {
val: `Hybridroggen`,
val_noFormat: `Hybridroggen`,
excl_cell: `A27`,
formula: ``,
hidden: false
},
'B27' : {
val: `SU PERFORMER`,
val_noFormat: `SU PERFORMER`,
excl_cell: `B27`,
formula: ``,
hidden: true
},
'C27' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C27`,
formula: ``,
hidden: false
},
'D27' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `D27`,
formula: `E27*D18`,
hidden: true
},
'E27' : {
val: `1.29`,
val_noFormat: `1,29`,
excl_cell: `E27`,
formula: ``,
hidden: true
},
'F27' : {
val: `251.31136`,
val_noFormat: `251.31136`,
excl_cell: `F27`,
formula: `[2]Düngung!M21*T27+[2]Düngung!P11`,
hidden: true
},
'G27' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `G27`,
formula: `H27*G18`,
hidden: true
},
'H27' : {
val: `0.91`,
val_noFormat: `0,91`,
excl_cell: `H27`,
formula: ``,
hidden: true
},
'I27' : {
val: `26.139742000000002`,
val_noFormat: `26.139742000000002`,
excl_cell: `I27`,
formula: `(SUM(D27:G27)/4*0.05)+(V27*0.014*1)`,
hidden: true
},
'J27' : {
val: `531.901102`,
val_noFormat: `531.901102`,
excl_cell: `J27`,
formula: `SUM(D27,F27,G27,I27)`,
hidden: false
},
'K27' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `K27`,
formula: `L27*K18`,
hidden: true
},
'L27' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `L27`,
formula: ``,
hidden: true
},
'M27' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `M27`,
formula: `N27*M18`,
hidden: true
},
'N27' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `N27`,
formula: ``,
hidden: true
},
'O27' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O27`,
formula: `P27*O18`,
hidden: true
},
'P27' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P27`,
formula: ``,
hidden: true
},
'Q27' : {
val: `575`,
val_noFormat: `575`,
excl_cell: `Q27`,
formula: `SUM(K27,M27,O27)`,
hidden: false
},
'R27' : {
val: `1110.0`,
val_noFormat: `1110.0`,
excl_cell: `R27`,
formula: `ROUND(J27+Q27,3-LEN(INT(J27+Q27)))`,
hidden: true
},
'S27' : {
val: `16,00`,
val_noFormat: `16,00`,
excl_cell: `S27`,
formula: `S18-2`,
hidden: false
},
'T27' : {
val: `88,4`,
val_noFormat: `88,4`,
excl_cell: `T27`,
formula: `T18*U27`,
hidden: false
},
'U27' : {
val: `1.040`,
val_noFormat: `1,040`,
excl_cell: `U27`,
formula: ``,
hidden: false
},
'V27' : {
val: `1.414`,
val_noFormat: `1.414`,
excl_cell: `V27`,
formula: `S27*T27`,
hidden: false
},
'W27' : {
val: ``,
val_noFormat: ``,
excl_cell: `W27`,
formula: ``,
hidden: true
},
'X27' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X27`,
formula: ``,
hidden: false
},
'Y27' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y27`,
formula: ``,
hidden: false
},
'Z27' : {
val: `12.55656108597285`,
val_noFormat: `12.55656108597285`,
excl_cell: `Z27`,
formula: `R27/T27`,
hidden: true
},
'AA27' : {
val: `696.401102`,
val_noFormat: `696.401102`,
excl_cell: `AA27`,
formula: `D27+F27+G27+I27+K27`,
hidden: true
},
'AB27' : {
val: `717.9988980000002`,
val_noFormat: `717.9988980000002`,
excl_cell: `AB27`,
formula: `V27-D27-F27-G27-I27-K27`,
hidden: true
},
'AC27' : {
val: `307.9488980000001`,
val_noFormat: `307.9488980000001`,
excl_cell: `AC27`,
formula: `V27+Y27-J27-Q27+X27`,
hidden: false
},
'AD27' : {
val: `69.153193875`,
val_noFormat: `69.153193875`,
excl_cell: `AD27`,
formula: `(J27+Q27-X27-Y27)/S27`,
hidden: true
},
'AE27' : {
val: `12.5`,
val_noFormat: `12.5`,
excl_cell: `AE27`,
formula: `ROUND((J27+Q27-X27-Y27)/T27,3-LEN(INT((J27+Q27-X27-Y27)/T27)))`,
hidden: true
},
'AF27' : {
val: `81.485943875`,
val_noFormat: `81.485943875`,
excl_cell: `AF27`,
formula: `(AC41+J27+Q27-X27)/S27`,
hidden: false
},
'AG27' : {
val: `14.748587126696833`,
val_noFormat: `14.748587126696833`,
excl_cell: `AG27`,
formula: `(AC41+J27+Q27-X27)/T27`,
hidden: false
},
'AH27' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH27`,
formula: ``,
hidden: true
},
'AI27' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI27`,
formula: ``,
hidden: true
},
'AJ27' : {
val: `1230.0`,
val_noFormat: `1230.0`,
excl_cell: `AJ27`,
formula: `R27+AH27`,
hidden: true
},
'AK27' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK27`,
formula: ``,
hidden: true
},
'AL27' : {
val: `464.4000000000001`,
val_noFormat: `464.4000000000001`,
excl_cell: `AL27`,
formula: `V27+AK27-AJ27`,
hidden: true
},
'AM27' : {
val: `384.4000000000001`,
val_noFormat: `384.4000000000001`,
excl_cell: `AM27`,
formula: `AL27-AI27`,
hidden: true
},
'AN27' : {
val: `1,51`,
val_noFormat: `1,51`,
excl_cell: `AN27`,
formula: `AP27/6.25`,
hidden: true
},
'AO27' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO27`,
formula: ``,
hidden: true
},
'AP27' : {
val: `9,46`,
val_noFormat: `9,46`,
excl_cell: `AP27`,
formula: `AQ27*AO27/100`,
hidden: true
},
'AQ27' : {
val: `11.00`,
val_noFormat: `11,00`,
excl_cell: `AQ27`,
formula: ``,
hidden: true
},
'AR27' : {
val: `0.90`,
val_noFormat: `0,90`,
excl_cell: `AR27`,
formula: ``,
hidden: true
},
'AS27' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS27`,
formula: ``,
hidden: true
},
'AT27' : {
val: `174`,
val_noFormat: `174`,
excl_cell: `AT27`,
formula: `AU27+(AR27*T27*AS27)`,
hidden: true
},
'AU27' : {
val: `134`,
val_noFormat: `134`,
excl_cell: `AU27`,
formula: `AN27*T27`,
hidden: true
},
'AV27' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `AV27`,
formula: ``,
hidden: true
},
'AW27' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `AW27`,
formula: ``,
hidden: true
},
'AX27' : {
val: `18`,
val_noFormat: `18`,
excl_cell: `AX27`,
formula: `T27-AW27`,
hidden: true
},
'AY27' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY27`,
formula: ``,
hidden: true
},
'AZ27' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ27`,
formula: ``,
hidden: true
},
'BA27' : {
val: `188`,
val_noFormat: `188`,
excl_cell: `BA27`,
formula: `(IF(AX27>0,AY27*AX27,IF(AX27<0,AZ27*AX27)))+AV27`,
hidden: true
},
'BB27' : {
val: `55`,
val_noFormat: `55`,
excl_cell: `BB27`,
formula: `BA27-AU27`,
hidden: true
},
'BC27' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC27`,
formula: ``,
hidden: true
},
'BD27' : {
val: `0.9`,
val_noFormat: `0,9`,
excl_cell: `BD27`,
formula: ``,
hidden: true
},
'BE27' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE27`,
formula: ``,
hidden: true
},
'BF27' : {
val: `396`,
val_noFormat: `396`,
excl_cell: `BF27`,
formula: `(T27*BD27*BE27*0.1)+BC27`,
hidden: true
},
'BG27' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG27`,
formula: ``,
hidden: false
},
'A28' : {
val: `Silomais ab Feld*`,
val_noFormat: `Silomais ab Feld*`,
excl_cell: `A28`,
formula: ``,
hidden: false
},
'B28' : {
val: `NEUTRINO`,
val_noFormat: `NEUTRINO`,
excl_cell: `B28`,
formula: ``,
hidden: true
},
'C28' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C28`,
formula: ``,
hidden: false
},
'D28' : {
val: `220`,
val_noFormat: `220`,
excl_cell: `D28`,
formula: `E28*D18`,
hidden: true
},
'E28' : {
val: `2.59`,
val_noFormat: `2,59`,
excl_cell: `E28`,
formula: ``,
hidden: true
},
'F28' : {
val: `125.68540000000002`,
val_noFormat: `125.68540000000002`,
excl_cell: `F28`,
formula: `[2]Düngung!M54*T28/10/0.3*0.2+[2]Düngung!P11`,
hidden: true
},
'G28' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `G28`,
formula: `H28*G18`,
hidden: true
},
'H28' : {
val: `0.91`,
val_noFormat: `0,91`,
excl_cell: `H28`,
formula: ``,
hidden: true
},
'I28' : {
val: `31.1526592721519`,
val_noFormat: `31.1526592721519`,
excl_cell: `I28`,
formula: `(SUM(D28:G28)/4*0.05)+(V28*0.014*1.5)`,
hidden: true
},
'J28' : {
val: `521.7880592721519`,
val_noFormat: `521.7880592721519`,
excl_cell: `J28`,
formula: `SUM(D28,F28,G28,I28)`,
hidden: false
},
'K28' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `K28`,
formula: `L28*K18`,
hidden: true
},
'L28' : {
val: `0.69`,
val_noFormat: `0,69`,
excl_cell: `L28`,
formula: ``,
hidden: true
},
'M28' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `M28`,
formula: `N28*M18`,
hidden: true
},
'N28' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `N28`,
formula: ``,
hidden: true
},
'O28' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `O28`,
formula: `P28*O18`,
hidden: true
},
'P28' : {
val: `0.44`,
val_noFormat: `0,44`,
excl_cell: `P28`,
formula: ``,
hidden: true
},
'Q28' : {
val: `390`,
val_noFormat: `390`,
excl_cell: `Q28`,
formula: `SUM(K28,M28,O28)`,
hidden: false
},
'R28' : {
val: `912.0`,
val_noFormat: `912.0`,
excl_cell: `R28`,
formula: `ROUND(J28+Q28,3-LEN(INT(J28+Q28)))`,
hidden: true
},
'S28' : {
val: `2,64`,
val_noFormat: `2,64`,
excl_cell: `S28`,
formula: `S4/7.11`,
hidden: false
},
'T28' : {
val: `450,0`,
val_noFormat: `450,0`,
excl_cell: `T28`,
formula: `T18*U28*10`,
hidden: false
},
'U28' : {
val: `0.529`,
val_noFormat: `0,529`,
excl_cell: `U28`,
formula: ``,
hidden: false
},
'V28' : {
val: `1.190`,
val_noFormat: `1.190`,
excl_cell: `V28`,
formula: `S28*T28`,
hidden: false
},
'W28' : {
val: ``,
val_noFormat: ``,
excl_cell: `W28`,
formula: ``,
hidden: true
},
'X28' : {
val: `-80`,
val_noFormat: `-80`,
excl_cell: `X28`,
formula: ``,
hidden: false
},
'Y28' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y28`,
formula: ``,
hidden: false
},
'Z28' : {
val: `2.026666666666667`,
val_noFormat: `2.026666666666667`,
excl_cell: `Z28`,
formula: `R28/T28`,
hidden: true
},
'AA28' : {
val: `641.6630592721519`,
val_noFormat: `641.6630592721519`,
excl_cell: `AA28`,
formula: `D28+F28+G28+I28+K28`,
hidden: true
},
'AB28' : {
val: `548.2103584493672`,
val_noFormat: `548.2103584493672`,
excl_cell: `AB28`,
formula: `V28-D28-F28-G28-I28-K28`,
hidden: true
},
'AC28' : {
val: `198.16035844936704`,
val_noFormat: `198.16035844936704`,
excl_cell: `AC28`,
formula: `V28+Y28-J28-Q28+X28`,
hidden: false
},
'AD28' : {
val: `375.3212510850126`,
val_noFormat: `375.3212510850126`,
excl_cell: `AD28`,
formula: `(J28+Q28-X28-Y28)/AG28`,
hidden: true
},
'AE28' : {
val: `2.2`,
val_noFormat: `2.2`,
excl_cell: `AE28`,
formula: `ROUND((J28+Q28-X28-Y28)/T28,3-LEN(INT((J28+Q28-X28-Y28)/T28)))`,
hidden: true
},
'AF28' : {
val: `449.68369635239367`,
val_noFormat: `449.68369635239367`,
excl_cell: `AF28`,
formula: `(AC41+J28+Q28-X28)/S28`,
hidden: false
},
'AG28' : {
val: `2.642304576160338`,
val_noFormat: `2.642304576160338`,
excl_cell: `AG28`,
formula: `(AC41+J28+Q28-X28)/T28`,
hidden: false
},
'AH28' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH28`,
formula: ``,
hidden: true
},
'AI28' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI28`,
formula: ``,
hidden: true
},
'AJ28' : {
val: `1032.0`,
val_noFormat: `1032.0`,
excl_cell: `AJ28`,
formula: `R28+AH28`,
hidden: true
},
'AK28' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK28`,
formula: ``,
hidden: true
},
'AL28' : {
val: `437.873417721519`,
val_noFormat: `437.873417721519`,
excl_cell: `AL28`,
formula: `V28+AK28-AJ28`,
hidden: true
},
'AM28' : {
val: `357.873417721519`,
val_noFormat: `357.873417721519`,
excl_cell: `AM28`,
formula: `AL28-AI28`,
hidden: true
},
'AN28' : {
val: `0.38`,
val_noFormat: `0,38`,
excl_cell: `AN28`,
formula: ``,
hidden: true
},
'AO28' : {
val: `28.0`,
val_noFormat: `28,0`,
excl_cell: `AO28`,
formula: ``,
hidden: true
},
'AP28' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP28`,
formula: ``,
hidden: true
},
'AQ28' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ28`,
formula: ``,
hidden: true
},
'AR28' : {
val: ``,
val_noFormat: ``,
excl_cell: `AR28`,
formula: ``,
hidden: true
},
'AS28' : {
val: ``,
val_noFormat: ``,
excl_cell: `AS28`,
formula: ``,
hidden: true
},
'AT28' : {
val: `171`,
val_noFormat: `171`,
excl_cell: `AT28`,
formula: `AU28+(AR28*T28*AS28)`,
hidden: true
},
'AU28' : {
val: `171`,
val_noFormat: `171`,
excl_cell: `AU28`,
formula: `AN28*T28`,
hidden: true
},
'AV28' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `AV28`,
formula: ``,
hidden: true
},
'AW28' : {
val: `45`,
val_noFormat: `45`,
excl_cell: `AW28`,
formula: ``,
hidden: true
},
'AX28' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `AX28`,
formula: `T28/10-AW28`,
hidden: true
},
'AY28' : {
val: `2.0`,
val_noFormat: `2,0`,
excl_cell: `AY28`,
formula: ``,
hidden: true
},
'AZ28' : {
val: `3.0`,
val_noFormat: `3,0`,
excl_cell: `AZ28`,
formula: ``,
hidden: true
},
'BA28' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `BA28`,
formula: `(IF(AX28>0,AY28*AX28,IF(AX28<0,AZ28*AX28)))+AV28`,
hidden: true
},
'BB28' : {
val: `29`,
val_noFormat: `29`,
excl_cell: `BB28`,
formula: `BA28-AU28`,
hidden: true
},
'BC28' : {
val: `-800`,
val_noFormat: `-800`,
excl_cell: `BC28`,
formula: ``,
hidden: true
},
'BD28' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `BD28`,
formula: ``,
hidden: true
},
'BE28' : {
val: `8`,
val_noFormat: `8`,
excl_cell: `BE28`,
formula: ``,
hidden: true
},
'BF28' : {
val: `-440`,
val_noFormat: `-440`,
excl_cell: `BF28`,
formula: `(T28/10*BD28*BE28)+BC28`,
hidden: true
},
'BG28' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG28`,
formula: ``,
hidden: false
},
'A29' : {
val: `(S-Mais ab Feld o.G.)`,
val_noFormat: `(S-Mais ab Feld o.G.)`,
excl_cell: `A29`,
formula: ``,
hidden: true
},
'B29' : {
val: `NEUTRINO`,
val_noFormat: `NEUTRINO`,
excl_cell: `B29`,
formula: ``,
hidden: true
},
'C29' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C29`,
formula: ``,
hidden: true
},
'D29' : {
val: `220`,
val_noFormat: `220`,
excl_cell: `D29`,
formula: `E29*D18`,
hidden: true
},
'E29' : {
val: `2.59`,
val_noFormat: `2,59`,
excl_cell: `E29`,
formula: ``,
hidden: true
},
'F29' : {
val: `468.427`,
val_noFormat: `468.427`,
excl_cell: `F29`,
formula: `[2]Düngung!M54*T29/10/0.3+[2]Düngung!P11`,
hidden: true
},
'G29' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `G29`,
formula: `H29*G18`,
hidden: true
},
'H29' : {
val: `0.69`,
val_noFormat: `0,69`,
excl_cell: `H29`,
formula: ``,
hidden: true
},
'I29' : {
val: `40.53536069587629`,
val_noFormat: `40.53536069587629`,
excl_cell: `I29`,
formula: `(SUM(D29:G29)/4*0.05)+(V29*0.014*1.5)`,
hidden: true
},
'J29' : {
val: `838.7123606958763`,
val_noFormat: `838.7123606958763`,
excl_cell: `J29`,
formula: `SUM(D29,F29,G29,I29)`,
hidden: true
},
'K29' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `K29`,
formula: `L29*K18`,
hidden: true
},
'L29' : {
val: `0.46`,
val_noFormat: `0,46`,
excl_cell: `L29`,
formula: ``,
hidden: true
},
'M29' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `M29`,
formula: `N29*M18`,
hidden: true
},
'N29' : {
val: `0.67`,
val_noFormat: `0,67`,
excl_cell: `N29`,
formula: ``,
hidden: true
},
'O29' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `O29`,
formula: `P29*O18`,
hidden: true
},
'P29' : {
val: `0.44`,
val_noFormat: `0,44`,
excl_cell: `P29`,
formula: ``,
hidden: true
},
'Q29' : {
val: `299`,
val_noFormat: `299`,
excl_cell: `Q29`,
formula: `SUM(K29,M29,O29)`,
hidden: true
},
'R29' : {
val: `1140.0`,
val_noFormat: `1140.0`,
excl_cell: `R29`,
formula: `ROUND(J29+Q29,3-LEN(INT(J29+Q29)))`,
hidden: true
},
'S29' : {
val: `3,23`,
val_noFormat: `3,23`,
excl_cell: `S29`,
formula: `S4/5.82`,
hidden: true
},
'T29' : {
val: `450,0`,
val_noFormat: `450,0`,
excl_cell: `T29`,
formula: `T18*U29*10`,
hidden: true
},
'U29' : {
val: `0.529`,
val_noFormat: `0,529`,
excl_cell: `U29`,
formula: ``,
hidden: true
},
'V29' : {
val: `1.454`,
val_noFormat: `1.454`,
excl_cell: `V29`,
formula: `S29*T29`,
hidden: true
},
'W29' : {
val: ``,
val_noFormat: ``,
excl_cell: `W29`,
formula: ``,
hidden: true
},
'X29' : {
val: `-120`,
val_noFormat: `-120`,
excl_cell: `X29`,
formula: ``,
hidden: true
},
'Y29' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y29`,
formula: ``,
hidden: true
},
'Z29' : {
val: `2.533333333333333`,
val_noFormat: `2.533333333333333`,
excl_cell: `Z29`,
formula: `R29/T29`,
hidden: true
},
'AA29' : {
val: `918.3373606958763`,
val_noFormat: `918.3373606958763`,
excl_cell: `AA29`,
formula: `D29+F29+G29+I29+K29`,
hidden: true
},
'AB29' : {
val: `535.2708867268041`,
val_noFormat: `535.2708867268041`,
excl_cell: `AB29`,
formula: `V29-D29-F29-G29-I29-K29`,
hidden: true
},
'AC29' : {
val: `195.54588672680416`,
val_noFormat: `195.54588672680416`,
excl_cell: `AC29`,
formula: `V29+Y29-J29-Q29+X29`,
hidden: true
},
'AD29' : {
val: `388.98815984674803`,
val_noFormat: `388.98815984674803`,
excl_cell: `AD29`,
formula: `(J29+Q29-X29-Y29)/AG29`,
hidden: true
},
'AE29' : {
val: `2.8`,
val_noFormat: `2.8`,
excl_cell: `AE29`,
formula: `ROUND((J29+Q29-X29-Y29)/T29,3-LEN(INT((J29+Q29-X29-Y29)/T29)))`,
hidden: true
},
'AF29' : {
val: `450.5504584707446`,
val_noFormat: `450.5504584707446`,
excl_cell: `AF29`,
formula: `(AC41+J29+Q29-X29)/S29`,
hidden: true
},
'AG29' : {
val: `3.2341919126575025`,
val_noFormat: `3.2341919126575025`,
excl_cell: `AG29`,
formula: `(AC41+J29+Q29-X29)/T29`,
hidden: true
},
'AH29' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH29`,
formula: ``,
hidden: true
},
'AI29' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI29`,
formula: ``,
hidden: true
},
'AJ29' : {
val: `1260.0`,
val_noFormat: `1260.0`,
excl_cell: `AJ29`,
formula: `R29+AH29`,
hidden: true
},
'AK29' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK29`,
formula: ``,
hidden: true
},
'AL29' : {
val: `473.6082474226805`,
val_noFormat: `473.6082474226805`,
excl_cell: `AL29`,
formula: `V29+AK29-AJ29`,
hidden: true
},
'AM29' : {
val: `393.6082474226805`,
val_noFormat: `393.6082474226805`,
excl_cell: `AM29`,
formula: `AL29-AI29`,
hidden: true
},
'AN29' : {
val: `0.38`,
val_noFormat: `0,38`,
excl_cell: `AN29`,
formula: ``,
hidden: true
},
'AO29' : {
val: `28.0`,
val_noFormat: `28,0`,
excl_cell: `AO29`,
formula: ``,
hidden: true
},
'AP29' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP29`,
formula: ``,
hidden: true
},
'AQ29' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ29`,
formula: ``,
hidden: true
},
'AR29' : {
val: ``,
val_noFormat: ``,
excl_cell: `AR29`,
formula: ``,
hidden: true
},
'AS29' : {
val: ``,
val_noFormat: ``,
excl_cell: `AS29`,
formula: ``,
hidden: true
},
'AT29' : {
val: `171`,
val_noFormat: `171`,
excl_cell: `AT29`,
formula: `AU29+(AR29*T29*AS29)`,
hidden: true
},
'AU29' : {
val: `171`,
val_noFormat: `171`,
excl_cell: `AU29`,
formula: `AN29*T29`,
hidden: true
},
'AV29' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `AV29`,
formula: ``,
hidden: true
},
'AW29' : {
val: `45`,
val_noFormat: `45`,
excl_cell: `AW29`,
formula: ``,
hidden: true
},
'AX29' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `AX29`,
formula: `T29/10-AW29`,
hidden: true
},
'AY29' : {
val: `2.0`,
val_noFormat: `2,0`,
excl_cell: `AY29`,
formula: ``,
hidden: true
},
'AZ29' : {
val: `3.0`,
val_noFormat: `3,0`,
excl_cell: `AZ29`,
formula: ``,
hidden: true
},
'BA29' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `BA29`,
formula: `(IF(AX29>0,AY29*AX29,IF(AX29<0,AZ29*AX29)))+AV29`,
hidden: true
},
'BB29' : {
val: `29`,
val_noFormat: `29`,
excl_cell: `BB29`,
formula: `BA29-AU29`,
hidden: true
},
'BC29' : {
val: `-800`,
val_noFormat: `-800`,
excl_cell: `BC29`,
formula: ``,
hidden: true
},
'BD29' : {
val: `0.0`,
val_noFormat: `0,0`,
excl_cell: `BD29`,
formula: ``,
hidden: true
},
'BE29' : {
val: `8`,
val_noFormat: `8`,
excl_cell: `BE29`,
formula: ``,
hidden: true
},
'BF29' : {
val: `-800`,
val_noFormat: `-800`,
excl_cell: `BF29`,
formula: `(T29*BD29*BE29)+BC29`,
hidden: true
},
'BG29' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG29`,
formula: ``,
hidden: true
},
'A30' : {
val: `RW-GPS ab Feld*`,
val_noFormat: `RW-GPS ab Feld*`,
excl_cell: `A30`,
formula: ``,
hidden: false
},
'B30' : {
val: `SU PERFORMER`,
val_noFormat: `SU PERFORMER`,
excl_cell: `B30`,
formula: ``,
hidden: true
},
'C30' : {
val: `B`,
val_noFormat: `B`,
excl_cell: `C30`,
formula: ``,
hidden: false
},
'D30' : {
val: `110`,
val_noFormat: `110`,
excl_cell: `D30`,
formula: `E30*D18`,
hidden: true
},
'E30' : {
val: `1.29`,
val_noFormat: `1,29`,
excl_cell: `E30`,
formula: ``,
hidden: true
},
'F30' : {
val: `105.05533657212122`,
val_noFormat: `105.05533657212122`,
excl_cell: `F30`,
formula: `[2]Düngung!M37*T30/10/0.3*0.2+[2]Düngung!P11`,
hidden: true
},
'G30' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `G30`,
formula: `H30*G18`,
hidden: true
},
'H30' : {
val: `0.91`,
val_noFormat: `0,91`,
excl_cell: `H30`,
formula: ``,
hidden: true
},
'I30' : {
val: `25.695541452415007`,
val_noFormat: `25.695541452415007`,
excl_cell: `I30`,
formula: `(SUM(D30:G30)/4*0.05)+(V30*0.014*1.5)`,
hidden: true
},
'J30' : {
val: `385.2008780245362`,
val_noFormat: `385.2008780245362`,
excl_cell: `J30`,
formula: `SUM(D30,F30,G30,I30)`,
hidden: false
},
'K30' : {
val: `130`,
val_noFormat: `130`,
excl_cell: `K30`,
formula: `L30*K18`,
hidden: true
},
'L30' : {
val: `0.74`,
val_noFormat: `0,74`,
excl_cell: `L30`,
formula: ``,
hidden: true
},
'M30' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `M30`,
formula: `N30*M18`,
hidden: true
},
'N30' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `N30`,
formula: ``,
hidden: true
},
'O30' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `O30`,
formula: `P30*O18`,
hidden: true
},
'P30' : {
val: `0.40`,
val_noFormat: `0,40`,
excl_cell: `P30`,
formula: ``,
hidden: true
},
'Q30' : {
val: `385`,
val_noFormat: `385`,
excl_cell: `Q30`,
formula: `SUM(K30,M30,O30)`,
hidden: false
},
'R30' : {
val: `771.0`,
val_noFormat: `771.0`,
excl_cell: `R30`,
formula: `ROUND(J30+Q30,3-LEN(INT(J30+Q30)))`,
hidden: true
},
'S30' : {
val: `2,80`,
val_noFormat: `2,80`,
excl_cell: `S30`,
formula: `S27/5.71`,
hidden: false
},
'T30' : {
val: `360,0`,
val_noFormat: `360,0`,
excl_cell: `T30`,
formula: `T20*0.84*1.6/0.33`,
hidden: false
},
'U30' : {
val: `0.470`,
val_noFormat: `0,470`,
excl_cell: `U30`,
formula: ``,
hidden: false
},
'V30' : {
val: `1.009`,
val_noFormat: `1.009`,
excl_cell: `V30`,
formula: `S30*T30`,
hidden: false
},
'W30' : {
val: ``,
val_noFormat: ``,
excl_cell: `W30`,
formula: ``,
hidden: true
},
'X30' : {
val: `-40`,
val_noFormat: `-40`,
excl_cell: `X30`,
formula: ``,
hidden: false
},
'Y30' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y30`,
formula: ``,
hidden: false
},
'Z30' : {
val: `2.1414936166774403`,
val_noFormat: `2.1414936166774403`,
excl_cell: `Z30`,
formula: `R30/T30`,
hidden: true
},
'AA30' : {
val: `515.5758780245362`,
val_noFormat: `515.5758780245362`,
excl_cell: `AA30`,
formula: `D30+F30+G30+I30+K30`,
hidden: true
},
'AB30' : {
val: `493.2622050832492`,
val_noFormat: `493.2622050832492`,
excl_cell: `AB30`,
formula: `V30-D30-F30-G30-I30-K30`,
hidden: true
},
'AC30' : {
val: `198.1622050832491`,
val_noFormat: `198.1622050832491`,
excl_cell: `AC30`,
formula: `V30+Y30-J30-Q30+X30`,
hidden: false
},
'AD30' : {
val: `289.5505304614713`,
val_noFormat: `289.5505304614713`,
excl_cell: `AD30`,
formula: `(J30+Q30-X30-Y30)/AG30`,
hidden: true
},
'AE30' : {
val: `2.25`,
val_noFormat: `2.25`,
excl_cell: `AE30`,
formula: `ROUND((J30+Q30-X30-Y30)/T30,3-LEN(INT((J30+Q30-X30-Y30)/T30)))`,
hidden: true
},
'AF30' : {
val: `359.72995647000636`,
val_noFormat: `359.72995647000636`,
excl_cell: `AF30`,
formula: `(AC41+J30+Q30-X30)/S30`,
hidden: false
},
'AG30' : {
val: `2.7997734168627533`,
val_noFormat: `2.7997734168627533`,
excl_cell: `AG30`,
formula: `(AC41+J30+Q30-X30)/T30`,
hidden: false
},
'AH30' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH30`,
formula: ``,
hidden: true
},
'AI30' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI30`,
formula: ``,
hidden: true
},
'AJ30' : {
val: `891.0`,
val_noFormat: `891.0`,
excl_cell: `AJ30`,
formula: `R30+AH30`,
hidden: true
},
'AK30' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK30`,
formula: ``,
hidden: true
},
'AL30' : {
val: `397.8380831077852`,
val_noFormat: `397.8380831077852`,
excl_cell: `AL30`,
formula: `V30+AK30-AJ30`,
hidden: true
},
'AM30' : {
val: `317.8380831077852`,
val_noFormat: `317.8380831077852`,
excl_cell: `AM30`,
formula: `AL30-AI30`,
hidden: true
},
'AN30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AN30`,
formula: ``,
hidden: true
},
'AO30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AO30`,
formula: ``,
hidden: true
},
'AP30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP30`,
formula: ``,
hidden: true
},
'AQ30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ30`,
formula: ``,
hidden: true
},
'AR30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AR30`,
formula: ``,
hidden: true
},
'AS30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AS30`,
formula: ``,
hidden: true
},
'AT30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AT30`,
formula: ``,
hidden: true
},
'AU30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AU30`,
formula: ``,
hidden: true
},
'AV30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AV30`,
formula: ``,
hidden: true
},
'AW30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AW30`,
formula: ``,
hidden: true
},
'AX30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AX30`,
formula: ``,
hidden: true
},
'AY30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AY30`,
formula: ``,
hidden: true
},
'AZ30' : {
val: ``,
val_noFormat: ``,
excl_cell: `AZ30`,
formula: ``,
hidden: true
},
'BA30' : {
val: ``,
val_noFormat: ``,
excl_cell: `BA30`,
formula: ``,
hidden: true
},
'BB30' : {
val: ``,
val_noFormat: ``,
excl_cell: `BB30`,
formula: ``,
hidden: true
},
'BC30' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC30`,
formula: ``,
hidden: true
},
'BD30' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `BD30`,
formula: ``,
hidden: true
},
'BE30' : {
val: `8`,
val_noFormat: `8`,
excl_cell: `BE30`,
formula: ``,
hidden: true
},
'BF30' : {
val: `-112`,
val_noFormat: `-112`,
excl_cell: `BF30`,
formula: `(T30/10*BD30*BE30)+BC30`,
hidden: true
},
'BG30' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG30`,
formula: ``,
hidden: false
},
'A31' : {
val: ``,
val_noFormat: ``,
excl_cell: `A31`,
formula: ``,
hidden: true
},
'B31' : {
val: ``,
val_noFormat: ``,
excl_cell: `B31`,
formula: ``,
hidden: true
},
'C31' : {
val: ``,
val_noFormat: ``,
excl_cell: `C31`,
formula: ``,
hidden: true
},
'D31' : {
val: ``,
val_noFormat: ``,
excl_cell: `D31`,
formula: ``,
hidden: true
},
'E31' : {
val: ``,
val_noFormat: ``,
excl_cell: `E31`,
formula: ``,
hidden: true
},
'F31' : {
val: ``,
val_noFormat: ``,
excl_cell: `F31`,
formula: ``,
hidden: true
},
'G31' : {
val: ``,
val_noFormat: ``,
excl_cell: `G31`,
formula: ``,
hidden: true
},
'H31' : {
val: ``,
val_noFormat: ``,
excl_cell: `H31`,
formula: ``,
hidden: true
},
'I31' : {
val: ``,
val_noFormat: ``,
excl_cell: `I31`,
formula: ``,
hidden: true
},
'J31' : {
val: ``,
val_noFormat: ``,
excl_cell: `J31`,
formula: ``,
hidden: true
},
'K31' : {
val: ``,
val_noFormat: ``,
excl_cell: `K31`,
formula: ``,
hidden: true
},
'L31' : {
val: ``,
val_noFormat: ``,
excl_cell: `L31`,
formula: ``,
hidden: true
},
'M31' : {
val: ``,
val_noFormat: ``,
excl_cell: `M31`,
formula: ``,
hidden: true
},
'N31' : {
val: ``,
val_noFormat: ``,
excl_cell: `N31`,
formula: ``,
hidden: true
},
'O31' : {
val: ``,
val_noFormat: ``,
excl_cell: `O31`,
formula: ``,
hidden: true
},
'P31' : {
val: ``,
val_noFormat: ``,
excl_cell: `P31`,
formula: ``,
hidden: true
},
'Q31' : {
val: ``,
val_noFormat: ``,
excl_cell: `Q31`,
formula: ``,
hidden: true
},
'R31' : {
val: ``,
val_noFormat: ``,
excl_cell: `R31`,
formula: ``,
hidden: true
},
'S31' : {
val: ``,
val_noFormat: ``,
excl_cell: `S31`,
formula: ``,
hidden: true
},
'T31' : {
val: ``,
val_noFormat: ``,
excl_cell: `T31`,
formula: ``,
hidden: true
},
'U31' : {
val: ``,
val_noFormat: ``,
excl_cell: `U31`,
formula: ``,
hidden: true
},
'V31' : {
val: ``,
val_noFormat: ``,
excl_cell: `V31`,
formula: ``,
hidden: true
},
'W31' : {
val: ``,
val_noFormat: ``,
excl_cell: `W31`,
formula: ``,
hidden: true
},
'X31' : {
val: ``,
val_noFormat: ``,
excl_cell: `X31`,
formula: ``,
hidden: true
},
'Y31' : {
val: ``,
val_noFormat: ``,
excl_cell: `Y31`,
formula: ``,
hidden: true
},
'Z31' : {
val: ``,
val_noFormat: ``,
excl_cell: `Z31`,
formula: ``,
hidden: true
},
'AA31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AA31`,
formula: ``,
hidden: true
},
'AB31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AB31`,
formula: ``,
hidden: true
},
'AC31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AC31`,
formula: ``,
hidden: true
},
'AD31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AD31`,
formula: ``,
hidden: true
},
'AE31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AE31`,
formula: ``,
hidden: true
},
'AF31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AF31`,
formula: ``,
hidden: true
},
'AG31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AG31`,
formula: ``,
hidden: true
},
'AH31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AH31`,
formula: ``,
hidden: true
},
'AI31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AI31`,
formula: ``,
hidden: true
},
'AJ31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AJ31`,
formula: ``,
hidden: true
},
'AK31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AK31`,
formula: ``,
hidden: true
},
'AL31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AL31`,
formula: ``,
hidden: true
},
'AM31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AM31`,
formula: ``,
hidden: true
},
'AN31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AN31`,
formula: ``,
hidden: true
},
'AO31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AO31`,
formula: ``,
hidden: true
},
'AP31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AP31`,
formula: ``,
hidden: true
},
'AQ31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AQ31`,
formula: ``,
hidden: true
},
'AR31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AR31`,
formula: ``,
hidden: true
},
'AS31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AS31`,
formula: ``,
hidden: true
},
'AT31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AT31`,
formula: ``,
hidden: true
},
'AU31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AU31`,
formula: ``,
hidden: true
},
'AV31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AV31`,
formula: ``,
hidden: true
},
'AW31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AW31`,
formula: ``,
hidden: true
},
'AX31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AX31`,
formula: ``,
hidden: true
},
'AY31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AY31`,
formula: ``,
hidden: true
},
'AZ31' : {
val: ``,
val_noFormat: ``,
excl_cell: `AZ31`,
formula: ``,
hidden: true
},
'BA31' : {
val: ``,
val_noFormat: ``,
excl_cell: `BA31`,
formula: ``,
hidden: true
},
'BB31' : {
val: ``,
val_noFormat: ``,
excl_cell: `BB31`,
formula: ``,
hidden: true
},
'BC31' : {
val: ``,
val_noFormat: ``,
excl_cell: `BC31`,
formula: ``,
hidden: true
},
'BD31' : {
val: ``,
val_noFormat: ``,
excl_cell: `BD31`,
formula: ``,
hidden: true
},
'BE31' : {
val: ``,
val_noFormat: ``,
excl_cell: `BE31`,
formula: ``,
hidden: true
},
'BF31' : {
val: ``,
val_noFormat: ``,
excl_cell: `BF31`,
formula: ``,
hidden: true
},
'BG31' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG31`,
formula: ``,
hidden: true
},
'A32' : {
val: `Wi-Braugerste`,
val_noFormat: `Wi-Braugerste`,
excl_cell: `A32`,
formula: ``,
hidden: false
},
'B32' : {
val: `LYBERAC`,
val_noFormat: `LYBERAC`,
excl_cell: `B32`,
formula: ``,
hidden: true
},
'C32' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C32`,
formula: ``,
hidden: false
},
'D32' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `D32`,
formula: `E32*D18`,
hidden: true
},
'E32' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `E32`,
formula: ``,
hidden: true
},
'F32' : {
val: `195.388976`,
val_noFormat: `195.388976`,
excl_cell: `F32`,
formula: `[2]Düngung!M29*T32+[2]Düngung!P11`,
hidden: true
},
'G32' : {
val: `150`,
val_noFormat: `150`,
excl_cell: `G32`,
formula: `H32*G18`,
hidden: true
},
'H32' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `H32`,
formula: ``,
hidden: true
},
'I32' : {
val: `33.111746200000006`,
val_noFormat: `33.111746200000006`,
excl_cell: `I32`,
formula: `(SUM(D32:G32)/4*0.05)+(V32*0.014*1.5)`,
hidden: true
},
'J32' : {
val: `458.8007222`,
val_noFormat: `458.8007222`,
excl_cell: `J32`,
formula: `SUM(D32,F32,G32,I32)`,
hidden: false
},
'K32' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `K32`,
formula: `L32*K18`,
hidden: true
},
'L32' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `L32`,
formula: ``,
hidden: true
},
'M32' : {
val: `150`,
val_noFormat: `150`,
excl_cell: `M32`,
formula: `N32*M18`,
hidden: true
},
'N32' : {
val: `0.91`,
val_noFormat: `0,91`,
excl_cell: `N32`,
formula: ``,
hidden: true
},
'O32' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O32`,
formula: `P32*O18`,
hidden: true
},
'P32' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P32`,
formula: ``,
hidden: true
},
'Q32' : {
val: `569`,
val_noFormat: `569`,
excl_cell: `Q32`,
formula: `SUM(K32,M32,O32)`,
hidden: false
},
'R32' : {
val: `1030.0`,
val_noFormat: `1030.0`,
excl_cell: `R32`,
formula: `ROUND(J32+Q32,3-LEN(INT(J32+Q32)))`,
hidden: true
},
'S32' : {
val: `19,60`,
val_noFormat: `19,60`,
excl_cell: `S32`,
formula: `S36+2.7`,
hidden: false
},
'T32' : {
val: `67,5`,
val_noFormat: `67,5`,
excl_cell: `T32`,
formula: `T18*U32`,
hidden: false
},
'U32' : {
val: `0.794`,
val_noFormat: `0,794`,
excl_cell: `U32`,
formula: ``,
hidden: false
},
'V32' : {
val: `1.323`,
val_noFormat: `1.323`,
excl_cell: `V32`,
formula: `S32*T32`,
hidden: false
},
'W32' : {
val: ``,
val_noFormat: ``,
excl_cell: `W32`,
formula: ``,
hidden: true
},
'X32' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `X32`,
formula: ``,
hidden: false
},
'Y32' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y32`,
formula: ``,
hidden: false
},
'Z32' : {
val: `15.261520225218549`,
val_noFormat: `15.261520225218549`,
excl_cell: `Z32`,
formula: `R32/T32`,
hidden: true
},
'AA32' : {
val: `628.5507222`,
val_noFormat: `628.5507222`,
excl_cell: `AA32`,
formula: `D32+F32+G32+I32+K32`,
hidden: true
},
'AB32' : {
val: `694.2532778000001`,
val_noFormat: `694.2532778000001`,
excl_cell: `AB32`,
formula: `V32-D32-F32-G32-I32-K32`,
hidden: true
},
'AC32' : {
val: `374.1032778000001`,
val_noFormat: `374.1032778000001`,
excl_cell: `AC32`,
formula: `V32+Y32-J32-Q32+X32`,
hidden: false
},
'AD32' : {
val: `48.40309807142857`,
val_noFormat: `48.40309807142857`,
excl_cell: `AD32`,
formula: `(J32+Q32-X32-Y32)/S32`,
hidden: true
},
'AE32' : {
val: `14.1`,
val_noFormat: `14.1`,
excl_cell: `AE32`,
formula: `ROUND((J32+Q32-X32-Y32)/T32,3-LEN(INT((J32+Q32-X32-Y32)/T32)))`,
hidden: true
},
'AF32' : {
val: `58.470649091836734`,
val_noFormat: `58.470649091836734`,
excl_cell: `AF32`,
formula: `(AC41+J32+Q32-X32)/S32`,
hidden: false
},
'AG32' : {
val: `16.980659685879385`,
val_noFormat: `16.980659685879385`,
excl_cell: `AG32`,
formula: `(AC41+J32+Q32-X32)/T32`,
hidden: false
},
'AH32' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH32`,
formula: ``,
hidden: true
},
'AI32' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI32`,
formula: ``,
hidden: true
},
'AJ32' : {
val: `1150.0`,
val_noFormat: `1150.0`,
excl_cell: `AJ32`,
formula: `R32+AH32`,
hidden: true
},
'AK32' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK32`,
formula: ``,
hidden: true
},
'AL32' : {
val: `452.8040000000001`,
val_noFormat: `452.8040000000001`,
excl_cell: `AL32`,
formula: `V32+AK32-AJ32`,
hidden: true
},
'AM32' : {
val: `372.8040000000001`,
val_noFormat: `372.8040000000001`,
excl_cell: `AM32`,
formula: `AL32-AI32`,
hidden: true
},
'AN32' : {
val: `1,44`,
val_noFormat: `1,44`,
excl_cell: `AN32`,
formula: `AP32/6.25`,
hidden: true
},
'AO32' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO32`,
formula: ``,
hidden: true
},
'AP32' : {
val: `9,03`,
val_noFormat: `9,03`,
excl_cell: `AP32`,
formula: `AQ32*AO32/100`,
hidden: true
},
'AQ32' : {
val: `10.50`,
val_noFormat: `10,50`,
excl_cell: `AQ32`,
formula: ``,
hidden: true
},
'AR32' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR32`,
formula: ``,
hidden: true
},
'AS32' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS32`,
formula: ``,
hidden: true
},
'AT32' : {
val: `125`,
val_noFormat: `125`,
excl_cell: `AT32`,
formula: `AU32+(AR32*T32*AS32)`,
hidden: true
},
'AU32' : {
val: `98`,
val_noFormat: `98`,
excl_cell: `AU32`,
formula: `AN32*T32`,
hidden: true
},
'AV32' : {
val: `180`,
val_noFormat: `180`,
excl_cell: `AV32`,
formula: ``,
hidden: true
},
'AW32' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `AW32`,
formula: ``,
hidden: true
},
'AX32' : {
val: `-3`,
val_noFormat: `-3`,
excl_cell: `AX32`,
formula: `T32-AW32`,
hidden: true
},
'AY32' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY32`,
formula: ``,
hidden: true
},
'AZ32' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ32`,
formula: ``,
hidden: true
},
'BA32' : {
val: `176`,
val_noFormat: `176`,
excl_cell: `BA32`,
formula: `(IF(AX32>0,AY32*AX32,IF(AX32<0,AZ32*AX32)))+AV32`,
hidden: true
},
'BB32' : {
val: `79`,
val_noFormat: `79`,
excl_cell: `BB32`,
formula: `BA32-AU32`,
hidden: true
},
'BC32' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC32`,
formula: ``,
hidden: true
},
'BD32' : {
val: `0.7`,
val_noFormat: `0,7`,
excl_cell: `BD32`,
formula: ``,
hidden: true
},
'BE32' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE32`,
formula: ``,
hidden: true
},
'BF32' : {
val: `72`,
val_noFormat: `72`,
excl_cell: `BF32`,
formula: `(T32*BD32*BE32*0.1)+BC32`,
hidden: true
},
'BG32' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG32`,
formula: ``,
hidden: false
},
'A33' : {
val: `Hybridroggen Eig.verf.`,
val_noFormat: `Hybridroggen Eig.verf.`,
excl_cell: `A33`,
formula: ``,
hidden: false
},
'B33' : {
val: `SU PIANO`,
val_noFormat: `SU PIANO`,
excl_cell: `B33`,
formula: ``,
hidden: true
},
'C33' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C33`,
formula: ``,
hidden: false
},
'D33' : {
val: `115`,
val_noFormat: `115`,
excl_cell: `D33`,
formula: `E33*D18`,
hidden: true
},
'E33' : {
val: `1.35`,
val_noFormat: `1,35`,
excl_cell: `E33`,
formula: ``,
hidden: true
},
'F33' : {
val: `243.184`,
val_noFormat: `243.184`,
excl_cell: `F33`,
formula: `[2]Düngung!M21*T33+[2]Düngung!P11`,
hidden: true
},
'G33' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `G33`,
formula: `H33*G18`,
hidden: true
},
'H33' : {
val: `0.91`,
val_noFormat: `0,91`,
excl_cell: `H33`,
formula: ``,
hidden: true
},
'I33' : {
val: `26.412049999999997`,
val_noFormat: `26.412049999999997`,
excl_cell: `I33`,
formula: `(SUM(D33:G33)/4*0.05)+(V33*0.014*1)`,
hidden: true
},
'J33' : {
val: `529.1460500000001`,
val_noFormat: `529.1460500000001`,
excl_cell: `J33`,
formula: `SUM(D33,F33,G33,I33)`,
hidden: false
},
'K33' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `K33`,
formula: `L33*K18`,
hidden: true
},
'L33' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `L33`,
formula: ``,
hidden: true
},
'M33' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `M33`,
formula: `N33*M18`,
hidden: true
},
'N33' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `N33`,
formula: ``,
hidden: true
},
'O33' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O33`,
formula: `P33*O18`,
hidden: true
},
'P33' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P33`,
formula: ``,
hidden: true
},
'Q33' : {
val: `579`,
val_noFormat: `579`,
excl_cell: `Q33`,
formula: `SUM(K33,M33,O33)`,
hidden: false
},
'R33' : {
val: `1110.0`,
val_noFormat: `1110.0`,
excl_cell: `R33`,
formula: `ROUND(J33+Q33,3-LEN(INT(J33+Q33)))`,
hidden: true
},
'S33' : {
val: `16,90`,
val_noFormat: `16,90`,
excl_cell: `S33`,
formula: `S20`,
hidden: false
},
'T33' : {
val: `85,0`,
val_noFormat: `85,0`,
excl_cell: `T33`,
formula: `T18*U33`,
hidden: false
},
'U33' : {
val: `1.000`,
val_noFormat: `1,000`,
excl_cell: `U33`,
formula: ``,
hidden: false
},
'V33' : {
val: `1.436`,
val_noFormat: `1.436`,
excl_cell: `V33`,
formula: `S33*T33`,
hidden: false
},
'W33' : {
val: ``,
val_noFormat: ``,
excl_cell: `W33`,
formula: ``,
hidden: true
},
'X33' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X33`,
formula: ``,
hidden: false
},
'Y33' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y33`,
formula: ``,
hidden: false
},
'Z33' : {
val: `13.058823529411764`,
val_noFormat: `13.058823529411764`,
excl_cell: `Z33`,
formula: `R33/T33`,
hidden: true
},
'AA33' : {
val: `698.8960500000001`,
val_noFormat: `698.8960500000001`,
excl_cell: `AA33`,
formula: `D33+F33+G33+I33+K33`,
hidden: true
},
'AB33' : {
val: `737.6039499999998`,
val_noFormat: `737.6039499999998`,
excl_cell: `AB33`,
formula: `V33-D33-F33-G33-I33-K33`,
hidden: true
},
'AC33' : {
val: `327.55394999999976`,
val_noFormat: `327.55394999999976`,
excl_cell: `AC33`,
formula: `V33+Y33-J33-Q33+X33`,
hidden: false
},
'AD33' : {
val: `65.61810946745562`,
val_noFormat: `65.61810946745562`,
excl_cell: `AD33`,
formula: `(J33+Q33-X33-Y33)/S33`,
hidden: true
},
'AE33' : {
val: `13.0`,
val_noFormat: `13.0`,
excl_cell: `AE33`,
formula: `ROUND((J33+Q33-X33-Y33)/T33,3-LEN(INT((J33+Q33-X33-Y33)/T33)))`,
hidden: true
},
'AF33' : {
val: `77.29408579881658`,
val_noFormat: `77.29408579881658`,
excl_cell: `AF33`,
formula: `(AC41+J33+Q33-X33)/S33`,
hidden: false
},
'AG33' : {
val: `15.367882941176472`,
val_noFormat: `15.367882941176472`,
excl_cell: `AG33`,
formula: `(AC41+J33+Q33-X33)/T33`,
hidden: false
},
'AH33' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH33`,
formula: ``,
hidden: true
},
'AI33' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI33`,
formula: ``,
hidden: true
},
'AJ33' : {
val: `1230.0`,
val_noFormat: `1230.0`,
excl_cell: `AJ33`,
formula: `R33+AH33`,
hidden: true
},
'AK33' : {
val: `281`,
val_noFormat: `281`,
excl_cell: `AK33`,
formula: ``,
hidden: true
},
'AL33' : {
val: `487.4999999999998`,
val_noFormat: `487.4999999999998`,
excl_cell: `AL33`,
formula: `V33+AK33-AJ33`,
hidden: true
},
'AM33' : {
val: `407.4999999999998`,
val_noFormat: `407.4999999999998`,
excl_cell: `AM33`,
formula: `AL33-AI33`,
hidden: true
},
'AN33' : {
val: `1,51`,
val_noFormat: `1,51`,
excl_cell: `AN33`,
formula: `AP33/6.25`,
hidden: true
},
'AO33' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO33`,
formula: ``,
hidden: true
},
'AP33' : {
val: `9,46`,
val_noFormat: `9,46`,
excl_cell: `AP33`,
formula: `AQ33*AO33/100`,
hidden: true
},
'AQ33' : {
val: `11.00`,
val_noFormat: `11,00`,
excl_cell: `AQ33`,
formula: ``,
hidden: true
},
'AR33' : {
val: `0.90`,
val_noFormat: `0,90`,
excl_cell: `AR33`,
formula: ``,
hidden: true
},
'AS33' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS33`,
formula: ``,
hidden: true
},
'AT33' : {
val: `167`,
val_noFormat: `167`,
excl_cell: `AT33`,
formula: `AU33+(AR33*T33*AS33)`,
hidden: true
},
'AU33' : {
val: `129`,
val_noFormat: `129`,
excl_cell: `AU33`,
formula: `AN33*T33`,
hidden: true
},
'AV33' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `AV33`,
formula: ``,
hidden: true
},
'AW33' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `AW33`,
formula: ``,
hidden: true
},
'AX33' : {
val: `15`,
val_noFormat: `15`,
excl_cell: `AX33`,
formula: `T33-AW33`,
hidden: true
},
'AY33' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY33`,
formula: ``,
hidden: true
},
'AZ33' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ33`,
formula: ``,
hidden: true
},
'BA33' : {
val: `185`,
val_noFormat: `185`,
excl_cell: `BA33`,
formula: `(IF(AX33>0,AY33*AX33,IF(AX33<0,AZ33*AX33)))+AV33`,
hidden: true
},
'BB33' : {
val: `56`,
val_noFormat: `56`,
excl_cell: `BB33`,
formula: `BA33-AU33`,
hidden: true
},
'BC33' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC33`,
formula: ``,
hidden: true
},
'BD33' : {
val: `0.9`,
val_noFormat: `0,9`,
excl_cell: `BD33`,
formula: ``,
hidden: true
},
'BE33' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE33`,
formula: ``,
hidden: true
},
'BF33' : {
val: `365`,
val_noFormat: `365`,
excl_cell: `BF33`,
formula: `(T33*BD33*BE33*0.1)+BC33`,
hidden: true
},
'BG33' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG33`,
formula: ``,
hidden: false
},
'A34' : {
val: `Qualitätshafer`,
val_noFormat: `Qualitätshafer`,
excl_cell: `A34`,
formula: ``,
hidden: false
},
'B34' : {
val: `APOLLON`,
val_noFormat: `APOLLON`,
excl_cell: `B34`,
formula: ``,
hidden: true
},
'C34' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C34`,
formula: ``,
hidden: false
},
'D34' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `D34`,
formula: `E34*D18`,
hidden: true
},
'E34' : {
val: `0.81`,
val_noFormat: `0,81`,
excl_cell: `E34`,
formula: ``,
hidden: true
},
'F34' : {
val: `190.559344`,
val_noFormat: `190.559344`,
excl_cell: `F34`,
formula: `[2]Düngung!M31*T34+[2]Düngung!P11`,
hidden: true
},
'G34' : {
val: `45`,
val_noFormat: `45`,
excl_cell: `G34`,
formula: `H34*G18`,
hidden: true
},
'H34' : {
val: `0.28`,
val_noFormat: `0,28`,
excl_cell: `H34`,
formula: ``,
hidden: true
},
'I34' : {
val: `33.9267274`,
val_noFormat: `33.9267274`,
excl_cell: `I34`,
formula: `(SUM(D34:G34)/4*0.05)+(V34*0.014*2)`,
hidden: true
},
'J34' : {
val: `338.90107140000003`,
val_noFormat: `338.90107140000003`,
excl_cell: `J34`,
formula: `SUM(D34,F34,G34,I34)`,
hidden: false
},
'K34' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `K34`,
formula: `L34*K18`,
hidden: true
},
'L34' : {
val: `0.89`,
val_noFormat: `0,89`,
excl_cell: `L34`,
formula: ``,
hidden: true
},
'M34' : {
val: `135`,
val_noFormat: `135`,
excl_cell: `M34`,
formula: `N34*M18`,
hidden: true
},
'N34' : {
val: `0.82`,
val_noFormat: `0,82`,
excl_cell: `N34`,
formula: ``,
hidden: true
},
'O34' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `O34`,
formula: `P34*O18`,
hidden: true
},
'P34' : {
val: `0.92`,
val_noFormat: `0,92`,
excl_cell: `P34`,
formula: ``,
hidden: true
},
'Q34' : {
val: `520`,
val_noFormat: `520`,
excl_cell: `Q34`,
formula: `SUM(K34,M34,O34)`,
hidden: false
},
'R34' : {
val: `859.0`,
val_noFormat: `859.0`,
excl_cell: `R34`,
formula: `ROUND(J34+Q34,3-LEN(INT(J34+Q34)))`,
hidden: true
},
'S34' : {
val: `17,07`,
val_noFormat: `17,07`,
excl_cell: `S34`,
formula: `S18-0.93`,
hidden: false
},
'T34' : {
val: `63,0`,
val_noFormat: `63,0`,
excl_cell: `T34`,
formula: `T18*U34`,
hidden: false
},
'U34' : {
val: `0.741`,
val_noFormat: `0,741`,
excl_cell: `U34`,
formula: ``,
hidden: false
},
'V34' : {
val: `1.075`,
val_noFormat: `1.075`,
excl_cell: `V34`,
formula: `S34*T34`,
hidden: false
},
'W34' : {
val: ``,
val_noFormat: ``,
excl_cell: `W34`,
formula: ``,
hidden: true
},
'X34' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `X34`,
formula: ``,
hidden: false
},
'Y34' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y34`,
formula: ``,
hidden: false
},
'Z34' : {
val: `13.63816781773438`,
val_noFormat: `13.63816781773438`,
excl_cell: `Z34`,
formula: `R34/T34`,
hidden: true
},
'AA34' : {
val: `493.77607140000003`,
val_noFormat: `493.77607140000003`,
excl_cell: `AA34`,
formula: `D34+F34+G34+I34+K34`,
hidden: true
},
'AB34' : {
val: `581.3778785999999`,
val_noFormat: `581.3778785999999`,
excl_cell: `AB34`,
formula: `V34-D34-F34-G34-I34-K34`,
hidden: true
},
'AC34' : {
val: `296.07787859999985`,
val_noFormat: `296.07787859999985`,
excl_cell: `AC34`,
formula: `V34+Y34-J34-Q34+X34`,
hidden: false
},
'AD34' : {
val: `45.64007448154658`,
val_noFormat: `45.64007448154658`,
excl_cell: `AD34`,
formula: `(J34+Q34-X34-Y34)/S34`,
hidden: true
},
'AE34' : {
val: `12.4`,
val_noFormat: `12.4`,
excl_cell: `AE34`,
formula: `ROUND((J34+Q34-X34-Y34)/T34,3-LEN(INT((J34+Q34-X34-Y34)/T34)))`,
hidden: true
},
'AF34' : {
val: `57.199769853544225`,
val_noFormat: `57.199769853544225`,
excl_cell: `AF34`,
formula: `(AC41+J34+Q34-X34)/S34`,
hidden: false
},
'AG34' : {
val: `15.502104809081526`,
val_noFormat: `15.502104809081526`,
excl_cell: `AG34`,
formula: `(AC41+J34+Q34-X34)/T34`,
hidden: false
},
'AH34' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH34`,
formula: ``,
hidden: true
},
'AI34' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI34`,
formula: ``,
hidden: true
},
'AJ34' : {
val: `979.0`,
val_noFormat: `979.0`,
excl_cell: `AJ34`,
formula: `R34+AH34`,
hidden: true
},
'AK34' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK34`,
formula: ``,
hidden: true
},
'AL34' : {
val: `376.1539499999999`,
val_noFormat: `376.1539499999999`,
excl_cell: `AL34`,
formula: `V34+AK34-AJ34`,
hidden: true
},
'AM34' : {
val: `296.1539499999999`,
val_noFormat: `296.1539499999999`,
excl_cell: `AM34`,
formula: `AL34-AI34`,
hidden: true
},
'AN34' : {
val: `1,58`,
val_noFormat: `1,58`,
excl_cell: `AN34`,
formula: `AP34/6.25`,
hidden: true
},
'AO34' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO34`,
formula: ``,
hidden: true
},
'AP34' : {
val: `9,89`,
val_noFormat: `9,89`,
excl_cell: `AP34`,
formula: `AQ34*AO34/100`,
hidden: true
},
'AQ34' : {
val: `11.50`,
val_noFormat: `11,50`,
excl_cell: `AQ34`,
formula: ``,
hidden: true
},
'AR34' : {
val: `1.10`,
val_noFormat: `1,10`,
excl_cell: `AR34`,
formula: ``,
hidden: true
},
'AS34' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS34`,
formula: ``,
hidden: true
},
'AT34' : {
val: `134`,
val_noFormat: `134`,
excl_cell: `AT34`,
formula: `AU34+(AR34*T34*AS34)`,
hidden: true
},
'AU34' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `AU34`,
formula: `AN34*T34`,
hidden: true
},
'AV34' : {
val: `130`,
val_noFormat: `130`,
excl_cell: `AV34`,
formula: ``,
hidden: true
},
'AW34' : {
val: `55`,
val_noFormat: `55`,
excl_cell: `AW34`,
formula: ``,
hidden: true
},
'AX34' : {
val: `8`,
val_noFormat: `8`,
excl_cell: `AX34`,
formula: `T34-AW34`,
hidden: true
},
'AY34' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY34`,
formula: ``,
hidden: true
},
'AZ34' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ34`,
formula: ``,
hidden: true
},
'BA34' : {
val: `138`,
val_noFormat: `138`,
excl_cell: `BA34`,
formula: `(IF(AX34>0,AY34*AX34,IF(AX34<0,AZ34*AX34)))+AV34`,
hidden: true
},
'BB34' : {
val: `38`,
val_noFormat: `38`,
excl_cell: `BB34`,
formula: `BA34-AU34`,
hidden: true
},
'BC34' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC34`,
formula: ``,
hidden: true
},
'BD34' : {
val: `1.1`,
val_noFormat: `1,1`,
excl_cell: `BD34`,
formula: ``,
hidden: true
},
'BE34' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE34`,
formula: ``,
hidden: true
},
'BF34' : {
val: `293`,
val_noFormat: `293`,
excl_cell: `BF34`,
formula: `(T34*BD34*BE34*0.1)+BC34`,
hidden: true
},
'BG34' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG34`,
formula: ``,
hidden: false
},
'A35' : {
val: `Qualitätshafer akt.*`,
val_noFormat: `Qualitätshafer akt.*`,
excl_cell: `A35`,
formula: ``,
hidden: false
},
'B35' : {
val: `LION`,
val_noFormat: `LION`,
excl_cell: `B35`,
formula: ``,
hidden: true
},
'C35' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C35`,
formula: ``,
hidden: false
},
'D35' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `D35`,
formula: `E35*D18`,
hidden: true
},
'E35' : {
val: `0.81`,
val_noFormat: `0,81`,
excl_cell: `E35`,
formula: ``,
hidden: true
},
'F35' : {
val: `190.559344`,
val_noFormat: `190.559344`,
excl_cell: `F35`,
formula: `[2]Düngung!M31*T34+[2]Düngung!P11`,
hidden: true
},
'G35' : {
val: `45`,
val_noFormat: `45`,
excl_cell: `G35`,
formula: `H35*G18`,
hidden: true
},
'H35' : {
val: `0.28`,
val_noFormat: `0,28`,
excl_cell: `H35`,
formula: ``,
hidden: true
},
'I35' : {
val: `35.566856800000004`,
val_noFormat: `35.566856800000004`,
excl_cell: `I35`,
formula: `(SUM(D35:G35)/4*0.05)+(V35*0.014*2)`,
hidden: true
},
'J35' : {
val: `340.5412008`,
val_noFormat: `340.5412008`,
excl_cell: `J35`,
formula: `SUM(D35,F35,G35,I35)`,
hidden: false
},
'K35' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `K35`,
formula: `L35*K18`,
hidden: true
},
'L35' : {
val: `0.89`,
val_noFormat: `0,89`,
excl_cell: `L35`,
formula: ``,
hidden: true
},
'M35' : {
val: `135`,
val_noFormat: `135`,
excl_cell: `M35`,
formula: `N35*M18`,
hidden: true
},
'N35' : {
val: `0.82`,
val_noFormat: `0,82`,
excl_cell: `N35`,
formula: ``,
hidden: true
},
'O35' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `O35`,
formula: `P35*O18`,
hidden: true
},
'P35' : {
val: `0.92`,
val_noFormat: `0,92`,
excl_cell: `P35`,
formula: ``,
hidden: true
},
'Q35' : {
val: `520`,
val_noFormat: `520`,
excl_cell: `Q35`,
formula: `SUM(K35,M35,O35)`,
hidden: false
},
'R35' : {
val: `861.0`,
val_noFormat: `861.0`,
excl_cell: `R35`,
formula: `ROUND(J35+Q35,3-LEN(INT(J35+Q35)))`,
hidden: true
},
'S35' : {
val: `18,00`,
val_noFormat: `18,00`,
excl_cell: `S35`,
formula: `S18`,
hidden: false
},
'T35' : {
val: `63,0`,
val_noFormat: `63,0`,
excl_cell: `T35`,
formula: `T18*U35`,
hidden: false
},
'U35' : {
val: `0.741`,
val_noFormat: `0,741`,
excl_cell: `U35`,
formula: ``,
hidden: false
},
'V35' : {
val: `1.134`,
val_noFormat: `1.134`,
excl_cell: `V35`,
formula: `S35*T35`,
hidden: false
},
'W35' : {
val: ``,
val_noFormat: ``,
excl_cell: `W35`,
formula: ``,
hidden: true
},
'X35' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `X35`,
formula: ``,
hidden: false
},
'Y35' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y35`,
formula: ``,
hidden: false
},
'Z35' : {
val: `13.66992140985949`,
val_noFormat: `13.66992140985949`,
excl_cell: `Z35`,
formula: `R35/T35`,
hidden: true
},
'AA35' : {
val: `495.4162008`,
val_noFormat: `495.4162008`,
excl_cell: `AA35`,
formula: `D35+F35+G35+I35+K35`,
hidden: true
},
'AB35' : {
val: `638.3137992000001`,
val_noFormat: `638.3137992000001`,
excl_cell: `AB35`,
formula: `V35-D35-F35-G35-I35-K35`,
hidden: true
},
'AC35' : {
val: `353.0137992`,
val_noFormat: `353.0137992`,
excl_cell: `AC35`,
formula: `V35+Y35-J35-Q35+X35`,
hidden: false
},
'AD35' : {
val: `43.37312226666667`,
val_noFormat: `43.37312226666667`,
excl_cell: `AD35`,
formula: `(J35+Q35-X35-Y35)/S35`,
hidden: true
},
'AE35' : {
val: `12.4`,
val_noFormat: `12.4`,
excl_cell: `AE35`,
formula: `ROUND((J35+Q35-X35-Y35)/T35,3-LEN(INT((J35+Q35-X35-Y35)/T35)))`,
hidden: true
},
'AF35' : {
val: `54.335566711111106`,
val_noFormat: `54.335566711111106`,
excl_cell: `AF35`,
formula: `(AC41+J35+Q35-X35)/S35`,
hidden: false
},
'AG35' : {
val: `15.528144809081525`,
val_noFormat: `15.528144809081525`,
excl_cell: `AG35`,
formula: `(AC41+J35+Q35-X35)/T35`,
hidden: false
},
'AH35' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH35`,
formula: ``,
hidden: true
},
'AI35' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI35`,
formula: ``,
hidden: true
},
'AJ35' : {
val: `981.0`,
val_noFormat: `981.0`,
excl_cell: `AJ35`,
formula: `R35+AH35`,
hidden: true
},
'AK35' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK35`,
formula: ``,
hidden: true
},
'AL35' : {
val: `432.73`,
val_noFormat: `432.73`,
excl_cell: `AL35`,
formula: `V35+AK35-AJ35`,
hidden: true
},
'AM35' : {
val: `352.73`,
val_noFormat: `352.73`,
excl_cell: `AM35`,
formula: `AL35-AI35`,
hidden: true
},
'AN35' : {
val: `1,58`,
val_noFormat: `1,58`,
excl_cell: `AN35`,
formula: `AP35/6.25`,
hidden: true
},
'AO35' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO35`,
formula: ``,
hidden: true
},
'AP35' : {
val: `9,89`,
val_noFormat: `9,89`,
excl_cell: `AP35`,
formula: `AQ35*AO35/100`,
hidden: true
},
'AQ35' : {
val: `11.50`,
val_noFormat: `11,50`,
excl_cell: `AQ35`,
formula: ``,
hidden: true
},
'AR35' : {
val: `1.10`,
val_noFormat: `1,10`,
excl_cell: `AR35`,
formula: ``,
hidden: true
},
'AS35' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS35`,
formula: ``,
hidden: true
},
'AT35' : {
val: `134`,
val_noFormat: `134`,
excl_cell: `AT35`,
formula: `AU35+(AR35*T35*AS35)`,
hidden: true
},
'AU35' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `AU35`,
formula: `AN35*T35`,
hidden: true
},
'AV35' : {
val: `130`,
val_noFormat: `130`,
excl_cell: `AV35`,
formula: ``,
hidden: true
},
'AW35' : {
val: `55`,
val_noFormat: `55`,
excl_cell: `AW35`,
formula: ``,
hidden: true
},
'AX35' : {
val: `8`,
val_noFormat: `8`,
excl_cell: `AX35`,
formula: `T35-AW35`,
hidden: true
},
'AY35' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY35`,
formula: ``,
hidden: true
},
'AZ35' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ35`,
formula: ``,
hidden: true
},
'BA35' : {
val: `138`,
val_noFormat: `138`,
excl_cell: `BA35`,
formula: `(IF(AX35>0,AY35*AX35,IF(AX35<0,AZ35*AX35)))+AV35`,
hidden: true
},
'BB35' : {
val: `38`,
val_noFormat: `38`,
excl_cell: `BB35`,
formula: `BA35-AU35`,
hidden: true
},
'BC35' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC35`,
formula: ``,
hidden: true
},
'BD35' : {
val: `1.1`,
val_noFormat: `1,1`,
excl_cell: `BD35`,
formula: ``,
hidden: true
},
'BE35' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE35`,
formula: ``,
hidden: true
},
'BF35' : {
val: `293`,
val_noFormat: `293`,
excl_cell: `BF35`,
formula: `(T35*BD35*BE35*0.1)+BC35`,
hidden: true
},
'BG35' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG35`,
formula: ``,
hidden: false
},
'A36' : {
val: `Wintergerste`,
val_noFormat: `Wintergerste`,
excl_cell: `A36`,
formula: ``,
hidden: false
},
'B36' : {
val: `SU JULE`,
val_noFormat: `SU JULE`,
excl_cell: `B36`,
formula: ``,
hidden: true
},
'C36' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C36`,
formula: ``,
hidden: false
},
'D36' : {
val: `74`,
val_noFormat: `74`,
excl_cell: `D36`,
formula: `E36*D18`,
hidden: true
},
'E36' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `E36`,
formula: ``,
hidden: true
},
'F36' : {
val: `227.68`,
val_noFormat: `227.68`,
excl_cell: `F36`,
formula: `[2]Düngung!M25*T36+[2]Düngung!P11`,
hidden: true
},
'G36' : {
val: `150`,
val_noFormat: `150`,
excl_cell: `G36`,
formula: `H36*G18`,
hidden: true
},
'H36' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `H36`,
formula: ``,
hidden: true
},
'I36' : {
val: `32.289500000000004`,
val_noFormat: `32.289500000000004`,
excl_cell: `I36`,
formula: `(SUM(D36:G36)/4*0.05)+(V36*0.014*1.5)`,
hidden: true
},
'J36' : {
val: `485.16949999999997`,
val_noFormat: `485.16949999999997`,
excl_cell: `J36`,
formula: `SUM(D36,F36,G36,I36)`,
hidden: false
},
'K36' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `K36`,
formula: `L36*K18`,
hidden: true
},
'L36' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `L36`,
formula: ``,
hidden: true
},
'M36' : {
val: `150`,
val_noFormat: `150`,
excl_cell: `M36`,
formula: `N36*M18`,
hidden: true
},
'N36' : {
val: `0.91`,
val_noFormat: `0,91`,
excl_cell: `N36`,
formula: ``,
hidden: true
},
'O36' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O36`,
formula: `P36*O18`,
hidden: true
},
'P36' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P36`,
formula: ``,
hidden: true
},
'Q36' : {
val: `569`,
val_noFormat: `569`,
excl_cell: `Q36`,
formula: `SUM(K36,M36,O36)`,
hidden: false
},
'R36' : {
val: `1060.0`,
val_noFormat: `1060.0`,
excl_cell: `R36`,
formula: `ROUND(J36+Q36,3-LEN(INT(J36+Q36)))`,
hidden: true
},
'S36' : {
val: `16,90`,
val_noFormat: `16,90`,
excl_cell: `S36`,
formula: `S18-1.1`,
hidden: false
},
'T36' : {
val: `75,0`,
val_noFormat: `75,0`,
excl_cell: `T36`,
formula: `T18*U36`,
hidden: false
},
'U36' : {
val: `0.882`,
val_noFormat: `0,882`,
excl_cell: `U36`,
formula: ``,
hidden: false
},
'V36' : {
val: `1.268`,
val_noFormat: `1.268`,
excl_cell: `V36`,
formula: `S36*T36`,
hidden: false
},
'W36' : {
val: ``,
val_noFormat: ``,
excl_cell: `W36`,
formula: ``,
hidden: true
},
'X36' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `X36`,
formula: ``,
hidden: false
},
'Y36' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y36`,
formula: ``,
hidden: false
},
'Z36' : {
val: `14.133333333333333`,
val_noFormat: `14.133333333333333`,
excl_cell: `Z36`,
formula: `R36/T36`,
hidden: true
},
'AA36' : {
val: `654.9195`,
val_noFormat: `654.9195`,
excl_cell: `AA36`,
formula: `D36+F36+G36+I36+K36`,
hidden: true
},
'AB36' : {
val: `612.5805`,
val_noFormat: `612.5805`,
excl_cell: `AB36`,
formula: `V36-D36-F36-G36-I36-K36`,
hidden: true
},
'AC36' : {
val: `292.43050000000005`,
val_noFormat: `292.43050000000005`,
excl_cell: `AC36`,
formula: `V36+Y36-J36-Q36+X36`,
hidden: false
},
'AD36' : {
val: `57.696420118343205`,
val_noFormat: `57.696420118343205`,
excl_cell: `AD36`,
formula: `(J36+Q36-X36-Y36)/S36`,
hidden: true
},
'AE36' : {
val: `13.0`,
val_noFormat: `13.0`,
excl_cell: `AE36`,
formula: `ROUND((J36+Q36-X36-Y36)/T36,3-LEN(INT((J36+Q36-X36-Y36)/T36)))`,
hidden: true
},
'AF36' : {
val: `69.37239644970414`,
val_noFormat: `69.37239644970414`,
excl_cell: `AF36`,
formula: `(AC41+J36+Q36-X36)/S36`,
hidden: false
},
'AG36' : {
val: `15.631913333333332`,
val_noFormat: `15.631913333333332`,
excl_cell: `AG36`,
formula: `(AC41+J36+Q36-X36)/T36`,
hidden: false
},
'AH36' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH36`,
formula: ``,
hidden: true
},
'AI36' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI36`,
formula: ``,
hidden: true
},
'AJ36' : {
val: `1180.0`,
val_noFormat: `1180.0`,
excl_cell: `AJ36`,
formula: `R36+AH36`,
hidden: true
},
'AK36' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK36`,
formula: ``,
hidden: true
},
'AL36' : {
val: `367.5`,
val_noFormat: `367.5`,
excl_cell: `AL36`,
formula: `V36+AK36-AJ36`,
hidden: true
},
'AM36' : {
val: `287.5`,
val_noFormat: `287.5`,
excl_cell: `AM36`,
formula: `AL36-AI36`,
hidden: true
},
'AN36' : {
val: `1,65`,
val_noFormat: `1,65`,
excl_cell: `AN36`,
formula: `AP36/6.25`,
hidden: true
},
'AO36' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO36`,
formula: ``,
hidden: true
},
'AP36' : {
val: `10,32`,
val_noFormat: `10,32`,
excl_cell: `AP36`,
formula: `AQ36*AO36/100`,
hidden: true
},
'AQ36' : {
val: `12.00`,
val_noFormat: `12,00`,
excl_cell: `AQ36`,
formula: ``,
hidden: true
},
'AR36' : {
val: `0.70`,
val_noFormat: `0,70`,
excl_cell: `AR36`,
formula: ``,
hidden: true
},
'AS36' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS36`,
formula: ``,
hidden: true
},
'AT36' : {
val: `150`,
val_noFormat: `150`,
excl_cell: `AT36`,
formula: `AU36+(AR36*T36*AS36)`,
hidden: true
},
'AU36' : {
val: `124`,
val_noFormat: `124`,
excl_cell: `AU36`,
formula: `AN36*T36`,
hidden: true
},
'AV36' : {
val: `180`,
val_noFormat: `180`,
excl_cell: `AV36`,
formula: ``,
hidden: true
},
'AW36' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `AW36`,
formula: ``,
hidden: true
},
'AX36' : {
val: `5`,
val_noFormat: `5`,
excl_cell: `AX36`,
formula: `T36-AW36`,
hidden: true
},
'AY36' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY36`,
formula: ``,
hidden: true
},
'AZ36' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ36`,
formula: ``,
hidden: true
},
'BA36' : {
val: `185`,
val_noFormat: `185`,
excl_cell: `BA36`,
formula: `(IF(AX36>0,AY36*AX36,IF(AX36<0,AZ36*AX36)))+AV36`,
hidden: true
},
'BB36' : {
val: `61`,
val_noFormat: `61`,
excl_cell: `BB36`,
formula: `BA36-AU36`,
hidden: true
},
'BC36' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC36`,
formula: ``,
hidden: true
},
'BD36' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD36`,
formula: ``,
hidden: true
},
'BE36' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE36`,
formula: ``,
hidden: true
},
'BF36' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `BF36`,
formula: `(T36*BD36*BE36*0.1)+BC36`,
hidden: true
},
'BG36' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG36`,
formula: ``,
hidden: false
},
'A37' : {
val: `So-Braugerste`,
val_noFormat: `So-Braugerste`,
excl_cell: `A37`,
formula: ``,
hidden: false
},
'B37' : {
val: `ACCORDINE`,
val_noFormat: `ACCORDINE`,
excl_cell: `B37`,
formula: ``,
hidden: true
},
'C37' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C37`,
formula: ``,
hidden: false
},
'D37' : {
val: `90`,
val_noFormat: `90`,
excl_cell: `D37`,
formula: `E37*D18`,
hidden: true
},
'E37' : {
val: `1.06`,
val_noFormat: `1,06`,
excl_cell: `E37`,
formula: ``,
hidden: true
},
'F37' : {
val: `166.62048800000002`,
val_noFormat: `166.62048800000002`,
excl_cell: `F37`,
formula: `[2]Düngung!M29*T37+[2]Düngung!P11`,
hidden: true
},
'G37' : {
val: `95`,
val_noFormat: `95`,
excl_cell: `G37`,
formula: `H37*G18`,
hidden: true
},
'H37' : {
val: `0.59`,
val_noFormat: `0,59`,
excl_cell: `H37`,
formula: ``,
hidden: true
},
'I37' : {
val: `28.6650511`,
val_noFormat: `28.6650511`,
excl_cell: `I37`,
formula: `(SUM(D37:G37)/4*0.05)+(V37*0.014*1.5)`,
hidden: true
},
'J37' : {
val: `380.5855391`,
val_noFormat: `380.5855391`,
excl_cell: `J37`,
formula: `SUM(D37,F37,G37,I37)`,
hidden: false
},
'K37' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `K37`,
formula: `L37*K18`,
hidden: true
},
'L37' : {
val: `0.92`,
val_noFormat: `0,92`,
excl_cell: `L37`,
formula: ``,
hidden: true
},
'M37' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `M37`,
formula: `N37*M18`,
hidden: true
},
'N37' : {
val: `0.88`,
val_noFormat: `0,88`,
excl_cell: `N37`,
formula: ``,
hidden: true
},
'O37' : {
val: `235`,
val_noFormat: `235`,
excl_cell: `O37`,
formula: `P37*O18`,
hidden: true
},
'P37' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `P37`,
formula: ``,
hidden: true
},
'Q37' : {
val: `540`,
val_noFormat: `540`,
excl_cell: `Q37`,
formula: `SUM(K37,M37,O37)`,
hidden: false
},
'R37' : {
val: `921.0`,
val_noFormat: `921.0`,
excl_cell: `R37`,
formula: `ROUND(J37+Q37,3-LEN(INT(J37+Q37)))`,
hidden: true
},
'S37' : {
val: `21,00`,
val_noFormat: `21,00`,
excl_cell: `S37`,
formula: `S18+3`,
hidden: false
},
'T37' : {
val: `55,0`,
val_noFormat: `55,0`,
excl_cell: `T37`,
formula: `T18*U37`,
hidden: false
},
'U37' : {
val: `0.647`,
val_noFormat: `0,647`,
excl_cell: `U37`,
formula: ``,
hidden: false
},
'V37' : {
val: `1.155`,
val_noFormat: `1.155`,
excl_cell: `V37`,
formula: `S37*T37`,
hidden: false
},
'W37' : {
val: ``,
val_noFormat: ``,
excl_cell: `W37`,
formula: ``,
hidden: true
},
'X37' : {
val: `40`,
val_noFormat: `40`,
excl_cell: `X37`,
formula: ``,
hidden: false
},
'Y37' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y37`,
formula: ``,
hidden: false
},
'Z37' : {
val: `16.7469769979089`,
val_noFormat: `16.7469769979089`,
excl_cell: `Z37`,
formula: `R37/T37`,
hidden: true
},
'AA37' : {
val: `540.7105391`,
val_noFormat: `540.7105391`,
excl_cell: `AA37`,
formula: `D37+F37+G37+I37+K37`,
hidden: true
},
'AB37' : {
val: `614.1844609`,
val_noFormat: `614.1844609`,
excl_cell: `AB37`,
formula: `V37-D37-F37-G37-I37-K37`,
hidden: true
},
'AC37' : {
val: `273.98446089999993`,
val_noFormat: `273.98446089999993`,
excl_cell: `AC37`,
formula: `V37+Y37-J37-Q37+X37`,
hidden: false
},
'AD37' : {
val: `41.94812090952381`,
val_noFormat: `41.94812090952381`,
excl_cell: `AD37`,
formula: `(J37+Q37-X37-Y37)/S37`,
hidden: true
},
'AE37' : {
val: `16.0`,
val_noFormat: `16.0`,
excl_cell: `AE37`,
formula: `ROUND((J37+Q37-X37-Y37)/T37,3-LEN(INT((J37+Q37-X37-Y37)/T37)))`,
hidden: true
},
'AF37' : {
val: `51.34450186190476`,
val_noFormat: `51.34450186190476`,
excl_cell: `AF37`,
formula: `(AC41+J37+Q37-X37)/S37`,
hidden: false
},
'AG37' : {
val: `19.60604671515592`,
val_noFormat: `19.60604671515592`,
excl_cell: `AG37`,
formula: `(AC41+J37+Q37-X37)/T37`,
hidden: false
},
'AH37' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH37`,
formula: ``,
hidden: true
},
'AI37' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI37`,
formula: ``,
hidden: true
},
'AJ37' : {
val: `1041.0`,
val_noFormat: `1041.0`,
excl_cell: `AJ37`,
formula: `R37+AH37`,
hidden: true
},
'AK37' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK37`,
formula: ``,
hidden: true
},
'AL37' : {
val: `393.895`,
val_noFormat: `393.895`,
excl_cell: `AL37`,
formula: `V37+AK37-AJ37`,
hidden: true
},
'AM37' : {
val: `313.895`,
val_noFormat: `313.895`,
excl_cell: `AM37`,
formula: `AL37-AI37`,
hidden: true
},
'AN37' : {
val: `1,44`,
val_noFormat: `1,44`,
excl_cell: `AN37`,
formula: `AP37/6.25`,
hidden: true
},
'AO37' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO37`,
formula: ``,
hidden: true
},
'AP37' : {
val: `9,03`,
val_noFormat: `9,03`,
excl_cell: `AP37`,
formula: `AQ37*AO37/100`,
hidden: true
},
'AQ37' : {
val: `10.50`,
val_noFormat: `10,50`,
excl_cell: `AQ37`,
formula: ``,
hidden: true
},
'AR37' : {
val: `0.70`,
val_noFormat: `0,70`,
excl_cell: `AR37`,
formula: ``,
hidden: true
},
'AS37' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS37`,
formula: ``,
hidden: true
},
'AT37' : {
val: `99`,
val_noFormat: `99`,
excl_cell: `AT37`,
formula: `AU37+(AR37*T37*AS37)`,
hidden: true
},
'AU37' : {
val: `79`,
val_noFormat: `79`,
excl_cell: `AU37`,
formula: `AN37*T37`,
hidden: true
},
'AV37' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `AV37`,
formula: ``,
hidden: true
},
'AW37' : {
val: `50`,
val_noFormat: `50`,
excl_cell: `AW37`,
formula: ``,
hidden: true
},
'AX37' : {
val: `5`,
val_noFormat: `5`,
excl_cell: `AX37`,
formula: `T37-AW37`,
hidden: true
},
'AY37' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY37`,
formula: ``,
hidden: true
},
'AZ37' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ37`,
formula: ``,
hidden: true
},
'BA37' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `BA37`,
formula: `(IF(AX37>0,AY37*AX37,IF(AX37<0,AZ37*AX37)))+AV37`,
hidden: true
},
'BB37' : {
val: `66`,
val_noFormat: `66`,
excl_cell: `BB37`,
formula: `BA37-AU37`,
hidden: true
},
'BC37' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC37`,
formula: ``,
hidden: true
},
'BD37' : {
val: `0.7`,
val_noFormat: `0,7`,
excl_cell: `BD37`,
formula: ``,
hidden: true
},
'BE37' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE37`,
formula: ``,
hidden: true
},
'BF37' : {
val: `-15`,
val_noFormat: `-15`,
excl_cell: `BF37`,
formula: `(T37*BD37*BE37*0.1)+BC37`,
hidden: true
},
'BG37' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG37`,
formula: ``,
hidden: false
},
'A38' : {
val: `Hybridroggen`,
val_noFormat: `Hybridroggen`,
excl_cell: `A38`,
formula: ``,
hidden: false
},
'B38' : {
val: `SU PERFORMER`,
val_noFormat: `SU PERFORMER`,
excl_cell: `B38`,
formula: ``,
hidden: true
},
'C38' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C38`,
formula: ``,
hidden: false
},
'D38' : {
val: `115`,
val_noFormat: `115`,
excl_cell: `D38`,
formula: `E38*D18`,
hidden: true
},
'E38' : {
val: `1.35`,
val_noFormat: `1,35`,
excl_cell: `E38`,
formula: ``,
hidden: true
},
'F38' : {
val: `243.184`,
val_noFormat: `243.184`,
excl_cell: `F38`,
formula: `[2]Düngung!M21*T38+[2]Düngung!P11`,
hidden: true
},
'G38' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `G38`,
formula: `H38*G18`,
hidden: true
},
'H38' : {
val: `0.91`,
val_noFormat: `0,91`,
excl_cell: `H38`,
formula: ``,
hidden: true
},
'I38' : {
val: `25.34105`,
val_noFormat: `25.34105`,
excl_cell: `I38`,
formula: `(SUM(D38:G38)/4*0.05)+(V38*0.014*1)`,
hidden: true
},
'J38' : {
val: `528.07505`,
val_noFormat: `528.07505`,
excl_cell: `J38`,
formula: `SUM(D38,F38,G38,I38)`,
hidden: false
},
'K38' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `K38`,
formula: `L38*K18`,
hidden: true
},
'L38' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `L38`,
formula: ``,
hidden: true
},
'M38' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `M38`,
formula: `N38*M18`,
hidden: true
},
'N38' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `N38`,
formula: ``,
hidden: true
},
'O38' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O38`,
formula: `P38*O18`,
hidden: true
},
'P38' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P38`,
formula: ``,
hidden: true
},
'Q38' : {
val: `579`,
val_noFormat: `579`,
excl_cell: `Q38`,
formula: `SUM(K38,M38,O38)`,
hidden: false
},
'R38' : {
val: `1110.0`,
val_noFormat: `1110.0`,
excl_cell: `R38`,
formula: `ROUND(J38+Q38,3-LEN(INT(J38+Q38)))`,
hidden: true
},
'S38' : {
val: `16,00`,
val_noFormat: `16,00`,
excl_cell: `S38`,
formula: `S27`,
hidden: false
},
'T38' : {
val: `85,0`,
val_noFormat: `85,0`,
excl_cell: `T38`,
formula: `T18*U38`,
hidden: false
},
'U38' : {
val: `1.000`,
val_noFormat: `1,000`,
excl_cell: `U38`,
formula: ``,
hidden: false
},
'V38' : {
val: `1.360`,
val_noFormat: `1.360`,
excl_cell: `V38`,
formula: `S38*T38`,
hidden: false
},
'W38' : {
val: ``,
val_noFormat: ``,
excl_cell: `W38`,
formula: ``,
hidden: true
},
'X38' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X38`,
formula: ``,
hidden: false
},
'Y38' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y38`,
formula: ``,
hidden: false
},
'Z38' : {
val: `13.058823529411764`,
val_noFormat: `13.058823529411764`,
excl_cell: `Z38`,
formula: `R38/T38`,
hidden: true
},
'AA38' : {
val: `697.82505`,
val_noFormat: `697.82505`,
excl_cell: `AA38`,
formula: `D38+F38+G38+I38+K38`,
hidden: true
},
'AB38' : {
val: `662.1749500000001`,
val_noFormat: `662.1749500000001`,
excl_cell: `AB38`,
formula: `V38-D38-F38-G38-I38-K38`,
hidden: true
},
'AC38' : {
val: `252.12495`,
val_noFormat: `252.12495`,
excl_cell: `AC38`,
formula: `V38+Y38-J38-Q38+X38`,
hidden: false
},
'AD38' : {
val: `69.242190625`,
val_noFormat: `69.242190625`,
excl_cell: `AD38`,
formula: `(J38+Q38-X38-Y38)/S38`,
hidden: true
},
'AE38' : {
val: `13.0`,
val_noFormat: `13.0`,
excl_cell: `AE38`,
formula: `ROUND((J38+Q38-X38-Y38)/T38,3-LEN(INT((J38+Q38-X38-Y38)/T38)))`,
hidden: true
},
'AF38' : {
val: `81.574940625`,
val_noFormat: `81.574940625`,
excl_cell: `AF38`,
formula: `(AC41+J38+Q38-X38)/S38`,
hidden: false
},
'AG38' : {
val: `15.355282941176469`,
val_noFormat: `15.355282941176469`,
excl_cell: `AG38`,
formula: `(AC41+J38+Q38-X38)/T38`,
hidden: false
},
'AH38' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH38`,
formula: ``,
hidden: true
},
'AI38' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI38`,
formula: ``,
hidden: true
},
'AJ38' : {
val: `1230.0`,
val_noFormat: `1230.0`,
excl_cell: `AJ38`,
formula: `R38+AH38`,
hidden: true
},
'AK38' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK38`,
formula: ``,
hidden: true
},
'AL38' : {
val: `410.0`,
val_noFormat: `410.0`,
excl_cell: `AL38`,
formula: `V38+AK38-AJ38`,
hidden: true
},
'AM38' : {
val: `330.0`,
val_noFormat: `330.0`,
excl_cell: `AM38`,
formula: `AL38-AI38`,
hidden: true
},
'AN38' : {
val: `1,51`,
val_noFormat: `1,51`,
excl_cell: `AN38`,
formula: `AP38/6.25`,
hidden: true
},
'AO38' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO38`,
formula: ``,
hidden: true
},
'AP38' : {
val: `9,46`,
val_noFormat: `9,46`,
excl_cell: `AP38`,
formula: `AQ38*AO38/100`,
hidden: true
},
'AQ38' : {
val: `11.00`,
val_noFormat: `11,00`,
excl_cell: `AQ38`,
formula: ``,
hidden: true
},
'AR38' : {
val: `0.90`,
val_noFormat: `0,90`,
excl_cell: `AR38`,
formula: ``,
hidden: true
},
'AS38' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS38`,
formula: ``,
hidden: true
},
'AT38' : {
val: `167`,
val_noFormat: `167`,
excl_cell: `AT38`,
formula: `AU38+(AR38*T38*AS38)`,
hidden: true
},
'AU38' : {
val: `129`,
val_noFormat: `129`,
excl_cell: `AU38`,
formula: `AN38*T38`,
hidden: true
},
'AV38' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `AV38`,
formula: ``,
hidden: true
},
'AW38' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `AW38`,
formula: ``,
hidden: true
},
'AX38' : {
val: `15`,
val_noFormat: `15`,
excl_cell: `AX38`,
formula: `T38-AW38`,
hidden: true
},
'AY38' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY38`,
formula: ``,
hidden: true
},
'AZ38' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ38`,
formula: ``,
hidden: true
},
'BA38' : {
val: `185`,
val_noFormat: `185`,
excl_cell: `BA38`,
formula: `(IF(AX38>0,AY38*AX38,IF(AX38<0,AZ38*AX38)))+AV38`,
hidden: true
},
'BB38' : {
val: `56`,
val_noFormat: `56`,
excl_cell: `BB38`,
formula: `BA38-AU38`,
hidden: true
},
'BC38' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC38`,
formula: ``,
hidden: true
},
'BD38' : {
val: `0.9`,
val_noFormat: `0,9`,
excl_cell: `BD38`,
formula: ``,
hidden: true
},
'BE38' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE38`,
formula: ``,
hidden: true
},
'BF38' : {
val: `365`,
val_noFormat: `365`,
excl_cell: `BF38`,
formula: `(T38*BD38*BE38*0.1)+BC38`,
hidden: true
},
'BG38' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG38`,
formula: ``,
hidden: false
},
'A39' : {
val: `Populationsroggen`,
val_noFormat: `Populationsroggen`,
excl_cell: `A39`,
formula: ``,
hidden: true
},
'B39' : {
val: `DUKATO`,
val_noFormat: `DUKATO`,
excl_cell: `B39`,
formula: ``,
hidden: true
},
'C39' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C39`,
formula: ``,
hidden: true
},
'D39' : {
val: `64`,
val_noFormat: `64`,
excl_cell: `D39`,
formula: `E39*D18`,
hidden: true
},
'E39' : {
val: `0.76`,
val_noFormat: `0,76`,
excl_cell: `E39`,
formula: ``,
hidden: true
},
'F39' : {
val: `207.328`,
val_noFormat: `207.328`,
excl_cell: `F39`,
formula: `[2]Düngung!M21*T39+[2]Düngung!P11`,
hidden: true
},
'G39' : {
val: `145`,
val_noFormat: `145`,
excl_cell: `G39`,
formula: `H39*G18`,
hidden: true
},
'H39' : {
val: `0.91`,
val_noFormat: `0,91`,
excl_cell: `H39`,
formula: ``,
hidden: true
},
'I39' : {
val: `20.898600000000002`,
val_noFormat: `20.898600000000002`,
excl_cell: `I39`,
formula: `(SUM(D39:G39)/4*0.05)+(V39*0.014*1)`,
hidden: true
},
'J39' : {
val: `437.6266`,
val_noFormat: `437.6266`,
excl_cell: `J39`,
formula: `SUM(D39,F39,G39,I39)`,
hidden: true
},
'K39' : {
val: `165`,
val_noFormat: `165`,
excl_cell: `K39`,
formula: `L39*K18`,
hidden: true
},
'L39' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `L39`,
formula: ``,
hidden: true
},
'M39' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `M39`,
formula: `N39*M18`,
hidden: true
},
'N39' : {
val: `0.94`,
val_noFormat: `0,94`,
excl_cell: `N39`,
formula: ``,
hidden: true
},
'O39' : {
val: `245`,
val_noFormat: `245`,
excl_cell: `O39`,
formula: `P39*O18`,
hidden: true
},
'P39' : {
val: `0.97`,
val_noFormat: `0,97`,
excl_cell: `P39`,
formula: ``,
hidden: true
},
'Q39' : {
val: `564`,
val_noFormat: `564`,
excl_cell: `Q39`,
formula: `SUM(K39,M39,O39)`,
hidden: true
},
'R39' : {
val: `1000.0`,
val_noFormat: `1000.0`,
excl_cell: `R39`,
formula: `ROUND(J39+Q39,3-LEN(INT(J39+Q39)))`,
hidden: true
},
'S39' : {
val: `16,00`,
val_noFormat: `16,00`,
excl_cell: `S39`,
formula: `S38`,
hidden: true
},
'T39' : {
val: `70,0`,
val_noFormat: `70,0`,
excl_cell: `T39`,
formula: `T18*U39`,
hidden: true
},
'U39' : {
val: `0.824`,
val_noFormat: `0,824`,
excl_cell: `U39`,
formula: ``,
hidden: true
},
'V39' : {
val: `1.120`,
val_noFormat: `1.120`,
excl_cell: `V39`,
formula: `S39*T39`,
hidden: true
},
'W39' : {
val: ``,
val_noFormat: ``,
excl_cell: `W39`,
formula: ``,
hidden: true
},
'X39' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X39`,
formula: ``,
hidden: true
},
'Y39' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y39`,
formula: ``,
hidden: true
},
'Z39' : {
val: `14.285714285714286`,
val_noFormat: `14.285714285714286`,
excl_cell: `Z39`,
formula: `R39/T39`,
hidden: true
},
'AA39' : {
val: `602.1266`,
val_noFormat: `602.1266`,
excl_cell: `AA39`,
formula: `D39+F39+G39+I39+K39`,
hidden: true
},
'AB39' : {
val: `517.8734000000002`,
val_noFormat: `517.8734000000002`,
excl_cell: `AB39`,
formula: `V39-D39-F39-G39-I39-K39`,
hidden: true
},
'AC39' : {
val: `118.27339999999992`,
val_noFormat: `118.27339999999992`,
excl_cell: `AC39`,
formula: `V39+Y39-J39-Q39+X39`,
hidden: true
},
'AD39' : {
val: `62.6079125`,
val_noFormat: `62.6079125`,
excl_cell: `AD39`,
formula: `(J39+Q39-X39-Y39)/S39`,
hidden: true
},
'AE39' : {
val: `14.3`,
val_noFormat: `14.3`,
excl_cell: `AE39`,
formula: `ROUND((J39+Q39-X39-Y39)/T39,3-LEN(INT((J39+Q39-X39-Y39)/T39)))`,
hidden: true
},
'AF39' : {
val: `74.9406625`,
val_noFormat: `74.9406625`,
excl_cell: `AF39`,
formula: `(AC41+J39+Q39-X39)/S39`,
hidden: true
},
'AG39' : {
val: `17.129294285714288`,
val_noFormat: `17.129294285714288`,
excl_cell: `AG39`,
formula: `(AC41+J39+Q39-X39)/T39`,
hidden: true
},
'AH39' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH39`,
formula: ``,
hidden: true
},
'AI39' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI39`,
formula: ``,
hidden: true
},
'AJ39' : {
val: `1120.0`,
val_noFormat: `1120.0`,
excl_cell: `AJ39`,
formula: `R39+AH39`,
hidden: true
},
'AK39' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK39`,
formula: ``,
hidden: true
},
'AL39' : {
val: `280.0`,
val_noFormat: `280.0`,
excl_cell: `AL39`,
formula: `V39+AK39-AJ39`,
hidden: true
},
'AM39' : {
val: `200.0`,
val_noFormat: `200.0`,
excl_cell: `AM39`,
formula: `AL39-AI39`,
hidden: true
},
'AN39' : {
val: `1,51`,
val_noFormat: `1,51`,
excl_cell: `AN39`,
formula: `AP39/6.25`,
hidden: true
},
'AO39' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO39`,
formula: ``,
hidden: true
},
'AP39' : {
val: `9,46`,
val_noFormat: `9,46`,
excl_cell: `AP39`,
formula: `AQ39*AO39/100`,
hidden: true
},
'AQ39' : {
val: `11.00`,
val_noFormat: `11,00`,
excl_cell: `AQ39`,
formula: ``,
hidden: true
},
'AR39' : {
val: `0.90`,
val_noFormat: `0,90`,
excl_cell: `AR39`,
formula: ``,
hidden: true
},
'AS39' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS39`,
formula: ``,
hidden: true
},
'AT39' : {
val: `137`,
val_noFormat: `137`,
excl_cell: `AT39`,
formula: `AU39+(AR39*T39*AS39)`,
hidden: true
},
'AU39' : {
val: `106`,
val_noFormat: `106`,
excl_cell: `AU39`,
formula: `AN39*T39`,
hidden: true
},
'AV39' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `AV39`,
formula: ``,
hidden: true
},
'AW39' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `AW39`,
formula: ``,
hidden: true
},
'AX39' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `AX39`,
formula: `T39-AW39`,
hidden: true
},
'AY39' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY39`,
formula: ``,
hidden: true
},
'AZ39' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ39`,
formula: ``,
hidden: true
},
'BA39' : {
val: `170`,
val_noFormat: `170`,
excl_cell: `BA39`,
formula: `(IF(AX39>0,AY39*AX39,IF(AX39<0,AZ39*AX39)))+AV39`,
hidden: true
},
'BB39' : {
val: `64`,
val_noFormat: `64`,
excl_cell: `BB39`,
formula: `BA39-AU39`,
hidden: true
},
'BC39' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC39`,
formula: ``,
hidden: true
},
'BD39' : {
val: `0.9`,
val_noFormat: `0,9`,
excl_cell: `BD39`,
formula: ``,
hidden: true
},
'BE39' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE39`,
formula: ``,
hidden: true
},
'BF39' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `BF39`,
formula: `(T39*BD39*BE39*0.1)+BC39`,
hidden: true
},
'BG39' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG39`,
formula: ``,
hidden: true
},
'A40' : {
val: `Futterhafer`,
val_noFormat: `Futterhafer`,
excl_cell: `A40`,
formula: ``,
hidden: false
},
'B40' : {
val: `SYMPHONY`,
val_noFormat: `SYMPHONY`,
excl_cell: `B40`,
formula: ``,
hidden: true
},
'C40' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C40`,
formula: `C34`,
hidden: false
},
'D40' : {
val: `70`,
val_noFormat: `70`,
excl_cell: `D40`,
formula: `E40*D18`,
hidden: true
},
'E40' : {
val: `0.81`,
val_noFormat: `0,81`,
excl_cell: `E40`,
formula: ``,
hidden: true
},
'F40' : {
val: `190.559344`,
val_noFormat: `190.559344`,
excl_cell: `F40`,
formula: `[2]Düngung!M31*T40+[2]Düngung!P11`,
hidden: true
},
'G40' : {
val: `45`,
val_noFormat: `45`,
excl_cell: `G40`,
formula: `H40*G18`,
hidden: true
},
'H40' : {
val: `0.28`,
val_noFormat: `0,28`,
excl_cell: `H40`,
formula: ``,
hidden: true
},
'I40' : {
val: `32.1631474`,
val_noFormat: `32.1631474`,
excl_cell: `I40`,
formula: `(SUM(D40:G40)/4*0.05)+(V40*0.014*2)`,
hidden: true
},
'J40' : {
val: `337.13749140000004`,
val_noFormat: `337.13749140000004`,
excl_cell: `J40`,
formula: `SUM(D40,F40,G40,I40)`,
hidden: false
},
'K40' : {
val: `155`,
val_noFormat: `155`,
excl_cell: `K40`,
formula: `L40*K18`,
hidden: true
},
'L40' : {
val: `0.89`,
val_noFormat: `0,89`,
excl_cell: `L40`,
formula: ``,
hidden: true
},
'M40' : {
val: `135`,
val_noFormat: `135`,
excl_cell: `M40`,
formula: `N40*M18`,
hidden: true
},
'N40' : {
val: `0.82`,
val_noFormat: `0,82`,
excl_cell: `N40`,
formula: ``,
hidden: true
},
'O40' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `O40`,
formula: `P40*O18`,
hidden: true
},
'P40' : {
val: `0.92`,
val_noFormat: `0,92`,
excl_cell: `P40`,
formula: ``,
hidden: true
},
'Q40' : {
val: `520`,
val_noFormat: `520`,
excl_cell: `Q40`,
formula: `SUM(K40,M40,O40)`,
hidden: false
},
'R40' : {
val: `857.0`,
val_noFormat: `857.0`,
excl_cell: `R40`,
formula: `ROUND(J40+Q40,3-LEN(INT(J40+Q40)))`,
hidden: true
},
'S40' : {
val: `16,07`,
val_noFormat: `16,07`,
excl_cell: `S40`,
formula: `S18-1.93`,
hidden: false
},
'T40' : {
val: `63,0`,
val_noFormat: `63,0`,
excl_cell: `T40`,
formula: `T18*U40`,
hidden: false
},
'U40' : {
val: `0.741`,
val_noFormat: `0,741`,
excl_cell: `U40`,
formula: ``,
hidden: false
},
'V40' : {
val: `1.012`,
val_noFormat: `1.012`,
excl_cell: `V40`,
formula: `S40*T40`,
hidden: false
},
'W40' : {
val: ``,
val_noFormat: ``,
excl_cell: `W40`,
formula: ``,
hidden: true
},
'X40' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `X40`,
formula: ``,
hidden: false
},
'Y40' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y40`,
formula: `Y34`,
hidden: false
},
'Z40' : {
val: `13.606414225609273`,
val_noFormat: `13.606414225609273`,
excl_cell: `Z40`,
formula: `R40/T40`,
hidden: true
},
'AA40' : {
val: `492.01249140000004`,
val_noFormat: `492.01249140000004`,
excl_cell: `AA40`,
formula: `D40+F40+G40+I40+K40`,
hidden: true
},
'AB40' : {
val: `520.1564586000001`,
val_noFormat: `520.1564586000001`,
excl_cell: `AB40`,
formula: `V40-D40-F40-G40-I40-K40`,
hidden: true
},
'AC40' : {
val: `234.8564586`,
val_noFormat: `234.8564586`,
excl_cell: `AC40`,
formula: `V40+Y40-J40-Q40+X40`,
hidden: false
},
'AD40' : {
val: `48.370410168014935`,
val_noFormat: `48.370410168014935`,
excl_cell: `AD40`,
formula: `(J40+Q40-X40-Y40)/S40`,
hidden: true
},
'AE40' : {
val: `12.3`,
val_noFormat: `12.3`,
excl_cell: `AE40`,
formula: `ROUND((J40+Q40-X40-Y40)/T40,3-LEN(INT((J40+Q40-X40-Y40)/T40)))`,
hidden: true
},
'AF40' : {
val: `60.64943941505912`,
val_noFormat: `60.64943941505912`,
excl_cell: `AF40`,
formula: `(AC41+J40+Q40-X40)/S40`,
hidden: false
},
'AG40' : {
val: `15.47410480908153`,
val_noFormat: `15.47410480908153`,
excl_cell: `AG40`,
formula: `(AC41+J40+Q40-X40)/T40`,
hidden: false
},
'AH40' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH40`,
formula: ``,
hidden: true
},
'AI40' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI40`,
formula: ``,
hidden: true
},
'AJ40' : {
val: `977.0`,
val_noFormat: `977.0`,
excl_cell: `AJ40`,
formula: `R40+AH40`,
hidden: true
},
'AK40' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK40`,
formula: ``,
hidden: true
},
'AL40' : {
val: `315.16895`,
val_noFormat: `315.16895`,
excl_cell: `AL40`,
formula: `V40+AK40-AJ40`,
hidden: true
},
'AM40' : {
val: `235.16895`,
val_noFormat: `235.16895`,
excl_cell: `AM40`,
formula: `AL40-AI40`,
hidden: true
},
'AN40' : {
val: `1,58`,
val_noFormat: `1,58`,
excl_cell: `AN40`,
formula: `AP40/6.25`,
hidden: true
},
'AO40' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO40`,
formula: ``,
hidden: true
},
'AP40' : {
val: `9,89`,
val_noFormat: `9,89`,
excl_cell: `AP40`,
formula: `AQ40*AO40/100`,
hidden: true
},
'AQ40' : {
val: `11.50`,
val_noFormat: `11,50`,
excl_cell: `AQ40`,
formula: ``,
hidden: true
},
'AR40' : {
val: `1.10`,
val_noFormat: `1,10`,
excl_cell: `AR40`,
formula: ``,
hidden: true
},
'AS40' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS40`,
formula: ``,
hidden: true
},
'AT40' : {
val: `134`,
val_noFormat: `134`,
excl_cell: `AT40`,
formula: `AU40+(AR40*T40*AS40)`,
hidden: true
},
'AU40' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `AU40`,
formula: `AN40*T40`,
hidden: true
},
'AV40' : {
val: `130`,
val_noFormat: `130`,
excl_cell: `AV40`,
formula: ``,
hidden: true
},
'AW40' : {
val: `55`,
val_noFormat: `55`,
excl_cell: `AW40`,
formula: ``,
hidden: true
},
'AX40' : {
val: `8`,
val_noFormat: `8`,
excl_cell: `AX40`,
formula: `T40-AW40`,
hidden: true
},
'AY40' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY40`,
formula: ``,
hidden: true
},
'AZ40' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ40`,
formula: ``,
hidden: true
},
'BA40' : {
val: `138`,
val_noFormat: `138`,
excl_cell: `BA40`,
formula: `(IF(AX40>0,AY40*AX40,IF(AX40<0,AZ40*AX40)))+AV40`,
hidden: true
},
'BB40' : {
val: `38`,
val_noFormat: `38`,
excl_cell: `BB40`,
formula: `BA40-AU40`,
hidden: true
},
'BC40' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC40`,
formula: ``,
hidden: true
},
'BD40' : {
val: `1.1`,
val_noFormat: `1,1`,
excl_cell: `BD40`,
formula: ``,
hidden: true
},
'BE40' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE40`,
formula: ``,
hidden: true
},
'BF40' : {
val: `293`,
val_noFormat: `293`,
excl_cell: `BF40`,
formula: `(T40*BD40*BE40*0.1)+BC40`,
hidden: true
},
'BG40' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG40`,
formula: ``,
hidden: false
},
'A41' : {
val: `Stoppelweizen B`,
val_noFormat: `Stoppelweizen B`,
excl_cell: `A41`,
formula: ``,
hidden: false
},
'B41' : {
val: `FAUSTUS`,
val_noFormat: `FAUSTUS`,
excl_cell: `B41`,
formula: ``,
hidden: true
},
'C41' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C41`,
formula: ``,
hidden: false
},
'D41' : {
val: `85`,
val_noFormat: `85`,
excl_cell: `D41`,
formula: `E41*D18`,
hidden: true
},
'E41' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `E41`,
formula: ``,
hidden: true
},
'F41' : {
val: `237.28000000000003`,
val_noFormat: `237.28000000000003`,
excl_cell: `F41`,
formula: `[2]Düngung!M9*T41+[2]Düngung!P11`,
hidden: true
},
'G41' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `G41`,
formula: `H41*G18`,
hidden: true
},
'H41' : {
val: `1.25`,
val_noFormat: `1,25`,
excl_cell: `H41`,
formula: ``,
hidden: true
},
'I41' : {
val: `30.166000000000004`,
val_noFormat: `30.166000000000004`,
excl_cell: `I41`,
formula: `(SUM(D41:G41)/4*0.05)+(V41*0.014*1.25)`,
hidden: true
},
'J41' : {
val: `552.446`,
val_noFormat: `552.446`,
excl_cell: `J41`,
formula: `SUM(D41,F41,G41,I41)`,
hidden: false
},
'K41' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `K41`,
formula: `L41*K18`,
hidden: true
},
'L41' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `L41`,
formula: ``,
hidden: true
},
'M41' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `M41`,
formula: `N41*M18`,
hidden: true
},
'N41' : {
val: `1.06`,
val_noFormat: `1,06`,
excl_cell: `N41`,
formula: ``,
hidden: true
},
'O41' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O41`,
formula: `P41*O18`,
hidden: true
},
'P41' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P41`,
formula: ``,
hidden: true
},
'Q41' : {
val: `600`,
val_noFormat: `600`,
excl_cell: `Q41`,
formula: `SUM(K41,M41,O41)`,
hidden: false
},
'R41' : {
val: `1150.0`,
val_noFormat: `1150.0`,
excl_cell: `R41`,
formula: `ROUND(J41+Q41,3-LEN(INT(J41+Q41)))`,
hidden: true
},
'S41' : {
val: `18,00`,
val_noFormat: `18,00`,
excl_cell: `S41`,
formula: `S18`,
hidden: false
},
'T41' : {
val: `75,0`,
val_noFormat: `75,0`,
excl_cell: `T41`,
formula: `T18*U41`,
hidden: false
},
'U41' : {
val: `0.882`,
val_noFormat: `0,882`,
excl_cell: `U41`,
formula: ``,
hidden: false
},
'V41' : {
val: `1.350`,
val_noFormat: `1.350`,
excl_cell: `V41`,
formula: `S41*T41`,
hidden: false
},
'W41' : {
val: ``,
val_noFormat: ``,
excl_cell: `W41`,
formula: ``,
hidden: true
},
'X41' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X41`,
formula: ``,
hidden: false
},
'Y41' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y41`,
formula: ``,
hidden: false
},
'Z41' : {
val: `15.333333333333334`,
val_noFormat: `15.333333333333334`,
excl_cell: `Z41`,
formula: `R41/T41`,
hidden: true
},
'AA41' : {
val: `727.446`,
val_noFormat: `727.446`,
excl_cell: `AA41`,
formula: `D41+F41+G41+I41+K41`,
hidden: true
},
'AB41' : {
val: `622.554`,
val_noFormat: `622.554`,
excl_cell: `AB41`,
formula: `V41-D41-F41-G41-I41-K41`,
hidden: true
},
'AC41' : {
val: `197.32399999999996`,
val_noFormat: `197.32399999999996`,
excl_cell: `AC41`,
formula: `V41+Y41-J41-Q41+X41`,
hidden: false
},
'AD41' : {
val: `64.03755555555556`,
val_noFormat: `64.03755555555556`,
excl_cell: `AD41`,
formula: `(J41+Q41-X41-Y41)/S41`,
hidden: true
},
'AE41' : {
val: `15.4`,
val_noFormat: `15.4`,
excl_cell: `AE41`,
formula: `ROUND((J41+Q41-X41-Y41)/T41,3-LEN(INT((J41+Q41-X41-Y41)/T41)))`,
hidden: true
},
'AF41' : {
val: `75.0`,
val_noFormat: `75.0`,
excl_cell: `AF41`,
formula: `(AC41+J41+Q41-X41)/S41`,
hidden: false
},
'AG41' : {
val: `18.0`,
val_noFormat: `18.0`,
excl_cell: `AG41`,
formula: `(AC41+J41+Q41-X41)/T41`,
hidden: false
},
'AH41' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH41`,
formula: ``,
hidden: true
},
'AI41' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI41`,
formula: ``,
hidden: true
},
'AJ41' : {
val: `1270.0`,
val_noFormat: `1270.0`,
excl_cell: `AJ41`,
formula: `R41+AH41`,
hidden: true
},
'AK41' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK41`,
formula: ``,
hidden: true
},
'AL41' : {
val: `360.0`,
val_noFormat: `360.0`,
excl_cell: `AL41`,
formula: `V41+AK41-AJ41`,
hidden: true
},
'AM41' : {
val: `280.0`,
val_noFormat: `280.0`,
excl_cell: `AM41`,
formula: `AL41-AI41`,
hidden: true
},
'AN41' : {
val: `1,81`,
val_noFormat: `1,81`,
excl_cell: `AN41`,
formula: `AP41/5.7`,
hidden: true
},
'AO41' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO41`,
formula: ``,
hidden: true
},
'AP41' : {
val: `10,32`,
val_noFormat: `10,32`,
excl_cell: `AP41`,
formula: `AQ41*AO41/100`,
hidden: true
},
'AQ41' : {
val: `12.00`,
val_noFormat: `12,00`,
excl_cell: `AQ41`,
formula: ``,
hidden: true
},
'AR41' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR41`,
formula: ``,
hidden: true
},
'AS41' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS41`,
formula: ``,
hidden: true
},
'AT41' : {
val: `166`,
val_noFormat: `166`,
excl_cell: `AT41`,
formula: `AU41+(AR41*T41*AS41)`,
hidden: true
},
'AU41' : {
val: `136`,
val_noFormat: `136`,
excl_cell: `AU41`,
formula: `AN41*T41`,
hidden: true
},
'AV41' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `AV41`,
formula: ``,
hidden: true
},
'AW41' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW41`,
formula: ``,
hidden: true
},
'AX41' : {
val: `-5`,
val_noFormat: `-5`,
excl_cell: `AX41`,
formula: `T41-AW41`,
hidden: true
},
'AY41' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY41`,
formula: ``,
hidden: true
},
'AZ41' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ41`,
formula: ``,
hidden: true
},
'BA41' : {
val: `223`,
val_noFormat: `223`,
excl_cell: `BA41`,
formula: `(IF(AX41>0,AY41*AX41,IF(AX41<0,AZ41*AX41)))+AV41`,
hidden: true
},
'BB41' : {
val: `87`,
val_noFormat: `87`,
excl_cell: `BB41`,
formula: `BA41-AU41`,
hidden: true
},
'BC41' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC41`,
formula: ``,
hidden: true
},
'BD41' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD41`,
formula: ``,
hidden: true
},
'BE41' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE41`,
formula: ``,
hidden: true
},
'BF41' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `BF41`,
formula: `(T41*BD41*BE41*0.1)+BC41`,
hidden: true
},
'BG41' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG41`,
formula: ``,
hidden: false
},
'A42' : {
val: `Stoppelweizen C`,
val_noFormat: `Stoppelweizen C`,
excl_cell: `A42`,
formula: ``,
hidden: false
},
'B42' : {
val: `ELIXER`,
val_noFormat: `ELIXER`,
excl_cell: `B42`,
formula: ``,
hidden: true
},
'C42' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C42`,
formula: ``,
hidden: false
},
'D42' : {
val: `85`,
val_noFormat: `85`,
excl_cell: `D42`,
formula: `E42*D18`,
hidden: true
},
'E42' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `E42`,
formula: ``,
hidden: true
},
'F42' : {
val: `241.67276800000002`,
val_noFormat: `241.67276800000002`,
excl_cell: `F42`,
formula: `[2]Düngung!M9*T42+[2]Düngung!P11`,
hidden: true
},
'G42' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `G42`,
formula: `H42*G18`,
hidden: true
},
'H42' : {
val: `1.25`,
val_noFormat: `1,25`,
excl_cell: `H42`,
formula: ``,
hidden: true
},
'I42' : {
val: `29.9419246`,
val_noFormat: `29.9419246`,
excl_cell: `I42`,
formula: `(SUM(D42:G42)/4*0.05)+(V42*0.014*1.25)`,
hidden: true
},
'J42' : {
val: `556.6146926`,
val_noFormat: `556.6146926`,
excl_cell: `J42`,
formula: `SUM(D42,F42,G42,I42)`,
hidden: false
},
'K42' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `K42`,
formula: `L42*K18`,
hidden: true
},
'L42' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `L42`,
formula: ``,
hidden: true
},
'M42' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `M42`,
formula: `N42*M18`,
hidden: true
},
'N42' : {
val: `1.06`,
val_noFormat: `1,06`,
excl_cell: `N42`,
formula: ``,
hidden: true
},
'O42' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O42`,
formula: `P42*O18`,
hidden: true
},
'P42' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P42`,
formula: ``,
hidden: true
},
'Q42' : {
val: `600`,
val_noFormat: `600`,
excl_cell: `Q42`,
formula: `SUM(K42,M42,O42)`,
hidden: false
},
'R42' : {
val: `1160.0`,
val_noFormat: `1160.0`,
excl_cell: `R42`,
formula: `ROUND(J42+Q42,3-LEN(INT(J42+Q42)))`,
hidden: true
},
'S42' : {
val: `17,40`,
val_noFormat: `17,40`,
excl_cell: `S42`,
formula: `S23`,
hidden: false
},
'T42' : {
val: `76,7`,
val_noFormat: `76,7`,
excl_cell: `T42`,
formula: `T18*U42`,
hidden: false
},
'U42' : {
val: `0.902`,
val_noFormat: `0,902`,
excl_cell: `U42`,
formula: ``,
hidden: false
},
'V42' : {
val: `1.334`,
val_noFormat: `1.334`,
excl_cell: `V42`,
formula: `S42*T42`,
hidden: false
},
'W42' : {
val: ``,
val_noFormat: ``,
excl_cell: `W42`,
formula: ``,
hidden: true
},
'X42' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X42`,
formula: ``,
hidden: false
},
'Y42' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y42`,
formula: ``,
hidden: false
},
'Z42' : {
val: `15.12977696621886`,
val_noFormat: `15.12977696621886`,
excl_cell: `Z42`,
formula: `R42/T42`,
hidden: true
},
'AA42' : {
val: `731.6146926`,
val_noFormat: `731.6146926`,
excl_cell: `AA42`,
formula: `D42+F42+G42+I42+K42`,
hidden: true
},
'AB42' : {
val: `602.4433074`,
val_noFormat: `602.4433074`,
excl_cell: `AB42`,
formula: `V42-D42-F42-G42-I42-K42`,
hidden: true
},
'AC42' : {
val: `177.21330739999996`,
val_noFormat: `177.21330739999996`,
excl_cell: `AC42`,
formula: `V42+Y42-J42-Q42+X42`,
hidden: false
},
'AD42' : {
val: `66.48532716091955`,
val_noFormat: `66.48532716091955`,
excl_cell: `AD42`,
formula: `(J42+Q42-X42-Y42)/S42`,
hidden: true
},
'AE42' : {
val: `15.1`,
val_noFormat: `15.1`,
excl_cell: `AE42`,
formula: `ROUND((J42+Q42-X42-Y42)/T42,3-LEN(INT((J42+Q42-X42-Y42)/T42)))`,
hidden: true
},
'AF42' : {
val: `77.82578693103449`,
val_noFormat: `77.82578693103449`,
excl_cell: `AF42`,
formula: `(AC41+J42+Q42-X42)/S42`,
hidden: false
},
'AG42' : {
val: `17.662301977305333`,
val_noFormat: `17.662301977305333`,
excl_cell: `AG42`,
formula: `(AC41+J42+Q42-X42)/T42`,
hidden: false
},
'AH42' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH42`,
formula: ``,
hidden: true
},
'AI42' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI42`,
formula: ``,
hidden: true
},
'AJ42' : {
val: `1280.0`,
val_noFormat: `1280.0`,
excl_cell: `AJ42`,
formula: `R42+AH42`,
hidden: true
},
'AK42' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK42`,
formula: ``,
hidden: true
},
'AL42' : {
val: `334.058`,
val_noFormat: `334.058`,
excl_cell: `AL42`,
formula: `V42+AK42-AJ42`,
hidden: true
},
'AM42' : {
val: `254.058`,
val_noFormat: `254.058`,
excl_cell: `AM42`,
formula: `AL42-AI42`,
hidden: true
},
'AN42' : {
val: `1,74`,
val_noFormat: `1,74`,
excl_cell: `AN42`,
formula: `AP42/5.7`,
hidden: true
},
'AO42' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO42`,
formula: ``,
hidden: true
},
'AP42' : {
val: `9,89`,
val_noFormat: `9,89`,
excl_cell: `AP42`,
formula: `AQ42*AO42/100`,
hidden: true
},
'AQ42' : {
val: `11.50`,
val_noFormat: `11,50`,
excl_cell: `AQ42`,
formula: ``,
hidden: true
},
'AR42' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR42`,
formula: ``,
hidden: true
},
'AS42' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS42`,
formula: ``,
hidden: true
},
'AT42' : {
val: `164`,
val_noFormat: `164`,
excl_cell: `AT42`,
formula: `AU42+(AR42*T42*AS42)`,
hidden: true
},
'AU42' : {
val: `133`,
val_noFormat: `133`,
excl_cell: `AU42`,
formula: `AN42*T42`,
hidden: true
},
'AV42' : {
val: `210`,
val_noFormat: `210`,
excl_cell: `AV42`,
formula: ``,
hidden: true
},
'AW42' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW42`,
formula: ``,
hidden: true
},
'AX42' : {
val: `-3`,
val_noFormat: `-3`,
excl_cell: `AX42`,
formula: `T42-AW42`,
hidden: true
},
'AY42' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY42`,
formula: ``,
hidden: true
},
'AZ42' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ42`,
formula: ``,
hidden: true
},
'BA42' : {
val: `205`,
val_noFormat: `205`,
excl_cell: `BA42`,
formula: `(IF(AX42>0,AY42*AX42,IF(AX42<0,AZ42*AX42)))+AV42`,
hidden: true
},
'BB42' : {
val: `72`,
val_noFormat: `72`,
excl_cell: `BB42`,
formula: `BA42-AU42`,
hidden: true
},
'BC42' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC42`,
formula: ``,
hidden: true
},
'BD42' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD42`,
formula: ``,
hidden: true
},
'BE42' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE42`,
formula: ``,
hidden: true
},
'BF42' : {
val: `213`,
val_noFormat: `213`,
excl_cell: `BF42`,
formula: `(T42*BD42*BE42*0.1)+BC42`,
hidden: true
},
'BG42' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG42`,
formula: ``,
hidden: false
},
'A43' : {
val: `Hybridweizen B`,
val_noFormat: `Hybridweizen B`,
excl_cell: `A43`,
formula: ``,
hidden: true
},
'B43' : {
val: `HYMALAYA`,
val_noFormat: `HYMALAYA`,
excl_cell: `B43`,
formula: ``,
hidden: true
},
'C43' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C43`,
formula: ``,
hidden: true
},
'D43' : {
val: `150`,
val_noFormat: `150`,
excl_cell: `D43`,
formula: `E43*D18`,
hidden: true
},
'E43' : {
val: `1.77`,
val_noFormat: `1,77`,
excl_cell: `E43`,
formula: ``,
hidden: true
},
'F43' : {
val: `248.156704`,
val_noFormat: `248.156704`,
excl_cell: `F43`,
formula: `[2]Düngung!M9*T43*0.95+[2]Düngung!P11`,
hidden: true
},
'G43' : {
val: `200`,
val_noFormat: `200`,
excl_cell: `G43`,
formula: `H43*G18`,
hidden: true
},
'H43' : {
val: `1.25`,
val_noFormat: `1,25`,
excl_cell: `H43`,
formula: ``,
hidden: true
},
'I43' : {
val: `33.7442088`,
val_noFormat: `33.7442088`,
excl_cell: `I43`,
formula: `(SUM(D43:G43)/4*0.05)+(V43*0.014*1.25)`,
hidden: true
},
'J43' : {
val: `632.3509128000001`,
val_noFormat: `632.3509128000001`,
excl_cell: `J43`,
formula: `SUM(D43,F43,G43,I43)`,
hidden: true
},
'K43' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `K43`,
formula: `L43*K18`,
hidden: true
},
'L43' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `L43`,
formula: ``,
hidden: true
},
'M43' : {
val: `175`,
val_noFormat: `175`,
excl_cell: `M43`,
formula: `N43*M18`,
hidden: true
},
'N43' : {
val: `1.06`,
val_noFormat: `1,06`,
excl_cell: `N43`,
formula: ``,
hidden: true
},
'O43' : {
val: `250`,
val_noFormat: `250`,
excl_cell: `O43`,
formula: `P43*O18`,
hidden: true
},
'P43' : {
val: `1.00`,
val_noFormat: `1,00`,
excl_cell: `P43`,
formula: ``,
hidden: true
},
'Q43' : {
val: `600`,
val_noFormat: `600`,
excl_cell: `Q43`,
formula: `SUM(K43,M43,O43)`,
hidden: true
},
'R43' : {
val: `1230.0`,
val_noFormat: `1230.0`,
excl_cell: `R43`,
formula: `ROUND(J43+Q43,3-LEN(INT(J43+Q43)))`,
hidden: true
},
'S43' : {
val: `18,00`,
val_noFormat: `18,00`,
excl_cell: `S43`,
formula: `S18`,
hidden: true
},
'T43' : {
val: `83,3`,
val_noFormat: `83,3`,
excl_cell: `T43`,
formula: `T18*U43`,
hidden: true
},
'U43' : {
val: `0.980`,
val_noFormat: `0,980`,
excl_cell: `U43`,
formula: ``,
hidden: true
},
'V43' : {
val: `1.499`,
val_noFormat: `1.499`,
excl_cell: `V43`,
formula: `S43*T43`,
hidden: true
},
'W43' : {
val: ``,
val_noFormat: ``,
excl_cell: `W43`,
formula: ``,
hidden: true
},
'X43' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `X43`,
formula: ``,
hidden: true
},
'Y43' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y43`,
formula: ``,
hidden: true
},
'Z43' : {
val: `14.765906362545019`,
val_noFormat: `14.765906362545019`,
excl_cell: `Z43`,
formula: `R43/T43`,
hidden: true
},
'AA43' : {
val: `807.3509128000001`,
val_noFormat: `807.3509128000001`,
excl_cell: `AA43`,
formula: `D43+F43+G43+I43+K43`,
hidden: true
},
'AB43' : {
val: `692.0490871999998`,
val_noFormat: `692.0490871999998`,
excl_cell: `AB43`,
formula: `V43-D43-F43-G43-I43-K43`,
hidden: true
},
'AC43' : {
val: `266.8190871999998`,
val_noFormat: `266.8190871999998`,
excl_cell: `AC43`,
formula: `V43+Y43-J43-Q43+X43`,
hidden: true
},
'AD43' : {
val: `68.47671737777779`,
val_noFormat: `68.47671737777779`,
excl_cell: `AD43`,
formula: `(J43+Q43-X43-Y43)/S43`,
hidden: true
},
'AE43' : {
val: `14.8`,
val_noFormat: `14.8`,
excl_cell: `AE43`,
formula: `ROUND((J43+Q43-X43-Y43)/T43,3-LEN(INT((J43+Q43-X43-Y43)/T43)))`,
hidden: true
},
'AF43' : {
val: `79.43916182222223`,
val_noFormat: `79.43916182222223`,
excl_cell: `AF43`,
formula: `(AC41+J43+Q43-X43)/S43`,
hidden: true
},
'AG43' : {
val: `17.16572524369748`,
val_noFormat: `17.16572524369748`,
excl_cell: `AG43`,
formula: `(AC41+J43+Q43-X43)/T43`,
hidden: true
},
'AH43' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH43`,
formula: ``,
hidden: true
},
'AI43' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI43`,
formula: ``,
hidden: true
},
'AJ43' : {
val: `1350.0`,
val_noFormat: `1350.0`,
excl_cell: `AJ43`,
formula: `R43+AH43`,
hidden: true
},
'AK43' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK43`,
formula: ``,
hidden: true
},
'AL43' : {
val: `429.39999999999986`,
val_noFormat: `429.39999999999986`,
excl_cell: `AL43`,
formula: `V43+AK43-AJ43`,
hidden: true
},
'AM43' : {
val: `349.39999999999986`,
val_noFormat: `349.39999999999986`,
excl_cell: `AM43`,
formula: `AL43-AI43`,
hidden: true
},
'AN43' : {
val: `1,81`,
val_noFormat: `1,81`,
excl_cell: `AN43`,
formula: `AP43/5.7`,
hidden: true
},
'AO43' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO43`,
formula: ``,
hidden: true
},
'AP43' : {
val: `10,32`,
val_noFormat: `10,32`,
excl_cell: `AP43`,
formula: `AQ43*AO43/100`,
hidden: true
},
'AQ43' : {
val: `12.00`,
val_noFormat: `12,00`,
excl_cell: `AQ43`,
formula: ``,
hidden: true
},
'AR43' : {
val: `0.80`,
val_noFormat: `0,80`,
excl_cell: `AR43`,
formula: ``,
hidden: true
},
'AS43' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS43`,
formula: ``,
hidden: true
},
'AT43' : {
val: `184`,
val_noFormat: `184`,
excl_cell: `AT43`,
formula: `AU43+(AR43*T43*AS43)`,
hidden: true
},
'AU43' : {
val: `151`,
val_noFormat: `151`,
excl_cell: `AU43`,
formula: `AN43*T43`,
hidden: true
},
'AV43' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `AV43`,
formula: ``,
hidden: true
},
'AW43' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AW43`,
formula: ``,
hidden: true
},
'AX43' : {
val: `3`,
val_noFormat: `3`,
excl_cell: `AX43`,
formula: `T43-AW43`,
hidden: true
},
'AY43' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY43`,
formula: ``,
hidden: true
},
'AZ43' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ43`,
formula: ``,
hidden: true
},
'BA43' : {
val: `233`,
val_noFormat: `233`,
excl_cell: `BA43`,
formula: `(IF(AX43>0,AY43*AX43,IF(AX43<0,AZ43*AX43)))+AV43`,
hidden: true
},
'BB43' : {
val: `82`,
val_noFormat: `82`,
excl_cell: `BB43`,
formula: `BA43-AU43`,
hidden: true
},
'BC43' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC43`,
formula: ``,
hidden: true
},
'BD43' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD43`,
formula: ``,
hidden: true
},
'BE43' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE43`,
formula: ``,
hidden: true
},
'BF43' : {
val: `266`,
val_noFormat: `266`,
excl_cell: `BF43`,
formula: `(T43*BD43*BE43*0.1)+BC43`,
hidden: true
},
'BG43' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG43`,
formula: ``,
hidden: true
},
'A44' : {
val: `So-Futtergerste`,
val_noFormat: `So-Futtergerste`,
excl_cell: `A44`,
formula: ``,
hidden: false
},
'B44' : {
val: `SALOME`,
val_noFormat: `SALOME`,
excl_cell: `B44`,
formula: ``,
hidden: true
},
'C44' : {
val: `C`,
val_noFormat: `C`,
excl_cell: `C44`,
formula: ``,
hidden: false
},
'D44' : {
val: `90`,
val_noFormat: `90`,
excl_cell: `D44`,
formula: `E44*D18`,
hidden: true
},
'E44' : {
val: `1.06`,
val_noFormat: `1,06`,
excl_cell: `E44`,
formula: ``,
hidden: true
},
'F44' : {
val: `185.06412800000004`,
val_noFormat: `185.06412800000004`,
excl_cell: `F44`,
formula: `[2]Düngung!M27*T44+[2]Düngung!P11`,
hidden: true
},
'G44' : {
val: `95`,
val_noFormat: `95`,
excl_cell: `G44`,
formula: `H44*G18`,
hidden: true
},
'H44' : {
val: `0.59`,
val_noFormat: `0,59`,
excl_cell: `H44`,
formula: ``,
hidden: true
},
'I44' : {
val: `25.216354600000003`,
val_noFormat: `25.216354600000003`,
excl_cell: `I44`,
formula: `(SUM(D44:G44)/4*0.05)+(V44*0.014*1.5)`,
hidden: true
},
'J44' : {
val: `395.58048260000004`,
val_noFormat: `395.58048260000004`,
excl_cell: `J44`,
formula: `SUM(D44,F44,G44,I44)`,
hidden: false
},
'K44' : {
val: `160`,
val_noFormat: `160`,
excl_cell: `K44`,
formula: `L44*K18`,
hidden: true
},
'L44' : {
val: `0.92`,
val_noFormat: `0,92`,
excl_cell: `L44`,
formula: ``,
hidden: true
},
'M44' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `M44`,
formula: `N44*M18`,
hidden: true
},
'N44' : {
val: `0.85`,
val_noFormat: `0,85`,
excl_cell: `N44`,
formula: ``,
hidden: true
},
'O44' : {
val: `230`,
val_noFormat: `230`,
excl_cell: `O44`,
formula: `P44*O18`,
hidden: true
},
'P44' : {
val: `0.92`,
val_noFormat: `0,92`,
excl_cell: `P44`,
formula: ``,
hidden: true
},
'Q44' : {
val: `530`,
val_noFormat: `530`,
excl_cell: `Q44`,
formula: `SUM(K44,M44,O44)`,
hidden: false
},
'R44' : {
val: `926.0`,
val_noFormat: `926.0`,
excl_cell: `R44`,
formula: `ROUND(J44+Q44,3-LEN(INT(J44+Q44)))`,
hidden: true
},
'S44' : {
val: `16,90`,
val_noFormat: `16,90`,
excl_cell: `S44`,
formula: `S36`,
hidden: false
},
'T44' : {
val: `58,0`,
val_noFormat: `58,0`,
excl_cell: `T44`,
formula: `T18*U44`,
hidden: false
},
'U44' : {
val: `0.682`,
val_noFormat: `0,682`,
excl_cell: `U44`,
formula: ``,
hidden: false
},
'V44' : {
val: `980`,
val_noFormat: `980`,
excl_cell: `V44`,
formula: `S44*T44`,
hidden: false
},
'W44' : {
val: ``,
val_noFormat: ``,
excl_cell: `W44`,
formula: ``,
hidden: true
},
'X44' : {
val: `40`,
val_noFormat: `40`,
excl_cell: `X44`,
formula: ``,
hidden: false
},
'Y44' : {
val: `0`,
val_noFormat: `0`,
excl_cell: `Y44`,
formula: ``,
hidden: false
},
'Z44' : {
val: `15.973779541141969`,
val_noFormat: `15.973779541141969`,
excl_cell: `Z44`,
formula: `R44/T44`,
hidden: true
},
'AA44' : {
val: `555.7054826000001`,
val_noFormat: `555.7054826000001`,
excl_cell: `AA44`,
formula: `D44+F44+G44+I44+K44`,
hidden: true
},
'AB44' : {
val: `423.9875173999998`,
val_noFormat: `423.9875173999998`,
excl_cell: `AB44`,
formula: `V44-D44-F44-G44-I44-K44`,
hidden: true
},
'AC44' : {
val: `93.73751739999989`,
val_noFormat: `93.73751739999989`,
excl_cell: `AC44`,
formula: `V44+Y44-J44-Q44+X44`,
hidden: false
},
'AD44' : {
val: `52.423401337278115`,
val_noFormat: `52.423401337278115`,
excl_cell: `AD44`,
formula: `(J44+Q44-X44-Y44)/S44`,
hidden: true
},
'AE44' : {
val: `15.3`,
val_noFormat: `15.3`,
excl_cell: `AE44`,
formula: `ROUND((J44+Q44-X44-Y44)/T44,3-LEN(INT((J44+Q44-X44-Y44)/T44)))`,
hidden: true
},
'AF44' : {
val: `64.09937766863905`,
val_noFormat: `64.09937766863905`,
excl_cell: `AF44`,
formula: `(AC41+J44+Q44-X44)/S44`,
hidden: false
},
'AG44' : {
val: `18.68689809556667`,
val_noFormat: `18.68689809556667`,
excl_cell: `AG44`,
formula: `(AC41+J44+Q44-X44)/T44`,
hidden: false
},
'AH44' : {
val: `120`,
val_noFormat: `120`,
excl_cell: `AH44`,
formula: ``,
hidden: true
},
'AI44' : {
val: `80`,
val_noFormat: `80`,
excl_cell: `AI44`,
formula: ``,
hidden: true
},
'AJ44' : {
val: `1046.0`,
val_noFormat: `1046.0`,
excl_cell: `AJ44`,
formula: `R44+AH44`,
hidden: true
},
'AK44' : {
val: `280`,
val_noFormat: `280`,
excl_cell: `AK44`,
formula: ``,
hidden: true
},
'AL44' : {
val: `213.69299999999998`,
val_noFormat: `213.69299999999998`,
excl_cell: `AL44`,
formula: `V44+AK44-AJ44`,
hidden: true
},
'AM44' : {
val: `133.69299999999998`,
val_noFormat: `133.69299999999998`,
excl_cell: `AM44`,
formula: `AL44-AI44`,
hidden: true
},
'AN44' : {
val: `1,65`,
val_noFormat: `1,65`,
excl_cell: `AN44`,
formula: `AP44/6.25`,
hidden: true
},
'AO44' : {
val: `86.0`,
val_noFormat: `86,0`,
excl_cell: `AO44`,
formula: ``,
hidden: true
},
'AP44' : {
val: `10,32`,
val_noFormat: `10,32`,
excl_cell: `AP44`,
formula: `AQ44*AO44/100`,
hidden: true
},
'AQ44' : {
val: `12.00`,
val_noFormat: `12,00`,
excl_cell: `AQ44`,
formula: ``,
hidden: true
},
'AR44' : {
val: `0.70`,
val_noFormat: `0,70`,
excl_cell: `AR44`,
formula: ``,
hidden: true
},
'AS44' : {
val: `0.50`,
val_noFormat: `0,50`,
excl_cell: `AS44`,
formula: ``,
hidden: true
},
'AT44' : {
val: `116`,
val_noFormat: `116`,
excl_cell: `AT44`,
formula: `AU44+(AR44*T44*AS44)`,
hidden: true
},
'AU44' : {
val: `96`,
val_noFormat: `96`,
excl_cell: `AU44`,
formula: `AN44*T44`,
hidden: true
},
'AV44' : {
val: `140`,
val_noFormat: `140`,
excl_cell: `AV44`,
formula: ``,
hidden: true
},
'AW44' : {
val: `50`,
val_noFormat: `50`,
excl_cell: `AW44`,
formula: ``,
hidden: true
},
'AX44' : {
val: `-10`,
val_noFormat: `-10`,
excl_cell: `AX44`,
formula: ``,
hidden: true
},
'AY44' : {
val: `1.0`,
val_noFormat: `1,0`,
excl_cell: `AY44`,
formula: ``,
hidden: true
},
'AZ44' : {
val: `1.5`,
val_noFormat: `1,5`,
excl_cell: `AZ44`,
formula: ``,
hidden: true
},
'BA44' : {
val: `125`,
val_noFormat: `125`,
excl_cell: `BA44`,
formula: `(IF(AX44>0,AY44*AX44,IF(AX44<0,AZ44*AX44)))+AV44`,
hidden: true
},
'BB44' : {
val: `29`,
val_noFormat: `29`,
excl_cell: `BB44`,
formula: `BA44-AU44`,
hidden: true
},
'BC44' : {
val: `-400`,
val_noFormat: `-400`,
excl_cell: `BC44`,
formula: ``,
hidden: true
},
'BD44' : {
val: `0.8`,
val_noFormat: `0,8`,
excl_cell: `BD44`,
formula: ``,
hidden: true
},
'BE44' : {
val: `100`,
val_noFormat: `100`,
excl_cell: `BE44`,
formula: ``,
hidden: true
},
'BF44' : {
val: `64`,
val_noFormat: `64`,
excl_cell: `BF44`,
formula: `(T44*BD44*BE44*0.1)+BC44`,
hidden: true
},
'BG44' : {
val: ``,
val_noFormat: ``,
excl_cell: `BG44`,
formula: ``,
hidden: false
}
}};
