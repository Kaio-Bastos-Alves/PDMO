import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Estudante {
  id: string;
  nome: string;
  rm: string;
}

export default function App() {

  const [text, setText] = useState(0);
  const [nome, setNome] = useState('');
  const [estudantes, setEstudantes] = useState<Estudante[]>([]);


  function EditarEstudante(id: string, novoNome: string, novoRm: string) {
    setEstudantes(estadoAnterior =>
      estadoAnterior.map(estudante => {
        if (estudante.id === id) {
          return { ...estudante, nome: novoNome, rm: novoRm };
        }
        return estudante;
      })
    );
  }

  function DeletarEstudante(id: string) {
    setEstudantes(estudantes.filter(e => e.id !== id))
  }

  function Login(nome: string, rm: string) {
    const novoEstudante = { id: estudantes.length.toString(), nome, rm };

    setEstudantes(estadoAnterior => [
      ...estadoAnterior,
      novoEstudante
    ]);
  }

  useEffect(() => {
    console.log("Lista de estudantes atualizada:", estudantes);
  }, [estudantes]);

  return (
    <View>
      <SafeAreaView style={[styles.container, { backgroundColor: "#bdacacff" }]}>

        <TextInput
          style={styles.input}
          placeholder="Digite o seu nome."
          value={nome}
          onChangeText={(nome) => setNome(nome)}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite o seu RM."
          value={text ? text.toString() : ''}
          keyboardType="numeric"
          onChangeText={(rawText) => {
            const cleaned = rawText.replace(/[^0-9]/g, '');
            if (cleaned === '') {
              setText(0);
            } else {
              setText(parseInt(cleaned, 10));
            }
          }}
        />



        <TouchableOpacity
          style={styles.buttan}
          onPress={() => {
            if (nome.length <= 0 || text <= 0) {
              return  //dps eu faço algo
            }
            Login(nome, text.toString())
          }}>

          <Text style={styles.buttanText}>Login</Text>

        </TouchableOpacity>

        {estudantes.length === 0 ? (
          <p>Nenhum estudante logado.</p>
        ) : (
          <ul>
            {estudantes.map((estudante) => (
              <li key={estudante.id} style={{ marginBottom: '10px' }}>
                <strong>Nome:</strong> {estudante.nome} | <strong>RM:</strong> {estudante.rm}

                {/* Future buttons will go here */}
                <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                  <button style={{ backgroundColor:"#c49c9cff", borderStyle:"none", padding:"6px", borderRadius:"10%"}}
                  onClick={() => {
                    const novoNome = prompt("Digite o novo nome:", estudante.nome);
                    const novoRm = prompt("Digite o novo RM:", estudante.rm);
                    if (novoNome && novoRm) {
                      EditarEstudante(estudante.id, novoNome, novoRm);
                    }
                  }}>Editar</button>
                  <button style={{ backgroundColor:"#b45050ff", borderStyle:"none", padding:"6px", borderRadius:"10%", marginLeft:"10px"}}
                  onClick={() => { DeletarEstudante(estudante.id) }}>Deletar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
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
    gap: 10,
  },
  input: {
    height: 25,
    width: 200,
    borderWidth: 1,
    borderColor: '#000000ff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#bebcbcff',
  },
  title: {
    height: 25,
    width: 300,
    paddingStart: 35,
    fontSize: 20
  },
  buttan: {
    backgroundColor: '#b5f7adff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttanText: {
    color: '#171a16ff',
  }

});