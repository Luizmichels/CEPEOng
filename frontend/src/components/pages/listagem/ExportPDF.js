import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const ExportPDF = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 12,
      color: "#000",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    logo: {
      width: 80,
      height: 80,
      marginRight: 10,
    },
    container: {
      display: "flex",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 10,
    },
    column: {
      flex: 1,
      marginRight: 10,
    },
    photoContainer: {
      width: 100,
      height: 133,
      border: "2px solid #FF6700",
      marginBottom: 10,
    },
    label: {
      fontSize: 12,
      color: "#FF6700",
      marginBottom: 5,
    },
    value: {
      fontSize: 12,
      marginBottom: 5,
      backgroundColor: "#FF6700",
      color: "#fff",
      padding: 5,
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        {data.map((item, index) => (
          <View key={index} style={styles.container}>
            <View style={styles.header}>
              <Image
                src="/assets/img/cepe_joinville_laranja 2.png"
                style={styles.logo}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.photoContainer}>
                <Image
                  src={`http://localhost:5000/imagem/atleta/${item.FOTO_ATLETA}`}
                />
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Nome</Text>
                <Text style={styles.value}>{item.NM_PESSOA}</Text>
              </View>
              <View style={styles.column}>
                <View>
                  <Text style={styles.label}>Número Celular</Text>
                  <Text style={styles.value}>{item.NR_CELULAR}</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Sexo</Text>
                <Text style={styles.value}>{item.SEXO}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Data de Nascimento</Text>
                <Text style={styles.value}>{item.DT_NASCIMENTO}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Estado Civil</Text>
                <Text style={styles.value}>{item.ESTADO_CIVIL}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Equipamento de Locomoção</Text>
                <Text style={styles.value}>{item.EQUIPAMENTO_LOCOMOCAO}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Naturalidade</Text>
                <Text style={styles.value}>{item.NATURALIDADE}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Assistência</Text>
                <Text style={styles.value}>{item.ASSISTENCIA}</Text>
              </View>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>E-mail</Text>
              <Text style={styles.value}>{item.EMAIL}</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ExportPDF;
