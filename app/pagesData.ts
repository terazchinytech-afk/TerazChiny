export const HERO_DATA = {
  mainTitle: "chiny",
  mainDescription:
    "Odkryj starożytną historię, tętniące życiem miasta, zabierające dech w piersiach widoki. Zaczynając od imperialnych miejsc po festiwale.",
  cta: {
    label: "Sprawdź terminy",
    href: "/terminy",
  },
  slides: [
    {
      id: 0,
      subtitle: "Mur Chiński",
      desc: "Jeden z siedmiu nowych cudów świata. Symbol potęgi i wytrwałości, wijący się przez tysiące kilometrów górskich szczytów.",
      img: "/mur-chinski.png",
      outlineImage: "/murChińskiOutline.png",
      position:
        "left-[100px] top-[35px] min-[2050px]:left-[120px] max-[650px]:!h-[150px]  max-[650px]:!w-[auto] max-[650px]:top-[90px] max-[650px]:left-[40px] max-[450px]:!h-[130px]  max-[450px]:!w-[auto] max-[450px]:top-[90px] max-[450px]:left-[40px] max-[420px]:!h-[110px]  max-[420px]:!w-[auto] max-[420px]:top-[120px] max-[420px]:left-[-50px] ",
      imageSizes: {
        height: 250,
        width: 250,
      },
    },
    {
      id: 1,
      subtitle: "Zakazane Miasto",
      desc: "Największy kompleks pałacowy świata. Przez 500 lat dom cesarzy, niedostępny dla zwykłych śmiertelników, pełen tajemnic.",
      img: "/zakazane-miasto.png",
      outlineImage: "/zakazaneMiastoOutline.png",
      position:
        "left-[100px] top-[-135px] max-[720px]:!h-[230px]  max-[720px]:!w-[auto] max-[720px]:top-[-180px] max-[720px]:left-[40px]   max-[540px]:!h-[230px]  max-[540px]:!w-[auto] max-[540px]:top-[10px] max-[540px]:left-[-170px]  ",
      imageSizes: {
        height: 350,
        width: 350,
      },
    },
    {
      id: 2,
      subtitle: "Armia Terakotowa",
      desc: "Tysiące naturalnej wielkości figur żołnierzy, koni i rydwanów, które miały strzec Pierwszego Cesarza w życiu pozagrobowym.",
      img: "/armia-terakotowa.png",
      outlineImage: "/armiaOutline.png",
      position:
        "left-[120px] top-[95px] rounded-2xl max-[650px]:top-[95px] max-[650px]:left-[10px]   max-[420px]:top-[125px] max-[420px]:left-[-150px]",
      imageSizes: {
        height: 200,
        width: 205,
      },
    },
    {
      id: 3,
      subtitle: "Pałac Letni",
      desc: "Arcydzieło chińskiego projektowania ogrodów. Miejsce, gdzie cesarze uciekali przed upałem Pekinu, by odpocząć nad jeziorem Kunming.",
      img: "/palac-letni.png",
      outlineImage: "/palacLetniOutline.png",
      position:
        "left-[130px] top-[-115px] max-[770px]:top-[125px] max-[770px]:left-[0px]    max-[420px]:top-[125px] max-[420px]:left-[-100px] max-[420px]:!h-[110px] max-[420px]:w-auto ",
      imageSizes: {
        height: 250,
        width: 250,
      },
    },
    {
      id: 4,
      subtitle: "Góry Zhangjiajie",
      desc: "Mistyczne filary z piaskowca tonące w chmurach. To właśnie ten krajobraz był inspiracją do stworzenia lewitujących gór w filmie Avatar.",
      img: "/zhangjiajie.png",
      outlineImage: "/góryZahangjiajieOutline.png",
      position:
        "left-[150px] top-[-120px] max-[1140px]:h-[130px] max-[1140px]:w-auto max-[1140px]:top-[100px] max-[1140px]:left-[-30px] max-[900px]:left-[-100px] max-[420px]:left-[-200px]",
      imageSizes: {
        height: 350,
        width: 250,
      },
    },
  ],
};

