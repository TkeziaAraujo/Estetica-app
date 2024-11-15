import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Transaction } from '../../types';

export const FinancialScreen: React.FC = () => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const calculateBalance = () => {
    return transactions.reduce((acc, curr) => {
      return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.balanceCard}>
        <Card.Content>
          <Title>Saldo Total</Title>
          <Paragraph>R$ {calculateBalance().toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>
      {/* Lista de transações */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    marginBottom: 16,
  },
}); 