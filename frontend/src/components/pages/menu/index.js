import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Button } from "reactstrap";
import { getToken } from "../../../utlis";
import CountUp from "react-countup";
import api from "../../../utlis/api"; // ajuste o caminho conforme necessário
import "./menu.scss";

const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [totalAssociados, setTotalAssociados] = useState(0);
  const navigate = useNavigate();

  const handleNavigate = () => {
    const token = getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.nivelAcesso === 3) {
        navigate("/cadastros");
      }
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchTotalAssociados = async () => {
      try {
        const response = await api.get('/associado/totalAssociados');
        setTotalAssociados(parseInt(response.data.totalAssociados, 10));
      } catch (error) {
        console.error('Erro ao buscar total de associados:', error);
      }
    };

    const fetchModalidades = async () => {
      try {
        const response = await api.get('/associado/modalidades');
        setChartData(response.data); // Garante que seja um array
      } catch (error) {
        console.error('Erro ao buscar modalidades:', error);
        setChartData([]); // Define como array vazio em caso de erro
      }
    };

    fetchTotalAssociados();
    fetchModalidades();
  }, []);

  useEffect(() => {
    document.body.classList.add("pagina-menu-body");
    return () => {
      document.body.classList.remove("pagina-menu-body");
    };
  }, []);

  const chart1Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Quantidade de Atletas Por Esporte",
    },
    xAxis: {
      categories: chartData.map(item => item.NM_MODALIDADE),
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
        data: chartData.map(item => parseInt(item.TOTAL, 10)),
        dataLabels: {
          enabled: true,
          color: "#000000",
          style: {
            fontWeight: 'bold',
            fontSize: '14px',
          }
        }
      },
    ],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        }
      }
    },
    tooltip: {
      style: {
        fontSize: '16px'
      }
    }
  };

  return (
    <div className="tela pagina-menu">
      <div className="menu">
        <div>
          <img src="/assets/img/cepe_joinville_laranja 2.png" alt="logo" />
        </div>
        <div className="opcoes">
          <Button color="default" className="text-button novoitem" onClick={handleNavigate}>
            Cadastrar Novo Item
          </Button>
          <Button color="default" className="text-button listagem" onClick={() => navigate("/listagem ")}>
            Listagem de Atletas
          </Button>
        </div>
        <div className="logout-button">
          <Button color="default" className="text-button sair" onClick={handleLogout}>
            Sair
          </Button>
          <Button color="default" className="text-button alterar-senha" onClick={() => navigate("/alterar-senha")}>
            Alterar senha
          </Button>
        </div>
      </div>

      <div className="indicadores">
        <div className="contador">
          <h2>Total de Associados</h2>
          <CountUp start={0} end={totalAssociados} duration={5} />
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chart1Options}
          containerProps={{
            style: {
              width: "60vw",
              height: "50vh",
              border: "1px solid black",
              margin: "20px auto",
              borderRadius: "15px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartComponent;
