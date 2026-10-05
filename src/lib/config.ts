// ============================================================
// HOTEL CONFIGURATION — Edit this file to update all content
// ============================================================

export const HOTEL_CONFIG = {
  name: 'Palmiers Hôtel Club',
  tagline: {
    fr: 'Votre oasis de confort au cœur d\'Errachidia',
    en: 'Your oasis of comfort in the heart of Errachidia',
    ar: 'واحة راحتك في قلب الراشيدية'
  },
  address: {
    street: 'Route de Meknès / Route Nationale N°13',
    city: 'Errachidia',
    postal: '52000',
    country: 'Maroc',
    countryCode: 'MA'
  },
  phone: '+212782633078',
  phoneDisplay: '+212 782 633 078',
  whatsapp: '212782633078',
  whatsappMessage: {
    fr: 'Bonjour, je souhaite réserver une chambre au Palmiers Hôtel Club.',
    en: 'Hello, I would like to book a room at Palmiers Hôtel Club.',
    ar: 'مرحباً، أود حجز غرفة في فندق نادي النخيل.'
  },
  googleMapsUrl: 'https://maps.google.com/?q=Palmiers+Hotel+Club+Errachidia+Maroc',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0!2d-4.4200!3d31.9300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPalmiers+Hotel+Club+Errachidia!5e0!3m2!1sfr!2sma!4v1',
  rating: {
    score: '8.1',
    count: 49,
    label: 'Très bien'
  },
  stars: 3,
  // Active promotions — set to null or empty array if none
  activePromotion: null as null | {
    titleFr: string;
    titleEn: string;
    titleAr: string;
    descFr: string;
    descEn: string;
    descAr: string;
    validUntil?: string;
  },
  socialLinks: {
    facebook: '#',
    instagram: '#',
    tripadvisor: '#'
  }
};

