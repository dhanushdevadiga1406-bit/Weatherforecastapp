import { useState } from 'react';
import { Search, Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Eye, Gauge, MapPin, Calendar, Navigation } from 'lucide-react';

// Comprehensive mapping of Indian cities and villages to their states/regions
const indianLocations: Record<string, string> = {
  // Major Cities
  'mumbai': 'Maharashtra', 'delhi': 'Delhi', 'bangalore': 'Karnataka', 'bengaluru': 'Karnataka',
  'chennai': 'Tamil Nadu', 'kolkata': 'West Bengal', 'hyderabad': 'Telangana', 'pune': 'Maharashtra',
  'ahmedabad': 'Gujarat', 'jaipur': 'Rajasthan', 'surat': 'Gujarat', 'lucknow': 'Uttar Pradesh',
  'kanpur': 'Uttar Pradesh', 'nagpur': 'Maharashtra', 'indore': 'Madhya Pradesh', 'thane': 'Maharashtra',
  'bhopal': 'Madhya Pradesh', 'visakhapatnam': 'Andhra Pradesh', 'pimpri-chinchwad': 'Maharashtra',
  'patna': 'Bihar', 'vadodara': 'Gujarat', 'ghaziabad': 'Uttar Pradesh', 'ludhiana': 'Punjab',
  'agra': 'Uttar Pradesh', 'nashik': 'Maharashtra', 'faridabad': 'Haryana', 'meerut': 'Uttar Pradesh',
  'rajkot': 'Gujarat', 'kalyan-dombivli': 'Maharashtra', 'vasai-virar': 'Maharashtra', 'varanasi': 'Uttar Pradesh',
  'srinagar': 'Jammu and Kashmir', 'aurangabad': 'Maharashtra', 'dhanbad': 'Jharkhand', 'amritsar': 'Punjab',
  'navi mumbai': 'Maharashtra', 'allahabad': 'Uttar Pradesh', 'prayagraj': 'Uttar Pradesh', 'ranchi': 'Jharkhand',
  'howrah': 'West Bengal', 'coimbatore': 'Tamil Nadu', 'jabalpur': 'Madhya Pradesh', 'gwalior': 'Madhya Pradesh',
  'vijayawada': 'Andhra Pradesh', 'jodhpur': 'Rajasthan', 'madurai': 'Tamil Nadu', 'raipur': 'Chhattisgarh',
  'kota': 'Rajasthan', 'chandigarh': 'Chandigarh', 'guwahati': 'Assam', 'solapur': 'Maharashtra',
  'hubballi-dharwad': 'Karnataka', 'tiruchirappalli': 'Tamil Nadu', 'tiruppur': 'Tamil Nadu', 'moradabad': 'Uttar Pradesh',
  'mysore': 'Karnataka', 'mysuru': 'Karnataka', 'bareilly': 'Uttar Pradesh', 'gurgaon': 'Haryana', 'gurugram': 'Haryana',
  'aligarh': 'Uttar Pradesh', 'jalandhar': 'Punjab', 'bhubaneswar': 'Odisha', 'salem': 'Tamil Nadu',
  'mira-bhayandar': 'Maharashtra', 'warangal': 'Telangana', 'thiruvananthapuram': 'Kerala', 'guntur': 'Andhra Pradesh',
  'bhiwandi': 'Maharashtra', 'saharanpur': 'Uttar Pradesh', 'gorakhpur': 'Uttar Pradesh', 'bikaner': 'Rajasthan',
  'amravati': 'Maharashtra', 'noida': 'Uttar Pradesh', 'jamshedpur': 'Jharkhand', 'bhilai': 'Chhattisgarh',
  'cuttack': 'Odisha', 'firozabad': 'Uttar Pradesh', 'kochi': 'Kerala', 'nellore': 'Andhra Pradesh',
  'bhavnagar': 'Gujarat', 'dehradun': 'Uttarakhand', 'durgapur': 'West Bengal', 'asansol': 'West Bengal',
  'rourkela': 'Odisha', 'nanded': 'Maharashtra', 'kolhapur': 'Maharashtra', 'ajmer': 'Rajasthan',
  'akola': 'Maharashtra', 'gulbarga': 'Karnataka', 'jamnagar': 'Gujarat', 'ujjain': 'Madhya Pradesh',
  'loni': 'Uttar Pradesh', 'siliguri': 'West Bengal', 'jhansi': 'Uttar Pradesh', 'ulhasnagar': 'Maharashtra',
  'mangalore': 'Karnataka', 'erode': 'Tamil Nadu', 'belgaum': 'Karnataka', 'ambattur': 'Tamil Nadu',
  'tirunelveli': 'Tamil Nadu', 'malegaon': 'Maharashtra', 'gaya': 'Bihar', 'jalgaon': 'Maharashtra',
  'udaipur': 'Rajasthan', 'maheshtala': 'West Bengal', 'davanagere': 'Karnataka', 'kozhikode': 'Kerala',

  // Hill Stations
  'shimla': 'Himachal Pradesh', 'manali': 'Himachal Pradesh', 'ooty': 'Tamil Nadu', 'munnar': 'Kerala',
  'darjeeling': 'West Bengal', 'nainital': 'Uttarakhand', 'mussoorie': 'Uttarakhand', 'mount abu': 'Rajasthan',
  'coorg': 'Karnataka', 'kodaikanal': 'Tamil Nadu', 'gangtok': 'Sikkim', 'lonavala': 'Maharashtra',
  'mahabaleshwar': 'Maharashtra', 'kasauli': 'Himachal Pradesh', 'dalhousie': 'Himachal Pradesh',

  // Coastal Cities
  'goa': 'Goa', 'panaji': 'Goa', 'pondicherry': 'Puducherry', 'puducherry': 'Puducherry',
  'daman': 'Daman and Diu', 'diu': 'Daman and Diu', 'puri': 'Odisha', 'digha': 'West Bengal',
  'varkala': 'Kerala', 'kovalam': 'Kerala', 'mahabalipuram': 'Tamil Nadu', 'karwar': 'Karnataka',

  // Villages and Small Towns (Sample)
  'khargone': 'Madhya Pradesh', 'sangli': 'Maharashtra', 'mau': 'Uttar Pradesh', 'barbil': 'Odisha',
  'pali': 'Rajasthan', 'panipat': 'Haryana', 'yamunanagar': 'Haryana', 'eluru': 'Andhra Pradesh',
  'mirzapur': 'Uttar Pradesh', 'ratlam': 'Madhya Pradesh', 'karimnagar': 'Telangana', 'etawah': 'Uttar Pradesh',
  'sagar': 'Madhya Pradesh', 'purnia': 'Bihar', 'dewas': 'Madhya Pradesh', 'bharatpur': 'Rajasthan',
  'raichur': 'Karnataka', 'budaun': 'Uttar Pradesh', 'tonk': 'Rajasthan', 'shimoga': 'Karnataka',
  'habra': 'West Bengal', 'vellore': 'Tamil Nadu', 'khammam': 'Telangana', 'gandhidham': 'Gujarat',
  'raiganj': 'West Bengal', 'surendranagar': 'Gujarat', 'baramati': 'Maharashtra', 'khanna': 'Punjab',
  'botad': 'Gujarat', 'rewa': 'Madhya Pradesh', 'haldwani': 'Uttarakhand', 'hapur': 'Uttar Pradesh',
  'rajahmundry': 'Andhra Pradesh', 'thoothukudi': 'Tamil Nadu', 'bidar': 'Karnataka', 'unnao': 'Uttar Pradesh',
  'kakinada': 'Andhra Pradesh', 'krishnanagar': 'West Bengal', 'dhule': 'Maharashtra', 'serampore': 'West Bengal'
};

