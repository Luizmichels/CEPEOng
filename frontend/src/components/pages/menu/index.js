import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './menu.css';
import './menu.css';

const ChartComponent = () => {
  useEffect(() => {
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
        data: [10, 8, 7, 4]
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
        data: [34.4, 27.58, 24.13, 13.79]
      }]
    });

    return () => {
      chart1.destroy();
      chart2.destroy();
    };
  }, []);

  return (
    <div className="tela">
      <div className="menu">
        <div>
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" />
        </div>
        <div className="opcoes">
          <div className="novoitem">
            <br />
            <a href="../html/cadastros_geral.html">Cadastrar Novo Item</a>
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
