import React, { useEffect, startTransition } from 'react';
import Highcharts from 'highcharts';
import { Link } from 'react-router-dom';
import './menu.css';

const ChartComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchChartData();
      renderCharts(response);
    };

    fetchData();
  }, []);

  const fetchChartData = async () => {
    // Simulação de uma chamada assíncrona para obter os dados do gráfico
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          chart1Data: [10, 8, 7, 4],
          chart2Data: [34.4, 27.58, 24.13, 13.79]
        });
      }, 1000); // Simular um atraso de 1 segundo
    });
  };

  const renderCharts = ({ chart1Data, chart2Data }) => {
    // Configuração do primeiro gráfico
    const chart1 = Highcharts.chart('container1', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Quantidade de Atletas Por Esporte'
      },
      xAxis: {
        categories: ['Futebol de 7', 'Basquete', 'Natação', 'Bocha']
      },
      yAxis: {
        title: {
          text: 'Quantidade'
        }
      },
      series: [{
        name: 'Modalidade',
        color: '#ED5600',
        data: chart1Data
      }]
    });

    // Configuração do segundo gráfico
    const chart2 = Highcharts.chart('container2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Taxa de adesão aos esportes'
      },
      xAxis: {
        categories: ['Futebol de 7', 'Basquete', 'Natação', 'Bocha']
      },
      yAxis: {
        title: {
          text: 'Taxa (%)'
        }
      },
      series: [{
        name: 'Modalidade',
        color: '#ED5600',
        data: chart2Data
      }]
    });
  };

  return (
    <div className="tela">
      <div className="menu">
        <div>
          <Link to="/menu" onClick={() => startTransition()}>
            <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" />
          </Link>
        </div>
        <div className="opcoes">
          <div className="novoitem">
            <br />
            <Link to="/cadastros" onClick={() => startTransition()}>
              Cadastrar Novo Item
            </Link>
          </div>
          <br />
          <div className="listagem">
            <br />Listagem de Atletas
          </div>
        </div>
      </div>

      <div className="indicadores">
        <div id="container1" style={{ width: '140vh', height: '45vh', border: '1px solid black', marginLeft: '10%', borderRadius: '15px' }}></div>
        <br />
        <div id="container2" style={{ width: '140vh', height: '45vh', border: '1px solid black', marginLeft: '10%', borderRadius: '15px' }}></div>
      </div>
    </div>
  );
};

export default ChartComponent;