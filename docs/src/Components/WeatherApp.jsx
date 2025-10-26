import React, { useState, useEffect, useCallback, useRef } from "react";
import WebHeader from './Header.jsx';
import { useLanguage } from '../context/LanguageContext';

// --- Inline SVG Icon Components ---
const Zap = () => (<svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} style={{ color: "#FFD600" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>);
const Cloud = () => (<svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} style={{ color: "#90A4AE" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.7-10H17a5 5 0 0 1 0 10z"/></svg>);
const CloudRain = () => (<svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} style={{ color: "#2196F3" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v2M8 16v2M12 18v2M20 12h0a4 4 0 0 0 0-8h-6a4 4 0 1 0-8 0 4 4 0 0 0-.5 2M16 8h.01"/></svg>);
const Sun = () => (<svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} style={{ color: "#FFD54F" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 2v2M12 20v2M22 12h-2M4 12H2M19.07 4.93l-1.42 1.42M5.05 19.05l1.42-1.42M19.07 19.07l-1.42-1.42M5.05 4.93l1.42 1.42"/></svg>);
const Wind = () => (<svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} style={{ color: "#70CBC8" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18h10M4 14h18M4 8h12M4 4h7"/></svg>);
const MapPin = () => (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} style={{ color: "#1976D2" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>);
const Loader2 = () => (<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} style={{ color: "#2196F3", animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style><path d="M21 12a9 9 0 1 0-8.4 8.4M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>);
const MoonIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} style={{ color: "#3F51B5" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>);

const defaultCenter = { lat: 22.411991, lng: 87.531791 };


const getWeatherCondition = (t, code, isDay, windspeed) => {
  let condition = { text: t("cloudy"), icon: <Cloud /> };
  let type = "Cloudy";
  if (code >= 95) { condition = { text: t("stormy"), icon: <Zap /> }; type = "Stormy"; }
  else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) { condition = { text: t("rainy"), icon: <CloudRain /> }; type = "Rainy"; }
  else if (code === 0) {
    condition = isDay === 1 ? { text: t("sunny"), icon: <Sun /> } : { text: t("clear"), icon: <MoonIcon /> };
    type = isDay === 1 ? "Sunny" : "Clear";
  }
  else if (code >= 1 && code <= 3) { condition = { text: t("cloudy"), icon: <Cloud /> }; type = "Cloudy"; }
  if (windspeed > 35) { condition = { text: t("windy"), icon: <Wind /> }; type = "Windy"; }
  return { ...condition, type };
};

const WeatherStat = ({ label, value }) => (
  <div style={{
    padding: "16px", background: "#F5F5F5",
    borderRadius: 12, border: "1px solid #E0E0E0", textAlign: "center"
  }}>
    <p style={{ fontWeight: 600, color: "#263238", margin: 0 }}>{value}</p>
    <p style={{ fontSize: 12, color: "#607D8B", margin: "8px 0 0 0", textTransform: "uppercase" }}>{label}</p>
  </div>
);

const WeatherCard = ({ data, condition, t }) => {
  const colorMap = {
    Sunny: { bg: "linear-gradient(135deg, #FFD54F, #FFB300)", title: t("sunny") },
    Clear: { bg: "linear-gradient(135deg, #5561a4ff, #1c1d1fff)", title: t("clear_night") },
    Cloudy: { bg: "linear-gradient(135deg, #CFD8DC, #90A4AE)", title: t("mostly_cloudy") },
    Rainy: { bg: "linear-gradient(135deg, #2196F3, #00BCD4)", title: t("rain_showers") },
    Stormy: { bg: "linear-gradient(135deg, #F44336, #7E57C2)", title: t("severe_storm") },
    Windy: { bg: "linear-gradient(135deg, #70CBC8, #43A047)", title: t("high_wind") },
    Unknown: { bg: "linear-gradient(135deg, #F5F5F5, #EEEEEE)", title: t("unknown") },
  };
  const { bg, title } = colorMap[condition.type] || colorMap.Unknown;
  return (
    <div style={{ borderRadius: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.04)", background: "#fff", marginTop: 32, border: "1px solid #eee", overflow: "hidden" }}>
      <div style={{
        padding: "24px 32px", background: bg, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 18, opacity: 0.8, margin: 0 }}>{title}</p>
          <p style={{ fontSize: 54, fontWeight: 800, margin: "8px 0" }}>
            {data.temperature.toFixed(0)}<span style={{ fontSize: 28 }}>°C</span>
          </p>
          <p style={{ fontSize: 22, marginTop: 4 }}>{condition.text}</p>
        </div>
        <div style={{ padding: 12, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }}>
          {condition.icon}
        </div>
      </div>
      <div style={{
        padding: "24px 32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, background: "#FAFAFA"
      }}>
        <WeatherStat label={t("humidity")} value={`${data.humidity}%`} />
        <WeatherStat label={t("wind")} value={`${data.windspeed.toFixed(1)} km/h`} />
        <WeatherStat label={t("time")} value={new Date(data.time).toLocaleTimeString()} />
        <WeatherStat label={t(data.isDay === 1 ? "day" : "night")} value={data.isDay === 1 ? t("day") : t("night")} />
      </div>
    </div>
  );
};

const WeatherPage = () => {
  const { t } = useLanguage();

  const [latitude, setLatitude] = useState(defaultCenter.lat);
  const [longitude, setLongitude] = useState(defaultCenter.lng);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userMessage, setUserMessage] = useState(t("select_location_msg"));

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    setUserMessage(t("select_location_msg")); 
  }, [t]);

  useEffect(() => {
    if (typeof window.L !== 'undefined') {
      if (!mapRef.current) {
        const map = window.L.map('leaflet-map-container', {
          center: [latitude, longitude], zoom: 10, scrollWheelZoom: true,
        });
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        const marker = window.L.marker([latitude, longitude], { draggable: true }).addTo(map);
        markerRef.current = marker;
        mapRef.current = map;
        map.on('click', (e) => {
          const newLat = e.latlng.lat;
          const newLng = e.latlng.lng;
          setLatitude(newLat);
          setLongitude(newLng);
          markerRef.current.setLatLng([newLat, newLng]);
          fetchWeather(newLat, newLng);
        });
        marker.on('dragend', (e) => {
          const newLat = e.target.getLatLng().lat;
          const newLng = e.target.getLatLng().lng;
          setLatitude(newLat);
          setLongitude(newLng);
          fetchWeather(newLat, newLng);
        });
      } else {
        mapRef.current.setView([latitude, longitude], 10);
        markerRef.current.setLatLng([latitude, longitude]);
      }
    }
  }, [latitude, longitude]);

  const getUserLocation = () => {
    setUserMessage(t("getting_location"));
    if (!navigator.geolocation) {
      setError(t("geo_not_supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        setUserMessage(t("location_set_to") + `: ${lat.toFixed(2)}, ${lng.toFixed(2)}`);
        fetchWeather(lat, lng);
      },
      () => {
        setError(t("location_denied"));
        setUserMessage(t("location_denied"));
      }
    );
  };

  const fetchWeather = useCallback(async (lat, lng, e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setUserMessage(t("fetching_weather_data"));
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weathercode,wind_speed_10m,relative_humidity_2m,is_day&timezone=auto`;
      let data = null;
      let attempt = 0;
      const maxRetries = 3;
      while (attempt < maxRetries) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          data = await res.json();
          break;
        } catch (err) {
          attempt++;
          if (attempt >= maxRetries) throw err;
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
      if (!data || !data.current) throw new Error(t("weather_data_unavailable"));
      setWeatherData({
        temperature: data.current.temperature_2m,
        windspeed: data.current.wind_speed_10m,
        humidity: data.current.relative_humidity_2m,
        weathercode: data.current.weathercode,
        isDay: data.current.is_day,
        time: data.current.time,
        latitude: lat,
        longitude: lng,
      });
      setUserMessage(t("weather_data_updated"));
    } catch (err) {
      setError(err.message);
      setUserMessage(t("error_fetching_weather"));
    }
    setLoading(false);
  }, [t]);

  useEffect(() => {
    fetchWeather(latitude, longitude);
  }, []); // Initial fetch

  const condition = weatherData
    ? getWeatherCondition(t, weatherData.weathercode, weatherData.isDay, weatherData.windspeed)
    : null;

  const LoadingSpinner = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "16px" }}>
      <Loader2 />
    </div>
  );

  return (
    <>
      <WebHeader />
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #0d2b40ff, #E0E7FF)",
        fontFamily: "sans-serif", padding: 32, display: "flex", justifyContent: "center"
      }}>
        <div style={{ width: "100%", maxWidth: 1100 }}>
          <header style={{
            background: "#fff", padding: 24, borderRadius: 28,
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            marginBottom: 28, borderTop: "6px solid #2196F3",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#263238", margin: 0 }}>
              {t("Biotech Weather Tracker")}
            </h1>
          </header>
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr", gap: 28
          }}>
            <div style={{
              background: "#fff", padding: 28, borderRadius: 26,
              boxShadow: "0 2px 14px rgba(0,0,0,0.04)", marginBottom: 0, border: "1px solid #DDD"
            }}>
              <h2 style={{
                fontSize: 21, fontWeight: "bold", color: "#263238",
                borderBottom: "2px solid #BBDEFB", paddingBottom: 10, marginBottom: 23, display: "flex", alignItems: "center"
              }}>
                <MapPin /> <span style={{ marginLeft: 8 }}>{t("select_location")}</span>
              </h2>
              <div style={{ position: "relative" }}>
                <div id="leaflet-map-container"
                  style={{
                    width: "100%", borderRadius: 16, border: "1px solid #B0BEC5",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.10)", height: 340, background: "#ECEFF1", marginBottom: 12
                  }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#90A4AE"
                  }}>
                    {typeof window.L === 'undefined' ? (
                      <p>{t("loading_map_library")}</p>
                    ) : (
                      <p>{t("map_ready")}</p>
                    )}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 15, textAlign: "center", color: "#78909C" }}>
                {t("latitude")}: <span style={{ fontWeight: 600, color: "#263238" }}>{latitude.toFixed(4)}</span>,{" "}
                {t("longitude")}: <span style={{ fontWeight: 600, color: "#263238" }}>{longitude.toFixed(4)}</span>
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {(error || userMessage) && (
                <div style={{
                  padding: 18, borderRadius: 16, fontWeight: 600,
                  background: error ? "#FFEBEE" : "#E3F2FD",
                  color: error ? "#B71C1C" : "#1565C0",
                  border: error ? "1px solid #EF9A9A" : "1px solid #90CAF9",
                  boxShadow: "0 0 6px rgba(0,0,0,0.04)"
                }}>
                  {error ? error : userMessage}
                </div>
              )}
              <button
                onClick={getUserLocation}
                disabled={loading}
                style={{
                  width: "100%", background: "#43A047", color: "#fff",
                  fontWeight: 600, padding: "16px 0", borderRadius: 18, boxShadow: "0 4px 14px rgba(67,160,71,0.09)",
                  border: "none", fontSize: 17, cursor: loading ? "not-allowed" : "pointer", marginBottom: 12,
                  opacity: loading ? 0.6 : 1
                }}
              >
                <span style={{ verticalAlign: "middle" }}><MapPin /></span>
                <span style={{ marginLeft: 12 }}>{loading ? t("locating") : t("use_my_location")}</span>
              </button>
              <button
                onClick={() => fetchWeather(latitude, longitude)}
                disabled={loading}
                style={{
                  width: "100%", background: "#1976D2", color: "#FFF",
                  fontWeight: 600, padding: "16px 0", borderRadius: 18, boxShadow: "0 4px 10px rgba(33,150,243,0.08)",
                  border: "none", fontSize: 17, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1
                }}
              >
                <span style={{ verticalAlign: "middle" }}><Wind /></span>
                <span style={{ marginLeft: 9 }}>{loading ? t("fetching") : t("get_weather_point")}</span>
              </button>
            </div>
          </div>
          {loading && <LoadingSpinner />}
          {weatherData && condition && (
            <WeatherCard data={weatherData} condition={condition} t={t} />
          )}
          {!weatherData && !loading && !error && (
            <div style={{
              textAlign: "center", padding: "36px 4px", background: "#fff",
              borderRadius: 18, boxShadow: "0 1px 8px rgba(0,0,0,0.08)", marginTop: 24, color: "#607D8B", border: "1px solid #ECEFF1"
            }}>
              <p style={{ fontSize: 21, fontWeight: 500 }}>{t("no_weather_data_loaded")}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherPage;
