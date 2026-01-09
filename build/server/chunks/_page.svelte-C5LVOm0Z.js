import { a as attr } from './attributes-C7gAcNRt.js';
import { e as escape_html } from './context-R2425nfV.js';
import { p as page } from './index2-B4mLFtGO.js';
import './exports-_CuWBanw.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<h1>Dashboard</h1> <p>Sesión: ${escape_html(page.data.user.email)} · Rol: ${escape_html(page.data.role)}</p> <form method="POST" action="/logout"><button>Salir</button></form> <a${attr("href", `/area`)}>Ver Áreas</a>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C5LVOm0Z.js.map
