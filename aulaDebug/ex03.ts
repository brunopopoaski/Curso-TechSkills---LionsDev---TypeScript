function buildInstallments(total: number, quantidade: number): number[] {
    
    if (!Number.isFinite(total) || !Number.isFinite(quantidade) || quantidade <= 0) {
        throw new Error("Informe total válido e quantidade maior que zero.");
    }

    const totalNormalizado = Math.round(total * 100);
    const valorBaseCentavos = Math.floor(totalNormalizado / quantidade);
    const resto = totalNormalizado % quantidade;
    const parcelas: number[] = [];

    for (let numero = 0; numero < quantidade; numero++) {
        const centavos = numero === quantidade - 1 ? valorBaseCentavos + resto : valorBaseCentavos;
        parcelas.push(centavos / 100);
    }

    return parcelas;
}

console.log("cenário 1", buildInstallments(100, 3));
console.log("cenário 2", buildInstallments(100, 4));
console.log("cenário 3", buildInstallments(101, 3));
console.log("cenário 4", buildInstallments(250, 5));