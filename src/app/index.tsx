import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Estudante {
  id: string;
  nome: string;
  curso: string;
}

export default function App() {
  const [curso, setCurso] = useState('');
  const [nome, setNome] = useState('');
  const [estudantes, setEstudantes] = useState<Estudante[]>([]);
  const [edicao, setEdicao] = useState('')

  function EditarEstudante(id: string, novoNome: string, novoRm: string) {
    setEdicao("")
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

  function CadastrarEstudante(nome: string, curso: string) {
    const novoEstudante = { id: crypto.randomUUID(), nome, curso };
    setEstudantes(estadoAnterior => [...estadoAnterior, novoEstudante]);

    // Limpa os campos após o CadastrarEstudante
    setNome('');
    setCurso('');
  }

  useEffect(() => {
    console.log("Lista de estudantes atualizada:", estudantes);
  }, [estudantes]);

  return (
    // 1. Mudamos para flex: 1 aqui na View mais externa para preencher a tela toda
    <View style={styles.page}>
      <SafeAreaView style={styles.container}>

        <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 10 }}>{edicao.length > 0 ? "Editando o estudante." : "Cadastre novos estudantes!"}</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o seu nome."
          value={nome}
          // Remove números automaticamente enquanto o usuário digita
          onChangeText={(texto) => setNome(texto.replace(/[0-9]/g, ''))}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite o seu curso."
          value={curso}
          // Remove números automaticamente enquanto o usuário digita
          onChangeText={(texto) => setCurso(texto.replace(/[0-9]/g, ''))}
        />

        <TouchableOpacity
          style={styles.buttan}
          onPress={() => {
            if (nome.length <= 0) {
              Alert.alert('Preencha todos os campos!', 'O campo com o nome não foi preenchido corretamente.', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancelar Pressionado'),
                  style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ]);
              return;
            }
            else if (curso.length <= 0) {
              Alert.alert('Preencha todos os campos!', 'O campo com o curso não foi preenchido corretamente.', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancelar Pressionado'),
                  style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ]);
            }
            if(edicao.length > 0){
              EditarEstudante(edicao,nome,curso)
              return;
            }
            CadastrarEstudante(nome, curso);
          }}
        >
          <Text style={styles.buttanText}>Cadastrar Estudante</Text>
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
                  <Text style={{ fontWeight: 'bold' }}>   Nome:</Text> {estudante.nome} |
                  <Text style={{ fontWeight: 'bold' }}>   Curso:</Text> {estudante.curso}
                </Text>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.btnEdit}
                    onPress={() => {
                      setEdicao(estudante.id)
                      setCurso(estudante.curso)
                      setNome(estudante.nome)
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
  page:{
    backgroundColor: "#f2ddff",
    flex: 1,
  },
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
    backgroundColor: "#e9cafc",
  },
  buttan: {
    backgroundColor: 'rgb(198, 75, 255)',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20, // Espaço extra antes de começar a lista
  },
  buttanText: {
    color: 'rgb(255, 255, 255)',
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
