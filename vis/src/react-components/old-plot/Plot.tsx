import React, { useRef, useEffect, useState, useCallback } from "react"
import * as d3 from "d3"

interface IPlotProps {
  data: any
  id: string
  width: any,
  height:any
}

const data = [
  {
    "x": "1880",
    "sex": "F",
    "assembly": "Helen",
    "y": "636",
    "prop": "0.00651612638826278"
  },
  {
    "x": "1880",
    "sex": "F",
    "assembly": "Amanda",
    "y": "241",
    "prop": "0.00246916109995492"
  },
  {
    "x": "1880",
    "sex": "F",
    "assembly": "Betty",
    "y": "117",
    "prop": "0.00119872136387853"
  },
  {
    "x": "1880",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "112",
    "prop": "0.00114749395516577"
  },
  {
    "x": "1880",
    "sex": "F",
    "assembly": "Linda",
    "y": "27",
    "prop": "0.000276628007048891"
  },
  {
    "x": "1880",
    "sex": "F",
    "assembly": "Deborah",
    "y": "12",
    "prop": "0.000122945780910618"
  },
  {
    "x": "1880",
    "sex": "F",
    "assembly": "Jessica",
    "y": "7",
    "prop": "7.17183721978607e-05"
  },
  {
    "x": "1881",
    "sex": "F",
    "assembly": "Helen",
    "y": "612",
    "prop": "0.00619088564058469"
  },
  {
    "x": "1881",
    "sex": "F",
    "assembly": "Amanda",
    "y": "263",
    "prop": "0.0026604622932578"
  },
  {
    "x": "1881",
    "sex": "F",
    "assembly": "Betty",
    "y": "112",
    "prop": "0.00113297253553184"
  },
  {
    "x": "1881",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "109",
    "prop": "0.00110262505690152"
  },
  {
    "x": "1881",
    "sex": "F",
    "assembly": "Linda",
    "y": "38",
    "prop": "0.000384401395984017"
  },
  {
    "x": "1881",
    "sex": "F",
    "assembly": "Deborah",
    "y": "14",
    "prop": "0.00014162156694148"
  },
  {
    "x": "1881",
    "sex": "F",
    "assembly": "Jessica",
    "y": "7",
    "prop": "7.081078347074e-05"
  },
  {
    "x": "1882",
    "sex": "F",
    "assembly": "Helen",
    "y": "838",
    "prop": "0.00724311990042871"
  },
  {
    "x": "1882",
    "sex": "F",
    "assembly": "Amanda",
    "y": "288",
    "prop": "0.00248928225694925"
  },
  {
    "x": "1882",
    "sex": "F",
    "assembly": "Betty",
    "y": "123",
    "prop": "0.00106313096390541"
  },
  {
    "x": "1882",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "115",
    "prop": "0.000993984234545706"
  },
  {
    "x": "1882",
    "sex": "F",
    "assembly": "Linda",
    "y": "36",
    "prop": "0.000311160282118656"
  },
  {
    "x": "1882",
    "sex": "F",
    "assembly": "Deborah",
    "y": "15",
    "prop": "0.00012965011754944"
  },
  {
    "x": "1882",
    "sex": "F",
    "assembly": "Jessica",
    "y": "8",
    "prop": "6.91467293597013e-05"
  },
  {
    "x": "1883",
    "sex": "F",
    "assembly": "Helen",
    "y": "862",
    "prop": "0.0071798032633955"
  },
  {
    "x": "1883",
    "sex": "F",
    "assembly": "Amanda",
    "y": "287",
    "prop": "0.00239049134175697"
  },
  {
    "x": "1883",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "141",
    "prop": "0.00117442257556701"
  },
  {
    "x": "1883",
    "sex": "F",
    "assembly": "Betty",
    "y": "120",
    "prop": "0.000999508574950649"
  },
  {
    "x": "1883",
    "sex": "F",
    "assembly": "Linda",
    "y": "49",
    "prop": "0.000408132668104848"
  },
  {
    "x": "1883",
    "sex": "F",
    "assembly": "Deborah",
    "y": "16",
    "prop": "0.00013326780999342"
  },
  {
    "x": "1883",
    "sex": "F",
    "assembly": "Jessica",
    "y": "6",
    "prop": "4.99754287475325e-05"
  },
  {
    "x": "1884",
    "sex": "F",
    "assembly": "Helen",
    "y": "986",
    "prop": "0.00716642681668193"
  },
  {
    "x": "1884",
    "sex": "F",
    "assembly": "Amanda",
    "y": "337",
    "prop": "0.00244937711685782"
  },
  {
    "x": "1884",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "163",
    "prop": "0.00118471356097277"
  },
  {
    "x": "1884",
    "sex": "F",
    "assembly": "Betty",
    "y": "144",
    "prop": "0.00104661811521521"
  },
  {
    "x": "1884",
    "sex": "F",
    "assembly": "Linda",
    "y": "33",
    "prop": "0.000239849984736819"
  },
  {
    "x": "1884",
    "sex": "F",
    "assembly": "Jessica",
    "y": "14",
    "prop": "0.000101754538979257"
  },
  {
    "x": "1884",
    "sex": "F",
    "assembly": "Deborah",
    "y": "13",
    "prop": "9.44863576235954e-05"
  },
  {
    "x": "1884",
    "sex": "F",
    "assembly": "Patricia",
    "y": "6",
    "prop": "4.36090881339671e-05"
  },
  {
    "x": "1885",
    "sex": "F",
    "assembly": "Helen",
    "y": "1134",
    "prop": "0.00798878470436565"
  },
  {
    "x": "1885",
    "sex": "F",
    "assembly": "Amanda",
    "y": "339",
    "prop": "0.0023881816708818"
  },
  {
    "x": "1885",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "196",
    "prop": "0.00138077760322369"
  },
  {
    "x": "1885",
    "sex": "F",
    "assembly": "Betty",
    "y": "155",
    "prop": "0.0010919414719371"
  },
  {
    "x": "1885",
    "sex": "F",
    "assembly": "Linda",
    "y": "60",
    "prop": "0.000422687021395008"
  },
  {
    "x": "1885",
    "sex": "F",
    "assembly": "Deborah",
    "y": "10",
    "prop": "7.0447836899168e-05"
  },
  {
    "x": "1885",
    "sex": "F",
    "assembly": "Jessica",
    "y": "6",
    "prop": "4.22687021395008e-05"
  },
  {
    "x": "1885",
    "sex": "F",
    "assembly": "Patricia",
    "y": "5",
    "prop": "3.5223918449584e-05"
  },
  {
    "x": "1886",
    "sex": "F",
    "assembly": "Helen",
    "y": "1267",
    "prop": "0.00824140084300359"
  },
  {
    "x": "1886",
    "sex": "F",
    "assembly": "Amanda",
    "y": "370",
    "prop": "0.0024067232138211"
  },
  {
    "x": "1886",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "230",
    "prop": "0.00149607118696987"
  },
  {
    "x": "1886",
    "sex": "F",
    "assembly": "Betty",
    "y": "167",
    "prop": "0.00108627777488682"
  },
  {
    "x": "1886",
    "sex": "F",
    "assembly": "Linda",
    "y": "49",
    "prop": "0.000318728209397929"
  },
  {
    "x": "1886",
    "sex": "F",
    "assembly": "Jessica",
    "y": "11",
    "prop": "7.15512306811677e-05"
  },
  {
    "x": "1886",
    "sex": "F",
    "assembly": "Deborah",
    "y": "10",
    "prop": "6.50465733465161e-05"
  },
  {
    "x": "1886",
    "sex": "F",
    "assembly": "Patricia",
    "y": "8",
    "prop": "5.20372586772129e-05"
  },
  {
    "x": "1887",
    "sex": "F",
    "assembly": "Helen",
    "y": "1405",
    "prop": "0.00903990426065808"
  },
  {
    "x": "1887",
    "sex": "F",
    "assembly": "Amanda",
    "y": "338",
    "prop": "0.00217472429900529"
  },
  {
    "x": "1887",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "272",
    "prop": "0.00175007399209893"
  },
  {
    "x": "1887",
    "sex": "F",
    "assembly": "Betty",
    "y": "178",
    "prop": "0.00114526900953533"
  },
  {
    "x": "1887",
    "sex": "F",
    "assembly": "Linda",
    "y": "50",
    "prop": "0.000321704777959362"
  },
  {
    "x": "1887",
    "sex": "F",
    "assembly": "Deborah",
    "y": "15",
    "prop": "9.65114333878087e-05"
  },
  {
    "x": "1887",
    "sex": "F",
    "assembly": "Patricia",
    "y": "10",
    "prop": "6.43409555918724e-05"
  },
  {
    "x": "1887",
    "sex": "F",
    "assembly": "Jessica",
    "y": "8",
    "prop": "5.1472764473498e-05"
  },
  {
    "x": "1888",
    "sex": "F",
    "assembly": "Helen",
    "y": "1847",
    "prop": "0.0097494286000834"
  },
  {
    "x": "1888",
    "sex": "F",
    "assembly": "Amanda",
    "y": "404",
    "prop": "0.0021325225524817"
  },
  {
    "x": "1888",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "373",
    "prop": "0.00196888839622691"
  },
  {
    "x": "1888",
    "sex": "F",
    "assembly": "Betty",
    "y": "214",
    "prop": "0.00112960353027496"
  },
  {
    "x": "1888",
    "sex": "F",
    "assembly": "Linda",
    "y": "77",
    "prop": "0.000406446130052205"
  },
  {
    "x": "1888",
    "sex": "F",
    "assembly": "Deborah",
    "y": "26",
    "prop": "0.000137241550407238"
  },
  {
    "x": "1888",
    "sex": "F",
    "assembly": "Jessica",
    "y": "18",
    "prop": "9.50133810511647e-05"
  },
  {
    "x": "1888",
    "sex": "F",
    "assembly": "Patricia",
    "y": "12",
    "prop": "6.33422540341098e-05"
  },
  {
    "x": "1889",
    "sex": "F",
    "assembly": "Helen",
    "y": "1909",
    "prop": "0.010088838858677"
  },
  {
    "x": "1889",
    "sex": "F",
    "assembly": "Amanda",
    "y": "413",
    "prop": "0.00218265607576406"
  },
  {
    "x": "1889",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "377",
    "prop": "0.00199240034034637"
  },
  {
    "x": "1889",
    "sex": "F",
    "assembly": "Betty",
    "y": "189",
    "prop": "0.000998842610942876"
  },
  {
    "x": "1889",
    "sex": "F",
    "assembly": "Linda",
    "y": "74",
    "prop": "0.000391081233914142"
  },
  {
    "x": "1889",
    "sex": "F",
    "assembly": "Patricia",
    "y": "17",
    "prop": "8.9842986169465e-05"
  },
  {
    "x": "1889",
    "sex": "F",
    "assembly": "Deborah",
    "y": "12",
    "prop": "6.34185784725635e-05"
  },
  {
    "x": "1889",
    "sex": "F",
    "assembly": "Jessica",
    "y": "9",
    "prop": "4.75639338544226e-05"
  },
  {
    "x": "1890",
    "sex": "F",
    "assembly": "Helen",
    "y": "2312",
    "prop": "0.0114647849608997"
  },
  {
    "x": "1890",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "458",
    "prop": "0.00227113819727166"
  },
  {
    "x": "1890",
    "sex": "F",
    "assembly": "Amanda",
    "y": "392",
    "prop": "0.00194385627364736"
  },
  {
    "x": "1890",
    "sex": "F",
    "assembly": "Betty",
    "y": "216",
    "prop": "0.00107110447731589"
  },
  {
    "x": "1890",
    "sex": "F",
    "assembly": "Linda",
    "y": "54",
    "prop": "0.000267776119328973"
  },
  {
    "x": "1890",
    "sex": "F",
    "assembly": "Deborah",
    "y": "24",
    "prop": "0.000119011608590655"
  },
  {
    "x": "1890",
    "sex": "F",
    "assembly": "Jessica",
    "y": "18",
    "prop": "8.9258706442991e-05"
  },
  {
    "x": "1890",
    "sex": "F",
    "assembly": "Patricia",
    "y": "11",
    "prop": "5.45469872707167e-05"
  },
  {
    "x": "1891",
    "sex": "F",
    "assembly": "Helen",
    "y": "2417",
    "prop": "0.0122960619025574"
  },
  {
    "x": "1891",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "566",
    "prop": "0.00287942533589056"
  },
  {
    "x": "1891",
    "sex": "F",
    "assembly": "Amanda",
    "y": "371",
    "prop": "0.00188739717246537"
  },
  {
    "x": "1891",
    "sex": "F",
    "assembly": "Betty",
    "y": "239",
    "prop": "0.00121587041568524"
  },
  {
    "x": "1891",
    "sex": "F",
    "assembly": "Linda",
    "y": "78",
    "prop": "0.000396811265370077"
  },
  {
    "x": "1891",
    "sex": "F",
    "assembly": "Deborah",
    "y": "15",
    "prop": "7.63098587250149e-05"
  },
  {
    "x": "1891",
    "sex": "F",
    "assembly": "Jessica",
    "y": "14",
    "prop": "7.12225348100139e-05"
  },
  {
    "x": "1891",
    "sex": "F",
    "assembly": "Patricia",
    "y": "12",
    "prop": "6.10478869800119e-05"
  },
  {
    "x": "1892",
    "sex": "F",
    "assembly": "Helen",
    "y": "2936",
    "prop": "0.0130538203321255"
  },
  {
    "x": "1892",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "626",
    "prop": "0.00278327368116844"
  },
  {
    "x": "1892",
    "sex": "F",
    "assembly": "Amanda",
    "y": "455",
    "prop": "0.00202298646155214"
  },
  {
    "x": "1892",
    "sex": "F",
    "assembly": "Betty",
    "y": "255",
    "prop": "0.00113376164328746"
  },
  {
    "x": "1892",
    "sex": "F",
    "assembly": "Linda",
    "y": "83",
    "prop": "0.000369028299579841"
  },
  {
    "x": "1892",
    "sex": "F",
    "assembly": "Patricia",
    "y": "21",
    "prop": "9.33686059177912e-05"
  },
  {
    "x": "1892",
    "sex": "F",
    "assembly": "Deborah",
    "y": "16",
    "prop": "7.11379854611742e-05"
  },
  {
    "x": "1892",
    "sex": "F",
    "assembly": "Jessica",
    "y": "14",
    "prop": "6.22457372785274e-05"
  },
  {
    "x": "1893",
    "sex": "F",
    "assembly": "Helen",
    "y": "3249",
    "prop": "0.0144251260922071"
  },
  {
    "x": "1893",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "821",
    "prop": "0.00364513035447894"
  },
  {
    "x": "1893",
    "sex": "F",
    "assembly": "Amanda",
    "y": "387",
    "prop": "0.00171822831569226"
  },
  {
    "x": "1893",
    "sex": "F",
    "assembly": "Betty",
    "y": "298",
    "prop": "0.00132308020174753"
  },
  {
    "x": "1893",
    "sex": "F",
    "assembly": "Linda",
    "y": "82",
    "prop": "0.000364069048803012"
  },
  {
    "x": "1893",
    "sex": "F",
    "assembly": "Patricia",
    "y": "28",
    "prop": "0.000124316260566882"
  },
  {
    "x": "1893",
    "sex": "F",
    "assembly": "Deborah",
    "y": "24",
    "prop": "0.000106556794771613"
  },
  {
    "x": "1893",
    "sex": "F",
    "assembly": "Jessica",
    "y": "15",
    "prop": "6.65979967322583e-05"
  },
  {
    "x": "1894",
    "sex": "F",
    "assembly": "Helen",
    "y": "3676",
    "prop": "0.0155781194378994"
  },
  {
    "x": "1894",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1052",
    "prop": "0.004458156052413"
  },
  {
    "x": "1894",
    "sex": "F",
    "assembly": "Amanda",
    "y": "418",
    "prop": "0.00177139660637703"
  },
  {
    "x": "1894",
    "sex": "F",
    "assembly": "Betty",
    "y": "298",
    "prop": "0.00126286169545539"
  },
  {
    "x": "1894",
    "sex": "F",
    "assembly": "Linda",
    "y": "94",
    "prop": "0.000398352346888614"
  },
  {
    "x": "1894",
    "sex": "F",
    "assembly": "Patricia",
    "y": "36",
    "prop": "0.00015256047327649"
  },
  {
    "x": "1894",
    "sex": "F",
    "assembly": "Deborah",
    "y": "18",
    "prop": "7.62802366382452e-05"
  },
  {
    "x": "1894",
    "sex": "F",
    "assembly": "Jessica",
    "y": "10",
    "prop": "4.23779092434696e-05"
  },
  {
    "x": "1895",
    "sex": "F",
    "assembly": "Helen",
    "y": "4023",
    "prop": "0.0162803967512049"
  },
  {
    "x": "1895",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1127",
    "prop": "0.00456077731509022"
  },
  {
    "x": "1895",
    "sex": "F",
    "assembly": "Amanda",
    "y": "431",
    "prop": "0.00174418369370354"
  },
  {
    "x": "1895",
    "sex": "F",
    "assembly": "Betty",
    "y": "350",
    "prop": "0.00141639047052491"
  },
  {
    "x": "1895",
    "sex": "F",
    "assembly": "Linda",
    "y": "96",
    "prop": "0.000388495671915405"
  },
  {
    "x": "1895",
    "sex": "F",
    "assembly": "Patricia",
    "y": "35",
    "prop": "0.000141639047052491"
  },
  {
    "x": "1895",
    "sex": "F",
    "assembly": "Jessica",
    "y": "19",
    "prop": "7.68897683999239e-05"
  },
  {
    "x": "1895",
    "sex": "F",
    "assembly": "Deborah",
    "y": "13",
    "prop": "5.26087889052111e-05"
  },
  {
    "x": "1896",
    "sex": "F",
    "assembly": "Helen",
    "y": "4392",
    "prop": "0.0174290555690039"
  },
  {
    "x": "1896",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1366",
    "prop": "0.00542078549800987"
  },
  {
    "x": "1896",
    "sex": "F",
    "assembly": "Amanda",
    "y": "367",
    "prop": "0.00145638966161758"
  },
  {
    "x": "1896",
    "sex": "F",
    "assembly": "Betty",
    "y": "342",
    "prop": "0.00135718055660276"
  },
  {
    "x": "1896",
    "sex": "F",
    "assembly": "Linda",
    "y": "104",
    "prop": "0.000412709876861659"
  },
  {
    "x": "1896",
    "sex": "F",
    "assembly": "Patricia",
    "y": "37",
    "prop": "0.000146829475421936"
  },
  {
    "x": "1896",
    "sex": "F",
    "assembly": "Deborah",
    "y": "18",
    "prop": "7.14305556106717e-05"
  },
  {
    "x": "1896",
    "sex": "F",
    "assembly": "Jessica",
    "y": "9",
    "prop": "3.57152778053359e-05"
  },
  {
    "x": "1897",
    "sex": "F",
    "assembly": "Helen",
    "y": "4519",
    "prop": "0.0182015909777464"
  },
  {
    "x": "1897",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1472",
    "prop": "0.00592890947538012"
  },
  {
    "x": "1897",
    "sex": "F",
    "assembly": "Betty",
    "y": "367",
    "prop": "0.00147819957708186"
  },
  {
    "x": "1897",
    "sex": "F",
    "assembly": "Amanda",
    "y": "354",
    "prop": "0.00142583828416071"
  },
  {
    "x": "1897",
    "sex": "F",
    "assembly": "Linda",
    "y": "81",
    "prop": "0.000326251132816433"
  },
  {
    "x": "1897",
    "sex": "F",
    "assembly": "Patricia",
    "y": "49",
    "prop": "0.000197361796395126"
  },
  {
    "x": "1897",
    "sex": "F",
    "assembly": "Deborah",
    "y": "23",
    "prop": "9.26392105528144e-05"
  },
  {
    "x": "1897",
    "sex": "F",
    "assembly": "Jessica",
    "y": "9",
    "prop": "3.62501258684926e-05"
  },
  {
    "x": "1898",
    "sex": "F",
    "assembly": "Helen",
    "y": "5230",
    "prop": "0.0190774258971497"
  },
  {
    "x": "1898",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1671",
    "prop": "0.00609529228950997"
  },
  {
    "x": "1898",
    "sex": "F",
    "assembly": "Betty",
    "y": "421",
    "prop": "0.00153567806934991"
  },
  {
    "x": "1898",
    "sex": "F",
    "assembly": "Amanda",
    "y": "371",
    "prop": "0.00135329350054351"
  },
  {
    "x": "1898",
    "sex": "F",
    "assembly": "Linda",
    "y": "102",
    "prop": "0.000372064520365061"
  },
  {
    "x": "1898",
    "sex": "F",
    "assembly": "Patricia",
    "y": "47",
    "prop": "0.000171441494678018"
  },
  {
    "x": "1898",
    "sex": "F",
    "assembly": "Deborah",
    "y": "21",
    "prop": "7.6601518898689e-05"
  },
  {
    "x": "1898",
    "sex": "F",
    "assembly": "Jessica",
    "y": "13",
    "prop": "4.74199878896646e-05"
  },
  {
    "x": "1899",
    "sex": "F",
    "assembly": "Helen",
    "y": "5048",
    "prop": "0.0203967837084327"
  },
  {
    "x": "1899",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1687",
    "prop": "0.0068164370277587"
  },
  {
    "x": "1899",
    "sex": "F",
    "assembly": "Betty",
    "y": "410",
    "prop": "0.00165663259121581"
  },
  {
    "x": "1899",
    "sex": "F",
    "assembly": "Amanda",
    "y": "326",
    "prop": "0.00131722493838135"
  },
  {
    "x": "1899",
    "sex": "F",
    "assembly": "Linda",
    "y": "98",
    "prop": "0.000395975594973534"
  },
  {
    "x": "1899",
    "sex": "F",
    "assembly": "Patricia",
    "y": "56",
    "prop": "0.000226271768556305"
  },
  {
    "x": "1899",
    "sex": "F",
    "assembly": "Jessica",
    "y": "14",
    "prop": "5.65679421390763e-05"
  },
  {
    "x": "1899",
    "sex": "F",
    "assembly": "Deborah",
    "y": "11",
    "prop": "4.44462402521314e-05"
  },
  {
    "x": "1900",
    "sex": "F",
    "assembly": "Helen",
    "y": "6343",
    "prop": "0.0199606639918181"
  },
  {
    "x": "1900",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "2491",
    "prop": "0.00783887971048698"
  },
  {
    "x": "1900",
    "sex": "F",
    "assembly": "Betty",
    "y": "664",
    "prop": "0.00208952875462198"
  },
  {
    "x": "1900",
    "sex": "F",
    "assembly": "Amanda",
    "y": "377",
    "prop": "0.00118637400676579"
  },
  {
    "x": "1900",
    "sex": "F",
    "assembly": "Linda",
    "y": "126",
    "prop": "0.000396506962473448"
  },
  {
    "x": "1900",
    "sex": "F",
    "assembly": "Patricia",
    "y": "89",
    "prop": "0.000280072378255055"
  },
  {
    "x": "1900",
    "sex": "F",
    "assembly": "Deborah",
    "y": "26",
    "prop": "8.18188970183306e-05"
  },
  {
    "x": "1900",
    "sex": "F",
    "assembly": "Jessica",
    "y": "23",
    "prop": "7.2378255054677e-05"
  },
  {
    "x": "1901",
    "sex": "F",
    "assembly": "Helen",
    "y": "5247",
    "prop": "0.0206386292834891"
  },
  {
    "x": "1901",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "2173",
    "prop": "0.00854731111740458"
  },
  {
    "x": "1901",
    "sex": "F",
    "assembly": "Betty",
    "y": "474",
    "prop": "0.00186443878032663"
  },
  {
    "x": "1901",
    "sex": "F",
    "assembly": "Amanda",
    "y": "317",
    "prop": "0.00124689260203279"
  },
  {
    "x": "1901",
    "sex": "F",
    "assembly": "Linda",
    "y": "86",
    "prop": "0.000338273702759684"
  },
  {
    "x": "1901",
    "sex": "F",
    "assembly": "Patricia",
    "y": "68",
    "prop": "0.000267472230089053"
  },
  {
    "x": "1901",
    "sex": "F",
    "assembly": "Deborah",
    "y": "21",
    "prop": "8.26017181157368e-05"
  },
  {
    "x": "1901",
    "sex": "F",
    "assembly": "Jessica",
    "y": "8",
    "prop": "3.14673211869474e-05"
  },
  {
    "x": "1902",
    "sex": "F",
    "assembly": "Helen",
    "y": "5967",
    "prop": "0.0212853998637335"
  },
  {
    "x": "1902",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "2707",
    "prop": "0.00965637295644822"
  },
  {
    "x": "1902",
    "sex": "F",
    "assembly": "Betty",
    "y": "580",
    "prop": "0.00206896797736977"
  },
  {
    "x": "1902",
    "sex": "F",
    "assembly": "Amanda",
    "y": "301",
    "prop": "0.00107372303653155"
  },
  {
    "x": "1902",
    "sex": "F",
    "assembly": "Linda",
    "y": "91",
    "prop": "0.000324613941276981"
  },
  {
    "x": "1902",
    "sex": "F",
    "assembly": "Patricia",
    "y": "85",
    "prop": "0.000303210824269708"
  },
  {
    "x": "1902",
    "sex": "F",
    "assembly": "Deborah",
    "y": "21",
    "prop": "7.49109095254572e-05"
  },
  {
    "x": "1902",
    "sex": "F",
    "assembly": "Jessica",
    "y": "9",
    "prop": "3.21046755109102e-05"
  },
  {
    "x": "1903",
    "sex": "F",
    "assembly": "Helen",
    "y": "6129",
    "prop": "0.0220310713951934"
  },
  {
    "x": "1903",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "3078",
    "prop": "0.0110640622865729"
  },
  {
    "x": "1903",
    "sex": "F",
    "assembly": "Betty",
    "y": "596",
    "prop": "0.00214235903924543"
  },
  {
    "x": "1903",
    "sex": "F",
    "assembly": "Amanda",
    "y": "247",
    "prop": "0.000887856850157082"
  },
  {
    "x": "1903",
    "sex": "F",
    "assembly": "Linda",
    "y": "90",
    "prop": "0.000323510593174645"
  },
  {
    "x": "1903",
    "sex": "F",
    "assembly": "Patricia",
    "y": "79",
    "prop": "0.000283970409564411"
  },
  {
    "x": "1903",
    "sex": "F",
    "assembly": "Deborah",
    "y": "21",
    "prop": "7.54858050740839e-05"
  },
  {
    "x": "1903",
    "sex": "F",
    "assembly": "Jessica",
    "y": "16",
    "prop": "5.75129943421592e-05"
  },
  {
    "x": "1904",
    "sex": "F",
    "assembly": "Helen",
    "y": "6488",
    "prop": "0.0221858992333418"
  },
  {
    "x": "1904",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "3477",
    "prop": "0.0118896996970298"
  },
  {
    "x": "1904",
    "sex": "F",
    "assembly": "Betty",
    "y": "707",
    "prop": "0.00241760646701181"
  },
  {
    "x": "1904",
    "sex": "F",
    "assembly": "Amanda",
    "y": "294",
    "prop": "0.00100534130311382"
  },
  {
    "x": "1904",
    "sex": "F",
    "assembly": "Patricia",
    "y": "124",
    "prop": "0.000424021501993585"
  },
  {
    "x": "1904",
    "sex": "F",
    "assembly": "Linda",
    "y": "101",
    "prop": "0.000345372352430259"
  },
  {
    "x": "1904",
    "sex": "F",
    "assembly": "Deborah",
    "y": "23",
    "prop": "7.86491495633262e-05"
  },
  {
    "x": "1904",
    "sex": "F",
    "assembly": "Jessica",
    "y": "16",
    "prop": "5.471245187014e-05"
  },
  {
    "x": "1905",
    "sex": "F",
    "assembly": "Helen",
    "y": "6811",
    "prop": "0.0219801852389712"
  },
  {
    "x": "1905",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "3937",
    "prop": "0.0127053280407913"
  },
  {
    "x": "1905",
    "sex": "F",
    "assembly": "Betty",
    "y": "807",
    "prop": "0.0026043179397812"
  },
  {
    "x": "1905",
    "sex": "F",
    "assembly": "Amanda",
    "y": "311",
    "prop": "0.00100364669054765"
  },
  {
    "x": "1905",
    "sex": "F",
    "assembly": "Patricia",
    "y": "121",
    "prop": "0.000390486332978346"
  },
  {
    "x": "1905",
    "sex": "F",
    "assembly": "Linda",
    "y": "106",
    "prop": "0.000342078936328138"
  },
  {
    "x": "1905",
    "sex": "F",
    "assembly": "Deborah",
    "y": "18",
    "prop": "5.80888759802498e-05"
  },
  {
    "x": "1905",
    "sex": "F",
    "assembly": "Jessica",
    "y": "17",
    "prop": "5.48617162035692e-05"
  },
  {
    "x": "1906",
    "sex": "F",
    "assembly": "Helen",
    "y": "7176",
    "prop": "0.0228942608018734"
  },
  {
    "x": "1906",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "4326",
    "prop": "0.013801640500126"
  },
  {
    "x": "1906",
    "sex": "F",
    "assembly": "Betty",
    "y": "865",
    "prop": "0.00275969002140754"
  },
  {
    "x": "1906",
    "sex": "F",
    "assembly": "Amanda",
    "y": "260",
    "prop": "0.000829502202966427"
  },
  {
    "x": "1906",
    "sex": "F",
    "assembly": "Patricia",
    "y": "157",
    "prop": "0.000500891714868189"
  },
  {
    "x": "1906",
    "sex": "F",
    "assembly": "Linda",
    "y": "98",
    "prop": "0.000312658522656576"
  },
  {
    "x": "1906",
    "sex": "F",
    "assembly": "Deborah",
    "y": "25",
    "prop": "7.97598272083103e-05"
  },
  {
    "x": "1906",
    "sex": "F",
    "assembly": "Jessica",
    "y": "18",
    "prop": "5.74270755899834e-05"
  },
  {
    "x": "1907",
    "sex": "F",
    "assembly": "Helen",
    "y": "7579",
    "prop": "0.0224607551721379"
  },
  {
    "x": "1907",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "4967",
    "prop": "0.0147199592215343"
  },
  {
    "x": "1907",
    "sex": "F",
    "assembly": "Betty",
    "y": "1018",
    "prop": "0.00301689520586309"
  },
  {
    "x": "1907",
    "sex": "F",
    "assembly": "Amanda",
    "y": "285",
    "prop": "0.000844612115590354"
  },
  {
    "x": "1907",
    "sex": "F",
    "assembly": "Patricia",
    "y": "177",
    "prop": "0.000524548577050852"
  },
  {
    "x": "1907",
    "sex": "F",
    "assembly": "Linda",
    "y": "102",
    "prop": "0.000302282230842864"
  },
  {
    "x": "1907",
    "sex": "F",
    "assembly": "Deborah",
    "y": "21",
    "prop": "6.22345769382366e-05"
  },
  {
    "x": "1907",
    "sex": "F",
    "assembly": "Jessica",
    "y": "17",
    "prop": "5.03803718071439e-05"
  },
  {
    "x": "1908",
    "sex": "F",
    "assembly": "Helen",
    "y": "8439",
    "prop": "0.0238031438540277"
  },
  {
    "x": "1908",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "5703",
    "prop": "0.0160859496859249"
  },
  {
    "x": "1908",
    "sex": "F",
    "assembly": "Betty",
    "y": "1128",
    "prop": "0.00318165022720029"
  },
  {
    "x": "1908",
    "sex": "F",
    "assembly": "Amanda",
    "y": "260",
    "prop": "0.000733359094922052"
  },
  {
    "x": "1908",
    "sex": "F",
    "assembly": "Patricia",
    "y": "205",
    "prop": "0.000578225440227003"
  },
  {
    "x": "1908",
    "sex": "F",
    "assembly": "Linda",
    "y": "93",
    "prop": "0.000262316907029811"
  },
  {
    "x": "1908",
    "sex": "F",
    "assembly": "Deborah",
    "y": "25",
    "prop": "7.05152975886589e-05"
  },
  {
    "x": "1908",
    "sex": "F",
    "assembly": "Jessica",
    "y": "17",
    "prop": "4.7950402360288e-05"
  },
  {
    "x": "1909",
    "sex": "F",
    "assembly": "Helen",
    "y": "9250",
    "prop": "0.0251291775559769"
  },
  {
    "x": "1909",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "6253",
    "prop": "0.0169873240278404"
  },
  {
    "x": "1909",
    "sex": "F",
    "assembly": "Betty",
    "y": "1082",
    "prop": "0.00293943460708833"
  },
  {
    "x": "1909",
    "sex": "F",
    "assembly": "Amanda",
    "y": "271",
    "prop": "0.000736216985694027"
  },
  {
    "x": "1909",
    "sex": "F",
    "assembly": "Patricia",
    "y": "233",
    "prop": "0.00063298360762623"
  },
  {
    "x": "1909",
    "sex": "F",
    "assembly": "Linda",
    "y": "105",
    "prop": "0.000285250123608387"
  },
  {
    "x": "1909",
    "sex": "F",
    "assembly": "Deborah",
    "y": "26",
    "prop": "7.06333639411244e-05"
  },
  {
    "x": "1909",
    "sex": "F",
    "assembly": "Jessica",
    "y": "18",
    "prop": "4.89000211900092e-05"
  },
  {
    "x": "1910",
    "sex": "F",
    "assembly": "Helen",
    "y": "10479",
    "prop": "0.0249781896712004"
  },
  {
    "x": "1910",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "7318",
    "prop": "0.0174434957547327"
  },
  {
    "x": "1910",
    "sex": "F",
    "assembly": "Betty",
    "y": "1389",
    "prop": "0.00331087942106091"
  },
  {
    "x": "1910",
    "sex": "F",
    "assembly": "Patricia",
    "y": "316",
    "prop": "0.000753231027397587"
  },
  {
    "x": "1910",
    "sex": "F",
    "assembly": "Amanda",
    "y": "278",
    "prop": "0.000662652612710535"
  },
  {
    "x": "1910",
    "sex": "F",
    "assembly": "Linda",
    "y": "137",
    "prop": "0.000326559021371739"
  },
  {
    "x": "1910",
    "sex": "F",
    "assembly": "Deborah",
    "y": "33",
    "prop": "7.8660202228229e-05"
  },
  {
    "x": "1910",
    "sex": "F",
    "assembly": "Jessica",
    "y": "28",
    "prop": "6.67419897694064e-05"
  },
  {
    "x": "1911",
    "sex": "F",
    "assembly": "Helen",
    "y": "11802",
    "prop": "0.0267127194372267"
  },
  {
    "x": "1911",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "8869",
    "prop": "0.0200741491856265"
  },
  {
    "x": "1911",
    "sex": "F",
    "assembly": "Betty",
    "y": "1456",
    "prop": "0.00329551936117625"
  },
  {
    "x": "1911",
    "sex": "F",
    "assembly": "Patricia",
    "y": "325",
    "prop": "0.000735607000262555"
  },
  {
    "x": "1911",
    "sex": "F",
    "assembly": "Amanda",
    "y": "280",
    "prop": "0.000633753723303124"
  },
  {
    "x": "1911",
    "sex": "F",
    "assembly": "Linda",
    "y": "130",
    "prop": "0.000294242800105022"
  },
  {
    "x": "1911",
    "sex": "F",
    "assembly": "Deborah",
    "y": "36",
    "prop": "8.14826215675446e-05"
  },
  {
    "x": "1911",
    "sex": "F",
    "assembly": "Jessica",
    "y": "21",
    "prop": "4.75315292477343e-05"
  },
  {
    "x": "1912",
    "sex": "F",
    "assembly": "Helen",
    "y": "16133",
    "prop": "0.0274974944947061"
  },
  {
    "x": "1912",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "12645",
    "prop": "0.0215524588040388"
  },
  {
    "x": "1912",
    "sex": "F",
    "assembly": "Betty",
    "y": "2011",
    "prop": "0.00342759941913183"
  },
  {
    "x": "1912",
    "sex": "F",
    "assembly": "Patricia",
    "y": "504",
    "prop": "0.000859030386495497"
  },
  {
    "x": "1912",
    "sex": "F",
    "assembly": "Amanda",
    "y": "310",
    "prop": "0.000528371864709532"
  },
  {
    "x": "1912",
    "sex": "F",
    "assembly": "Linda",
    "y": "189",
    "prop": "0.000322136394935811"
  },
  {
    "x": "1912",
    "sex": "F",
    "assembly": "Jessica",
    "y": "36",
    "prop": "6.13593133211069e-05"
  },
  {
    "x": "1912",
    "sex": "F",
    "assembly": "Deborah",
    "y": "32",
    "prop": "5.45416118409839e-05"
  },
  {
    "x": "1913",
    "sex": "F",
    "assembly": "Helen",
    "y": "18889",
    "prop": "0.0288423952212843"
  },
  {
    "x": "1913",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "14674",
    "prop": "0.0224063374173925"
  },
  {
    "x": "1913",
    "sex": "F",
    "assembly": "Betty",
    "y": "2239",
    "prop": "0.00341882168989653"
  },
  {
    "x": "1913",
    "sex": "F",
    "assembly": "Patricia",
    "y": "588",
    "prop": "0.000897841515703065"
  },
  {
    "x": "1913",
    "sex": "F",
    "assembly": "Amanda",
    "y": "346",
    "prop": "0.000528321708219831"
  },
  {
    "x": "1913",
    "sex": "F",
    "assembly": "Linda",
    "y": "238",
    "prop": "0.000363412042070288"
  },
  {
    "x": "1913",
    "sex": "F",
    "assembly": "Deborah",
    "y": "42",
    "prop": "6.41315368359332e-05"
  },
  {
    "x": "1913",
    "sex": "F",
    "assembly": "Jessica",
    "y": "25",
    "prop": "3.81735338309126e-05"
  },
  {
    "x": "1914",
    "sex": "F",
    "assembly": "Helen",
    "y": "23221",
    "prop": "0.0291498453442597"
  },
  {
    "x": "1914",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "18782",
    "prop": "0.0235774684662971"
  },
  {
    "x": "1914",
    "sex": "F",
    "assembly": "Betty",
    "y": "2933",
    "prop": "0.00368186109102595"
  },
  {
    "x": "1914",
    "sex": "F",
    "assembly": "Patricia",
    "y": "656",
    "prop": "0.000823491604402667"
  },
  {
    "x": "1914",
    "sex": "F",
    "assembly": "Amanda",
    "y": "375",
    "prop": "0.000470745962882622"
  },
  {
    "x": "1914",
    "sex": "F",
    "assembly": "Linda",
    "y": "219",
    "prop": "0.000274915642323451"
  },
  {
    "x": "1914",
    "sex": "F",
    "assembly": "Deborah",
    "y": "62",
    "prop": "7.78299991965936e-05"
  },
  {
    "x": "1914",
    "sex": "F",
    "assembly": "Jessica",
    "y": "42",
    "prop": "5.27235478428537e-05"
  },
  {
    "x": "1915",
    "sex": "F",
    "assembly": "Helen",
    "y": "30866",
    "prop": "0.0301460519864594"
  },
  {
    "x": "1915",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "25154",
    "prop": "0.0245672841206311"
  },
  {
    "x": "1915",
    "sex": "F",
    "assembly": "Betty",
    "y": "4182",
    "prop": "0.00408445504462428"
  },
  {
    "x": "1915",
    "sex": "F",
    "assembly": "Patricia",
    "y": "895",
    "prop": "0.000874124166652017"
  },
  {
    "x": "1915",
    "sex": "F",
    "assembly": "Amanda",
    "y": "412",
    "prop": "0.000402390119173889"
  },
  {
    "x": "1915",
    "sex": "F",
    "assembly": "Linda",
    "y": "290",
    "prop": "0.000283235763496184"
  },
  {
    "x": "1915",
    "sex": "F",
    "assembly": "Deborah",
    "y": "106",
    "prop": "0.000103527554933088"
  },
  {
    "x": "1915",
    "sex": "F",
    "assembly": "Jessica",
    "y": "55",
    "prop": "5.37171275596211e-05"
  },
  {
    "x": "1916",
    "sex": "F",
    "assembly": "Helen",
    "y": "32661",
    "prop": "0.0300826741628504"
  },
  {
    "x": "1916",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "27415",
    "prop": "0.0252508040836026"
  },
  {
    "x": "1916",
    "sex": "F",
    "assembly": "Betty",
    "y": "5136",
    "prop": "0.00473055370320565"
  },
  {
    "x": "1916",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1078",
    "prop": "0.000992900485213335"
  },
  {
    "x": "1916",
    "sex": "F",
    "assembly": "Amanda",
    "y": "421",
    "prop": "0.000387765402852332"
  },
  {
    "x": "1916",
    "sex": "F",
    "assembly": "Linda",
    "y": "297",
    "prop": "0.000273554215313878"
  },
  {
    "x": "1916",
    "sex": "F",
    "assembly": "Deborah",
    "y": "90",
    "prop": "8.28952167617813e-05"
  },
  {
    "x": "1916",
    "sex": "F",
    "assembly": "Jessica",
    "y": "53",
    "prop": "4.8816072093049e-05"
  },
  {
    "x": "1917",
    "sex": "F",
    "assembly": "Helen",
    "y": "34249",
    "prop": "0.0304787212268021"
  },
  {
    "x": "1917",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "28853",
    "prop": "0.0256767363589279"
  },
  {
    "x": "1917",
    "sex": "F",
    "assembly": "Betty",
    "y": "6639",
    "prop": "0.00590815002554058"
  },
  {
    "x": "1917",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1441",
    "prop": "0.00128236845711763"
  },
  {
    "x": "1917",
    "sex": "F",
    "assembly": "Amanda",
    "y": "445",
    "prop": "0.000396012465938478"
  },
  {
    "x": "1917",
    "sex": "F",
    "assembly": "Linda",
    "y": "291",
    "prop": "0.000258965455254151"
  },
  {
    "x": "1917",
    "sex": "F",
    "assembly": "Deborah",
    "y": "89",
    "prop": "7.92024931876957e-05"
  },
  {
    "x": "1917",
    "sex": "F",
    "assembly": "Jessica",
    "y": "55",
    "prop": "4.89453609586883e-05"
  },
  {
    "x": "1917",
    "sex": "F",
    "assembly": "Ashley",
    "y": "5",
    "prop": "4.44957826897167e-06"
  },
  {
    "x": "1918",
    "sex": "F",
    "assembly": "Helen",
    "y": "36150",
    "prop": "0.030065795437817"
  },
  {
    "x": "1918",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "32034",
    "prop": "0.026642536405395"
  },
  {
    "x": "1918",
    "sex": "F",
    "assembly": "Betty",
    "y": "8802",
    "prop": "0.00732058454892574"
  },
  {
    "x": "1918",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1760",
    "prop": "0.0014637842315507"
  },
  {
    "x": "1918",
    "sex": "F",
    "assembly": "Amanda",
    "y": "397",
    "prop": "0.000330183147685017"
  },
  {
    "x": "1918",
    "sex": "F",
    "assembly": "Linda",
    "y": "322",
    "prop": "0.00026780597872689"
  },
  {
    "x": "1918",
    "sex": "F",
    "assembly": "Deborah",
    "y": "92",
    "prop": "7.65159939219687e-05"
  },
  {
    "x": "1918",
    "sex": "F",
    "assembly": "Jessica",
    "y": "56",
    "prop": "4.65749528220679e-05"
  },
  {
    "x": "1919",
    "sex": "F",
    "assembly": "Helen",
    "y": "33705",
    "prop": "0.0286936534286809"
  },
  {
    "x": "1919",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "31734",
    "prop": "0.0270157068062827"
  },
  {
    "x": "1919",
    "sex": "F",
    "assembly": "Betty",
    "y": "10107",
    "prop": "0.00860426510024262"
  },
  {
    "x": "1919",
    "sex": "F",
    "assembly": "Patricia",
    "y": "2144",
    "prop": "0.00182522453496786"
  },
  {
    "x": "1919",
    "sex": "F",
    "assembly": "Amanda",
    "y": "379",
    "prop": "0.000322649299791427"
  },
  {
    "x": "1919",
    "sex": "F",
    "assembly": "Linda",
    "y": "282",
    "prop": "0.000240071510662751"
  },
  {
    "x": "1919",
    "sex": "F",
    "assembly": "Deborah",
    "y": "70",
    "prop": "5.95922189588388e-05"
  },
  {
    "x": "1919",
    "sex": "F",
    "assembly": "Jessica",
    "y": "40",
    "prop": "3.40526965479079e-05"
  },
  {
    "x": "1920",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "36645",
    "prop": "0.0294564957018998"
  },
  {
    "x": "1920",
    "sex": "F",
    "assembly": "Helen",
    "y": "35098",
    "prop": "0.0282129645557451"
  },
  {
    "x": "1920",
    "sex": "F",
    "assembly": "Betty",
    "y": "14017",
    "prop": "0.011267340708242"
  },
  {
    "x": "1920",
    "sex": "F",
    "assembly": "Patricia",
    "y": "2502",
    "prop": "0.00201119258414936"
  },
  {
    "x": "1920",
    "sex": "F",
    "assembly": "Amanda",
    "y": "379",
    "prop": "0.000304653073298404"
  },
  {
    "x": "1920",
    "sex": "F",
    "assembly": "Linda",
    "y": "349",
    "prop": "0.000280538054303807"
  },
  {
    "x": "1920",
    "sex": "F",
    "assembly": "Deborah",
    "y": "82",
    "prop": "6.59143852518974e-05"
  },
  {
    "x": "1920",
    "sex": "F",
    "assembly": "Jessica",
    "y": "43",
    "prop": "3.45648605589218e-05"
  },
  {
    "x": "1921",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "39083",
    "prop": "0.0305412051909812"
  },
  {
    "x": "1921",
    "sex": "F",
    "assembly": "Helen",
    "y": "34819",
    "prop": "0.0272091247740648"
  },
  {
    "x": "1921",
    "sex": "F",
    "assembly": "Betty",
    "y": "17637",
    "prop": "0.013782341067813"
  },
  {
    "x": "1921",
    "sex": "F",
    "assembly": "Patricia",
    "y": "3382",
    "prop": "0.00264284614681315"
  },
  {
    "x": "1921",
    "sex": "F",
    "assembly": "Amanda",
    "y": "392",
    "prop": "0.000306326342268112"
  },
  {
    "x": "1921",
    "sex": "F",
    "assembly": "Linda",
    "y": "367",
    "prop": "0.000286790223501013"
  },
  {
    "x": "1921",
    "sex": "F",
    "assembly": "Deborah",
    "y": "94",
    "prop": "7.34558065642922e-05"
  },
  {
    "x": "1921",
    "sex": "F",
    "assembly": "Jessica",
    "y": "48",
    "prop": "3.75093480328301e-05"
  },
  {
    "x": "1922",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "37711",
    "prop": "0.0302285073477132"
  },
  {
    "x": "1922",
    "sex": "F",
    "assembly": "Helen",
    "y": "32507",
    "prop": "0.0260570679205567"
  },
  {
    "x": "1922",
    "sex": "F",
    "assembly": "Betty",
    "y": "20893",
    "prop": "0.0167474796217489"
  },
  {
    "x": "1922",
    "sex": "F",
    "assembly": "Patricia",
    "y": "3902",
    "prop": "0.00312777798708008"
  },
  {
    "x": "1922",
    "sex": "F",
    "assembly": "Linda",
    "y": "365",
    "prop": "0.000292577899867819"
  },
  {
    "x": "1922",
    "sex": "F",
    "assembly": "Amanda",
    "y": "341",
    "prop": "0.000273339900972401"
  },
  {
    "x": "1922",
    "sex": "F",
    "assembly": "Deborah",
    "y": "71",
    "prop": "5.69124133989456e-05"
  },
  {
    "x": "1922",
    "sex": "F",
    "assembly": "Jessica",
    "y": "40",
    "prop": "3.20633314923637e-05"
  },
  {
    "x": "1923",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "39045",
    "prop": "0.0311757435229189"
  },
  {
    "x": "1923",
    "sex": "F",
    "assembly": "Helen",
    "y": "31492",
    "prop": "0.0251449997444938"
  },
  {
    "x": "1923",
    "sex": "F",
    "assembly": "Betty",
    "y": "25990",
    "prop": "0.020751890745567"
  },
  {
    "x": "1923",
    "sex": "F",
    "assembly": "Patricia",
    "y": "4800",
    "prop": "0.00383259236547601"
  },
  {
    "x": "1923",
    "sex": "F",
    "assembly": "Linda",
    "y": "423",
    "prop": "0.000337747202207573"
  },
  {
    "x": "1923",
    "sex": "F",
    "assembly": "Amanda",
    "y": "362",
    "prop": "0.000289041340896316"
  },
  {
    "x": "1923",
    "sex": "F",
    "assembly": "Deborah",
    "y": "118",
    "prop": "9.42178956512852e-05"
  },
  {
    "x": "1923",
    "sex": "F",
    "assembly": "Jessica",
    "y": "52",
    "prop": "4.15197506259901e-05"
  },
  {
    "x": "1924",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "39996",
    "prop": "0.0308678753677503"
  },
  {
    "x": "1924",
    "sex": "F",
    "assembly": "Helen",
    "y": "31193",
    "prop": "0.0240739483034863"
  },
  {
    "x": "1924",
    "sex": "F",
    "assembly": "Betty",
    "y": "30602",
    "prop": "0.0236178298330807"
  },
  {
    "x": "1924",
    "sex": "F",
    "assembly": "Patricia",
    "y": "6958",
    "prop": "0.00537000392061223"
  },
  {
    "x": "1924",
    "sex": "F",
    "assembly": "Linda",
    "y": "454",
    "prop": "0.000350385423966363"
  },
  {
    "x": "1924",
    "sex": "F",
    "assembly": "Amanda",
    "y": "341",
    "prop": "0.000263174955005572"
  },
  {
    "x": "1924",
    "sex": "F",
    "assembly": "Deborah",
    "y": "125",
    "prop": "9.64717576999898e-05"
  },
  {
    "x": "1924",
    "sex": "F",
    "assembly": "Jessica",
    "y": "41",
    "prop": "3.16427365255967e-05"
  },
  {
    "x": "1925",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "38572",
    "prop": "0.030538871901736"
  },
  {
    "x": "1925",
    "sex": "F",
    "assembly": "Betty",
    "y": "32817",
    "prop": "0.0259824266099572"
  },
  {
    "x": "1925",
    "sex": "F",
    "assembly": "Helen",
    "y": "29168",
    "prop": "0.023093379021825"
  },
  {
    "x": "1925",
    "sex": "F",
    "assembly": "Patricia",
    "y": "8095",
    "prop": "0.00640910940694163"
  },
  {
    "x": "1925",
    "sex": "F",
    "assembly": "Linda",
    "y": "438",
    "prop": "0.000346780718992024"
  },
  {
    "x": "1925",
    "sex": "F",
    "assembly": "Amanda",
    "y": "310",
    "prop": "0.000245438408419012"
  },
  {
    "x": "1925",
    "sex": "F",
    "assembly": "Deborah",
    "y": "82",
    "prop": "6.49224177108356e-05"
  },
  {
    "x": "1925",
    "sex": "F",
    "assembly": "Jessica",
    "y": "34",
    "prop": "2.69190512459562e-05"
  },
  {
    "x": "1926",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "36614",
    "prop": "0.0297646484033633"
  },
  {
    "x": "1926",
    "sex": "F",
    "assembly": "Betty",
    "y": "32959",
    "prop": "0.026793386320163"
  },
  {
    "x": "1926",
    "sex": "F",
    "assembly": "Helen",
    "y": "26884",
    "prop": "0.0218548316948713"
  },
  {
    "x": "1926",
    "sex": "F",
    "assembly": "Patricia",
    "y": "8590",
    "prop": "0.0069830755936224"
  },
  {
    "x": "1926",
    "sex": "F",
    "assembly": "Linda",
    "y": "479",
    "prop": "0.000389393854405719"
  },
  {
    "x": "1926",
    "sex": "F",
    "assembly": "Amanda",
    "y": "310",
    "prop": "0.000252008548780319"
  },
  {
    "x": "1926",
    "sex": "F",
    "assembly": "Deborah",
    "y": "116",
    "prop": "9.42999730919904e-05"
  },
  {
    "x": "1926",
    "sex": "F",
    "assembly": "Jessica",
    "y": "35",
    "prop": "2.84525780881006e-05"
  },
  {
    "x": "1927",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "35987",
    "prop": "0.0291075004772119"
  },
  {
    "x": "1927",
    "sex": "F",
    "assembly": "Betty",
    "y": "35422",
    "prop": "0.0286505094035013"
  },
  {
    "x": "1927",
    "sex": "F",
    "assembly": "Helen",
    "y": "25316",
    "prop": "0.0204764354372717"
  },
  {
    "x": "1927",
    "sex": "F",
    "assembly": "Patricia",
    "y": "10553",
    "prop": "0.00853562265640418"
  },
  {
    "x": "1927",
    "sex": "F",
    "assembly": "Linda",
    "y": "516",
    "prop": "0.000417358219530423"
  },
  {
    "x": "1927",
    "sex": "F",
    "assembly": "Amanda",
    "y": "234",
    "prop": "0.000189267099554494"
  },
  {
    "x": "1927",
    "sex": "F",
    "assembly": "Deborah",
    "y": "91",
    "prop": "7.360387204897e-05"
  },
  {
    "x": "1927",
    "sex": "F",
    "assembly": "Jessica",
    "y": "39",
    "prop": "3.15445165924157e-05"
  },
  {
    "x": "1928",
    "sex": "F",
    "assembly": "Betty",
    "y": "36078",
    "prop": "0.0301810713703117"
  },
  {
    "x": "1928",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "33728",
    "prop": "0.0282151775369442"
  },
  {
    "x": "1928",
    "sex": "F",
    "assembly": "Helen",
    "y": "22936",
    "prop": "0.0191871238136667"
  },
  {
    "x": "1928",
    "sex": "F",
    "assembly": "Patricia",
    "y": "12332",
    "prop": "0.0103163415970587"
  },
  {
    "x": "1928",
    "sex": "F",
    "assembly": "Linda",
    "y": "554",
    "prop": "0.000463449014334294"
  },
  {
    "x": "1928",
    "sex": "F",
    "assembly": "Amanda",
    "y": "247",
    "prop": "0.000206627990145434"
  },
  {
    "x": "1928",
    "sex": "F",
    "assembly": "Deborah",
    "y": "130",
    "prop": "0.000108751573760755"
  },
  {
    "x": "1928",
    "sex": "F",
    "assembly": "Jessica",
    "y": "36",
    "prop": "3.01158204260552e-05"
  },
  {
    "x": "1929",
    "sex": "F",
    "assembly": "Betty",
    "y": "36669",
    "prop": "0.0316800016587745"
  },
  {
    "x": "1929",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "31477",
    "prop": "0.0271943988713422"
  },
  {
    "x": "1929",
    "sex": "F",
    "assembly": "Helen",
    "y": "20983",
    "prop": "0.0181281593391166"
  },
  {
    "x": "1929",
    "sex": "F",
    "assembly": "Patricia",
    "y": "13626",
    "prop": "0.0117721154818092"
  },
  {
    "x": "1929",
    "sex": "F",
    "assembly": "Linda",
    "y": "509",
    "prop": "0.000439748039060684"
  },
  {
    "x": "1929",
    "sex": "F",
    "assembly": "Amanda",
    "y": "209",
    "prop": "0.000180564518985625"
  },
  {
    "x": "1929",
    "sex": "F",
    "assembly": "Deborah",
    "y": "161",
    "prop": "0.000139095155773615"
  },
  {
    "x": "1929",
    "sex": "F",
    "assembly": "Jessica",
    "y": "42",
    "prop": "3.62856928105083e-05"
  },
  {
    "x": "1930",
    "sex": "F",
    "assembly": "Betty",
    "y": "38239",
    "prop": "0.0327853532062582"
  },
  {
    "x": "1930",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "30404",
    "prop": "0.0260677810320111"
  },
  {
    "x": "1930",
    "sex": "F",
    "assembly": "Helen",
    "y": "19914",
    "prop": "0.0170738650003772"
  },
  {
    "x": "1930",
    "sex": "F",
    "assembly": "Patricia",
    "y": "15749",
    "prop": "0.0135028773672261"
  },
  {
    "x": "1930",
    "sex": "F",
    "assembly": "Linda",
    "y": "493",
    "prop": "0.000422688332087274"
  },
  {
    "x": "1930",
    "sex": "F",
    "assembly": "Amanda",
    "y": "196",
    "prop": "0.00016804647685417"
  },
  {
    "x": "1930",
    "sex": "F",
    "assembly": "Deborah",
    "y": "165",
    "prop": "0.000141467697351725"
  },
  {
    "x": "1930",
    "sex": "F",
    "assembly": "Jessica",
    "y": "38",
    "prop": "3.25804393900942e-05"
  },
  {
    "x": "1931",
    "sex": "F",
    "assembly": "Betty",
    "y": "36102",
    "prop": "0.0327140362625423"
  },
  {
    "x": "1931",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "26521",
    "prop": "0.0240321576566086"
  },
  {
    "x": "1931",
    "sex": "F",
    "assembly": "Helen",
    "y": "17657",
    "prop": "0.0159999927507537"
  },
  {
    "x": "1931",
    "sex": "F",
    "assembly": "Patricia",
    "y": "16468",
    "prop": "0.0149225735186845"
  },
  {
    "x": "1931",
    "sex": "F",
    "assembly": "Linda",
    "y": "534",
    "prop": "0.000483887190853626"
  },
  {
    "x": "1931",
    "sex": "F",
    "assembly": "Amanda",
    "y": "209",
    "prop": "0.00018938655971612"
  },
  {
    "x": "1931",
    "sex": "F",
    "assembly": "Deborah",
    "y": "158",
    "prop": "0.000143172614522234"
  },
  {
    "x": "1931",
    "sex": "F",
    "assembly": "Jessica",
    "y": "39",
    "prop": "3.53400757365008e-05"
  },
  {
    "x": "1932",
    "sex": "F",
    "assembly": "Betty",
    "y": "34411",
    "prop": "0.0311083227035339"
  },
  {
    "x": "1932",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "24968",
    "prop": "0.0225716370132177"
  },
  {
    "x": "1932",
    "sex": "F",
    "assembly": "Patricia",
    "y": "17991",
    "prop": "0.0162642711272349"
  },
  {
    "x": "1932",
    "sex": "F",
    "assembly": "Helen",
    "y": "16375",
    "prop": "0.0148033705579718"
  },
  {
    "x": "1932",
    "sex": "F",
    "assembly": "Linda",
    "y": "774",
    "prop": "0.000699713515228713"
  },
  {
    "x": "1932",
    "sex": "F",
    "assembly": "Amanda",
    "y": "213",
    "prop": "0.00019255682008232"
  },
  {
    "x": "1932",
    "sex": "F",
    "assembly": "Deborah",
    "y": "208",
    "prop": "0.000188036706934848"
  },
  {
    "x": "1932",
    "sex": "F",
    "assembly": "Jessica",
    "y": "44",
    "prop": "3.97769956977563e-05"
  },
  {
    "x": "1933",
    "sex": "F",
    "assembly": "Betty",
    "y": "31526",
    "prop": "0.0301434985810775"
  },
  {
    "x": "1933",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "22050",
    "prop": "0.0210830471265862"
  },
  {
    "x": "1933",
    "sex": "F",
    "assembly": "Patricia",
    "y": "18625",
    "prop": "0.017808242754316"
  },
  {
    "x": "1933",
    "sex": "F",
    "assembly": "Helen",
    "y": "14645",
    "prop": "0.0140027766516488"
  },
  {
    "x": "1933",
    "sex": "F",
    "assembly": "Linda",
    "y": "786",
    "prop": "0.000751531747913687"
  },
  {
    "x": "1933",
    "sex": "F",
    "assembly": "Deborah",
    "y": "243",
    "prop": "0.000232343784660338"
  },
  {
    "x": "1933",
    "sex": "F",
    "assembly": "Amanda",
    "y": "199",
    "prop": "0.000190273305133363"
  },
  {
    "x": "1933",
    "sex": "F",
    "assembly": "Jessica",
    "y": "43",
    "prop": "4.11143322649981e-05"
  },
  {
    "x": "1934",
    "sex": "F",
    "assembly": "Betty",
    "y": "31078",
    "prop": "0.0287181174191951"
  },
  {
    "x": "1934",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "21280",
    "prop": "0.0196641205573226"
  },
  {
    "x": "1934",
    "sex": "F",
    "assembly": "Patricia",
    "y": "20847",
    "prop": "0.0192640000591402"
  },
  {
    "x": "1934",
    "sex": "F",
    "assembly": "Helen",
    "y": "14099",
    "prop": "0.0130284039350419"
  },
  {
    "x": "1934",
    "sex": "F",
    "assembly": "Linda",
    "y": "1001",
    "prop": "0.000924989881479318"
  },
  {
    "x": "1934",
    "sex": "F",
    "assembly": "Deborah",
    "y": "280",
    "prop": "0.000258738428385823"
  },
  {
    "x": "1934",
    "sex": "F",
    "assembly": "Amanda",
    "y": "189",
    "prop": "0.000174648439160431"
  },
  {
    "x": "1934",
    "sex": "F",
    "assembly": "Jessica",
    "y": "46",
    "prop": "4.25070275205281e-05"
  },
  {
    "x": "1935",
    "sex": "F",
    "assembly": "Betty",
    "y": "28673",
    "prop": "0.0263859454097216"
  },
  {
    "x": "1935",
    "sex": "F",
    "assembly": "Patricia",
    "y": "22876",
    "prop": "0.0210513335609385"
  },
  {
    "x": "1935",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "19400",
    "prop": "0.0178525909722944"
  },
  {
    "x": "1935",
    "sex": "F",
    "assembly": "Helen",
    "y": "12778",
    "prop": "0.0117587838888649"
  },
  {
    "x": "1935",
    "sex": "F",
    "assembly": "Linda",
    "y": "1197",
    "prop": "0.00110152326772353"
  },
  {
    "x": "1935",
    "sex": "F",
    "assembly": "Deborah",
    "y": "279",
    "prop": "0.00025674602480774"
  },
  {
    "x": "1935",
    "sex": "F",
    "assembly": "Amanda",
    "y": "211",
    "prop": "0.000194169932739903"
  },
  {
    "x": "1935",
    "sex": "F",
    "assembly": "Jessica",
    "y": "47",
    "prop": "4.32511224586515e-05"
  },
  {
    "x": "1936",
    "sex": "F",
    "assembly": "Betty",
    "y": "25863",
    "prop": "0.0240043659489396"
  },
  {
    "x": "1936",
    "sex": "F",
    "assembly": "Patricia",
    "y": "23912",
    "prop": "0.022193573776091"
  },
  {
    "x": "1936",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "17668",
    "prop": "0.0163982963146528"
  },
  {
    "x": "1936",
    "sex": "F",
    "assembly": "Helen",
    "y": "12232",
    "prop": "0.0113529522594992"
  },
  {
    "x": "1936",
    "sex": "F",
    "assembly": "Linda",
    "y": "2439",
    "prop": "0.0022637222499116"
  },
  {
    "x": "1936",
    "sex": "F",
    "assembly": "Deborah",
    "y": "299",
    "prop": "0.00027751248574152"
  },
  {
    "x": "1936",
    "sex": "F",
    "assembly": "Amanda",
    "y": "192",
    "prop": "0.000178201997533016"
  },
  {
    "x": "1936",
    "sex": "F",
    "assembly": "Jessica",
    "y": "43",
    "prop": "3.99098223641651e-05"
  },
  {
    "x": "1937",
    "sex": "F",
    "assembly": "Patricia",
    "y": "26837",
    "prop": "0.0243591174914203"
  },
  {
    "x": "1937",
    "sex": "F",
    "assembly": "Betty",
    "y": "25328",
    "prop": "0.0229894447152324"
  },
  {
    "x": "1937",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "16571",
    "prop": "0.0150409858013312"
  },
  {
    "x": "1937",
    "sex": "F",
    "assembly": "Helen",
    "y": "11452",
    "prop": "0.0103946273246542"
  },
  {
    "x": "1937",
    "sex": "F",
    "assembly": "Linda",
    "y": "4380",
    "prop": "0.00397559096070428"
  },
  {
    "x": "1937",
    "sex": "F",
    "assembly": "Deborah",
    "y": "323",
    "prop": "0.000293177141622713"
  },
  {
    "x": "1937",
    "sex": "F",
    "assembly": "Amanda",
    "y": "176",
    "prop": "0.00015974977376346"
  },
  {
    "x": "1937",
    "sex": "F",
    "assembly": "Jessica",
    "y": "72",
    "prop": "6.53521801759607e-05"
  },
  {
    "x": "1938",
    "sex": "F",
    "assembly": "Patricia",
    "y": "27555",
    "prop": "0.0241429070846355"
  },
  {
    "x": "1938",
    "sex": "F",
    "assembly": "Betty",
    "y": "25502",
    "prop": "0.0223441268906687"
  },
  {
    "x": "1938",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "16348",
    "prop": "0.0143236525138676"
  },
  {
    "x": "1938",
    "sex": "F",
    "assembly": "Helen",
    "y": "10833",
    "prop": "0.00949156641073696"
  },
  {
    "x": "1938",
    "sex": "F",
    "assembly": "Linda",
    "y": "7047",
    "prop": "0.00617438091908643"
  },
  {
    "x": "1938",
    "sex": "F",
    "assembly": "Deborah",
    "y": "410",
    "prop": "0.000359230335862841"
  },
  {
    "x": "1938",
    "sex": "F",
    "assembly": "Amanda",
    "y": "192",
    "prop": "0.000168224937769916"
  },
  {
    "x": "1938",
    "sex": "F",
    "assembly": "Jessica",
    "y": "50",
    "prop": "4.38085775442489e-05"
  },
  {
    "x": "1938",
    "sex": "F",
    "assembly": "Ashley",
    "y": "7",
    "prop": "6.13320085619484e-06"
  },
  {
    "x": "1939",
    "sex": "F",
    "assembly": "Patricia",
    "y": "29704",
    "prop": "0.0261941652197148"
  },
  {
    "x": "1939",
    "sex": "F",
    "assembly": "Betty",
    "y": "23639",
    "prop": "0.0208458076901709"
  },
  {
    "x": "1939",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "15170",
    "prop": "0.0133775076212993"
  },
  {
    "x": "1939",
    "sex": "F",
    "assembly": "Linda",
    "y": "10714",
    "prop": "0.00944803010247859"
  },
  {
    "x": "1939",
    "sex": "F",
    "assembly": "Helen",
    "y": "10417",
    "prop": "0.00918612372386778"
  },
  {
    "x": "1939",
    "sex": "F",
    "assembly": "Deborah",
    "y": "443",
    "prop": "0.000390654968769648"
  },
  {
    "x": "1939",
    "sex": "F",
    "assembly": "Amanda",
    "y": "185",
    "prop": "0.000163140336845113"
  },
  {
    "x": "1939",
    "sex": "F",
    "assembly": "Jessica",
    "y": "77",
    "prop": "6.79016537139118e-05"
  },
  {
    "x": "1940",
    "sex": "F",
    "assembly": "Patricia",
    "y": "32661",
    "prop": "0.027650413304301"
  },
  {
    "x": "1940",
    "sex": "F",
    "assembly": "Betty",
    "y": "22074",
    "prop": "0.0186875852937491"
  },
  {
    "x": "1940",
    "sex": "F",
    "assembly": "Linda",
    "y": "18368",
    "prop": "0.0155501298666116"
  },
  {
    "x": "1940",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "14874",
    "prop": "0.0125921511125861"
  },
  {
    "x": "1940",
    "sex": "F",
    "assembly": "Helen",
    "y": "10201",
    "prop": "0.00863604501139508"
  },
  {
    "x": "1940",
    "sex": "F",
    "assembly": "Deborah",
    "y": "469",
    "prop": "0.000397049809856317"
  },
  {
    "x": "1940",
    "sex": "F",
    "assembly": "Amanda",
    "y": "218",
    "prop": "0.000184556201596326"
  },
  {
    "x": "1940",
    "sex": "F",
    "assembly": "Jessica",
    "y": "61",
    "prop": "5.16418729237427e-05"
  },
  {
    "x": "1941",
    "sex": "F",
    "assembly": "Patricia",
    "y": "36901",
    "prop": "0.0296201340816562"
  },
  {
    "x": "1941",
    "sex": "F",
    "assembly": "Linda",
    "y": "23715",
    "prop": "0.0190358385882897"
  },
  {
    "x": "1941",
    "sex": "F",
    "assembly": "Betty",
    "y": "20900",
    "prop": "0.0167762608684484"
  },
  {
    "x": "1941",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "14561",
    "prop": "0.0116879968662908"
  },
  {
    "x": "1941",
    "sex": "F",
    "assembly": "Helen",
    "y": "9889",
    "prop": "0.00793782027407113"
  },
  {
    "x": "1941",
    "sex": "F",
    "assembly": "Deborah",
    "y": "608",
    "prop": "0.000488036679809409"
  },
  {
    "x": "1941",
    "sex": "F",
    "assembly": "Amanda",
    "y": "223",
    "prop": "0.000179000295390622"
  },
  {
    "x": "1941",
    "sex": "F",
    "assembly": "Jessica",
    "y": "81",
    "prop": "6.50180445140824e-05"
  },
  {
    "x": "1941",
    "sex": "F",
    "assembly": "Ashley",
    "y": "6",
    "prop": "4.81615144548759e-06"
  },
  {
    "x": "1942",
    "sex": "F",
    "assembly": "Patricia",
    "y": "39454",
    "prop": "0.0283767212206867"
  },
  {
    "x": "1942",
    "sex": "F",
    "assembly": "Linda",
    "y": "31611",
    "prop": "0.0227357564380576"
  },
  {
    "x": "1942",
    "sex": "F",
    "assembly": "Betty",
    "y": "21654",
    "prop": "0.0155743276046218"
  },
  {
    "x": "1942",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "15032",
    "prop": "0.0108115494852071"
  },
  {
    "x": "1942",
    "sex": "F",
    "assembly": "Helen",
    "y": "10013",
    "prop": "0.00720170602683468"
  },
  {
    "x": "1942",
    "sex": "F",
    "assembly": "Deborah",
    "y": "676",
    "prop": "0.000486203263171901"
  },
  {
    "x": "1942",
    "sex": "F",
    "assembly": "Amanda",
    "y": "295",
    "prop": "0.000212174500940401"
  },
  {
    "x": "1942",
    "sex": "F",
    "assembly": "Jessica",
    "y": "127",
    "prop": "9.13429207438335e-05"
  },
  {
    "x": "1942",
    "sex": "F",
    "assembly": "Ashley",
    "y": "8",
    "prop": "5.7538847712651e-06"
  },
  {
    "x": "1943",
    "sex": "F",
    "assembly": "Patricia",
    "y": "39620",
    "prop": "0.0276053892520138"
  },
  {
    "x": "1943",
    "sex": "F",
    "assembly": "Linda",
    "y": "38437",
    "prop": "0.0267811293962558"
  },
  {
    "x": "1943",
    "sex": "F",
    "assembly": "Betty",
    "y": "21595",
    "prop": "0.0150464003255234"
  },
  {
    "x": "1943",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "14785",
    "prop": "0.0103015063122419"
  },
  {
    "x": "1943",
    "sex": "F",
    "assembly": "Helen",
    "y": "9799",
    "prop": "0.00682749140031507"
  },
  {
    "x": "1943",
    "sex": "F",
    "assembly": "Deborah",
    "y": "788",
    "prop": "0.000549042067909815"
  },
  {
    "x": "1943",
    "sex": "F",
    "assembly": "Amanda",
    "y": "284",
    "prop": "0.000197878105693385"
  },
  {
    "x": "1943",
    "sex": "F",
    "assembly": "Jessica",
    "y": "121",
    "prop": "8.43072210876746e-05"
  },
  {
    "x": "1943",
    "sex": "F",
    "assembly": "Ashley",
    "y": "10",
    "prop": "6.96753893286567e-06"
  },
  {
    "x": "1944",
    "sex": "F",
    "assembly": "Linda",
    "y": "38411",
    "prop": "0.0281104982403037"
  },
  {
    "x": "1944",
    "sex": "F",
    "assembly": "Patricia",
    "y": "36872",
    "prop": "0.0269842048141543"
  },
  {
    "x": "1944",
    "sex": "F",
    "assembly": "Betty",
    "y": "19757",
    "prop": "0.0144588558937201"
  },
  {
    "x": "1944",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "13378",
    "prop": "0.00979048307669114"
  },
  {
    "x": "1944",
    "sex": "F",
    "assembly": "Helen",
    "y": "8693",
    "prop": "0.00636183804647003"
  },
  {
    "x": "1944",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1293",
    "prop": "0.000946262118265933"
  },
  {
    "x": "1944",
    "sex": "F",
    "assembly": "Amanda",
    "y": "238",
    "prop": "0.000174176631204402"
  },
  {
    "x": "1944",
    "sex": "F",
    "assembly": "Jessica",
    "y": "124",
    "prop": "9.07474885266633e-05"
  },
  {
    "x": "1944",
    "sex": "F",
    "assembly": "Ashley",
    "y": "12",
    "prop": "8.78201501870935e-06"
  },
  {
    "x": "1945",
    "sex": "F",
    "assembly": "Linda",
    "y": "41464",
    "prop": "0.0308041820109342"
  },
  {
    "x": "1945",
    "sex": "F",
    "assembly": "Patricia",
    "y": "35840",
    "prop": "0.0266260342290151"
  },
  {
    "x": "1945",
    "sex": "F",
    "assembly": "Betty",
    "y": "18383",
    "prop": "0.0136569862508924"
  },
  {
    "x": "1945",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "12328",
    "prop": "0.00915864257743577"
  },
  {
    "x": "1945",
    "sex": "F",
    "assembly": "Helen",
    "y": "8300",
    "prop": "0.00616618538227749"
  },
  {
    "x": "1945",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1464",
    "prop": "0.00108762595176557"
  },
  {
    "x": "1945",
    "sex": "F",
    "assembly": "Amanda",
    "y": "280",
    "prop": "0.00020801589241418"
  },
  {
    "x": "1945",
    "sex": "F",
    "assembly": "Jessica",
    "y": "132",
    "prop": "9.80646349952565e-05"
  },
  {
    "x": "1945",
    "sex": "F",
    "assembly": "Ashley",
    "y": "10",
    "prop": "7.42913901479216e-06"
  },
  {
    "x": "1946",
    "sex": "F",
    "assembly": "Linda",
    "y": "52708",
    "prop": "0.0326804234293612"
  },
  {
    "x": "1946",
    "sex": "F",
    "assembly": "Patricia",
    "y": "46295",
    "prop": "0.028704185373421"
  },
  {
    "x": "1946",
    "sex": "F",
    "assembly": "Betty",
    "y": "19714",
    "prop": "0.012223227356121"
  },
  {
    "x": "1946",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "12796",
    "prop": "0.00793387527893499"
  },
  {
    "x": "1946",
    "sex": "F",
    "assembly": "Helen",
    "y": "8852",
    "prop": "0.00548848577439298"
  },
  {
    "x": "1946",
    "sex": "F",
    "assembly": "Deborah",
    "y": "2470",
    "prop": "0.00153146857916297"
  },
  {
    "x": "1946",
    "sex": "F",
    "assembly": "Amanda",
    "y": "274",
    "prop": "0.000169887607567067"
  },
  {
    "x": "1946",
    "sex": "F",
    "assembly": "Jessica",
    "y": "240",
    "prop": "0.000148806663562394"
  },
  {
    "x": "1946",
    "sex": "F",
    "assembly": "Ashley",
    "y": "7",
    "prop": "4.34019435390317e-06"
  },
  {
    "x": "1947",
    "sex": "F",
    "assembly": "Linda",
    "y": "99680",
    "prop": "0.0548360886157353"
  },
  {
    "x": "1947",
    "sex": "F",
    "assembly": "Patricia",
    "y": "51274",
    "prop": "0.0282069182151205"
  },
  {
    "x": "1947",
    "sex": "F",
    "assembly": "Betty",
    "y": "18962",
    "prop": "0.0104313996020423"
  },
  {
    "x": "1947",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "12751",
    "prop": "0.00701459636776927"
  },
  {
    "x": "1947",
    "sex": "F",
    "assembly": "Helen",
    "y": "8978",
    "prop": "0.00493898880008098"
  },
  {
    "x": "1947",
    "sex": "F",
    "assembly": "Deborah",
    "y": "5838",
    "prop": "0.00321160799898338"
  },
  {
    "x": "1947",
    "sex": "F",
    "assembly": "Jessica",
    "y": "430",
    "prop": "0.000236552147921009"
  },
  {
    "x": "1947",
    "sex": "F",
    "assembly": "Amanda",
    "y": "310",
    "prop": "0.000170537595012821"
  },
  {
    "x": "1947",
    "sex": "F",
    "assembly": "Ashley",
    "y": "11",
    "prop": "6.05133401658396e-06"
  },
  {
    "x": "1948",
    "sex": "F",
    "assembly": "Linda",
    "y": "96211",
    "prop": "0.0552115905834257"
  },
  {
    "x": "1948",
    "sex": "F",
    "assembly": "Patricia",
    "y": "46135",
    "prop": "0.0264750052651604"
  },
  {
    "x": "1948",
    "sex": "F",
    "assembly": "Betty",
    "y": "16622",
    "prop": "0.00953869161195395"
  },
  {
    "x": "1948",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "11326",
    "prop": "0.00649953201762667"
  },
  {
    "x": "1948",
    "sex": "F",
    "assembly": "Deborah",
    "y": "11246",
    "prop": "0.00645362326242535"
  },
  {
    "x": "1948",
    "sex": "F",
    "assembly": "Helen",
    "y": "8305",
    "prop": "0.00476590264933688"
  },
  {
    "x": "1948",
    "sex": "F",
    "assembly": "Jessica",
    "y": "482",
    "prop": "0.000276600250087944"
  },
  {
    "x": "1948",
    "sex": "F",
    "assembly": "Amanda",
    "y": "306",
    "prop": "0.000175600988645043"
  },
  {
    "x": "1948",
    "sex": "F",
    "assembly": "Ashley",
    "y": "13",
    "prop": "7.46017272021426e-06"
  },
  {
    "x": "1949",
    "sex": "F",
    "assembly": "Linda",
    "y": "91010",
    "prop": "0.0518428093664536"
  },
  {
    "x": "1949",
    "sex": "F",
    "assembly": "Patricia",
    "y": "46337",
    "prop": "0.0263953440019049"
  },
  {
    "x": "1949",
    "sex": "F",
    "assembly": "Deborah",
    "y": "19208",
    "prop": "0.0109416183090962"
  },
  {
    "x": "1949",
    "sex": "F",
    "assembly": "Betty",
    "y": "14946",
    "prop": "0.00851381857807951"
  },
  {
    "x": "1949",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "10406",
    "prop": "0.00592765931510072"
  },
  {
    "x": "1949",
    "sex": "F",
    "assembly": "Helen",
    "y": "7709",
    "prop": "0.00439134399962632"
  },
  {
    "x": "1949",
    "sex": "F",
    "assembly": "Jessica",
    "y": "406",
    "prop": "0.000231273273297222"
  },
  {
    "x": "1949",
    "sex": "F",
    "assembly": "Amanda",
    "y": "333",
    "prop": "0.000189689655192056"
  },
  {
    "x": "1949",
    "sex": "F",
    "assembly": "Ashley",
    "y": "11",
    "prop": "6.26602464598385e-06"
  },
  {
    "x": "1950",
    "sex": "F",
    "assembly": "Linda",
    "y": "80439",
    "prop": "0.0457319621154536"
  },
  {
    "x": "1950",
    "sex": "F",
    "assembly": "Patricia",
    "y": "47952",
    "prop": "0.0272621371145866"
  },
  {
    "x": "1950",
    "sex": "F",
    "assembly": "Deborah",
    "y": "29073",
    "prop": "0.0165288645381293"
  },
  {
    "x": "1950",
    "sex": "F",
    "assembly": "Betty",
    "y": "13614",
    "prop": "0.00773996360272735"
  },
  {
    "x": "1950",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "9555",
    "prop": "0.00543230147084324"
  },
  {
    "x": "1950",
    "sex": "F",
    "assembly": "Helen",
    "y": "7060",
    "prop": "0.0040138198204242"
  },
  {
    "x": "1950",
    "sex": "F",
    "assembly": "Jessica",
    "y": "402",
    "prop": "0.000228548947281945"
  },
  {
    "x": "1950",
    "sex": "F",
    "assembly": "Amanda",
    "y": "379",
    "prop": "0.000215472763730988"
  },
  {
    "x": "1950",
    "sex": "F",
    "assembly": "Ashley",
    "y": "15",
    "prop": "8.52794579410241e-06"
  },
  {
    "x": "1951",
    "sex": "F",
    "assembly": "Linda",
    "y": "73947",
    "prop": "0.0400434945769865"
  },
  {
    "x": "1951",
    "sex": "F",
    "assembly": "Patricia",
    "y": "56433",
    "prop": "0.0305593807654547"
  },
  {
    "x": "1951",
    "sex": "F",
    "assembly": "Deborah",
    "y": "42045",
    "prop": "0.0227680464317606"
  },
  {
    "x": "1951",
    "sex": "F",
    "assembly": "Betty",
    "y": "12820",
    "prop": "0.00694223701403664"
  },
  {
    "x": "1951",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "9082",
    "prop": "0.00491804965378165"
  },
  {
    "x": "1951",
    "sex": "F",
    "assembly": "Helen",
    "y": "6945",
    "prop": "0.00376082964605963"
  },
  {
    "x": "1951",
    "sex": "F",
    "assembly": "Jessica",
    "y": "466",
    "prop": "0.000252346524847198"
  },
  {
    "x": "1951",
    "sex": "F",
    "assembly": "Amanda",
    "y": "409",
    "prop": "0.000221480104425974"
  },
  {
    "x": "1951",
    "sex": "F",
    "assembly": "Ashley",
    "y": "15",
    "prop": "8.12274221611151e-06"
  },
  {
    "x": "1952",
    "sex": "F",
    "assembly": "Linda",
    "y": "67092",
    "prop": "0.0352717589878795"
  },
  {
    "x": "1952",
    "sex": "F",
    "assembly": "Patricia",
    "y": "53090",
    "prop": "0.0279105956696256"
  },
  {
    "x": "1952",
    "sex": "F",
    "assembly": "Deborah",
    "y": "49809",
    "prop": "0.0261857008797962"
  },
  {
    "x": "1952",
    "sex": "F",
    "assembly": "Betty",
    "y": "12125",
    "prop": "0.00637438260490131"
  },
  {
    "x": "1952",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "8608",
    "prop": "0.00452541735777241"
  },
  {
    "x": "1952",
    "sex": "F",
    "assembly": "Helen",
    "y": "6470",
    "prop": "0.00340142313020301"
  },
  {
    "x": "1952",
    "sex": "F",
    "assembly": "Jessica",
    "y": "452",
    "prop": "0.000237626469065187"
  },
  {
    "x": "1952",
    "sex": "F",
    "assembly": "Amanda",
    "y": "418",
    "prop": "0.000219751911657629"
  },
  {
    "x": "1952",
    "sex": "F",
    "assembly": "Ashley",
    "y": "24",
    "prop": "1.26173346406294e-05"
  },
  {
    "x": "1953",
    "sex": "F",
    "assembly": "Linda",
    "y": "61264",
    "prop": "0.0317575840515387"
  },
  {
    "x": "1953",
    "sex": "F",
    "assembly": "Deborah",
    "y": "52196",
    "prop": "0.0270569805620611"
  },
  {
    "x": "1953",
    "sex": "F",
    "assembly": "Patricia",
    "y": "51007",
    "prop": "0.0264406354419697"
  },
  {
    "x": "1953",
    "sex": "F",
    "assembly": "Betty",
    "y": "11367",
    "prop": "0.00589234228770306"
  },
  {
    "x": "1953",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "8154",
    "prop": "0.00422681085721217"
  },
  {
    "x": "1953",
    "sex": "F",
    "assembly": "Helen",
    "y": "6120",
    "prop": "0.00317244081998265"
  },
  {
    "x": "1953",
    "sex": "F",
    "assembly": "Jessica",
    "y": "495",
    "prop": "0.000256594478086832"
  },
  {
    "x": "1953",
    "sex": "F",
    "assembly": "Amanda",
    "y": "428",
    "prop": "0.000221863508325584"
  },
  {
    "x": "1953",
    "sex": "F",
    "assembly": "Ashley",
    "y": "15",
    "prop": "7.7755902450555e-06"
  },
  {
    "x": "1954",
    "sex": "F",
    "assembly": "Linda",
    "y": "55371",
    "prop": "0.0278157891564086"
  },
  {
    "x": "1954",
    "sex": "F",
    "assembly": "Deborah",
    "y": "54674",
    "prop": "0.0274656491003862"
  },
  {
    "x": "1954",
    "sex": "F",
    "assembly": "Patricia",
    "y": "49133",
    "prop": "0.0246821110079613"
  },
  {
    "x": "1954",
    "sex": "F",
    "assembly": "Betty",
    "y": "10615",
    "prop": "0.00533247732378461"
  },
  {
    "x": "1954",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "7791",
    "prop": "0.00391383239091907"
  },
  {
    "x": "1954",
    "sex": "F",
    "assembly": "Helen",
    "y": "5940",
    "prop": "0.00298397694802455"
  },
  {
    "x": "1954",
    "sex": "F",
    "assembly": "Amanda",
    "y": "428",
    "prop": "0.000215007093224664"
  },
  {
    "x": "1954",
    "sex": "F",
    "assembly": "Jessica",
    "y": "424",
    "prop": "0.000212997681138453"
  },
  {
    "x": "1954",
    "sex": "F",
    "assembly": "Ashley",
    "y": "21",
    "prop": "1.0549413452612e-05"
  },
  {
    "x": "1955",
    "sex": "F",
    "assembly": "Deborah",
    "y": "52314",
    "prop": "0.026099932497594"
  },
  {
    "x": "1955",
    "sex": "F",
    "assembly": "Linda",
    "y": "51279",
    "prop": "0.0255835615426869"
  },
  {
    "x": "1955",
    "sex": "F",
    "assembly": "Patricia",
    "y": "46210",
    "prop": "0.0230545911364801"
  },
  {
    "x": "1955",
    "sex": "F",
    "assembly": "Betty",
    "y": "9928",
    "prop": "0.00495316989402671"
  },
  {
    "x": "1955",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "7241",
    "prop": "0.00361260104780897"
  },
  {
    "x": "1955",
    "sex": "F",
    "assembly": "Helen",
    "y": "5596",
    "prop": "0.00279189552044455"
  },
  {
    "x": "1955",
    "sex": "F",
    "assembly": "Amanda",
    "y": "452",
    "prop": "0.000225506929099524"
  },
  {
    "x": "1955",
    "sex": "F",
    "assembly": "Jessica",
    "y": "386",
    "prop": "0.000192578926177912"
  },
  {
    "x": "1955",
    "sex": "F",
    "assembly": "Ashley",
    "y": "8",
    "prop": "3.9912730814075e-06"
  },
  {
    "x": "1956",
    "sex": "F",
    "assembly": "Linda",
    "y": "48067",
    "prop": "0.0233410866641092"
  },
  {
    "x": "1956",
    "sex": "F",
    "assembly": "Deborah",
    "y": "47829",
    "prop": "0.0232255150947153"
  },
  {
    "x": "1956",
    "sex": "F",
    "assembly": "Patricia",
    "y": "43332",
    "prop": "0.0210417951469653"
  },
  {
    "x": "1956",
    "sex": "F",
    "assembly": "Betty",
    "y": "9213",
    "prop": "0.00447378516313558"
  },
  {
    "x": "1956",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "6862",
    "prop": "0.00333215171924849"
  },
  {
    "x": "1956",
    "sex": "F",
    "assembly": "Helen",
    "y": "5279",
    "prop": "0.00256345510433005"
  },
  {
    "x": "1956",
    "sex": "F",
    "assembly": "Amanda",
    "y": "643",
    "prop": "0.000312237475295363"
  },
  {
    "x": "1956",
    "sex": "F",
    "assembly": "Jessica",
    "y": "406",
    "prop": "0.00019715150073082"
  },
  {
    "x": "1956",
    "sex": "F",
    "assembly": "Ashley",
    "y": "25",
    "prop": "1.21398707346564e-05"
  },
  {
    "x": "1957",
    "sex": "F",
    "assembly": "Linda",
    "y": "44495",
    "prop": "0.021213187408344"
  },
  {
    "x": "1957",
    "sex": "F",
    "assembly": "Deborah",
    "y": "40065",
    "prop": "0.0191011653784763"
  },
  {
    "x": "1957",
    "sex": "F",
    "assembly": "Patricia",
    "y": "39277",
    "prop": "0.0187254829045404"
  },
  {
    "x": "1957",
    "sex": "F",
    "assembly": "Betty",
    "y": "8474",
    "prop": "0.00404001685803589"
  },
  {
    "x": "1957",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "6401",
    "prop": "0.00305170496911585"
  },
  {
    "x": "1957",
    "sex": "F",
    "assembly": "Helen",
    "y": "5015",
    "prop": "0.0023909233588683"
  },
  {
    "x": "1957",
    "sex": "F",
    "assembly": "Amanda",
    "y": "667",
    "prop": "0.000317995190501527"
  },
  {
    "x": "1957",
    "sex": "F",
    "assembly": "Jessica",
    "y": "476",
    "prop": "0.000226935098468856"
  },
  {
    "x": "1957",
    "sex": "F",
    "assembly": "Ashley",
    "y": "27",
    "prop": "1.28723690307964e-05"
  },
  {
    "x": "1958",
    "sex": "F",
    "assembly": "Linda",
    "y": "41898",
    "prop": "0.0202894802981679"
  },
  {
    "x": "1958",
    "sex": "F",
    "assembly": "Patricia",
    "y": "37932",
    "prop": "0.0183689094150104"
  },
  {
    "x": "1958",
    "sex": "F",
    "assembly": "Deborah",
    "y": "32936",
    "prop": "0.015949551842581"
  },
  {
    "x": "1958",
    "sex": "F",
    "assembly": "Betty",
    "y": "7709",
    "prop": "0.00373315202679308"
  },
  {
    "x": "1958",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "5539",
    "prop": "0.00268231016687078"
  },
  {
    "x": "1958",
    "sex": "F",
    "assembly": "Helen",
    "y": "4763",
    "prop": "0.0023065252436912"
  },
  {
    "x": "1958",
    "sex": "F",
    "assembly": "Amanda",
    "y": "796",
    "prop": "0.00038547010161205"
  },
  {
    "x": "1958",
    "sex": "F",
    "assembly": "Jessica",
    "y": "529",
    "prop": "0.000256172969538661"
  },
  {
    "x": "1958",
    "sex": "F",
    "assembly": "Ashley",
    "y": "38",
    "prop": "1.84018390216808e-05"
  },
  {
    "x": "1959",
    "sex": "F",
    "assembly": "Linda",
    "y": "40409",
    "prop": "0.0194416392387311"
  },
  {
    "x": "1959",
    "sex": "F",
    "assembly": "Patricia",
    "y": "35221",
    "prop": "0.0169455808267303"
  },
  {
    "x": "1959",
    "sex": "F",
    "assembly": "Deborah",
    "y": "29552",
    "prop": "0.0142181029667396"
  },
  {
    "x": "1959",
    "sex": "F",
    "assembly": "Betty",
    "y": "7317",
    "prop": "0.00352036611422691"
  },
  {
    "x": "1959",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "5238",
    "prop": "0.00252011448767535"
  },
  {
    "x": "1959",
    "sex": "F",
    "assembly": "Helen",
    "y": "4378",
    "prop": "0.00210634998607153"
  },
  {
    "x": "1959",
    "sex": "F",
    "assembly": "Amanda",
    "y": "858",
    "prop": "0.000412802258576833"
  },
  {
    "x": "1959",
    "sex": "F",
    "assembly": "Jessica",
    "y": "523",
    "prop": "0.000251626551556741"
  },
  {
    "x": "1959",
    "sex": "F",
    "assembly": "Ashley",
    "y": "37",
    "prop": "1.78014959992341e-05"
  },
  {
    "x": "1960",
    "sex": "F",
    "assembly": "Linda",
    "y": "37314",
    "prop": "0.0179400268278259"
  },
  {
    "x": "1960",
    "sex": "F",
    "assembly": "Patricia",
    "y": "32107",
    "prop": "0.0154365771925017"
  },
  {
    "x": "1960",
    "sex": "F",
    "assembly": "Deborah",
    "y": "25269",
    "prop": "0.012148966551759"
  },
  {
    "x": "1960",
    "sex": "F",
    "assembly": "Betty",
    "y": "6503",
    "prop": "0.00312654752804181"
  },
  {
    "x": "1960",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "5077",
    "prop": "0.00244094753188809"
  },
  {
    "x": "1960",
    "sex": "F",
    "assembly": "Helen",
    "y": "4069",
    "prop": "0.00195631583755223"
  },
  {
    "x": "1960",
    "sex": "F",
    "assembly": "Amanda",
    "y": "977",
    "prop": "0.000469727346593395"
  },
  {
    "x": "1960",
    "sex": "F",
    "assembly": "Jessica",
    "y": "560",
    "prop": "0.000269239830186593"
  },
  {
    "x": "1960",
    "sex": "F",
    "assembly": "Ashley",
    "y": "57",
    "prop": "2.74047684297068e-05"
  },
  {
    "x": "1961",
    "sex": "F",
    "assembly": "Linda",
    "y": "35574",
    "prop": "0.0171339811436622"
  },
  {
    "x": "1961",
    "sex": "F",
    "assembly": "Patricia",
    "y": "28867",
    "prop": "0.0139035990800612"
  },
  {
    "x": "1961",
    "sex": "F",
    "assembly": "Deborah",
    "y": "24092",
    "prop": "0.0116037520018302"
  },
  {
    "x": "1961",
    "sex": "F",
    "assembly": "Betty",
    "y": "5580",
    "prop": "0.00268756998880179"
  },
  {
    "x": "1961",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "4726",
    "prop": "0.00227624655323965"
  },
  {
    "x": "1961",
    "sex": "F",
    "assembly": "Helen",
    "y": "3855",
    "prop": "0.00185673518043565"
  },
  {
    "x": "1961",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1057",
    "prop": "0.0005090970390974"
  },
  {
    "x": "1961",
    "sex": "F",
    "assembly": "Jessica",
    "y": "669",
    "prop": "0.000322219412635914"
  },
  {
    "x": "1961",
    "sex": "F",
    "assembly": "Ashley",
    "y": "80",
    "prop": "3.85314693735024e-05"
  },
  {
    "x": "1962",
    "sex": "F",
    "assembly": "Linda",
    "y": "31462",
    "prop": "0.015521322454956"
  },
  {
    "x": "1962",
    "sex": "F",
    "assembly": "Patricia",
    "y": "26538",
    "prop": "0.0130921383036559"
  },
  {
    "x": "1962",
    "sex": "F",
    "assembly": "Deborah",
    "y": "22893",
    "prop": "0.0112939302956363"
  },
  {
    "x": "1962",
    "sex": "F",
    "assembly": "Betty",
    "y": "4765",
    "prop": "0.00235074380197906"
  },
  {
    "x": "1962",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "4075",
    "prop": "0.00201034228605765"
  },
  {
    "x": "1962",
    "sex": "F",
    "assembly": "Helen",
    "y": "3587",
    "prop": "0.00176959454726105"
  },
  {
    "x": "1962",
    "sex": "F",
    "assembly": "Amanda",
    "y": "948",
    "prop": "0.000467682082744208"
  },
  {
    "x": "1962",
    "sex": "F",
    "assembly": "Jessica",
    "y": "867",
    "prop": "0.000427721904788216"
  },
  {
    "x": "1962",
    "sex": "F",
    "assembly": "Ashley",
    "y": "95",
    "prop": "4.6866875380485e-05"
  },
  {
    "x": "1963",
    "sex": "F",
    "assembly": "Linda",
    "y": "27715",
    "prop": "0.0139419183153997"
  },
  {
    "x": "1963",
    "sex": "F",
    "assembly": "Patricia",
    "y": "25363",
    "prop": "0.0127587542570263"
  },
  {
    "x": "1963",
    "sex": "F",
    "assembly": "Deborah",
    "y": "21062",
    "prop": "0.0105951536553833"
  },
  {
    "x": "1963",
    "sex": "F",
    "assembly": "Betty",
    "y": "4154",
    "prop": "0.00208965284799461"
  },
  {
    "x": "1963",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "3791",
    "prop": "0.00190704717061809"
  },
  {
    "x": "1963",
    "sex": "F",
    "assembly": "Helen",
    "y": "3340",
    "prop": "0.00168017345024121"
  },
  {
    "x": "1963",
    "sex": "F",
    "assembly": "Jessica",
    "y": "1121",
    "prop": "0.000563914502311496"
  },
  {
    "x": "1963",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1035",
    "prop": "0.000520652551197501"
  },
  {
    "x": "1963",
    "sex": "F",
    "assembly": "Ashley",
    "y": "108",
    "prop": "5.4328961864087e-05"
  },
  {
    "x": "1964",
    "sex": "F",
    "assembly": "Patricia",
    "y": "26087",
    "prop": "0.013328857510441"
  },
  {
    "x": "1964",
    "sex": "F",
    "assembly": "Linda",
    "y": "23633",
    "prop": "0.0120750139741731"
  },
  {
    "x": "1964",
    "sex": "F",
    "assembly": "Deborah",
    "y": "19306",
    "prop": "0.00986418227839823"
  },
  {
    "x": "1964",
    "sex": "F",
    "assembly": "Betty",
    "y": "4067",
    "prop": "0.00207798763732755"
  },
  {
    "x": "1964",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "3535",
    "prop": "0.00180616825619692"
  },
  {
    "x": "1964",
    "sex": "F",
    "assembly": "Helen",
    "y": "3095",
    "prop": "0.00158135523420918"
  },
  {
    "x": "1964",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1275",
    "prop": "0.000651446825078097"
  },
  {
    "x": "1964",
    "sex": "F",
    "assembly": "Jessica",
    "y": "1172",
    "prop": "0.000598820140385513"
  },
  {
    "x": "1964",
    "sex": "F",
    "assembly": "Ashley",
    "y": "180",
    "prop": "9.19689635404372e-05"
  },
  {
    "x": "1965",
    "sex": "F",
    "assembly": "Patricia",
    "y": "23551",
    "prop": "0.0128881183708359"
  },
  {
    "x": "1965",
    "sex": "F",
    "assembly": "Linda",
    "y": "19339",
    "prop": "0.0105831311270687"
  },
  {
    "x": "1965",
    "sex": "F",
    "assembly": "Deborah",
    "y": "17083",
    "prop": "0.00934855106488003"
  },
  {
    "x": "1965",
    "sex": "F",
    "assembly": "Betty",
    "y": "3565",
    "prop": "0.00195092106458452"
  },
  {
    "x": "1965",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "2960",
    "prop": "0.00161983908868728"
  },
  {
    "x": "1965",
    "sex": "F",
    "assembly": "Helen",
    "y": "2804",
    "prop": "0.00153446919076998"
  },
  {
    "x": "1965",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1650",
    "prop": "0.000902950843356088"
  },
  {
    "x": "1965",
    "sex": "F",
    "assembly": "Jessica",
    "y": "1529",
    "prop": "0.000836734448176641"
  },
  {
    "x": "1965",
    "sex": "F",
    "assembly": "Ashley",
    "y": "218",
    "prop": "0.000119298959910077"
  },
  {
    "x": "1966",
    "sex": "F",
    "assembly": "Patricia",
    "y": "20115",
    "prop": "0.0114579150183275"
  },
  {
    "x": "1966",
    "sex": "F",
    "assembly": "Deborah",
    "y": "16250",
    "prop": "0.00925633204314305"
  },
  {
    "x": "1966",
    "sex": "F",
    "assembly": "Linda",
    "y": "15560",
    "prop": "0.00886329394408036"
  },
  {
    "x": "1966",
    "sex": "F",
    "assembly": "Betty",
    "y": "2948",
    "prop": "0.00167924103773451"
  },
  {
    "x": "1966",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "2667",
    "prop": "0.00151917769594231"
  },
  {
    "x": "1966",
    "sex": "F",
    "assembly": "Helen",
    "y": "2449",
    "prop": "0.00139500044145584"
  },
  {
    "x": "1966",
    "sex": "F",
    "assembly": "Amanda",
    "y": "2329",
    "prop": "0.00132664598944493"
  },
  {
    "x": "1966",
    "sex": "F",
    "assembly": "Jessica",
    "y": "1665",
    "prop": "0.000948418021651273"
  },
  {
    "x": "1966",
    "sex": "F",
    "assembly": "Ashley",
    "y": "263",
    "prop": "0.000149810173990561"
  },
  {
    "x": "1967",
    "sex": "F",
    "assembly": "Patricia",
    "y": "17746",
    "prop": "0.0103375520052381"
  },
  {
    "x": "1967",
    "sex": "F",
    "assembly": "Deborah",
    "y": "14007",
    "prop": "0.00815947768158289"
  },
  {
    "x": "1967",
    "sex": "F",
    "assembly": "Linda",
    "y": "13199",
    "prop": "0.00768879459693101"
  },
  {
    "x": "1967",
    "sex": "F",
    "assembly": "Amanda",
    "y": "2663",
    "prop": "0.00155127358221284"
  },
  {
    "x": "1967",
    "sex": "F",
    "assembly": "Betty",
    "y": "2543",
    "prop": "0.00148137015379919"
  },
  {
    "x": "1967",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "2316",
    "prop": "0.00134913616838338"
  },
  {
    "x": "1967",
    "sex": "F",
    "assembly": "Helen",
    "y": "2153",
    "prop": "0.00125418401145484"
  },
  {
    "x": "1967",
    "sex": "F",
    "assembly": "Jessica",
    "y": "1761",
    "prop": "0.00102583281197026"
  },
  {
    "x": "1967",
    "sex": "F",
    "assembly": "Ashley",
    "y": "386",
    "prop": "0.000224856028063896"
  },
  {
    "x": "1968",
    "sex": "F",
    "assembly": "Patricia",
    "y": "15806",
    "prop": "0.00924608652923696"
  },
  {
    "x": "1968",
    "sex": "F",
    "assembly": "Deborah",
    "y": "12286",
    "prop": "0.0071869808362777"
  },
  {
    "x": "1968",
    "sex": "F",
    "assembly": "Linda",
    "y": "11368",
    "prop": "0.00664997543112525"
  },
  {
    "x": "1968",
    "sex": "F",
    "assembly": "Amanda",
    "y": "2430",
    "prop": "0.00142148489599176"
  },
  {
    "x": "1968",
    "sex": "F",
    "assembly": "Betty",
    "y": "2134",
    "prop": "0.00124833282635655"
  },
  {
    "x": "1968",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "2084",
    "prop": "0.0012190841659452"
  },
  {
    "x": "1968",
    "sex": "F",
    "assembly": "Helen",
    "y": "1881",
    "prop": "0.00110033460467511"
  },
  {
    "x": "1968",
    "sex": "F",
    "assembly": "Jessica",
    "y": "1841",
    "prop": "0.00107693567634602"
  },
  {
    "x": "1968",
    "sex": "F",
    "assembly": "Ashley",
    "y": "544",
    "prop": "0.000318225425275522"
  },
  {
    "x": "1969",
    "sex": "F",
    "assembly": "Patricia",
    "y": "14957",
    "prop": "0.00848518199146773"
  },
  {
    "x": "1969",
    "sex": "F",
    "assembly": "Deborah",
    "y": "11186",
    "prop": "0.00634587455750204"
  },
  {
    "x": "1969",
    "sex": "F",
    "assembly": "Linda",
    "y": "10248",
    "prop": "0.00581374239811201"
  },
  {
    "x": "1969",
    "sex": "F",
    "assembly": "Amanda",
    "y": "2817",
    "prop": "0.00159809839339203"
  },
  {
    "x": "1969",
    "sex": "F",
    "assembly": "Jessica",
    "y": "2492",
    "prop": "0.00141372424434964"
  },
  {
    "x": "1969",
    "sex": "F",
    "assembly": "Betty",
    "y": "2133",
    "prop": "0.00121006172279205"
  },
  {
    "x": "1969",
    "sex": "F",
    "assembly": "Helen",
    "y": "1857",
    "prop": "0.00105348552237451"
  },
  {
    "x": "1969",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1778",
    "prop": "0.00100866842153036"
  },
  {
    "x": "1969",
    "sex": "F",
    "assembly": "Ashley",
    "y": "643",
    "prop": "0.000364777162566942"
  },
  {
    "x": "1970",
    "sex": "F",
    "assembly": "Patricia",
    "y": "13404",
    "prop": "0.00731676961673752"
  },
  {
    "x": "1970",
    "sex": "F",
    "assembly": "Deborah",
    "y": "9853",
    "prop": "0.00537840428481907"
  },
  {
    "x": "1970",
    "sex": "F",
    "assembly": "Linda",
    "y": "8734",
    "prop": "0.00476758175414693"
  },
  {
    "x": "1970",
    "sex": "F",
    "assembly": "Jessica",
    "y": "4023",
    "prop": "0.00219601344137086"
  },
  {
    "x": "1970",
    "sex": "F",
    "assembly": "Amanda",
    "y": "3550",
    "prop": "0.00193781946727978"
  },
  {
    "x": "1970",
    "sex": "F",
    "assembly": "Betty",
    "y": "1967",
    "prop": "0.0010737157442646"
  },
  {
    "x": "1970",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1802",
    "prop": "0.000983648078883991"
  },
  {
    "x": "1970",
    "sex": "F",
    "assembly": "Helen",
    "y": "1715",
    "prop": "0.000936157855319669"
  },
  {
    "x": "1970",
    "sex": "F",
    "assembly": "Ashley",
    "y": "932",
    "prop": "0.000508745843240776"
  },
  {
    "x": "1971",
    "sex": "F",
    "assembly": "Patricia",
    "y": "11466",
    "prop": "0.006543190995437"
  },
  {
    "x": "1971",
    "sex": "F",
    "assembly": "Deborah",
    "y": "8675",
    "prop": "0.00495047809919902"
  },
  {
    "x": "1971",
    "sex": "F",
    "assembly": "Linda",
    "y": "7379",
    "prop": "0.00421090235089217"
  },
  {
    "x": "1971",
    "sex": "F",
    "assembly": "Jessica",
    "y": "5360",
    "prop": "0.00305873920596043"
  },
  {
    "x": "1971",
    "sex": "F",
    "assembly": "Amanda",
    "y": "4133",
    "prop": "0.00235853901832733"
  },
  {
    "x": "1971",
    "sex": "F",
    "assembly": "Betty",
    "y": "1763",
    "prop": "0.00100607410822915"
  },
  {
    "x": "1971",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1626",
    "prop": "0.000927893647181281"
  },
  {
    "x": "1971",
    "sex": "F",
    "assembly": "Helen",
    "y": "1441",
    "prop": "0.000822321491751676"
  },
  {
    "x": "1971",
    "sex": "F",
    "assembly": "Ashley",
    "y": "1164",
    "prop": "0.000664248588757079"
  },
  {
    "x": "1972",
    "sex": "F",
    "assembly": "Patricia",
    "y": "9602",
    "prop": "0.00595464005496972"
  },
  {
    "x": "1972",
    "sex": "F",
    "assembly": "Deborah",
    "y": "6279",
    "prop": "0.00389389553271765"
  },
  {
    "x": "1972",
    "sex": "F",
    "assembly": "Jessica",
    "y": "6208",
    "prop": "0.00384986518030119"
  },
  {
    "x": "1972",
    "sex": "F",
    "assembly": "Linda",
    "y": "5746",
    "prop": "0.00356335781668986"
  },
  {
    "x": "1972",
    "sex": "F",
    "assembly": "Amanda",
    "y": "4181",
    "prop": "0.00259282962610169"
  },
  {
    "x": "1972",
    "sex": "F",
    "assembly": "Betty",
    "y": "1366",
    "prop": "0.000847119174660346"
  },
  {
    "x": "1972",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1277",
    "prop": "0.0007919261976876"
  },
  {
    "x": "1972",
    "sex": "F",
    "assembly": "Helen",
    "y": "1245",
    "prop": "0.000772081531809759"
  },
  {
    "x": "1972",
    "sex": "F",
    "assembly": "Ashley",
    "y": "1176",
    "prop": "0.000729291471010664"
  },
  {
    "x": "1973",
    "sex": "F",
    "assembly": "Patricia",
    "y": "8477",
    "prop": "0.00545491634229101"
  },
  {
    "x": "1973",
    "sex": "F",
    "assembly": "Jessica",
    "y": "7226",
    "prop": "0.00464990273556622"
  },
  {
    "x": "1973",
    "sex": "F",
    "assembly": "Amanda",
    "y": "5627",
    "prop": "0.00362095249004029"
  },
  {
    "x": "1973",
    "sex": "F",
    "assembly": "Deborah",
    "y": "4984",
    "prop": "0.00320718450512899"
  },
  {
    "x": "1973",
    "sex": "F",
    "assembly": "Linda",
    "y": "4735",
    "prop": "0.00304695397909024"
  },
  {
    "x": "1973",
    "sex": "F",
    "assembly": "Betty",
    "y": "1323",
    "prop": "0.000851345325097441"
  },
  {
    "x": "1973",
    "sex": "F",
    "assembly": "Ashley",
    "y": "1253",
    "prop": "0.00080630059890181"
  },
  {
    "x": "1973",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1175",
    "prop": "0.000756107903998106"
  },
  {
    "x": "1973",
    "sex": "F",
    "assembly": "Helen",
    "y": "1133",
    "prop": "0.000729081068280726"
  },
  {
    "x": "1974",
    "sex": "F",
    "assembly": "Jessica",
    "y": "10653",
    "prop": "0.00680199571179919"
  },
  {
    "x": "1974",
    "sex": "F",
    "assembly": "Patricia",
    "y": "8040",
    "prop": "0.00513358166928241"
  },
  {
    "x": "1974",
    "sex": "F",
    "assembly": "Amanda",
    "y": "7476",
    "prop": "0.00477346474621335"
  },
  {
    "x": "1974",
    "sex": "F",
    "assembly": "Deborah",
    "y": "4345",
    "prop": "0.00277430501903384"
  },
  {
    "x": "1974",
    "sex": "F",
    "assembly": "Linda",
    "y": "4085",
    "prop": "0.00260829367151973"
  },
  {
    "x": "1974",
    "sex": "F",
    "assembly": "Ashley",
    "y": "1626",
    "prop": "0.00103820942714592"
  },
  {
    "x": "1974",
    "sex": "F",
    "assembly": "Helen",
    "y": "1140",
    "prop": "0.000727895908331088"
  },
  {
    "x": "1974",
    "sex": "F",
    "assembly": "Betty",
    "y": "1130",
    "prop": "0.000721510856503622"
  },
  {
    "x": "1974",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "1100",
    "prop": "0.000702355701021225"
  },
  {
    "x": "1975",
    "sex": "F",
    "assembly": "Jessica",
    "y": "12930",
    "prop": "0.00828471748344498"
  },
  {
    "x": "1975",
    "sex": "F",
    "assembly": "Amanda",
    "y": "12653",
    "prop": "0.00810723358994813"
  },
  {
    "x": "1975",
    "sex": "F",
    "assembly": "Patricia",
    "y": "7056",
    "prop": "0.00452103376358761"
  },
  {
    "x": "1975",
    "sex": "F",
    "assembly": "Linda",
    "y": "3525",
    "prop": "0.00225859467356099"
  },
  {
    "x": "1975",
    "sex": "F",
    "assembly": "Deborah",
    "y": "3415",
    "prop": "0.00218811370502433"
  },
  {
    "x": "1975",
    "sex": "F",
    "assembly": "Ashley",
    "y": "1988",
    "prop": "0.00127378332228064"
  },
  {
    "x": "1975",
    "sex": "F",
    "assembly": "Helen",
    "y": "1057",
    "prop": "0.000677258034029493"
  },
  {
    "x": "1975",
    "sex": "F",
    "assembly": "Betty",
    "y": "1021",
    "prop": "0.000654191535235679"
  },
  {
    "x": "1975",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "975",
    "prop": "0.000624717675665805"
  },
  {
    "x": "1976",
    "sex": "F",
    "assembly": "Jessica",
    "y": "18370",
    "prop": "0.0116864866171597"
  },
  {
    "x": "1976",
    "sex": "F",
    "assembly": "Amanda",
    "y": "15591",
    "prop": "0.00991856357366017"
  },
  {
    "x": "1976",
    "sex": "F",
    "assembly": "Patricia",
    "y": "6017",
    "prop": "0.00382784920933316"
  },
  {
    "x": "1976",
    "sex": "F",
    "assembly": "Linda",
    "y": "3141",
    "prop": "0.00199821744499176"
  },
  {
    "x": "1976",
    "sex": "F",
    "assembly": "Deborah",
    "y": "2994",
    "prop": "0.00190470010515929"
  },
  {
    "x": "1976",
    "sex": "F",
    "assembly": "Ashley",
    "y": "2292",
    "prop": "0.00145810709453076"
  },
  {
    "x": "1976",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "983",
    "prop": "0.000625357449355907"
  },
  {
    "x": "1976",
    "sex": "F",
    "assembly": "Helen",
    "y": "942",
    "prop": "0.000599274381783586"
  },
  {
    "x": "1976",
    "sex": "F",
    "assembly": "Betty",
    "y": "908",
    "prop": "0.000577644520869953"
  },
  {
    "x": "1977",
    "sex": "F",
    "assembly": "Jessica",
    "y": "24843",
    "prop": "0.0151032385968816"
  },
  {
    "x": "1977",
    "sex": "F",
    "assembly": "Amanda",
    "y": "18280",
    "prop": "0.01111327945703"
  },
  {
    "x": "1977",
    "sex": "F",
    "assembly": "Patricia",
    "y": "5907",
    "prop": "0.00359114561010263"
  },
  {
    "x": "1977",
    "sex": "F",
    "assembly": "Linda",
    "y": "2909",
    "prop": "0.0017685191433534"
  },
  {
    "x": "1977",
    "sex": "F",
    "assembly": "Ashley",
    "y": "2706",
    "prop": "0.00164510581021461"
  },
  {
    "x": "1977",
    "sex": "F",
    "assembly": "Deborah",
    "y": "2677",
    "prop": "0.00162747533405193"
  },
  {
    "x": "1977",
    "sex": "F",
    "assembly": "Helen",
    "y": "992",
    "prop": "0.00060308387425458"
  },
  {
    "x": "1977",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "934",
    "prop": "0.000567822921929212"
  },
  {
    "x": "1977",
    "sex": "F",
    "assembly": "Betty",
    "y": "807",
    "prop": "0.000490613595285732"
  },
  {
    "x": "1978",
    "sex": "F",
    "assembly": "Jessica",
    "y": "26105",
    "prop": "0.0158812818667457"
  },
  {
    "x": "1978",
    "sex": "F",
    "assembly": "Amanda",
    "y": "20522",
    "prop": "0.0124847985623197"
  },
  {
    "x": "1978",
    "sex": "F",
    "assembly": "Patricia",
    "y": "5498",
    "prop": "0.00334477256094111"
  },
  {
    "x": "1978",
    "sex": "F",
    "assembly": "Ashley",
    "y": "3484",
    "prop": "0.00211953212119295"
  },
  {
    "x": "1978",
    "sex": "F",
    "assembly": "Linda",
    "y": "2936",
    "prop": "0.00178614991613734"
  },
  {
    "x": "1978",
    "sex": "F",
    "assembly": "Deborah",
    "y": "2479",
    "prop": "0.00150812862469498"
  },
  {
    "x": "1978",
    "sex": "F",
    "assembly": "Helen",
    "y": "922",
    "prop": "0.000560909476389179"
  },
  {
    "x": "1978",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "913",
    "prop": "0.00055543422119666"
  },
  {
    "x": "1978",
    "sex": "F",
    "assembly": "Betty",
    "y": "715",
    "prop": "0.000434978606961239"
  },
  {
    "x": "1979",
    "sex": "F",
    "assembly": "Amanda",
    "y": "31927",
    "prop": "0.018529201469011"
  },
  {
    "x": "1979",
    "sex": "F",
    "assembly": "Jessica",
    "y": "27777",
    "prop": "0.0161207012624023"
  },
  {
    "x": "1979",
    "sex": "F",
    "assembly": "Patricia",
    "y": "5651",
    "prop": "0.0032796228114568"
  },
  {
    "x": "1979",
    "sex": "F",
    "assembly": "Ashley",
    "y": "4450",
    "prop": "0.0025826086552792"
  },
  {
    "x": "1979",
    "sex": "F",
    "assembly": "Linda",
    "y": "2739",
    "prop": "0.00158961013636174"
  },
  {
    "x": "1979",
    "sex": "F",
    "assembly": "Deborah",
    "y": "2181",
    "prop": "0.00126576842183459"
  },
  {
    "x": "1979",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "889",
    "prop": "0.000515941369560272"
  },
  {
    "x": "1979",
    "sex": "F",
    "assembly": "Helen",
    "y": "879",
    "prop": "0.000510137754604588"
  },
  {
    "x": "1979",
    "sex": "F",
    "assembly": "Betty",
    "y": "711",
    "prop": "0.000412637023349104"
  },
  {
    "x": "1980",
    "sex": "F",
    "assembly": "Amanda",
    "y": "35819",
    "prop": "0.0201204564808553"
  },
  {
    "x": "1980",
    "sex": "F",
    "assembly": "Jessica",
    "y": "33921",
    "prop": "0.0190543009097711"
  },
  {
    "x": "1980",
    "sex": "F",
    "assembly": "Ashley",
    "y": "7296",
    "prop": "0.00409835144711801"
  },
  {
    "x": "1980",
    "sex": "F",
    "assembly": "Patricia",
    "y": "5309",
    "prop": "0.00298220227970799"
  },
  {
    "x": "1980",
    "sex": "F",
    "assembly": "Linda",
    "y": "2805",
    "prop": "0.00157564087296683"
  },
  {
    "x": "1980",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1938",
    "prop": "0.00108862460314072"
  },
  {
    "x": "1980",
    "sex": "F",
    "assembly": "Helen",
    "y": "909",
    "prop": "0.000510608753485509"
  },
  {
    "x": "1980",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "895",
    "prop": "0.00050274459226571"
  },
  {
    "x": "1980",
    "sex": "F",
    "assembly": "Betty",
    "y": "658",
    "prop": "0.000369615577330544"
  },
  {
    "x": "1981",
    "sex": "F",
    "assembly": "Jessica",
    "y": "42527",
    "prop": "0.0237842499463097"
  },
  {
    "x": "1981",
    "sex": "F",
    "assembly": "Amanda",
    "y": "34373",
    "prop": "0.0192239288782304"
  },
  {
    "x": "1981",
    "sex": "F",
    "assembly": "Ashley",
    "y": "8877",
    "prop": "0.00496467624740497"
  },
  {
    "x": "1981",
    "sex": "F",
    "assembly": "Patricia",
    "y": "5285",
    "prop": "0.0029557636552366"
  },
  {
    "x": "1981",
    "sex": "F",
    "assembly": "Linda",
    "y": "2730",
    "prop": "0.00152681831197652"
  },
  {
    "x": "1981",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1905",
    "prop": "0.00106541717374186"
  },
  {
    "x": "1981",
    "sex": "F",
    "assembly": "Helen",
    "y": "896",
    "prop": "0.000501109599828191"
  },
  {
    "x": "1981",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "787",
    "prop": "0.00044014872217052"
  },
  {
    "x": "1981",
    "sex": "F",
    "assembly": "Betty",
    "y": "662",
    "prop": "0.000370239458801632"
  },
  {
    "x": "1982",
    "sex": "F",
    "assembly": "Jessica",
    "y": "45445",
    "prop": "0.0250562932675237"
  },
  {
    "x": "1982",
    "sex": "F",
    "assembly": "Amanda",
    "y": "34210",
    "prop": "0.0188618284229725"
  },
  {
    "x": "1982",
    "sex": "F",
    "assembly": "Ashley",
    "y": "14851",
    "prop": "0.00818816176292209"
  },
  {
    "x": "1982",
    "sex": "F",
    "assembly": "Patricia",
    "y": "5167",
    "prop": "0.00284884733883364"
  },
  {
    "x": "1982",
    "sex": "F",
    "assembly": "Linda",
    "y": "2787",
    "prop": "0.00153662425649881"
  },
  {
    "x": "1982",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1842",
    "prop": "0.00101559450321881"
  },
  {
    "x": "1982",
    "sex": "F",
    "assembly": "Helen",
    "y": "875",
    "prop": "0.000482434956740747"
  },
  {
    "x": "1982",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "828",
    "prop": "0.000456521307635815"
  },
  {
    "x": "1982",
    "sex": "F",
    "assembly": "Betty",
    "y": "635",
    "prop": "0.000350109940034713"
  },
  {
    "x": "1983",
    "sex": "F",
    "assembly": "Jessica",
    "y": "45278",
    "prop": "0.0253076258799791"
  },
  {
    "x": "1983",
    "sex": "F",
    "assembly": "Amanda",
    "y": "33754",
    "prop": "0.0188664164484477"
  },
  {
    "x": "1983",
    "sex": "F",
    "assembly": "Ashley",
    "y": "33290",
    "prop": "0.0186070688975773"
  },
  {
    "x": "1983",
    "sex": "F",
    "assembly": "Patricia",
    "y": "4922",
    "prop": "0.00275109621850031"
  },
  {
    "x": "1983",
    "sex": "F",
    "assembly": "Linda",
    "y": "2473",
    "prop": "0.0013822553734968"
  },
  {
    "x": "1983",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1605",
    "prop": "0.000897096592989232"
  },
  {
    "x": "1983",
    "sex": "F",
    "assembly": "Helen",
    "y": "844",
    "prop": "0.000471744252014275"
  },
  {
    "x": "1983",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "759",
    "prop": "0.000424234463600515"
  },
  {
    "x": "1983",
    "sex": "F",
    "assembly": "Betty",
    "y": "563",
    "prop": "0.000314682480905257"
  },
  {
    "x": "1984",
    "sex": "F",
    "assembly": "Jessica",
    "y": "45851",
    "prop": "0.025436304942746"
  },
  {
    "x": "1984",
    "sex": "F",
    "assembly": "Ashley",
    "y": "38759",
    "prop": "0.0215019463757801"
  },
  {
    "x": "1984",
    "sex": "F",
    "assembly": "Amanda",
    "y": "33906",
    "prop": "0.0188096956530664"
  },
  {
    "x": "1984",
    "sex": "F",
    "assembly": "Patricia",
    "y": "4475",
    "prop": "0.00248255140823075"
  },
  {
    "x": "1984",
    "sex": "F",
    "assembly": "Linda",
    "y": "2334",
    "prop": "0.00129481005291857"
  },
  {
    "x": "1984",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1468",
    "prop": "0.000814387813917932"
  },
  {
    "x": "1984",
    "sex": "F",
    "assembly": "Helen",
    "y": "859",
    "prop": "0.00047653891836206"
  },
  {
    "x": "1984",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "682",
    "prop": "0.000378346382215279"
  },
  {
    "x": "1984",
    "sex": "F",
    "assembly": "Betty",
    "y": "503",
    "prop": "0.000279044325886049"
  },
  {
    "x": "1985",
    "sex": "F",
    "assembly": "Jessica",
    "y": "48343",
    "prop": "0.0261934794528861"
  },
  {
    "x": "1985",
    "sex": "F",
    "assembly": "Ashley",
    "y": "47007",
    "prop": "0.0254696003276962"
  },
  {
    "x": "1985",
    "sex": "F",
    "assembly": "Amanda",
    "y": "39050",
    "prop": "0.0211582932924147"
  },
  {
    "x": "1985",
    "sex": "F",
    "assembly": "Patricia",
    "y": "4398",
    "prop": "0.00238294939564762"
  },
  {
    "x": "1985",
    "sex": "F",
    "assembly": "Linda",
    "y": "2113",
    "prop": "0.00114487768826817"
  },
  {
    "x": "1985",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1401",
    "prop": "0.000759097795202892"
  },
  {
    "x": "1985",
    "sex": "F",
    "assembly": "Helen",
    "y": "809",
    "prop": "0.000438336985238501"
  },
  {
    "x": "1985",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "719",
    "prop": "0.000389572672912833"
  },
  {
    "x": "1985",
    "sex": "F",
    "assembly": "Betty",
    "y": "502",
    "prop": "0.000271996497638724"
  },
  {
    "x": "1986",
    "sex": "F",
    "assembly": "Jessica",
    "y": "52667",
    "prop": "0.0285499155975875"
  },
  {
    "x": "1986",
    "sex": "F",
    "assembly": "Ashley",
    "y": "49674",
    "prop": "0.0269274594602799"
  },
  {
    "x": "1986",
    "sex": "F",
    "assembly": "Amanda",
    "y": "40522",
    "prop": "0.0219663105900363"
  },
  {
    "x": "1986",
    "sex": "F",
    "assembly": "Patricia",
    "y": "4246",
    "prop": "0.00230168685566591"
  },
  {
    "x": "1986",
    "sex": "F",
    "assembly": "Linda",
    "y": "1951",
    "prop": "0.00105760505308624"
  },
  {
    "x": "1986",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1284",
    "prop": "0.000696035309155683"
  },
  {
    "x": "1986",
    "sex": "F",
    "assembly": "Helen",
    "y": "766",
    "prop": "0.000415236017767331"
  },
  {
    "x": "1986",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "629",
    "prop": "0.000340970568114427"
  },
  {
    "x": "1986",
    "sex": "F",
    "assembly": "Betty",
    "y": "407",
    "prop": "0.000220628014662277"
  },
  {
    "x": "1987",
    "sex": "F",
    "assembly": "Jessica",
    "y": "55990",
    "prop": "0.0298840611579793"
  },
  {
    "x": "1987",
    "sex": "F",
    "assembly": "Ashley",
    "y": "54845",
    "prop": "0.029272929705472"
  },
  {
    "x": "1987",
    "sex": "F",
    "assembly": "Amanda",
    "y": "41786",
    "prop": "0.0223028287113293"
  },
  {
    "x": "1987",
    "sex": "F",
    "assembly": "Patricia",
    "y": "3913",
    "prop": "0.00208852172372161"
  },
  {
    "x": "1987",
    "sex": "F",
    "assembly": "Linda",
    "y": "1929",
    "prop": "0.00102958303221543"
  },
  {
    "x": "1987",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1203",
    "prop": "0.000642088329577588"
  },
  {
    "x": "1987",
    "sex": "F",
    "assembly": "Helen",
    "y": "815",
    "prop": "0.000434997496762871"
  },
  {
    "x": "1987",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "614",
    "prop": "0.000327715905536691"
  },
  {
    "x": "1987",
    "sex": "F",
    "assembly": "Betty",
    "y": "435",
    "prop": "0.000232176578026809"
  },
  {
    "x": "1988",
    "sex": "F",
    "assembly": "Jessica",
    "y": "51532",
    "prop": "0.0268079862120844"
  },
  {
    "x": "1988",
    "sex": "F",
    "assembly": "Ashley",
    "y": "49963",
    "prop": "0.025991760752821"
  },
  {
    "x": "1988",
    "sex": "F",
    "assembly": "Amanda",
    "y": "39451",
    "prop": "0.0205232062418098"
  },
  {
    "x": "1988",
    "sex": "F",
    "assembly": "Patricia",
    "y": "3798",
    "prop": "0.00197579623599892"
  },
  {
    "x": "1988",
    "sex": "F",
    "assembly": "Linda",
    "y": "1844",
    "prop": "0.000959286008210115"
  },
  {
    "x": "1988",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1056",
    "prop": "0.000549352507955467"
  },
  {
    "x": "1988",
    "sex": "F",
    "assembly": "Helen",
    "y": "775",
    "prop": "0.000403170637940802"
  },
  {
    "x": "1988",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "608",
    "prop": "0.000316293868216784"
  },
  {
    "x": "1988",
    "sex": "F",
    "assembly": "Betty",
    "y": "395",
    "prop": "0.000205486970305312"
  },
  {
    "x": "1989",
    "sex": "F",
    "assembly": "Jessica",
    "y": "47885",
    "prop": "0.0240412252916602"
  },
  {
    "x": "1989",
    "sex": "F",
    "assembly": "Ashley",
    "y": "47585",
    "prop": "0.0238906067767286"
  },
  {
    "x": "1989",
    "sex": "F",
    "assembly": "Amanda",
    "y": "36827",
    "prop": "0.0184894268312827"
  },
  {
    "x": "1989",
    "sex": "F",
    "assembly": "Patricia",
    "y": "3606",
    "prop": "0.00181043454947743"
  },
  {
    "x": "1989",
    "sex": "F",
    "assembly": "Linda",
    "y": "1844",
    "prop": "0.000925801805112695"
  },
  {
    "x": "1989",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1076",
    "prop": "0.000540218406887885"
  },
  {
    "x": "1989",
    "sex": "F",
    "assembly": "Helen",
    "y": "857",
    "prop": "0.000430266890987842"
  },
  {
    "x": "1989",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "620",
    "prop": "0.000311278264191904"
  },
  {
    "x": "1989",
    "sex": "F",
    "assembly": "Betty",
    "y": "399",
    "prop": "0.000200322624858983"
  },
  {
    "x": "1990",
    "sex": "F",
    "assembly": "Jessica",
    "y": "46470",
    "prop": "0.0226274308541356"
  },
  {
    "x": "1990",
    "sex": "F",
    "assembly": "Ashley",
    "y": "45553",
    "prop": "0.0221809201140185"
  },
  {
    "x": "1990",
    "sex": "F",
    "assembly": "Amanda",
    "y": "34405",
    "prop": "0.0167526739517223"
  },
  {
    "x": "1990",
    "sex": "F",
    "assembly": "Patricia",
    "y": "3578",
    "prop": "0.00174221965991171"
  },
  {
    "x": "1990",
    "sex": "F",
    "assembly": "Linda",
    "y": "1658",
    "prop": "0.000807322581367696"
  },
  {
    "x": "1990",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1094",
    "prop": "0.000532696564545392"
  },
  {
    "x": "1990",
    "sex": "F",
    "assembly": "Helen",
    "y": "861",
    "prop": "0.000419242908659582"
  },
  {
    "x": "1990",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "596",
    "prop": "0.000290207634798038"
  },
  {
    "x": "1990",
    "sex": "F",
    "assembly": "Betty",
    "y": "406",
    "prop": "0.00019769177806712"
  },
  {
    "x": "1991",
    "sex": "F",
    "assembly": "Ashley",
    "y": "43482",
    "prop": "0.0213883278618854"
  },
  {
    "x": "1991",
    "sex": "F",
    "assembly": "Jessica",
    "y": "43394",
    "prop": "0.0213450416089107"
  },
  {
    "x": "1991",
    "sex": "F",
    "assembly": "Amanda",
    "y": "28887",
    "prop": "0.0142092044281837"
  },
  {
    "x": "1991",
    "sex": "F",
    "assembly": "Patricia",
    "y": "3418",
    "prop": "0.00168127741667642"
  },
  {
    "x": "1991",
    "sex": "F",
    "assembly": "Linda",
    "y": "1608",
    "prop": "0.000790957895264976"
  },
  {
    "x": "1991",
    "sex": "F",
    "assembly": "Deborah",
    "y": "1014",
    "prop": "0.00049877568768575"
  },
  {
    "x": "1991",
    "sex": "F",
    "assembly": "Helen",
    "y": "773",
    "prop": "0.000380230381243673"
  },
  {
    "x": "1991",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "498",
    "prop": "0.000244960840697735"
  },
  {
    "x": "1991",
    "sex": "F",
    "assembly": "Betty",
    "y": "345",
    "prop": "0.000169701787230359"
  },
  {
    "x": "1992",
    "sex": "F",
    "assembly": "Ashley",
    "y": "38452",
    "prop": "0.0191860354880783"
  },
  {
    "x": "1992",
    "sex": "F",
    "assembly": "Jessica",
    "y": "38352",
    "prop": "0.0191361394215848"
  },
  {
    "x": "1992",
    "sex": "F",
    "assembly": "Amanda",
    "y": "25034",
    "prop": "0.0124909812859813"
  },
  {
    "x": "1992",
    "sex": "F",
    "assembly": "Patricia",
    "y": "2951",
    "prop": "0.00147243292222301"
  },
  {
    "x": "1992",
    "sex": "F",
    "assembly": "Linda",
    "y": "1580",
    "prop": "0.000788357850597206"
  },
  {
    "x": "1992",
    "sex": "F",
    "assembly": "Deborah",
    "y": "919",
    "prop": "0.00045854485107521"
  },
  {
    "x": "1992",
    "sex": "F",
    "assembly": "Helen",
    "y": "827",
    "prop": "0.000412640469901196"
  },
  {
    "x": "1992",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "508",
    "prop": "0.00025347201778695"
  },
  {
    "x": "1992",
    "sex": "F",
    "assembly": "Betty",
    "y": "296",
    "prop": "0.000147692356820742"
  },
  {
    "x": "1993",
    "sex": "F",
    "assembly": "Jessica",
    "y": "34987",
    "prop": "0.0177506267031079"
  },
  {
    "x": "1993",
    "sex": "F",
    "assembly": "Ashley",
    "y": "34847",
    "prop": "0.0176795978141367"
  },
  {
    "x": "1993",
    "sex": "F",
    "assembly": "Amanda",
    "y": "20809",
    "prop": "0.0105574296471538"
  },
  {
    "x": "1993",
    "sex": "F",
    "assembly": "Patricia",
    "y": "2660",
    "prop": "0.00134954889045265"
  },
  {
    "x": "1993",
    "sex": "F",
    "assembly": "Linda",
    "y": "1487",
    "prop": "0.000754428270715449"
  },
  {
    "x": "1993",
    "sex": "F",
    "assembly": "Helen",
    "y": "868",
    "prop": "0.000440379111621392"
  },
  {
    "x": "1993",
    "sex": "F",
    "assembly": "Deborah",
    "y": "797",
    "prop": "0.000404357317928858"
  },
  {
    "x": "1993",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "476",
    "prop": "0.000241498222502053"
  },
  {
    "x": "1993",
    "sex": "F",
    "assembly": "Betty",
    "y": "292",
    "prop": "0.000148145968425629"
  },
  {
    "x": "1994",
    "sex": "F",
    "assembly": "Jessica",
    "y": "32117",
    "prop": "0.0164797639663909"
  },
  {
    "x": "1994",
    "sex": "F",
    "assembly": "Ashley",
    "y": "30278",
    "prop": "0.0155361426463986"
  },
  {
    "x": "1994",
    "sex": "F",
    "assembly": "Amanda",
    "y": "18715",
    "prop": "0.00960297607594125"
  },
  {
    "x": "1994",
    "sex": "F",
    "assembly": "Patricia",
    "y": "2363",
    "prop": "0.00121249438778783"
  },
  {
    "x": "1994",
    "sex": "F",
    "assembly": "Linda",
    "y": "1281",
    "prop": "0.000657302289782567"
  },
  {
    "x": "1994",
    "sex": "F",
    "assembly": "Helen",
    "y": "848",
    "prop": "0.000435122827272144"
  },
  {
    "x": "1994",
    "sex": "F",
    "assembly": "Deborah",
    "y": "740",
    "prop": "0.000379706240779937"
  },
  {
    "x": "1994",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "442",
    "prop": "0.000226797511384773"
  },
  {
    "x": "1994",
    "sex": "F",
    "assembly": "Betty",
    "y": "275",
    "prop": "0.00014110704893849"
  },
  {
    "x": "1995",
    "sex": "F",
    "assembly": "Jessica",
    "y": "27935",
    "prop": "0.0145416403136851"
  },
  {
    "x": "1995",
    "sex": "F",
    "assembly": "Ashley",
    "y": "26603",
    "prop": "0.0138482640868074"
  },
  {
    "x": "1995",
    "sex": "F",
    "assembly": "Amanda",
    "y": "16345",
    "prop": "0.00850843425549248"
  },
  {
    "x": "1995",
    "sex": "F",
    "assembly": "Patricia",
    "y": "2160",
    "prop": "0.0011243938814233"
  },
  {
    "x": "1995",
    "sex": "F",
    "assembly": "Linda",
    "y": "1233",
    "prop": "0.000641841507312464"
  },
  {
    "x": "1995",
    "sex": "F",
    "assembly": "Helen",
    "y": "837",
    "prop": "0.000435702629051527"
  },
  {
    "x": "1995",
    "sex": "F",
    "assembly": "Deborah",
    "y": "660",
    "prop": "0.000343564797101562"
  },
  {
    "x": "1995",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "376",
    "prop": "0.000195727823803314"
  },
  {
    "x": "1995",
    "sex": "F",
    "assembly": "Betty",
    "y": "234",
    "prop": "0.00012180933715419"
  },
  {
    "x": "1996",
    "sex": "F",
    "assembly": "Jessica",
    "y": "24192",
    "prop": "0.012621838409999"
  },
  {
    "x": "1996",
    "sex": "F",
    "assembly": "Ashley",
    "y": "23676",
    "prop": "0.0123526226105793"
  },
  {
    "x": "1996",
    "sex": "F",
    "assembly": "Amanda",
    "y": "13973",
    "prop": "0.00729021776219062"
  },
  {
    "x": "1996",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1970",
    "prop": "0.00102782000941212"
  },
  {
    "x": "1996",
    "sex": "F",
    "assembly": "Linda",
    "y": "987",
    "prop": "0.000514953476796833"
  },
  {
    "x": "1996",
    "sex": "F",
    "assembly": "Helen",
    "y": "900",
    "prop": "0.000469562440848176"
  },
  {
    "x": "1996",
    "sex": "F",
    "assembly": "Deborah",
    "y": "633",
    "prop": "0.000330258916729884"
  },
  {
    "x": "1996",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "350",
    "prop": "0.000182607615885402"
  },
  {
    "x": "1996",
    "sex": "F",
    "assembly": "Betty",
    "y": "217",
    "prop": "0.000113216721848949"
  },
  {
    "x": "1997",
    "sex": "F",
    "assembly": "Jessica",
    "y": "21043",
    "prop": "0.0110255841966801"
  },
  {
    "x": "1997",
    "sex": "F",
    "assembly": "Ashley",
    "y": "20895",
    "prop": "0.0109480388627872"
  },
  {
    "x": "1997",
    "sex": "F",
    "assembly": "Amanda",
    "y": "12239",
    "prop": "0.00641268473996901"
  },
  {
    "x": "1997",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1781",
    "prop": "0.000933163781508686"
  },
  {
    "x": "1997",
    "sex": "F",
    "assembly": "Linda",
    "y": "1095",
    "prop": "0.00057373067981584"
  },
  {
    "x": "1997",
    "sex": "F",
    "assembly": "Helen",
    "y": "812",
    "prop": "0.000425451426493573"
  },
  {
    "x": "1997",
    "sex": "F",
    "assembly": "Deborah",
    "y": "638",
    "prop": "0.000334283263673522"
  },
  {
    "x": "1997",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "315",
    "prop": "0.000165045812001817"
  },
  {
    "x": "1997",
    "sex": "F",
    "assembly": "Betty",
    "y": "189",
    "prop": "9.90274872010902e-05"
  },
  {
    "x": "1998",
    "sex": "F",
    "assembly": "Ashley",
    "y": "19871",
    "prop": "0.0102549361330773"
  },
  {
    "x": "1998",
    "sex": "F",
    "assembly": "Jessica",
    "y": "18233",
    "prop": "0.00940960447458096"
  },
  {
    "x": "1998",
    "sex": "F",
    "assembly": "Amanda",
    "y": "10908",
    "prop": "0.00562935148405249"
  },
  {
    "x": "1998",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1704",
    "prop": "0.000879392641073107"
  },
  {
    "x": "1998",
    "sex": "F",
    "assembly": "Linda",
    "y": "970",
    "prop": "0.000500593228779879"
  },
  {
    "x": "1998",
    "sex": "F",
    "assembly": "Helen",
    "y": "832",
    "prop": "0.000429374810664803"
  },
  {
    "x": "1998",
    "sex": "F",
    "assembly": "Deborah",
    "y": "553",
    "prop": "0.00028538974795389"
  },
  {
    "x": "1998",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "312",
    "prop": "0.000161015553999301"
  },
  {
    "x": "1998",
    "sex": "F",
    "assembly": "Betty",
    "y": "194",
    "prop": "0.000100118645755976"
  },
  {
    "x": "1999",
    "sex": "F",
    "assembly": "Ashley",
    "y": "18132",
    "prop": "0.00931837897619116"
  },
  {
    "x": "1999",
    "sex": "F",
    "assembly": "Jessica",
    "y": "16346",
    "prop": "0.0084005196748743"
  },
  {
    "x": "1999",
    "sex": "F",
    "assembly": "Amanda",
    "y": "9741",
    "prop": "0.00500608480074333"
  },
  {
    "x": "1999",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1532",
    "prop": "0.000787323879964971"
  },
  {
    "x": "1999",
    "sex": "F",
    "assembly": "Linda",
    "y": "898",
    "prop": "0.000461499245566935"
  },
  {
    "x": "1999",
    "sex": "F",
    "assembly": "Helen",
    "y": "841",
    "prop": "0.000432205863610014"
  },
  {
    "x": "1999",
    "sex": "F",
    "assembly": "Deborah",
    "y": "524",
    "prop": "0.000269293546410995"
  },
  {
    "x": "1999",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "335",
    "prop": "0.000172162858869625"
  },
  {
    "x": "1999",
    "sex": "F",
    "assembly": "Betty",
    "y": "182",
    "prop": "9.35332546694679e-05"
  },
  {
    "x": "2000",
    "sex": "F",
    "assembly": "Ashley",
    "y": "17997",
    "prop": "0.00902349055709788"
  },
  {
    "x": "2000",
    "sex": "F",
    "assembly": "Jessica",
    "y": "15705",
    "prop": "0.00787430789571719"
  },
  {
    "x": "2000",
    "sex": "F",
    "assembly": "Amanda",
    "y": "8550",
    "prop": "0.00428687249337039"
  },
  {
    "x": "2000",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1392",
    "prop": "0.000697932925236442"
  },
  {
    "x": "2000",
    "sex": "F",
    "assembly": "Helen",
    "y": "890",
    "prop": "0.000446235850187093"
  },
  {
    "x": "2000",
    "sex": "F",
    "assembly": "Linda",
    "y": "849",
    "prop": "0.000425678917762744"
  },
  {
    "x": "2000",
    "sex": "F",
    "assembly": "Deborah",
    "y": "545",
    "prop": "0.00027325678466513"
  },
  {
    "x": "2000",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "312",
    "prop": "0.000156433241863341"
  },
  {
    "x": "2000",
    "sex": "F",
    "assembly": "Betty",
    "y": "174",
    "prop": "8.72416156545553e-05"
  },
  {
    "x": "2001",
    "sex": "F",
    "assembly": "Ashley",
    "y": "16524",
    "prop": "0.00834726311913036"
  },
  {
    "x": "2001",
    "sex": "F",
    "assembly": "Jessica",
    "y": "13917",
    "prop": "0.00703031111286233"
  },
  {
    "x": "2001",
    "sex": "F",
    "assembly": "Amanda",
    "y": "6963",
    "prop": "0.00351742877623485"
  },
  {
    "x": "2001",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1223",
    "prop": "0.000617810626645874"
  },
  {
    "x": "2001",
    "sex": "F",
    "assembly": "Helen",
    "y": "884",
    "prop": "0.000446561401434957"
  },
  {
    "x": "2001",
    "sex": "F",
    "assembly": "Linda",
    "y": "837",
    "prop": "0.000422818883485361"
  },
  {
    "x": "2001",
    "sex": "F",
    "assembly": "Deborah",
    "y": "489",
    "prop": "0.000247023218667075"
  },
  {
    "x": "2001",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "317",
    "prop": "0.00016013570617068"
  },
  {
    "x": "2001",
    "sex": "F",
    "assembly": "Betty",
    "y": "153",
    "prop": "7.72894733252811e-05"
  },
  {
    "x": "2002",
    "sex": "F",
    "assembly": "Ashley",
    "y": "15339",
    "prop": "0.00777226488632702"
  },
  {
    "x": "2002",
    "sex": "F",
    "assembly": "Jessica",
    "y": "11913",
    "prop": "0.00603631211883524"
  },
  {
    "x": "2002",
    "sex": "F",
    "assembly": "Amanda",
    "y": "6132",
    "prop": "0.00310708183603607"
  },
  {
    "x": "2002",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1113",
    "prop": "0.000563956634622985"
  },
  {
    "x": "2002",
    "sex": "F",
    "assembly": "Helen",
    "y": "875",
    "prop": "0.000443362134137567"
  },
  {
    "x": "2002",
    "sex": "F",
    "assembly": "Linda",
    "y": "769",
    "prop": "0.000389651978459187"
  },
  {
    "x": "2002",
    "sex": "F",
    "assembly": "Deborah",
    "y": "474",
    "prop": "0.000240175601807093"
  },
  {
    "x": "2002",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "263",
    "prop": "0.000133261990032206"
  },
  {
    "x": "2002",
    "sex": "F",
    "assembly": "Betty",
    "y": "127",
    "prop": "6.43508468976811e-05"
  },
  {
    "x": "2003",
    "sex": "F",
    "assembly": "Ashley",
    "y": "14512",
    "prop": "0.00723815072032368"
  },
  {
    "x": "2003",
    "sex": "F",
    "assembly": "Jessica",
    "y": "10445",
    "prop": "0.00520965299571257"
  },
  {
    "x": "2003",
    "sex": "F",
    "assembly": "Amanda",
    "y": "5339",
    "prop": "0.00266293320671225"
  },
  {
    "x": "2003",
    "sex": "F",
    "assembly": "Patricia",
    "y": "1011",
    "prop": "0.000504256503462462"
  },
  {
    "x": "2003",
    "sex": "F",
    "assembly": "Helen",
    "y": "783",
    "prop": "0.000390536935916031"
  },
  {
    "x": "2003",
    "sex": "F",
    "assembly": "Linda",
    "y": "739",
    "prop": "0.000368591054459702"
  },
  {
    "x": "2003",
    "sex": "F",
    "assembly": "Deborah",
    "y": "421",
    "prop": "0.000209982183934418"
  },
  {
    "x": "2003",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "291",
    "prop": "0.000145142079631628"
  },
  {
    "x": "2003",
    "sex": "F",
    "assembly": "Betty",
    "y": "142",
    "prop": "7.08253446999699e-05"
  },
  {
    "x": "2004",
    "sex": "F",
    "assembly": "Ashley",
    "y": "14370",
    "prop": "0.00712775344818093"
  },
  {
    "x": "2004",
    "sex": "F",
    "assembly": "Jessica",
    "y": "9469",
    "prop": "0.00469677782886745"
  },
  {
    "x": "2004",
    "sex": "F",
    "assembly": "Amanda",
    "y": "4677",
    "prop": "0.00231986798031609"
  },
  {
    "x": "2004",
    "sex": "F",
    "assembly": "Patricia",
    "y": "997",
    "prop": "0.000494528196787501"
  },
  {
    "x": "2004",
    "sex": "F",
    "assembly": "Helen",
    "y": "860",
    "prop": "0.000426573971150703"
  },
  {
    "x": "2004",
    "sex": "F",
    "assembly": "Linda",
    "y": "727",
    "prop": "0.000360603810496001"
  },
  {
    "x": "2004",
    "sex": "F",
    "assembly": "Deborah",
    "y": "427",
    "prop": "0.000211798936838779"
  },
  {
    "x": "2004",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "288",
    "prop": "0.000142852678710933"
  },
  {
    "x": "2004",
    "sex": "F",
    "assembly": "Betty",
    "y": "136",
    "prop": "6.7458209391274e-05"
  },
  {
    "x": "2005",
    "sex": "F",
    "assembly": "Ashley",
    "y": "13270",
    "prop": "0.00654498034039816"
  },
  {
    "x": "2005",
    "sex": "F",
    "assembly": "Jessica",
    "y": "8108",
    "prop": "0.00399899778447237"
  },
  {
    "x": "2005",
    "sex": "F",
    "assembly": "Amanda",
    "y": "4088",
    "prop": "0.00201626824653713"
  },
  {
    "x": "2005",
    "sex": "F",
    "assembly": "Helen",
    "y": "960",
    "prop": "0.000473487650850206"
  },
  {
    "x": "2005",
    "sex": "F",
    "assembly": "Patricia",
    "y": "877",
    "prop": "0.000432550697703782"
  },
  {
    "x": "2005",
    "sex": "F",
    "assembly": "Linda",
    "y": "745",
    "prop": "0.000367446145711879"
  },
  {
    "x": "2005",
    "sex": "F",
    "assembly": "Deborah",
    "y": "425",
    "prop": "0.00020961692876181"
  },
  {
    "x": "2005",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "234",
    "prop": "0.000115412614894738"
  },
  {
    "x": "2005",
    "sex": "F",
    "assembly": "Betty",
    "y": "132",
    "prop": "6.51045519919034e-05"
  },
  {
    "x": "2006",
    "sex": "F",
    "assembly": "Ashley",
    "y": "12340",
    "prop": "0.00590922303294464"
  },
  {
    "x": "2006",
    "sex": "F",
    "assembly": "Jessica",
    "y": "6809",
    "prop": "0.00326060774970179"
  },
  {
    "x": "2006",
    "sex": "F",
    "assembly": "Amanda",
    "y": "3355",
    "prop": "0.00160659994129086"
  },
  {
    "x": "2006",
    "sex": "F",
    "assembly": "Helen",
    "y": "948",
    "prop": "0.000453966242725406"
  },
  {
    "x": "2006",
    "sex": "F",
    "assembly": "Patricia",
    "y": "775",
    "prop": "0.000371122192101466"
  },
  {
    "x": "2006",
    "sex": "F",
    "assembly": "Linda",
    "y": "698",
    "prop": "0.000334249406563643"
  },
  {
    "x": "2006",
    "sex": "F",
    "assembly": "Deborah",
    "y": "423",
    "prop": "0.000202560886785704"
  },
  {
    "x": "2006",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "265",
    "prop": "0.000126899846331469"
  },
  {
    "x": "2006",
    "sex": "F",
    "assembly": "Betty",
    "y": "135",
    "prop": "6.46470915273522e-05"
  },
  {
    "x": "2007",
    "sex": "F",
    "assembly": "Ashley",
    "y": "11423",
    "prop": "0.00540374075290008"
  },
  {
    "x": "2007",
    "sex": "F",
    "assembly": "Jessica",
    "y": "5704",
    "prop": "0.00269832244196289"
  },
  {
    "x": "2007",
    "sex": "F",
    "assembly": "Amanda",
    "y": "3038",
    "prop": "0.00143714999626284"
  },
  {
    "x": "2007",
    "sex": "F",
    "assembly": "Helen",
    "y": "931",
    "prop": "0.000440416934338613"
  },
  {
    "x": "2007",
    "sex": "F",
    "assembly": "Patricia",
    "y": "725",
    "prop": "0.000342967000424806"
  },
  {
    "x": "2007",
    "sex": "F",
    "assembly": "Linda",
    "y": "659",
    "prop": "0.000311745176937858"
  },
  {
    "x": "2007",
    "sex": "F",
    "assembly": "Deborah",
    "y": "371",
    "prop": "0.000175504492631177"
  },
  {
    "x": "2007",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "262",
    "prop": "0.000123941178084551"
  },
  {
    "x": "2007",
    "sex": "F",
    "assembly": "Betty",
    "y": "134",
    "prop": "6.33897628371366e-05"
  },
  {
    "x": "2008",
    "sex": "F",
    "assembly": "Ashley",
    "y": "9402",
    "prop": "0.00452030531532519"
  },
  {
    "x": "2008",
    "sex": "F",
    "assembly": "Jessica",
    "y": "4732",
    "prop": "0.00227505687642191"
  },
  {
    "x": "2008",
    "sex": "F",
    "assembly": "Amanda",
    "y": "2439",
    "prop": "0.00117262546948289"
  },
  {
    "x": "2008",
    "sex": "F",
    "assembly": "Helen",
    "y": "884",
    "prop": "0.000425010625265632"
  },
  {
    "x": "2008",
    "sex": "F",
    "assembly": "Patricia",
    "y": "629",
    "prop": "0.000302411406439007"
  },
  {
    "x": "2008",
    "sex": "F",
    "assembly": "Linda",
    "y": "611",
    "prop": "0.000293757343933598"
  },
  {
    "x": "2008",
    "sex": "F",
    "assembly": "Deborah",
    "y": "355",
    "prop": "0.000170677343856673"
  },
  {
    "x": "2008",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "242",
    "prop": "0.000116349062572718"
  },
  {
    "x": "2008",
    "sex": "F",
    "assembly": "Betty",
    "y": "137",
    "prop": "6.58670312911669e-05"
  },
  {
    "x": "2009",
    "sex": "F",
    "assembly": "Ashley",
    "y": "7811",
    "prop": "0.00386339097012116"
  },
  {
    "x": "2009",
    "sex": "F",
    "assembly": "Jessica",
    "y": "3793",
    "prop": "0.00187605197153624"
  },
  {
    "x": "2009",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1952",
    "prop": "0.000965476785773462"
  },
  {
    "x": "2009",
    "sex": "F",
    "assembly": "Helen",
    "y": "826",
    "prop": "0.000408547041520942"
  },
  {
    "x": "2009",
    "sex": "F",
    "assembly": "Patricia",
    "y": "564",
    "prop": "0.000278959481135365"
  },
  {
    "x": "2009",
    "sex": "F",
    "assembly": "Linda",
    "y": "550",
    "prop": "0.000272034955007891"
  },
  {
    "x": "2009",
    "sex": "F",
    "assembly": "Deborah",
    "y": "346",
    "prop": "0.000171134717150419"
  },
  {
    "x": "2009",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "226",
    "prop": "0.000111781636057788"
  },
  {
    "x": "2009",
    "sex": "F",
    "assembly": "Betty",
    "y": "148",
    "prop": "7.32021333475781e-05"
  },
  {
    "x": "2010",
    "sex": "F",
    "assembly": "Ashley",
    "y": "6306",
    "prop": "0.00322252105804575"
  },
  {
    "x": "2010",
    "sex": "F",
    "assembly": "Jessica",
    "y": "3195",
    "prop": "0.00163272356175962"
  },
  {
    "x": "2010",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1655",
    "prop": "0.000845745694745594"
  },
  {
    "x": "2010",
    "sex": "F",
    "assembly": "Helen",
    "y": "703",
    "prop": "0.000359250286046014"
  },
  {
    "x": "2010",
    "sex": "F",
    "assembly": "Patricia",
    "y": "479",
    "prop": "0.000244780778116701"
  },
  {
    "x": "2010",
    "sex": "F",
    "assembly": "Linda",
    "y": "476",
    "prop": "0.00024324770434979"
  },
  {
    "x": "2010",
    "sex": "F",
    "assembly": "Deborah",
    "y": "354",
    "prop": "0.000180902704495432"
  },
  {
    "x": "2010",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "240",
    "prop": "0.000122645901352835"
  },
  {
    "x": "2010",
    "sex": "F",
    "assembly": "Betty",
    "y": "132",
    "prop": "6.74552457440595e-05"
  },
  {
    "x": "2011",
    "sex": "F",
    "assembly": "Ashley",
    "y": "5398",
    "prop": "0.00279205644940212"
  },
  {
    "x": "2011",
    "sex": "F",
    "assembly": "Jessica",
    "y": "2620",
    "prop": "0.00135516633890952"
  },
  {
    "x": "2011",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1409",
    "prop": "0.000728789836459354"
  },
  {
    "x": "2011",
    "sex": "F",
    "assembly": "Helen",
    "y": "729",
    "prop": "0.000377067275215663"
  },
  {
    "x": "2011",
    "sex": "F",
    "assembly": "Linda",
    "y": "488",
    "prop": "0.000252412661598414"
  },
  {
    "x": "2011",
    "sex": "F",
    "assembly": "Patricia",
    "y": "427",
    "prop": "0.000220861078898612"
  },
  {
    "x": "2011",
    "sex": "F",
    "assembly": "Deborah",
    "y": "332",
    "prop": "0.000171723368136626"
  },
  {
    "x": "2011",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "276",
    "prop": "0.000142757980740086"
  },
  {
    "x": "2011",
    "sex": "F",
    "assembly": "Betty",
    "y": "167",
    "prop": "8.63789231289653e-05"
  },
  {
    "x": "2012",
    "sex": "F",
    "assembly": "Ashley",
    "y": "4696",
    "prop": "0.00242806420306393"
  },
  {
    "x": "2012",
    "sex": "F",
    "assembly": "Jessica",
    "y": "2327",
    "prop": "0.00120317406314518"
  },
  {
    "x": "2012",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1228",
    "prop": "0.00063493672090343"
  },
  {
    "x": "2012",
    "sex": "F",
    "assembly": "Helen",
    "y": "772",
    "prop": "0.000399162173076098"
  },
  {
    "x": "2012",
    "sex": "F",
    "assembly": "Linda",
    "y": "448",
    "prop": "0.000231638152251414"
  },
  {
    "x": "2012",
    "sex": "F",
    "assembly": "Patricia",
    "y": "394",
    "prop": "0.000203717482113967"
  },
  {
    "x": "2012",
    "sex": "F",
    "assembly": "Deborah",
    "y": "336",
    "prop": "0.000173728614188561"
  },
  {
    "x": "2012",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "277",
    "prop": "0.000143222696816165"
  },
  {
    "x": "2012",
    "sex": "F",
    "assembly": "Betty",
    "y": "140",
    "prop": "7.2386922578567e-05"
  },
  {
    "x": "2013",
    "sex": "F",
    "assembly": "Ashley",
    "y": "3936",
    "prop": "0.00204898297876106"
  },
  {
    "x": "2013",
    "sex": "F",
    "assembly": "Jessica",
    "y": "1946",
    "prop": "0.00101303884061713"
  },
  {
    "x": "2013",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1064",
    "prop": "0.000553891740193539"
  },
  {
    "x": "2013",
    "sex": "F",
    "assembly": "Helen",
    "y": "738",
    "prop": "0.000384184308517699"
  },
  {
    "x": "2013",
    "sex": "F",
    "assembly": "Linda",
    "y": "441",
    "prop": "0.000229573550211796"
  },
  {
    "x": "2013",
    "sex": "F",
    "assembly": "Patricia",
    "y": "419",
    "prop": "0.000218120901448396"
  },
  {
    "x": "2013",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "334",
    "prop": "0.000173872031226167"
  },
  {
    "x": "2013",
    "sex": "F",
    "assembly": "Deborah",
    "y": "329",
    "prop": "0.000171269156507213"
  },
  {
    "x": "2013",
    "sex": "F",
    "assembly": "Betty",
    "y": "174",
    "prop": "9.05800402196202e-05"
  },
  {
    "x": "2014",
    "sex": "F",
    "assembly": "Ashley",
    "y": "3547",
    "prop": "0.00182125980653672"
  },
  {
    "x": "2014",
    "sex": "F",
    "assembly": "Jessica",
    "y": "1790",
    "prop": "0.000919102073217006"
  },
  {
    "x": "2014",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1048",
    "prop": "0.000538111157950515"
  },
  {
    "x": "2014",
    "sex": "F",
    "assembly": "Helen",
    "y": "801",
    "prop": "0.000411285341143476"
  },
  {
    "x": "2014",
    "sex": "F",
    "assembly": "Linda",
    "y": "470",
    "prop": "0.000241328477325136"
  },
  {
    "x": "2014",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "382",
    "prop": "0.000196143570932344"
  },
  {
    "x": "2014",
    "sex": "F",
    "assembly": "Patricia",
    "y": "377",
    "prop": "0.000193576246705481"
  },
  {
    "x": "2014",
    "sex": "F",
    "assembly": "Deborah",
    "y": "369",
    "prop": "0.0001894685279425"
  },
  {
    "x": "2014",
    "sex": "F",
    "assembly": "Betty",
    "y": "193",
    "prop": "9.90987151569174e-05"
  },
  {
    "x": "2015",
    "sex": "F",
    "assembly": "Ashley",
    "y": "3409",
    "prop": "0.00176165787043521"
  },
  {
    "x": "2015",
    "sex": "F",
    "assembly": "Jessica",
    "y": "1577",
    "prop": "0.000814941173856356"
  },
  {
    "x": "2015",
    "sex": "F",
    "assembly": "Amanda",
    "y": "1013",
    "prop": "0.000523484723599549"
  },
  {
    "x": "2015",
    "sex": "F",
    "assembly": "Helen",
    "y": "757",
    "prop": "0.000391192434121282"
  },
  {
    "x": "2015",
    "sex": "F",
    "assembly": "Linda",
    "y": "423",
    "prop": "0.000218592337692605"
  },
  {
    "x": "2015",
    "sex": "F",
    "assembly": "Dorothy",
    "y": "395",
    "prop": "0.00020412286853092"
  },
  {
    "x": "2015",
    "sex": "F",
    "assembly": "Deborah",
    "y": "346",
    "prop": "0.00017880129749797"
  },
  {
    "x": "2015",
    "sex": "F",
    "assembly": "Patricia",
    "y": "346",
    "prop": "0.00017880129749797"
  },
  {
    "x": "2015",
    "sex": "F",
    "assembly": "Betty",
    "y": "186",
    "prop": "9.61186165740535e-05"
  }
]

