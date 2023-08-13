class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            "cafe": { descricao: "Café", valor: 3.00 },
            "chantily": { descricao: "Chantily (extra do Café)", valor: 1.50 },
            "suco": { descricao: "Suco Natural", valor: 6.20 },
            "sanduiche": { descricao: "Sanduíche", valor: 6.50 },
            "queijo": { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            "salgado": { descricao: "Salgado", valor: 7.25 },
            "combo1": { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            "combo2": { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };
        this.formasDePagamento = ["dinheiro", "debito", "credito"];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        const itemsArray = [];

        for (const itemStr of itens) {
            itemsArray.push(itemStr);
        }

        for (const itemStr of itens) {
            const parts = itemStr.split(',');
            const codigo = parts[0];
            const quantidade = parts[1];
            const itemInfo = this.cardapio[codigo];

            if (!itemInfo) {
                return "Item inválido!";
            }

            const valorItem = itemInfo.valor * quantidade;
            valorTotal += valorItem;

            if (codigo !== 'combo1' && codigo !== 'combo2') {
                if (codigo === 'chantily' && !this.hasItemPrincipal(itemsArray, 'cafe')) {
                    return "Item extra não pode ser pedido sem o principal";
                } else if (codigo === 'queijo' && !this.hasItemPrincipal(itemsArray, 'sanduiche')) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        if (metodoDePagamento === "dinheiro") {
            valorTotal *= 0.95; 
        } else if (metodoDePagamento === "credito") {
            valorTotal *= 1.03; 
        }

        if (valorTotal === 0) {
            return "Quantidade inválida!";
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }

    hasItemPrincipal(itemsArray, principal) {
        for (const item of itemsArray) {
            const [codigo] = item.split(',');
            if (codigo === principal) {
                return true;
            }
        }
        return false;
    }
}

export { CaixaDaLanchonete };
