import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
    setEstudantes(estudantes.filter(e => e.id !== id));
  }

  function Login(nome: string, rm: string) {
    const novoEstudante = { id: crypto.randomUUID(), nome, rm };
    setEstudantes(estadoAnterior => [...estadoAnterior, novoEstudante]);
    
    // Limpa os campos após o login
    setNome('');
    setText(0);
  }

  useEffect(() => {
    console.log("Lista de estudantes atualizada:", estudantes);
  }, [estudantes]);

  return (
    // 1. Mudamos para flex: 1 aqui na View mais externa para preencher a tela toda
    <View style={{ flex: 1, backgroundColor: "#bdacacff" }}>
      <SafeAreaView style={styles.container}>

        <Text style={{fontWeight:"bold", fontSize:24, marginBottom:10}}>Cadastre Novos Estudantes!</Text>

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
              return;
            }
            Login(nome, text.toString());
          }}
        >
          <Text style={styles.buttanText}>Login</Text>
        </TouchableOpacity>

        {/* 2. Tiramos a condicional que usava a tag <p> e deixamos a FlatList cuidar disso */}
        <View style={styles.listContainer}>
          <FlatList
            data={estudantes}
            keyExtractor={(estudante) => estudante.id}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum estudante logado.</Text>}
            renderItem={({ item: estudante }) => (
              <View style={styles.itemRow}>
                <Text style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>Nome:</Text> {estudante.nome} | 
                  <Text style={{ fontWeight: 'bold' }}> RM:</Text> {estudante.rm}
                </Text>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity 
                    style={styles.btnEdit}
                    onPress={() => {
                      const novoNome = prompt("Digite o novo nome:", estudante.nome);
                      const novoRm = prompt("Digite o novo RM:", estudante.rm);
                      if (novoNome && novoRm) {
                        EditarEstudante(estudante.id, novoNome, novoRm);
                      }
                    }}
                  >
                    <Text style={{ color: '#000' }}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.btnDelete}
                    onPress={() => { DeletarEstudante(estudante.id) }}
                  >
                    <Text style={{ color: '#fff' }}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60, // Diminuído para não empurrar os inputs para muito baixo
    gap: 10,
  },
  input: {
    height: 35, // Aumentado um pouco para melhor usabilidade de toque
    width: 200,
    borderWidth: 1,
    borderColor: '#000000ff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#bebcbcff',
  },
  buttan: {
    backgroundColor: '#b5f7adff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20, // Espaço extra antes de começar a lista
  },
  buttanText: {
    color: '#171a16ff',
  },
  // Novas classes organizadas para o layout e o scroll funcionarem
  listContainer: {
    flex: 1,       // Ocupa todo o espaço restante da tela disponível
    width: '90%',  // Evita que a lista fique grudada nas bordas laterais
  },
  itemRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#bebcbcff', // Fundo leve para destacar o item da lista
    padding: 10,
    borderRadius: 8,
    marginBottom: 10 
  },
  btnEdit: { 
    backgroundColor: "#c49c9cff", 
    padding: 6, 
    borderRadius: 4 
  },
  btnDelete: { 
    backgroundColor: "#b45050ff", 
    padding: 6, 
    borderRadius: 4, 
    marginLeft: 10 
  }
});
