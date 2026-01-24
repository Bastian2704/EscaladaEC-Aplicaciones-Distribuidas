import { O as attr, V as bind_props } from './index-DEBH4Vt4.js';
import { e as escape_html } from './context-R2425nfV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<h1 class="mb-4 text-xl">Sector ${escape_html(data.item.name)}</h1> <form method="POST" class="space-y-3"><label>Nombre: <input type="text" name="name"${attr("value", data.item.name)} required/></label> <label>Orientación: <input type="text" name="orientation"${attr("value", data.item.orientation)} required/></label> <label>Descripción: <textarea name="description" rows="3">`);
    const $$body = escape_html(data.item.description);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></label> <label>Estado: <select name="status">`);
    $$renderer2.option({ value: "active", selected: data.item.status === "active" }, ($$renderer3) => {
      $$renderer3.push(`Activa`);
    });
    $$renderer2.option(
      {
        value: "suspended",
        selected: data.item.status === "suspended"
      },
      ($$renderer3) => {
        $$renderer3.push(`Suspendida`);
      }
    );
    $$renderer2.option({ value: "deleted", selected: data.item.status === "deleted" }, ($$renderer3) => {
      $$renderer3.push(`Eliminada`);
    });
    $$renderer2.push(`</select></label> <div class="mt-4 flex gap-2"><button formaction="?/save" class="border bg-green-100 px-3 py-1">Guardar</button> <button formaction="?/softDelete" class="border bg-red-100 px-3 py-1">Eliminar</button> <a href="../" class="inline-block border bg-blue-100 px-3 py-1">Salir</a></div></form> <h1>Climbs de ${escape_html(data.item.name)}</h1> <a${attr("href", `/area/${data.item.areaId}/sector/${data.item.id}/climb/`)}>Visualizar</a>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CimUbxTu.js.map
