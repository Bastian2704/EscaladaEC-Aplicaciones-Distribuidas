<script lang="ts">
	import {
		categories,
		climbGradeSystems,
		climbTypes,
		gradeSystemsValues,
		type Category,
		type Status,
		type GradeSystems
	} from '$lib/contants/constants';
	import logo from '$lib/assets/smallLogo.png';
	import fullLogo from '$lib/assets/aeLogo.png';
	import { page } from '$app/state';
	import '$lib/styles/climb.css';

	export let data: {
		items: {
			id: string;
			sectorId: string;
			name: string;
			category: string;
			climbType: string;
			gradeSystem: string;
			value: string;
			requiredEquipment: string;
			status: Status;
			createdAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		}[];
		sectorInfo: {
			id: string;
			areaId: string;
			name: string;
			orientation: string;
			description: string;
			status: Status;
			createdAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		}[];
		page: number;
		status: string;
	};
	let messageVisible = false;

	let showForm = false;

	function toggleForm() {
		showForm = !showForm;
	}
	$: if (form?.message) {
		messageVisible = true;
		setTimeout(() => {
			messageVisible = false;
		}, 3000);
	}

	// Form Status
	let selectedCategory = '';
	let selectedType = '';
	let name = '';
	let requiredEquipment = '';
	let climbTypeList: string[] = [];
	let selectedGradeSystem = '';
	let selectedGradeSystemValue = '';
	let gradeSystemList: string[] = [];
	let gradeSystemsValueList: string[] = [];

	function onCategoryChange() {
		climbTypeList = climbTypes[selectedCategory as Category] ?? [];
		gradeSystemList = climbGradeSystems[selectedCategory as Category] ?? [];
		gradeSystemsValueList = [];
	}

	function onGradeSystemChange() {
		gradeSystemsValueList = gradeSystemsValues[selectedGradeSystem as GradeSystems] ?? [];
	}

	export let form: { message?: string; success?: boolean } | undefined;
</script>