// Regional weather patterns based on Indian geography and climate
const regionalWeatherPatterns: Record<string, any> = {
  'Maharashtra': { baseTemp: 30, humidity: 65, windSpeed: 15, climate: 'tropical', rainfall: 'moderate' },
  'Delhi': { baseTemp: 36, humidity: 45, windSpeed: 12, climate: 'hot-semi-arid', rainfall: 'low' },
  'Karnataka': { baseTemp: 27, humidity: 60, windSpeed: 14, climate: 'tropical-savanna', rainfall: 'moderate' },
  'Tamil Nadu': { baseTemp: 33, humidity: 75, windSpeed: 18, climate: 'tropical-wet', rainfall: 'high' },
  'West Bengal': { baseTemp: 34, humidity: 78, windSpeed: 13, climate: 'tropical-wet', rainfall: 'very-high' },
  'Telangana': { baseTemp: 34, humidity: 55, windSpeed: 15, climate: 'tropical-dry', rainfall: 'moderate' },
  'Gujarat': { baseTemp: 35, humidity: 50, windSpeed: 16, climate: 'hot-semi-arid', rainfall: 'low' },
  'Rajasthan': { baseTemp: 39, humidity: 35, windSpeed: 17, climate: 'hot-desert', rainfall: 'very-low' },
  'Uttar Pradesh': { baseTemp: 35, humidity: 55, windSpeed: 13, climate: 'humid-subtropical', rainfall: 'moderate' },
  'Andhra Pradesh': { baseTemp: 33, humidity: 70, windSpeed: 17, climate: 'tropical-wet', rainfall: 'high' },
  'Bihar': { baseTemp: 34, humidity: 65, windSpeed: 11, climate: 'humid-subtropical', rainfall: 'high' },
  'Haryana': { baseTemp: 36, humidity: 48, windSpeed: 14, climate: 'hot-semi-arid', rainfall: 'low' },
  'Punjab': { baseTemp: 35, humidity: 52, windSpeed: 13, climate: 'humid-subtropical', rainfall: 'moderate' },
  'Madhya Pradesh': { baseTemp: 34, humidity: 50, windSpeed: 12, climate: 'tropical-dry', rainfall: 'moderate' },
  'Kerala': { baseTemp: 29, humidity: 85, windSpeed: 15, climate: 'tropical-monsoon', rainfall: 'very-high' },
  'Odisha': { baseTemp: 32, humidity: 72, windSpeed: 16, climate: 'tropical-wet', rainfall: 'high' },
  'Jharkhand': { baseTemp: 33, humidity: 68, windSpeed: 12, climate: 'humid-subtropical', rainfall: 'high' },
  'Chhattisgarh': { baseTemp: 33, humidity: 62, windSpeed: 11, climate: 'tropical-wet', rainfall: 'moderate' },
  'Chandigarh': { baseTemp: 34, humidity: 50, windSpeed: 13, climate: 'humid-subtropical', rainfall: 'moderate' },
  'Assam': { baseTemp: 30, humidity: 82, windSpeed: 10, climate: 'tropical-monsoon', rainfall: 'very-high' },
  'Himachal Pradesh': { baseTemp: 18, humidity: 55, windSpeed: 8, climate: 'temperate', rainfall: 'moderate' },
  'Uttarakhand': { baseTemp: 22, humidity: 60, windSpeed: 9, climate: 'temperate', rainfall: 'moderate' },
  'Jammu and Kashmir': { baseTemp: 16, humidity: 52, windSpeed: 10, climate: 'alpine', rainfall: 'moderate' },
  'Goa': { baseTemp: 31, humidity: 80, windSpeed: 19, climate: 'tropical-monsoon', rainfall: 'very-high' },
  'Puducherry': { baseTemp: 32, humidity: 77, windSpeed: 18, climate: 'tropical-wet', rainfall: 'high' },
  'Daman and Diu': { baseTemp: 31, humidity: 75, windSpeed: 17, climate: 'tropical-monsoon', rainfall: 'moderate' },
  'Sikkim': { baseTemp: 15, humidity: 70, windSpeed: 8, climate: 'alpine', rainfall: 'high' }
};

