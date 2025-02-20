function calcularIRRF(valor){
    if (valor <= 1903.98) return 0;
    else if (valor <= 2826.65) return (valor * 0.075) - 142.80;
    else if (valor <= 3751.05) return (valor * 0.15) - 354.80;
    else if (valor <= 4664.68) return (valor * 0.225) - 636.13;
    else return (valor * 0.275) - 869.36;
}