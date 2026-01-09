import { F as bind_props } from './index-Co_WztV4.js';
import { e as escape_html } from './context-R2425nfV.js';
import './attributes-C7gAcNRt.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = $$props["form"];
    $$renderer2.push(`<h1>Iniciar sesión</h1> <form method="POST"><label>Email <input name="email" type="email" required/></label> <label>Password <input name="password" type="password" required/></label> `);
    if (form?.message) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p>${escape_html(form.message)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit">Entrar</button></form>`);
    bind_props($$props, { form });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B4PUU9DO.js.map
