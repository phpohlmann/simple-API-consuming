document.addEventListener('DOMContentLoaded', function() {

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    const yearSpanPost = document.getElementById('current-year-post');
    if (yearSpanPost) {
        yearSpanPost.textContent = new Date().getFullYear();
    }

    if (document.body.classList.contains('page-post') || window.location.pathname.includes('post.html')) {
        loadPostData();
    }

});

const MOCK_POSTS_DB = {
    "1": {
        id: "1",
        title: "Explorando o Design Minimalista Moderno",
        date: "15 de Julho, 2024",
        author: "Alex Design",
        imageUrl: "https://picsum.photos/seed/post1/1200/700",
        content: `
            <p>O design minimalista moderno transcende a mera estética; é uma filosofia que abraça a simplicidade como meio de alcançar clareza e funcionalidade. Neste post, mergulhamos nos princípios fundamentais que definem essa abordagem, explorando como "menos é mais" pode, paradoxalmente, enriquecer a experiência do usuário.</p>
            <h2>A Essência do Minimalismo</h2>
            <p>No coração do minimalismo está a remoção do supérfluo. Cada elemento deve ter um propósito, contribuindo para a mensagem geral ou funcionalidade. Espaços em branco generosos, paletas de cores contidas (frequentemente monocromáticas ou com poucos tons) e tipografia forte são marcas registradas.</p>
            <p>A usabilidade é aprimorada quando a interface é despojada de distrações. O foco do usuário é direcionado para o conteúdo e as ações essenciais, resultando em uma navegação mais intuitiva e eficiente.</p>
            <blockquote>
                "A perfeição é alcançada, não quando não há mais nada a adicionar, mas quando não há mais nada a retirar." – Antoine de Saint-Exupéry
            </blockquote>
            <h2>Tipografia e Imagem no Minimalismo Moderno</h2>
            <p>A tipografia assume um papel de destaque. Fontes limpas, legíveis e, por vezes, de grande impacto visual, são usadas não apenas para transmitir informação, mas também como elementos de design por si só. O contraste entre títulos grandes e texto de corpo bem espaçado é crucial.</p>
            <p>As imagens, quando utilizadas, são poderosas e intencionais. Elas complementam a narrativa visual sem sobrecarregar o design. Frequentemente, uma única imagem forte pode ter mais impacto do que múltiplas imagens menores.</p>
            <p>Adotar o minimalismo moderno não é apenas seguir uma tendência, mas sim um compromisso com a clareza, a elegância e uma experiência de usuário focada e significativa.</p>
        `
    },
    "2": {
        id: "2",
        title: "A Arte da Tipografia Impactante",
        date: "10 de Julho, 2024",
        author: "Bia Typo",
        imageUrl: "https://picsum.photos/seed/post2/1200/700",
        content: `
            <p>A tipografia é a voz silenciosa do design. Quando usada com intenção e ousadia, ela pode transformar uma interface comum em uma experiência memorável e impactante. Vamos explorar como as escolhas tipográficas podem elevar o seu design.</p>
            <h2>Fontes Display: Declarando uma Intenção</h2>
            <p>Fontes display, caracterizadas por seus tamanhos grandes e estilos distintivos, são perfeitas para títulos e cabeçalhos. Elas definem o tom, capturam a atenção e criam uma hierarquia visual instantânea. A chave é o equilíbrio: uma fonte display forte deve ser complementada por uma fonte de corpo de texto mais neutra e legível.</p>
            <p>O contraste é seu aliado. Experimente com variações de peso (bold, light), tamanho e até mesmo a combinação de fontes serifadas com sans-serif para criar dinamismo.</p>
            <blockquote>
                "A tipografia é o ofício de dar forma visual à linguagem." – Robert Bringhurst
            </blockquote>
            <h2>Legibilidade vs. Estilo</h2>
            <p>Enquanto o impacto é desejável, a legibilidade nunca deve ser sacrificada, especialmente no corpo do texto. A escolha de uma fonte com bom kerning, espaçamento entre linhas (leading) adequado e um tamanho confortável para leitura prolongada é fundamental.</p>
            <p>Grandes blocos de texto com fontes excessivamente estilizadas podem se tornar cansativos. A elegância muitas vezes reside na clareza. O uso de fontes grandes para títulos e destaques permite que o corpo do texto permaneça funcional e agradável de ler.</p>
            <p>Dominar a tipografia impactante é entender essa dança entre forma e função, criando designs que não apenas parecem bons, mas também comunicam eficazmente.</p>
        `
    },
    "3": {
        id: "3",
        title: "Fotografia em Preto e Branco: Um Clássico Reinventado",
        date: "05 de Julho, 2024",
        author: "Carlos Clicks",
        imageUrl: "https://picsum.photos/seed/post3/1200/700",
        content: `
            <p>Em um mundo saturado de cores vibrantes, a fotografia em preto e branco permanece uma forma de arte atemporal e poderosa. A ausência de cor não é uma limitação, mas uma ferramenta que direciona o olhar para a essência da imagem: forma, textura, contraste e emoção.</p>
            <h2>O Poder do Contraste e da Luz</h2>
            <p>O preto e branco vive do contraste. A interação entre luzes e sombras cria profundidade, define formas e adiciona drama. Fotógrafos que trabalham em P&B são mestres em observar e manipular a luz para esculpir suas cenas.</p>
            <p>Texturas ganham uma nova dimensão. A rugosidade de uma parede de pedra, a suavidade da pele, os padrões complexos da natureza – tudo se torna mais palpável quando a distração da cor é removida.</p>
            <blockquote>
                "Quando você fotografa pessoas em cores, você fotografa suas roupas. Mas quando você fotografa pessoas em preto e branco, você fotografa suas almas." – Ted Grant
            </blockquote>
            <h2>Composição e Emoção</h2>
            <p>Sem a cor para guiar o olho, a composição se torna ainda mais crítica. Linhas, formas e o arranjo dos elementos dentro do quadro são fundamentais para criar uma imagem equilibrada e cativante.</p>
            <p>O preto e branco tem uma capacidade única de evocar emoções cruas e diretas. Pode transmitir nostalgia, melancolia, força ou serenidade com uma intensidade particular. É uma linguagem visual que fala diretamente à percepção fundamental da forma e do sentimento.</p>
            <p>Revisitar o preto e branco é redescobrir a fotografia em sua forma mais pura, onde cada tom de cinza conta uma parte da história.</p>
        `
    }

};

function loadPostData() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    const post = MOCK_POSTS_DB[postId]; // Simulação

    if (post) {
        document.title = `${post.title} - Meu Blog Moderno`;
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-date').textContent = post.date;
        document.getElementById('post-author').textContent = post.author;
        
        const featuredImageDiv = document.getElementById('post-featured-image');
        if (featuredImageDiv && post.imageUrl) {
            featuredImageDiv.style.backgroundImage = `url('${post.imageUrl}')`;
        }
        
        document.getElementById('post-body-content').innerHTML = post.content;
    } else {
        document.getElementById('post-title').textContent = "Post não encontrado";
        document.getElementById('post-body-content').innerHTML = "<p>Desculpe, o post que você está procurando não foi encontrado ou não existe mais.</p>";
    }
}
