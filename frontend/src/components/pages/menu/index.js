import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import { Button } from "reactstrap";
import { getToken } from "../../../utlis";
import "./menu.scss";

const ChartComponent = ({ nivel }) => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    const token = getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.nivelAcesso === 3) {
        navigate("/cadastros");
      } else if (decodedToken.nivelAcesso === 2) {
        navigate("/cadastro");
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchChartData();
      renderCharts(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.classList.add("pagina-menu-body");
    return () => {
      document.body.classList.remove("pagina-menu-body");
    };
  }, []);

  const fetchChartData = async () => {
    // Simulação de uma chamada assíncrona para obter os dados do gráfico
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          chart1Data: [10, 8, 7, 4],
          chart2Data: [34.4, 27.58, 24.13, 13.79],
        });
      }, 1000); // Simular um atraso de 1 segundo
    });
  };

  const renderCharts = ({ chart1Data, chart2Data }) => {
    // Configuração do primeiro gráfico
    Highcharts.chart("container1", {
      chart: {
        type: "column",
      },
      title: {
        text: "Quantidade de Atletas Por Esporte",
      },
      xAxis: {
        categories: ["Futebol de 7", "Basquete", "Natação", "Bocha"],
      },
      yAxis: {
        title: {
          text: "Quantidade",
        },
      },
      series: [
        {
          name: "Modalidade",
          color: "#ED5600",
          data: chart1Data,
        },
      ],
    });

    // Configuração do segundo gráfico
    Highcharts.chart("container2", {
      chart: {
        type: "column",
      },
      title: {
        text: "Taxa de adesão aos esportes",
      },
      xAxis: {
        categories: ["Futebol de 7", "Basquete", "Natação", "Bocha"],
      },
      yAxis: {
        title: {
          text: "Taxa (%)",
        },
      },
      series: [
        {
          name: "Modalidade",
          color: "#ED5600",
          data: chart2Data,
        },
      ],
    });
  };

  return (
    <div className="tela pagina-menu">
      <div className="menu">
        <div>
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" />
        </div>
        <div className="opcoes">
            <Button className="text-button novoitem" onClick={handleNavigate}>
              Cadastrar Novo Item
            </Button>
            <Button className="text-button listagem" onClick={() => navigate("/listagem ")}
            >
              Listagem de Atletas
            </Button>
        </div>
      </div>

      <div className="indicadores">
        <div
          id="container1"
          style={{
            width: "140vh",
            height: "45vh",
            border: "1px solid black",
            marginLeft: "10%",
            borderRadius: "15px",
          }}
        ></div>
        <br />
        <div
          id="container2"
          style={{
            width: "140vh",
            height: "45vh",
            border: "1px solid black",
            marginLeft: "10%",
            borderRadius: "15px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ChartComponent;