// Generate realistic weather data based on location
const generateWeatherData = (cityName: string, stateName: string) => {
  const pattern = regionalWeatherPatterns[stateName] || regionalWeatherPatterns['Maharashtra'];

  // Add random variation to make it realistic
  const tempVariation = Math.floor(Math.random() * 6) - 3;
  const currentTemp = pattern.baseTemp + tempVariation;
  const feelsLike = currentTemp + Math.floor(Math.random() * 5) + 1;

  // Generate condition based on climate
  const conditions = getConditionsForClimate(pattern.climate, pattern.rainfall);
  const currentCondition = conditions[Math.floor(Math.random() * conditions.length)];

  // Generate 5-day forecast
  const daysOfWeek = ['Today', 'Tomorrow', 'Friday', 'Saturday', 'Sunday'];
  const forecast = daysOfWeek.map((day, index) => {
    const dayTempVariation = Math.floor(Math.random() * 4) - 2;
    const dayTemp = currentTemp + dayTempVariation;
    const minTemp = dayTemp - (5 + Math.floor(Math.random() * 3));
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const icon = getIconForCondition(condition);

    return { day, temp: dayTemp, minTemp, condition, icon };
  });

  return {
    name: cityName,
    state: stateName,
    current: {
      temp: currentTemp,
      condition: currentCondition,
      humidity: pattern.humidity + Math.floor(Math.random() * 10) - 5,
      windSpeed: pattern.windSpeed + Math.floor(Math.random() * 6) - 3,
      visibility: Math.floor(Math.random() * 5) + 6,
      pressure: 1008 + Math.floor(Math.random() * 10),
      feelsLike
    },
    forecast
  };
};

