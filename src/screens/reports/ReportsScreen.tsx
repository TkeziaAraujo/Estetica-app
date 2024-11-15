import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { ReportService } from '../../services/reports';
import { Report } from '../../types';
import { LoadingScreen } from '../../components/LoadingScreen';

export const ReportsScreen: React.FC = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {
      setLoading(true);
      const monthlyReport = await ReportService.getMonthlyReport(new Date());
      setReport(monthlyReport);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

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

      <Card style={styles.card}>
        <Card.Content>
          <Title>Desempenho</Title>
          <Paragraph>Total de Atendimentos: {report?.data.totalAppointments}</Paragraph>
          <Paragraph>Satisfação dos Clientes: {report?.data.clientSatisfaction}%</Paragraph>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={loadReport} style={styles.button}>
        Atualizar Relatório
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
}); 