export const ROOMS_CONFIG = [
{
  id: 'double-twin',
  slug: 'chambre-double-twin',
  nameFr: 'Chambre Double / Twin',
  nameEn: 'Double / Twin Room',
  nameAr: 'غرفة مزدوجة / توأم',
  size: 36,
  capacity: 2,
  descFr: 'Chambre confortable de 36 m² avec lit double ou deux lits simples, balcon et vue selon disponibilité. Idéale pour les couples et les voyageurs en solo.',
  descEn: 'Comfortable 36 m² room with double bed or twin beds, balcony and view depending on availability. Ideal for couples and solo travelers.',
  descAr: 'غرفة مريحة بمساحة 36 م² مع سرير مزدوج أو سريرين منفردين وشرفة وإطلالة حسب التوفر.',
  amenities: ['Climatisation', 'Salle de bain privée', 'TV écran plat', 'Wi-Fi gratuit', 'Balcon', 'Bureau', 'Armoire', 'Sèche-cheveux', 'Articles de toilette'],
  images: [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80'],

  alt: 'Chambre double élégante avec literie blanche et décor marocain chaleureux'
},
{
  id: 'triple-vue-piscine',
  slug: 'chambre-triple-vue-piscine',
  nameFr: 'Chambre Triple — Vue Piscine',
  nameEn: 'Triple Room — Pool View',
  nameAr: 'غرفة ثلاثية - إطلالة على المسبح',
  size: 40,
  capacity: 3,
  descFr: 'Spacieuse chambre de 40 m² avec trois lits simples, balcon avec vue sur la piscine et les montagnes environnantes. Parfaite pour les groupes et les familles.',
  descEn: 'Spacious 40 m² room with three single beds, balcony with pool and mountain views. Perfect for groups and families.',
  descAr: 'غرفة فسيحة 40 م² بثلاثة أسرة منفردة وشرفة مطلة على المسبح والجبال.',
  amenities: ['Vue piscine', 'Vue montagne', 'Balcon', 'Terrasse', 'Climatisation', 'Salle de bain privée', 'TV', 'Wi-Fi gratuit', 'Bouilloire'],
  images: [
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=800&q=80'],

  alt: 'Chambre triple lumineuse avec vue sur piscine et paysage montagneux marocain'
},
{
  id: 'double-familiale',
  slug: 'chambre-double-familiale',
  nameFr: 'Chambre Double Familiale',
  nameEn: 'Family Double Room',
  nameAr: 'غرفة عائلية مزدوجة',
  size: 36,
  capacity: 3,
  descFr: 'Chambre familiale de 36 m² avec un lit double et un lit simple, balcon avec vue jardin, piscine ou montagne selon disponibilité. La solution idéale pour les petites familles.',
  descEn: 'Family room of 36 m² with one double bed and one single bed, balcony with garden, pool or mountain view. The ideal solution for small families.',
  descAr: 'غرفة عائلية 36 م² بسرير مزدوج وسرير منفرد وشرفة مطلة على الحديقة أو المسبح أو الجبال.',
  amenities: ['Balcon', 'Vue jardin / piscine / montagne', 'Climatisation', 'Salle de bain privée', 'TV', 'Wi-Fi gratuit', 'Lit double + lit simple'],
  images: [
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'],

  alt: 'Chambre familiale avec lit double et lit simple, décoration marocaine et lumière naturelle'
}];


export const SERVICES_CONFIG = [
{ id: 'piscine', icon: 'BeakerIcon', nameFr: 'Piscine extérieure', nameEn: 'Outdoor Pool', nameAr: 'مسبح خارجي', descFr: 'Piscine ouverte en été et toute saison', featured: true },
{ id: 'sport', icon: 'BoltIcon', nameFr: 'Salle de sport', nameEn: 'Fitness Center', nameAr: 'صالة رياضية', descFr: 'Équipements de fitness modernes' },
{ id: 'wifi', icon: 'WifiIcon', nameFr: 'Wi-Fi gratuit', nameEn: 'Free Wi-Fi', nameAr: 'واي فاي مجاني', descFr: 'Connexion haut débit dans tout l\'hôtel' },
{ id: 'parking', icon: 'TruckIcon', nameFr: 'Parking privé gratuit', nameEn: 'Free Private Parking', nameAr: 'موقف خاص مجاني', descFr: 'Parking couvert et sécurisé' },
{ id: 'restaurant', icon: 'CakeIcon', nameFr: 'Restaurant', nameEn: 'Restaurant', nameAr: 'مطعم', descFr: 'Cuisine marocaine & internationale' },
{ id: 'roomservice', icon: 'BellIcon', nameFr: 'Room service', nameEn: 'Room Service', nameAr: 'خدمة الغرف', descFr: 'Service en chambre disponible' },
{ id: 'reception', icon: 'ClockIcon', nameFr: 'Réception 24h/24', nameEn: '24/7 Reception', nameAr: 'استقبال على مدار الساعة', descFr: 'Équipe disponible à toute heure' },
{ id: 'navette', icon: 'PaperAirplaneIcon', nameFr: 'Navette aéroport', nameEn: 'Airport Shuttle', nameAr: 'مكوك المطار', descFr: 'Transfert depuis/vers l\'aéroport ERH' },
{ id: 'jardin', icon: 'SparklesIcon', nameFr: 'Jardin', nameEn: 'Garden', nameAr: 'حديقة', descFr: 'Jardins verdoyants et ombragés' },
{ id: 'terrasse', icon: 'SunIcon', nameFr: 'Terrasse', nameEn: 'Terrace', nameAr: 'تراس', descFr: 'Espaces extérieurs détente' },
{ id: 'jeux', icon: 'PuzzlePieceIcon', nameFr: 'Salle de jeux', nameEn: 'Games Room', nameAr: 'غرفة الألعاب', descFr: 'Divertissement pour tous' },
{ id: 'enfants', icon: 'HeartIcon', nameFr: 'Aire de jeux enfants', nameEn: 'Children\'s Play Area', nameAr: 'منطقة ألعاب الأطفال', descFr: 'Espace sécurisé pour les enfants' },
{ id: 'familiales', icon: 'HomeIcon', nameFr: 'Chambres familiales', nameEn: 'Family Rooms', nameAr: 'غرف عائلية', descFr: 'Chambres adaptées aux familles' },
{ id: 'pmr', icon: 'UserIcon', nameFr: 'Accessibilité PMR', nameEn: 'Accessibility', nameAr: 'إمكانية الوصول', descFr: 'Accès adapté aux personnes à mobilité réduite' }];


export const ATTRACTIONS_CONFIG = [
{
  id: 'source-bleue',
  nameFr: 'Source Bleue de Meski',
  nameEn: 'Blue Spring of Meski',
  nameAr: 'العين الزرقاء لمسكي',
  descFr: 'Oasis naturelle avec source d\'eau douce, palmeraie et piscine naturelle. Un havre de paix à quelques kilomètres d\'Errachidia.',
  descEn: 'Natural oasis with freshwater spring, palm grove and natural pool. A haven of peace near Errachidia.',
  descAr: 'واحة طبيعية بمياه عذبة ونخيل وحمام طبيعي.',
  image: "https://images.unsplash.com/photo-1628676895539-a8fa23f356da",
  alt: 'Oasis verdoyante avec palmiers et eau claire sous ciel bleu marocain',
  mapsUrl: 'https://maps.google.com/?q=Source+Bleue+Meski+Maroc'
},
{
  id: 'erfoud',
  nameFr: 'Erfoud & Merzouga',
  nameEn: 'Erfoud & Merzouga',
  nameAr: 'أرفود ومرزوكة',
  descFr: 'Porte du désert de l\'Erg Chebbi, dunes de sable dorées, balades en chameau et nuits sous les étoiles.',
  descEn: 'Gateway to the Erg Chebbi desert, golden sand dunes, camel rides and nights under the stars.',
  descAr: 'بوابة صحراء عرق الشبي، الكثبان الذهبية وركوب الجمال.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_160ea163b-1785275301050.png",
  alt: 'Dunes de sable dorées du désert marocain au coucher du soleil avec teintes orangées',
  mapsUrl: 'https://maps.google.com/?q=Merzouga+Maroc'
},
{
  id: 'gorges-ziz',
  nameFr: 'Gorges du Ziz',
  nameEn: 'Ziz Gorges',
  nameAr: 'وادي زيز',
  descFr: 'Spectaculaires gorges taillées par la rivière Ziz à travers le Haut Atlas. Paysages à couper le souffle et palmeraies luxuriantes.',
  descEn: 'Spectacular gorges carved by the Ziz river through the High Atlas. Breathtaking scenery and lush palm groves.',
  descAr: 'مضايق رائعة نحتها نهر زيز عبر الأطلس الكبير مع مشاهد خلابة.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb683f2d-1779398789968.png",
  alt: 'Gorges rocheuses rouges avec palmeraie verte dans la vallée, paysage aride marocain',
  mapsUrl: 'https://maps.google.com/?q=Gorges+Ziz+Maroc'
},
{
  id: 'tinjdad',
  nameFr: 'Tinjdad & Tinghir',
  nameEn: 'Tinjdad & Tinghir',
  nameAr: 'تنجداد وتنغير',
  descFr: 'Villages berbères authentiques, kasbahs en pisé, coopératives d\'artisanat local et marchés traditionnels.',
  descEn: 'Authentic Berber villages, rammed earth kasbahs, local craft cooperatives and traditional markets.',
  descAr: 'قرى أمازيغية أصيلة وقصبات طينية وأسواق تقليدية.',
  image: "https://images.unsplash.com/photo-1664346399421-971cb37cb450",
  alt: 'Kasbah marocaine en terre ocre avec palmiers sous ciel bleu désertique',
  mapsUrl: 'https://maps.google.com/?q=Tinghir+Maroc'
}];


export const GALLERY_IMAGES = [
{ id: 1, category: 'hotel', src: "https://images.unsplash.com/photo-1696970999943-e75b6340d297", alt: 'Façade de l\'hôtel palmiers avec architecture marocaine et végétation luxuriante', labelFr: 'Hôtel', labelEn: 'Hotel', labelAr: 'الفندق' },
{ id: 2, category: 'piscine', src: "https://images.unsplash.com/photo-1706474178699-7e3db9b2ba92", alt: 'Piscine extérieure turquoise entourée de transats blancs et palmiers tropicaux', labelFr: 'Piscine', labelEn: 'Pool', labelAr: 'المسبح' },
{ id: 3, category: 'chambres', src: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7f9a767-1776068206562.png", alt: 'Chambre élégante avec literie blanche et décoration marocaine chaleureuse', labelFr: 'Chambre', labelEn: 'Room', labelAr: 'الغرفة' },
{ id: 4, category: 'restaurant', src: "https://images.unsplash.com/photo-1691508650928-5019db450b2e", alt: 'Salle de restaurant élégante avec éclairage chaud et tables dressées', labelFr: 'Restaurant', labelEn: 'Restaurant', labelAr: 'المطعم' },
{ id: 5, category: 'jardin', src: "https://images.unsplash.com/photo-1708332753447-f25529f3fc72", alt: 'Jardin luxuriant avec palmiers et allées ombragées sous ciel bleu marocain', labelFr: 'Jardin', labelEn: 'Garden', labelAr: 'الحديقة' },
{ id: 6, category: 'exterieurs', src: "https://images.unsplash.com/photo-1604145195376-e2c8195adf29", alt: 'Terrasse extérieure avec vue sur les montagnes et le désert marocain en fin de journée', labelFr: 'Extérieur', labelEn: 'Exterior', labelAr: 'الخارج' },
{ id: 7, category: 'piscine', src: "https://images.unsplash.com/photo-1594516912818-093febcbc6e5", alt: 'Zone de détente piscine avec transats et parasols au bord de l\'eau bleue', labelFr: 'Piscine', labelEn: 'Pool', labelAr: 'المسبح' },
{ id: 8, category: 'hotel', src: "https://img.rocket.new/generatedImages/rocket_gen_img_15af5a251-1766773680634.png", alt: 'Hall d\'accueil de l\'hôtel avec décoration marocaine traditionnelle et éclairage tamisé', labelFr: 'Accueil', labelEn: 'Lobby', labelAr: 'الاستقبال' },
{ id: 9, category: 'chambres', src: "https://img.rocket.new/generatedImages/rocket_gen_img_181a5a2e7-1772735240023.png", alt: 'Chambre triple spacieuse avec lits confortables et vue sur jardin verdoyant', labelFr: 'Chambre Triple', labelEn: 'Triple Room', labelAr: 'غرفة ثلاثية' },
{ id: 10, category: 'restaurant', src: "https://img.rocket.new/generatedImages/rocket_gen_img_1aaf7414c-1774846322662.png", alt: 'Table dressée avec plats marocains colorés et décoration artisanale locale', labelFr: 'Cuisine', labelEn: 'Cuisine', labelAr: 'المطبخ' },
{ id: 11, category: 'jardin', src: "https://images.unsplash.com/photo-1612562926815-344f5fb5223e", alt: 'Palmeraie dense avec lumière dorée filtrant entre les feuilles au coucher du soleil', labelFr: 'Palmeraie', labelEn: 'Palm Grove', labelAr: 'واحة النخيل' },
{ id: 12, category: 'exterieurs', src: "https://img.rocket.new/generatedImages/rocket_gen_img_1b4002287-1769260988830.png", alt: 'Paysage désertique marocain avec dunes de sable et ciel étoilé nocturne', labelFr: 'Désert', labelEn: 'Desert', labelAr: 'الصحراء' }];