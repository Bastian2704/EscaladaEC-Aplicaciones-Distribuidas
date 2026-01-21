<script lang="ts">
	import { provinces, type Status } from '$lib/contants/constants';

	export let data: {
		item: {
			id: string;
			name: string;
			province: string;
			city: string;
			description: string;
			latitude: number;
			longitude: number;
			status: Status;
		};
	};
</script>

<h1 class="">Editar área</h1>

<form method="POST" class="space-y-3">
	<label>
		Nombre del Área:
		<input type="text" name="name" value={data.item.name} required />
	</label>
	<label>
		Provincia:
		<select name="province" required>
			{#each provinces as province}
				<option value={province} selected={province === data.item.province}>
					{province}
				</option>
			{/each}
		</select>
	</label>

	<label>
		Ciudad:
		<input type="text" name="city" value={data.item.city} required />
	</label>

	<label>
		Descripción:
		<textarea name="description" rows="3">{data.item.description}</textarea>
	</label>

	<label>
		Latitud:
		<input type="number" step="any" name="latitude" value={data.item.latitude} />
	</label>

	<label>
		Longitud:
		<input type="number" step="any" name="longitude" value={data.item.longitude} />
	</label>

	<label>
		Estado:
		<select name="status">
			<option value="active" selected={data.item.status === 'active'}>Activa</option>
			<option value="suspended" selected={data.item.status === 'suspended'}>Suspendida</option>
			<option value="deleted" selected={data.item.status === 'deleted'}>Eliminada</option>
		</select>
	</label>

	<div class="">
		<button formaction="?/save" class="border bg-green-100 px-3 py-1">Guardar</button>
		<button formaction="?/softDelete" class="border bg-red-100 px-3 py-1">Eliminar</button>
		<a href="../" class="inline-block border bg-blue-100 px-3 py-1">Salir</a>
	</div>
</form>
<h1 class="">Sectores de {data.item.name}</h1>
<a href={`/area/${data.item.id}/sector/`}> Visualizar </a>
