$w.onReady(function () {
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
});