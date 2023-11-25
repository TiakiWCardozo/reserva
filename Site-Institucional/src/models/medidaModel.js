var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function redeMedidasEmTempoReal() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select fkMaquina, bytesRecebido, bytesEnviado, DATE_FORMAT(dtHora, '%d/%m/%Y %H:%i:%s') as momento_grafico from dadosComponente;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select fkMaquina, bytesRecebido, bytesEnviado, DATE_FORMAT(dtHora, '%d/%m/%Y %H:%i:%s') as momento_grafico from dadosComponente;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function obter_dados_rede() {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT hostName, avg(bytesRecebido) AS medBytesRecebido, avg(bytesEnviado) AS medBytesEnviado FROM dadosComponente join maquina on idMaquina = fkMaquina GROUP BY hostName;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT hostName, avg(bytesRecebido) AS medBytesRecebido, avg(bytesEnviado) AS medBytesEnviado FROM dadosComponente join maquina on idMaquina = fkMaquina GROUP BY hostName;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosDisco() {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT hostName, avg(usoAtualDisco) AS medUsoAtualDisco, avg(usoDisponivelDisco) AS medUsoDisponivelDisco FROM dadosComponente join maquina on idMaquina = fkMaquina GROUP BY hostName;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT hostName, avg(usoAtualDisco) AS medUsoAtualDisco, avg(usoDisponivelDisco) AS medUsoDisponivelDisco FROM dadosComponente join maquina on idMaquina = fkMaquina GROUP BY hostName;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosCPU() {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT hostName, avg(qtdUsoCpu) AS medUsoAtualCpu FROM dadosComponente join maquina on idMaquina = fkMaquina GROUP BY hostName;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT hostName, avg(qtdUsoCpu) AS medUsoAtualCpu FROM dadosComponente join maquina on idMaquina = fkMaquina GROUP BY hostName;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function obterDadosRAM() {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT hostName, avg(memoriaEmUso) AS medMemoriaEmUso, avg(memoriaDisponivel) AS medMemoriaDisponivel FROM dadosComponente join maquina on idMaquina = fkMaquina GROUP BY hostName;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT hostName, avg(memoriaEmUso) AS medMemoriaEmUso, avg(memoriaDisponivel) AS medMemoriaDisponivel FROM dadosComponente join maquina on idMaquina = fkMaquina GROUP BY hostName;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterNomeAme(IdUserVar) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select nomeAme from usuario join AME on idAme = fkAme where idUsuario = ${IdUserVar};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select nomeAme from usuario join AME on idAme = fkAme where idUsuario = ${IdUserVar};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterIdMaquina() {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select idMaquina from maquina;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select idMaquina from maquina;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cardAlertasCPU() {
    console.log ("Entrando no cardAlertasCPU.Model")

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT nomeTipoComp, maximo, medio from parametro JOIN tipoComponente ON idTipoComp = fkTipoComponente where fkTipoComponente = 1;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT nomeTipoComp, maximo, medio from parametro JOIN tipoComponente ON idTipoComp = fkTipoComponente where fkTipoComponente = 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cardAlertasRAM() {
    console.log ("Entrando no cardAlertasRAM.Model")

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT nomeTipoComp, maximo, medio from parametro JOIN tipoComponente ON idTipoComp = fkTipoComponente where fkTipoComponente = 2;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT nomeTipoComp, maximo, medio from parametro JOIN tipoComponente ON idTipoComp = fkTipoComponente where fkTipoComponente = 2;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cardAlertasDISCO() {
    console.log ("Entrando no cardAlertasDISCO.Model")

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT nomeTipoComp, maximo, medio from parametro JOIN tipoComponente ON idTipoComp = fkTipoComponente where fkTipoComponente = 3;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT nomeTipoComp, maximo, medio from parametro JOIN tipoComponente ON idTipoComp = fkTipoComponente where fkTipoComponente = 3;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cardAlertasREDE() {
    console.log ("Entrando no cardAlertasREDE.Model")

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT nomeTipoComp, maximo, medio from parametro JOIN tipoComponente ON idTipoComp = fkTipoComponente where fkTipoComponente = 4;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT nomeTipoComp, maximo, medio from parametro JOIN tipoComponente ON idTipoComp = fkTipoComponente where fkTipoComponente = 4;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function listaAlerta(componente, maximo, medio) {
    console.log("ACESSEI O ALERTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", maximo, medio);

    const verificarExistencia = `SELECT COUNT(*) as count FROM parametro WHERE fkTipoComponente = ${componente};`;
    
    try {
        const resultado = await database.executar(verificarExistencia);
        const count = resultado[0].count;

        if (count > 0) {
            throw new Error("Já existe uma entrada com a mesma fkTipoComponente. Restrição violada.");  
        }
        const instrucao = `
            INSERT INTO parametro (fkTipoComponente, maximo, medio, fkPermissaoParametro) 
            VALUES ('${componente}', '${maximo}', '${medio}', '1');`;

        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    } catch (erro) {
        console.error("Erro ao cadastrar alerta:", erro.message);
        throw erro;
    }
}


module.exports = {
    buscarUltimasMedidas,
    redeMedidasEmTempoReal,
    obter_dados_rede,
    obterDadosDisco,
    obterDadosCPU,
    obterDadosRAM,
    obterIdMaquina,
    obterNomeAme,
    obterIdMaquina,
    cardAlertasCPU,
    cardAlertasRAM,
    cardAlertasDISCO,
    cardAlertasREDE
}