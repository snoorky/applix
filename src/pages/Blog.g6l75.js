import wixData from 'wix-data';
import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {
    if (wixWindowFrontend.formFactor === "Mobile") {
        $w("#dropdown1").show();
        $w('#btnAtendimento').collapse();
        $w('#btnCRM').collapse();
        $w('#btnComprasRecebimentos').collapse();
        $w('#btnEstoques').collapse();
        $w('#btnFaturamento').collapse();
        $w('#btnFinancas').collapse();
        $w('#btnFiscal').collapse();
        $w('#btnGestao').collapse();
        $w('#btnGestaoPessoas').collapse();
        $w('#btnGestaoProjetos').collapse();
        $w('#btnLojasTintas').collapse();
        $w('#btnPrimeirosPassos').collapse();
        $w('#btnProducao').collapse();
        $w('#btnTutoriais').collapse();
        $w('#btnVendas').collapse();
        $w('#btnVideos').collapse();
    } else {
        $w('#dropdown1').hide();
    }

    $w("#inputSearch").onInput((event) => {
        const searchText = event.target.value.toLowerCase().trim();
        filterResults(searchText);
    });

    const buttons = [
        { id: "btnAtendimento", category: "Atendimento" },
        { id: "btnCRM", category: "CRM" },
        { id: "btnComprasRecebimentos", category: "Compras e Recebimento" },
        { id: "btnEstoques", category: "Estoques" },
        { id: "btnFaturamento", category: "Faturamento" },
        { id: "btnFinancas", category: "Finanças" },
        { id: "btnFiscal", category: "Fiscal" },
        { id: "btnGestao", category: "Gestão" },
        { id: "btnGestaoPessoas", category: "Gestão de Pessoas" },
        { id: "btnGestaoProjetos", category: "Gestão de Projetos" },
        { id: "btnLojasTintas", category: "Lojas de Tintas" },
        { id: "btnPrimeirosPassos", category: "Primeiros Passos" },
        { id: "btnProducao", category: "Produção" },
        { id: "btnTutoriais", category: "Tutoriais" },
        { id: "btnVendas", category: "Vendas" },
        { id: "btnVideos", category: "Vídeos" }
    ];

    buttons.forEach(button => {
        const btnElement = $w(`#${button.id}`);
        btnElement.onClick(() => {
            setButtonActive(button.id);
            filterCategory(button.category);
        });
    });

    function setButtonActive(buttonId) {
        buttons.forEach(button => {
            const btnElement = $w(`#${button.id}`);
            if (button.id === buttonId) {
                btnElement.style.backgroundColor = "#00102B";
                btnElement.style.color = "#FFFFFF";
            } else {
                btnElement.style.backgroundColor = "#FFFFFF";
                btnElement.style.color = "#00102B";
            }
        });
    }

    const dropdownOptions = [
        { label: "Todos Artigos", value: "Todos Artigos" },
        { label: "Primeiros Passos", value: "Primeiros Passos" },
        { label: "Finanças", value: "Finanças" },
        { label: "Lojas de Tintas", value: "Lojas de Tintas" },
        { label: "Vendas", value: "Vendas" },
        { label: "Estoques", value: "Estoques" },
        { label: "Gestão de Projetos", value: "Gestão de Projetos" },
        { label: "Faturamento", value: "Faturamento" },
        { label: "Vídeos", value: "Vídeos" },
        { label: "Fiscal", value: "Fiscal" },
        { label: "Produção", value: "Produção" },
        { label: "CRM", value: "CRM" },
        { label: "Compras e Recebimento", value: "Compras e Recebimento" },
        { label: "Atendimento", value: "Atendimento" },
        { label: "Gestão", value: "Gestão" },
        { label: "Tutoriais", value: "Tutoriais" },
        { label: "Gestão de Pessoas", value: "Gestão de Pessoas" }
    ];

    $w("#dropdown1").options = dropdownOptions;
    $w("#dropdown1").onChange((event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === "Todos Artigos") {
            $w("#dataset1").setFilter(wixData.filter());
            $w("#dataset1").refresh();
        } else {
            filterCategory(selectedCategory);
        }
    });

    $w("#repeater4").onItemReady(($item, itemData) => {
        $item("#imagemBlog").src = itemData.imagem;
        $item("#tituloBlog").text = itemData.titulo;
        const nodes = itemData.conteudo ? itemData.conteudo.nodes : [];
        let conteudo = "";
        nodes.forEach(node => {
            if (node.type === "PARAGRAPH") {
                node.nodes.forEach(subNode => {
                    if (subNode.type === "TEXT") {
                        conteudo += subNode.textData.text;
                    }
                });
            }
        });
        conteudo = conteudo.substring(0, 190) + "...";
        $item("#descritivoBlog").html = `<div id="comp-ltq6m8133__50780342-7e04-4e57-acec-20c2df2dba98" class="wWvZUh" style="--height: 120px; font-size: 14px; color: #404C60;">
            <div id="text-content-comp-ltq6m8133__50780342-7e04-4e57-acec-20c2df2dba98" data-scope="comp-ltqhfl1t__50780342-7e04-4e57-acec-20c2df2dba98" data-repeater-items-indexes="0" class="c9GqVL QxJLC3 comp-ltq6m8133 wixui-rich-text" data-testid="richTextElement">
            ${conteudo}</div></div>`;
        $item("#linkBlog").link = "/blog/post/" + itemData.urlAmigavel;
    });

    function filterResults(searchText) {
        $w("#dataset1").setFilter(
            wixData.filter()
                .contains("titulo", searchText)
                .or(wixData.filter().contains("conteudo", searchText))
                .or(wixData.filter().contains("categoria", searchText))
        );
        $w("#dataset1").refresh();
    }

    function filterCategory(category) {
        $w("#dataset1").setFilter(
            wixData.filter()
                .contains("categoria", category)
        );
        $w("#dataset1").refresh();
    }
});