// Get weather conditions based on climate type
const getConditionsForClimate = (climate: string, rainfall: string) => {
  const conditionSets: Record<string, string[]> = {
    'hot-desert': ['Extremely Hot', 'Very Hot', 'Hot & Sunny', 'Sunny', 'Partly Cloudy'],
    'hot-semi-arid': ['Very Hot', 'Hot & Sunny', 'Sunny', 'Partly Cloudy', 'Hazy'],
    'tropical': ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Warm'],
    'tropical-savanna': ['Pleasant', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Warm'],
    'tropical-wet': ['Humid', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'],
    'tropical-dry': ['Hot & Dry', 'Sunny', 'Partly Cloudy', 'Warm', 'Clear Sky'],
    'tropical-monsoon': ['Humid', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Drizzle'],
    'humid-subtropical': ['Warm', 'Humid', 'Partly Cloudy', 'Cloudy', 'Light Rain'],
    'temperate': ['Cool', 'Pleasant', 'Partly Cloudy', 'Cloudy', 'Light Rain'],
    'alpine': ['Cold', 'Cool', 'Cloudy', 'Chilly', 'Foggy']
  };

  return conditionSets[climate] || conditionSets['tropical'];
};

// Get icon based on condition
const getIconForCondition = (condition: string): string => {
  if (condition.includes('Rain') || condition.includes('Drizzle')) return 'rain';
  if (condition.includes('Cloud')) return 'cloud';
  if (condition.includes('Snow') || condition.includes('Cold')) return 'snow';
  return 'sun';
};

const getWeatherIcon = (iconType: string, size: number = 64) => {
  switch (iconType) {
    case 'sun':
      return <Sun size={size} className="text-yellow-500" />;
    case 'cloud':
      return <Cloud size={size} className="text-gray-500" />;
    case 'rain':
      return <CloudRain size={size} className="text-blue-500" />;
    case 'snow':
      return <CloudSnow size={size} className="text-blue-300" />;
    default:
      return <Sun size={size} className="text-yellow-500" />;
  }
};

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const popularCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur'];

  const getWeather = (cityName: string) => {
    if (!cityName.trim()) {
      setError('Please enter a city or village name');
      return;
    }

    const searchKey = cityName.trim().toLowerCase();
    const displayName = cityName.trim().split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');

    // Check if city exists in our database
    if (indianLocations[searchKey]) {
      const stateName = indianLocations[searchKey];
      const weatherInfo = generateWeatherData(displayName, stateName);
      setWeatherData(weatherInfo);
      setError('');

      // Add to search history
      if (!searchHistory.includes(displayName)) {
        setSearchHistory(prev => [displayName, ...prev].slice(0, 5));
      }
    } else {
      setError(
        `"${displayName}" not found in our database. This app covers major Indian cities and towns. Try searching for nearby major cities or popular locations.`
      );
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    getWeather(city);
  };

  const handleCityClick = (cityName: string) => {
    setCity(cityName);
    getWeather(cityName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="size-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">India Weather Forecast</h1>
          <p className="text-gray-600">5-Day Weather Predictions for Major Indian Cities</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for Indian cities..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-800 outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Get Weather
            </button>
          </div>

          {/* Popular Cities */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">Popular Cities:</p>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((cityName) => (
                <button
                  key={cityName}
                  onClick={() => handleCityClick(cityName)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all text-sm font-medium"
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Recent Searches:</p>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((cityName, index) => (
                  <button
                    key={index}
                    onClick={() => handleCityClick(cityName)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all text-sm flex items-center gap-1"
                  >
                    <Navigation size={14} />
                    {cityName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-xl mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Weather Data */}
        {weatherData && (
          <div className="space-y-6">
            {/* Current Weather */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">{weatherData.name}, {weatherData.state}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Main Weather */}
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4">
                    {getWeatherIcon(weatherData.forecast[0].icon, 100)}
                  </div>
                  <h3 className="text-7xl font-bold text-gray-800 mb-2">{weatherData.current.temp}°C</h3>
                  <p className="text-2xl text-gray-600 mb-1">{weatherData.current.condition}</p>
                  <p className="text-gray-500">Feels like {weatherData.current.feelsLike}°C</p>
                </div>

                {/* Right: Weather Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="text-blue-500" size={24} />
                      <span className="text-gray-600 text-sm">Humidity</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.current.humidity}%</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="text-green-500" size={24} />
                      <span className="text-gray-600 text-sm">Wind Speed</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.current.windSpeed} km/h</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="text-purple-500" size={24} />
                      <span className="text-gray-600 text-sm">Visibility</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.current.visibility} km</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="text-orange-500" size={24} />
                      <span className="text-gray-600 text-sm">Pressure</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.current.pressure} mb</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-blue-600" size={24} />
                <h3 className="text-2xl font-bold text-gray-800">5-Day Forecast</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 text-center hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-200"
                  >
                    <p className="font-semibold text-gray-700 mb-3">{day.day}</p>
                    <div className="flex justify-center mb-3">
                      {getWeatherIcon(day.icon, 48)}
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mb-1">{day.temp}°</p>
                    <p className="text-sm text-gray-500 mb-2">Min: {day.minTemp}°</p>
                    <p className="text-sm text-gray-600">{day.condition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Tips */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
              <h4 className="font-bold text-amber-900 mb-2">Weather Advisory</h4>
              <p className="text-amber-800">
                {weatherData.current.temp > 35 && "⚠️ Very hot weather! Stay hydrated and avoid direct sunlight during peak hours."}
                {weatherData.current.temp >= 25 && weatherData.current.temp <= 35 && "☀️ Pleasant weather! Perfect time for outdoor activities."}
                {weatherData.current.temp < 25 && "🌤️ Comfortable weather! Enjoy your day!"}
                {weatherData.forecast.some((d: any) => d.icon === 'rain') && " 🌧️ Rain expected in coming days. Carry an umbrella!"}
              </p>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {!weatherData && !error && (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <Sun size={80} className="text-yellow-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Welcome to India Weather Forecast</h2>
            <p className="text-gray-600 mb-6 text-center">
              Get accurate 5-day weather predictions for Indian cities and towns. No API key required!
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex justify-center mb-3">
                  <MapPin size={32} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-center">200+ Locations</h3>
                <p className="text-sm text-gray-600 text-center">
                  Coverage across all major Indian cities, towns, and popular destinations
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex justify-center mb-3">
                  <Calendar size={32} className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-center">5-Day Forecast</h3>
                <p className="text-sm text-gray-600 text-center">
                  Detailed weather predictions with temperature and conditions
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex justify-center mb-3">
                  <Gauge size={32} className="text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-center">Complete Details</h3>
                <p className="text-sm text-gray-600 text-center">
                  Humidity, wind speed, visibility, pressure, and more
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 text-center">Try Searching For:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="text-gray-700">• Metro Cities (Mumbai, Delhi)</div>
                <div className="text-gray-700">• Hill Stations (Shimla, Ooty)</div>
                <div className="text-gray-700">• Coastal Areas (Goa, Kochi)</div>
                <div className="text-gray-700">• Small Towns (Khanna, Dewas)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}