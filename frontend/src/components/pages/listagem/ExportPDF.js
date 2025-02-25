import { useEffect } from "react";
import jsPDF from "jspdf";

const ExportPDF = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      const doc = new jsPDF();

      data.forEach((item, index) => {
        if (index !== 0) doc.addPage();

        // Adiciona a imagem do logo no canto superior esquerdo
        const cepeLogo = "/assets/img/cepe_joinville_laranja 2.png"; // Caminho atualizado para a imagem do logo
        doc.addImage(cepeLogo, "PNG", 5, 5, 20, 20); // Ajuste a posição e o tamanho da imagem

        // Adiciona a imagem do atleta ou retângulo de "Imagem"
        if (item.FOTO_ATLETA) {
          const imagePath = `http://localhost:5000/imagem/atleta/${item.FOTO_ATLETA}`;
          doc.addImage(imagePath, "PNG", 5, 35, 35, 45);
        } else {
          // Desenha um retângulo vazio com "Imagem" dentro se não houver imagem
          doc.setFillColor(255, 102, 0); // Cor de fundo laranja
          doc.rect(20, 40, 50, 50, "F");
          doc.setTextColor(255, 255, 255); // Cor do texto branco
          doc.text("Imagem", 35, 65);
        }
        // Diminuir o tamanho da letra
        doc.setFontSize(12); // Ajuste o tamanho conforme necessário

        const paddingLeft = 2; // Ajuste a distância desejada da borda esquerda
        const rectHeight = 8; // Altura do roundedRect
        const textSize = doc.getTextDimensions(`${item.NM_PESSOA}`).h; // Tamanho da altura do texto
        const verticalPadding = (rectHeight - textSize) / 2; // Espaçamento para centralização vertical

        // Configurar o texto e o retângulo
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Nome", 44, 38);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(44, 40, 120, rectHeight, 3, 3, "F");
        // Posicionar o texto centralizado verticalmente
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NM_PESSOA}`,
          44 + paddingLeft,
          40 + verticalPadding + textSize
        );

        // Sexo
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Sexo", 165, 38);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(165, 40, 40, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.SEXO}`,
          165 + paddingLeft,
          40 + verticalPadding + textSize
        );

        // Número Celular
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Número Celular", 44, 55);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(44, 57, 35, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NR_CELULAR}`,
          44 + paddingLeft,
          57 + verticalPadding + textSize
        );

        // Data de Nascimento
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Data de Nascimento", 80, 55);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(80, 57, 40, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.DT_NASCIMENTO}`,
          80 + paddingLeft,
          57 + verticalPadding + textSize
        );

        // Estado Civil
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Estado Civil", 121, 55);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(121, 57, 33, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.ESTADO_CIVIL}`,
          121 + paddingLeft,
          57 + verticalPadding + textSize
        );

        // Função
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Função", 155, 55);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(155, 57, 50, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.CLASSIF_FUNC}`,
          155 + paddingLeft,
          57 + verticalPadding + textSize
        );

        // Naturalidade
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Naturalidade", 44, 70);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(44, 72, 50, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NATURALIDADE}`,
          44 + paddingLeft,
          72 + verticalPadding + textSize
        );

        // Equipamento de Locomoção
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Meio de Locomoção", 95, 70);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(95, 72, 79, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.MEIO_LOCOMOCAO}`,
          95 + paddingLeft,
          72 + verticalPadding + textSize
        );

        // Assistência
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Assistência", 175, 70);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(175, 72, 30, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.ASSISTENCIA}`,
          175 + paddingLeft,
          72 + verticalPadding + textSize
        );

        // Email
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Email", 5, 85);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 87, 90, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.EMAIL}`,
          5 + paddingLeft,
          87 + verticalPadding + textSize
        );

        // Número Telefone
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Número Telefone", 96, 85);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(96, 87, 40, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NR_TELEFONE}`,
          96 + paddingLeft,
          87 + verticalPadding + textSize
        );

        // Equipamento de Locomoção
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Equipamento de Locomoção", 137, 85);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(137, 87, 69, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NM_MEIO_LOCOMOCAO}`,
          137 + paddingLeft,
          87 + verticalPadding + textSize
        );

        // Deficiência
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Deficiência", 5, 100);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 102, 100, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.deficiencia}`,
          5 + paddingLeft,
          102 + verticalPadding + textSize
        );

        // Peso
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Peso Kg", 106, 100);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(106, 102, 30, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.PESO}`,
          106 + paddingLeft,
          102 + verticalPadding + textSize
        );

        // Altura
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Altura", 137, 100);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(137, 102, 30, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.ALTURA}`,
          137 + paddingLeft,
          102 + verticalPadding + textSize
        );

        // Grupo Sanguíneo
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Grupo Sanguíneo", 168, 100);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(168, 102, 38, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.GP_SANGUE}`,
          168 + paddingLeft,
          102 + verticalPadding + textSize
        );

        // Renda
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Renda", 5, 115);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 117, 50, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.RENDA}`,
          5 + paddingLeft,
          117 + verticalPadding + textSize
        );

        //Escolaridade
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Escolaridade", 56, 115);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(56, 117, 35, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.ESCOLARIDADE}`,
          56 + paddingLeft,
          117 + verticalPadding + textSize
        );

        //instituição
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Instituição", 92, 115);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(92, 117, 79, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.INSTITUICAO}`,
          92 + paddingLeft,
          117 + verticalPadding + textSize
        );

        // Telefone escola
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Telefone escola", 172, 115);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(172, 117, 34, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.TELEFONE_ESCOLA}`,
          172 + paddingLeft,
          117 + verticalPadding + textSize
        );

        // CPF
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("CPF", 5, 130);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 132, 33, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.CPF}`,
          5 + paddingLeft,
          132 + verticalPadding + textSize
        );

        // RG
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("RG", 39, 130);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(39, 132, 28, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.RG}`,
          39 + paddingLeft,
          132 + verticalPadding + textSize
        );

        // UF RG
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("UF RG", 68, 130);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(68, 132, 16, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.UF_RG}`,
          68 + paddingLeft,
          132 + verticalPadding + textSize
        );

        //Data Emissão RG
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Data Emissão RG", 85, 130);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(85, 132, 37, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.DT_EMISSAO_RG}`,
          85 + paddingLeft,
          132 + verticalPadding + textSize
        );

        // Número Passaporte
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Passaporte", 123, 130);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(123, 132, 41, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NR_PASSAPORTE}`,
          123 + paddingLeft,
          132 + verticalPadding + textSize
        );

        // CEP
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("CEP", 165, 130);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(165, 132, 40, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.CEP}`,
          165 + paddingLeft,
          132 + verticalPadding + textSize
        );

        // Endereço
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Endereço", 5, 145);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 147, 100, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.ENDERECO}`,
          5 + paddingLeft,
          147 + verticalPadding + textSize
        );

        // Descrição Endereço
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Descrição Endereço", 106, 145);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(106, 147, 100, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.DS_ENDERECO}`,
          106 + paddingLeft,
          147 + verticalPadding + textSize
        );

        // Número Endereço
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Número", 5, 160);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 162, 25, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NR_ENDERECO}`,
          5 + paddingLeft,
          162 + verticalPadding + textSize
        );

        // Modalidade
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Modalidade", 31, 160);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(31, 162, 40, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.modalidade}`,
          31 + paddingLeft,
          162 + verticalPadding + textSize
        );

        // Classificação Funcional
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Classificação Funcional", 72, 160);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(72, 162, 75, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.CLASSIF_FUNC}`,
          72 + paddingLeft,
          162 + verticalPadding + textSize
        );

        // Prova
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Prova", 148, 160);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(148, 162, 58, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.PROVA}`,
          148 + paddingLeft,
          162 + verticalPadding + textSize
        );

        // Tamanho Camisa
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Tamanho Camisa", 5, 175);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 177, 45, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.TAMANHO_CAMISA}`,
          5 + paddingLeft,
          177 + verticalPadding + textSize
        );

        // Tamanho Agasalho
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Tamanho Agasalho", 52, 175);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(52, 177, 45, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.TAMANHO_AGASALHO}`,
          52 + paddingLeft,
          177 + verticalPadding + textSize
        );

        // Tamanho Bermuda/Calça
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Tamanho Bermuda/Calça", 99, 175);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(99, 177, 55, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.TAMANHO_BERM_CAL}`,
          99 + paddingLeft,
          177 + verticalPadding + textSize
        );

        // Número Calçado
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Número Calçado", 156, 175);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(156, 177, 50, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NR_CALCADO}`,
          156 + paddingLeft,
          177 + verticalPadding + textSize
        );

        // Nome do Pai
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Nome do Pai", 5, 190);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 192, 120, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NM_PAI}`,
          5 + paddingLeft,
          192 + verticalPadding + textSize
        );

        // Número Celular do Pai
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Número Pai", 128, 190);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(128, 192, 79, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.CELULAR_PAI}`,
          128 + paddingLeft,
          192 + verticalPadding + textSize
        );

        // Nome da Mãe
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Nome da Mãe", 5, 205);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 207, 120, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NM_MAE}`,
          5 + paddingLeft,
          207 + verticalPadding + textSize
        );

        // Número Celular da Mãe
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Número Mãe", 128, 205);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(128, 207, 79, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.CELULAR_MAE}`,
          128 + paddingLeft,
          207 + verticalPadding + textSize
        );

        // Email Responsável
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Email do Responsável", 5, 220);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 222, 90, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.EMAIL_RESPONS}`,
          5 + paddingLeft,
          222 + verticalPadding + textSize
        );

        // Naturalidade do Responsável
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Naturalidade do Responsável", 96, 220);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(96, 222, 60, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NATURALIDADE_RESPONS}`,
          96 + paddingLeft,
          222 + verticalPadding + textSize
        );

        // CPF Responsável
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("CPF Responsável", 157, 220);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(157, 222, 50, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.CPF_RESPONS}`,
          157 + paddingLeft,
          222 + verticalPadding + textSize
        );

        // RG Responsável
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("RG Responsável", 5, 235);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(5, 237, 40, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.RG_RESPONS}`,
          5 + paddingLeft,
          237 + verticalPadding + textSize
        );

        // UF RG Responsável
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("UF RG Responsável", 46, 235);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(46, 237, 40, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.UF_RG_RESPONS}`,
          46 + paddingLeft,
          237 + verticalPadding + textSize
        );

        // Data Emissão RG Responsável
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Data Emissão RG", 87, 235);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(87, 237, 40, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.DT_EMISSAO_RG_RESPONS}`,
          87 + paddingLeft,
          237 + verticalPadding + textSize
        );

        // Número passaporte Responsável
        doc.setTextColor(0, 0, 0); // Preto
        doc.text("Número Passaporte Responsável", 128, 235);
        doc.setFillColor(255, 102, 0);
        doc.roundedRect(128, 237, 79, rectHeight, 3, 3, "F");
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${item.NR_PASSAPORTE_RESPONS}`,
          128 + paddingLeft,
          237 + verticalPadding + textSize
        );

        // Segunda Página - Imagem do CPF
        doc.addPage();

        const cepeLogo2 = "/assets/img/cepe_joinville_laranja 2.png"; // Caminho atualizado para a imagem do logo
        doc.addImage(cepeLogo2, "PNG", 5, 5, 20, 20); // Ajuste a posição e o tamanho da imagem

        doc.setTextColor(0, 0, 0); // Preto
        doc.text(`Associado: ${item.NM_PESSOA}`,30, 18);

        const rg = `http://localhost:5000/imagem/rg/${item.FOTO_RG}`;
        doc.addImage(rg, "PNG", 10, 35, 192, 120);

        if (item.FOTO_RG_RESPONS) {
          const resp = `http://localhost:5000/imagem/resp/${item.FOTO_RG_RESPONS}`;
          doc.addImage(resp, "PNG", 10, 160, 192, 120);
        }
      });

      doc.save("Associado_Dados.pdf");
    }
  }, [data]);

  return null;
};

export default ExportPDF;
