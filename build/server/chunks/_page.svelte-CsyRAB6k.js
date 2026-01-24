import { O as attr, V as bind_props } from './index-DEBH4Vt4.js';
import { e as escape_html } from './context-R2425nfV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<h1 class="mb-4 text-xl">Climb ${escape_html(data.item.name)}</h1> <form method="POST" class="space-y-3"><label>Nombre: <input type="text" name="name"${attr("value", data.item.name)} required/></label> <label>Categoría: <input type="text" name="category"${attr("value", data.item.category)} required/></label> <label>Tipo de Escalada: <input type="text" name="climbType"${attr("value", data.item.climbType)} required/></label> <label>Equipo Requerido: <input type="text" name="requiredEquipment"${attr("value", data.item.requiredEquipment)} required/></label> <label>Estado: <select name="status">`);
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
    $$renderer2.push(`</select></label> <div class="mt-4 flex gap-2"><button formaction="?/save" class="border bg-green-100 px-3 py-1">Guardar</button> <button formaction="?/softDelete" class="border bg-red-100 px-3 py-1">Eliminar</button> <a href="../" class="inline-block border bg-blue-100 px-3 py-1">Salir</a></div></form> <h1>Grades de ${escape_html(data.item.name)}</h1> <a${attr("href", `/area/${data.areaId}/sector/${data.item.sectorId}/climb/${data.item.id}/grade`)}>Visualizar</a>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CsyRAB6k.js.map