const Plot: React.FC<IPlotProps> = (props) => {

  const margin = { top: 10, right: 10, bottom: 10, left: 40 }

  const svgGroupRef   = useRef<SVGSVGElement>(null)
  const xAxisGroupRef = useRef<SVGSVGElement | null>(null)
  const yAxisGroupRef = useRef<SVGSVGElement | null>(null)

  const [id, setId] = useState<any>(null)
  const [width, setWidth] = useState<any>(50)
  const [height, setHeight] = useState<any>(50)

  const [chartWidth, setChartWidth] = useState<any>(50)
  const [chartHeight, setChartHeight] = useState<any>(50)

  const [xScale, setXScale] = useState<d3.ScaleLinear<number, number, never>>()
  const [yScale, setYScale] = useState<d3.ScaleLinear<number, number, never>>()

  const xScaleRef = useRef(xScale)
  const yScaleRef = useRef(yScale)

  const init = useCallback(() => {

    const _width = props.width - margin.left - margin.right
    const _height = props.height - margin.top - margin.bottom

    const _chartWidth = _width - margin.left - margin.right
    const _chartHeight = _height - margin.top - margin.bottom - 70
    
    xScaleRef.current = d3.scaleLinear().range([0, _chartWidth])
    setXScale(xScaleRef.current)
    
    yScaleRef.current = d3.scaleLinear().range([_chartHeight, 0])
    setYScale(yScaleRef.current)

    setId(props.id)

    setWidth(_width)
    setChartWidth(_chartWidth)
    
    setHeight(_height)
    setChartHeight(_chartHeight)

  }, [props.id, props.width, props.height])

  const update = useCallback(() => {

    const updateAxis = () => {
      if(!xAxisGroupRef.current || !yAxisGroupRef.current || !yScaleRef.current || !xScaleRef.current) return

      const numTicks = 5
      
      const xAxisGroup = d3.select(xAxisGroupRef.current)
      const yAxisGroup = d3.select(yAxisGroupRef.current)

      xScaleRef.current.domain(d3.extent(data, function(d) { return d.x; }))
      yScaleRef.current.domain([0, d3.max(data, function(d) { return +d.y; })])

      const xAxis = d3.axisBottom(xScaleRef.current)
        .tickValues(xScaleRef.current.ticks(numTicks).concat(xScaleRef.current.domain()))
      
        const yAxis = d3.axisLeft(yScaleRef.current)
        .tickValues(yScaleRef.current.ticks(numTicks).concat(yScaleRef.current.domain()))

      xAxisGroup.call(xAxis)
      yAxisGroup.call(yAxis)
    }

    const updateLineChart = () => {

      if(!svgGroupRef.current || !xAxisGroupRef.current || !yAxisGroupRef.current || !yScaleRef.current || !xScaleRef.current) return

      const dataNest = Array.from(
        d3.group<any, any[]>(data, d => d.assembly),
        ([key, value]) => ({key, value})
      )

      const res = dataNest.map(function(d){ return d.key })

      const color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

      const line = d3.line()
          // .x((d:any) => x(d.year))
          // .y((d:any) => y(+d.n))
          .x((d:any) => xScaleRef.current ?  xScaleRef.current(d.x) : 0)
          .y((d:any) => yScaleRef.current ? yScaleRef.current(+d.y) : 0)
          // .curve(d3.curveMonotoneX)

      const svg = d3.select(svgGroupRef.current)

      const lineChart = svg.selectAll(`.line-chart-${id}`)
        .data(dataNest)

      lineChart.exit().remove()

      lineChart
          .transition().duration(500)
          .attr('d', (d:any) => line(d.value))
          .attr('stroke', (d:any) => color(d.key))         
        
      lineChart
          .enter().append('path')
          .attr('class', `line-chart-${id}`)
          .attr('id'    , (d:any) => `line-chart-${id}-${d.key}`)
          .transition().duration(500)
          .attr('d'     , (d:any) => line(d.value))
          // .attr('stroke', "black")
          .attr("fill", "none")
          
    }

    updateAxis()
    updateLineChart()
    
      

  },[id, data])

  useEffect(() => init, [init])
  useEffect(() => update, [update])
  
  return (
    <div id={`plot-wrap-up-${id}`}>
      <svg id={`plot-svg-${id}`} width={width} height={height} style={{position: "absolute"}}>
        <g id={`plot-svg-g-${id}`} width={chartWidth} height={chartHeight} transform={`translate (${margin.left}, ${margin.top})`} ref={svgGroupRef}>
          <g id={`plot-xAxis-g-${id}`} transform={`translate (0, ${chartHeight})`} ref={xAxisGroupRef}></g>
          <g id={`plot-yAxis-g-${id}`} ref={yAxisGroupRef}></g>
        </g>
      </svg>
    </div>
  )
}

export default Plot