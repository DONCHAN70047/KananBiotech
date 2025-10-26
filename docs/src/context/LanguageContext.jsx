import React, { createContext, useState, useCallback, useContext } from 'react';

// 1. Define the Context
export const LanguageContext = createContext();

// 2. Define the Translation Dictionary
const translations = {
  en: {
    logo: "KANAN BIOTECH",
    home: "Home",
    growth: "Growth",
    communication: "Farmer Communication",
    contact: "Contact Us",
    login: "Log In",
    explore: "Explore Biotech",
    hero_text: "We have many products...",
    cta_button: "Visit & Details",
    diagnostic: "Disease Diagnostic",
    aquacultureData: "Aquaculture Data",
    stockSells: "Stock Sells & Buyer",
    aquaConsult: "Aqua Consult",
    foodPrep: "Food Protein Prep",
    // Weather App Keys
    weather_tracker_details: "Weather Tracker Details",
    select_location: "Select Location",
    select_location_msg: "Click 'Get Weather' or the map to select a location.",
    loading_map_library: "Loading Map Library...",
    map_ready: "Map Ready. Click or drag marker.",
    latitude: "Lat",
    longitude: "Lng",
    locating: "Locating...",
    use_my_location: "Use My Current Location",
    fetching: "Fetching...",
    get_weather_point: "Get Weather for Point",
    humidity: "Humidity",
    wind: "Wind",
    time: "Time",
    day: "Day",
    night: "Night",
    no_weather_data_loaded: "No weather data loaded. Please select a point on the map or use your current location.",
    getting_location: "Getting your location...",
    geo_not_supported: "❌ Geolocation not supported by your browser.",
    location_set_to: "Location set to",
    location_denied: "⚠️ Location access denied. Using default coordinates.",
    fetching_weather_data: "Fetching weather data...",
    weather_data_unavailable: "Weather data not available for this location.",
    weather_data_updated: "Weather data updated.",
    error_fetching_weather: "Error fetching weather.",
    sunny: "Sunny",
    clear: "Clear Night",
    cloudy: "Cloudy",
    rainy: "Rainy",
    stormy: "Stormy",
    windy: "Windy",
    mostly_cloudy: "Mostly Cloudy",
    rain_showers: "Rain Showers",
    severe_storm: "Severe Storm",
    high_wind: "High Wind",
    unknown: "Unknown",
    search_button: "Search",
  },
  bn: {
    logo: "কানন বায়োটেক",
    home: "হোম",
    growth: "বৃদ্ধি",
    communication: "কৃষক যোগাযোগ",
    contact: "যোগাযোগ",
    login: "লগ ইন",
    explore: "বায়োটেক অন্বেষণ করুন",
    hero_text: "আমাদের অনেক পণ্য আছে...",
    cta_button: "ভিজিট ও বিস্তারিত",
    diagnostic: "রোগ নির্ণয়",
    aquacultureData: "জলজ চাষের তথ্য",
    stockSells: "স্টক বিক্রি ও ক্রেতা",
    aquaConsult: "অ্যাকুয়া পরামর্শ",
    foodPrep: "খাদ্য প্রোটিন প্রস্তুতি",
    weather_tracker_details: "আবহাওয়া ট্র্যাকার বিস্তারিত",
    select_location: "লোকেশন নির্বাচন করুন",
    select_location_msg: "‘গেট আবহাওয়া’ ক্লিক করুন বা ম্যাপ থেকে লোকেশন নির্বাচন করুন।",
    loading_map_library: "মানচিত্র লাইব্রেরি লোড হচ্ছে...",
    map_ready: "মানচিত্র প্রস্তুত। ক্লিক/ড্র্যাগ করুন।",
    latitude: "অক্ষাংশ",
    longitude: "দ্রাঘিমাংশ",
    locating: "লোকেশন নির্ধারণ হচ্ছে...",
    use_my_location: "আমার বর্তমান লোকেশন ব্যবহার করুন",
    fetching: "ডেটা আনা হচ্ছে...",
    get_weather_point: "নির্বাচিত বিন্দুর আবহাওয়া দেখুন",
    humidity: "আর্দ্রতা",
    wind: "বাতাস",
    time: "সময়",
    day: "দিন",
    night: "রাত",
    no_weather_data_loaded: "কোনও আবহাওয়া ডেটা নেই। ম্যাপ ক্লিক করুন বা লোকেশন ব্যবহার করুন।",
    getting_location: "লোকেশন নির্ধারণ হচ্ছে...",
    geo_not_supported: "❌ আপনার ব্রাউজারে জিওলোকেশন নেই।",
    location_set_to: "লোকেশন নির্ধারণ হলো",
    location_denied: "⚠️ লোকেশন অনুমতি দেওয়া হয়নি। ডিফল্ট কোরিডিনেটে ব্যবহার হচ্ছে।",
    fetching_weather_data: "আবহাওয়া ডেটা আনা হচ্ছে...",
    weather_data_unavailable: "এই লোকেশনে আবহাওয়া ডেটা পাওয়া যাচ্ছে না।",
    weather_data_updated: "আবহাওয়া ডেটা আপডেট হয়েছে।",
    error_fetching_weather: "আবহাওয়া ডেটা আনতে সমস্যা হয়েছে।",
    sunny: "রৌদ্রজ্জ্বল",
    clear: "পরিষ্কার রাত",
    cloudy: "মেঘাচ্ছন্ন",
    rainy: "বৃষ্টিপাত",
    stormy: "ঝড়",
    windy: "দমকা বাতাস",
    mostly_cloudy: "প্রায় মেঘাচ্ছন্ন",
    rain_showers: "বৃষ্টি",
    severe_storm: "তীব্র ঝড়",
    high_wind: "উচ্চ বেগের বাতাস",
    unknown: "অজানা",
    search_button: "অনুসন্ধান",
  },
  hi: {
    // Complete with Hindi translations as needed
    // Fallbacks provided in English above
  },
};

// 3. Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // UseCallback ensures updated t for consumers
  const t = useCallback(
    (key) => translations[language][key] || translations['en'][key] || key,
    [language]
  );

  const changeLanguage = (langKey) => setLanguage(langKey);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
