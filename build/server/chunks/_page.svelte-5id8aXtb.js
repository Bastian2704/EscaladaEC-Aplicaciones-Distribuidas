import { F as bind_props } from './index-Co_WztV4.js';
import { a as attr } from './attributes-C7gAcNRt.js';
import { e as escape_html } from './context-R2425nfV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<h1>Editar ruta</h1> <form method="POST"><input name="name"${attr("value", data.item.name)} required/> <input name="grade"${attr("value", data.item.grade)} required/> <textarea name="description">`);
    const $$body = escape_html(data.item.description);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> <button formaction="?/save">Guardar</button> <button formaction="?/delete">Eliminar</button></form>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-5id8aXtb.js.map
