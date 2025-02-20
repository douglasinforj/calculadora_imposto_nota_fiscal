function calcularIRRF(valor){
    if (valor <= 1903.98) return 0;
    else if (valor <= 2826.65) return (valor * 0.075) - 142.80;
    else if (valor <= 3751.05) return (valor * 0.15) - 354.80;
    else if (valor <= 4664.68) return (valor * 0.225) - 636.13;
    else return (valor * 0.275) - 869.36;
}

function calcularImposto() {
    let valor = parseFloat(document.getElementById("valor").value);
    let atividade = parseFloat(document.getElementById("atividade"). value)
    let regime = document.getElementById("regime").value;

    if (isNaN(valor) || valor <= 0) {
        document.getElementById("resultado").innerHTML = "Por favor, insira um valor valido."
        return;
    }

    let iss = (valor * atividade) / 100;
    let inss = 0;
    let irrf = 0;
    let pis = 0;          //Contribuição para auxílios trabalhistas tais como seguro desemprego e abono salarial
    let cofins = 0;      //Contribuição para Financiamento da Seguridade Social
    let csll = 0;       //Contribuição Social Sobre o Lucro Líquido

    if (regime === "lucro_presumido") {
        pis = (valor * 0.65) / 100;
        cofins = (valor * 3) / 100;
        csll = (valor * 1) / 100;
        irrf = (valor * 1.5) / 100;
    } else if (valor === "autonomo") {
        inss = (valor * 11) / 100;
        irrf = calcularIRRF(valor)
    }

    let totalImpostos = iss + inss + irrf + pis + cofins + csll
    let totalLiquido = valor - totalImpostos

    /*Inserindo resultados na tela*/
    document.getElementById("resultado").innerHTML = 
        `
        <p><strong>Impostos Retidos:</strong></p>
        <p>ISS: R$ ${iss.toFixed(2)}</p>
        <p>INSS: R$ ${inss.toFixed(2)}</p>
        <p>IRRF: R$ ${irrf.toFixed(2)}</p>
        <p>PIS: R$ ${pis.toFixed(2)}</p>
        <p>COFINS: R$ ${cofins.toFixed(2)}</p>
        <p>CSLL: R$ ${csll.toFixed(2)}</p>
        <p><strong>Total de Impostos:</strong> R$ ${totalImpostos.toFixed(2)}</p>
        <p><strong>Valor Líquido:</strong> R$ ${totalLiquido.toFixed(2)}</p>
        `
    return { valor, iss, inss, irrf, pis, cofins, csll, totalImpostos, totalLiquido}
}


//------------------------Gerar PDF----------------------------------

function gerarPDF() {
    let dados = calcularImposto();
    if (!dados) return;

    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Nota Fiscal de Serviço - RJ", 20, 20);
    doc.setFontSize(12);
    doc.text(`Valor do Serviço: R$ ${dados.valor.toFixed(2)}`, 20, 40);
    doc.text(`ISS: R$ ${dados.iss.toFixed(2)}`, 20, 50);
    doc.text(`INSS: R$ ${dados.inss.toFixed(2)}`, 20, 60);
    doc.text(`IRRF: R$ ${dados.irrf.toFixed(2)}`, 20, 70);
    doc.text(`PIS: R$ ${dados.pis.toFixed(2)}`, 20, 80);
    doc.text(`COFINS: R$ ${dados.cofins.toFixed(2)}`, 20, 90);
    doc.text(`CSLL: R$ ${dados.csll.toFixed(2)}`, 20, 100);
    doc.text(`Total de Impostos: R$ ${dados.totalImpostos.toFixed(2)}`, 20, 110);
    doc.text(`Valor Líquido: R$ ${dados.totalLiquido.toFixed(2)}`, 20, 120);

    doc.save("Nota_Fiscal_Servico.pdf");
}