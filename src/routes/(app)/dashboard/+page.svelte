<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="main-dashboard">
	<h1 class="main-title">Dashboard</h1>

	<div class="dashboard-user-info">
		<p class="dashboard-user">
			Sesión: <strong>{page.data.user.email}</strong> · 
			Rol: <strong>{page.data.role}</strong>
		</p>

		<form method="POST" action="/logout">
			<button type="submit" class="dashboard-btn-logout">Salir</button>
		</form>
	</div>

	<section class="dashboard-app-info">
		<h2>Sobre la Aplicación</h2>
		<p>
			Esta plataforma tiene como objetivo centralizar toda la información relacionada con la escalada en Ecuador. 
			Aquí los usuarios pueden consultar áreas, sectores y rutas, así como llevar un registro de sus actividades.
		</p>
		<p>
			Además, la aplicación proporciona <strong>recomendaciones personalizadas</strong> en cada perfil de usuario, 
			basadas en su experiencia, desempeño y preferencias. Esto permite una experiencia más completa y segura para todos los escaladores.
		</p>
	</section>

	<nav class="dashboard-nav">
		<a href="/area" class="dashboard-btn-area">Ver Áreas</a>
	</nav>
</main>

<style>
/* Contenedor principal */
.main-dashboard {
	background-color: #9dc5bb;
	margin: 40px 30px;
	padding: 30px;
	border: 2px solid #04395e;
	border-radius: 12px;
	font-family: 'Inter', sans-serif;
}

/* Título principal */
.main-title {
	font-weight: 600;
	font-size: 36px;
	color: #222;
	margin-bottom: 25px;
}

/* Información de usuario */
.dashboard-user-info {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	background-color: #f3f4f6;
	padding: 20px 25px;
	border-radius: 10px;
	box-shadow: 1px 2px 6px rgba(0,0,0,0.1);
	margin-bottom: 30px;
}

.dashboard-user {
	font-weight: 600;
	font-size: 18px;
	color: #333;
	margin: 0;
}

.dashboard-btn-logout {
	background-color: #3b82f6;
	color: #fff;
	padding: 0.6rem 1.2rem;
	border: none;
	border-radius: 8px;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.2s, transform 0.1s;
}

.dashboard-btn-logout:hover {
	background-color: #2563eb;
	transform: translateY(-1px);
}

/* Sección de información de la aplicación */
.dashboard-app-info {
	background-color: #ffffff;
	padding: 20px 25px;
	border-radius: 10px;
	box-shadow: 1px 2px 5px rgba(0,0,0,0.1);
	margin-bottom: 30px;
}

.dashboard-app-info h2 {
	font-size: 24px;
	font-weight: 600;
	color: #222;
	margin-bottom: 15px;
}

.dashboard-app-info p {
	color: #444;
	line-height: 1.5;
	margin-bottom: 12px;
}

/* Navegación */
.dashboard-nav {
	text-align: center;
}

.dashboard-btn-area {
	background-color: #3b82f6;
	color: white;
	padding: 0.7rem 1.4rem;
	border-radius: 8px;
	font-weight: 600;
	text-decoration: none;
	transition: background-color 0.2s, transform 0.1s;
}

.dashboard-btn-area:hover {
	background-color: #2563eb;
	transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 768px) {
	.dashboard-user-info {
		flex-direction: column;
		text-align: center;
		gap: 15px;
	}
}
</style>
