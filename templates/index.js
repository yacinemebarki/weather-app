
function showError(msg) {
    const text = document.querySelector('.error-message');
    if (!text) return; // Sécurité si l'élément n'existe pas

    text.textContent = msg;
    text.classList.add("show");
    text.classList.remove("hide");

    setTimeout(() => {
        text.classList.remove("show");
        text.classList.add("hide");
    }, 3000);
}
window.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("date");
    const today = new Date();

    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7);

    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    
    const formatDate = (date) => date.toISOString().split("T")[0];

    dateInput.min = formatDate(minDate);
    dateInput.max = formatDate(maxDate);
});
function getWeatherIcon(temp, precipitation, wind) {
    if (precipitation >= 10) return "🌧️";        
    if (precipitation >= 1 && wind >= 35) return "⛈️"; 
    if (precipitation >= 1) return "🌦️";         
    if (wind >= 35) return "🌬️";                 
    if (temp >= 30) return "☀️";                
    if (temp >= 20) return "🌤️";                 
    if (temp >= 10) return "⛅";                  
    if (temp < 0) return "❄️";                   
    return "☁️";                                  
}


const wilayaCoords = {
  "Adrar": [27.8743, -0.2939],
  "Chlef": [36.169, 1.334],
  "Laghouat": [33.8, 2.88],
  "Oum El Bouaghi": [35.876, 7.113],
  "Batna": [35.55, 6.17],
  "Béjaïa": [36.75, 5.07],
  "Biskra": [34.85, 5.73],
  "Béchar": [31.62, -2.22],
  "Blida": [36.47, 2.83],
  "Bouira": [36.38, 3.9],
  "Tamanrasset": [22.79, 5.52],
  "Tébessa": [35.41, 8.12],
  "Tlemcen": [34.88, -1.32],
  "Tiaret": [35.37, 1.32],
  "Tizi Ouzou": [36.71, 4.05],
  "Algiers": [36.73, 3.09],
  "Djelfa": [34.67, 3.26],
  "Jijel": [36.82, 5.77],
  "Sétif": [36.19, 5.41],
  "Saïda": [34.83, 0.15],
  "Skikda": [36.87, 6.91],
  "Sidi Bel Abbès": [35.2, -0.63],
  "Annaba": [36.9, 7.75],
  "Guelma": [36.45, 7.43],
  "Constantine": [36.36, 6.61],
  "Médéa": [36.27, 2.75],
  "Mostaganem": [35.94, 0.09],
  "M’Sila": [35.7, 4.55],
  "Mascara": [35.4, 0.14],
  "Ouargla": [31.95, 5.32],
  "Oran": [35.69, -0.63],
  "El Bayadh": [33.68, 1.02],
  "Illizi": [26.5, 8.47],
  "Bordj Bou Arréridj": [36.07, 4.77],
  "Boumerdès": [36.77, 3.47],
  "El Tarf": [36.77, 8.32],
  "Tindouf": [27.67, -8.13],
  "Tissemsilt": [35.61, 1.81],
  "El Oued": [33.37, 6.86],
  "Khenchela": [35.43, 7.14],
  "Souk Ahras": [36.29, 7.95],
  "Tipaza": [36.59, 2.45],
  "Mila": [36.45, 6.26],
  "Aïn Defla": [36.26, 1.96],
  "Naâma": [33.27, -0.31],
  "Aïn Témouchent": [35.3, -1.14],
  "Ghardaïa": [32.49, 3.67],
  "Relizane": [35.74, 0.55],
  "Timimoun": [29.25, 0.25],
  "Bordj Badji Mokhtar": [21.3, 0.95],
  "Ouled Djellal": [34.42, 5.06],
  "Beni Abbès": [30.13, -2.03],
  "In Salah": [27.2, 2.47],
  "In Guezzam": [19.57, 5.77],
  "Touggourt": [33.1, 6.06],
  "Djanet": [24.55, 9.48],
  "El M'Ghair": [33.95, 5.92],
  "El Menia": [29.38, 2.57]
};
const lat=36.73;
const lon=3.09;
const today = new Date().toISOString().split("T")[0];
const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_sum&start_date=${today}&end_date=${today}&timezone=Africa/Algiers`;
fetch(api)
  .then(res => res.json())
  .then(data => {
    const max = data.daily.temperature_2m_max[0];
    const min = data.daily.temperature_2m_min[0];
    const wind = data.daily.windspeed_10m_max[0];
    const precipitation = data.daily.precipitation_sum[0];
    const icon = getWeatherIcon(max, precipitation, wind);
    document.querySelector(".current .icon").innerHTML=icon;
    document.querySelector(".current .temp-heghit").textContent = `Max: ${max ?? "N/A"}°C`;
    document.querySelector(".current .temp-low").textContent = `Min: ${min ?? "N/A"}°C`;
    document.querySelector(".current .wind-speed").textContent = `Wind: ${wind ?? "N/A"} km/h`;
    document.querySelector(".current .place").textContent=`the wilaya is Algiers`
  })
  .catch(error => {
    console.error("Erreur API :", error);
  });

document.getElementById('sub').addEventListener('click', function () {
    const wilaya = document.getElementById('wilaya').value;
    const date = document.getElementById('date').value;

    if (!wilaya || !date) {
        showError("Fill both date and wilaya");
        return;
    }

    const [la, lo] = wilayaCoords[wilaya];

    const apiKey = `https://api.open-meteo.com/v1/forecast?latitude=${la}&longitude=${lo}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_sum&start_date=${date}&end_date=${date}&timezone=Africa/Algiers`;


    fetch(apiKey)
        .then(res => res.json())
        .then(data => {
            const max = data.daily.temperature_2m_max[0];
            const min = data.daily.temperature_2m_min[0];
            const wind = data.daily.windspeed_10m_max[0];
            const precipitation = data.daily.precipitation_sum[0];

            const icon = getWeatherIcon(max, precipitation, wind);
            document.querySelector(".current .icon").innerHTML=icon;

            document.querySelector(".temp-heghit").textContent = `Max: ${max ?? "N/A"}°C`;
            document.querySelector(".temp-low").textContent = `Min: ${min ?? "N/A"}°C`;
            document.querySelector(".wind-speed").textContent = `Wind: ${wind ?? "N/A"} km/h`;
            document.querySelector(".place").textContent=`the wilaya is:${wilaya}`
        })
        .catch(err => {
            console.error("Error fetching weather:", err);
            showError("Failed to load weather data.");
        });
});





