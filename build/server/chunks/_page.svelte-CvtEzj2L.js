import { e as escape_html } from './context-R2425nfV.js';
import { p as page } from './index2-B4mLFtGO.js';
import './exports-_CuWBanw.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<main class="main-dashboard svelte-1tyszyy"><h1 class="main-title svelte-1tyszyy">Dashboard</h1> <div class="dashboard-user-info svelte-1tyszyy"><p class="dashboard-user svelte-1tyszyy">Sesión: <strong>${escape_html(page.data.user.email)}</strong> · 
			Rol: <strong>${escape_html(page.data.role)}</strong></p> <form method="POST" action="/logout"><button type="submit" class="dashboard-btn-logout svelte-1tyszyy">Salir</button></form></div> <section class="dashboard-app-info svelte-1tyszyy"><h2 class="svelte-1tyszyy">Sobre la Aplicación</h2> <p class="svelte-1tyszyy">Esta plataforma tiene como objetivo centralizar toda la información relacionada con la escalada en Ecuador. 
			Aquí los usuarios pueden consultar áreas, sectores y rutas, así como llevar un registro de sus actividades.</p> <p class="svelte-1tyszyy">Además, la aplicación proporciona <strong>recomendaciones personalizadas</strong> en cada perfil de usuario, 
			basadas en su experiencia, desempeño y preferencias. Esto permite una experiencia más completa y segura para todos los escaladores.</p></section> <nav class="dashboard-nav svelte-1tyszyy"><a href="/area" class="dashboard-btn-area svelte-1tyszyy">Ver Áreas</a></nav></main>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CvtEzj2L.js.map
