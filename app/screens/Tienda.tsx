import { ActivityIndicator, StylesSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

const Tienda = () => {
    
    type prod={
        id: number,
        title:string,
        price:number,
        description:string,
        category:string,
        image:string,
        rating:(
            rate:number,
            count:number
        )

    }

    const [producto,setProducto]=useState<prod>();
    const [loading,setLoading]=useState<boolean>(true);

    const loadData=async()=>{
        try{
            const respuesta = await fetch('https://fakestoreapi.com/products/1')
            if(!respuesta.ok){
                console.log('Error1 ')
                throw new Error('Ocurrio un error : $(respuesta.status)');
            }
            const datos = await respuesta.json();
            console.log(datos)
            setProducto(datos);

        }catch(e){
            console.log('Error : '+e)
        }finally{
            setLoading(false);
        }
    }

    const screenload=()=>{
        return(
            <View>
            <Text>Tienda</Text>
            <Text>{producto.title}</Text>
            </View>
        )
        
    }

    const screenUnload=()=>{
        return(
            <View>
            <Text>Cragando Datos</Text>
            <boton title='Carga datos' onPress={loadData}/>
            <ActivityIndicator/>
            </View>
        )
    }
    return(
        <View>
            {loading?screenUnload():screenload()};
        </View>
        
    )
}

export default Tienda

const styles = StylesSheet.create({})
