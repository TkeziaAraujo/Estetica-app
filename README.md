# Aplicativo de Gestão para Estética

## 📱 Sobre o Projeto

Um aplicativo móvel desenvolvido em React Native para gestão de clínicas de estética, salões de beleza e profissionais autônomos. O sistema permite gerenciar clientes, agendamentos, serviços e controle financeiro.

## 🚀 Funcionalidades Principais

- ✅ Gestão de Clientes
- 📅 Agendamentos
- 💰 Controle Financeiro
- 📊 Relatórios e Métricas
- 🔄 Sincronização Offline
- 🔐 Sistema de Autenticação
- 🌙 Modo Escuro
- 🔔 Sistema de Notificações

## 🛠️ Tecnologias Utilizadas

- React Native
- TypeScript
- Firebase (Authentication e Firestore)
- Expo
- React Navigation
- React Native Paper
- AsyncStorage
- NetInfo

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/TkeziaAraujo/estetica-app

# Entre no diretório
cd estetica-app

# Instale as dependências
npm install

# Configure o Firebase
```

### Configuração do Firebase

Substitua as configurações no arquivo:


```5:13:src/config/firebase.ts
const firebaseConfig = {
  // Substitua com suas configurações do Firebase
  apiKey: "sua-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  storageBucket: "seu-storage-bucket",
  messagingSenderId: "seu-sender-id",
  appId: "seu-app-id"
};
```


## 🏃‍♂️ Executando o Projeto

```bash
# Desenvolvimento
npm run start

# Android
npm run android

# iOS
npm run ios
```

## 📱 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── config/        # Configurações (Firebase, etc)
├── contexts/      # Contextos React (Auth, Theme)
├── screens/       # Telas do aplicativo
├── services/      # Serviços (API, Storage, etc)
├── types/         # Definições de tipos TypeScript
└── utils/         # Funções utilitárias
```

## 🔒 Autenticação

O sistema utiliza Firebase Authentication com diferentes níveis de acesso:
- 👑 Administrador
- 👨‍💼 Profissional
- 👤 Cliente

## 💾 Armazenamento de Dados

### Online (Firebase)
- Dados principais armazenados no Firestore
- Sistema de autenticação Firebase

### Offline (AsyncStorage)
- Cache local para funcionamento offline
- Sincronização automática quando online
- Backup de dados importantes

## 🔄 Sincronização

O aplicativo possui um sistema robusto de sincronização:


```5:27:src/services/sync.ts
export const SyncService = {
  async syncOfflineData() {
    const isConnected = await NetInfo.fetch();
    
    if (!isConnected.isConnected) {
      return;
    }
    }
    const offlineActions = await AsyncStorage.getItem('@OfflineActions');
    if (offlineActions) {
      const actions = JSON.parse(offlineActions);
      
      for (const action of actions) {
        try {
          await this.processOfflineAction(action);
        } catch (error) {
          console.error('Error syncing offline action:', error);
        }
        }
      }
      await AsyncStorage.removeItem('@OfflineActions');
    }
  },
```


## 📊 Relatórios

Sistema completo de relatórios com métricas importantes:


```32:54:src/screens/reports/ReportsScreen.tsx
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Resumo Financeiro</Title>
          <Paragraph>Receita: R$ {report?.data.revenue.toFixed(2)}</Paragraph>
          <Paragraph>Despesas: R$ {report?.data.expenses.toFixed(2)}</Paragraph>
          <Paragraph>Lucro: R$ {report?.data.profit.toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Desempenho</Title>
          <Paragraph>Total de Atendimentos: {report?.data.totalAppointments}</Paragraph>
          <Paragraph>Satisfação dos Clientes: {report?.data.clientSatisfaction}%</Paragraph>
        </Card.Content>
      </Card>
      </Card>
      <Button mode="contained" onPress={loadReport} style={styles.button}>
        Atualizar Relatório
      </Button>
    </ScrollView>
```


## 👥 Gestão de Clientes

Interface intuitiva para gerenciamento de clientes:


```25:48:src/screens/clients/ClientFormScreen.tsx
  return (
    <View style={styles.container}>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <TextInput
        label="Telefone"
        value={phone}
        onChangeText={setPhone}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleSave}>
        Salvar
      </Button>
    </View>
```


## ⚙️ Configurações

Personalizações disponíveis:


```22:49:src/screens/settings/SettingsScreen.tsx
  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>Preferências</List.Subheader>
        <List.Item
          title="Notificações"
          right={() => <Switch value={notifications} onValueChange={toggleNotifications} />}
        />
        <List.Item
          title="Modo Escuro"
          right={() => <Switch value={darkMode} onValueChange={toggleDarkMode} />}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>Conta</List.Subheader>
        <List.Item
          title="Perfil"
          description={user?.email}
          left={props => <List.Icon {...props} icon="account" />}
        />
        <List.Item
          title="Alterar Senha"
          left={props => <List.Icon {...props} icon="key" />}
          onPress={() => {/* Implementar alteração de senha */ }}
        />
      </List.Section>
    </ScrollView>
```


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Link do Projeto: https://github.com/TkeziaAraujo/estetica-app
