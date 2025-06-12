import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

import { usarContexto } from './LoginContexto';
const Drawer = createDrawerNavigator();
import InitScreen from './components/init';
import LoginScreen from './components/login';
import CadastroScreen from './components/cadastro';
import HomeScreen from './components/home';
import RegistroScreen from './components/registroconsumo';
import HistoricoScreen from './components/historico';
import GraficoScreen from './components/graficos';
import DicasScreen from './components/dicas';
import PerfilScreen from './components/perfil';

export default function NavDrawer() {
   const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  if (!fontsLoaded) return null;
  
  const { usuarioLogado } = usarContexto();
  return (
    <NavigationContainer>
      {usuarioLogado == null ? (
        <Drawer.Navigator
          initialRouteName="Init"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ navigation }) => ({
            header: () => (
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                  <MaterialCommunityIcons name="menu" size={28} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>ECOCONTADOR</Text>

                <TouchableOpacity>
                  <Image
                    source={require('./assets/logo.png')}
                    style={styles.logo}
                  />
                </TouchableOpacity>
              </View>
            ),
            drawerStyle: {
              backgroundColor: 'transparent',
              width: 240,
            },
            drawerLabelStyle: styles.drawerLabel,
          })}>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              drawerLabel: () => null,
              title: null,
            }}
          />
          <Drawer.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{
              headerShown: false,
              drawerLabel: () => null,
              title: null,
            }}
          />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: ({ size }) => (
                <MaterialCommunityIcons name="home" color="#fff" size={size} />
              ),
            }}
          />

          <Drawer.Screen
            name="Histórico"
            component={HistoricoScreen}
            options={{
              drawerIcon: ({ size }) => (
                <MaterialCommunityIcons
                  name="history"
                  color="#fff"
                  size={size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="RegistroConsumo"
            component={RegistroScreen}
            options={{
              drawerIcon: ({ size }) => (
                <MaterialCommunityIcons
                  name="history"
                  color="#fff"
                  size={size}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="Gráfico"
            component={GraficoScreen}
            options={{
              drawerIcon: ({ size }) => (
                <MaterialCommunityIcons
                  name="chart-bar"
                  color="#fff"
                  size={size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Dicas e Metas"
            component={DicasScreen}
            options={{
              drawerIcon: ({ size }) => (
                <MaterialCommunityIcons
                  name="lightbulb-on-outline"
                  color="#fff"
                  size={size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Perfil"
            component={PerfilScreen}
            options={{
              drawerIcon: ({ size }) => (
                <MaterialCommunityIcons
                  name="account-circle"
                  color="#fff"
                  size={size}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="Registro"
            component={RegistroScreen}
            options={{
              drawerIcon: ({ size }) => (
                <MaterialCommunityIcons
                  name="clipboard-plus"
                  color="#fff"
                  size={size}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <LinearGradient
      colors={['#6B8E23', '#6B8E23']}
      style={styles.drawerBackground}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  drawerBackground: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    height: 100,
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2E4D2E',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#fff',
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fff',
  },
  drawerLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#fff',
    marginLeft: -10,
  },
});
