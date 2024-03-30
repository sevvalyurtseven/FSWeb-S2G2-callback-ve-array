const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

// Year özelliği 2014 ve Stage özelliği "Final" olan maçları sececegiz. Yani 2014 yilinda oynanan finalleri filtreleyecegiz.

const Finals2014 = fifaData.filter(
  (mac) => mac.Stage === "Final" && mac.Year === 2014
);

console.log("GÖREV 1-A: 2014 DÜNYA KUPASI FINALI MAÇI BİLGİLERİ: ", Finals2014);
console.log(
  "GÖREV 1-A: 2014 DÜNYA KUPASI FINALI EVSAHIBI TAKIM ISMI: ",
  Finals2014[0]["Home Team Name"]
);

// Eger filtreleyerek olusturdugumuz yeni dizide herhangi bir veri yoksa mac bulunamadi, var ise o verinin Home Team Name'ini yazdiracagiz

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

console.log(
  "GÖREV 1-B: 2014 DÜNYA KUPASI FINALI DEPLASMAN TAKIM ISMI: ",
  Finals2014[0]["Away Team Name"]
);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

console.log(
  "GÖREV 1-C: 2014 DÜNYA KUPASI FINALI EV SAHIBI TAKIM GOLLERI: ",
  Finals2014[0]["Home Team Goals"]
);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

console.log(
  "GÖREV 1-D: 2014 DÜNYA KUPASI FINALI DEPLASMAN TAKIM GOLLERI: ",
  Finals2014[0]["Away Team Goals"]
);

//(e) 2014 Dünya kupası finali kazananı*/

