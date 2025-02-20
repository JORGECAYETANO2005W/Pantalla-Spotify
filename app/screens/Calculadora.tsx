import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface HistorialEntrada {
  id: string;
  consumo: string;
  porcentajePropina: number;
  propina: string;
  totalPagar: string;
}

const CalculadoraPropinas: React.FC = () => {
  const [consumo, setConsumo] = useState<string>('');
  const [propinaPersonalizada, setPropinaPersonalizada] = useState<string>('');
  const [propinaSeleccionada, setPropinaSeleccionada] = useState<number | null>(null);
  const [historial, setHistorial] = useState<HistorialEntrada[]>([]);

  const opcionesPropina: number[] = [10, 15, 20];

  const calcularPropina = (porcentajePropina: number) => {
    const montoConsumo = parseFloat(consumo);
    if (isNaN(montoConsumo) || montoConsumo <= 0) return;
    
    const montoPropina = (montoConsumo * porcentajePropina) / 100;
    const total = montoConsumo + montoPropina;
    
    const nuevaEntrada: HistorialEntrada = {
      id: Math.random().toString(),
      consumo: montoConsumo.toFixed(2),
      porcentajePropina,
      propina: montoPropina.toFixed(2),
      totalPagar: total.toFixed(2),
    };
    
    setHistorial([nuevaEntrada, ...historial]);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Calculadora de Propinas</Text>
      
      <Text style={styles.etiqueta}>Monto del consumo</Text>
      <TextInput
        style={styles.entrada}
        placeholder="Ej: 150.00"
        placeholderTextColor="#A0AEC0"
        keyboardType="numeric"
        value={consumo}
        onChangeText={setConsumo}
      />
      
      <Text style={styles.subtitulo}>Seleccione porcentaje de propina</Text>
      <View style={styles.contenedorPropinas}>
        {opcionesPropina.map((propina) => (
          <TouchableOpacity
            key={propina}
            style={[
              styles.botonPropina,
              propinaSeleccionada === propina && styles.propinaSeleccionada
            ]}
            onPress={() => {
              setPropinaSeleccionada(propina);
              setPropinaPersonalizada('');
              calcularPropina(propina);
            }}>
            <Text style={[
              styles.textoBoton,
              propinaSeleccionada === propina && styles.textoBotonSeleccionado
            ]}>
              {propina}%
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.etiqueta}>Porcentaje personalizado</Text>
      <TextInput
        style={[styles.entrada, styles.entradaPersonalizada]}
        placeholder="Ingrese porcentaje manual"
        placeholderTextColor="#D69E2E"
        keyboardType="numeric"
        value={propinaPersonalizada}
        onChangeText={setPropinaPersonalizada}
        onSubmitEditing={() => {
          const valorPropina = parseFloat(propinaPersonalizada);
          if (!isNaN(valorPropina) && valorPropina > 0) {
            setPropinaSeleccionada(null);
            calcularPropina(valorPropina);
          }
        }}
      />

      <Text style={styles.subtitulo}>Historial de cálculos</Text>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemHistorial}>
            <Text style={styles.textoHistorial}>
              Consumo: <Text style={styles.textoResaltado}>${item.consumo}</Text>
            </Text>
            <Text style={styles.textoHistorial}>
              Propina: <Text style={styles.textoResaltado}>{item.porcentajePropina}% (${item.propina})</Text>
            </Text>
            <Text style={styles.textoHistorial}>
              Total: <Text style={styles.textoResaltado}>${item.totalPagar}</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 24,
    backgroundColor: '#1A202C',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: '#F6E05E',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F6E05E',
    marginBottom: 10,
  },
  etiqueta: {
    fontSize: 14,
    color: '#CBD5E0',
    marginBottom: 8,
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#D69E2E',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#2D3748',
    fontSize: 16,
    color: '#F6E05E',
  },
  entradaPersonalizada: {
    borderColor: '#E53E3E',
    backgroundColor: '#4A5568',
  },
  contenedorPropinas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  botonPropina: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#2D3748',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  propinaSeleccionada: {
    backgroundColor: '#D69E2E',
  },
  textoBoton: {
    color: '#CBD5E0',
    fontWeight: '600',
    fontSize: 14,
  },
  textoBotonSeleccionado: {
    color: '#1A202C',
  },
  itemHistorial: {
    backgroundColor: '#2D3748',
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
  },
  textoHistorial: {
    color: '#CBD5E0',
  },
  textoResaltado: {
    fontWeight: '700',
    color: '#D69E2E',
  },
});

export default CalculadoraPropinas;
