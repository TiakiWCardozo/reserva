function cadastrar() {
    var nomeVar = input_Nome_Completo.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var confirmarSenhaVar = input_confirmar_senha.value;
    var tokenAME = input_token_cadastro.value;

    validar();

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmarSenhaVar == "" || tokenAME == "") {
        alert("Preencha todos os campos!");
        return false;
    } else if (nomeVar.length < 3) {
        alert('Seu nome tem que ter no mínimo 3 letras!!!')
        return false;
    } else if (emailVar.indexOf("@farmacos.com") == -1) {
        alert(`Email cadastrado é invalido!! Para cadastrar é preciso que o email tenha @farmacos.com`)
        return false;
    } else if (senhaVar != confirmarSenhaVar) {
        alert(`Os campos de senha e confirmar senha estão diferentes`)
        return false;
    }
    else {
        fetch("/usuario/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                tokenServer: tokenAME,

            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert ("Cadastro realizado com sucesso! Redirecionando para a tela de login ...")
                setTimeout(() => {
                    window.location = "login.html";
                }, "2000")

            } else {
                alert("Erro ao cadastrar")
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        return false;
        //

    }
};

function validar() {
    console.log("EXECUTANDO FUNÇÃO VALIDAR()");
    var tokenAME = input_token_cadastro.value;

    console.log("FORM TOKEN: ", tokenAME);

    fetch("/usuario/validar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tokenServer: tokenAME,
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO validar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.TOKEN_AME = json.idAme
            });

        } else {
            alert("Token inválido!!!!!")
            console.log("Houve um erro ao tentar realizar a validação!");
            console.log("Token inválido!");
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
function editarNoc() {
    var nomeVar = input_Nome_Completo.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var confirmarSenhaVar = input_confirmar_senha.value;
    var IdUserVar = sessionStorage.ID_USUARIO;
    console.log(sessionStorage.ID_USUARIO);

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmarSenhaVar == "") {
        alert("Preencha todos os campos!");
        return false;
    } else if (nomeVar.length < 3) {
        alert('Seu nome tem que ter no mínimo 3 letras!!!')
        return false;
    } else if (emailVar.indexOf("@farmacos.com") == -1) {
        alert(`Email cadastrado é invalido!! Para cadastrar é preciso que o email tenha @farmacos.com`)
        return false;
    } else if (senhaVar != confirmarSenhaVar) {
        alert(`Os campos de senha e confirmar senha estão diferentes`)
        return false;
    }
    else {
        fetch("/usuario/editarNoc", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                idUserServer: IdUserVar,
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                setTimeout(() => {
                    window.location = "../login.html";
                }, "2000")

            } else {
                alert("Erro ao cadastrar")
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        return false;
    }
}function deletar() {
    var IdUserVar = sessionStorage.ID_USUARIO;
    console.log(sessionStorage.ID_USUARIO);
    // Usando confirm para pedir confirmação
    var confirmacao = confirm("Tem certeza que deseja deletar sua conta?");

    if (!confirmacao) {
        // Se o usuário cancelar, retorne sem fazer nada
        return false;
    }

    // Restante do código para deletar a conta
    fetch("/usuario/deletar", {
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUserServer: IdUserVar,
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            setTimeout(() => {
                window.location = "../login.html";
            }, "2000");
        } else {
            alert("Erro ao deletar");
            throw ("Houve um erro ao tentar excluir a conta!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}