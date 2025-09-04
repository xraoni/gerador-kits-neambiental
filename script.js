// Produtos iniciais baseados no Kit Start 1
const produtos = [
    {
        id: "NE001",
        nome: "Multiuso Citronela S-Capsula 40ml",
        descricao: "Limpador desinfetante de uso geral, indicado na limpeza e desinfeccao de superficies lavaveis, tais como, pisos, azulejos, loucas sanitarias, etc.",
        diluicoes: "1:250 (10 litros)",
        custoLitro: 2.50,
        preco: 25.00,
        imagem: "imagens/capsula-multiuso-citronela.png.png"
    },
    {
        id: "NE003",
        nome: "Neopan OXY-1 litro",
        descricao: "Produto destinado a limpeza de superficies extremamente sujas. O Neopan Oxy e um produto a base de terpenos e com o poder do oxigenio ativo para remocao de manchas sem fazer espuma. Limpador concentrado a base de oleos naturais para limpeza pesada, nao prejudicial a superficie aplicada e a saude.",
        diluicoes: "Manutencao 1:50",
        custoLitro: 0.88,
        preco: 45.00,
        imagem: "imagens/neopan-oxy.png"
    },
    {
        id: "NE005",
        nome: "Desengordurante SO-1 litro",
        descricao: "Produto inovador que apresenta baixa espumacao e substitui produtos alcalinos que devem ser aplicados a quente. Maxima performance na limpeza de superficies com alto teor de gorduras. Grelhas, pisos, paredes, azulejos, fornos, cozinhas, bancadas, ambientes de cozinha, etc.",
        diluicoes: "Manutencao 1:50",
        custoLitro: 0.70,
        preco: 35.00,
        imagem: "imagens/desengordurante-so.png"
    },
    {
        id: "NE006",
        nome: "Natural Laundry-1 litro",
        descricao: "Lava Roupas 2x1 - Lava roupas liquido 100% natural, que dispensa o uso de amaciantes. Pode ser utilizado tanto em ambiente profissional como domestico.",
        diluicoes: "40 ml para cada carga de 16kg de roupa",
        custoLitro: 0.16,
        preco: 65.00,
        imagem: "imagens/natural-laundry-2x1.png"
    },
    {
        id: "NE007",
        nome: "Enzilimp 3kg",
        descricao: "Composto por micro-organismos naturais beneficos. Que atuam na degradacao dos poluentes existentes nas aguas residuais geradas em instalacoes domesticas, sanitarias e industriais.",
        diluicoes: "Media 20g a cada 100 refeicoes",
        custoLitro: 3.00,
        preco: 450.00,
        imagem: "imagens/enzilimp-3kg.png"
    }
];

let kitAtual = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    atualizarVisualizacao();
    carregarListaKits();
});

// Carrega produtos no sidebar
function carregarProdutos() {
    const lista = document.getElementById('lista-produtos');
    lista.innerHTML = '';
    
    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <h4>${produto.nome}</h4>
            <p>${produto.descricao.substring(0, 60)}...</p>
            <div class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
        `;
        div.onclick = () => adicionarProduto(produto.id);
        lista.appendChild(div);
    });
}

// Filtra produtos
function filtrarProdutos() {
    const termo = document.getElementById('busca-produto').value.toLowerCase();
    const lista = document.getElementById('lista-produtos');
    lista.innerHTML = '';
    
    const filtrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.descricao.toLowerCase().includes(termo)
    );
    
    filtrados.forEach(produto => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <h4>${produto.nome}</h4>
            <p>${produto.descricao.substring(0, 60)}...</p>
            <div class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
        `;
        div.onclick = () => adicionarProduto(produto.id);
        lista.appendChild(div);
    });
}

// Adiciona produto ao kit
function adicionarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        const existente = kitAtual.find(p => p.id === id);
        if (existente) {
            existente.quantidade += 1;
        } else {
            kitAtual.push({...produto, quantidade: 1});
        }
        atualizarVisualizacao();
    }
}

// Remove produto do kit
function removerProdutoDoKit(index) {
    kitAtual.splice(index, 1);
    atualizarVisualizacao();
    fecharModal('modal-remover-produto');
}

// Atualiza a visualização do kit
function atualizarVisualizacao() {
    const tbody = document.getElementById('corpo-tabela');
    tbody.innerHTML = '';
    
    kitAtual.forEach((produto, index) => {
        const tr = document.createElement('tr');
        const total = produto.preco * produto.quantidade;
        
        tr.innerHTML = `
            <td><input type="number" value="${produto.quantidade}" min="1" onchange="atualizarQuantidade(${index}, this.value)" style="width:60px"></td>
            <td><img src="${produto.imagem}" alt="${produto.nome}" width="60"></td>
            <td>${produto.nome}<br><small>${produto.descricao}</small></td>
            <td>${produto.diluicoes}</td>
            <td>R$ ${produto.custoLitro.toFixed(2).replace('.', ',')}</td>
            <td>R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
            <td>R$ ${total.toFixed(2).replace('.', ',')}</td>
        `;
        tbody.appendChild(tr);
    });

    const total = kitAtual.reduce((sum, p) => sum + (p.preco * p.quantidade), 0);
    document.getElementById('valor-total').textContent = total.toFixed(2).replace('.', ',');

    const nomeKit = document.getElementById('nome-kit').value || 'START 1';
    document.getElementById('titulo-kit').textContent = nomeKit.toUpperCase();
}

