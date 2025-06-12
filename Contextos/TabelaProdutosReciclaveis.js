import { createContext, useState, useContext } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Alert } from 'react-native';

const TabelaProdutos = createContext();

export const usarTabelaProdutos = () => useContext(TabelaProdutos);

export const Provider = ({ children }) => {
  const db = useSQLiteContext();
  /*
      CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome_produto TEXT NOT NULL,
          material_reciclavel TEXT NOT NULL,
          peso_material REAL NOT NULL
      );
  */

  const add_produto = async (nome_produto, material_reciclavel, peso_material) => {
    if (!nome_produto || !material_reciclavel || !peso_material) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    const query = 'insert into produtos (nome_produto, material_reciclavel,peso_material) values (?, ?, ?)';
    const resultado = await db.runAsync(query, [nome_produto, material_reciclavel, peso_material ]);
    if (resultado.lastInsertRowId > 0) {
      Alert.alert('Sucesso', 'Cadastrado com sucesso');
    } else {
      Alert.alert('Erro', 'Erro ao cadastrar');
    }
  };
  const editar_produto = async (id, nome_produto, material_reciclavel, peso_material) => {
    if (!nome_produto || !material_reciclavel || !peso_material) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if(id == 0){
      Alert.alert('Erro', 'Erro ao editar, Id inválido');
      return; 
    }
  };
  const listar_produtos = async (query) => {
    const query = 'SELECT * FROM produtos';
    if(query.length >0)
    {
        query= query+" WHERE id = ? or nome_produto like ? or material_reciclavel like ? "
    }
    const result = await db.getAllAsync(query, [usuario, senha]);

    if (result.length == 1) {
      setUsuarioLogado(result);
    } else {
      Alert.alert('Atenção', 'Usuário e/ou senha inválido');
    }
  };

  const logoff = () => {
    setUsuarioLogado(null);
  };
  return (
    <TabelaProdutos.Provider value={{ add_produto, editar_produto, excluir_produto, listar_produtos }}>
      {children}
    </TabelaProdutos.Provider>
  );
};