<section class="background">
	<section class="header__container">
		<header class="header">
			<section class="header__logo-container">
				<img class="logo" alt="logo" src={logo} />
				<h1 class="header-text">Urqu Ascents</h1>
			</section>
			<nav class="menu">
				<ul class="menu__list header-text">
					<li><a class="menu__item" href="/dashboard">Menú Principal</a></li>
					<li><a class="menu__item" href="/area">Áreas</a></li>
					<li><a class="menu__item" href="/profile/{page.data.user.id}">Mi Perfil</a></li>
				</ul>
			</nav>
		</header>
	</section>

	<main>
		<section class="main">
			<section class="main__parent-description">
				<h2 class="main__subtitle">{data.sectorInfo[0].name}</h2>
				<p class="main__area-info">{data.sectorInfo[0].orientation}</p>
			</section>
			<section class="main__title-container">
				<section class="main__title-left-container">
					<a class="main__title button" href="/area/{data.sectorInfo[0].areaId}/sector">←</a>
					<h1 class="main__title">Climb</h1>
				</section>
				{#if page.data.role == 'admin'}
					<button class="main__title-create" on:click={toggleForm}>
						{showForm ? '×' : '+'}
					</button>
				{/if}
			</section>
			<!-- Check-->

			{#if form?.message}
				<p
					class="mb-3 rounded border p-2 {form.success
						? 'border-green-400 bg-green-50'
						: 'border-red-400 bg-red-50'}"
				>
					{form.message}
				</p>
			{/if}

			<button formaction="">Filtros</button>

			<!--TODO: ADD FILTERS-->

			<table class="main__table">
				<thead class="main__table-head">
					<tr>
						<th class="main__table-item">Nombre</th>
						<th class="main__table-item">Categoría</th>
						<th class="main__table-item">Tipo de Escalada</th>
						<th class="main__table-item">Sistema</th>
						<th class="main__table-item">Valor</th>
						<th class="main__table-item">Equipo Requerido</th>

						<!--TODO: Verify if this is neccessary
						<th class="main__table-item">Acciones</th>
						-->
					</tr>
				</thead>
				<tbody class="main__table-tbody">
					{#each data.items as climb}
						<tr
							class="main__table-body"
							on:click={() => (window.location.href = `climb/${climb.id}/grade`)}
						>
							<td class="main__table-td">{climb.name}</td>
							<td class="main__table-td">{climb.category}</td>
							<td class="main__table-td">{climb.climbType}</td>
							<td class="main__table-td">{climb.gradeSystem}</td>
							<td class="main__table-td">{climb.value}</td>
							<td class="main__table-td">{climb.requiredEquipment}</td>
							{#if page.data.role == 'admin'}
								<td>
									<a href="climb/{climb.id}/edit" on:click|stopPropagation>editar</a>
								</td>
								<td on:click|stopPropagation>
									{#if climb.status === 'active'}
										<form method="POST" class="ml-2 inline">
											<input type="hidden" name="id" value={climb.id} />
											<button formaction="?/suspend" class="border px-2 py-1">Suspender</button>
										</form>
									{:else if climb.status === 'suspended'}
										<form method="POST" class="ml-2 inline">
											<input type="hidden" name="id" value={climb.id} />
											<button formaction="?/resume" class="border px-2 py-1">Reactivar</button>
										</form>
									{/if}

									{#if climb.status !== 'deleted'}
										<form method="POST" class="ml-2 inline">
											<input type="hidden" name="id" value={climb.id} />
											<button formaction="?/softDelete" class="border px-2 py-1">Borrar</button>
										</form>
									{:else}
										<form method="POST" class="ml-2 inline">
											<input type="hidden" name="id" value={climb.id} />
											<button formaction="?/restore" class="border px-2 py-1">Restaurar</button>
										</form>
									{/if}
								</td>
							{/if}
							<td class="main__table-td-arrow">→</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if showForm}
				<form method="POST" class="mt-6 space-y-3">
					<h2 class="font-semibold">Crear nuevo Climb</h2>

					<div>
						<label for="name" class="mb-1 block">Nombre</label>
						<input id="name" name="name" bind:value={name} required class="border px-2 py-1" />
					</div>

					<div>
						<label for="category" class="mb-1 block">Categoría</label>

						<select
							id="category"
							name="category"
							bind:value={selectedCategory}
							on:change={onCategoryChange}
							required
							class="border px-2 py-1"
						>
							<option value="" disabled selected>Selecciona categoría</option>

							{#each categories as category}
								<option value={category}>{category}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="climbType" class="mb-1 block">Tipo de Escalada</label>

						<select
							id="climbType"
							name="climbType"
							bind:value={selectedType}
							disabled={!climbTypeList.length}
							required
							class="border px-2 py-1"
						>
							<option value="" disabled selected>Selecciona tipo</option>

							{#each climbTypeList as type}
								<option value={type}>{type}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="gradeSystem" class="mb-1 block">Sistema de grado</label>
						<select
							id="gradeSystem"
							name="gradeSystem"
							bind:value={selectedGradeSystem}
							on:change={onGradeSystemChange}
							required
							class="border px-2 py-1"
							disabled={!gradeSystemList.length}
						>
							<option value="" disabled selected>Selecciona un Sistema de Grados</option>

							{#each gradeSystemList as gradeSystem}
								<option value={gradeSystem}>{gradeSystem}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="value" class="mb-1 block">Valor</label>
						<select
							id="value"
							name="value"
							bind:value={selectedGradeSystemValue}
							required
							class="border px-2 py-1"
						>
							<option value="" disabled selected>Selecciona un Grado</option>

							{#each gradeSystemsValueList as gradeSystemValue}
								<option value={gradeSystemValue}>{gradeSystemValue}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="requiredEquipment" class="mb-1 block">Equipo Requerido</label>
						<input
							id="requiredEquipment"
							name="requiredEquipment"
							bind:value={requiredEquipment}
							required
							class="border px-2 py-1"
						/>
					</div>

					<button type="submit" formaction="?/createClimb" class="border px-3 py-1"
						>Crear Climb</button
					>
				</form>
			{/if}
		</section>
	</main>
	<footer class="footer">
		<img class="smallLogo" alt="logo" src={fullLogo} />

		<section class="footer__links">
			<a href="/dashboard">Inicio</a>
			<a href="/area">Áreas</a>
			<a href="/profile/{page.data.user.id}">Mi Perfil</a>
			<!--TODO: Add This Pages-->
			<a href="/contact">Contacto</a>
		</section>
		<p class="footer__text">
			© {new Date().getFullYear()} Urqu Ascents
		</p>
	</footer>
</section>