// Exportar PDF
function exportarPDF() {
    const nomeKit = document.getElementById('nome-kit').value || 'KIT';
    const element = document.getElementById('conteudo-kit');
    
    const options = {
        margin: 10,
        filename: `Kit_${nomeKit.toUpperCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(options).from(element).save();
}

// Resetar kit
function resetarKit() {
    if (confirm('Deseja criar um novo kit? Todos os produtos serão removidos.')) {
        kitAtual = [];
        document.getElementById('nome-kit').value = 'Novo Kit';
        atualizarVisualizacao();
    }
}

// MODAIS
function abrirModalNovoProduto() {
    document.getElementById('modal-novo-produto').style.display = 'block';
}

function abrirModalRemoverProduto() {
    const lista = document.getElementById('lista-produtos-kit');
    lista.innerHTML = '';
    
    if (kitAtual.length === 0) {
        lista.innerHTML = '<p>Nenhum produto no kit.</p>';
        return;
    }
    
    kitAtual.forEach((produto, index) => {
        const div = document.createElement('div');
        div.className = 'produto-kit-item';
        div.innerHTML = `<strong>${produto.nome}</strong> (${produto.quantidade} un.)`;
        div.onclick = () => removerProdutoDoKit(index);
        lista.appendChild(div);
    });
    
    document.getElementById('modal-remover-produto').style.display = 'block';
}

function abrirModalRemoverKit(nome) {
    document.getElementById('kit-para-remover').textContent = nome;
    window.kitParaRemover = nome;
    document.getElementById('modal-remover-kit').style.display = 'block';
}

function fecharModal(id) {
    document.getElementById(id).style.display = 'none';
}

function confirmarRemocaoKit() {
    localStorage.removeItem(`kit_${window.kitParaRemover}`);
    fecharModal('modal-remover-kit');
    carregarListaKits();
    alert(`Kit "${window.kitParaRemover}" removido com sucesso!`);
}

// Adicionar novo produto
function adicionarNovoProduto(event) {
    event.preventDefault();
    
    const novoProduto = {
        id: "CUSTOM-" + Date.now(),
        nome: document.getElementById('nome-produto').value,
        descricao: document.getElementById('descricao-produto').value,
        diluicoes: document.getElementById('diluicoes-produto').value,
        custoLitro: parseFloat(document.getElementById('custo-litro').value),
        preco: parseFloat(document.getElementById('preco-produto').value),
        imagem: document.getElementById('imagem-produto').value || "https://via.placeholder.com/60?text=Produto"
    };
    
    kitAtual.push({...novoProduto, quantidade: 1});
    atualizarVisualizacao();
    fecharModal('modal-novo-produto');
    document.getElementById('form-novo-produto').reset();
    
    alert(`Produto "${novoProduto.nome}" adicionado com sucesso!`);
}

// Salvar e carregar kits
function salvarKit() {
    const nome = document.getElementById('nome-kit').value.trim();
    if (!nome) {
        alert('Por favor, insira um nome para o kit.');
        return;
    }
    
    const kitParaSalvar = {
        nome: nome,
        produtos: kitAtual,
        data: new Date().toISOString()
    };
    
    localStorage.setItem(`kit_${nome}`, JSON.stringify(kitParaSalvar));
    alert(`Kit "${nome}" salvo com sucesso!`);
    carregarListaKits();
}

function carregarListaKits() {
    const divLista = document.getElementById('lista-kits-salvos');
    divLista.innerHTML = '<strong>Salvos:</strong><br>';
    
    let encontrou = false;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('kit_')) {
            const nome = key.substring(4);
            const item = document.createElement('div');
            item.className = 'kit-item';
            item.innerHTML = `
                <span>${nome}</span>
                <div>
                    <button onclick="carregarKitSalvo('${nome}')" title="Usar">Usar</button>
                    <button onclick="abrirModalRemoverKit('${nome}')" title="Remover" style="background:#dc3545; color:white; padding:2px 4px;">X</button>
                </div>
            `;
            divLista.appendChild(item);
            encontrou = true;
        }
    }
    
    if (!encontrou) {
        divLista.innerHTML += '<em>Nenhum kit salvo</em>';
    }
}

function carregarKitSalvo(nome) {
    const kitSalvo = localStorage.getItem(`kit_${nome}`);
    if (kitSalvo) {
        const dados = JSON.parse(kitSalvo);
        kitAtual = dados.produtos;
        document.getElementById('nome-kit').value = dados.nome;
        atualizarVisualizacao();
        alert(`Kit "${dados.nome}" carregado com sucesso!`);
    }
}

// Atualizar quantidade
function atualizarQuantidade(index, valor) {
    kitAtual[index].quantidade = parseInt(valor) || 1;
    atualizarVisualizacao();
}

// Fechar modais ao clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Atualizar título do kit
document.getElementById('nome-kit').addEventListener('input', function() {
    document.getElementById('titulo-kit').textContent = this.value.toUpperCase();

});
