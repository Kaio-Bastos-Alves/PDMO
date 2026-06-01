import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
 
export default function App() {
  
  var Chance;
  const [text, setText] = useState('Brasil');
  const [colorBck, setColorBck] = useState('white');

    return (
<View>
<SafeAreaView style={[styles.container, {backgroundColor: colorBck}]}>

<Text style={[styles.title]}>Qual time vencera o hexa?</Text>

    <TextInput
        style={styles.input}
        placeholder="Digite o nome do time..."
        value={text}
        onChangeText={(text) => setText(text)}
      />

  <TouchableOpacity 
          style={styles.buttan} 
          onPress={() => {Chance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
                      if (Chance >= 75) {alert("O time vencedor é o: " + text); setColorBck("#edffcf")}
                      else {alert("Não foi dessa vez :C"); setColorBck("#ffcbcb")}
                      console.log(Chance)}}>

          <Text style={styles.buttanText}>Tentar</Text>   
          
      </TouchableOpacity>

    </SafeAreaView>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 150,
    paddingBottom: 1000,
    gap:10,
  },
  input: {
    height: 25,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  title: {
    height: 25,
    width: 200,
    paddingStart: 15
  },
  buttan: {
    backgroundColor: '#8a8a8a',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttanText:{
    color: "white"
  }

});