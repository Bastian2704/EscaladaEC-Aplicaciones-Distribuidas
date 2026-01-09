import { z as ensure_array_like, F as bind_props } from './index-Co_WztV4.js';
import { a as attr } from './attributes-C7gAcNRt.js';
import { e as escape_html } from './context-R2425nfV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<h1>Rutas</h1> <form method="POST"><input name="name" placeholder="Nombre" required/> <input name="grade" placeholder="Grado (5.10b / 6b / V4)" required/> <textarea name="description" placeholder="Descripción"></textarea> <button formaction="?/create">Crear</button></form> <ul><!--[-->`);
    const each_array = ensure_array_like(data.items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let r = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", `/routes/${r.id}/edit`)}>${escape_html(r.name)}</a> · ${escape_html(r.grade)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C6yTZ2AL.js.map
