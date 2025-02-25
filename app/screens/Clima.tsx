import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';

interface WeatherData {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    condition: {
      text: string;
    };
  };
}

interface DailyWeatherData {
  date: string;
  dayOfWeek: string;
  maxTemp: number;
  minTemp: number;
  pop: number;
  condition: string;
}

const API_KEY = '8dd6c34d6e9e4252b69230603252402';

// Traducciones para las condiciones climáticas
const weatherTranslations: { [key: string]: string } = {
  'Sunny': 'Soleado',
  'Clear': 'Despejado',
  'Partly cloudy': 'Parcialmente nublado',
  'Cloudy': 'Nublado',
  'Overcast': 'Cubierto',
  'Mist': 'Neblina',
  'Patchy rain possible': 'Posibilidad de lluvia',
  'Light rain': 'Lluvia ligera',
  'Moderate rain': 'Lluvia moderada',
  'Heavy rain': 'Lluvia fuerte',
};

const WeatherCard = ({ item }: { item: DailyWeatherData }) => {
  const getBackgroundColor = (temp: number) => {
    if (temp < 20) return '#87CEEB';
    if (temp <= 30) return '#FFD700';
    return '#FFA500';
  };

  return (
    <View style={[styles.card, { backgroundColor: getBackgroundColor(item.maxTemp) }]}>
      <Text style={styles.day}>{item.dayOfWeek}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text>Máx: {item.maxTemp}°C</Text>
      <Text>Mín: {item.minTemp}°C</Text>
      <Text>Lluvia: {item.pop}%</Text>
      <Text>{item.condition}</Text>
    </View>
  );
};

const App = () => {
  const [weatherData, setWeatherData] = useState<DailyWeatherData[]>([]);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Paso 1: Solicitar permiso de ubicación
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permiso de ubicación denegado');
          setLoading(false);
          return;
        }

        // Paso 2: Obtener coordenadas
        let location = await Location.getCurrentPositionAsync({});
        const { latitude: lat, longitude: lon } = location.coords;

        // Paso 3: Consultar API del clima en español
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&aqi=no&alerts=no&lang=es`
        );
        
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const data = await response.json();
        
        // Paso 4: Procesar datos
        const today = new Date();
        const processedData: DailyWeatherData[] = data.forecast.forecastday
          .map((item: WeatherData, index: number) => {
            const dateObj = new Date(item.date + 'T00:00:00'); // Fuerza hora local
            const formattedDate = new Intl.DateTimeFormat('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            }).format(dateObj);
            
            // Determinar si es hoy
            const isToday = dateObj.toDateString() === today.toDateString();
            
            // Obtener nombre del día capitalizado
            let dayName = new Intl.DateTimeFormat('es-ES', { 
              weekday: 'long',
              timeZone: 'UTC' // Asegura consistencia con la fecha de la API
            }).format(dateObj);
            dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

            // Traducir condición climática si es necesario
            const condition = weatherTranslations[item.day.condition.text] || item.day.condition.text;

            return {
              date: formattedDate,
              dayOfWeek: index === 0 && isToday ? 'Hoy' : dayName,
              maxTemp: item.day.maxtemp_c,
              minTemp: item.day.mintemp_c,
              pop: item.day.daily_chance_of_rain,
              condition: condition
            };
          })
          .slice(0, 5);

        setLocationName(data.location.name);
        setWeatherData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronóstico del Clima de 5 días - {locationName}</Text>
      <FlatList
        data={weatherData}
        renderItem={({ item }) => <WeatherCard item={item} />}
        keyExtractor={item => item.date}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#808080',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginRight: 15,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  day: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    marginBottom: 10,
    color: '#666',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    textAlign: 'center',
    color: 'red',
    padding: 20,
  },
});

export default App;