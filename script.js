document.addEventListener("DOMContentLoaded", function () {
    const gerarCodigoBtn = document.getElementById("gerarCodigo");
    const codigoGerado = document.getElementById("codigoGerado");
    const operadoras = document.querySelectorAll(".operadora");
    let operadoraSelecionada = null;
    const clickSound = document.getElementById("clickSound");

    operadoras.forEach(function (operadora) {
        operadora.addEventListener("click", function () {
            const corFundo = window.getComputedStyle(operadora).backgroundColor;
            gerarCodigoBtn.style.backgroundColor = corFundo;
            document.body.style.backgroundColor = corFundo;
            operadoraSelecionada = operadora.getAttribute("data-operadora");
            playClickSound();
        });
    });

    gerarCodigoBtn.addEventListener("click", function () {
        if (operadoraSelecionada === null) {
            codigoGerado.textContent = "Escolha a operadora";
        } else {
            const codigo = gerarCodigoUnico();
            codigoGerado.textContent = "Código de Recarga: " + codigo;
        }
        playClickSound();
    });

    function gerarCodigoUnico() {
        let codigo;
        do {
            codigo = gerarCodigo();
        } while (codigoJaGerado(codigo));
        return codigo;
    }

    function gerarCodigo() {
        const prefixosPorOperadora = {
            unitel: ["137", "815"],
            africell: ["642", "396"],
            bazza: ["364"],
            movicel: ["839", "621"]
        };

        const prefixo = prefixosPorOperadora[operadoraSelecionada];
        if (prefixo) {
            const sequenciaNumerica = gerarSequenciaNumerica(10); // 10 dígitos numéricos
            return prefixo[Math.floor(Math.random() * prefixo.length)] + sequenciaNumerica;
        }
    }

    function gerarSequenciaNumerica(comprimento) {
        let sequencia = "";
        for (let i = 0; i < comprimento; i++) {
            sequencia += Math.floor(Math.random() * 10);
        }
        return sequencia;
    }

    function codigoJaGerado(codigo) {
        // Verifique se o código já foi gerado anteriormente
        const codigosGerados = Array.from(document.querySelectorAll(".codigo-gerado"));
        return codigosGerados.some(function (element) {
            return element.textContent === codigo;
        });
    }

    function playClickSound() {
        clickSound.currentTime = 0;
        clickSound.play();
    }
});
