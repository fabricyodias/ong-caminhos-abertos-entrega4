export const Templates = {
  home() {
    return `
    <section class="hero home-hero container">
      <div>
        <h1 class="hero-title">Educação muda destinos</h1>
        <p class="hero-sub">Apoiamos crianças e adolescentes com reforço escolar, oficinas de tecnologia e desenvolvimento socioemocional.</p>
        <div class="kpis" style="margin-top: var(--space-16)">
          <div class="kpi"><strong>180+</strong> jovens em 2024</div>
          <div class="kpi"><strong>72%</strong> melhora escolar</div>
          <div class="kpi"><strong>50</strong> voluntários ativos</div>
        </div>
        <div style="margin-top: var(--space-24)">
          <a class="btn btn-primary" href="#/cadastro" data-route="/cadastro">Quero ser voluntário</a>
        </div>
      </div>
      <figure>
        <img
          src="assets/img/voluntarios.jpg"
          alt="Voluntários em atividade com crianças"
          width="1200" height="800"
          fetchpriority="high" decoding="async">
      </figure>
    </section>

    <section class="container section">
      <header><h2>Transparência</h2></header>
      <div class="alert alert-info">Todos os apoios são registrados e publicados em relatórios trimestrais.</div>
    </section>`;
  },

  projetos() {
    return `
    <section class="container section">
      <header class="projects-header">
        <h2>Projetos Ativos</h2>
        <div class="filters">
          <input id="buscaProjetos" class="input" type="search" placeholder="Buscar projetos">
          <span class="tag on" data-cat="">Todos</span>
          <span class="tag" data-cat="educacao">Educação</span>
          <span class="tag" data-cat="tecnologia">Tecnologia</span>
        </div>
      </header>

      <div class="card-grid" style="margin-top: var(--space-16)">
        <article class="card" id="reforco" data-cat="educacao">
          <div class="card-media">
            <img
              src="assets/img/projeto-criancas.jpg"
              alt="Crianças estudando em reforço escolar"
              width="900" height="600"
              loading="lazy" decoding="async">
          </div>
          <div class="card-body">
            <h3 class="card-title">Reforço Escolar Comunitário</h3>
            <div class="card-meta">
              <span class="badge badge-success">Educação</span>
              <span class="badge badge-info">Fundamental II</span>
            </div>
            <p>Aulas de português e matemática com turmas reduzidas e acompanhamento individual.</p>
            <a class="btn btn-outline" href="#/cadastro" data-route="/cadastro">Quero apoiar</a>
          </div>
        </article>

        <article class="card" id="tecnologia" data-cat="tecnologia">
          <div class="card-media">
            <img
              src="assets/img/criancas-no-lab.jpg"
              alt="Adolescentes em laboratório de informática"
              width="900" height="600"
              loading="lazy" decoding="async">
          </div>
          <div class="card-body">
            <h3 class="card-title">Tecnologia e Futuro</h3>
            <div class="card-meta">
              <span class="badge badge-info">Tecnologia</span>
              <span class="badge badge-warning">13–17 anos</span>
            </div>
            <p>Introdução a pensamento computacional, lógica e ferramentas digitais com mentoria de TI.</p>
            <button class="btn btn-primary" data-open-modal="#modalProjeto">Saiba mais</button>
          </div>
        </article>
      </div>
    </section>

    <section class="container section">
      <header><h2>Campanha de Doação</h2></header>
      <p>Meta: R$ 12.000 para montar 10 estações de estudo.</p>
      <div id="valorDoacao" class="kpi" style="display:inline-block; margin: var(--space-08) 0">R$ 0</div>
      <div id="barraDoacao" data-meta="12000" style="--p:0%; height:12px; background:var(--neutral-200); border-radius:999px; overflow:hidden; position:relative">
        <span style="position:absolute; left:0; top:0; bottom:0; width:var(--p); background:linear-gradient(90deg,var(--accent-600),var(--brand-500)); display:block"></span>
      </div>
      <div style="margin-top: var(--space-08); display:flex; gap:8px; flex-wrap:wrap">
        <button class="btn btn-outline" type="button" data-add-doacao="20">+ R$ 20</button>
        <button class="btn btn-outline" type="button" data-add-doacao="50">+ R$ 50</button>
        <button class="btn btn-outline" type="button" data-add-doacao="100">+ R$ 100</button>

      </div>
    </section>

    <div class="modal-backdrop" id="modalProjeto">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header id="modal-title">Tecnologia e Futuro</header>
        <div class="content">Oficinas semanais com metodologia ativa, portfólio inicial e orientação profissional.</div>
        <footer>
          <button class="btn btn-outline" data-close-modal>Fechar</button>
          <a class="btn btn-primary" href="#/cadastro" data-route="/cadastro">Quero ser voluntário</a>
        </footer>
      </div>
    </div>`;
  },

  cadastro() {
    return `
    <section class="container section signup">
      <header><h2>Cadastro de Voluntário</h2></header>
      <div id="formAlert" class="alert alert-danger hidden"></div>

      <form class="form" id="formVoluntario" novalidate>
        <fieldset class="fieldset">
          <legend class="legend">Dados Pessoais</legend>
          <div class="field">
            <label class="label" for="nome">Nome Completo *</label>
            <input class="input" type="text" id="nome" name="nome" required minlength="3" placeholder="Seu nome completo">
          </div>
          <div class="field">
            <label class="label" for="email">E-mail *</label>
            <input class="input" type="email" id="email" name="email" required placeholder="voce@email.com">
          </div>
          <div class="field">
            <label class="label" for="cpf">CPF *</label>
            <input class="input" type="text" id="cpf" name="cpf" required inputmode="numeric" maxlength="14" placeholder="000.000.000-00">
          </div>
          <div class="field">
            <label class="label" for="telefone">Telefone / WhatsApp *</label>
            <input class="input" type="tel" id="telefone" name="telefone" required maxlength="15" placeholder="(11) 91234-5678">
          </div>
          <div class="field">
            <label class="label" for="nascimento">Data de Nascimento *</label>
            <input class="input" type="date" id="nascimento" name="nascimento" required>
          </div>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="legend">Endereço</legend>
          <div class="field">
            <label class="label" for="endereco">Endereço (Rua, número) *</label>
            <input class="input" type="text" id="endereco" name="endereco" required placeholder="Rua Exemplo, 123">
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="field">
                <label class="label" for="cep">CEP *</label>
                <input class="input" type="text" id="cep" name="cep" required inputmode="numeric" maxlength="9" placeholder="00000-000">
              </div>
            </div>
            <div class="col-md-4">
              <div class="field">
                <label class="label" for="cidade">Cidade *</label>
                <input class="input" type="text" id="cidade" name="cidade" required placeholder="São Paulo">
              </div>
            </div>
            <div class="col-md-2">
              <div class="field">
                <label class="label" for="estado">UF *</label>
                <input class="input" type="text" id="estado" name="estado" required minlength="2" maxlength="2" placeholder="SP">
              </div>
            </div>
          </div>
        </fieldset>

        <div style="display:flex; gap: var(--space-08); align-items:center;">
          <button class="btn btn-primary" type="submit">Enviar cadastro</button>
          <button class="btn btn-outline" type="reset">Limpar</button>
        </div>
      </form>
    </section>`;
  }
};