const aboutSection = {
  aboutSection: {
    sectionTag: "O Nas",
    title: {
      line1: "Nie jesteśmy zwykłym",
      highlightedPart: "biurem podróży.",
    },
    description: [
      "Teraz Chiny to projekt zrodzony z pasji do Państwa Środka. Od ponad dekady przecieramy szlaki tam, gdzie inni nie docierają. Nie pokazujemy tylko zabytków – uczymy rozumieć kulturę, historię i smakować lokalną kuchnię.",
      "Naszą misją jest pokazanie prawdziwego oblicza Chin, z dala od utartych schematów i turystycznych pułapek.",
    ],
    images: {
      mainImage: "/zhangjiajie.png",
      secondaryImage: "/zakazane-miasto.png",
    },
    statistics: [
      {
        label: "Lat doświadczenia",
        value: "12+",
        iconType: "Globe",
      },
      {
        label: "Zrealizowanych wypraw",
        value: "150+",
        iconType: "Map",
      },
      {
        label: "Zadowolonych podróżników",
        value: "2k+",
        iconType: "Users",
      },
    ],
  },
};

const calendarSection = {
  calendarSection: {
    header: {
      badge: "Sezon 2024/2025",
      title: {
        mainText: "Rezerwuj miejsce w",
        highlightedText: "przygodzie.",
      },
      description:
        "Nasze grupy są małe (max 12 osób), a miejsca znikają szybko. Wybierz termin poniżej i zabezpiecz swoją cenę.",
      ctaButton: {
        text: "Pełny kalendarz",
        link: "/kalendarz-wypraw",
        showButton: true,
      },
    },
    tripsSettings: {
      mode: "manual_selection",
      maxItems: 4,
      referenceField: "trips",
    },
  },
};

const blogSection = {
  blogSection: {
    header: {
      subtitle: "Dziennik Wypraw",
      title: {
        mainText: "Ostatnie",
        highlightedText: "Historie",
      },
    },
    ctaButton: {
      text: "Zobacz wszystkie",
      link: "/blog",
    },
    postsSettings: {
      mode: "automatic_latest",
      maxItems: 3,
      referenceType: "post",
    },
  },
};
const faqSection = {
  faqSection: {
    header: {
      badge: "FAQ",
      title: {
        mainText: "Najczęściej zadawane",
        highlightedText: "pytania.",
      },
    },
    contactCta: {
      text: "Masz inne pytanie?",
      link: "/#kontakt",
      showButton: true,
    },
    items: [
      {
        question: "Czy potrzebuję wizy do Chin?",
        answer:
          "Tak, obywatele Polski potrzebują wizy. Jednak od niedawna dla pobytów do 15 dni wiza nie jest wymagana (ruch bezwizowy). W przypadku naszych dłuższych wypraw pomagamy w całej procedurze wizowej – od wypełnienia wniosku po umówienie wizyty w konsulacie.",
      },
      {
        question: "Jak liczne są grupy?",
        answer:
          "Stawiamy na komfort i kameralną atmosferę. Nasze grupy liczą maksymalnie 12-16 osób. Dzięki temu pilot ma czas dla każdego uczestnika, a we możemy odwiedzać miejsca niedostępne dla dużych autokarów i masowej turystyki.",
      },
      {
        question: "Czy cena zawiera przelot?",
        answer:
          "Cena podana przy ofercie obejmuje pełny pakiet na miejscu (hotele, transfery, bilety wstępu, wyżywienie, opiekę pilota). Przelot międzynarodowy jest płatny dodatkowo, ale pomagamy w zakupie biletów grupowych w najlepszych cenach.",
      },
      {
        question: "Jak wygląda standard hoteli?",
        answer:
          "Wybieramy hotele o standardzie 4* i 5* (wg lokalnej kategoryzacji), które łączą komfort z lokalnym klimatem. Często są to hotele butikowe w historycznych dzielnicach. Zależy nam, aby hotel był miejscem odpoczynku.",
      },
      {
        question: "Czy wyjazd jest bezpieczny?",
        answer:
          "Chiny są jednym z najbezpieczniejszych krajów dla turystów. Przestępczość pospolita jest znikoma. Dodatkowo, przez cały czas trwania wyprawy jesteś pod opieką doświadczonego polskiego pilota.",
      },
    ],
  },
};

const contactSection = {
  contactSection: {
    mainContent: {
      heroImage: "/contactImage.png",
      headline: {
        mainText: "Porozmawiajmy o Twojej",
        highlightedText: "podróży",
      },
      description:
        "Od Wielkiego Muru po futurystyczny Szanghaj – przekraczamy bariery językowe i kulturowe, abyś Ty mógł skupić się wyłącznie na odkrywaniu. Zadzwoń do nas, a rozwiejemy każdą Twoją wątpliwość.",
    },
    contactCard: {
      cardLogo: "/TerazChinyLogoNegatyw.svg",
      email: {
        label: "Email",
        value: "kontakt@terazchiny.pl",
      },
      phone: {
        label: "Telefon",
        value: "+48 123 456 789",
      },
      workingHours: "Pn - Pt: 09:00 - 17:00",
    },
  },
};
