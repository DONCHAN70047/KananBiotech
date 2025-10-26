import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import WebHeader from "./Header.jsx";
import { useLanguage } from "../context/LanguageContext";
import Footer from "./Footer";

// --- Inline SVG Icons ---
const MapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} style={{ color: "#90CAF9" }}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </svg>
);

const Wind = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} style={{ color: "#A5D6A7" }}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 18h10M4 14h18M4 8h12M4 4h7" />
  </svg>
);

// --- Weather Emoji Chooser ---
const getWeatherEmoji = (code, isDay) => {
  if (!isDay) return "🌙"; // Default to night
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return isDay ? "🌤️" : "🌙";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 99) return "🌩️";
  return isDay ? "☀️" : "🌙";
};

// --- Main Component ---
const WeatherPage = () => {
  const { t } = useLanguage();
  const [latitude, setLatitude] = useState(22.411991);
  const [longitude, setLongitude] = useState(87.531791);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userMessage, setUserMessage] = useState(t("select_location_msg"));
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => setUserMessage(t("select_location_msg")), [t]);

  const glassCard = {
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: 20,
    border: "1px solid rgba(255, 255, 255, 0.25)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
    transition: "all 0.3s ease",
  };

  // --- Fetch Weather Data ---
  const fetchWeather = useCallback(
    async (lat, lng) => {
      setLoading(true);
      setError(null);
      setUserMessage(t("fetching_weather_data"));
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weathercode,wind_speed_10m,relative_humidity_2m,is_day&timezone=auto`
        );
        const data = await res.json();
        setWeatherData({
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          windspeed: data.current.wind_speed_10m,
          time: data.current.time,
          weathercode: data.current.weathercode,
          is_day: data.current.is_day,
        });
        setUserMessage(t("weather_data_updated"));
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    },
    [t]
  );

  // --- Get Current Location ---
  const getUserLocation = async () => {
    setLoading(true);
    setError(null);
    setUserMessage(t("detecting_location"));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);
          await fetchWeather(lat, lng);
        },
        () => {
          setError(t("location_error"));
          setLoading(false);
        }
      );
    } else {
      setError(t("geolocation_not_supported"));
      setLoading(false);
    }
  };

  return (
    <>
      <WebHeader />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
          display: "flex",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{ width: "100%", maxWidth: 1100 }}>
          {/* Header */}
          <motion.header
            style={{ ...glassCard, padding: 24, textAlign: "center", marginBottom: 24 }}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#E3F2FD" }}>
              🌦️ {t("Biotech Weather Tracker")}
            </h1>
          </motion.header>

          {/* MAP SECTION FIRST */}
          <motion.div
            style={{ ...glassCard, padding: 24, marginBottom: 24 }}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 style={{ textAlign: "center", fontSize: 20, color: "#BBDEFB" }}>
              <MapPin /> {t("select_location")}
            </h2>
            <div
              id="leaflet-map-container"
              style={{
                width: "100%",
                height: 340,
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
              }}
            ></div>
            <p style={{ textAlign: "center", marginTop: 14, fontSize: 14, color: "#E0E0E0" }}>
              📍 {t("latitude")}: <strong>{latitude.toFixed(4)}</strong> |{" "}
              {t("longitude")}: <strong>{longitude.toFixed(4)}</strong>
            </p>
          </motion.div>

          {/* Buttons in your new order */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            {/* 1. Get Weather for Point */}
            <motion.button
              style={{
                ...glassCard,
                background: "linear-gradient(135deg, #43A047, #66BB6A)",
                padding: "14px 0",
                border: "none",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => fetchWeather(latitude, longitude)}
            >
              <Wind /> {t("get weather for location point")}
            </motion.button>

            {/* 2. Use My Current Location */}
            <motion.button
              style={{
                ...glassCard,
                background: "linear-gradient(135deg, #FBC02D, #F57F17)",
                padding: "14px 0",
                border: "none",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={getUserLocation}
            >
              📍 {t("use_my_location")}
            </motion.button>

            {/* 3. Message Last */}
            {(error || userMessage) && (
              <div
                style={{
                  ...glassCard,
                  background: error
                    ? "rgba(255, 82, 82, 0.15)"
                    : "rgba(144, 202, 249, 0.15)",
                  color: error ? "#FFCDD2" : "#E3F2FD",
                  padding: 16,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {error ? error : userMessage}
              </div>
            )}
          </motion.div>

          {/* Weather Card */}
          {weatherData && (
            <motion.div
              key={weatherData.weathercode}
              style={{
                ...glassCard,
                marginTop: 32,
                textAlign: "center",
                padding: 28,
                color: "#fff",
                background: "rgba(0, 0, 0, 0.3)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3 style={{ fontSize: 24, color: "#FFFDE7" }}>
                🌡️ {t("current_weather")}
              </h3>
              <p style={{ fontSize: 50, fontWeight: 800, margin: "10px 0" }}>
                {weatherData.temperature.toFixed(1)}°C{" "}
                <span style={{ fontSize: 50 }}>
                  {getWeatherEmoji(weatherData.weathercode, weatherData.is_day)}
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  gap: 16,
                  marginTop: 20,
                }}
              >
                <div style={{ ...glassCard, padding: 12, background: "rgba(0,0,0,0.4)" }}>
                  💧 {t("humidity")}: {weatherData.humidity}%
                </div>
                <div style={{ ...glassCard, padding: 12, background: "rgba(0,0,0,0.4)" }}>
                  🌬️ {t("wind")}: {weatherData.windspeed.toFixed(1)} km/h
                </div>
                <div style={{ ...glassCard, padding: 12, background: "rgba(0,0,0,0.4)" }}>
                  ⏰ {t("time")}: {new Date(weatherData.time).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WeatherPage;
