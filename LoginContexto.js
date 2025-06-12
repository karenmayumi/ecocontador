import { createContext, useState, useContext } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Alert } from 'react-native';

const LoginContexto = createContext();

export const usarContexto = () => useContext(LoginContexto);

export const Provider = ({ children }) => {
  const db = useSQLiteContext();
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const cadastrar = async (login, senha) => {
    if (!login || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    console.log(login + '  Senha ' + senha);
    const query = 'insert into usuarios (login, senha) values (?, ?)';
    const resultado = await db.runAsync(query, [login, senha]);
    if (resultado.lastInsertRowId > 0) {
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
      logar(login,senha)
    } else {
      Alert.alert('Erro', 'Erro ao cadastrar');
    }
    console.log(resultado);
  };

  const logar = async (usuario, senha) => {
    const query = 'SELECT * FROM usuarios WHERE login = ? AND senha = ?';
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
    <LoginContexto.Provider value={{ usuarioLogado, logar, logoff, cadastrar }}>
      {children}
    </LoginContexto.Provider>
  );
};