if (Finals2014[0]["Away Team Goals"] > Finals2014[0]["Home Team Goals"]) {
  console.log(
    "GÖREV 1-E: 2014 DÜNYA KUPASI FINALI KAZANAN TAKIM: ",
    Finals2014[0]["Away Team Name"]
  );
} else if (
  Finals2014[0]["Home Team Goals"] > Finals2014[0]["Away Team Goals"]
) {
  console.log(
    "GÖREV 1-E: 2014 DÜNYA KUPASI FINALI KAZANAN TAKIM: ",
    Finals2014[0]["Home Team Name"]
  );
} else {
  console.log("GÖREV 1-E: 2014 DÜNYA KUPASI FINALI BERABERE");
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(maclar) {
  const finals = maclar.filter((mac) => mac.Stage === "Final");
  return finals;
}

console.log("GÖREV 2: FİNALLER ", Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(maclarDizisi, finallerCallback) {
  const finaller = finallerCallback(maclarDizisi);

  console.log("*********FİNALLER:********** ", finaller);

  /* for(let i = 0; i < finaller.length; i++) {
		console.log("*********YILLAR:********** ", finaller[i].Year);
	} */

  const yillar = finaller.map((mac) => mac.Year);

  return yillar;
}

console.log("GÖREV 3: YILLAR ", Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(maclarDizisi, finallerCallback) {
  const finaller = finallerCallback(maclarDizisi);

  const kazananlar = finaller.map((mac, index) => {
    if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
      return mac["Home Team Name"];
    } else {
      return mac["Away Team Name"];
    }
  });
  return kazananlar;
}

console.log("GÖREV 4: KAZANANLAR ", Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(
  maclarDizisi,
  finallerCallback,
  yillarCallback,
  kazananlarCallback
) {
  const yillar = yillarCallback(maclarDizisi, finallerCallback);

  const KazananUlkeler = kazananlarCallback(maclarDizisi, finallerCallback);

  //kazananUlkeler ile yillarin indexleri birbirine eşit
  //ayni yilin indexi ile ayni ülkenin indexi ayni

  /* for(let i = 0; i < 19; i++) {
	  return `${yillar[i]} yılında, ${KazananUlkeler[i]} dünya kupasını kazandı!`;
  } */

  return yillar.map((yil, index) => {
    return `${yil} yılında, ${KazananUlkeler[index]} dünya kupasını kazandı!`;
  });
}

console.log(
  "GÖREV 5: YILLARA GÖRE KAZANANLAR: ",
  YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar)
);

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finallerDizisi) {
  // let toplamGol = 0;

  //for ile cözüm:

  /* for (let i = 0; i < finallerDizisi.length; i++) {
    toplamGol +=
      finallerDizisi[i]["Home Team Goals"] +
      finallerDizisi[i]["Away Team Goals"];
  }  */

  //for each ile cözüm:

  /* finallerDizisi.forEach((mac) => {
    toplamGol += mac["Home Team Goals"] + mac["Away Team Goals"];
  });
  return (toplamGol / finallerDizisi.length).toFixed(2); */

  //reduce ile çözüm:

  const toplamGol = finallerDizisi.reduce((toplam, mac) => {
    return toplam + mac["Home Team Goals"] + mac["Away Team Goals"];
  }, 0); // Başlangıç değeri olarak 0 kullanılır

  // Elde edilen toplam gol sayısını maç sayısına bölerek ortalama gol sayısını hesaplayalım
  const ortalamaGolSayisi = toplamGol / finallerDizisi.length;

  // Sonucu 2 ondalık basamağa yuvarlayıp string olarak döndürelim
  return ortalamaGolSayisi.toFixed(2);
}

console.log(
  "GÖREV 6: Ortalama Gol Sayısı: ",
  OrtalamaGolSayisi(Finaller(fifaData))
);

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(fifaDataArray, takimKisaltmalari) {
  //final setini olusturalim:
  const finaller = fifaDataArray.filter((mac) => mac.Stage === "Final");

  const kazanmaObj = finaller.reduce((toplamKazanma, mac) => {
    const homeTeam = mac["Home Team Initials"];
    const awayTeam = mac["Away Team Initials"];

    const homeTeamGoals = mac["Home Team Goals"];
    const awayTeamGoals = mac["Away Team Goals"];

    console.log(toplamKazanma);

    if (homeTeamGoals > awayTeamGoals) {
      if (toplamKazanma[homeTeam]) {
        toplamKazanma[homeTeam] = toplamKazanma[homeTeam] + 1;
      } else {
        toplamKazanma[homeTeam] = 1;
      }
    } else {
      if (toplamKazanma[awayTeam]) {
        toplamKazanma[awayTeam] = toplamKazanma[awayTeam] + 1;
      } else {
        toplamKazanma[awayTeam] = 1;
      }
    }
    return toplamKazanma;
  }, {});
  return kazanmaObj[takimKisaltmalari];
}

console.log("BONUS 1: ", UlkelerinKazanmaSayilari(fifaData, "BRA"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(fifaDataArray, takimKisaltmalari) {
  //final setini olusturalim:
  const finaller = fifaDataArray.filter((mac) => mac.Stage === "Final");

  const kazanmaObj = finaller.reduce((toplamKazanma, mac) => {
    const homeTeam = mac["Home Team Initials"];
    const awayTeam = mac["Away Team Initials"];

    const homeTeamGoals = mac["Home Team Goals"];
    const awayTeamGoals = mac["Away Team Goals"];

    console.log(toplamKazanma);

    if (toplamKazanma[homeTeam]) {
      toplamKazanma[homeTeam] = toplamKazanma[homeTeam] + homeTeamGoals;
    } else {
      toplamKazanma[homeTeam] = homeTeamGoals;
    }
    if (toplamKazanma[awayTeam]) {
      toplamKazanma[awayTeam] = toplamKazanma[awayTeam] + awayTeamGoals;
    } else {
      toplamKazanma[awayTeam] = awayTeamGoals;
    }
    return toplamKazanma;
  }, {});

  const sirala = Object.keys(kazanmaObj).sort((a, b) => {
    return kazanmaObj[b] - kazanmaObj[a];
  });
  return sirala[0];
}

console.log("BONUS 2: En Cok Gol Ata Takım: ", EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(fifaDataArray, takimKisaltmalari) {
  //final setini olusturalim:
  const finaller = fifaDataArray.filter((mac) => mac.Stage === "Final");

  const kazanmaObj = finaller.reduce((toplamKazanma, mac) => {
    const homeTeam = mac["Home Team Initials"];
    const awayTeam = mac["Away Team Initials"];

    const homeTeamGoals = mac["Home Team Goals"];
    const awayTeamGoals = mac["Away Team Goals"];

    console.log(toplamKazanma);

    if (toplamKazanma[homeTeam]) {
      toplamKazanma[homeTeam] = toplamKazanma[homeTeam] + awayTeamGoals;
    } else {
      toplamKazanma[homeTeam] = awayTeamGoals;
    }
    if (toplamKazanma[awayTeam]) {
      toplamKazanma[awayTeam] = toplamKazanma[awayTeam] + homeTeamGoals;
    } else {
      toplamKazanma[awayTeam] = homeTeamGoals;
    }
    return toplamKazanma;
  }, {});

  const sirala = Object.keys(kazanmaObj).sort((a, b) => {
    return kazanmaObj[b] - kazanmaObj[a];
  });
  return sirala[0];
}

console.log("BONUS 3: En Kotu Defans Takım: ", EnKotuDefans(fifaData));

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
